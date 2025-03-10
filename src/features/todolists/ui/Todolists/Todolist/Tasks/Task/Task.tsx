import { ChangeEvent } from "react"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import { SpanWrapper } from "./Task.styled"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import { removeTaskTC, updateTaskTC } from "../../../../../model/tasksSlice"
import { RequestStatus, TaskStatus } from "common/types/enums"
import { DomainTask } from "../../../../../api/tasksApi.types"

type TaskProps = {
  task: DomainTask
  todolistId: string
  todoEntityStatus: RequestStatus
}

export function Task({ todolistId, task, todoEntityStatus }: TaskProps) {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(removeTaskTC({ taskId: task.id, todolistId }))
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(updateTaskTC({ todolistId, taskId: task.id, domainModel: { title } }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.currentTarget.checked ? TaskStatus.Complete : TaskStatus.New
    dispatch(updateTaskTC({ todolistId, taskId: task.id, domainModel: { status: newStatus } }))
  }

  const isComplete = task.status === TaskStatus.Complete
  const isDisabled = task.entityStatus === "loading" || todoEntityStatus === "loading"

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
      <Checkbox size="medium" checked={isComplete} onChange={changeTaskStatusHandler} disabled={isDisabled} />
      <SpanWrapper isDone={isComplete}>
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} disabled={isDisabled} />
      </SpanWrapper>
      <IconButton aria-label="delete" onClick={removeTaskHandler} disabled={isDisabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
