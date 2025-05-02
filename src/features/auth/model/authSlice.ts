import { AppDispatch } from "app/store"
import { Inputs } from "../ui/Login/Login"
import { RequestStatus, ResultCode } from "common/types/enums"
import { authApi } from "../api/authApi"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { createSlice } from "@reduxjs/toolkit"
import { setAppStatus } from "app/model/appSlice"
import { clearTodolistsData } from "common/actions/common.actions"
import { AUTH_TOKEN } from "common/constants"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectIsInitialized: (state) => state.isInitialized,
  },
  // reducers состоит из подредьюсеров, каждый из которых эквивалентен одному
  // оператору case в switch, как мы делали раньше (обычный redux)
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      // логику в подредьюсерах пишем мутабельным образом,
      // т.к. иммутабельность достигается благодаря immer.js
      if (state.isLoggedIn !== action.payload.isLoggedIn) state.isLoggedIn = action.payload.isLoggedIn
      else return
    }),
    setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized
    }),
  }),
})

// Action creator также достаем с помощью slice
export const { setIsLoggedIn, setIsInitialized } = authSlice.actions
// Создаем reducer при помощи slice
export const authReducer = authSlice.reducer

export const { selectIsLoggedIn, selectIsInitialized } = authSlice.selectors

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
      localStorage.setItem(AUTH_TOKEN, res.data.data.token)
      console.log(localStorage.getItem(AUTH_TOKEN))
      console.log(localStorage.getItem("auth-token"))
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
      if (res.data.resultCode === ResultCode.Success) {
        localStorage.removeItem(AUTH_TOKEN)
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        dispatch(clearTodolistsData({ tasks: {}, todolists: [] }))
        dispatch(setAppStatus({ status: RequestStatus.succeeded }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
      dispatch(setAppStatus({ status: RequestStatus.failed }))
    })
}
