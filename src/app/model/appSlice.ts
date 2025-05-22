import { RequestStatus } from "common/types/enums"
import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "dark" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as Error,
    isLoggedIn: false,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
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
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
  extraReducers: (builder) => {
    builder.addMatcher(isPending, (state) => {
      state.status = RequestStatus.loading
    })
    builder.addMatcher(isFulfilled, (state) => {
      state.status = RequestStatus.succeeded
    })
    builder.addMatcher(isRejected, (state) => {
      state.status = RequestStatus.failed
    })
  },
})

export const { setAppError, changeTheme, setAppStatus, setIsLoggedIn } = appSlice.actions
export const { selectIsLoggedIn, selectStatus, selectError, selectThemeMode } = appSlice.selectors
export const appReducer = appSlice.reducer

//types
export type ThemeMode = "dark" | "light"
export type Error = null | string

export type AppInitialState = ReturnType<typeof appSlice.getInitialState>
