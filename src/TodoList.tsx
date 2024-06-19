import {TasksProps} from "./db/TasksArray";
import {Button} from "./components/Button";
import styled from "styled-components";
import {Tasks} from "./components/Tasks";
//Почему не работает с синтаксисом ({tasks}: TaskProps)

type TodoListProps = {
	title: string
	taskList: TasksProps[]
}

export const Todolist = ({title, taskList}: TodoListProps) => {
	return (
		<StyledTodoList>
			<h3>{title}</h3>
			<div>
				<input/>
				<Button title='+'/>
			</div>
			<Tasks tasks={taskList}/>
			<ButtonGr>
				<Button title='All'/>
				<Button title='Active'/>
				<Button title='Completed'/>
			</ButtonGr>
		</StyledTodoList>
	)
}

const StyledTodoList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  background-color: rgba(27, 24, 212, 0.36);
	width: 230px;
	padding: 10px;
	border-radius: 10px;
	margin: 15px 0 0 0;
	
	&:first-child {
		margin-left: 20px;
	}
`

const ButtonGr = styled.div`
  display: flex;
  gap: 3px;
`