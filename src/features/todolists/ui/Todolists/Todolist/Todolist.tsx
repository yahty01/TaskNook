import React from "react"
import { Tasks } from "./Tasks/Tasks"
import { AddItemForm } from "common/components"
import { DomainTodolist } from "../../../model/todolistsSlice"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { StyledPaper } from "./Todolist.styled"
import Grid from "@mui/material/Grid2"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { useCreateTaskMutation } from "../../../api/tasksApi"

export function Todolist({ todolist }: Props) {
  const [createTask] = useCreateTaskMutation()
  const addTask = (title: string) => {
    createTask({ title, todolistId: todolist.id })
  }

  return (
    <Grid>
      <StyledPaper elevation={5} square={false} sx={{ padding: "1rem" }}>
        <TodolistTitle title={todolist.title} todolistId={todolist.id} entityStatus={todolist.entityStatus} />
        <AddItemForm addItem={addTask} disabled={todolist.entityStatus === "loading"} />
        <Tasks todolist={todolist} />
        <FilterTasksButtons id={todolist.id} filter={todolist.filter} />
      </StyledPaper>
    </Grid>
  )
}

type Props = {
  todolist: DomainTodolist
}

export type FilterValue = "all" | "completed" | "active"
