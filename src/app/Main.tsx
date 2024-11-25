import React from "react"
import Container from "@mui/material/Container"
import { AddItemForm } from "common/components"
import { addTodolistTC } from "../features/todolists/model/todolists-reducer"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import Grid from "@mui/material/Grid2"

export function Main() {
  const dispatch = useAppDispatch()

  const addTodoList = (title: string) => dispatch(addTodolistTC(title))

  return (
    <Container maxWidth="xl" style={{ marginTop: "5rem", paddingBottom: "16px" }}>
      <Grid container>
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
