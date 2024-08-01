// @flow
import {useState} from "react";
import {initTodoLists, TodoListType} from "../db/initialTodoLists";
import {filterValue} from "./useTasks";
import {v1} from "uuid";

export const useTodoLists = (addEmptyTasksList: (id: string) => void) => {
	let [todoLists, setTodoLists] = useState<TodoListType[]>(initTodoLists)

	const changeTodoFilter = (filter: filterValue, todolistId: string) => {
		setTodoLists(todoLists.map(tl => tl.id === todolistId? {...tl, filter: filter}: tl)  );
	}

	const updateTodoList= (title: string, todolistId: string) => {
		setTodoLists(todoLists.map(t => t.id === todolistId? {...t, title: title} : t))
	}
	const addTodo = (title: string) => {
		const newTodo: TodoListType = {
			id: v1(),
			title: title,
			filter: 'all',
		}
		setTodoLists([...todoLists, newTodo])
		addEmptyTasksList(newTodo.id)
	}

	const removeTodo = (id: string) => {
		setTodoLists(todoLists => todoLists.filter(todo => todo.id !== id))
	}


	return {todoLists, setTodoLists, changeTodoFilter, addTodo, removeTodo, updateTodoList}
};