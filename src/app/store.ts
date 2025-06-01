import { appReducer, appSlice } from "./model/appSlice"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "app/baseApi"
import { errorMiddleware } from "common/utils"

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware, errorMiddleware),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
