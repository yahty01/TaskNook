import React, { useEffect } from "react"
import { Tasks } from "./Tasks/Tasks"
import { AddItemForm, EditableSpan } from "common/components"
import Grid from "@mui/material/Unstable_Grid2"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { createTaskTC, fetchTasksTC } from "../../../model/tasks-reducer"
import { DomainTodolist, removeTodolistTC, updateTodolistTitleTC } from "../../../model/todolists-reducer"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { StyledPaper } from "./Todolist.styled"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectTasks } from "../../../model/tasksSelectors"

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

  const removeTodoList = () => {
    dispatch(removeTodolistTC(todolist.id))
  }

  const updateTodoListTitle = (title: string) => {
    dispatch(updateTodolistTitleTC({ id: todolist.id, title }))
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
        <IconButton aria-label="delete" onClick={removeTodoList}>
          <DeleteIcon />
        </IconButton>
        <EditableSpan value={todolist.title} onChange={updateTodoListTitle} />
        <AddItemForm addItem={addTask} />
        <Tasks tasks={tasksForFilter} todolistId={todolist.id} taskLoaded={todolist.tasksLoaded} />
        <FilterTasksButtons id={todolist.id} filter={todolist.filter} />
      </StyledPaper>
    </Grid>
  )
}
