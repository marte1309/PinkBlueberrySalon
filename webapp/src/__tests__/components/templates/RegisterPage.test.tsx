import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// Remove this line from here if present, and instead ensure the following import is in your Vitest setup file (e.g., setupTests.ts):
// import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { RegisterPage } from "@/components/templates/RegisterPage";
import authReducer from "@/store/slices/authSlice";

// Mock the auth service
vi.mock("@/services/authService", () => ({
  authService: {
    register: vi.fn().mockResolvedValue({
      user: {
        id: "123",
        email: "mrd1309@gmail.com",
        firstName: "Mariano",
        lastName: "Rodriguez",
        rewardPoints: 0,
        name: "Mariano Rodriguez",
      },
      token: "fake-token",
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

describe("RegisterPage", () => {
  const mockStore = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders registration form correctly", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>
    );

    // Check if important form elements are present
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByText(/I agree to the/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create Account/i })
    ).toBeInTheDocument();
  });

  it("displays validation errors for invalid inputs", async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>
    );

    // Submit the form without filling in required fields
    fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));

    // Check that validation errors appear
    await waitFor(() => {
      expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Please enter a valid email address/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Password must be at least 8 characters/i)
      ).toBeInTheDocument();
    });
  });

  it("submits the form with valid data", async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>
    );

    // Fill in the form with valid data
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "Mariano" },
    });

    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Rodriguez" },
    });

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "mrd1309@gmail.com" },
    });

    fireEvent.change(screen.getByLabelText(/Phone \(Optional\)/i), {
      target: { value: "1234567890" },
    });

    fireEvent.change(screen.getByLabelText(/^Password/i), {
      target: { value: "M4rt31309$" },
    });

    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "M4rt31309$" },
    });

    // Check the terms checkbox
    fireEvent.click(screen.getByRole("checkbox"));

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));

    // Wait for form submission and verify it's disabled during submission
    expect(
      screen.getByRole("button", { name: /Create Account/i })
    ).toBeDisabled();

    // After submission completes, we should see success state
    await waitFor(() => {
      const state = mockStore.getState();
      expect(state.auth.isAuthenticated).toBeTruthy();
      expect(state.auth.user).toBeTruthy();
      expect(state.auth.token).toBe("fake-token");
    });
  });
});
