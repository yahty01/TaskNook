import { AppDispatch, RootState } from "app/store"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"
import { TaskStatus } from "../lib/enums" // функции фабрики

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
export const changeTaskTitleAC = (payload: {
  taskId: string
  title: string
  todolistId: string
}) => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload,
  } as const
}

export const changeTaskStatusAC = (payload: {
  taskId: string
  status: boolean
  todolistId: string
}) => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload,
  } as const
}

export const addTodolistAC = (payload: { title: string; todolistId: string }) => {
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
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type updateTaskAT = ReturnType<typeof updateTaskAC>

//union type
export type ActionsType =
  | updateTaskAT
  | SetTasksAT
  | RemoveTaskAT
  | AddTaskAT
  | ChangeTaskStatusAT
  | ChangeTaskTitleAT
  | AddTodolistAT
  | RemoveTodolistAT

export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  tasksApi.getTasks(todolistId).then((res) => {
    const tasks = res.data.items
    dispatch(setTasksAC({ todolistId, tasks }))
  })
}

export const removeTaskTC =
  (arg: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
    tasksApi.deleteTask(arg).then((res) => dispatch(removeTaskAC(arg)))
  }

export const createTaskTC =
  (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
    tasksApi.createTask(arg).then((res) => {
      dispatch(addTaskAC({ task: res.data.data.item }))
    })
  }

export const updateTaskTC =
  (todolistId: string, taskId: string, param: string | boolean) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
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
      } else {
        console.log("Что то не то ты передал дружек!")
      }
    }
  }

export type TasksStateType = {
  [todolistId: string]: DomainTask[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType,
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

    case "CHANGE-TASK-STATUS": {
      const { taskId, todolistId, status } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map((task) =>
          task.id === taskId ? { ...task, isDone: status } : task,
        ),
      }
    }

    case "CHANGE-TASK-TITLE": {
      const { title, todolistId, taskId } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map((task) =>
          task.id === taskId ? { ...task, title: title } : task,
        ),
      }
    }

    case "ADD-TODOLIST": {
      const todolistId = action.payload.todolistId
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
