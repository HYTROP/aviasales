import { createSlice } from "@reduxjs/toolkit";

// INIT STATE >>
export const initialState = {
  checkBoxes: [
    {
      id: "1",
      title: "Все",
      isChecked: false,
    },
    {
      id: "2",
      title: "Без пересадок",
      isChecked: false,
    },
    {
      id: "3",
      title: "1 пересадка",
      isChecked: false,
    },
    {
      id: "4",
      title: "2 пересадки",
      isChecked: false,
    },
    {
      id: "5",
      title: "3 пересадки",
      isChecked: false,
    },
  ],
};

// create slice >>
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setAllFilter(state, action) {
      state.checkBoxes = action.payload;
    },
  },
});

// export action creators >>
export const { setAllFilter } = filtersSlice.actions;

// export reducer
export default filtersSlice.reducer;
