// @flow
import * as React from 'react';
import styled from "styled-components";
import {Button} from "./Button";
import {TaskType} from "../db/initialTasks";
import {EditableSpan} from "./editableSpan/EditableSpan";

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
		? (<EmptyMessage>Задачи отсутствуют!</EmptyMessage>)
		: (
			<StyledTasks>
				{
					tasks?.map(task => {
						const onRemoveClicked = () => removeTask(task.id)

						const changeTitle = (title: string) => {
							changeTaskTitle(task.id, title)
						}
							return (
								<li key={task.id}>
									<StyledInput type="checkbox" checked={task.isDone} onChange={(e)=>onChangeHandler(task.id, e.target.checked)}/>
									<StyledSpan isDone={task.isDone} value={task.title} onChange={changeTitle}/>
									<TasksButton name={'x'} onClick={onRemoveClicked}></TasksButton>
								</li>
							)
						}
					)}
			</StyledTasks>
		)

}

const StyledTasks = styled.ul`
  padding-left: 5px;
  flex-grow: 1;
  width: 100%;
  gap: 5px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 15px;
      border-bottom: 1px solid black;
    }

    span {
      flex-grow: 1;
      max-width: 80%;
      word-wrap: break-word;
    }
  }



`
const EmptyMessage = styled.p`
  flex-grow: 1;
  margin: 0 auto;
`

const TasksButton = styled(Button)`
  padding: 2px 5px;
`

// Определяем интерфейс для пропсов
type StyledSpanProps = {
	isDone: boolean;
}

// Определяем стилизованный компонент с типизацией пропсов
const StyledSpan = styled(EditableSpan)<StyledSpanProps>`
  opacity: ${props => (props.isDone ? '0.5' : '1')};
`;

const StyledInput = styled.input`
  &:hover {
    cursor: pointer;
  }	
`