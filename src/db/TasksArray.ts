
export type TaskPropsType = {
	id: number
	title: string
	isDone: boolean
}


export const tasks1: TaskPropsType[]= [
	{ id: 1, title: 'HTML&CSS', isDone: true },//0
	{ id: 2, title: 'JS', isDone: true }, //1
	{ id: 3, title: 'ReactJS', isDone: false },//2
]

export const tasks2:TaskPropsType[] = [
	{ id: 1, title: 'My Home ', isDone: true },//0
	{ id: 2, title: 'JS', isDone: true }, //1
	{ id: 3, title: 'ReactJS', isDone: false },//2
]