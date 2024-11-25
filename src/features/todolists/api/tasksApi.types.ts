import { TaskPriority, TaskStatus } from "common/types/enums"

export type GetTaskResponse = {
  items: TaskResponse[]
  totalCount: number
  error: string | null
}

export type TaskResponse = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTaskModel = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}
