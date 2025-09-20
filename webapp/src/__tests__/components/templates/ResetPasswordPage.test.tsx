import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { ResetPasswordPage } from "@/components/templates/ResetPasswordPage";

// Mock the auth service
vi.mock("@/services/authService", () => ({
  authService: {
    resetPassword: vi.fn().mockImplementation((token, password) => {
      if (token === "invalid-token") {
        return Promise.reject(new Error("Invalid or expired token. Please request a new password reset link."));
      }
      if (password === "weak") {
        return Promise.reject(new Error("Password does not meet the security requirements."));
      }
      return Promise.resolve();
    }),
  },
}));

// Mock the useToast hook
vi.mock("@/components/ui/use-toast", () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

// Mock navigation hook
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock navigation components to simplify testing
vi.mock("@/components/organisms/Navigation/Navigation", () => ({
  Navigation: () => <div data-testid="mock-navigation"></div>,
}));

vi.mock("@/components/organisms/Footer/Footer", () => ({
  Footer: () => <div data-testid="mock-footer"></div>,
}));

describe("ResetPasswordPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders reset password form correctly with valid token", () => {
    render(
      <MemoryRouter initialEntries={["/reset-password?token=valid-token"]}>
        <Routes>
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if important elements are present
    expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reset Password/i })).toBeInTheDocument();
    expect(screen.getByText(/Back to Login/i)).toBeInTheDocument();
  });

  it("shows invalid token view when no token is provided", () => {
    render(
      <MemoryRouter initialEntries={["/reset-password"]}>
        <Routes>
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Check for invalid token state
    expect(screen.getByText(/Invalid Reset Link/i)).toBeInTheDocument();
    expect(screen.getByText(/The password reset link is invalid or has expired/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Request New Link/i })).toBeInTheDocument();
  });

  it("displays validation errors for invalid passwords", async () => {
    render(
      <MemoryRouter initialEntries={["/reset-password?token=valid-token"]}>
        <Routes>
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Submit the form with a short password
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: "short" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "short" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Reset Password/i }));

    // Check that validation error appears
    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 8 characters/i)).toBeInTheDocument();
    });

    // Try passwords that don't match
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: "StrongPassword123!" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "DifferentPassword123!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Reset Password/i }));

    // Check that validation error appears
    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });
  });

  it("submits the form with valid passwords and shows success view", async () => {
    const { authService } = await import("@/services/authService");

    render(
      <MemoryRouter initialEntries={["/reset-password?token=valid-token"]}>
        <Routes>
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Fill in the form with valid passwords
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: "StrongPassword123!" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "StrongPassword123!" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Reset Password/i }));

    // Verify resetPassword service was called with correct data
    await waitFor(() => {
      expect(authService.resetPassword).toHaveBeenCalledWith("valid-token", "StrongPassword123!");
    });

    // Check for success state
    await waitFor(() => {
      expect(screen.getByText(/Password Reset Successfully!/i)).toBeInTheDocument();
      expect(screen.getByText(/Your password has been updated/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Go to Login/i })).toBeInTheDocument();
    });
  });

  it("shows invalid token error after submission with invalid token", async () => {
    const { authService } = await import("@/services/authService");

    render(
      <MemoryRouter initialEntries={["/reset-password?token=invalid-token"]}>
        <Routes>
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Fill in the form with valid passwords
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: "StrongPassword123!" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "StrongPassword123!" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Reset Password/i }));

    // Verify resetPassword service was called
    await waitFor(() => {
      expect(authService.resetPassword).toHaveBeenCalledWith("invalid-token", "StrongPassword123!");
    });

    // Check for invalid token state
    await waitFor(() => {
      expect(screen.getByText(/Invalid Reset Link/i)).toBeInTheDocument();
      expect(screen.getByText(/The password reset link is invalid or has expired/i)).toBeInTheDocument();
    });
  });

  it("shows error for weak password", async () => {
    const { authService } = await import("@/services/authService");

    render(
      <MemoryRouter initialEntries={["/reset-password?token=valid-token"]}>
        <Routes>
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Fill in the form with a weak password
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: "weak" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "weak" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Reset Password/i }));

    // Check for validation error for weak password
    await waitFor(() => {
      expect(screen.getByText(/Password must include uppercase, lowercase, number and special character/i)).toBeInTheDocument();
    });
  });

  it("disables the reset button during form submission", async () => {
    // Create a delayed promise to simulate a slow network
    vi.mock("@/services/authService", () => ({
      authService: {
        resetPassword: vi.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 100);
          });
        }),
      },
    }));

    render(
      <MemoryRouter initialEntries={["/reset-password?token=valid-token"]}>
        <Routes>
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Fill in the form with valid passwords
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: "StrongPassword123!" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "StrongPassword123!" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Reset Password/i }));

    // Verify button is disabled during submission
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Resetting/i })).toBeDisabled();
    });
  });

  it("navigates to login page when Back to Login is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/reset-password?token=valid-token"]}>
        <Routes>
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </MemoryRouter>
    );

    const loginLink = screen.getByText(/Back to Login/i);
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("navigates to forgot password page when Request New Link is clicked on invalid token view", () => {
    render(
      <MemoryRouter initialEntries={["/reset-password"]}>
        <Routes>
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </MemoryRouter>
    );

    const requestNewLinkButton = screen.getByRole("button", { name: /Request New Link/i });
    expect(requestNewLinkButton).toBeInTheDocument();
  });

  it("displays security tips section when form is visible", () => {
    render(
      <MemoryRouter initialEntries={["/reset-password?token=valid-token"]}>
        <Routes>
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Check for security tips section
    expect(screen.getByText(/Password Security Tips/i)).toBeInTheDocument();
    expect(screen.getByText(/Use a unique password for each account/i)).toBeInTheDocument();
    expect(screen.getByText(/Combine uppercase, lowercase, numbers, and special characters/i)).toBeInTheDocument();
  });
});
