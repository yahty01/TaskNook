import * as React from "react"
import { Task } from "./Task/Task"
import List from "@mui/material/List"
import { DomainTask } from "../../../../api/tasksApi.types"

type TaskProps = {
  tasks: DomainTask[]
  todolistId: string
}

export function Tasks({ tasks, todolistId }: TaskProps) {
  return tasks?.length === 0 ? (
    <p>Задачи отсутствуют!</p>
  ) : (
    <List>
      {tasks?.map((task) => <Task key={task.id} task={task} todolistId={todolistId} />)}
      {/*<Task*/}
      {/*  task={{*/}
      {/*    description: "string",*/}
      {/*    title: "string",*/}
      {/*    status: 2,*/}
      {/*    priority: 0,*/}
      {/*    startDate: "string",*/}
      {/*    deadline: "string",*/}
      {/*    id: "string",*/}
      {/*    todoListId: "string",*/}
      {/*    order: 0,*/}
      {/*    addedDate: "string",*/}
      {/*  }}*/}
      {/*  todolistId={todolistId}*/}
      {/*/>*/}
    </List>
  )
}
