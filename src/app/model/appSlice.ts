import { RequestStatus } from "common/types/enums"
import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { todolistsApi } from "../../features/todolists/api/todolistsApi"
import { tasksApi } from "../../features/todolists/api/tasksApi"
import { getInitialThemeMode, ThemeMode } from "common/utils/theme/themeUtils"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: getInitialThemeMode(),
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
      const newTheme = action.payload.themeMode === "dark" ? "light" : "dark"
      localStorage.setItem("theme", newTheme)
      state.themeMode = newTheme
    }),
    setAppError: create.reducer<{ error: Error }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
  extraReducers: (builder) => {
    builder.addMatcher(isPending, (state, action) => {
      if (
        todolistsApi.endpoints.getTodolists.matchPending(action) ||
        tasksApi.endpoints.getTasks.matchPending(action)
      ) {
        return
      }
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
export type Error = null | string

export type AppInitialState = ReturnType<typeof appSlice.getInitialState>
