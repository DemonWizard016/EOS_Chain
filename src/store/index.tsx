import { configureStore } from "@reduxjs/toolkit";
import { walletSlice } from "./walletReducer";

export default configureStore({
  reducer: {
    wallet: walletSlice.reducer,
  },
});
