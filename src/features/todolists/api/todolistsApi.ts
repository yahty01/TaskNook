import { BaseResponse } from "common/types/types"
import { Todolist } from "./todolistsApi.types"
import { instance } from "common/instance/instance"

//Модульный паттерн создания объектов

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("todo-lists")
  },

  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", { title })
  },

  removeTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  },

  updateTodolist(payload: { id: string; title: string }) {
    //При таком упаковывание принимаемых аргументов, мы не ошибемся
    //в порядке их передачи
    const { id, title } = payload
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
  },
}
