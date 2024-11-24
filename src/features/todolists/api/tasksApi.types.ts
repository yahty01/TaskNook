import { TaskPriority, TaskStatus } from "common/lib/enums"

export type GetTaskResponse = {
  items: TaskRequest[]
  totalCount: number
  error: string | null
}

export type TaskRequest = {
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
