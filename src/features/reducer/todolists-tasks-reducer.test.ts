import {addTodolistAC, todolistsReducer, TodoListType} from "./todolists-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";


test('ids should be equals', () => {
	const startTasksState: TasksStateType = {}
	const startTodolistsState: TodoListType[] = []

	const action = addTodolistAC('new todolist')

	const endTasksState = tasksReducer(startTasksState, action)
	const endTodolistsState = todolistsReducer(startTodolistsState, action)

	const keys = Object.keys(endTasksState)
	const idFromTasks = keys[0]
	const idFromTodolists = endTodolistsState[0].todolistId

	expect(idFromTasks).toBe(action.payload.todolistId)
	expect(idFromTodolists).toBe(action.payload.todolistId)
})
