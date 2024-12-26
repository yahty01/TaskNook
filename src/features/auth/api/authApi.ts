import { instance } from "common/lib/instance"
import { BaseResponse } from "common/types"
import { Inputs } from "../ui/Login/Login"

export const authApi = {
  me() {
    return instance.get<BaseResponse<{ id: number; email: string; login: string }>>("auth/me")
  },
  login(payload: Inputs) {
    return instance.post<BaseResponse<{ userId: string; token: string }>>("auth/login", payload)
  },
  logout() {
    return instance.delete<BaseResponse>("auth/login")
  },
}
