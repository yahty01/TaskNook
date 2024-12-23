import { AppDispatch, RootState } from "app/store"
import { tasksApi } from "../api/tasksApi"
import { TaskResponse, UpdateTaskModel } from "../api/tasksApi.types"
import { RequestStatus, ResultCode, TaskStatus } from "common/types/enums"
import { TodolistResponse } from "../api/todolistsApi.types"
import { setAppStatusAC } from "app/model/app-reducer"
import { setTasksLoadedAC } from "./todolists-reducer"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"

// actions (функции фабрики)
export const setTasksAC = (payload: { todolistId: string; tasks: TaskResponse[] }) => {
  return { type: "SET_TASK", payload } as const
}
export const setTaskEntityStatusAC = (payload: { status: RequestStatus; todolistId: string; taskId: string }) => {
  return { type: "SET_TASK_ENTITY_STATUS", payload } as const
}
export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
  return { type: "REMOVE_TASK", payload } as const
}
export const addTaskAC = (payload: { task: TaskResponse }) => {
  return { type: "ADD_TASK", payload } as const
}
export const updateTaskAC = (payload: { task: TaskResponse }) => {
  return { type: "UPDATE_TASK", payload } as const
}
export const addTodolistAC = (payload: { todolist: TodolistResponse }) => {
  return { type: "ADD_TODOLIST", payload } as const
}
export const removeTodolistAC = (payload: { todolistId: string }) => {
  return { type: "REMOVE_TODOLIST", payload } as const
}

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setTasksLoadedAC({ status: RequestStatus.loading, todolistId }))
  tasksApi
    .getTasks(todolistId)
    .then((res) => {
      const tasks = res.data.items
      dispatch(setTasksAC({ todolistId, tasks }))
      dispatch(setTasksLoadedAC({ status: RequestStatus.succeeded, todolistId }))
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}

export const removeTaskTC = (arg: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
  const { todolistId, taskId } = arg
  dispatch(setAppStatusAC(RequestStatus.loading))
  dispatch(setTaskEntityStatusAC({ status: RequestStatus.loading, todolistId, taskId }))
  tasksApi
    .deleteTask(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(removeTaskAC(arg))
        dispatch(setAppStatusAC(RequestStatus.succeeded))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => handleServerNetworkError(err, dispatch))
}

export const createTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC(RequestStatus.loading))
  tasksApi
    .createTask(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTaskAC({ task: res.data.data.item }))
        dispatch(setAppStatusAC(RequestStatus.succeeded))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => handleServerNetworkError(err, dispatch))
}

//todo: need fix (rewrite updateTaskTC to generic)
export const updateTaskTC =
  (todolistId: string, taskId: string, param: string | boolean) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setAppStatusAC(RequestStatus.loading))
    const task = getState().tasks[todolistId].find((item) => item.id === taskId)
    if (task) {
      //Вопрос ????????? В случае когда мы присваиваем значения из стейта редакс, они копируются ?
      // Ведь явно не передаются ссылкой.
      const { title, description, status, priority, startDate, deadline } = task
      const model: UpdateTaskModel = {
        title,
        description,
        status,
        priority,
        startDate,
        deadline,
      }
      const makeRequest = (model: UpdateTaskModel) => {
        tasksApi
          .updateTask({ todolistId, taskId, model })
          .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
              const newTask = res.data.data.item
              dispatch(updateTaskAC({ task: newTask }))
              dispatch(setAppStatusAC(RequestStatus.succeeded))
            } else {
              handleServerAppError(res.data, dispatch)
            }
          })
          .catch((err) => handleServerNetworkError(err, dispatch))
      }

      const isStatus = typeof param

      if (typeof param === "string") {
        const newModel = { ...model, title: param }
        makeRequest(newModel)
      } else if (isStatus === "boolean") {
        const status = param ? TaskStatus.Complete : TaskStatus.New
        const newModel = { ...model, status: status }
        makeRequest(newModel)
      }
    }
  }

const initialState: Tasks = {}

//Reducer
export const tasksReducer = (state: Tasks = initialState, action: ActionsTasks): Tasks => {
  switch (action.type) {
    case "SET_TASK": {
      const { tasks, todolistId } = action.payload
      return {
        ...state,
        [todolistId]: tasks.map((el) => ({ ...el, entityStatus: RequestStatus.idle })),
      }
    }
    case "SET_TASK_ENTITY_STATUS": {
      const { taskId, todolistId, status } = action.payload
      return {
        ...state,
        [todolistId]: [
          ...state[todolistId].map((task) => (task.id === taskId ? { ...task, entityStatus: status } : task)),
        ],
      }
    }
    case "UPDATE_TASK": {
      const { id, todoListId } = action.payload.task
      const newTask = action.payload.task
      return {
        ...state,
        [todoListId]: state[todoListId].map((task) =>
          task.id === id ? { ...newTask, entityStatus: RequestStatus.idle } : task,
        ),
      }
    }
    case "REMOVE_TASK": {
      const { taskId, todolistId } = action.payload
      return { ...state, [todolistId]: state[todolistId].filter((task) => task.id !== taskId) }
    }
    case "ADD_TASK": {
      const newTask: TaskResponse = action.payload.task
      return {
        ...state,
        [newTask.todoListId]: [{ ...newTask, entityStatus: RequestStatus.idle }, ...state[newTask.todoListId]],
      }
    }
    case "ADD_TODOLIST": {
      const todolistId = action.payload.todolist.id
      return { ...state, [todolistId]: [] }
    }
    case "REMOVE_TODOLIST": {
      const newState = { ...state }
      delete newState[action.payload.todolistId]
      return newState
    }
    default:
      return state
  }
}

//types
export type ActionsTasks =
  //tasks
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTaskEntityStatusAC>
  //todos
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>

export type DomainTask = TaskResponse & {
  entityStatus: RequestStatus
}

export type Tasks = {
  [todolistId: string]: DomainTask[]
}
