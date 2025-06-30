import React from "react"
import { Todolist } from "./Todolist/Todolist"
import Grid from "@mui/material/Grid2"
import { useGetTodolistsQuery } from "../../api/todolistsApi"
import { TodolistSkeleton } from "./TodolistSkeleton/TodolistSkeleton"

export function Todolists() {
  const { data: todolists, isLoading } = useGetTodolistsQuery()

  const viewTodolist = () =>
    isLoading
      ? [...Array(6)].map((_, id) => <TodolistSkeleton key={id} />)
      : todolists?.map((t) => <Todolist key={t.id} todolist={t} />)

  return (
    <Grid gap={4} container rowSpacing={8} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ padding: "0 60px" }}>
      {viewTodolist()}
    </Grid>
  )
}
