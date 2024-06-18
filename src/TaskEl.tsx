import {TaskPropsType} from "./db/TasksArray";


type Props = {
    fura:TaskPropsType
};
export const TaskEl = ({fura}: Props) => {
    return (
        <li key={fura.id}>
            <input type="checkbox" checked={fura.isDone}/>
            <span>{fura.title}</span>
        </li>
    );  
};