import styled from "styled-components";
import {Tasks} from "./components/Tasks";
import {Button} from "./components/Button";
import {TasksProps} from "./db/initialTasks";
import {filterValue} from "./hooks/useTasks";
//Почему не работает с синтаксисом ({tasks}: TaskProps)

type TodoListProps = {
	title: string
	taskList: TasksProps[]
	removeTask: (id: number) => void
	changeFilter: (value: filterValue) => void
}

export const Todolist = ({title, taskList, removeTask, changeFilter}: TodoListProps) => {
	return (
		<StyledTodoList>
			<h3>{title}</h3>
			<StyledInputArea>
				<input/>
				<Button callBack={()=>changeFilter('all')} name={'+'}/>
			</StyledInputArea>
			<Tasks tasks={taskList} removeTask={removeTask}/>
			<ButtonGr>
				<Button name={'All'} callBack={()=>changeFilter('all')}/>
				<Button name={'Active'} callBack={()=>changeFilter('active')}/>
				<Button name={'completed'} callBack={()=>changeFilter('completed')}/>
			</ButtonGr>
		</StyledTodoList>
	)
}

const StyledTodoList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  background-color: rgba(23, 20, 183, 0.36);
  width: 240px;
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

const StyledInputArea = styled.div`
	display: flex;
	justify-content: space-between;
	
`