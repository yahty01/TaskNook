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
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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

	const MaterialUISwitch = styled(Switch)(({ theme }) => ({
		width: 62,
		height: 34,
		padding: 7,
		'& .MuiSwitch-switchBase': {
			margin: 1,
			padding: 0,
			transform: 'translateX(6px)',
			'&.Mui-checked': {
				color: '#fff',
				transform: 'translateX(22px)',
				'& .MuiSwitch-thumb:before': {
					backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
						'#fff',
					)}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
				},
				'& + .MuiSwitch-track': {
					opacity: 1,
					backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
				},
			},
		},
		'& .MuiSwitch-thumb': {
			backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
			width: 32,
			height: 32,
			'&::before': {
				content: "''",
				position: 'absolute',
				width: '100%',
				height: '100%',
				left: 0,
				top: 0,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
					'#fff',
				)}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
			},
		},
		'& .MuiSwitch-track': {
			opacity: 1,
			backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
			borderRadius: 20 / 2,
		},
	}));

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
								<FormControlLabel
									control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
									label="MUI switch"
									onChange={colorMode.toggleColorMode}
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