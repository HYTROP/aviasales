import { createSlice } from "@reduxjs/toolkit";

// INIT STATE >>
export const initialState = {
  selectedCheckBoxesId: []
};

// create slice >>
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setAllFilter(state, action) {
      state.selectedCheckBoxesId = action.payload;
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

export function setAllFilters(newCheckBoxesIds) {

  return function (dispatch, getState) {
    dispatch(setAllFilter(newCheckBoxesIds));
  };
}

// export action creators >>
export const { setAllFilter } = filtersSlice.actions;

// export reducer
export default filtersSlice.reducer;
