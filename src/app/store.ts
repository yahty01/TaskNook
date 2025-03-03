import { combineReducers } from "redux"
import { tasksReducer } from "../features/todolists/model/tasks-reducer"
import { appReducer } from "./model/appSlice"
import { ThunkDispatch } from "redux-thunk"
import { authReducer } from "../features/auth/model/authSlice"
import { configureStore } from "@reduxjs/toolkit"
import { todolistsReducer } from "../features/todolists/model/todolistsSlice"

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = configureStore({ reducer: rootReducer })

//Автоматически определяет тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>

//Универсальный тип для всех Action-ов всех редьюсе ров
//Достаем из редъюсера массив типов параметров и по индексу 1 у нас и находятся все скомбинированные экшены.
type AppActionsType = Parameters<typeof rootReducer>[1]

// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
// UnknownAction значит любой action у которого есøть свой тип !

//Зачем нужен AppThunk Если и без него все работает
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   AppActionsType
// >

// @ts-ignore
window.store = store
