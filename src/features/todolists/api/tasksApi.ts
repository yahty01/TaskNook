import { BaseResponse } from "common/types/all.types"
import { DomainTask, GetTasksResponse, ResponseTask, UpdateTaskDomainModel } from "./tasksApi.types"
import { baseApi } from "app/baseApi"
import { RequestStatus } from "common/types/enums"
import { instance } from "common/lib/instance"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse<DomainTask>, string>({
      query: (todolistId) => `todo-lists/${todolistId}/tasks`,
      transformResponse: (res: GetTasksResponse<ResponseTask>): GetTasksResponse<DomainTask> => ({
        error: res.error,
        totalCount: res.totalCount,
        items: res.items.map((task) => ({
          ...task,
          entityStatus: RequestStatus.idle,
        })),
      }),
      providesTags: ["Task"],
    }),
    createTask: build.mutation<BaseResponse<{ item: ResponseTask }>, { title: string; todolistId: string }>({
      query: (payload) => ({
        url: `todo-lists/${payload.todolistId}/tasks`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: (payload) => ({
        url: `todo-lists/${payload.todolistId}/tasks/${payload.taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: build.mutation<
      BaseResponse<{ item: ResponseTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskDomainModel }
    >({
      query(payload) {
        const { todolistId, taskId, model } = payload
        return {
          url: `todo-lists/${todolistId}/tasks/${taskId}`,
          method: "PUT",
          body: model,
        }
      },
      invalidatesTags: ["Task"],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi

export const _tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse<ResponseTask>>(`todo-lists/${todolistId}/tasks`)
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
