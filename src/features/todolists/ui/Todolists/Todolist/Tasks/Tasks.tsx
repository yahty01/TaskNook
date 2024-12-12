import { Task } from "./Task/Task"
import List from "@mui/material/List"
import { TaskResponse } from "../../../../api/tasksApi.types"
import { RequestStatus } from "common/types/enums"
import CircularProgress from "@mui/material/CircularProgress"
import { CircularContainer, Container } from "./Tasks.styled"
import { DomainTask } from "../../../../model/tasks-reducer"

type Props = {
  tasks: DomainTask[]
  todolistId: string
  taskLoaded: RequestStatus
}

export function Tasks(props: Props) {
  const { tasks, todolistId, taskLoaded } = props
  return taskLoaded !== RequestStatus.succeeded ? (
    <CircularContainer>
      <CircularProgress />
    </CircularContainer>
  ) : tasks?.length === 0 ? (
    <Container>
      <p>Задачи отсутствуют!</p>
    </Container>
  ) : (
    <Container>
      {" "}
      <List>{tasks?.map((task) => <Task key={task.id} task={task} todolistId={todolistId} />)}</List>
    </Container>
  )
}
