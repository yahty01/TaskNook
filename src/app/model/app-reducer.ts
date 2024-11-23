export type ThemeModeT = "dark" | "light"

export enum RequestStatus {
  idle = "idle",
  loading = "loading",
  succeeded = "succeeded",
  failed = "failed",
}

export type Error = null | string

export const changeThemeAC = (theme: ThemeModeT) => {
  return { type: "CHANGE-THEME", payload: { theme } } as const
}

export const setStatusAC = (status: RequestStatus) => {
  return { type: "SET-STATUS", payload: { status } } as const
}

export const setErrorAC = (error: Error) => {
  return { type: "SET-ERROR", payload: { error } } as const
}

export type changeThemeAT = ReturnType<typeof changeThemeAC>
export type setStatusAT = ReturnType<typeof setStatusAC>
export type setErrorAT = ReturnType<typeof setErrorAC>

type ActionsType = changeThemeAT | setStatusAT | setErrorAT

export type AppStateType = typeof initialState

const initialState = {
  themeMode: "light" as ThemeModeT,
  status: "idle" as RequestStatus,
  error: "xx" as Error,
}

export const appReducer = (
  state: AppStateType = initialState,
  action: ActionsType,
): AppStateType => {
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
