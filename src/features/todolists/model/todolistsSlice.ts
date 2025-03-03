import { FilterValue } from "../ui/Todolists/Todolist/Todolist"
import { TodolistResponse } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"
import { AppDispatch } from "app/store"
import { RequestStatus, ResultCode } from "common/types/enums"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { fetchTasksTC } from "./tasks-reducer"
import { setAppStatus } from "app/model/appSlice"
import { createSlice } from "@reduxjs/toolkit"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    // Delete / splice
    removeTodolist: create.reducer<{ todolistId: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    //  Create / unshift / push
    addTodolist: create.reducer<{ todolist: TodolistResponse }>((state, action) => {
      state.unshift({
        ...action.payload.todolist,
        filter: "all",
        entityStatus: RequestStatus.idle,
        tasksLoaded: RequestStatus.idle,
      })
    }),
    // Get / Set
    setTodolists: create.reducer<{ todolists: TodolistResponse[] }>((state, action) => {
      action.payload.todolists.forEach((tl) => {
        state.push({
          ...tl,
          filter: "all",
          entityStatus: RequestStatus.idle,
          tasksLoaded: RequestStatus.idle,
        })
      })
      // return action.payload.todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
    }),

    //  Update / findIndex
    updateTodolistTitle: create.reducer<{ todolistId: string; title: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    }),

    updateTodolistFilter: create.reducer<{ todolistId: string; filter: FilterValue }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    }),

    updateTasksLoaded: create.reducer<{ todolistId: string; status: RequestStatus }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
      if (index !== -1) {
        state[index].tasksLoaded = action.payload.status
      }
    }),

    updateTodolistEntityStatus: create.reducer<{ todolistId: string; status: RequestStatus }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
      if (index !== -1) {
        state[index].entityStatus = action.payload.status
      }
    }),

    clearTodolists: create.reducer(() => {
      return []
    }),
  }),
})

export const {
  removeTodolist,
  addTodolist,
  clearTodolists,
  updateTodolistEntityStatus,
  setTodolists,
  updateTasksLoaded,
  updateTodolistFilter,
  updateTodolistTitle,
} = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer

//thunks (TC - функция высшего порядка для TodoT)
export const fetchTodolistsTC = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatus({ status: RequestStatus.loading }))
    const res = await todolistsApi.getTodolists()
    dispatch(setTodolists({ todolists: res.data }))
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
        dispatch(addTodolist({ todolist: res.data.data.item }))
        dispatch(setAppStatus({ status: RequestStatus.succeeded }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => handleServerNetworkError(err, dispatch))
}
export const removeTodolistTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(updateTodolistEntityStatus({ status: RequestStatus.loading, todolistId }))
  dispatch(setAppStatus({ status: RequestStatus.loading }))
  todolistsApi
    .removeTodolist(todolistId)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(removeTodolist({ todolistId }))
        dispatch(setAppStatus({ status: RequestStatus.succeeded }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((_) => {
      dispatch(updateTodolistEntityStatus({ status: RequestStatus.failed, todolistId }))
      dispatch(setAppStatus({ status: RequestStatus.failed }))
    })
}
export const updateTodolistTitleTC = (arg: { todolistId: string; title: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: RequestStatus.loading }))
  todolistsApi
    .updateTodolist({ id: arg.todolistId, title: arg.title })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(updateTodolistTitle({ ...arg }))
        dispatch(setAppStatus({ status: RequestStatus.succeeded }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => handleServerNetworkError(err, dispatch))
}

//types
export type DomainTodolist = TodolistResponse & {
  filter: FilterValue
  entityStatus: RequestStatus
  tasksLoaded: RequestStatus
}
