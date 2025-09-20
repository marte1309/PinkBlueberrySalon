import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  rewardPoints: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Función para obtener el usuario del localStorage de forma segura
const getUserFromLocalStorage = (): User | null => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    const parsedUser = JSON.parse(userStr);
    // Verificamos que el objeto tenga la estructura esperada
    if (parsedUser && parsedUser.id && parsedUser.email) {
      return parsedUser;
    }
    return null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

// Estado inicial con manejo seguro de localStorage
const initialState: AuthState = {
  user: getUserFromLocalStorage(),
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
    },
    registerSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.loading = false;
    },
    registerFailure: (state) => {
      state.loading = false;
    },
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);

      // Debug para verificar
      console.log(
        "Login success - User stored in localStorage:",
        localStorage.getItem("user"),
        "Token stored:",
        localStorage.getItem("token")
      );
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
    updateUserPoints: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.rewardPoints = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUserPoints,
} = authSlice.actions;
export default authSlice.reducer;
