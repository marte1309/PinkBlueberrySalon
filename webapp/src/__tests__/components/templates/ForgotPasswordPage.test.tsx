import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ForgotPasswordPage } from "@/components/templates/ForgotPasswordPage";

// Mock the auth service
vi.mock("@/services/authService", () => ({
  authService: {
    forgotPassword: vi.fn().mockImplementation((email) => {
      if (email === "invalid@example.com") {
        return Promise.reject(new Error("Email address not found. Please check and try again."));
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

// Mock navigation components to simplify testing
vi.mock("@/components/organisms/Navigation/Navigation", () => ({
  Navigation: () => <div data-testid="mock-navigation"></div>,
}));

vi.mock("@/components/organisms/Footer/Footer", () => ({
  Footer: () => <div data-testid="mock-footer"></div>,
}));

describe("ForgotPasswordPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders forgot password form correctly", () => {
    render(
      <BrowserRouter>
        <ForgotPasswordPage />
      </BrowserRouter>
    );

    // Check if important elements are present
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reset Password/i })).toBeInTheDocument();
    expect(screen.getByText(/Back to Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Need Help?/i)).toBeInTheDocument();
  });

  it("displays validation error for invalid email", async () => {
    render(
      <BrowserRouter>
        <ForgotPasswordPage />
      </BrowserRouter>
    );

    // Submit the form with an invalid email
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "invalid-email" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Reset Password/i }));

    // Check that validation error appears
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it("submits the form with valid email and shows success view", async () => {
    const { authService } = await import("@/services/authService");

    render(
      <BrowserRouter>
        <ForgotPasswordPage />
      </BrowserRouter>
    );

    // Fill in the form with valid email
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "user@example.com" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Reset Password/i }));

    // Verify forgotPassword service was called with correct email
    await waitFor(() => {
      expect(authService.forgotPassword).toHaveBeenCalledWith("user@example.com");
    });

    // Check for success state
    await waitFor(() => {
      expect(screen.getByText(/Email Sent!/i)).toBeInTheDocument();
      expect(screen.getByText(/We've sent a password reset link to/i)).toBeInTheDocument();
      expect(screen.getByText(/user@example.com/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Resend Email/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Back to Login/i })).toBeInTheDocument();
    });
  });

  it("shows error message for invalid email address", async () => {
    const { authService } = await import("@/services/authService");

    render(
      <BrowserRouter>
        <ForgotPasswordPage />
      </BrowserRouter>
    );

    // Fill in the form with an email that will return an error
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "invalid@example.com" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Reset Password/i }));

    // Verify forgotPassword service was called
    await waitFor(() => {
      expect(authService.forgotPassword).toHaveBeenCalledWith("invalid@example.com");
    });

    // Should still show the form (not success view)
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Reset Password/i })).toBeInTheDocument();
      expect(screen.queryByText(/Email Sent!/i)).not.toBeInTheDocument();
    });
  });

  it("disables the submit button during form submission", async () => {
    // Create a delayed promise to simulate a slow network
    vi.mock("@/services/authService", () => ({
      authService: {
        forgotPassword: vi.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 100);
          });
        }),
      },
    }));

    render(
      <BrowserRouter>
        <ForgotPasswordPage />
      </BrowserRouter>
    );

    // Fill in the form with valid email
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "user@example.com" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Reset Password/i }));

    // Verify button is disabled and shows loading state during submission
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Sending/i })).toBeDisabled();
    });
  });

  it("navigates to login page when Back to Login is clicked", () => {
    render(
      <BrowserRouter>
        <ForgotPasswordPage />
      </BrowserRouter>
    );

    const loginLink = screen.getByText(/Back to Login/i);
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("allows resending the reset email from success view", async () => {
    const { authService } = await import("@/services/authService");

    render(
      <BrowserRouter>
        <ForgotPasswordPage />
      </BrowserRouter>
    );

    // Fill in the form with valid email
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "user@example.com" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Reset Password/i }));

    // Wait for success view to appear
    await waitFor(() => {
      expect(screen.getByText(/Email Sent!/i)).toBeInTheDocument();
    });

    // Reset mock to verify next call
    authService.forgotPassword.mockClear();

    // Click resend button
    fireEvent.click(screen.getByRole("button", { name: /Resend Email/i }));

    // Verify forgotPassword service was called again with the same email
    await waitFor(() => {
      expect(authService.forgotPassword).toHaveBeenCalledWith("user@example.com");
    });
  });
});
