import { Task } from "./Task/Task"
import List from "@mui/material/List"
import { RequestStatus } from "common/types/enums"
import CircularProgress from "@mui/material/CircularProgress"
import { CircularContainer, Container } from "./Tasks.styled"
import { useAppSelector } from "common/hooks"
import { selectTasks } from "../../../../model/tasksSelectors"
import { FilterValue } from "../Todolist"

type Props = {
  todolistId: string
  taskLoaded: RequestStatus
  filterValue: FilterValue
}

export function Tasks(props: Props) {
  const { todolistId, taskLoaded, filterValue } = props
  const tasks = useAppSelector(selectTasks)
  let filteredTasks = tasks[todolistId]

  if (filterValue === "active") {
    filteredTasks = filteredTasks.filter((task) => !task.status)
  }

  if (filterValue === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.status)
  }

  return taskLoaded !== RequestStatus.succeeded ? (
    <CircularContainer>
      <CircularProgress />
    </CircularContainer>
  ) : filteredTasks.length === 0 ? (
    <Container>
      <p>Задачи отсутствуют!</p>
    </Container>
  ) : (
    <Container>
      <List>
        {filteredTasks.map((task) => (
          <Task key={task.id} task={task} todolistId={todolistId} />
        ))}
      </List>
    </Container>
  )
}
