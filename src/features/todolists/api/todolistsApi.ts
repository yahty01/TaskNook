import { BaseResponse } from "common/types/all.types"
import { TodolistResponse } from "./todolistsApi.types"
import { RequestStatus } from "common/types/enums"
import { baseApi } from "app/baseApi"
import { DomainTodolist } from "common/actions/common.actions"

// `createApi` - функция из `RTK Query`, позволяющая создать объект `API`
// для взаимодействия с внешними `API` и управления состоянием приложения
export const todolistsApi = baseApi.injectEndpoints({
  // `endpoints` - метод, возвращающий объект с эндпоинтами для `API`, описанными
  // с помощью функций, которые будут вызываться при вызове соответствующих методов `API`
  // (например `get`, `post`, `put`, `patch`, `delete`)
  endpoints: (build) => ({
    // Типизация аргументов (<возвращаемый тип, тип query аргументов (`QueryArg`)>)
    // `query` по умолчанию создает запрос `get` и указание метода необязательно
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => "todo-lists",
      transformResponse: (todolists: TodolistResponse[]): DomainTodolist[] =>
        todolists.map((todolists) => ({
          ...todolists,
          filter: "all",
          entityStatus: RequestStatus.idle,
          tasksLoaded: RequestStatus.idle,
        })),
      providesTags: ["Todolist"],
    }),

    createTodolist: build.mutation<BaseResponse<{ item: TodolistResponse }>, { title: string }>({
      query: (payload) => ({
        url: "todo-lists",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Todolist"],
    }),

    removeTodolist: build.mutation<BaseResponse, { todolistId: string }>({
      query: (payload) => ({
        url: `todo-lists/${payload.todolistId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todolist"],
    }),

    updateTodolistTitle: build.mutation<
      BaseResponse<{ item: TodolistResponse }>,
      { title: string; todolistId: string }
    >({
      query: (payload) => ({
        url: `todo-lists/${payload.todolistId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Todolist"],
    }),
  }),
})

// `createApi` создает объект `API`, который содержит все эндпоинты в виде хуков,
// определенные в свойстве `endpoints`
export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} = todolistsApi

//Модульный паттерн создания объектов
// export const _todolistsApi = {
//   updateTodolist(payload: { id: string; title: string }) {
//     //При таком упаковывание принимаемых аргументов, мы не ошибемся
//     //в порядке их передачи
//     const { id, title } = payload
//     return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
//   },
//
//   createTodolist(title: string) {
//     return instance.post<BaseResponse<{ item: TodolistResponse }>>("todo-lists", { title })
//   },
//
//   removeTodolist(id: string) {
//     return instance.delete<BaseResponse>(`todo-lists/${id}`)
//   },
//
//   getTodolists() {
//     return instance.get<TodolistResponse[]>("todo-lists")
//   },
// }
