import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import createSagaMiddleware, { Saga } from "redux-saga";
import sagas from "./sagas";
import {searchReducer} from "../modules/search/reducers/search";

const rootReducers = combineReducers({
  searchReducer: searchReducer
});

const sagaMiddleware = createSagaMiddleware();

const rootStore = () => {
  const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
    devTools: true,
  });
  sagaMiddleware.run(sagas);
  return store;
};

const store = rootStore(); // exported this instead;

export default store;
