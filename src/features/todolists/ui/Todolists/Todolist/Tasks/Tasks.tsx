import { Task } from "./Task/Task"
import List from "@mui/material/List"
import { TaskResponse } from "../../../../api/tasksApi.types"
import { RequestStatus } from "common/types/enums"
import CircularProgress from "@mui/material/CircularProgress"
import { CircularContainer, Container } from "./Tasks.styled"

type TaskProps = {
  tasks: TaskResponse[]
  todolistId: string
  taskLoaded: RequestStatus
}

export function Tasks({ tasks, todolistId, taskLoaded }: TaskProps) {
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
