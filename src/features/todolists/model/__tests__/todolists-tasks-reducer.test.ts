import { addTodolistAC, DomainTodolist, todolistsReducer } from "../todolists-reducer"
import { tasksReducer, TasksStateType } from "../tasks-reducer"
import { todolistData } from "../mockData/mock-data"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: DomainTodolist[] = []
  const newTodo = { ...todolistData, title: "new todolist" }
  const action = addTodolistAC(newTodo)

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
