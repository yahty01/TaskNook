import { TaskPriority, TaskStatus } from "../lib/enums"

export type Task = {
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
  [todolistId: string]: Task[] | []
}

export type getTaskResponse = {
  items: Task[]
  totalCount: number
  error: string | null
}

export type UpdateTaskModel = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}
