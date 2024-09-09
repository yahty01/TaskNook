import {v1} from "uuid";
import {FilterType} from "../../common/components/FilterButtons";
import {filterValue} from "../todolist/TodoList";

export type TodoListType = {
	todolistId: string
	title: string
	filter: filterValue
}


export type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST'
	payload: {
		todolistId: string
	}
}

export type AddTodolistActionType = {
	type: 'ADD-TODOLIST'
	payload: {
		todolistId: string
		title: string
	}
}

export type ChangeTodolistTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE'
	payload: {
		todolistId: string
		title: string
	}
}

export type ChangeTodolistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER'
	payload: {
		todolistId: string
		filter: FilterType
	}
}
//юниеан тип
export type ActionsType =
	| RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType


const initialState: TodoListType[] = []

export const todolistsReducer = (state: TodoListType[] = initialState, action: ActionsType ): TodoListType[] => {

	switch (action.type) {
		case "REMOVE-TODOLIST": {
			const {todolistId} = action.payload
			return state.filter(tl => tl.todolistId != todolistId)
		}

		case "ADD-TODOLIST": {
			const {title, todolistId} = action.payload
			const newTodolist: TodoListType = {
				todolistId: todolistId,
				title: title,
				filter: 'all'}
			return ([newTodolist, ...state])
		}

		case "CHANGE-TODOLIST-TITLE": {
			const { todolistId, title } = action.payload
			return state.map(tl => tl.todolistId === todolistId ? {...tl, title} : tl)
		}

		case "CHANGE-TODOLIST-FILTER": {
			const {todolistId, filter} = action.payload
			return state.map(tl => tl.todolistId === todolistId ? {...tl, filter} : tl)
		}

		default: return state
	}
}

// функции фабрики
export const removeTodolistAC = (todolistId: string) => {
	return { type: 'REMOVE-TODOLIST', payload: { todolistId } } as const
}

export const addTodolistAC = (title: string) => {
	return { type: 'ADD-TODOLIST', payload: { title, todolistId: v1() } } as const
}

export const changeTodolistTitleAC = (payload: { todolistId: string; title: string }) => {
	return { type: 'CHANGE-TODOLIST-TITLE', payload } as const
}

export const changeTodolistFilterAC = (payload: { todolistId: string; filter: FilterType }) => {
	return { type: 'CHANGE-TODOLIST-FILTER', payload } as const
}

