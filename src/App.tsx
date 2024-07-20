import React from 'react';
import styled from "styled-components";
import {useTasks} from "./hooks/useTasks";
import {useTodoLists} from "./hooks/useTodoLists";
import Todolist from "./TodoList";

function App() {
	const {removeTask, addTask, changeStatus, allTodoTasks} = useTasks();
	const {todoLists, changeTodoFilter} = useTodoLists();

	return (
		<StyledApp className="App">
			{
				todoLists.map(el => {
						let tasksForFilter = allTodoTasks[el.id]

						if (el.filter === 'active') {
							tasksForFilter = tasksForFilter.filter(task => !task.isDone)
						}
						if (el.filter === 'completed') {
							tasksForFilter = tasksForFilter.filter(task => task.isDone)
						}

						return <Todolist key={el.id}
						                 todolistId={el.id}
						                 title={el.title}
						                 tasksList={tasksForFilter}
						                 removeTask={removeTask}
						                 changeFilter={changeTodoFilter}
						                 addTask={addTask}
						                 changeStatus={changeStatus}
						                 filter={el.filter}
						/>
					}
				)

			}
		</StyledApp>
	)

}

export default App;

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`