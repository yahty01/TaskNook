import { addTodolist, DomainTodolist, todolistsSlice } from "../todolistsSlice"
import { Tasks, tasksReducer } from "../tasks-reducer"
import { todolistData } from "../mockData/mock-data"

test("ids should be equals", () => {
  const startTasksState: Tasks = {}
  const startTodolistsState: DomainTodolist[] = []
  const newTodo = { ...todolistData, title: "new todolist" }
  const action = addTodolist({ todolist: newTodo })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsSlice(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
