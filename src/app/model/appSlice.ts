import { RequestStatus } from "common/types/enums"
import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "dark" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as Error,
  },
  reducers: (create) => ({
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    changeTheme: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppError: create.reducer<{ error: Error }>((state, action) => {
      state.error = action.payload.error
    }),
  }),
})

export const { setAppError, changeTheme, setAppStatus } = appSlice.actions
export const appReducer = appSlice.reducer

//types
export type ThemeMode = "dark" | "light"
export type Error = null | string

export type AppInitialState = ReturnType<typeof appSlice.getInitialState>
