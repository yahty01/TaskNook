import { BaseResponse } from "common/types"
import { setAppErrorAC, setAppStatusAC } from "app/model/app-reducer"
import { RequestStatus } from "common/types/enums"
import { AppDispatch } from "app/store"

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: AppDispatch) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC("Some error occurred"))
  }
  dispatch(setAppStatusAC(RequestStatus.failed))
}
