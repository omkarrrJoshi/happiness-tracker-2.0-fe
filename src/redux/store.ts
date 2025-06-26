import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/root";
import { reducers } from "./reducers";
import { baseApiSlice } from "./api/baseApiSlice";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  ...reducers,
  [baseApiSlice.reducerPath]: baseApiSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(sagaMiddleware)
      .concat(baseApiSlice.middleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
