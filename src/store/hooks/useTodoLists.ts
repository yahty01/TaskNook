// @flow
import {useState} from "react";
import {initTodoLists, TodoListType} from "../../db/initialTodoLists";
import {filterValue} from "./useTasks";
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	todolistsReducer
} from "../reducer/todolists-reducer";

export const useTodoLists = (addEmptyTasksList: (id: string) => void) => {
	let [todoLists, setTodoLists] = useState<TodoListType[]>(initTodoLists)

	const changeTodoFilter = (filter: filterValue, todolistId: string) => {
		setTodoLists(
			todolistsReducer
			(todoLists,
				changeTodolistFilterAC
				(todolistId,
					filter
				)
			)
		)
	}

	const updateTodoList = (title: string, todolistId: string) => {
		setTodoLists(
			todolistsReducer
			(todoLists,
				changeTodolistTitleAC
				(todolistId,
					title
				)
			)
		)
	}
	const addTodo = (title: string) => {
		let newTodoLists: TodoListType[] = todolistsReducer(todoLists, addTodolistAC(title))
		setTodoLists(newTodoLists)
		const newTodoList = newTodoLists[newTodoLists.length - 1];
		newTodoList ? addEmptyTasksList(newTodoList.id) : console.error('Failed to add new todo list');
	}

	const removeTodo = (id: string) => setTodoLists(todolistsReducer(todoLists, removeTodolistAC(id)))

	return {todoLists, setTodoLists, changeTodoFilter, addTodo, removeTodo, updateTodoList}
};