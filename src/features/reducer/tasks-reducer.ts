import {v1} from "uuid";
import {initialTasks, TasksStateType, TaskType} from "../../db/initialTasks";

export type RemoveTaskActionType = {
	type: 'REMOVE-TASK'
	payload: {
		taskId: string
		todolistId: string
	}
}

export type removeTodolistActionType = {
	type: 'REMOVE-TODOLIST'
	payload: {
		todolistId: string
	}
}

export type AddTaskActionType = {
	type: 'ADD-TASK'
	payload: {
		title: string
		todolistId: string
	}
}

export type ChangeTaskStatusActionType = {
	type: 'CHANGE-TASK-STATUS'
	payload: {
		taskId: string,
		todolistId: string
		isDone: boolean,
	}
}

export type ChangeTaskTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE'
	payload: {
		taskId: string,
		title: string
		todolistId: string
	}
}

export type AddTodolistActionType = {
	type: 'ADD-TODOLIST'
	payload: {
		title: string
		todolistId: string
	}
}
//union type
export type ActionsType =
	| RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTodolistActionType
	| removeTodolistActionType

const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {

	switch (action.type) {
		case 'REMOVE-TASK': {
			const {taskId, todolistId} = action.payload
			return {...state, [todolistId]: state[todolistId].filter(task => task.id !== taskId)}
		}

		case "ADD-TASK": {
			const {title, todolistId} = action.payload
			const newTask: TaskType = {id: v1(), title: title, isDone: false}
			return {...state, [todolistId]: [newTask, ...state[todolistId]]}
		}
		case "CHANGE-TASK-STATUS": {
			const {taskId, todolistId, isDone} = action.payload
			return {
				...state,
				[todolistId]: state[todolistId].map(task => task.id === taskId ? {...task, isDone: isDone} : task)
			}
		}
		case 'CHANGE-TODOLIST-TITLE': {
			const {title, todolistId, taskId} = action.payload
			return {
			...state,
				[todolistId]: state[todolistId].map(task => task.id === taskId ? {...task, title: title} : task)
			}
		}

		case 'ADD-TODOLIST': {
			const todolistId = action.payload.todolistId
			return {...state, [todolistId]: []}
		}

		case 'REMOVE-TODOLIST':
			const todolistId = action.payload.todolistId
			const newState = {...state}
			delete newState[todolistId]
			return newState

		default:
			return state
	}
}

// функции фабрики
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
	return {
		type: 'REMOVE-TASK',
		payload: {
			taskId: taskId,
			todolistId: todolistId
		}
	} as const
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
	return {type: 'ADD-TASK', payload: {title: title, todolistId: todolistId}} as const
}

export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
	return {type: 'CHANGE-TODOLIST-TITLE', payload: {taskId: id, title, todolistId}} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
	return {
		type: 'CHANGE-TASK-STATUS', payload: {taskId, isDone, todolistId} as const
	}
}

export const addTodolistAC = (title: string, todolistId: string):AddTodolistActionType => {
	return {
		type: 'ADD-TODOLIST', payload: {title, todolistId} as const
	};
}

export const removeTodolistAC = (todolistId: string): removeTodolistActionType => {
	return {
		type: 'REMOVE-TODOLIST', payload: {todolistId} as const
	}
}



