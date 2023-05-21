import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalPrice: 0,
  cartOpenned: false,
};

const drawerSlice = createSlice({
  name: "tires",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItemId = state.cartItems.find(
        (obj) => obj.id === action.payload.id
      );
      if (findItemId) {
        findItemId.count++;
      } else {
        state.cartItems.push({
          ...action.payload,
          count: 1,
        });
      }
    },
    decreaseItem(state, action) {
      const findItemId = state.cartItems.find(
        (obj) => obj.id === action.payload
      );

      if (findItemId && findItemId.count > 1) {
        findItemId.count--;
      } else {
        state.cartItems = state.cartItems.filter(
          (obj) => obj.id !== action.payload
        );
      }
    },
    removeItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (obj) => obj.id !== action.payload.id
      );
    },
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
    setCartOpenned(state, action) {
      state.cartOpenned = action.payload;
    },
    setTotalPrice(state) {
      state.totalPrice = state.cartItems.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
  },
});

export const {
  setCartOpenned,
  setCartItems,
  addItem,
  setTotalPrice,
  removeItem,
  decreaseItem,
} = drawerSlice.actions;

export default drawerSlice.reducer;
