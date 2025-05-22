import React from "react"
import { Tasks } from "./Tasks/Tasks"
import { AddItemForm } from "common/components"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { StyledPaper } from "./Todolist.styled"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { useCreateTaskMutation } from "../../../api/tasksApi"
import { DomainTodolist } from "common/actions/common.actions"

export function Todolist({ todolist }: Props) {
  const [createTask] = useCreateTaskMutation()
  const addTask = (title: string) => {
    createTask({ title, todolistId: todolist.id })
  }

  return (
    <StyledPaper elevation={5} square={false} sx={{ padding: "1rem" }}>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons id={todolist.id} filter={todolist.filter} />
    </StyledPaper>
  )
}

type Props = {
  todolist: DomainTodolist
}

export type FilterValue = "all" | "completed" | "active"
