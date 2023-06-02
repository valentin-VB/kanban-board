import { createSlice } from "@reduxjs/toolkit";

const initialState: { user_email: null | string; token: null | string } = {
  user_email: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { email, accessToken } = action.payload.user;
      state.user_email = email;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user_email = null;
      state.token = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
