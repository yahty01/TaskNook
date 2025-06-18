import List from "@mui/material/List"
import { RequestStatus, TaskStatus } from "common/types/enums"
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

  const { data, status, isLoading } = useGetTasksQuery({
    todolistId: id,
    params: { page },
  })

  console.log("render todolist")

  //todo: Вынести фильтрацию в отдельный компонент
  let filteredTasks = data?.items

  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Complete)
  }
  if (isLoading) {
    return (
      <>
        <TasksSkeleton />
        <TasksSkeleton />
        <TasksSkeleton />
        <TasksSkeleton />
      </>
    )
  } else if (todolist.tasksLoaded === RequestStatus.failed) {
    return <span>Что то пошло не так :( Попробуйте снова!</span> ///todo:Переписать на rtkquery
  } else if (data?.totalCount === 0) {
    return (
      <Container>
        <p>Задачи отсутствуют!</p>
      </Container>
    )
  } else {
    return (
      <Container>
        <List>
          {filteredTasks?.map((task) => (
            <Task key={task.id} task={task} todolistId={id} todoEntityStatus={todolist.entityStatus} />
          ))}
        </List>
        <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
      </Container>
    )
  }
}
// Иногда перебивает таски в ui need to fix
