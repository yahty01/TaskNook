// @flow
import {useState} from "react";
import {initTodoLists, TodoListType} from "../db/initialTodoLists";
import {filterValue} from "./useTasks";


export const useTodoLists = () => {


	let [todoLists, setTodoLists] = useState<TodoListType[]>(initTodoLists)

	const changeTodoFilter = (filter: filterValue, todolistId: string) => {
		setTodoLists(todoLists.map(tl => tl.id === todolistId? {...tl, filter: filter}: tl)  );
	}


	return {todoLists, setTodoLists, changeTodoFilter}
};