import { applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from "redux"
import { tasksReducer } from "../features/todolists/model/tasks-reducer"
import { todolistsReducer } from "../features/todolists/model/todolists-reducer"
import { appReducer } from "./model/app-reducer"
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk"

//Объединяем reducer-ы с помощью combineReducers,
//Мы создаем структуру нашего единственного объекта-состояния
export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
})

//непосредственно создаем store
export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

//Автоматически определяет тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>

//Универсальный тип для всех Action-ов всех редьюсе ров
//Достаем из редъюсера массив типов параметров и по индексу 1 у нас и находятся все скомбинированные экшены.
type AppActionsType = Parameters<typeof rootReducer>[1]

export type x = ThunkDispatch<RootState, unknown, AppActionsType>
// UnknownAction значит любой action у которого есть свой тип !
// export type AppDispatch = typeof store.dispatch

//Зачем нужен AppThunk Если и без него все работает
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   AppActionsType
// >

// @ts-ignore
window.store = store
