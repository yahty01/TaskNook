export type ThemeMode = 'dark' | 'light'

export type AppStateType = {
	themeMode: ThemeMode
}

type ChangeThemeAT = {
	type: 'CHANGE_THEME'
}

type ActionsType = ChangeThemeAT

export const changeThemeAC = () => {
	return {type: 'CHANGE_THEME'} as const
}


const initialState = {
	themeMode: 'light' as ThemeMode,
}

export const appReducer = (
	state: AppStateType = initialState,
	action: ActionsType
): AppStateType => {
	switch (action.type) {
		case 'CHANGE_THEME': {
			return {
				...state,
				themeMode: state.themeMode === 'dark' ? 'light' : 'dark' // проверяем текущее состояние и переключаем
			};
		}
		default:
			return state
	}
}

