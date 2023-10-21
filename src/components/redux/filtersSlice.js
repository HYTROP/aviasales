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
      title: "1 пересадка",
      isChecked: false,
    },
    {
      id: "3",
      title: "2 пересадка",
      isChecked: false,
    },
    {
      id: "4",
      title: "3 пересадка",
      isChecked: false,
    },
  ],
};

// create slice
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setAllFilter: (state, action) => {
      state.checkBoxes = action.payload;
    },
  },
});
// export action creators
export const { setAllFilter } = filtersSlice.actions;

// export reducer
export default filtersSlice.reducer;

// // Action creators >>
// export function setAllFilter(filterStatus) {
//   return {
//     type: "filters/all/set",
//     payload: filterStatus,
//   };
// }

// // REDUCERS >>
// export default function filtersReducer(state = initialState, action) {
//   switch (action.type) {
//     case "filters/all/set":
//       return {
//         ...state,
//         checkBoxes: action.payload,
//       };

//     default:
//       return state;
//   }
// }
