import React from 'react';
import {Todolist} from "./Todolist";
import {tasks1, tasks2, tasks3} from "./db/TasksArray";


function App() {
    return (
        <div className="App">
            <Todolist title='How to learn' taskList={tasks1} />
            <Todolist title='My household chores' taskList={tasks2} />
            <Todolist title='Свободное время' taskList={tasks3} />
        </div>
    );
}

export default App;
