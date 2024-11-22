export type ThemeModeT = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export type AppStateType = typeof initialState

export const changeThemeAC = (theme: ThemeModeT) => {
  return { type: "CHANGE-THEME", payload: { theme } } as const
}

export const setStatusAC = (status: RequestStatus) => {
  return { type: "SET-STATUS", payload: { status } } as const
}
export type changeThemeAT = ReturnType<typeof changeThemeAC>
export type setStatusAT = ReturnType<typeof setStatusAC>

type ActionsType = changeThemeAT | setStatusAT

const initialState = {
  themeMode: "light" as ThemeModeT,
  status: "idle" as RequestStatus,
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
    default:
      return state
  }
}
