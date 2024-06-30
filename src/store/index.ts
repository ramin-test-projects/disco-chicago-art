import { configureStore } from "@reduxjs/toolkit";
import { testReducer } from "./slice/testreducer"; // Import your reducer(s)

export const store = configureStore({
  reducer: {
    counter: testReducer, // Add your reducer(s) here
  },
});
