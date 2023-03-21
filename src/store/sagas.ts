
import { all } from "redux-saga/effects";
import searchSaga from "../modules/search/sagas";

export default function* sagas() {
  yield all([searchSaga()]);
}