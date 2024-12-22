// actions
import { setAppStatusAC } from "app/model/app-reducer"
import { AppDispatch } from "app/store"
import { Inputs } from "../ui/Login/Login"
import { RequestStatus, ResultCode } from "common/types/enums"
import { authApi } from "../api/authApi"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { Path } from "common/routing"

export const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: "SET-IS-LOGGED-IN", payload: { isLoggedIn } } as const
}

// thunks
export const loginTC = (data: Inputs) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatusAC(RequestStatus.loading))
    const res = await authApi.login(data)
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatusAC(RequestStatus.succeeded))
      localStorage.setItem("sn-token", res.data.data.token)
      sessionStorage.setItem("isLoggedIn", "true")
      dispatch(setIsLoggedInAC(true))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (err) {
    handleServerNetworkError(err, dispatch)
  }
}

export const logoutTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC(RequestStatus.loading))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        sessionStorage.setItem("isLoggedIn", "false")
        localStorage.removeItem("sn-token")
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC(RequestStatus.succeeded))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

const getInitialIsLoggedIn = (): boolean => {
  const storedValue = sessionStorage.getItem("isLoggedIn")
  if (storedValue === null) {
    return false
  } else {
    return JSON.parse(storedValue)
  }
}

const initialState = {
  isLoggedIn: getInitialIsLoggedIn(),
}

//reducer
export const authReducer = (state: AuthState = initialState, action: ActionsType): AuthState => {
  switch (action.type) {
    case "SET-IS-LOGGED-IN": {
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    }
    default:
      return state
  }
}

//types
export type AuthState = typeof initialState

type ActionsType = ReturnType<typeof setIsLoggedInAC>
