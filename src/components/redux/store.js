import { combineReducers, configureStore } from "@reduxjs/toolkit";

const intState = {
  filter: 1
}

const reducer = (state = intState, action) => {
  console.log('reducer >', action)

  return state;
}

const rootRedicer = combineReducers({ reducer })


const store = configureStore({
  reducer: rootRedicer
})

export default store;