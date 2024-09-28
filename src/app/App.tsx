import React from 'react';
import {ThemeProvider as ThemeProviderMUI} from '@mui/material/styles'
import { ThemeProvider as ThemeProviderStyled} from 'styled-components';
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {ThemeModeT} from "./app-reducer";
import {getTheme} from "../common/theme/getTheme";
import {StyledApp} from "./StyledApp";
import {Header} from "../common/components/Header/Header";
import {Main} from "./Main";


export function App() {
	//theme
	const themeMode = useSelector<RootState, ThemeModeT>(state => state.app.themeMode);
	const theme = getTheme(themeMode)


	return (
			<ThemeProviderMUI theme={theme}>
				<ThemeProviderStyled theme={theme}>
					<StyledApp className="App">
						<Header/>
						<Main/>
					</StyledApp>
				</ThemeProviderStyled>
			</ThemeProviderMUI>
	)
}

