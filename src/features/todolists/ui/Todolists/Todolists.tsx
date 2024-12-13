import React, { useEffect } from "react"
import { Todolist } from "./Todolist/Todolist"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectTodolists } from "../../model/todolistsSelectors"
import { DomainTodolist, fetchTodolistsTC } from "../../model/todolists-reducer"
import Grid from "@mui/material/Grid2"

export function Todolists() {
  const todoLists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <Grid container rowSpacing={8} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ padding: "0 60px" }}>
      {todoLists.map((todolist: DomainTodolist) => (
        <Grid key={todolist.id} size={{ xs: 2, sm: 4, md: 4 }}>
          {" "}
          <Todolist key={todolist.id} todolist={todolist} />
        </Grid>
      ))}
    </Grid>
  )
}
