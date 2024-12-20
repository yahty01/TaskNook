import { instance } from "common/lib/instance"
import { BaseResponse } from "common/types"
import { LoginArgs } from "./authApi.types"

export const authApi = {
  login(payload: LoginArgs) {
    return instance.post<BaseResponse>("/auth/login", payload)
  },
}
