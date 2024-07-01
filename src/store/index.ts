import { configureStore } from "@reduxjs/toolkit";
import { artworksReducer } from "./artworksReducer"; // Import your reducer(s)

export const store = configureStore({
  reducer: {
    artworks: artworksReducer, // Add your reducer(s) here
  },
});
