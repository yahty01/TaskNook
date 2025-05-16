import List from "@mui/material/List"
import { RequestStatus, TaskStatus } from "common/types/enums"
import CircularProgress from "@mui/material/CircularProgress"
import { CircularContainer, Container } from "./Tasks.styled"
import { useGetTasksQuery } from "../../../../api/tasksApi"
import { DomainTodolist } from "../../../../model/todolistsSlice"
import { Task } from "./Task/Task"
import { QueryStatus } from "@reduxjs/toolkit/query"

type Props = {
  todolist: DomainTodolist
}

export function Tasks({ todolist }: Props) {
  const { id, filter } = todolist
  const { data, status } = useGetTasksQuery(id)

  let filteredTasks = data?.items

  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Complete)
  }
  console.log(data)
  if (status === QueryStatus.pending) {
    return (
      <CircularContainer>
        <CircularProgress />
      </CircularContainer>
    )
  } else if (todolist.tasksLoaded === RequestStatus.failed) {
    return <span>Что то пошло не так :( Попробуйте снова!</span> ///Переписать на rtkquery
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
      </Container>
    )
  }
}
// Иногда перебивает таски в ui need to fix
