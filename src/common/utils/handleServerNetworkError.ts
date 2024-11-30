import { Dispatch } from "redux"
import { setAppErrorAC, setAppStatusAC } from "app/model/app-reducer"
import { RequestStatus } from "common/types/enums"

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppErrorAC(error.message))
  dispatch(setAppStatusAC(RequestStatus.failed))
}