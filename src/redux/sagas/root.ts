import { all } from "redux-saga/effects";
import { watchDailyTaskSaga } from "./dailyTaskSaga";


export default function* rootSaga() {
  yield all([watchDailyTaskSaga()]);
}
