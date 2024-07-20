import {v1} from "uuid";
import {todolistID1, todolistID2} from "./initialTodoLists";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}


export type TasksStateType = {
	[todolistId: string]: TaskType[]
}

export const initialTasks: TasksStateType = {
	[todolistID1]: [
		{id: v1(), title: 'HTML&CSS', isDone: true},
		{id: v1(), title: 'JS', isDone: true},
		{id: v1(), title: 'ReactJS', isDone: false}
	],
	[todolistID2]: [
		{id: v1(), title: 'Пиво', isDone: true},
		{id: v1(), title: 'Соль', isDone: true},
		{id: v1(), title: 'Хлеб', isDone: false}
	]
}