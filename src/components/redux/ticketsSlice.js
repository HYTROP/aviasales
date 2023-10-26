import { current, createSlice } from "@reduxjs/toolkit";
import { _apiBase } from "../api/AviaAPI";
import { _getTickets } from "../api/AviaAPI";
import { CHECKBOXES } from "../TicketsFilter/constants";
import { TABS } from "../MyTab/constants";
const limit = 5;

export const initialState = {
  ticketsData: [],
  isLoading: null,
  displayedTickets: [],
  filteredTickets: [],
  pageNumber: 1,
  currentTabId: 1,
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
      const selectedCheckBoxes = CHECKBOXES.filter(checkBox => action.payload.includes(checkBox.id))
      const mainCheckBox = selectedCheckBoxes.filter(
        (checkBox) => checkBox.title === "Все"
      );
      if (!selectedCheckBoxes.length) {
        state.filteredTickets = []
      } else if (mainCheckBox.length) {
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
      const tab = TABS.find(item => item.id === action.payload);
      const sortFunction = tab.sortFunction;
      const prevState = current(state);
      const sortedTickets = sortFunction(prevState.filteredTickets);

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
      state.currentTabId = Number(action.payload);
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
    const id = getState().tickets.currentTabId
    dispatch({ type: "tickets/sortTicketsSuccess", payload: id });
    dispatch({ type: "tickets/showMoreTickets", payload: true });
  };
}
export function filterTickets(selectedCheckBoxesId) {
  return function (dispatch, getState) {
    dispatch({ type: "tickets/filterFunc", payload: selectedCheckBoxesId });
    dispatch(sortTickets());
  };
}

export default ticketsSlice.reducer;
