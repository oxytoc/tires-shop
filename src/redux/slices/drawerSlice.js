import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idItems: [],
  cartItems: [],
  totalPrice: 0,
  cartOpenned: false,
  loginOpenned: false,
  registrationOpenned: false,
};

const drawerSlice = createSlice({
  name: "tires",
  initialState,
  reducers: {
    setIdItems(state, action) {
      action.payload.map(obj => {
        return state.idItems.push(obj.item);
      })
    },
    addItem(state, action) {
      const findItemId = state.cartItems.find(
        (obj) => obj.id === action.payload.id
      );
      if (findItemId) {
        findItemId.count++;
      } else {
        state.cartItems.push({
          ...action.payload
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

    setLoginOpenned(state, action) {
      state.loginOpenned = action.payload;
    },

    setRegistrationOpenned(state, action) {
      state.registrationOpenned = action.payload;
    },
    
  },
});

export const {
  setCartOpenned,
  setLoginOpenned,
  setRegistrationOpenned,
  setCartItems,
  addItem,
  setTotalPrice,
  removeItem,
  decreaseItem,
  setIdItems,
} = drawerSlice.actions;

export default drawerSlice.reducer;
