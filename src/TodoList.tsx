import {TasksProps} from "./db/TasksArray";
import {Button} from "./components/Button";
import styled from "styled-components";
import {Tasks} from "./components/Tasks";

type TodoListProps = {
	title: string
	taskList: TasksProps[]
}

export const Todolist = ({title, taskList}: TodoListProps) => {
	debugger
	return (
		<StyledTodoList>
			<h3>{title}</h3>
			<div>
				<input/>
				<button>+</button>
			</div>
			<Tasks tasks={taskList}/>
			<ButtonGr>
				<Button>All</Button>
				<Button>Active</Button>
				<Button>Completed</Button>
			</ButtonGr>
		</StyledTodoList>
	)
}

const StyledTodoList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: rgba(27, 24, 212, 0.36);
`

const ButtonGr = styled.div`
  display: flex;
  gap: 3px;
`