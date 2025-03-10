import React from "react"
import { AddItemForm } from "common/components"
import { addTodolistTC } from "../features/todolists/model/todolistsSlice"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import Grid from "@mui/material/Grid2"
import styled from "styled-components"
// @ts-ignore
import starOne from "../common/utils/starOne.svg"

export function Main() {
  const dispatch = useAppDispatch()
  const addTodoList = (title: string) => dispatch(addTodolistTC(title))

  return (
    <StyledMai>
      <CreateTodolist>
        <AddItemForm addItem={addTodoList} />
      </CreateTodolist>
      {/*<img src={starOne} alt="Star" />*/}
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </StyledMai>
  )
}

export const StyledMai = styled.div`
  background-image: ${starOne};
`
export const CreateTodolist = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`
