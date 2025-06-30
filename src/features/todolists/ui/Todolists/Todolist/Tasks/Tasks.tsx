import List from "@mui/material/List"
import { TaskStatus } from "common/types/enums"
import { Container } from "./Tasks.styled"
import { useGetTasksQuery } from "../../../../api/tasksApi"
import { DomainTodolist } from "common/actions/common.actions"
import { Task } from "./Task/Task"
import { useState } from "react"
import { TasksPagination } from "./TasksPagination/TasksPagination"
import { TasksSkeleton } from "./TasksSkeleton/TasksSkeleton"

type Props = {
  todolist: DomainTodolist
}

export function Tasks({ todolist }: Props) {
  const [page, setPage] = useState<number>(1)
  const { id, filter } = todolist

  const { data, isLoading, isFetching } = useGetTasksQuery({
    todolistId: id,
    params: { page },
  })

  let filteredTasks = data?.items

  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
  } else if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Complete)
  }

  // Отдельная отрисовка только при isLoading
  if (isLoading) {
    return (
      <>
        <TasksSkeleton />
        <TasksSkeleton />
        <TasksSkeleton />
        <TasksSkeleton />
      </>
    )
  }

  let content

  if (data?.totalCount === 0) {
    content = <p>Задачи отсутствуют!</p>
  } else {
    content = (
      <List>
        {filteredTasks?.map((task) => (
          <Task key={task.id} task={task} todolistId={id} todoEntityStatus={todolist.entityStatus} page={page} />
        ))}
      </List>
    )
  }

  return (
    <Container>
      {content}
      <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
    </Container>
  )
}
