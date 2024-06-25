import {useState} from "react";
import {initialTasks, TasksProps} from "../db/initialTasks";

export type filterValue = 'all' | 'completed' | 'active'

export const useTasks = () => {
	let [tasks, setTasks] = useState<TasksProps[]>(initialTasks)
	let [filter, setFilter] = useState<filterValue>('all')
	let tasksForFilter = tasks
	const removeTask = (id: number) => {
		setTasks(tasks.filter((task) => task.id !== id))
	}

	const changeFilter = (value: filterValue) => {
		setFilter(value)
	}

	if (filter === 'all') {
		tasksForFilter = tasks
	}
	if (filter === 'active') {
		tasksForFilter = tasks.filter((t) => !t.isDone)
	}
	if (filter === 'completed') {
		tasksForFilter = tasks.filter((t) => t.isDone)
	}

	return {tasksForFilter, removeTask, changeFilter}
}


