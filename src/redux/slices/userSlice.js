import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: "",
  firstName: "",
  lastName: "",
  email: "",
};

const userSlice = createSlice({
  name: "tires",
  initialState,
  reducers: {
    setUser(state, action) {
      action.payload.map((value) => {
        state.id = value.id;
        state.username = value.username;
        state.firstName = value.first_name;
        state.lastName = value.last_name;
        state.email = value.email;
      });
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
