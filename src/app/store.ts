import { tasksReducer, tasksSlice } from "../features/todolists/model/tasksSlice"
import { appReducer, appSlice } from "./model/appSlice"
import { authReducer, authSlice } from "../features/auth/model/authSlice"
import { configureStore } from "@reduxjs/toolkit"
import { todolistsReducer, todolistsSlice } from "../features/todolists/model/todolistsSlice"

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
