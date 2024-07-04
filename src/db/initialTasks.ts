import {v1} from "uuid";

export type TasksProps = {
	id: string
	title: string
	isDone: boolean
}

export const initialTasks: TasksProps[] = [
	{id: v1(), title: 'HTML&CSS', isDone: true},
	{id: v1(), title: 'JS', isDone: true},
	{id: v1(), title: 'ReactJS', isDone: false},
	{id: v1(), title: 'Redux', isDone: true},
	{id: v1(), title: 'Typescript', isDone: false},
	{id: v1(), title: 'RTK query', isDone: false},
]