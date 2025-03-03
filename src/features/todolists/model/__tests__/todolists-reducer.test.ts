import {
  addTodolist,
  clearTodolists,
  DomainTodolist,
  removeTodolist,
  todolistsReducer,
  updateTodolistFilter,
  updateTodolistTitle,
} from "../todolistsSlice"
import { FilterType } from "../../ui/Todolists/Todolist/FilterTasksButtons/FilterTasksButtons"
import { todolistData, todolistsData } from "../mockData/mock-data"

test("correct todolist should be removed", () => {
  const startState: DomainTodolist[] = [...todolistsData]
  const endState = todolistsReducer(startState, removeTodolist({ todolistId: "v1" }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe("v2")
})

test("correct todolist should be added", () => {
  const startState: DomainTodolist[] = [...todolistsData]
  const newTitle = "New Todolist"
  const newTodo = { ...todolistData, title: newTitle }
  const endState = todolistsReducer(startState, addTodolist({ todolist: newTodo }))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTitle)
  expect(endState[2].filter).toBe("all")
})

test("correct todolist should change its name", () => {
  const startState: DomainTodolist[] = [...todolistsData]

  const newTitle = "New Todolist"

  const endState = todolistsReducer(startState, updateTodolistTitle({ todolistId: "v2", title: newTitle }))

  expect(endState[0].title).toBe("oldTod1")
  expect(endState[1].title).toBe(newTitle)
  expect(endState[1].filter).toBe("all")
})

test("correct filter of todolist should be changed", () => {
  const startState: DomainTodolist[] = [...todolistsData]

  let newFilter: FilterType = "active"
  const endState = todolistsReducer(startState, updateTodolistFilter({ todolistId: "v2", filter: newFilter }))

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe("active")
})

test("correct clear all todolists", () => {
  const startState: DomainTodolist[] = [...todolistsData]

  const endState = todolistsReducer(startState, clearTodolists())

  expect(endState.length).toBe(0)
})
