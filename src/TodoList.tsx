// Todolist.tsx
import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import { Tasks } from './components/Tasks';
import { Button } from './components/Button';
import { TasksProps } from './db/initialTasks';
import { filterValue } from './hooks/useTasks';
import FilterButton from "./components/FilterButton";

type TodoListProps = {
	title: string;
	taskList: TasksProps[];
	removeTask: (id: string) => void;
	changeFilter: (value: filterValue) => void;
	addTask: (title: string) => void;
	changeStatus: (taskId: string, isDone: boolean) => void;
	filter: filterValue;
};

function Todolist({ title, taskList, removeTask, changeFilter, addTask, changeStatus, filter }: TodoListProps) {
	const [inputTaskTitle, setInputTaskTitle] = useState('');

	const errorInput = useRef<string | null>(null);
	const isEmptyInput = inputTaskTitle.trim() === '';

	const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		errorInput.current = null;
		setInputTaskTitle(e.currentTarget.value);
	};

	const addTaskHandler = () => {
		isEmptyInput ? (errorInput.current = 'Поле не может быть пустым') : addTask(inputTaskTitle.trim());
		setInputTaskTitle('');
	};

	const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			addTaskHandler();
		}
	};

	const changeFilterHandler = (filter: filterValue) => {
		changeFilter(filter);
	};

	return (
		<StyledTodoList>
			<h3>{title}</h3>

			<StyledInputArea errorInput={errorInput.current}>
				<input onChange={onTitleChangeHandler} onKeyDown={addTaskOnKeyUpHandler} value={inputTaskTitle} />
				<Button onClick={addTaskHandler} name={'+'} />
			</StyledInputArea>
			{errorInput && <Error>{errorInput.current}</Error>}

			<Tasks tasks={taskList} removeTask={removeTask} changeStatus={changeStatus} />

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
	
`;

const StyledInputArea = styled.div<{ errorInput: string | null }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  outline: 2px dotted black;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: rgba(34, 139, 34, 0.32);
  input {
	  border-radius: 5px;
    border: ${props => (props.errorInput ? '4px solid red' : '1px solid #ccc')};
    padding: 10px;
    margin-bottom: 5px;
  }
`;

const StyledButtonGr = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  outline: 2px dotted black;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: rgba(34, 139, 34, 0.32);
`;

const Error = styled.div`
  color: red;
  font-size: 12px;
  margin-top: -15px;
  margin-bottom: 10px;
`;

export default Todolist;