import { BaseResponse } from "common/types/all.types"
import { DomainTask, GetTasksResponse, ResponseTask, UpdateTaskDomainModel } from "./tasksApi.types"
import { baseApi } from "app/baseApi"
import { RequestStatus } from "common/types/enums"
import { PAGE_SIZE } from "common/constants"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse<DomainTask>, { todolistId: string; params: { page: number } }>({
      query: ({ todolistId, params }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        params: { ...params, count: PAGE_SIZE },
      }),
      transformResponse: (res: GetTasksResponse<ResponseTask>): GetTasksResponse<DomainTask> => ({
        error: res.error,
        totalCount: res.totalCount,
        items: res.items.map((task) => ({
          ...task,
          entityStatus: RequestStatus.idle,
        })),
      }),
      providesTags: (_res, _error, { todolistId }, _meta) => [{ type: "Task", id: todolistId }],
    }),
    createTask: build.mutation<BaseResponse<{ item: ResponseTask }>, { title: string; todolistId: string }>({
      query: (payload) => ({
        url: `todo-lists/${payload.todolistId}/tasks`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (_result, _error, { todolistId }, _meta) => [{ type: "Task", id: todolistId }],
    }),
    deleteTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: (payload) => ({
        url: `todo-lists/${payload.todolistId}/tasks/${payload.taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { todolistId }, _meta) => [{ type: "Task", id: todolistId }],
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
      invalidatesTags: (_result, _error, { todolistId }, _meta) => [{ type: "Task", id: todolistId }],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi
