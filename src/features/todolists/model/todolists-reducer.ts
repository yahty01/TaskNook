import { FilterType } from "../ui/Todolists/Todolist/FilterTasksButtons/FilterTasksButtons"
import { FilterValue } from "../ui/Todolists/Todolist/Todolist"
import { TodolistResponse } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"
import { AppDispatch } from "app/store"
import { RequestStatus, ResultCode } from "common/types/enums"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { fetchTasksTC } from "./tasks-reducer"
import { setAppStatus } from "app/model/appSlice" // actions (функции варбрики)

// actions (функции варбрики)
export const setTodolistsAC = (todolists: TodolistResponse[]) => {
  return { type: "SET_TODOLIST", todolists } as const
}
export const clearTodolistsAC = () => {
  return { type: "CLEAR_TODOLIST" } as const
}
export const removeTodolistAC = (todolistId: string) => {
  return { type: "REMOVE_TODOLIST", payload: { todolistId } } as const
}
export const addTodolistAC = (todolist: TodolistResponse) => {
  return { type: "ADD_TODOLIST", payload: { todolist } } as const
}
export const updateTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "CHANGE_TODOLIST_TITLE", payload } as const
}
export const updateTodolistFilterAC = (payload: { todolistId: string; filter: FilterType }) => {
  return { type: "CHANGE_TODOLIST_FILTER", payload } as const
}
export const setTasksLoadedAC = (payload: { status: RequestStatus; todolistId: string }) => {
  return { type: "SET_TASK_LOADED", payload } as const
}
export const setTodolistEntityStatus = (payload: { status: RequestStatus; todolistId: string }) => {
  return { type: "SET_ENTITY_STATUS", payload } as const
}

//thunks (TC - функция высшего порядка для TodoT)
export const fetchTodolistsTC = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatus({ status: RequestStatus.loading }))
    const res = await todolistsApi.getTodolists()
    dispatch(setTodolistsAC(res.data))
    dispatch(setAppStatus({ status: RequestStatus.succeeded }))
    res.data.forEach((tl) => dispatch(fetchTasksTC(tl.id)))
  } catch (err) {
    handleServerNetworkError(err, dispatch)
  }
}

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: RequestStatus.loading }))
  todolistsApi
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTodolistAC(res.data.data.item))
        dispatch(setAppStatus({ status: RequestStatus.succeeded }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => handleServerNetworkError(err, dispatch))
}
export const removeTodolistTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setTodolistEntityStatus({ status: RequestStatus.loading, todolistId }))
  dispatch(setAppStatus({ status: RequestStatus.loading }))
  todolistsApi
    .removeTodolist(todolistId)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(removeTodolistAC(todolistId))
        dispatch(setAppStatus({ status: RequestStatus.succeeded }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((res) => {
      dispatch(setTodolistEntityStatus({ status: RequestStatus.failed, todolistId }))
      dispatch(setAppStatus({ status: RequestStatus.failed }))
    })
}
export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: RequestStatus.loading }))
  todolistsApi
    .updateTodolist(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(updateTodolistTitleAC(arg))
        dispatch(setAppStatus({ status: RequestStatus.succeeded }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => handleServerNetworkError(err, dispatch))
}

const initialState: DomainTodolist[] = []
//Reducer
export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsTodolist): DomainTodolist[] => {
  switch (action.type) {
    case "SET_TODOLIST": {
      return action.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: RequestStatus.idle,
        tasksLoaded: RequestStatus.idle,
      }))
    }
    case "CLEAR_TODOLIST": {
      return []
    }

    case "REMOVE_TODOLIST": {
      const { todolistId } = action.payload
      return state.filter((tl) => tl.id !== todolistId)
    }

    case "ADD_TODOLIST": {
      const { todolist } = action.payload
      const newTodolist: DomainTodolist = {
        id: todolist.id,
        title: todolist.title,
        addedDate: todolist.addedDate,
        order: todolist.order,
        filter: "all",
        entityStatus: RequestStatus.idle,
        tasksLoaded: RequestStatus.idle,
      }
      return [newTodolist, ...state]
    }
    case "CHANGE_TODOLIST_TITLE": {
      const { id, title } = action.payload
      return state.map((tl) => (tl.id === id ? { ...tl, title } : tl))
    }
    case "CHANGE_TODOLIST_FILTER": {
      const { todolistId, filter } = action.payload
      return state.map((tl) => (tl.id === todolistId ? { ...tl, filter } : tl))
    }
    case "SET_TASK_LOADED": {
      const { status, todolistId } = action.payload
      return state.map((tl) => (tl.id === todolistId ? { ...tl, tasksLoaded: status } : tl))
    }
    case "SET_ENTITY_STATUS": {
      const { status, todolistId } = action.payload
      return state.map((tl) => (tl.id === todolistId ? { ...tl, entityStatus: status } : tl))
    }
    default:
      return state
  }
}

//types
export type ActionsTodolist = //Union type
  //todos
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof updateTodolistTitleAC>
  | ReturnType<typeof updateTodolistFilterAC>
  | ReturnType<typeof setTodolistEntityStatus>
  | ReturnType<typeof clearTodolistsAC>
  //tasks
  | ReturnType<typeof setTasksLoadedAC>

export type DomainTodolist = TodolistResponse & {
  filter: FilterValue
  entityStatus: RequestStatus
  tasksLoaded: RequestStatus
}
