import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeValue: false,
  widthPopup: false,
  heightPopup: false,
  diametrPopup: false,
  brandPopup: false,
  plyRatingPopup: false,
  loadIndexPopup: false,
  widthValue: "",
  heightValue: "",
};

const optionSlice = createSlice({
  name: "option",
  initialState,
  reducers: {
    toggleWidthPopup(state, action) {
      state.widthPopup = action.payload;
    },
    toggleHeightPopup(state, action) {
      state.heightPopup = action.payload;
    },
    toggleDiametrPopup(state, action) {
      state.diametrPopup = action.payload;
    },
    toggleBrandPopup(state, action) {
      state.brandPopup = action.payload;
    },
    togglePlyRatingPopup(state, action) {
      state.plyRatingPopup = action.payload;
    },
    toggleLoadIndexPopup(state, action) {
      state.loadIndexPopup = action.payload;
    },
    setWidthValue(state, action) {
      state.widthValue = action.payload;
      state.activeValue = true;
    },
    setHeightValue(state, action) {
      state.heightValue = action.payload;
    },
    setActiveValue(state, action){
      state.activeValue = action.payload;
    }
  },
});

export const {
  setActiveValue,
  toggleWidthPopup,
  toggleBrandPopup,
  toggleDiametrPopup,
  toggleHeightPopup,
  toggleLoadIndexPopup,
  togglePlyRatingPopup,
  setWidthValue,
  setHeightValue,
} = optionSlice.actions;

export default optionSlice.reducer;
