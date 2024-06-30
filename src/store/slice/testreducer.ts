import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../RootState";

export type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const counterActions = counterSlice.actions;
export const testReducer = counterSlice.reducer;

export const useCounter = () =>
  useSelector((state: RootState) => state.counter);
