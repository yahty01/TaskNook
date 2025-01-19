import { AppDispatch } from "app/store"
import { Inputs } from "../ui/Login/Login"
import { RequestStatus, ResultCode } from "common/types/enums"
import { authApi } from "../api/authApi"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { clearTodolistsAC } from "../../todolists/model/todolists-reducer"
import { clearTasksAC } from "../../todolists/model/tasks-reducer"
import { createSlice } from "@reduxjs/toolkit"
import { setAppStatus } from "app/model/appSlice"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  //Подредьюсеры или экшены
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized
    }),
  }),
})

export const { setIsLoggedIn, setIsInitialized } = authSlice.actions
export const authReducer = authSlice.reducer

// thunks
//todo: Ok, оно работает но при обнавление на странице мейн, происходит мини редирект
export const initializeAppTC = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatus({ status: RequestStatus.loading }))
    const res = await authApi.me()
    dispatch(setAppStatus({ status: RequestStatus.succeeded }))
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (err) {
    handleServerNetworkError(err, dispatch)
    dispatch(setAppStatus({ status: RequestStatus.failed }))
  } finally {
    dispatch(setIsInitialized({ isInitialized: true }))
  }
}

export const loginTC = (data: Inputs) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatus({ status: RequestStatus.loading }))
    const res = await authApi.login(data)
    dispatch(setAppStatus({ status: RequestStatus.succeeded }))
    if (res.data.resultCode === ResultCode.Success) {
      localStorage.setItem("sn-token", res.data.data.token)
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (err) {
    handleServerNetworkError(err, dispatch)
    dispatch(setAppStatus({ status: RequestStatus.failed }))
  }
}

export const logoutTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: RequestStatus.loading }))
  authApi
    .logout()
    .then((res) => {
      dispatch(setAppStatus({ status: RequestStatus.succeeded }))
      if (res.data.resultCode === ResultCode.Success) {
        localStorage.removeItem("sn-token")
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        dispatch(clearTodolistsAC())
        dispatch(clearTasksAC())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
      dispatch(setAppStatus({ status: RequestStatus.failed }))
    })
}
//RTK 1.0
// reducers: {
//   setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
//     state.isLoggedIn = action.payload.isLoggedIn
//   },
//   setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
//     state.isInitialized = action.payload.isInitialized
//   },
// },
