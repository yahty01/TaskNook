import React, { useEffect } from "react"
import { Tasks } from "./Tasks/Tasks"
import { AddItemForm } from "common/components"
import { createTaskTC, fetchTasksTC } from "../../../model/tasks-reducer"
import { DomainTodolist } from "../../../model/todolists-reducer"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { StyledPaper } from "./Todolist.styled"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectTasks } from "../../../model/tasksSelectors"
import Grid from "@mui/material/Grid2"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"

export type FilterValue = "all" | "completed" | "active"

type TodoListProps = {
  todolist: DomainTodolist
}

export function Todolist({ todolist }: TodoListProps) {
  const dispatch = useAppDispatch()
  const allTasks = useAppSelector(selectTasks)

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id))
  }, [])

  const tasks = allTasks[todolist.id]

  const addTask = (title: string) => {
    dispatch(createTaskTC({ title, todolistId: todolist.id }))
  }

  let tasksForFilter = tasks

  if (todolist.filter === "active") {
    tasksForFilter = tasksForFilter.filter((task) => !task.status)
  }

  if (todolist.filter === "completed") {
    tasksForFilter = tasksForFilter.filter((task) => task.status)
  }

  return (
    <Grid>
      <StyledPaper elevation={5} square={false} sx={{ padding: "1rem" }}>
        <TodolistTitle todolist={todolist} />
        <AddItemForm addItem={addTask} disabled={todolist.entityStatus === "loading"} />
        <Tasks tasks={tasksForFilter} todolistId={todolist.id} taskLoaded={todolist.tasksLoaded} />
        <FilterTasksButtons id={todolist.id} filter={todolist.filter} />
      </StyledPaper>
    </Grid>
  )
}
