import {useState} from "react";
import {initialTasks, TasksStateType, TaskType} from "../db/initialTasks";
import {v1} from "uuid";

export type filterValue = 'all' | 'completed' | 'active'

export const useTasks = () => {
	let [allTodoTasks, setAllTodoTasks] = useState<TasksStateType>(initialTasks)

	const removeTask = (taskId: string, todolistId: string) => {
		setAllTodoTasks({...allTodoTasks, [todolistId]: allTodoTasks[todolistId].filter(task => task.id !== taskId)})
	}

	const addTask = (title: string, todolistId: string) => {
		const newTask: TaskType = {id: v1(), title: title, isDone: false}
		setAllTodoTasks({...allTodoTasks, [todolistId]: [...allTodoTasks[todolistId], newTask]})
	} // копируем таски, вносим изменения в таски с нужным id, копируя все таски и добавляя в конец новую

	const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
		setAllTodoTasks({
			...allTodoTasks,
			[todolistId]: allTodoTasks[todolistId].map(task => task.id === taskId ? {...task, isDone: isDone} : task)
		})
	}

	const updateTask = (taskId: string, title: string, todolistId: string) => {
		setAllTodoTasks({
			...allTodoTasks,
			[todolistId]: allTodoTasks[todolistId].map(task => task.id === taskId ? {...task, title: title} : task)
		})
	}

	const addEmptyTaskList = (todoListId: string) => {
		setAllTodoTasks({...allTodoTasks, [todoListId]: []})
	}

	return { removeTask, addTask, changeStatus, allTodoTasks, addEmptyTaskList, changeTitle: updateTask}

}
