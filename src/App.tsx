import React from 'react';
import {Todolist} from "./TodoList";
import styled from "styled-components";
import {useTasks} from "./hooks/useTasks"; // Обрати внимание на путь к файлу

function App() {
  const {tasks, removeTask} = useTasks();

  return (
    <StyledApp className="App">
      <Todolist title='How to learn' taskList={tasks} removeTask={removeTask}/>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`