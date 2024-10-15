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

export type Task = {
	description: string
	title: string
	status: number
	priority: number
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}

export type Tasks = {
	[todolistId: string]: Task[] | []
}

export type getTaskResponse = {
	items: Task[]
	totalCount: number
	error: string | null
}

export type Response<T> = {
	resultCode: number
	messages: string[],
	fieldsErrors: string[],
	data: T
}

export type UpdateTaskModel = {
	description: string
	title: string
	status: number
	priority: number
	startDate: string
	deadline: string
}

export const AppHttpRequests = () => {
	const [todolists, setTodolists] = useState<Todolist[]>([])
	const [tasks, setTasks] = useState<Tasks>({})

	//Запрос на сервер что-бы получить массив тудулистов
	useEffect(() => {
		axios.get<Todolist[]>(
			'https://social-network.samuraijs.com/api/1.1/todo-lists',
			{
				headers: {
					Authorization: `Bearer af842d5b-0440-49f0-99e8-50bd1cc0b394`,
				}
			}).then(res => {
				const data = res.data
			setTodolists(data)
			data.forEach(tl => {
				axios.get<getTaskResponse>(
					`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`,
					{
						headers: {
							Authorization: `Bearer af842d5b-0440-49f0-99e8-50bd1cc0b394`,
						}
					}).then(res => {
						//{...tasks, tasks: res.data.items} попробовать без спред копирования !\
					// Ответ на вопрос, почему нельзя засетать просто res.data.items
					// Потому что сам ассоциативный массив храниться на бэке а именно вся его часть. И в нашем запросе мы
					// получаем объект с тасками для конкретного массива и сетаем его в наш локальный массив который
					// имеет туже структуру что  и на бэке
					// Потому если мы засетаем в tasks - res.data.items, то мы перезатрем остальные таски и в массиве будут
					// таски только для одного массива, а именно последнего из нашего списка тудулистов, потому что
					// мы проходимся по нему фор-ичем и последний запрос
					// за тасками
					// последнего тудулиста единтсвенный и останется
					setTasks(prevState => ({...prevState, [tl.id]: res.data.items}))      // Потому что асинхронно!!!! Важно понимать
				})
			})

		})
	}, [])

	//Запрос на создание тудулиста
	const createTodolistHandler = (title: string) => {
		axios.post<Response<{ item: Todolist }>>(
			'https://social-network.samuraijs.com/api/1.1/todo-lists',
			{title},
			{
				headers: {
					Authorization: `Bearer af842d5b-0440-49f0-99e8-50bd1cc0b394`,
					'API-KEY': '05ddea04-3151-4b31-a955-21fef99aa5ff'
				}
			}).then(res => {
			const newTodolist = res.data.data.item
			setTodolists([newTodolist, ...todolists])
		})
	}
	const removeTodolistHandler = (id: string) => {
		axios.delete<Response<{}>>(
			`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
			{
				headers: {
					Authorization: `Bearer af842d5b-0440-49f0-99e8-50bd1cc0b394`,
					'API-KEY': '05ddea04-3151-4b31-a955-21fef99aa5ff'
				}
			}).then((res) => {
			setTodolists(todolists.filter((item: Todolist) => item.id !== id))
		})
	}
	const updateTodolistHandler = (id: string, title: string) => {
		axios.put<Response<{}>>(
			`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
			{title},
			{
				headers: {
					Authorization: `Bearer af842d5b-0440-49f0-99e8-50bd1cc0b394`,
					'API-KEY': '05ddea04-3151-4b31-a955-21fef99aa5ff'
				}
			}).then(() => {
			setTodolists(todolists.map((item: Todolist) => item.id === id ? {...item, title} : item))
		})
	}
	const createTaskHandler = (title: string, todolistId: string) => {
		axios.post<Response<{ item: Task }>>(
			`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
			{title},
			{
				headers: {
					Authorization: `Bearer af842d5b-0440-49f0-99e8-50bd1cc0b394`,
					'API-KEY': '05ddea04-3151-4b31-a955-21fef99aa5ff'
				}
			}).then(res => {
			const newTask = res.data.data.item
			setTasks({...tasks, [todolistId]: [newTask, ...(tasks[todolistId]) || []]}) //так как или возвращает первую истину
		})
	}

	const removeTaskHandler = (taskId: string, todolistId: string) => {
		axios.delete<Response<{}>>(
			`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
			{
				headers: {
					Authorization: `Bearer af842d5b-0440-49f0-99e8-50bd1cc0b394`,
					'API-KEY': '05ddea04-3151-4b31-a955-21fef99aa5ff'
				}
			}).then((res) => {
			setTasks({...tasks, [todolistId]: tasks[todolistId].filter(item=>item.id !== taskId)})
		})
	}

	const changeTaskRequest = (model: UpdateTaskModel, todolistId: string, task: Task) => {
		axios.put<Response<{ item: Task }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`,
			model, { headers: {
					Authorization: `Bearer af842d5b-0440-49f0-99e8-50bd1cc0b394`,
					'API-KEY': '05ddea04-3151-4b31-a955-21fef99aa5ff'
				}
			}).then((res) => {
			const newTask = res.data.data.item
			setTasks({...tasks, [todolistId]: tasks[todolistId].map(item=> item.id === task.id ? newTask : item)}) //так как или возвращает первую истину
		})
	}
	const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: Task, todolistId: string) => {
		const model: UpdateTaskModel = {
			title: task.title,
			description: task.description,
			status: e.currentTarget.checked ? 2 : 0,
			priority: task.priority,
			startDate:  task.startDate,
			deadline: task.deadline,
		}

		changeTaskRequest(model, todolistId, task)
	}

	const changeTaskTitleHandler = (title: string, task: Task, todolistId: string) => {
		const model: UpdateTaskModel = {
			title: title,
			description: task.description,
			status: task.status,
			priority: task.priority,
			startDate:  task.startDate,
			deadline: task.deadline,
		}

		changeTaskRequest(model, todolistId, task)
	}

	return (
		<div style={{margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
			<AddItemForm addItem={createTodolistHandler}/>

			{/* Todolists */}
			{todolists.map((tl: Todolist) => {
				return (
					<div key={tl.id} style={todolist}>
						<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
							<EditableSpan
								value={tl.title}
								onChange={(title: string) => updateTodolistHandler(tl.id, title)}
							/>
							<button onClick={() => removeTodolistHandler(tl.id)}>x</button>
						</div>
						<AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>

						{/* Tasks */}
						{!!tasks[tl.id] &&
							tasks[tl.id].map((task: Task) => {
								return (
									<div key={task.id}>
										<Checkbox
											checked={task.status === 2}
											onChange={e => changeTaskStatusHandler(e, task, tl.id)}
										/>
										<EditableSpan
											value={task.title}
											onChange={title => changeTaskTitleHandler(title, task, tl.id)}
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