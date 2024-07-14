import React from 'react';
import styled from "styled-components";
import {useTasks} from "./hooks/useTasks";
import Todolist from "./TodoList"; // Обрати внимание на путь к файлу

function App() {
  const {tasksForFilter, removeTask, changeFilter, addTask, changeStatus, filter} = useTasks();

  return (
    <StyledApp className="App">
      <Todolist
        title='How to learn'
        taskList={tasksForFilter}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter}
      />
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