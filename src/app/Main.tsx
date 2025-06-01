import React from "react"
import { AddItemForm } from "common/components"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import Grid from "@mui/material/Grid2"
import styled from "styled-components"
import { useCreateTodolistMutation } from "../features/todolists/api/todolistsApi"

export function Main() {
  const [createTodolist] = useCreateTodolistMutation()

  const createTodolistHandler = (title: string) => {
    createTodolist({ title })
  }
  return (
    <div>
      <CreateTodolist>
        <AddItemForm addItem={createTodolistHandler} />
      </CreateTodolist>
      {/*<img src={starOne} alt="Star" />*/}
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </div>
  )
}

export const CreateTodolist = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`
