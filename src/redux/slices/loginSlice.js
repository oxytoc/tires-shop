import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginUsername: "",
  loginPassword: "",
  loginErrors: [],
  authToken: [],
};

const loginSlice = createSlice({
  name: "tires",
  initialState,
  reducers: {
    setUsername(state, action) {
      state.loginUsername = action.payload;
    },
    setPassword(state, action) {
      state.loginPassword = action.payload;
    },
    setErrors(state, action) {
      state.loginErrors = action.payload;
    },
    setAuthToken(state, action) {
      state.authToken = action.payload;
    },
  },
});

export const { setUsername, setPassword, setErrors, setAuthToken } = loginSlice.actions;

export default loginSlice.reducer;