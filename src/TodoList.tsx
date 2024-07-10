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

function Todolist ({title, taskList, removeTask, changeFilter, addTask}: TodoListProps) {
	const [inputTaskTitle, setInputTaskTitle] = useState('')

	const isEmptyInput = inputTaskTitle.length === 0

	const onTittleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setInputTaskTitle(e.currentTarget.value)
	}

	const addTaskHandler = () => {
		isEmptyInput
			? alert('error')
			: addTask(inputTaskTitle)
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
				<input onChange={onTittleChangeHandler} onKeyDown={addTaskOnKeyUpHandler} value={inputTaskTitle}/>
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
  background-color: rgba(23, 20, 183, 0.12);
  padding: 10px;
  border-radius: 10px;
  border: 6px solid rgba(0, 0, 0, 0.38);
  width: 30vw;
  height: 90vh;

  h3 {
    font-size: 3rem;
    align-self: center;
    letter-spacing: -1px;
  }
`

const StyledButtonGr = styled.div`
  display: flex;
  gap: 3px;
	align-self: center;
`

const StyledInputArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
  width: 90%;

  input {
    background: none;
    border: 1px solid rgba(0, 0, 0, 0.35);
    border-radius: 5px;
    padding: 5px 15px;
    outline: none;
    flex-grow: 1;
    margin-right: 20px;
  }

`

export {Todolist}