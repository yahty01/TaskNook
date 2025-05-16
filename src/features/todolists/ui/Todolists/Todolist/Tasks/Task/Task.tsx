import { ChangeEvent } from "react"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import { SpanWrapper } from "./Task.styled"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import { RequestStatus, TaskStatus } from "common/types/enums"
import { DomainTask, UpdateTaskModel } from "../../../../../api/tasksApi.types"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "../../../../../api/tasksApi"

type TaskProps = {
  task: DomainTask
  todolistId: string
  todoEntityStatus: RequestStatus
}

export function Task({ todolistId, task, todoEntityStatus }: TaskProps) {
  const buildUpdatedModel = (updates: Partial<UpdateTaskModel>): UpdateTaskModel => ({
    title: task.title,
    status: task.status,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    ...updates,
  })

  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const removeTaskHandler = () => {
    deleteTask({ taskId: task.id, todolistId })
  }

  const changeTaskTitle = (title: string) => {
    const model = buildUpdatedModel({ title })
    updateTask({ todolistId, taskId: task.id, model })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.currentTarget.checked ? TaskStatus.Complete : TaskStatus.New
    const model = buildUpdatedModel({ status: newStatus })
    updateTask({ todolistId, taskId: task.id, model })
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
      <Checkbox size="medium" checked={isComplete} onChange={changeTaskStatus} disabled={isDisabled} />
      <SpanWrapper isDone={isComplete}>
        <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={isDisabled} />
      </SpanWrapper>
      <IconButton aria-label="delete" onClick={removeTaskHandler} disabled={isDisabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
