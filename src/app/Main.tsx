import React from "react"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Unstable_Grid2"
import { AddItemForm } from "common/components"
import { addTodolistAC } from "../features/todolists/model/todolists-reducer"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useAppDispatch } from "common/hooks/useAppDispatch"

export function Main() {
  const dispatch = useAppDispatch()

  const addTodoList = (title: string) => dispatch(addTodolistAC(title))

  return (
    <Container maxWidth="xl" style={{ marginTop: "5rem" }}>
      <Grid container>
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
