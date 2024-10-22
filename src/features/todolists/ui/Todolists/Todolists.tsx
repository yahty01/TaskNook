import React from "react"
import { Todolist } from "./Todolist/Todolist"
import { useAppSelector } from "common/hooks"
import { selectTodolists } from "../../model/todolistsSelectors"

export function Todolists() {
  const todoLists = useAppSelector(selectTodolists)

  return (
    <>
      {todoLists.map((todolist) => (
        <Todolist key={todolist.id} todolist={todolist} />
      ))}
    </>
  )
}
