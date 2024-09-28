import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../app/store";
import {TodoListType} from "../../model/todolists-reducer";
import {Todolist} from "./Todolist/Todolist";

export function Todolists() {
	const todoLists = useSelector<RootState, TodoListType[]>(state => state.todolists)

	return (
		<>
			{todoLists.map(todolist =>
				<Todolist key={todolist.id} todolist={todolist}/>)
			}
		</>)
}