import { current, createSlice } from "@reduxjs/toolkit";
import { _apiBase } from "../api/AviaAPI";
import { _getTickets } from "../api/AviaAPI";
const limit = 5;

export const initialState = {
  ticketsData: [], // храним после фетча
  isLoading: null,
  displayedTickets: [], // отображаем после сортировки
  filteredTickets: [], // храним после фильтрации и фетча
  pageNumber: 1,
  currentTab: {},
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    fetchTicketsSuccess: (state, action) => {
      const prevState = current(state);
      state.ticketsData = [...prevState.ticketsData, ...action.payload.tickets];
    },
    isLoadingTickets: (state, action) => {
      state.isLoading = action.payload;
    },
    filterFunc(state, action) {
      const prevState = current(state);
      // Получить только выбранные фильтры
      const selectedCheckBoxes = action.payload.filter(
        (checkBox) => checkBox.isChecked
      );
      const mainCheckBox = selectedCheckBoxes.filter(
        (checkBox) => checkBox.title === "Все"
      );
      if (!selectedCheckBoxes.length || mainCheckBox.length) {
        state.filteredTickets = [...prevState.ticketsData];
      } else {
        const filterFunctionsProp = selectedCheckBoxes.map(
          (checkBox) => checkBox.filterFunction
        );

        let resultArray = [];
        filterFunctionsProp.forEach((func) => {
          return resultArray.push(...func(prevState.ticketsData));
        });
        state.filteredTickets = resultArray;
      }
    },
    sortTicketsSuccess(state, action) {
      const prevState = current(state);
      const sortedTickets = action.payload(prevState.filteredTickets);

      state.filteredTickets = sortedTickets;
    },
    showMoreTickets(state, action) {
      const prevState = current(state);
      const newTickets = prevState.filteredTickets.slice(
        limit * prevState.pageNumber - limit,
        limit * prevState.pageNumber
      );
      const prevTickets = !action.payload ? prevState.displayedTickets : [];
      state.displayedTickets = [...prevTickets, ...newTickets];
      state.pageNumber++;
    },
    setCurrentTab(state, action) {
      state.currentTab = action.payload;
    },
  },
});
let searchQuery = "";

export function fetchTickets() {
  return async function ticketFetching(dispatch, getState) {
    dispatch({ type: "tickets/isLoadingTickets", payload: true });

    try {
      if (!searchQuery) {
        const searchResponse = await fetch(`${_apiBase}/search`);
        if (!searchResponse.ok) {
          throw new Error("Ошибка при выполнении запроса search Id");
        }
        const searchIdGenerator = await searchResponse.json();

        searchQuery = Object.values(searchIdGenerator);
      }

      const ticketResponse = await fetch(
        `${_apiBase}${_getTickets}searchId=${searchQuery}`
      );

      if (!ticketResponse.ok) {
        throw new Error("Ошибка при выполнении запроса 2");
      }
      const data = await ticketResponse.json();
      dispatch({ type: "tickets/fetchTicketsSuccess", payload: data });
      if (!data.stop) {
        dispatch(fetchTickets());
      } else {
        dispatch({ type: "tickets/isLoadingTickets", payload: false });
      }
    } catch (error) {
      console.error(error);
      dispatch(fetchTickets());
    }
  };
}

export function sortTickets() {
  return function (dispatch, getState) {
    const sortFunction = getState().tickets.currentTab.sortFunction;
    dispatch({ type: "tickets/sortTicketsSuccess", payload: sortFunction });
    dispatch({ type: "tickets/showMoreTickets", payload: true });
  };
}
export function filterTickets(checkBoxes) {
  return function (dispatch, getState) {
    dispatch({ type: "tickets/filterFunc", payload: checkBoxes });
    dispatch(sortTickets());
  };
}

export default ticketsSlice.reducer;
