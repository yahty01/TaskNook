import { v1 } from "uuid"
import {
  addTodolistAC,
  DomainTodolist,
  removeTodolistAC,
  todolistsReducer,
  updateTodolistFilterAC,
  updateTodolistTitleAC,
} from "../todolists-reducer"
import { FilterType } from "../../ui/Todolists/Todolist/FilterTasksButtons/FilterTasksButtons"
import { todolistData, todolistsData } from "../mockData/mock-data"

test("correct todolist should be removed", () => {
  const startState: DomainTodolist[] = [...todolistsData]
  const endState = todolistsReducer(startState, removeTodolistAC("v1"))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe("v2")
})

test("correct todolist should be added", () => {
  const startState: DomainTodolist[] = [...todolistsData]
  const newTitle = "New Todolist"
  const newTodo = { ...todolistData, title: newTitle }
  const endState = todolistsReducer(startState, addTodolistAC(newTodo))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTitle)
  expect(endState[2].filter).toBe("all")
})

test("correct todolist should change its name", () => {
  const startState: DomainTodolist[] = [...todolistsData]

  const newTitle = "New Todolist"

  const endState = todolistsReducer(
    startState,
    updateTodolistTitleAC({ id: "v2", title: newTitle }),
  )

  expect(endState[0].title).toBe("oldTod1")
  expect(endState[1].title).toBe(newTitle)
  expect(endState[1].filter).toBe("all")
})

test("correct filter of todolist should be changed", () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const startState: DomainTodolist[] = [...todolistsData]
  startState[0].id = todolistId1
  startState[1].id = todolistId2

  let newFilter: FilterType = "active"
  const endState = todolistsReducer(
    startState,
    updateTodolistFilterAC({ todolistId: todolistId2, filter: newFilter }),
  )

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe("active")
})
