import { TaskEl} from "./TaskEl"
import {TaskPropsType} from "./db/TasksArray";

type TodoListPropsType = {
    title: string
    tasks: TaskPropsType[]
    //tasks:Array<Task>
}


export const Todolist = ({title, tasks}: TodoListPropsType) => {
  const mappedTasks=  !tasks.length
        ? <div>Empty</div>
        : tasks.map((el, index) => {
            // debugger
            return (
                <TaskEl fura={el}/>
              )
        })

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}



