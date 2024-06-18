
export type TasksProps = {
	id: number
	title: string
	isDone: boolean
}


export const tasks1: TasksProps[]= [
	{ id: 1, title: 'HTML&CSS', isDone: true },//0
	{ id: 2, title: 'JS', isDone: true }, //1
	{ id: 3, title: 'ReactJS', isDone: false },//2
]

export const tasks2:TasksProps[] = [
	{ id: 1, title: 'My Home ', isDone: true },//0
	{ id: 2, title: '223', isDone: true }, //1
	{ id: 3, title: '33', isDone: false },//2
	{ id: 4, title: '33', isDone: false },//2
]