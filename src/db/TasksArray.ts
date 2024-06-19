
export type TasksProps = {
	id: number
	title: string
	isDone: boolean
}


export const tasks1: TasksProps[]= [
	{ id: 1, title: 'HTML&CSS', isDone: true },
	{ id: 2, title: 'JS', isDone: true },
	{ id: 3, title: 'ReactJS', isDone: false },
	{ id: 4, title: 'Redux', isDone: true },
	{ id: 5, title: 'Typescript', isDone: false },
	{ id: 6, title: 'RTK query', isDone: false },
]

export const tasks2:TasksProps[] = [
	{ id: 1, title: 'My Home ', isDone: true },//0
	{ id: 2, title: '223', isDone: true }, //1
	{ id: 3, title: '33', isDone: false },//2
	{ id: 4, title: '33', isDone: false },//2
]
export const tasks3:TasksProps[] = []