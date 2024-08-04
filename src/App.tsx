import React, {createContext, useMemo, useState} from 'react';
import {useTasks} from "./hooks/useTasks";
import {useTodoLists} from "./hooks/useTodoLists";
import Todolist from "./TodoList";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Unstable_Grid2'

import {ButtonSwitchTheme} from "./components/buttonSwitchTheme/ButtonSwitchTheme";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

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

	const {removeTask, addTask, changeStatus, allTodoTasks, addEmptyTaskList, changeTitle} = useTasks();

	const {todoLists, changeTodoFilter, addTodo, removeTodo, updateTodoList} = useTodoLists(addEmptyTaskList);

	const TodoLists = todoLists.map(el => {
			let tasksForFilter = allTodoTasks[el.id]

			if (el.filter === 'active') {
				tasksForFilter = tasksForFilter.filter(task => !task.isDone)
			}

			if (el.filter === 'completed') {
				tasksForFilter = tasksForFilter.filter(task => task.isDone)
			}

			return <Todolist key={el.id}
			                 todolistId={el.id}
			                 title={el.title}
			                 tasksList={tasksForFilter}
			                 removeTask={removeTask}
			                 changeFilter={changeTodoFilter}
			                 addTask={addTask}
			                 changeStatus={changeStatus}
			                 filter={el.filter}
			                 removeTodo={removeTodo}
			                 updateTask={changeTitle}
			                 updateTodoList={updateTodoList}
			                 theme={theme}
			/>
		}
	)


	return (
		<ColorModeContext.Provider value={colorMode}>
		<ThemeProvider theme={theme}>
			<div className="App">

				<Container fixed sx={{backgroundColor: theme.palette.background.default, minHeight: '100vh'}} maxWidth={'xl'} disableGutters>
					<AppBar position="static">
						<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
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