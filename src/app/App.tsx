import React from 'react';
import Todolist, {filterValue} from "../features/todolist/TodoList";
import {AddItemForm} from "../common/components/addItemForm/AddItemForm";
import {ThemeProvider} from '@mui/material/styles'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	TodoListType
} from "../features/reducer/todolists-reducer";
import {ThemeModeT} from "./app-reducer";
import {getTheme} from "../common/theme/getTheme";
import {StyledApp} from "./StyledApp";
import {Header} from "./Header";


function App() {
	const todoLists = useSelector<RootState, TodoListType[]>(state => state.todolists)
	const dispatch = useDispatch()

	const changeTodoFilter = (filter: filterValue, todolistId: string) =>
		dispatch(changeTodolistFilterAC({todolistId, filter}))

	const updateTodoList = (title: string, todolistId: string) =>
		dispatch(changeTodolistTitleAC({todolistId, title}))

	const addTodo = (title: string) => {
		const action = addTodolistAC((title))
		dispatch(action)
	}

	const removeTodo = (todolistId: string) => {
		const action = removeTodolistAC(todolistId)
		dispatch(action)
	}
	//theme
	const mode = useSelector<RootState, ThemeModeT>(state => state.app.themeMode);
	const theme = getTheme(mode)

	const TodoLists = todoLists.map(el => {
			return <Todolist key={el.todolistId}
			                 todolistId={el.todolistId}
			                 title={el.title}
			                 changeFilter={changeTodoFilter}
			                 filter={el.filter}
			                 removeTodo={removeTodo}
			                 updateTodoList={updateTodoList}
			                 theme={theme}
			/>
		}
	)

	return (
			<ThemeProvider theme={theme}>
				<StyledApp className="App" theme={theme}>

						<Header/>
						<Container maxWidth="xl" style={{marginTop:"5rem"}}>
							<Grid container>
								<AddItemForm addItem={addTodo} theme={theme}/>
							</Grid>
							<Grid container spacing={4}>
								{TodoLists}
							</Grid>
						</Container>

				</StyledApp>
			</ThemeProvider>
	)
}

export default App;