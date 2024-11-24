import { Tasks } from "../tasks-reducer"
import { v1 } from "uuid"
import { DomainTodolist } from "../todolists-reducer"
import { RequestStatus } from "common/lib/enums"

export const mockDataTasks: Tasks = {
  todolistId1: [
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
    },
  ],
  todolistId2: [
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
  id: v1(),
  title: "oldTodo",
  addedDate: "00.11.23",
  order: -1,
  filter: "all",
  entityStatus: RequestStatus.idle,
  tasksLoaded: RequestStatus.idle,
}

export const todolistsData: DomainTodolist[] = [
  {
    id: "v1",
    title: "oldTod1",
    addedDate: "00.11.23",
    order: -1,
    filter: "all",
    entityStatus: RequestStatus.idle,
    tasksLoaded: RequestStatus.idle,
  },
  {
    id: "v2",
    title: "oldTodo2",
    addedDate: "00.11.23",
    order: -1,
    filter: "all",
    entityStatus: RequestStatus.idle,
    tasksLoaded: RequestStatus.idle,
  },
]
