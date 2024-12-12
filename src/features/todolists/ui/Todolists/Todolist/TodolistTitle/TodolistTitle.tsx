import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { EditableSpan } from "common/components"
import { DomainTodolist, removeTodolistTC, updateTodolistTitleTC } from "../../../../model/todolists-reducer"
import { useAppDispatch } from "common/hooks"

export const TodolistTitle = (todolist: DomainTodolist) => {
  const { title, id, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const removeTodoList = () => {
    dispatch(removeTodolistTC(id))
  }

  const updateTodoListTitle = (title: string) => {
    dispatch(updateTodolistTitleTC({ id, title }))
  }

  return (
    <>
      <IconButton aria-label="delete" onClick={removeTodoList} disabled={todolist.entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
      <EditableSpan value={title} onChange={updateTodoListTitle} disabled={todolist.entityStatus === "loading"} />
    </>
  )
}
