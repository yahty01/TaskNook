import { v1 } from "uuid"
import { AppDispatch } from "app/store"
import { tasksApi } from "../api/tasksApi"
import { DomainTask } from "../api/tasksApi.types"
import { TaskPriority, TaskStatus } from "../lib/enums"

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

export const addTaskAC = (payload: { title: string; todolistId: string }) => {
  return {
    type: "ADD-TASK",
    payload,
  } as const
}

export const changeTaskTitleAC = (payload: { id: string; title: string; todolistId: string }) => {
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
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

//union type
export type ActionsType =
  | SetTasksAT
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType

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
      dispatch(addTaskAC(arg))
    })
  }

// const createTaskHandler = (title: string, todolistId: string) => {
//   tasksApi.createTask({ title, todolistId }).then((res) => {
//     const newTask = res.data.data.item
//     setTasks({
//       ...tasks,
//       [todolistId]: [newTask, ...(tasks[todolistId] || [])],
//     }) //так как или возвращает первую истину
//   })
// }

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

    case "REMOVE-TASK": {
      const { taskId, todolistId } = action.payload
      return { ...state, [todolistId]: state[todolistId].filter((task) => task.id !== taskId) }
    }

    case "ADD-TASK": {
      const { title, todolistId } = action.payload
      const newTask: DomainTask = {
        title,
        todoListId: action.payload.todolistId,
        startDate: "",
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        status: TaskStatus.New,
        addedDate: "",
        order: 0,
        id: v1(),
      }
      return { ...state, [todolistId]: [newTask, ...state[todolistId]] }
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
      const { title, todolistId, id } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map((task) =>
          task.id === id ? { ...task, title: title } : task,
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
