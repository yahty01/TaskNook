import { v1 } from "uuid"
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  DomainTodolist,
  removeTodolistAC,
  todolistsReducer,
} from "../todolists-reducer"
import { FilterType } from "../../ui/Todolists/Todolist/FilterTasksButtons/FilterTasksButtons"
import { todolistsData } from "./mock-data-test"

test("correct todolist should be removed", () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const startState: DomainTodolist[] = { ...todolistsData }
  startState[0].id = todolistId1
  startState[1].id = todolistId2
  const action = removeTodolistAC(todolistId1)
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  const startState: DomainTodolist[] = { ...todolistsData }

  const newTitle = "New Todolist"
  const endState = todolistsReducer(startState, addTodolistAC(newTitle))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newTitle)
  expect(endState[2].filter).toBe("all")
})

test("correct todolist should change its name", () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const startState: DomainTodolist[] = { ...todolistsData }
  startState[0].id = todolistId1
  startState[1].id = todolistId2

  const newTitle = "New Todolist"

  const endState = todolistsReducer(
    startState,
    changeTodolistTitleAC({ todolistId: todolistId2, title: newTitle }),
  )

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(newTitle)
  expect(endState[1].filter).toBe("all")
})

test("correct filter of todolist should be changed", () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const startState: DomainTodolist[] = { ...todolistsData }
  startState[0].id = todolistId1
  startState[1].id = todolistId2

  let newFilter: FilterType = "active"
  const endState = todolistsReducer(
    startState,
    changeTodolistFilterAC({ todolistId: todolistId2, filter: newFilter }),
  )

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe("active")
})
