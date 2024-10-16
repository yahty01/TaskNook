import axios from "axios";
import {Todolist} from "./todolistsApi.types";
import {Response} from "../../../app/AppHttpRequests";

//Модульный паттерн создания объектов

export const todolistsApi = {
	getTodolists() {
		return axios.get<Todolist[]>(
			'https://social-network.samuraijs.com/api/1.1/todo-lists',
			{
				headers: {
					Authorization: `Bearer af842d5b-0440-49f0-99e8-50bd1cc0b394`,
				}
			})
	},

	createTodolist(title: string) {
		return axios.post<Response<{ item: Todolist }>>(
			'https://social-network.samuraijs.com/api/1.1/todo-lists',
			{title},
			{
				headers: {
					Authorization: `Bearer af842d5b-0440-49f0-99e8-50bd1cc0b394`,
					'API-KEY': '05ddea04-3151-4b31-a955-21fef99aa5ff'
				}
			})
	},

	removeTodolist(id: string) {
		return axios.delete<Response<{}>>(
			`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
			{
				headers: {
					Authorization: `Bearer af842d5b-0440-49f0-99e8-50bd1cc0b394`,
					'API-KEY': '05ddea04-3151-4b31-a955-21fef99aa5ff'
				}
			})
	},

	updateTodolist(payload: {id: string, title: string}) { //При таком упаковывание принимаемых аргументов, мы не ошибемся
		//в порядке их передачи
		const { id, title } = payload

		return axios.put<Response<{}>>(
			`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
			{title},
			{
				headers: {
					Authorization: `Bearer af842d5b-0440-49f0-99e8-50bd1cc0b394`,
					'API-KEY': '05ddea04-3151-4b31-a955-21fef99aa5ff'
				}
			})
	}
}