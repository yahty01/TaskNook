import React from 'react';
import styled from 'styled-components';
import {Tasks} from './Tasks/Tasks';
import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../../../common/components/EditableSpan/EditableSpan";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../app/store";
import {addTaskAC, TaskType} from "../../../../reducer/tasks-reducer";
import {changeTodolistTitleAC, removeTodolistAC, TodoListType} from "../../../../reducer/todolists-reducer";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";

export type filterValue = 'all' | 'completed' | 'active'


type TodoListProps = {
	todolist: TodoListType
};

export function Todolist({todolist}: TodoListProps) {
	const tasks = useSelector<RootState, TaskType[]>(state => state.tasks[todolist.id])
	const dispatch = useDispatch();


	const addTask = (title: string) => {
		dispatch(addTaskAC(title, todolist.id))
	}

	const removeTodoList = () => {
		dispatch(removeTodolistAC(todolist.id))
	}

	const updateTodoListTitle = (title: string) => {
		dispatch(changeTodolistTitleAC({todolistId: todolist.id, title}))
	}

	let tasksForFilter = tasks

	if (todolist.filter === 'active') {
		tasksForFilter = tasksForFilter.filter(task => !task.isDone)
	}

	if (todolist.filter === 'completed') {
		tasksForFilter = tasksForFilter.filter(task => task.isDone)
	}

	return (
		<Grid>
			<StyledPaper elevation={5} square={false} sx={{padding: '1rem'}}>
				<IconButton aria-label="delete" onClick={removeTodoList}>
					<DeleteIcon/>
				</IconButton>
				<EditableSpan value={todolist.title} onChange={updateTodoListTitle}/>
				<AddItemForm addItem={addTask}/>
				<Tasks tasks={tasksForFilter} todolistId={todolist.id}/>
				<FilterTasksButtons id={todolist.id} filter={todolist.filter}/>
			</StyledPaper>
		</Grid>

	);
}

export const StyledPaper = styled(Paper)(() => ({
	maxWidth: 360
}))
