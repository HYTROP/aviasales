import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import filtersReducer from './filtersSlice';
import ticketsReducer from './ticketsSlice';

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    tickets: ticketsReducer,
  },
}, applyMiddleware(thunk));

export default store;
