import React from "react";
import {Todolist} from "./Todolist/Todolist";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";

export function Todolists() {
	const todoLists = useAppSelector(state => state.todolists)

	return (
		<>
			{todoLists.map(todolist =>
				<Todolist key={todolist.id} todolist={todolist}/>)
			}
		</>)
}