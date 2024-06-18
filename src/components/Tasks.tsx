// @flow
import * as React from 'react';
// import {TasksProps} from "../db/TasksArray";

export const Tasks = (props: any) => {
	const {title, id, isDone} = props.tasks
	debugger
		return (
		<ul>
			<li key={id}>
				<input type="checkbox" checked={isDone}/>
				<span>{title}</span>
			</li>
		</ul>
	)
};
