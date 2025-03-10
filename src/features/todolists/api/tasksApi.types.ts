import { RequestStatus, TaskPriority, TaskStatus } from "common/types/enums"

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: ResponseTask[]
}

export type ResponseTask = {
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
  entityStatus: RequestStatus
}

export type UpdateTaskModel = {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}

export type UpdateTaskDomainModel = {
  title?: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  startDate?: string
  deadline?: string
  entityStatus?: RequestStatus
}
