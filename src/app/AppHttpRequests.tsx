import Checkbox from "@mui/material/Checkbox"
import React, { ChangeEvent, useEffect, useState } from "react"
import { AddItemForm, EditableSpan } from "common/components"
import { Todolist } from "../features/todolists/api/todolistsApi.types"
import { Task, Tasks, UpdateTaskModel } from "../features/todolists/api/tasksApi.types"
import { todolistsApi } from "../features/todolists/api/todolistsApi"
import { TaskStatus } from "../features/todolists/lib/enums"
import { tasksApi } from "../features/todolists/api/tasksApi"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<Tasks>({})

  //Запрос на сервер что-б ы получить массив тудулистов
  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const data = res.data
      setTodolists(data)
      data.forEach((tl) => {
        tasksApi.getTasks(tl.id).then((res) => {
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
          setTasks((prevState) => ({ ...prevState, [tl.id]: res.data.items })) // Потому что асинхронно!!!! Важно понимать
        })
      })
    })
  }, [])

  const createTodolistHandler = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      const newTodolist = res.data.data.item
      setTodolists([newTodolist, ...todolists])
    })
  }
  const removeTodolistHandler = (id: string) => {
    todolistsApi.removeTodolist(id).then((res) => {
      setTodolists(todolists.filter((item: Todolist) => item.id !== id))
    })
  }
  const updateTodolistHandler = (id: string, title: string) => {
    todolistsApi.updateTodolist({ title, id }).then(() => {
      setTodolists(todolists.map((item: Todolist) => (item.id === id ? { ...item, title } : item)))
    })
  }
  const createTaskHandler = (title: string, todolistId: string) => {
    tasksApi.createTask({ title, todolistId }).then((res) => {
      const newTask = res.data.data.item
      setTasks({
        ...tasks,
        [todolistId]: [newTask, ...(tasks[todolistId] || [])],
      }) //так как или возвращает первую истину
    })
  }

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    tasksApi.deleteTask({ taskId, todolistId }).then((res) => {
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].filter((item) => item.id !== taskId),
      })
    })
  }

  const changeTaskRequest = (model: UpdateTaskModel, todolistId: string, task: Task) => {
    tasksApi.updateTask({ model, taskId: task.id, todolistId }).then((res) => {
      const newTask = res.data.data.item
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].map((item) => (item.id === task.id ? newTask : item)),
      }) //так как или возвращает первую истину
    })
  }
  const changeTaskStatusHandler = (
    e: ChangeEvent<HTMLInputElement>,
    task: Task,
    todolistId: string,
  ) => {
    const status = e.currentTarget.checked ? TaskStatus.Complete : TaskStatus.New

    const model: UpdateTaskModel = {
      status,
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }

    changeTaskRequest(model, todolistId, task)
  }

  const changeTaskTitleHandler = (title: string, task: Task, todolistId: string) => {
    const model: UpdateTaskModel = {
      title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }

    changeTaskRequest(model, todolistId, task)
  }

  return (
    <div
      style={{
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl: Todolist) => {
        return (
          <div key={tl.id} style={todolist}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <EditableSpan
                value={tl.title}
                onChange={(title: string) => updateTodolistHandler(tl.id, title)}
              />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task: Task) => {
                return (
                  <div key={task.id}>
                    <Checkbox
                      checked={task.status === 2}
                      onChange={(e) => changeTaskStatusHandler(e, task, tl.id)}
                    />
                    <EditableSpan
                      value={task.title}
                      onChange={(title) => changeTaskTitleHandler(title, task, tl.id)}
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
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
