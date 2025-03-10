import { AppDispatch, RootState } from "app/store"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, ResponseTask, UpdateTaskDomainModel, UpdateTaskModel } from "../api/tasksApi.types"
import { RequestStatus, ResultCode } from "common/types/enums"
import { setAppStatus } from "app/model/appSlice"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { addTodolist, removeTodolist, updateTasksLoaded } from "./todolistsSlice"
import { createSlice } from "@reduxjs/toolkit"

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as Tasks,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => ({
    setTasks: create.reducer<{ todolistId: string; tasks: ResponseTask[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks.map((task) => ({
        ...task,
        entityStatus: "idle" as RequestStatus,
      }))
    }),
    addTask: create.reducer<{ task: ResponseTask }>((state, action) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift({ ...action.payload.task, entityStatus: RequestStatus.idle })
    }),
    removeTask: create.reducer<{ taskId: string; todolistId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    }),
    updateTask: create.reducer<{ taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }>(
      (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel }
        }
      },
    ),
    clearTasks: create.reducer((_) => {
      return {}
    }),
  }),
  extraReducers: (builder) => {
    builder
      // 1 аргумент - action creator, который мы хотим обработать
      // 2 аргумент - reducer, в котором изменяем state
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.todolistId]
      })
  },
})

export const { addTask, updateTask, clearTasks, removeTask, setTasks } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(updateTasksLoaded({ status: RequestStatus.loading, todolistId }))
  tasksApi
    .getTasks(todolistId)
    .then((res) => {
      const tasks = res.data.items
      dispatch(setTasks({ todolistId, tasks }))
      dispatch(updateTasksLoaded({ status: RequestStatus.succeeded, todolistId }))
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}

export const removeTaskTC = (arg: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
  const { todolistId, taskId } = arg
  dispatch(setAppStatus({ status: RequestStatus.loading }))
  dispatch(updateTask({ todolistId, taskId, domainModel: { entityStatus: RequestStatus.loading } }))
  tasksApi
    .deleteTask(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(removeTask(arg))
        dispatch(setAppStatus({ status: RequestStatus.succeeded }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => handleServerNetworkError(err, dispatch))
}

export const createTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: RequestStatus.loading }))
  tasksApi
    .createTask(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTask({ task: res.data.data.item }))
        dispatch(setAppStatus({ status: RequestStatus.succeeded }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => handleServerNetworkError(err, dispatch))
}

//todo: need fix (rewrite updateTaskTC to generic)
export const updateTaskTC =
  (arg: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { taskId, todolistId, domainModel } = arg

    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find((t) => t.id === taskId)

    if (task) {
      const model: UpdateTaskModel = {
        status: task.status,
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        ...domainModel,
      }

      dispatch(setAppStatus({ status: RequestStatus.loading }))
      tasksApi
        .updateTask({ taskId, todolistId, model })
        .then((res) => {
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatus({ status: RequestStatus.succeeded }))
            dispatch(updateTask(arg))
          } else {
            handleServerAppError(res.data, dispatch)
          }
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch)
        })
    }
  }

export type Tasks = {
  [todolistId: string]: DomainTask[]
}
