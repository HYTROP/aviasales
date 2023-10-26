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
      filterFunction: (tickets) => { return [...tickets].filter((item) => item.segments[0].stops.length === 0) },
    },
    {
      id: "3",
      title: "1 пересадка",
      isChecked: false,
      filterFunction: (tickets) => { return [...tickets].filter((item) => item.segments[0].stops.length === 1) },
    },
    {
      id: "4",
      title: "2 пересадки",
      isChecked: false,
      filterFunction: (tickets) => { return [...tickets].filter((item) => item.segments[0].stops.length === 2) },
    },
    {
      id: "5",
      title: "3 пересадки",
      isChecked: false,
      filterFunction: (tickets) => { return [...tickets].filter((item) => item.segments[0].stops.length === 3) },
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
    setFilterCheckbox(state, action) {
      const { checkboxId, isChecked } = action.payload;
      const checkboxIndex = state.checkBoxes.findIndex((checkbox) => checkbox.id === checkboxId);
      if (checkboxIndex !== -1) {
        state.checkBoxes[checkboxIndex].isChecked = isChecked;
      }
    },
  },
});

export function setAllFilters(newCheckBoxes) {

  return function (dispatch, getState) {
    dispatch(setAllFilter(newCheckBoxes));
  };
}

// export action creators >>
export const { setAllFilter } = filtersSlice.actions;

// export reducer
export default filtersSlice.reducer;
