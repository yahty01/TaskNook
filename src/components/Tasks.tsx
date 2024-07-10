// @flow
import * as React from 'react';
import styled from "styled-components";
import {Button} from "./Button";
import {TasksProps} from "../db/initialTasks";

type TaskProps = {
	tasks: TasksProps[];
	removeTask: (id: string) => void
}

export function Tasks({tasks, removeTask}: TaskProps) {
	return tasks.length === 0
		? (<EmptyMessage>Задачи отсутствуют!</EmptyMessage>)
		: (
			<StyledTasks>
				{
					tasks.map(task => {
							const onRemoveClicked = () => {
								removeTask(task.id)
							}
							return (
								<li key={task.id}>
									<input type="checkbox" checked={task.isDone}/>
									<span>{task.title}</span>
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