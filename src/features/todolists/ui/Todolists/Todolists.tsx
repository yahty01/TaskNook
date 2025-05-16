import React from "react"
import { Todolist } from "./Todolist/Todolist"
import { DomainTodolist } from "../../model/todolistsSlice"
import Grid from "@mui/material/Grid2"
import { useGetTodolistsQuery } from "../../api/todolistsApi"

export function Todolists() {
  const { data: todolists } = useGetTodolistsQuery()
  // const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Grid container rowSpacing={8} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ padding: "0 60px" }}>
      {todolists?.map((todolist: DomainTodolist) => (
        <Grid key={todolist.id} size={{ xs: 2, sm: 4, md: 4 }}>
          {" "}
          <Todolist key={todolist.id} todolist={todolist} />
        </Grid>
      ))}
    </Grid>
  )
}
