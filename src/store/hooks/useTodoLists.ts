// @flow
import {useReducer, useState} from "react";
import {initTodoLists, TodoListType} from "../../db/initialTodoLists";
import {filterValue} from "./useTasks";
import {
	addTodolistAC,
	changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC,
	todolistsReducer
} from "../reducer/todolists-reducer";

export const useTodoLists = (addEmptyTasksList: (id: string) => void) => {
	let [todoLists, dispatch] = useReducer(todolistsReducer,initTodoLists)

	const changeTodoFilter = (filter: filterValue, todolistId: string) => dispatch(changeTodolistFilterAC(todolistId, filter))
	const updateTodoList = (title: string, todolistId: string) => dispatch(changeTodolistTitleAC(todolistId, title))
	const addTodo = (title: string) => {
		dispatch(addTodolistAC(title))
		if (todoLists && todoLists.length > 0) {
			const lastTodo = todoLists[0];
			if (lastTodo) {
				addEmptyTasksList(lastTodo.id);
			} else {
				console.error('Failed to add new todo list');
			}
		} else {
			console.error('Todo list is undefined or empty');
		}

	}
	const removeTodo = (id: string) => dispatch(removeTodolistAC(id))

	return {todoLists, dispatch, changeTodoFilter, addTodo, removeTodo, updateTodoList}
};