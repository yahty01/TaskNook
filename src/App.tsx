import React from 'react';
import {Todolist} from "./Todolist";
import {tasks1, tasks2} from "./db/TasksArray";


function App() {


    return (
        <div className="App">
            <Todolist title='How to learn' tasks={tasks1} />
            <Todolist title='My household chores' tasks={tasks2} />
        </div>
    );
}

export default App;
