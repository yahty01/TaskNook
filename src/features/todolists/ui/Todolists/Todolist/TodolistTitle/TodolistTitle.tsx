import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { EditableSpan } from "common/components"
import { removeTodolistTC, updateTodolistTitleTC } from "../../../../model/todolistsSlice"
import { useAppDispatch } from "common/hooks"
import { RequestStatus } from "common/types/enums"

type Props = {
  title: string
  todolistId: string
  entityStatus: RequestStatus
}

export const TodolistTitle = (props: Props) => {
  const { title, todolistId, entityStatus } = props
  const dispatch = useAppDispatch()

  const removeTodoList = () => {
    dispatch(removeTodolistTC(todolistId))
  }

  const updateTodoListTitle = (title: string) => {
    dispatch(updateTodolistTitleTC({ todolistId, title }))
  }

  return (
    <>
      <IconButton aria-label="delete" onClick={removeTodoList} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
      <EditableSpan value={title} onChange={updateTodoListTitle} disabled={entityStatus === "loading"} />
    </>
  )
}
