import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filtersSlice';
// import ticketsReducer from './ticketsSlice';

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    // tickets: ticketsReducer,
  },
});

export default store;












// import { combineReducers, createStore } from "redux";
// import filtersReducer from "./filtersSlice";

// // ДОБАВИТЬ РЕДЮСЕР ДЛЯ БИЛЕТОВ!!


// const rootReducer = combineReducers({
//   filters: filtersReducer,
//   // tickets : ticketsReducer;
// })

// const store = createStore(rootReducer);
// export default store;