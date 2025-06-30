import { createAction } from "@reduxjs/toolkit"
import { TodolistResponse } from "../../features/todolists/api/todolistsApi.types"
import { FilterValue } from "../../features/todolists/ui/Todolists/Todolist/Todolist"
import { RequestStatus } from "common/types/enums"
import { DomainTask } from "../../features/todolists/api/tasksApi.types"

export type Tasks = {
  [todolistId: string]: DomainTask[]
}

export type DomainTodolist = TodolistResponse & {
  filter: FilterValue
  entityStatus: RequestStatus
}

export type ClearTodolistsData = {
  tasks: Tasks
  todolists: DomainTodolist[]
}

export const clearTodolistsData = createAction<ClearTodolistsData>("common/clearTodolistsData")
