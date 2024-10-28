import { applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from "redux"
import { tasksReducer } from "../features/todolists/model/tasks-reducer"
import { todolistsReducer } from "../features/todolists/model/todolists-reducer"
import { appReducer } from "./model/app-reducer"
import { thunk, ThunkDispatch } from "redux-thunk"

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
})

export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
// UnknownAction значит любой action у которого есть свой тип !
// export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
