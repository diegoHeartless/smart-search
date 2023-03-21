import {all} from "redux-saga/effects";
import searchAsyncWatcher from "./search";

export default function* searchSaga() {
    yield all([searchAsyncWatcher()])
}