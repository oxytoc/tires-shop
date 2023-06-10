import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  errors: [],
};

const registrationSlice = createSlice({
  name: "tires",
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username= action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
  },
});

export const { setUsername, setPassword, setErrors } = registrationSlice.actions;

export default registrationSlice.reducer;
