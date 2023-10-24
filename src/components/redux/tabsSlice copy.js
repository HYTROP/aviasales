import { createSlice } from "@reduxjs/toolkit";
// REDUCER, INITIAL STATE, ACTIONS

const initialState = {
  price: false,
  speed: false,
  amount: 5,
  arrayFilter: [],
};

const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    priceFilter(state, action) {
      const newArrPrice = action.payload.ticketsList
        .slice()
        .sort((a, b) => a.price - b.price);
      state.arrayFilter = [...newArrPrice];
      state.price = true;
      state.speed = false;
    },
    speedFilter(state, action) {
      const newArrSpeed = action.payload.ticketsList
        .slice()
        .sort((a, b) => a.segments[0].duration - b.segments[0].duration);
      state.arrayFilter = [...newArrSpeed];
      state.price = false;
      state.speed = true;
    },
    addAmount(state) {
      state.amount += 5;
    },
  },
});

export const { priceFilter, speedFilter, addAmount } = tabSlice.actions;

export default tabSlice.reducer;
