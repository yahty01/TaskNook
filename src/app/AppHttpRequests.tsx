import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm'
import {EditableSpan} from '../common/components/EditableSpan/EditableSpan'
import axios from "axios";

export type Todolist = {
	"id": string,
	"title": string,
	"addedDate": string,
	"order": number
}

export type Response = {
	resultCode: number
	messages: string[],
	data: {
		item: Todolist
	}
}

export const AppHttpRequests = () => {
	const [todolists, setTodolists] = useState<any>([])
	const [tasks, setTasks] = useState<any>({})

	//Запрос на сервер что-бы получить массив тудулистов
	useEffect(() => {
		axios.get<Todolist[]>(
			'https://social-network.samuraijs.com/api/1.1/todo-lists',
			{
				headers: {
					Authorization: `Bearer af842d5b-0440-49f0-99e8-50bd1cc0b394`,
				}
			}).then(res => {
			console.log(res.data)
		})
	}, [])

	//Запрос на создание тудулиста
	const createTodolistHandler = (title: string) => {
		axios.post<Response>(
			'https://social-network.samuraijs.com/api/1.1/todo-lists',
			{title},
			{
				headers: {
					Authorization: `Bearer af842d5b-0440-49f0-99e8-50bd1cc0b394`,
				}
			}).then(res => {
			console.log(res.data)
		})
	}

	const removeTodolistHandler = (id: string) => {
		// remove todolist
	}

	const updateTodolistHandler = (id: string, title: string) => {
		// update todolist title
	}

	const createTaskHandler = (title: string, todolistId: string) => {
		// create task
	}

	const removeTaskHandler = (taskId: string, todolistId: string) => {
		// remove task
	}

	const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: any) => {
		// update task status
	}

	const changeTaskTitleHandler = (title: string, task: any) => {
		// update task title
	}

	return (
		<div style={{margin: '20px'}}>
			<AddItemForm addItem={createTodolistHandler}/>

			{/* Todolists */}
			{todolists.map((tl: any) => {
				return (
					<div key={tl.id} style={todolist}>
						<div>
							<EditableSpan
								value={tl.title}
								onChange={(title: string) => updateTodolistHandler(tl.id, title)}
							/>
							<button onClick={() => removeTodolistHandler(tl.id)}>x</button>
						</div>
						<AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>

						{/* Tasks */}
						{!!tasks[tl.id] &&
							tasks[tl.id].map((task: any) => {
								return (
									<div key={task.id}>
										<Checkbox
											checked={task.isDone}
											onChange={e => changeTaskStatusHandler(e, task)}
										/>
										<EditableSpan
											value={task.title}
											onChange={title => changeTaskTitleHandler(title, task)}
										/>
										<button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
									</div>
								)
							})}
					</div>
				)
			})}
		</div>
	)
}

// Styles
const todolist: React.CSSProperties = {
	border: '1px solid black',
	margin: '20px 0',
	padding: '10px',
	width: '300px',
	display: 'flex',
	justifyContent: 'space-between',
	flexDirection: 'column',
}