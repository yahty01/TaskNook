import { Task } from "./Task/Task"
import List from "@mui/material/List"
import { RequestStatus } from "common/types/enums"
import CircularProgress from "@mui/material/CircularProgress"
import { CircularContainer, Container } from "./Tasks.styled"
import { useAppSelector } from "common/hooks"
import { FilterValue } from "../Todolist"
import { selectTasks } from "../../../../model/tasksSlice"

type Props = {
  todolistId: string
  filterValue: FilterValue
  taskLoaded: RequestStatus
  todoEntityStatus: RequestStatus
}

export function Tasks(props: Props) {
  const { todolistId, taskLoaded, filterValue, todoEntityStatus } = props
  const tasks = useAppSelector(selectTasks)
  let filteredTasks = tasks[todolistId]

  if (filterValue === "active") {
    filteredTasks = filteredTasks.filter((task) => !task.status)
  }

  if (filterValue === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.status)
  }

  if (taskLoaded == RequestStatus.loading) {
    return (
      <CircularContainer>
        <CircularProgress />
      </CircularContainer>
    )
  } else if (taskLoaded === RequestStatus.failed) {
    return <span>Что то пошло не так :( Попробуйте снова!</span>
  } else if (taskLoaded === RequestStatus.succeeded) {
    return filteredTasks.length === 0 ? (
      <Container>
        <p>Задачи отсутствуют!</p>
      </Container>
    ) : (
      <Container>
        <List>
          {filteredTasks.map((task) => (
            <Task key={task.id} task={task} todolistId={todolistId} todoEntityStatus={todoEntityStatus} />
          ))}
        </List>
      </Container>
    )
  } else {
    return <span>idle</span>
  }
  // Иногда перебивает таски в ui need to fix
}
