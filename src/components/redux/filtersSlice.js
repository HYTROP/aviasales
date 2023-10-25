import { createSlice } from "@reduxjs/toolkit";

const filterByStop = (tickets, stops) => tickets.filter(ticket => ticket.stops === stops);
// INIT STATE >>
export const initialState = {
  checkBoxes: [
    {
      id: "1",
      title: "Все",
      isChecked: false,
      filterCheckProp: (tickets) => tickets,
    },
    {
      id: "2",
      title: "Без пересадок",
      isChecked: false,
      filterFunction: (tickets) => filterByStop(tickets, 0),
    },
    {
      id: "3",
      title: "1 пересадка",
      isChecked: false,
      filterFunction: (tickets) => filterByStop(tickets, 1),
    },
    {
      id: "4",
      title: "2 пересадки",
      isChecked: false,
      filterFunction: (tickets) => filterByStop(tickets, 2),
    },
    {
      id: "5",
      title: "3 пересадки",
      isChecked: false,
      filterFunction: (tickets) => filterByStop(tickets, 3),
    },
  ],
};

console.log(filterByStop([1, 12, 242,], 2))


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

export function filterTickets(newCheckBoxes) {
  return function (dispatch, getState) {
    const { checkBoxes } = getState().filters;
    console.log(checkBoxes.map(i => i.filterFunction)) // OKOK

    // // Получить только выбранные фильтры
    const selectedFilters = checkBoxes.filter(checkBox => checkBox.isChecked);
    console.log('selectedFilters', selectedFilters)

    // // Извлечь функции из выбранных фильтров
    const filterFunctions = selectedFilters.map(filter => filter.filterFunction);

    console.log('filterFunctions >>', filterFunctions)

    dispatch(setAllFilter(newCheckBoxes));
    dispatch({ type: 'tickets/filterFunc', payload: filterFunctions });

  };
}

// export action creators >>
export const { setAllFilter } = filtersSlice.actions;

// export reducer
export default filtersSlice.reducer;
