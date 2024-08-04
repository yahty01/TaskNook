// Todolist.tsx
import React from 'react';
import styled from 'styled-components';
import {Tasks} from './components/Tasks';
import {TaskType} from './db/initialTasks';
import {filterValue} from './hooks/useTasks';
import FilterButtons from "./components/FilterButtons";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import {EditableSpan} from "./components/editableSpan/EditableSpan";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List'

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
	updateTask: (taskId: string, title: string, todolistId: string) => void;
	updateTodoList: (title: string, todolistId: string) => void;
	theme: any
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
	                  updateTodoList,
	                  theme
                  }: TodoListProps) {
	const changeFilterHandler = (filter: filterValue) => {
		changeFilter(filter, todolistId);
	};

	const removeTaskHandler = (taskId: string) => {
		removeTask(taskId, todolistId)
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
		<Grid>
			<StyledPaper elevation={5} square={false} sx={{ padding: '1rem' }}>
				<IconButton aria-label="delete" onClick={removeTodoHandler}>
					<DeleteIcon />
				</IconButton>
				<EditableSpan value={title} onChange={updateTodoListHandler}/>
				<AddItemForm addItem={addTaskHandler} theme={theme}/>
				<List>
					<Tasks tasks={tasksList}
					       removeTask={removeTaskHandler}
					       changeStatus={changeStatusHandler}
					       changeTaskTitle={updateTaskHandler}/>
				</List>
				<FilterButtons filter={filter} onClick={changeFilterHandler}/>
			</StyledPaper>
		</Grid>

	);
}

export const StyledPaper = styled(Paper)(() => ({
	maxWidth: 360
}))
export default Todolist;