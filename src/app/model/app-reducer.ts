import { RequestStatus } from "common/types/enums"

//actions
export const setAppStatusAC = (status: RequestStatus) => ({ type: "SET-STATUS", payload: { status } }) as const
export const changeThemeAC = (theme: ThemeModeT) => ({ type: "CHANGE-THEME", payload: { theme } }) as const
export const setAppErrorAC = (error: Error) => ({ type: "SET-ERROR", payload: { error } }) as const

const initialState = {
  themeMode: "dark" as ThemeModeT,
  status: "idle" as RequestStatus,
  error: null as Error,
}

//reducer
export const appReducer = (state: AppStateType = initialState, action: ActionsApp): AppStateType => {
  switch (action.type) {
    case "CHANGE-THEME": {
      return {
        ...state,
        themeMode: action.payload.theme === "dark" ? "light" : "dark",
      }
    }

    case "SET-STATUS": {
      return { ...state, status: action.payload.status }
    }

    case "SET-ERROR": {
      return { ...state, error: action.payload.error }
    }
    default:
      return state
  }
}

//types
type ActionsApp =
  | ReturnType<typeof changeThemeAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
export type ThemeModeT = "dark" | "light"
export type Error = null | string
export type AppStateType = typeof initialState
