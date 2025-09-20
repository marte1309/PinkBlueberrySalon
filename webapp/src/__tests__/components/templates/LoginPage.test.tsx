import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { LoginPage } from "@/components/templates/LoginPage";
import authReducer from "@/store/slices/authSlice";

// Mock the auth service
vi.mock("@/services/authService", () => ({
  authService: {
    login: vi.fn().mockImplementation((credentials) => {
      // Simulate a successful login with valid credentials
      if (credentials.email === "user@example.com" && credentials.password === "Password123!") {
        return Promise.resolve({
          user: {
            id: "123",
            email: "user@example.com",
            firstName: "Test",
            lastName: "User",
            rewardPoints: 100,
          },
          token: "fake-token",
        });
      }
      // Simulate a failed login with invalid credentials
      return Promise.reject(new Error("Invalid email or password. Please try again."));
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

describe("LoginPage", () => {
  const mockStore = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

  beforeEach(() => {
    vi.clearAllMocks();
    // Clear localStorage before each test
    localStorage.clear();
  });

  it("renders login form correctly", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    // Check if important form elements are present
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Remember me/i)).toBeInTheDocument();
    expect(screen.getByText(/Forgot password?/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account?/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });

  it("displays validation errors for invalid inputs", async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    // Submit the form without filling in required fields
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    // Check that validation errors appear
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  it("submits the form with valid data and logs in successfully", async () => {
    const { authService } = await import("@/services/authService");

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    // Fill in the form with valid data
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "user@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "Password123!" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    // Verify login service was called with correct data
    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "Password123!",
      });
    });

    // After submission completes, we should see authentication state updated
    await waitFor(() => {
      const state = mockStore.getState();
      expect(state.auth.isAuthenticated).toBeTruthy();
      expect(state.auth.user).toBeTruthy();
      expect(state.auth.token).toBe("fake-token");
    });
  });

  it("shows error message for invalid login credentials", async () => {
    const { authService } = await import("@/services/authService");

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    // Fill in the form with invalid data
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "wrong@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "WrongPassword123!" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    // Verify login service was called with incorrect data
    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        email: "wrong@example.com",
        password: "WrongPassword123!",
      });
    });

    // After submission fails, we should see authentication state not updated
    await waitFor(() => {
      const state = mockStore.getState();
      expect(state.auth.isAuthenticated).toBeFalsy();
      expect(state.auth.user).toBeNull();
      expect(state.auth.token).toBeNull();
    });
  });

  it("saves email to localStorage when Remember Me is checked", async () => {
    const { authService } = await import("@/services/authService");

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    // Fill in the form with valid data
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "user@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "Password123!" },
    });

    // Check the remember me checkbox
    fireEvent.click(screen.getByLabelText(/Remember me/i));

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    // Verify login service was called
    await waitFor(() => {
      expect(authService.login).toHaveBeenCalled();
      expect(localStorage.getItem("rememberEmail")).toBe("user@example.com");
    });
  });

  it("loads remembered email from localStorage", async () => {
    // Set up localStorage with a remembered email
    localStorage.setItem("rememberEmail", "remembered@example.com");

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    // Check if the email field is pre-filled and the checkbox is checked
    await waitFor(() => {
      expect(screen.getByLabelText(/Email/i)).toHaveValue("remembered@example.com");
      expect(screen.getByLabelText(/Remember me/i)).toBeChecked();
    });
  });

  it("navigates to forgot password page when link is clicked", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    const forgotPasswordLink = screen.getByText(/Forgot password?/i);
    expect(forgotPasswordLink).toHaveAttribute("href", "/forgot-password");
  });

  it("navigates to register page when Sign Up link is clicked", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    const signUpLink = screen.getByText(/Sign Up/i);
    expect(signUpLink).toHaveAttribute("href", "/register");
  });

  it("disables the login button during form submission", async () => {
    // Create a delayed promise to simulate a slow network
    vi.mock("@/services/authService", () => ({
      authService: {
        login: vi.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                user: {
                  id: "123",
                  email: "user@example.com",
                  firstName: "Test",
                  lastName: "User",
                  rewardPoints: 100,
                },
                token: "fake-token",
              });
            }, 100);
          });
        }),
      },
    }));

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    // Fill in the form with valid data
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "user@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "Password123!" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    // Verify button is disabled during submission
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Signing In/i })).toBeDisabled();
    });
  });
});
