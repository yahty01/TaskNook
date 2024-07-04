import styled from "styled-components";
import {Tasks} from "./components/Tasks";
import {Button} from "./components/Button";
import {TasksProps} from "./db/initialTasks";
import {filterValue} from "./hooks/useTasks";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodoListProps = {
	title: string
	taskList: TasksProps[]
	removeTask: (id: string) => void
	changeFilter: (value: filterValue) => void
	addTask: (title: string) => void
}

export const Todolist = ({title, taskList, removeTask, changeFilter, addTask}: TodoListProps) => {
	const [inputTaskTitle, setInputTaskTitle] = useState('')

	const onTittleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setInputTaskTitle(e.currentTarget.value)
	}

	const addTaskHandler = () => {
		addTask(inputTaskTitle)
		setInputTaskTitle('')
	}

	const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			addTaskHandler()
		}
	}

	const changeFilterHandler = (filter: filterValue) => {
		changeFilter(filter)
	}

	return (
		<StyledTodoList>

			<h3>{title}</h3>

			<StyledInputArea>
				<input onChange={onTittleChangeHandler} onKeyDown={addTaskOnKeyUpHandler}/>
				<Button onClick={addTaskHandler} name={'+'}/>
			</StyledInputArea>

			<Tasks tasks={taskList} removeTask={removeTask}/>

			<StyledButtonGr>
				<Button name={'All'} onClick={() => changeFilterHandler('all')}/>
				<Button name={'Active'} onClick={() => changeFilterHandler('active')}/>
				<Button name={'completed'} onClick={() => changeFilterHandler('completed')}/>
			</StyledButtonGr>

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
  border: 3px solid black;
  margin: 15px 0 0 0;

  &:first-child {
    margin-left: 20px;
  }
`

const StyledButtonGr = styled.div`
  display: flex;
  gap: 3px;
`

const StyledInputArea = styled.div`
  display: flex;
  justify-content: space-between;

`