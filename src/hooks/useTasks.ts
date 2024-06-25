import {useState} from "react";
import {initialTasks, TasksProps} from "../db/initialTasks";

export const useTasks = () => {
	const [tasks, setTasks] = useState<TasksProps[]>(initialTasks)

	const removeTask = (id: number) => {
		setTasks(tasks.filter((task) => task.id !== id))
	}

	return {tasks, removeTask}
}


