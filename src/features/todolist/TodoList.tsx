import React from 'react';
import styled from 'styled-components';
import {Tasks} from '../tasks/Tasks';
import FilterButtons from "../../common/components/FilterButtons";
import {AddItemForm} from "../../common/components/addItemForm/AddItemForm";
import {EditableSpan} from "../../common/components/editableSpan/EditableSpan";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {addTaskAC, TaskType} from "../reducer/tasks-reducer";

export type filterValue = 'all' | 'completed' | 'active'


type TodoListProps = {
	todolistId: string
	title: string;
	changeFilter: (value: filterValue, todolistId: string) => void;
	filter: filterValue;
	removeTodo: (id: string) => void;
	updateTodoList: (title: string, todolistId: string) => void;
	theme: any
};

function Todolist({
	                  title,
	                  changeFilter,
	                  filter,
	                  todolistId,
	                  removeTodo,
	                  updateTodoList,
	                  theme
                  }: TodoListProps) {
	const tasks = useSelector<RootState, TaskType[]>(state => state.tasks[todolistId])
	const dispatch = useDispatch();

	const changeFilterHandler = (filter: filterValue) => {
		changeFilter(filter, todolistId);
	};
	const addTaskHandler = (title: string) => {
		dispatch(addTaskAC(title, todolistId))
	}

	const removeTodoHandler = () => {
		removeTodo(todolistId)

	}

	const updateTodoListHandler = (title: string) => {
		updateTodoList(title, todolistId)
	}

	let tasksForFilter = tasks

	if (filter === 'active') {
		tasksForFilter = tasksForFilter.filter(task => !task.isDone)
	}

	if (filter === 'completed') {
		tasksForFilter = tasksForFilter.filter(task => task.isDone)
	}

	return (
		<Grid>
			<StyledPaper elevation={5} square={false} sx={{padding: '1rem'}}>
				<IconButton aria-label="delete" onClick={removeTodoHandler}>
					<DeleteIcon/>
				</IconButton>
				<EditableSpan value={title} onChange={updateTodoListHandler}/>
				<AddItemForm addItem={addTaskHandler} theme={theme}/>
				<List>
					<Tasks tasks={tasks} todolistId={todolistId}/>
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