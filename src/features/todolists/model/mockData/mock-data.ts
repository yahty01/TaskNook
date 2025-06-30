import { RequestStatus } from "common/types/enums"
import { DomainTask } from "../../api/tasksApi.types"
import { DomainTodolist } from "common/actions/common.actions"

export type MocTasks = {
  [todolistId: string]: DomainTask[]
}

export const mockDataTasks: MocTasks = {
  ["todolistId1"]: [
    {
      description: "string",
      title: "0",
      status: 0,
      priority: 0,
      startDate: "string",
      deadline: "string",
      id: "1",
      todoListId: "todolistId1",
      order: -1,
      addedDate: "string",
      entityStatus: RequestStatus.idle,
    },
    {
      description: "string",
      title: "1",
      status: 0,
      priority: 0,
      startDate: "string",
      deadline: "string",
      id: "2",
      todoListId: "todolistId1",
      order: -1,
      addedDate: "string",
      entityStatus: RequestStatus.idle,
    },
    {
      title: "2",
      status: 0,
      priority: 0,
      startDate: "string",
      deadline: "string",
      id: "3",
      todoListId: "todolistId1",
      description: "string",
      order: -1,
      addedDate: "string",
      entityStatus: RequestStatus.idle,
    },
  ],
  ["todolistId2"]: [
    {
      description: "string",
      title: "0",
      status: 0,
      priority: 0,
      startDate: "string",
      deadline: "string",
      id: "1",
      todoListId: "todolistId1",
      order: -1,
      addedDate: "string",
      entityStatus: RequestStatus.idle,
    },
    {
      description: "string",
      title: "1",
      status: 0,
      priority: 0,
      startDate: "string",
      deadline: "string",
      id: "2",
      todoListId: "todolistId1",
      order: -1,
      addedDate: "string",
      entityStatus: RequestStatus.idle,
    },
    {
      description: "string",
      title: "2",
      status: 0,
      priority: 0,
      startDate: "string",
      deadline: "string",
      id: "3",
      todoListId: "todolistId1",
      order: -1,
      addedDate: "string",
      entityStatus: RequestStatus.idle,
    },
  ],
}

export const newTaskData = {
  description: "string",
  title: "hello world",
  status: 0,
  priority: 0,
  startDate: "string",
  deadline: "string",
  id: "4",
  todoListId: "todolistId1",
  order: -1,
  addedDate: "string",
}

export const todolistData: DomainTodolist = {
  id: "oneTodo",
  title: "oldTodo",
  addedDate: "00.11.23",
  order: -1,
  filter: "all",
  entityStatus: RequestStatus.idle,
}

export const todolistsData: DomainTodolist[] = [
  {
    id: "v1",
    title: "oldTod1",
    addedDate: "00.11.23",
    order: -1,
    filter: "all",
    entityStatus: RequestStatus.idle,
  },
  {
    id: "v2",
    title: "oldTodo2",
    addedDate: "00.11.23",
    order: -1,
    filter: "all",
    entityStatus: RequestStatus.idle,
  },
]
