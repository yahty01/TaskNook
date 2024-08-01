import {v1} from "uuid";
import {filterValue} from "../hooks/useTasks";

export const todolistID1 = v1()
export const todolistID2 = v1()

export type TodoListType = {
	id: string
	title: string
	filter: filterValue
}



export const initTodoLists: TodoListType[] = [
	{id: todolistID1, title: 'What to learn', filter: 'all'},
	{id: todolistID2, title: 'Список покупок!', filter: 'all'},
]

