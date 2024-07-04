import {useState} from "react";
import {initialTasks, TasksProps} from "../db/initialTasks";
import {v1} from "uuid";

export type filterValue = 'all' | 'completed' | 'active'

export const useTasks = () => {
	let [todo, setTodo] = useState<TasksProps[]>(initialTasks)
	let [filter, setFilter] = useState<filterValue>('all')
	let tasksForFilter = todo

	const removeTask = (id: string) => {
		setTodo(todo.filter((task) => task.id !== id))
	}

	const changeFilter = (value: filterValue) => {
		setFilter(value)
	}

	const addTask = (title: string) => {
		const newTask: TasksProps = {
			id: v1(),
			title: title,
			isDone: false
		}
		const newTasks = [newTask, ...tasksForFilter]
		setTodo(newTasks)
	}

	if (filter === 'all') {
		tasksForFilter = todo
	}
	if (filter === 'active') {
		tasksForFilter = todo.filter((t) => !t.isDone)
	}
	if (filter === 'completed') {
		tasksForFilter = todo.filter((t) => t.isDone)
	}

	return {tasksForFilter, removeTask, changeFilter, addTask}
}


