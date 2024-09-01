// @flow
import * as React from 'react';
import styled from "styled-components";
import {TaskType} from "../../db/initialTasks";
import {EditableSpan} from "../../common/components/editableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from '@mui/material/Checkbox';
import {ChangeEvent} from "react";
import ListItem from '@mui/material/ListItem'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {addTaskAC, changeTaskStatusAC, removeTaskAC} from "../reducer/tasks-reducer";


type TaskProps = {
	tasks: TaskType[]
	todolistId: string
}

export function Tasks({tasks, todolistId}: TaskProps) {

	const dispatch = useDispatch();

	return tasks?.length === 0
		? (<p>Задачи отсутствуют!</p>)
		: (
			<>
				{
					tasks?.map(task => {
						const onClickRemove = () => dispatch(removeTaskAC(task.id, todolistId))
						const changeTitle = (title: string) => dispatch(addTaskAC(title, todolistId))

						const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
							dispatch(changeTaskStatusAC(task.id, e.target.checked, todolistId))
						}

							return (
								<ListItem key={task.id}
								          disableGutters
								          disablePadding
								          sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
								>
									<Checkbox size="medium" checked={task.isDone} onChange={(e)=>changeTaskStatusHandler(e)}/>
									<StyledSpan isDone={task.isDone} value={task.title} onChange={changeTitle}/>
									<IconButton aria-label="delete" onClick={onClickRemove}>
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

