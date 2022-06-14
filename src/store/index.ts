import { useDispatch } from "react-redux";
import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";

import {
  applyMiddleware,
  combineReducers,
  createStore,
  AnyAction,
} from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

import reducers from "./reducers";

// сбор редюсеров
const rootReducer = combineReducers(reducers);


// создание состояния, добавление middleWare
export const store = configureStore({
  reducer: rootReducer,
  middleware: new MiddlewareArray().concat(thunk),
});


//тип состояния
export type RootState = ReturnType<typeof store.getState>

//тип диспача
export type AppDispatch = typeof store.dispatch

// типизация useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

