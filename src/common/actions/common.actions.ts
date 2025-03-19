import { createAction } from "@reduxjs/toolkit"
import { Tasks } from "../../features/todolists/model/tasksSlice"
import { DomainTodolist } from "../../features/todolists/model/todolistsSlice"

export type ClearTodolistsData = {
  tasks: Tasks
  todolists: DomainTodolist[]
}

export const clearTodolistsData = createAction<ClearTodolistsData>("common/clearTodolistsData")
