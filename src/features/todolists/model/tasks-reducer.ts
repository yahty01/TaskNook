import { AppDispatch, RootState } from "app/store"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"
import { ResultCode, TaskStatus } from "../lib/enums"
import { Todolist } from "../api/todolistsApi.types"
import { RequestStatus, setErrorAC, setStatusAC } from "app/model/app-reducer" // функции фабрики

// функции фабрики
export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return {
    type: "SET-TASKS",
    payload,
  } as const
}
export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
  return {
    type: "REMOVE-TASK",
    payload,
  } as const
}

export const addTaskAC = (payload: { task: DomainTask }) => {
  return {
    type: "ADD-TASK",
    payload,
  } as const
}

export const updateTaskAC = (payload: { task: DomainTask }) => {
  return {
    type: "UPDATE-TASK",
    payload,
  } as const
}

export const addTodolistAC = (payload: { todolist: Todolist }) => {
  return {
    type: "ADD-TODOLIST",
    payload,
  } as const
}

export const removeTodolistAC = (todolistId: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: { todolistId },
  } as const
}

export type SetTasksAT = ReturnType<typeof setTasksAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type updateTaskAT = ReturnType<typeof updateTaskAC>

//union type
export type ActionsTasks =
  | updateTaskAT
  | SetTasksAT
  | RemoveTaskAT
  | AddTaskAT
  | AddTodolistAT
  | RemoveTodolistAT

export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setStatusAC(RequestStatus.loading))
  tasksApi.getTasks(todolistId).then((res) => {
    const tasks = res.data.items
    dispatch(setTasksAC({ todolistId, tasks }))
    dispatch(setStatusAC(RequestStatus.succeeded))
  })
}

export const removeTaskTC =
  (arg: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
    dispatch(setStatusAC(RequestStatus.loading))
    tasksApi.deleteTask(arg).then((res) => {
      dispatch(removeTaskAC(arg))
      dispatch(setStatusAC(RequestStatus.succeeded))
    })
  }

export const createTaskTC =
  (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
    dispatch(setStatusAC(RequestStatus.loading))
    tasksApi.createTask(arg).then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTaskAC({ task: res.data.data.item }))
        dispatch(setStatusAC(RequestStatus.succeeded))
      } else {
        if (res.data.messages.length) {
          dispatch(setErrorAC(res.data.messages[0]))
        } else {
          dispatch(setErrorAC("Some error occurred"))
        }
        dispatch(setStatusAC(RequestStatus.succeeded))
      }
    })
  }

export const updateTaskTC =
  (todolistId: string, taskId: string, param: string | boolean) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setStatusAC(RequestStatus.loading))
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
        tasksApi.updateTask({ todolistId, taskId, model }).then((res) => {
          const newTask = res.data.data.item
          dispatch(updateTaskAC({ task: newTask }))
          dispatch(setStatusAC(RequestStatus.succeeded))
        })
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

export type TasksStateType = {
  [todolistId: string]: DomainTask[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsTasks,
): TasksStateType => {
  switch (action.type) {
    case "SET-TASKS": {
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy
    }

    case "UPDATE-TASK": {
      const { id, todoListId } = action.payload.task
      const newTask = action.payload.task
      return {
        ...state,
        [todoListId]: state[todoListId].map((task) => (task.id === id ? newTask : task)),
      }
    }

    case "REMOVE-TASK": {
      const { taskId, todolistId } = action.payload
      return { ...state, [todolistId]: state[todolistId].filter((task) => task.id !== taskId) }
    }

    case "ADD-TASK": {
      const newTask: DomainTask = action.payload.task
      return { ...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]] }
    }

    case "ADD-TODOLIST": {
      const todolistId = action.payload.todolist.id
      return { ...state, [todolistId]: [] }
    }

    case "REMOVE-TODOLIST":
      const todolistId = action.payload.todolistId
      const newState = { ...state }
      delete newState[todolistId]
      return newState

    default:
      return state
  }
}
