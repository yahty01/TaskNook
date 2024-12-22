import { instance } from "common/lib/instance"
import { BaseResponse } from "common/types"
import { LoginArgs } from "./authApi.types"
import { Inputs } from "../ui/Login/Login"

export const authApi = {
  login(payload: Inputs) {
    return instance.post<BaseResponse<{ userId: string; token: string }>>("/auth/login", payload)
  },
  logout() {
    return instance.delete<BaseResponse>("/auth/login")
  },
}
