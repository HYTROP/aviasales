import { current, createSlice } from "@reduxjs/toolkit";
import { _apiBase } from "../api/AviaAPI";
import { _getTickets } from "../api/AviaAPI";
const limit = 5;
export const initialState = {
  ticketsData: [],
  isLoading: null,
  displayedTickets: [],
  pageNumber: 1,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    fetchTicketsSuccess: (state, action) => {
      const prevState = current(state)
      console.log(prevState)
      console.log(action.payload)
      state.ticketsData = [...prevState.ticketsData, ...action.payload.tickets]
    },
    isLoadingTickets: (state, action) => {
      state.isLoading = action.payload;
    },
    showMoreTickets(state, action) {
      const prevState = current(state)
      const newTickets = prevState.ticketsData.slice(limit * prevState.pageNumber - limit, limit * prevState.pageNumber)
      const prevTickets = !action.payload ? prevState.displayedTickets : []
      state.displayedTickets = [...prevTickets, ...newTickets]
      state.pageNumber++;
    },
    sortTicketsSuccess(state, action) {
      console.log('sort tickets')
      const prevState = current(state);
      state.ticketsData = [...action.payload(prevState.ticketsData)];

    }
  },
});
let searchQuery = '';

export function fetchTickets() {
  return async function ticketFetching(dispatch, getState) {
    dispatch({ type: "tickets/isLoadingTickets", payload: true });
    // LOADING
    try {
      if (!searchQuery) {
        const searchResponse = await fetch(
          `${_apiBase}/search`
        );
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

export function sortTickets(sortFunction) {
  return function (dispatch, getState) {
    dispatch({ type: 'tickets/sortTicketsSuccess', payload: sortFunction })
    dispatch({ type: 'tickets/showMoreTickets', payload: true })
  }
}

export default ticketsSlice.reducer;
