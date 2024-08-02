// @flow
import * as React from 'react';
import styled from "styled-components";
import {TaskType} from "../db/initialTasks";
import {EditableSpan} from "./editableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from '@mui/material/Checkbox';
import {ChangeEvent} from "react";
import ListItem from '@mui/material/ListItem'


type TaskProps = {
	tasks: TaskType[];
	removeTask: (id: string) => void
	changeStatus: (taskId: string, isDone: boolean) => void
	changeTaskTitle: (taskId: string ,title: string) => void
}

export function Tasks({tasks, removeTask, changeStatus, changeTaskTitle}: TaskProps) {
	const onChangeHandler = (taskId: string, isDone: boolean) => {
		 changeStatus(taskId, isDone)
	}

	return tasks?.length === 0
		? (<p>Задачи отсутствуют!</p>)
		: (
			<>
				{
					tasks?.map(task => {
						const onRemoveClicked = () => removeTask(task.id)

						const changeTitle = (title: string) => {
							changeTaskTitle(task.id, title)
						}

						const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
							onChangeHandler(task.id, e.target.checked)
						}
							return (
								<ListItem key={task.id}
								          disableGutters
								          disablePadding
								          sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
								>
									<Checkbox size="medium" checked={task.isDone} onChange={(e)=>changeTaskStatusHandler(e)}/>
									<StyledSpan isDone={task.isDone} value={task.title} onChange={changeTitle}/>
									<IconButton aria-label="delete" onClick={onRemoveClicked}>
										<DeleteIcon />
									</IconButton>
								</ListItem>
							)
						}
					)}
			</>
		)

}

// Определяем интерфейс для пропсов
type StyledSpanProps = {
	isDone: boolean;
}

// Определяем стилизованный компонент с типизацией пропсов
const StyledSpan = styled(EditableSpan)<StyledSpanProps>`
	flex-grow: 1;
  opacity: ${props => (props.isDone ? '0.5' : '1')};
`;

