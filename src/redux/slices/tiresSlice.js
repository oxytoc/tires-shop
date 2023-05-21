import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  favItems: [],
};

const tiresSlice = createSlice({
  name: "tires",
  initialState,
  reducers: {
    toggleFavItem(state, action) {
      const findItemId = state.favItems.find(
        (obj) => obj.id === action.payload.id
      );
      if (findItemId) {
        state.favItems = state.favItems.filter(
          (obj) => obj.id !== action.payload.id
        );
      } else {
        state.favItems.push({
          ...action.payload,
        });
      }
    },
    setItems(state, action) {
      state.items = action.payload;
    },
    setFavoriteItems(state, action) {
      state.favItems = action.payload;
    },
  },
});

export const { setItems, setFavoriteItems, toggleFavItem } = tiresSlice.actions;

export default tiresSlice.reducer;
