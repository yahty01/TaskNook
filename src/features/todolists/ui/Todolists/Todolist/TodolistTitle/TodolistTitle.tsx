import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { EditableSpan } from "common/components"
import { RequestStatus } from "common/types/enums"
import { useRemoveTodolistMutation, useUpdateTodolistMutation } from "../../../../api/todolistsApi"

type Props = {
  title: string
  todolistId: string
  entityStatus: RequestStatus
}

export const TodolistTitle = (props: Props) => {
  const { title, todolistId, entityStatus } = props

  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistMutation()

  const updateTodoListTitle = (newTitle: string) => {
    updateTodolistTitle({ title: newTitle, todolistId: todolistId })
  }

  return (
    <>
      <IconButton
        aria-label="delete"
        onClick={() => removeTodolist({ todolistId })}
        disabled={entityStatus === "loading"}
      >
        <DeleteIcon />
      </IconButton>
      <EditableSpan value={title} onChange={updateTodoListTitle} disabled={entityStatus === "loading"} />
    </>
  )
}
