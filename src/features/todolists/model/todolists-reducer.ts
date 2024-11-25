import { FilterType } from "../ui/Todolists/Todolist/FilterTasksButtons/FilterTasksButtons"
import { FilterValue } from "../ui/Todolists/Todolist/Todolist"
import { TodolistResponse } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"
import { AppDispatch } from "app/store"
import { setStatusAC } from "app/model/app-reducer"
import { RequestStatus } from "common/types/enums"

// actions (функции варбрики)
export const setTodolistsAC = (todolists: TodolistResponse[]) => {
  return { type: "SET-TODOLIST", todolists } as const
}
export const removeTodolistAC = (todolistId: string) => {
  return { type: "REMOVE-TODOLIST", payload: { todolistId } } as const
}
export const addTodolistAC = (todolist: TodolistResponse) => {
  return { type: "ADD-TODOLIST", payload: { todolist } } as const
}
export const updateTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}
export const updateTodolistFilterAC = (payload: { todolistId: string; filter: FilterType }) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}
export const setTasksLoadedAC = (payload: { status: RequestStatus; todolistId: string }) => {
  return { type: "SET-TASK-LOADED", payload } as const
}

//thunks (TC - функция высшего порядка для TodoT)
export const fetchTodolistsTC = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setStatusAC(RequestStatus.loading))
    const res = await todolistsApi.getTodolists()
    dispatch(setTodolistsAC(res.data))
    dispatch(setStatusAC(RequestStatus.succeeded))
  } catch (e) {
    throw new Error(`${e}`)
  }
}
export const _fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  dispatch(setStatusAC(RequestStatus.loading))
  todolistsApi.getTodolists().then((res) => {
    const todolists = res.data
    dispatch(setTodolistsAC(todolists))
    dispatch(setStatusAC(RequestStatus.succeeded))
  })
}
export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setStatusAC(RequestStatus.loading))
  todolistsApi.createTodolist(title).then((res) => {
    dispatch(addTodolistAC(res.data.data.item))
    dispatch(setStatusAC(RequestStatus.succeeded))
  })
}
export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
  dispatch(setStatusAC(RequestStatus.loading))
  todolistsApi.removeTodolist(id).then((res) => {
    dispatch(removeTodolistAC(id))
    dispatch(setStatusAC(RequestStatus.succeeded))
  })
}
export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
  dispatch(setStatusAC(RequestStatus.loading))
  todolistsApi.updateTodolist(arg).then((res) => {
    dispatch(updateTodolistTitleAC(arg))
    dispatch(setStatusAC(RequestStatus.succeeded))
  })
}

const initialState: DomainTodolist[] = []
//Reducer
export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsTodolist): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLIST": {
      return action.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: RequestStatus.idle,
        tasksLoaded: RequestStatus.idle,
      }))
    }

    case "REMOVE-TODOLIST": {
      const { todolistId } = action.payload
      return state.filter((tl) => tl.id !== todolistId)
    }
    case "ADD-TODOLIST": {
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
    case "CHANGE-TODOLIST-TITLE": {
      const { id, title } = action.payload
      return state.map((tl) => (tl.id === id ? { ...tl, title } : tl))
    }
    case "CHANGE-TODOLIST-FILTER": {
      const { todolistId, filter } = action.payload
      return state.map((tl) => (tl.id === todolistId ? { ...tl, filter } : tl))
    }
    case "SET-TASK-LOADED": {
      const { status, todolistId } = action.payload
      return state.map((tl) => (tl.id === todolistId ? { ...tl, tasksLoaded: status } : tl))
    }
    default:
      return state
  }
}

//types

//Union type
export type ActionsTodolist =
  //todos
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof updateTodolistTitleAC>
  | ReturnType<typeof updateTodolistFilterAC>
  //tasks
  | ReturnType<typeof setTasksLoadedAC>

export type DomainTodolist = TodolistResponse & {
  filter: FilterValue
  entityStatus: RequestStatus
  tasksLoaded: RequestStatus
}
