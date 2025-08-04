// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer'; // assuming you combined auth + item

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
