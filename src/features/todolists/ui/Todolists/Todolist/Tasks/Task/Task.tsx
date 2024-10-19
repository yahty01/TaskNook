import * as React from "react"
import { ChangeEvent } from "react"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import { SpanWrapper } from "./Task.styled"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  TaskType,
} from "../../../../../model/tasks-reducer"

type TaskProps = {
  task: TaskType
  todolistId: string
  isDone: boolean
}

export function Task({ task, todolistId, isDone }: TaskProps) {
  const dispatch = useAppDispatch()
  const removeTask = () => {
    dispatch(removeTaskAC(task.id, todolistId))
  }

  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleAC(task.id, title, todolistId))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC(task.id, e.target.checked, todolistId))
  }

  return (
    <ListItem
      disableGutters
      disablePadding
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        maxWidth: "100%",
      }}
    >
      <Checkbox size="medium" checked={task.isDone} onChange={(e) => changeTaskStatusHandler(e)} />
      <SpanWrapper isDone={isDone}>
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </SpanWrapper>
      <IconButton aria-label="delete" onClick={removeTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
