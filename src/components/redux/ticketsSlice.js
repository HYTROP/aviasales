import { createSlice } from "@reduxjs/toolkit";
import { _apiBase } from "../api/AviaAPI";
import { _getTickets } from "../api/AviaAPI";

export const initialState = {
  ticketsFetch: [],
  isLoading: false,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    fetchTicketsSuccess(state, action) {
      state.ticketsFetch = action.payload;
      state.isLoading = false;
    },
    isLoadingTickets(state) {
      state.isLoading = true;
    },
  },
});

export function fetchTicketsSuccess() {
  return async function ticketFetching(dispatch, getState) {
    dispatch({ type: "tickets/isLoadingTickets" });
    // LOADING
    try {
      const searchResponse = await fetch(
        "https://aviasales-test-api.kata.academy/search"
      );
      if (!searchResponse.ok) {
        throw new Error("Ошибка при выполнении запроса 0");
      }
      const data = await searchResponse.json();

      const value = Object.values(data);

      const ticketResponse = await fetch(
        // `${_apiBase}${_getTickets}${_searchId}`
        `${_apiBase}${_getTickets}searchId=${value}`
      );

      if (!ticketResponse.ok) {
        throw new Error("Ошибка при выполнении запроса 2");
      }
      const secondData = await ticketResponse.json();

      console.log(secondData);

      dispatch({ type: "tickets/fetchTicketsSuccess", payload: secondData });
    } catch (error) {
      console.error(error);
    }
  };
}

export default ticketsSlice.reducer;
