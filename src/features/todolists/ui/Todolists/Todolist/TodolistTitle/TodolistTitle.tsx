import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { EditableSpan } from "common/components"
import { useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from "../../../../api/todolistsApi"
import { DomainTodolist } from "common/actions/common.actions"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

  const updateTodoListTitle = (newTitle: string) => {
    updateTodolistTitle({ title: newTitle, todolistId: todolist.id })
  }

  const deleteTodolist = () => removeTodolist({ todolistId: todolist.id })

  return (
    <>
      <IconButton aria-label="delete" onClick={deleteTodolist} disabled={todolist.entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
      <EditableSpan
        value={todolist.title}
        onChange={updateTodoListTitle}
        disabled={todolist.entityStatus === "loading"}
      />
    </>
  )
}
