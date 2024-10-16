export type Task = {
	description: string
	title: string
	status: number
	priority: number
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}

export type Tasks = {
	[todolistId: string]: Task[] | []
}

export type getTaskResponse = {
	items: Task[]
	totalCount: number
	error: string | null
}

export type UpdateTaskModel = {
	description: string
	title: string
	status: number
	priority: number
	startDate: string
	deadline: string
}