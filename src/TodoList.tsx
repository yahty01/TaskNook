// Todolist.tsx
import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import styled from 'styled-components';
import {Tasks} from './components/Tasks';
import {Button} from './components/Button';
import {TaskType} from './db/initialTasks';
import {filterValue} from './hooks/useTasks';
import FilterButton from "./components/FilterButton";

type TodoListProps = {
	todolistId: string
	title: string;
	tasksList: TaskType[];
	removeTask: (id: string, todolistId: string) => void;
	changeFilter: (value: filterValue, todolistId: string) => void;
	addTask: (title: string, todolistId: string) => void;
	changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
	filter: filterValue;
};

function Todolist({
	                  title,
	                  tasksList,
	                  removeTask,
	                  changeFilter,
	                  addTask,
	                  changeStatus,
	                  filter,
	                  todolistId
                  }: TodoListProps) {

	const [inputTaskTitle, setInputTaskTitle] = useState('');
	const errorInput = useRef<string | null>(null);
	const isEmptyInput = inputTaskTitle.trim() === '';

	const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		errorInput.current = null;
		setInputTaskTitle(e.currentTarget.value);
	};

	const addTaskHandler = () => {
		isEmptyInput ? (errorInput.current = 'Поле не может быть пустым') : addTask(inputTaskTitle.trim(), todolistId);
		setInputTaskTitle('');
	};

	const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			addTaskHandler();
		}
	};

	const changeFilterHandler = (filter: filterValue) => {
		changeFilter(filter, todolistId);
	};

	const removeTaskHandler = (taskId: string) => {
		removeTask(taskId ,todolistId)
	}

	const changeStatusHandler = (taskId: string, isDone: boolean) => {
		changeStatus(taskId, isDone, todolistId)
	}

	return (
		<StyledTodoList>
			<h3>{title}</h3>

			<StyledInputArea errorInput={errorInput.current}>
				<input onChange={onTitleChangeHandler} onKeyDown={addTaskOnKeyUpHandler} value={inputTaskTitle}/>
				<Button onClick={addTaskHandler} name={'+'}/>
			</StyledInputArea>
			{errorInput && <Error>{errorInput.current}</Error>}

			<Tasks tasks={tasksList} removeTask={removeTaskHandler} changeStatus={changeStatusHandler}/>

			<StyledButtonGr>
				<FilterButton
					name={'All'}
					filter={filter}
					onClick={() => changeFilterHandler('all')}
				/>
				<FilterButton
					name={'Active'}
					filter={filter}
					onClick={() => changeFilterHandler('active')}
				/>
				<FilterButton
					name={'Completed'}
					filter={filter}
					onClick={() => changeFilterHandler('completed')}
				/>
			</StyledButtonGr>
		</StyledTodoList>
	);
}

const StyledTodoList = styled.div`
  width: 300px;
  min-height: 100%;
  background-color: rgba(3, 152, 206, 0.34);
  border-radius: 20px;
  padding: 10px;

  h3 {
    text-align: center;
    margin-bottom: 10px;
  }
`;

const StyledInputArea = styled.div<{ errorInput: string | null }>`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  outline: 2px dotted black;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: rgb(0, 116, 253);

  input {
    border-radius: 5px;
    border: ${props => (props.errorInput ? '4px solid red' : '1px solid #ccc')};
    padding: 10px;
  }

  button {
    height: 37px;
  }
`;

const StyledButtonGr = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  outline: 2px dotted black;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: rgba(0, 115, 251, 0.34);
`;

const Error = styled.div`
  color: red;
  font-size: 12px;
  margin-top: -15px;
  margin-bottom: 10px;
`;

export default Todolist;