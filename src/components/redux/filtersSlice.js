import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  selectedCheckBoxesId: []
};

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

export const { setAllFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
