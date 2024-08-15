import {v1} from "uuid";
import {filterValue} from "../store/hooks/useTasks";

export const todolistID1 = v1()
export const todolistID2 = v1()

export type TodoListType = {
	todolistId: string
	title: string
	filter: filterValue
}



export const initTodoLists: TodoListType[] = [
	{todolistId: todolistID1, title: 'What to learn', filter: 'all'},
	{todolistId: todolistID2, title: 'Список покупок!', filter: 'all'},
]

