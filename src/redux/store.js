import { configureStore } from "@reduxjs/toolkit";
import { compose } from "redux";
import reducers from "./reducers/reducers";

const composeEnhancers =
  window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;

const store = configureStore(
  {
    reducer: reducers,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  },
  composeEnhancers()
);

export default store;