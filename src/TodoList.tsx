// Todolist.tsx
import React from 'react';
import styled from 'styled-components';
import {Tasks} from './components/Tasks';
import {TaskType} from './db/initialTasks';
import {filterValue} from './hooks/useTasks';
import FilterButton from "./components/FilterButton";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import {EditableSpan} from "./components/editableSpan/EditableSpan";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

type TodoListProps = {
	todolistId: string
	title: string;
	tasksList: TaskType[];
	removeTask: (id: string, todolistId: string) => void;
	changeFilter: (value: filterValue, todolistId: string) => void;
	addTask: (title: string, todolistId: string) => void;
	changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
	filter: filterValue;
	removeTodo: (id: string) => void;
	updateTask: (taskId: string , title: string, todolistId: string) => void;
	updateTodoList: (title: string, todolistId: string) => void;
};

function Todolist({
	                  title,
	                  tasksList,
	                  removeTask,
	                  changeFilter,
	                  addTask,
	                  changeStatus,
	                  filter,
	                  todolistId,
	                  removeTodo,
	                  updateTask,
	                  updateTodoList
                  }: TodoListProps) {
	const changeFilterHandler = (filter: filterValue) => {
		changeFilter(filter, todolistId);
	};

	const removeTaskHandler = (taskId: string) => {
		removeTask(taskId ,todolistId)
	}

	const changeStatusHandler = (taskId: string, isDone: boolean) => {
		changeStatus(taskId, isDone, todolistId)
	}

	const addTaskHandler = (taskId: string) => {
		addTask(taskId, todolistId)
	}

	const removeTodoHandler = () => {
		removeTodo(todolistId)
	}

	const updateTaskHandler = (taskId: string, title: string) => {
		updateTask(taskId, title, todolistId)
	}
	const updateTodoListHandler = (title: string) => {
		updateTodoList(title, todolistId)
	}

	return (
		<StyledTodoList>
			<Button onClick={removeTodoHandler} name={'x'}/>
			<EditableSpan value={title} onChange={updateTodoListHandler}/>
			<AddItemForm addItem={addTaskHandler}/>
			<Tasks tasks={tasksList}
			       removeTask={removeTaskHandler}
			       changeStatus={changeStatusHandler}
			       changeTaskTitle={updateTaskHandler}/>
			<ButtonGroup variant="outlined" aria-label="Basic button group">
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
			</ButtonGroup>
		</StyledTodoList>
	);
}

const StyledTodoList = styled.div`
  width: 300px;
`;

export default Todolist;