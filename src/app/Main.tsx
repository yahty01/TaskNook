import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import {useDispatch} from "react-redux";
import {addTodolistAC} from "../features/todolists/model/todolists-reducer";
import {Todolists} from "../features/todolists/ui/Todolists/Todolists";


export function Main () {
	const dispatch = useDispatch()

	const addTodoList = (title: string) => dispatch(addTodolistAC((title)))

	return (
		<Container maxWidth="xl" style={{marginTop:"5rem"}}>
			<Grid container>
				<AddItemForm addItem={addTodoList}/>
			</Grid>
			<Grid container spacing={4}>
				<Todolists/>
			</Grid>
		</Container>
	)
}