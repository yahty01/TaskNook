import { setAppStatusAC } from "app/model/app-reducer"
import { AppDispatch } from "app/store"
import { Inputs } from "../ui/Login/Login"
import { RequestStatus, ResultCode } from "common/types/enums"
import { authApi } from "../api/authApi"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { clearTodolistsAC } from "../../todolists/model/todolists-reducer"
import { clearTasksAC } from "../../todolists/model/tasks-reducer"

// actions
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const
}

export const setIsInitializedAC = (isInitialized: boolean) => {
  return { type: "SET_IS_INITIALIZED", payload: { isInitialized } } as const
}

// thunks

//todo: Ok, оно работает но при обнавление на странице мейн, происходит мини редирект
export const initializeAppTC = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatusAC(RequestStatus.loading))
    const res = await authApi.me()
    dispatch(setAppStatusAC(RequestStatus.succeeded))
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedInAC(true))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (err) {
    handleServerNetworkError(err, dispatch)
    dispatch(setAppStatusAC(RequestStatus.failed))
  } finally {
    dispatch(setIsInitializedAC(true))
  }
}

export const loginTC = (data: Inputs) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatusAC(RequestStatus.loading))
    const res = await authApi.login(data)
    dispatch(setAppStatusAC(RequestStatus.succeeded))
    if (res.data.resultCode === ResultCode.Success) {
      localStorage.setItem("sn-token", res.data.data.token)
      dispatch(setIsLoggedInAC(true))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (err) {
    handleServerNetworkError(err, dispatch)
    dispatch(setAppStatusAC(RequestStatus.failed))
  }
}

export const logoutTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC(RequestStatus.loading))
  authApi
    .logout()
    .then((res) => {
      dispatch(setAppStatusAC(RequestStatus.succeeded))
      if (res.data.resultCode === ResultCode.Success) {
        localStorage.removeItem("sn-token")
        dispatch(setIsLoggedInAC(false))
        dispatch(clearTodolistsAC())
        dispatch(clearTasksAC())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
      dispatch(setAppStatusAC(RequestStatus.failed))
    })
}

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
}

//reducer
export const authReducer = (state: AuthState = initialState, action: ActionsType): AuthState => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN": {
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    }
    case "SET_IS_INITIALIZED": {
      return { ...state, isInitialized: action.payload.isInitialized }
    }
    default:
      return state
  }
}

//types
export type AuthState = typeof initialState

type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setIsInitializedAC>
