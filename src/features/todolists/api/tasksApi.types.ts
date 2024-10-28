import { TaskPriority, TaskStatus } from "../lib/enums"

export type GetTaskResponse = {
  items: DomainTask[]
  totalCount: number
  error: string | null
}

export type DomainTask = {
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

export type Tasks = {
  [todolistId: string]: DomainTask[] | []
}

export type UpdateTaskModel = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}
