import React, {createContext, useMemo, useState} from 'react';
import Todolist, {filterValue} from "../features/todolist/TodoList";
import {AddItemForm} from "../common/components/addItemForm/AddItemForm";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Unstable_Grid2'
import {ButtonSwitchTheme} from "../common/components/buttonSwitchTheme/ButtonSwitchTheme";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC, TodoListType
} from "../features/reducer/todolists-reducer";

export const ColorModeContext = createContext({
	toggleColorMode: () => {
	}
});

const lightThemePalette = {
	primary: {
		main: '#1976d2',
	},
	secondary: {
		main: '#dc004e',
	},
	background: {
		default: '#f5f5f5',
		paper: '#ffffff',
	},
	text: {
		primary: '#000000',
		secondary: '#666666',
	},
};

const darkThemePalette = {
	primary: {
		main: '#90caf9',
	},
	secondary: {
		main: '#f48fb1',
	},
	background: {
		default: '#043432',
		paper: '#105930',
	},
	text: {
		primary: '#ffffff',
		secondary: '#bbbbbb',
	},
};

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

	const [mode, setMode] = useState<'light' | 'dark'>('light');

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[],
	);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
					...(mode === 'light' ? lightThemePalette : darkThemePalette),
				},
			}),
		[mode],
	);


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
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<div className="App">

					<Container fixed sx={{backgroundColor: theme.palette.background.default, minHeight: '100vh'}} maxWidth={'xl'}
					           disableGutters>
						<AppBar position="static">
							<Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
								<IconButton color="inherit">
									<MenuIcon/>
								</IconButton>
								<div>
									<Button color="inherit">Login</Button>
									<Button color="inherit">Logout</Button>
									<Button color="inherit">Faq</Button>
									<ButtonSwitchTheme/>
								</div>
							</Toolbar>
						</AppBar>
						<Container>
							<Grid container>
								<AddItemForm addItem={addTodo} theme={theme}/>
							</Grid>
							<Grid container spacing={4}>
								{TodoLists}
							</Grid>
						</Container>
					</Container>

				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}

export default App;