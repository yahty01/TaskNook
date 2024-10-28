import React, { useEffect } from "react"
import { Todolist } from "./Todolist/Todolist"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectTodolists } from "../../model/todolistsSelectors"
import { fetchTodolistsTC } from "../../model/todolists-reducer"

export function Todolists() {
  const todoLists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todoLists.map((todolist) => (
        <Todolist key={todolist.id} todolist={todolist} />
      ))}
    </>
  )
}
