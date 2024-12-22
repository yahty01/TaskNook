import React, { useEffect } from "react"
import { AddItemForm } from "common/components"
import { addTodolistTC } from "../features/todolists/model/todolists-reducer"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import Grid from "@mui/material/Grid2"
import { useNavigate } from "react-router"
import { useAppSelector } from "common/hooks"
import { selectIsLoggedIn } from "../features/auth/model/authSelectors"
import { Path } from "common/routing"
import { setIsLoggedInAC } from "../features/auth/model/auth-reducer"

export function Main() {
  const dispatch = useAppDispatch()
  const addTodoList = (title: string) => dispatch(addTodolistTC(title))

  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  useEffect(() => {
    if (isLoggedIn === false) {
      debugger
      navigate(Path.Main)
    }
  }, [isLoggedIn])

  return (
    <>
      <Grid container>
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </>
  )
}
