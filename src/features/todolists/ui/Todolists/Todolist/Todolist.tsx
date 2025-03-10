import React from "react"
import { Tasks } from "./Tasks/Tasks"
import { AddItemForm } from "common/components"
import { createTaskTC } from "../../../model/tasksSlice"
import { DomainTodolist } from "../../../model/todolistsSlice"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { StyledPaper } from "./Todolist.styled"
import { useAppDispatch } from "common/hooks"
import Grid from "@mui/material/Grid2"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"

export type FilterValue = "all" | "completed" | "active"

type Props = {
  todolist: DomainTodolist
}

// export function Todolist(todolist: Props) {  если убрать фигурные скобки, то
// мы не будем деструктурировать и получем весь объект типа Props

export function Todolist({ todolist }: Props) {
  const { title, entityStatus, id, filter } = todolist
  const dispatch = useAppDispatch()

  const addTask = (title: string) => {
    dispatch(createTaskTC({ title, todolistId: id }))
  }

  return (
    <Grid>
      <StyledPaper elevation={5} square={false} sx={{ padding: "1rem" }}>
        <TodolistTitle title={title} todolistId={id} entityStatus={entityStatus} />
        <AddItemForm addItem={addTask} disabled={todolist.entityStatus === "loading"} />
        <Tasks
          filterValue={filter}
          todolistId={todolist.id}
          taskLoaded={todolist.tasksLoaded}
          todoEntityStatus={entityStatus}
        />
        <FilterTasksButtons id={todolist.id} filter={todolist.filter} />
      </StyledPaper>
    </Grid>
  )
}
