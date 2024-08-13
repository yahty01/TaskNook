import {v1} from "uuid";
import {FilterType} from "../../components/FilterButtons";
import {TodoListType} from "../../db/initialTodoLists";

export type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST'
	payload: {
		id: string
	}
}

export type AddTodolistActionType = {
	type: 'ADD-TODOLIST'
	payload: {
		title: string
	}
}

export type ChangeTodolistTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE'
	payload: {
		id: string
		title: string
	}
}

export type ChangeTodolistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER'
	payload: {
		id: string
		filter: FilterType
	}
}
//юниеан тип
export type ActionsType =
	| RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType



export const todolistsReducer = (state: TodoListType[], action: ActionsType ): TodoListType[] => {

	switch (action.type) {
		case "REMOVE-TODOLIST": {
			const {id} = action.payload
			return state.filter(tl => tl.id != id)
		}

		case "ADD-TODOLIST": {
			const {title} = action.payload
			const todolistId = v1()
			const newTodolist: TodoListType = {
				id: todolistId,
				title: title,
				filter: 'all'}
			return ([...state, newTodolist])
		}

		case "CHANGE-TODOLIST-TITLE": {
			const { id, title } = action.payload
			return state.map(tl => tl.id === id ? {...tl, title} : tl)
		}

		case "CHANGE-TODOLIST-FILTER": {
			const {id, filter} = action.payload
			return state.map(tl => tl.id === id ? {...tl, filter} : tl)
		}

		default: return state
	}
}

// функции фабрики
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
	return { type: 'REMOVE-TODOLIST', payload: { id: todolistId } } as const
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
	return { type: 'ADD-TODOLIST', payload: { title } } as const
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', payload: { id, title } } as const
}

export const changeTodolistFilterAC = (id: string, filter: FilterType): ChangeTodolistFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', payload: { id, filter } } as const
}

