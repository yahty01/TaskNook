import { FilterType } from "../ui/Todolists/Todolist/FilterTasksButtons/FilterTasksButtons"
import { FilterValue } from "../ui/Todolists/Todolist/Todolist"
import { Todolist } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"
import { AppDispatch } from "app/store"
import { setStatusAC } from "app/model/app-reducer"

// функции фабрики ActionCrate
export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLIST", todolists } as const
}

export const removeTodolistAC = (todolistId: string) => {
  return { type: "REMOVE-TODOLIST", payload: { todolistId } } as const
}

export const addTodolistAC = (todolist: Todolist) => {
  return { type: "ADD-TODOLIST", payload: { todolist } } as const
}

export const updateTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}

export const updateTodolistFilterAC = (payload: { todolistId: string; filter: FilterType }) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}
export type SetTodolistAT = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof updateTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof updateTodolistFilterAC>

//юниеан тип
export type ActionsTodolist =
  | SetTodolistAT
  | RemoveTodolistAT
  | AddTodolistAT
  | ChangeTodolistTitleAT
  | ChangeTodolistFilterAT

// Санка //ThunkCreate - функция высшего порядка для fetchTodolistsThunk
export const fetchTodolistsTC = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setStatusAC("loading"))
    const res = await todolistsApi.getTodolists()
    dispatch(setTodolistsAC(res.data))
    dispatch(setStatusAC("succeeded"))
  } catch (e) {
    throw new Error(`${e}`)
  }
}

export const _fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  dispatch(setStatusAC("loading"))
  todolistsApi.getTodolists().then((res) => {
    const todolists = res.data
    dispatch(setTodolistsAC(todolists))
    dispatch(setStatusAC("succeeded"))
  })
}

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setStatusAC("loading"))
  todolistsApi.createTodolist(title).then((res) => {
    dispatch(addTodolistAC(res.data.data.item))
    dispatch(setStatusAC("succeeded"))
  })
}

export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
  dispatch(setStatusAC("loading"))
  todolistsApi.removeTodolist(id).then((res) => {
    dispatch(removeTodolistAC(id))
    dispatch(setStatusAC("succeeded"))
  })
}

export const updateTodolistTitleTC =
  (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
    dispatch(setStatusAC("loading"))
    todolistsApi.updateTodolist(arg).then((res) => {
      dispatch(updateTodolistTitleAC(arg))
      dispatch(setStatusAC("succeeded"))
    })
  }

export type DomainTodolist = Todolist & {
  filter: FilterValue
}

const initialState: DomainTodolist[] = []

export const todolistsReducer = (
  state: DomainTodolist[] = initialState,
  action: ActionsTodolist,
): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLIST": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all" }))
    }

    case "REMOVE-TODOLIST": {
      const { todolistId } = action.payload
      return state.filter((tl) => tl.id != todolistId)
    }

    case "ADD-TODOLIST": {
      const { todolist } = action.payload
      const newTodolist: DomainTodolist = {
        id: todolist.id,
        title: todolist.title,
        addedDate: todolist.addedDate,
        order: todolist.order,
        filter: "all",
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

    default:
      return state
  }
}
