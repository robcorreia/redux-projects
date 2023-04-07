import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import contador from "./reducers/contador";
import modal from "./reducers/modal";
// import logger from "./middleware/logger";
import login from "./reducers/login";
import localStorage from "./middleware/localStorage";

const middleware = [...getDefaultMiddleware(), localStorage];
const reducer = combineReducers({ contador, modal, login });
const store = configureStore({ reducer, middleware });
export default store;
