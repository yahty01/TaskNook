import { Dispatch } from "redux"
import { setAppError, setAppStatus } from "app/model/appSlice"
import { RequestStatus } from "common/types/enums"

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  if (error instanceof Error) {
    dispatch(setAppError({ error: error.message }))
  } else if (typeof error === "object" && error !== null && "message" in error) {
    dispatch(setAppError({ error: (error as { message: string }).message }))
  } else {
    dispatch(setAppError({ error: "Unknown error occurred" }))
  }
  dispatch(setAppStatus({ status: RequestStatus.failed }))
}
