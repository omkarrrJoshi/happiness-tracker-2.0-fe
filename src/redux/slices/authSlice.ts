import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null;
}

const initialState: AuthState = {
  user: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      const user = action.payload;
      state.user = user
        ? {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          }
        : null;
    },
    logout(state) {
      state.user = null;
    }
  }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
