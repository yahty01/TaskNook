import * as React from "react"
import { ChangeEvent } from "react"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import { SpanWrapper } from "./Task.styled"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import { removeTaskTC, updateTaskTC } from "../../../../../model/tasks-reducer"
import { TaskResponse } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "common/types/enums"

type TaskProps = {
  task: TaskResponse
  todolistId: string
}

export function Task({ todolistId, task }: TaskProps) {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(removeTaskTC({ taskId: task.id, todolistId }))
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(updateTaskTC(todolistId, task.id, title))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.currentTarget.checked
    dispatch(updateTaskTC(todolistId, task.id, newStatus))
  }

  const isComplete = task.status === TaskStatus.Complete

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
      <Checkbox size="medium" checked={isComplete} onChange={changeTaskStatusHandler} />
      <SpanWrapper isDone={isComplete}>
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      </SpanWrapper>
      <IconButton aria-label="delete" onClick={removeTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
