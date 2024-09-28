// @flow
import * as React from 'react';
import IconButton from "@mui/material/IconButton";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {useDispatch, useSelector} from "react-redux";
import {changeThemeAC, ThemeModeT} from "../../../app/model/app-reducer";
import {RootState} from "../../../app/store";
import {getTheme} from "../../theme/getTheme";


export const ButtonSwitchTheme = () => {
	const dispatch = useDispatch()
	const themeMode = useSelector<RootState, ThemeModeT>(state => state.app.themeMode)
	const theme = getTheme(themeMode);

	const toggleColorMode = () => {
		dispatch(changeThemeAC(themeMode));
	}


	return (
				<IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
					{theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
				</IconButton>
	);
};