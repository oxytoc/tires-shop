import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  favItems: [],
  category: 1,
  categoryName: "Каталог грузовых шин",
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
    setCategory(state, action) {
      state.category = action.payload;
      if (action.payload === 1) {
        state.categoryName = "Каталог грузовых шин";
      } else {
        state.categoryName = "Каталог шин для спецтехники";
      }
    },
  },
});

export const { setItems, setFavoriteItems, toggleFavItem, setCategory } = tiresSlice.actions;

export default tiresSlice.reducer;
