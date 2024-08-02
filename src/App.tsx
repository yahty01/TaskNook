import React, {useMemo, useState} from 'react';
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
import CssBaseline from '@mui/material/CssBaseline'
import {amber, deepOrange, grey} from "@mui/material/colors";
import {PaletteMode} from "@mui/material";
import CustomizedSwitch from "./components/switchThemeMode/CustomizedSwitch";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
				// palette values for light mode
				primary: amber,
				divider: amber[200],
				text: {
					primary: grey[900],
					secondary: grey[800],
				},
			}
			: {
				// palette values for dark mode
				primary: deepOrange,
				divider: deepOrange[700],
				background: {
					default: deepOrange[900],
					paper: deepOrange[900],
				},
				text: {
					primary: '#fff',
					secondary: grey[500],
				},
			}),
	},
});

function App() {

	const [mode, setMode] = useState<PaletteMode>('light');

	const colorMode = useMemo(
		() => ({
			// The dark mode switch would invoke this method
			toggleColorMode: () => {
				setMode((prevMode: PaletteMode) =>
					prevMode === 'light' ? 'dark' : 'light',
				);
			},
		}),
		[],
	);


	// Update the theme only if the mode changes
	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

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
			<CssBaseline />
			<div className="App">
				<Container fixed sx={{backgroundColor: theme.palette.secondary.light, minHeight: '100vh'}} maxWidth={'xl'} disableGutters>
					<AppBar position="static">
						<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<IconButton color="inherit">
								<MenuIcon/>
							</IconButton>
							<div>
								<Button color="inherit">Login</Button>
								<Button color="inherit">Logout</Button>
								<Button color="inherit">Faq</Button>
								{/*{theme.palette.mode} mode*/}
								<CustomizedSwitch
									onChange={colorMode.toggleColorMode}
									theme={theme}
								/>
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