import { configureStore } from "@reduxjs/toolkit";
import tiresSlice from "../redux/slices/tiresSlice";
import drawerSlice from "../redux/slices/drawerSlice";
import searchSlice from "./slices/searchSlice";
import optionSlice from "./slices/optionSlice";

export const store = configureStore({
  reducer: { tiresSlice, drawerSlice, searchSlice, optionSlice },
});
