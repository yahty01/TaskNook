import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "../../../../../../reducer/tasks-reducer";
import * as React from "react";
import {ChangeEvent} from "react";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import styled from "styled-components";
import {EditableSpan} from "../../../../../../../common/components/EditableSpan/EditableSpan";
import ListItem from "@mui/material/ListItem";

type TaskProps = {
	task: TaskType
	todolistId: string
	isDone: boolean
}

export function Task({task, todolistId, isDone}: TaskProps) {

	const dispatch = useDispatch();
	const removeTask = () => {
		dispatch(removeTaskAC(task.id, todolistId))
	}

	const changeTaskTitle = (title: string) => {
		dispatch(changeTaskTitleAC(task.id, title, todolistId))
	}

	const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeTaskStatusAC(task.id, e.target.checked, todolistId))
	}

	return (
		<ListItem
			disableGutters
			disablePadding
			sx={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				maxWidth: '100%',
			}}>
			<Checkbox size="medium" checked={task.isDone} onChange={(e) => changeTaskStatusHandler(e)}/>
			<StyledSpan isDone={isDone} value={task.title} onChange={changeTaskTitle}/>
			<IconButton aria-label="delete" onClick={removeTask}>
				<DeleteIcon/>
			</IconButton>
		</ListItem>
	)
}

type StyledSpanProps = {
	isDone: boolean;
}

const StyledSpan = styled(EditableSpan)<StyledSpanProps>`
  flex: 1 1 100%;
  opacity: ${d => (d.isDone ? '0.5' : '1')};
  max-width: 100%;
`;
