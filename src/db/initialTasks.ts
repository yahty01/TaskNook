export type TasksProps = {
	id: number
	title: string
	isDone: boolean
}

export const initialTasks: TasksProps[] = [
	{id: 1, title: 'HTML&CSS', isDone: true},
	{id: 2, title: 'JS', isDone: true},
	{id: 3, title: 'ReactJS', isDone: false},
	{id: 4, title: 'Redux', isDone: true},
	{id: 5, title: 'Typescript', isDone: false},
	{id: 6, title: 'RTK query', isDone: false},
]