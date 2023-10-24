import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import filtersReducer from './filtersSlice';
import ticketsReducer from './ticketsSlice';
import tabsReducer from './tabsSlice';

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    tickets: ticketsReducer,
    tabs: tabsReducer,
  },
}, applyMiddleware(thunk));


export default store;
