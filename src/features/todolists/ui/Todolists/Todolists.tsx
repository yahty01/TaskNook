import React, { useEffect, useRef } from "react"
import { Todolist } from "./Todolist/Todolist"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { DomainTodolist, fetchTodolistsTC, selectTodolists } from "../../model/todolistsSlice"
import Grid from "@mui/material/Grid2"
import { selectIsLoggedIn } from "../../../auth/model/authSlice"

export function Todolists() {
  const todoLists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const effectRan = useRef(false)

  useEffect(() => {
    if (effectRan.current) return
    effectRan.current = true
    if (isLoggedIn) dispatch(fetchTodolistsTC())
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
