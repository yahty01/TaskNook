import React from 'react';
import {Todolist} from "./TodoList";
import styled from "styled-components";
import {useTasks} from "./hooks/useTasks"; // Обрати внимание на путь к файлу

function App() {
  const {tasksForFilter, removeTask, changeFilter, addTask} = useTasks();

  return (
    <StyledApp className="App">
      <Todolist title='How to learn' taskList={tasksForFilter} removeTask={removeTask} changeFilter={changeFilter} addTask={addTask}/>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`