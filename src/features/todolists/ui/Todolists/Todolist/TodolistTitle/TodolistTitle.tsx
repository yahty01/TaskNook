import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { EditableSpan } from "common/components"
import { todolistsApi, useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from "../../../../api/todolistsApi"
import { useAppDispatch } from "common/hooks"
import { DomainTodolist } from "common/actions/common.actions"
import { RequestStatus } from "common/types/enums"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()
  const updateTodoListTitle = (newTitle: string) => {
    updateTodolistTitle({ title: newTitle, todolistId: todolist.id })
  }

  const dispatch = useAppDispatch()

  const changeTodolistStatus = (entityStatus: RequestStatus) => {
    const { id } = todolist
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((el) => el.id === id)
        if (todolist) {
          todolist.entityStatus = entityStatus
        }
      }),
    )
  }

  const deleteTodolist = () => {
    changeTodolistStatus(RequestStatus.loading)
    removeTodolist({ todolistId: todolist.id })
      .unwrap()
      .catch(() => {
        changeTodolistStatus(RequestStatus.idle)
      })
  }

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
