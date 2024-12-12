import { Dispatch } from "redux"
import { setAppErrorAC, setAppStatusAC } from "app/model/app-reducer"
import { RequestStatus } from "common/types/enums"

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  if (error instanceof Error) {
    dispatch(setAppErrorAC(error.message))
  } else if (typeof error === "object" && error !== null && "message" in error) {
    dispatch(setAppErrorAC((error as { message: string }).message))
  } else {
    dispatch(setAppErrorAC("Unknown error occurred"))
  }
  dispatch(setAppStatusAC(RequestStatus.failed))
}
