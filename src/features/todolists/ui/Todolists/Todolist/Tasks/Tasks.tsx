import * as React from "react"
import { TaskType } from "../../../../model/tasks-reducer"
import { Task } from "./Task/Task"
import List from "@mui/material/List"

type TaskProps = {
  tasks: TaskType[]
  todolistId: string
}

export function Tasks({ tasks, todolistId }: TaskProps) {
  return tasks?.length === 0 ? (
    <p>Задачи отсутствуют!</p>
  ) : (
    <List>
      {tasks.map((task) => (
        <Task key={task.id} task={task} todolistId={todolistId} isDone={task.isDone} />
      ))}
    </List>
  )
}
