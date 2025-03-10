import { instance } from "common/lib/instance/instance"
import { BaseResponse } from "common/types/all.types"
import { GetTasksResponse, ResponseTask, UpdateTaskDomainModel } from "./tasksApi.types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },

  createTask(payload: { title: string; todolistId: string }) {
    const { title, todolistId } = payload
    return instance.post<BaseResponse<{ item: ResponseTask }>>(`todo-lists/${todolistId}/tasks`, {
      title,
    })
  },

  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { taskId, todolistId } = payload
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },

  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskDomainModel }) {
    const { taskId, model, todolistId } = payload
    return instance.put<BaseResponse<{ item: ResponseTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}
