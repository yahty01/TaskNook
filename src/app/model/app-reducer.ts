export type ThemeModeT = 'dark' | 'light'

export type changeThemeActionType = ReturnType<typeof changeThemeAC>


export type AppStateType =
	typeof initialState

type ActionsType =
	changeThemeActionType

export const changeThemeAC = (theme: ThemeModeT) => {
	return {type: 'CHANGE_THEME', payload:{theme}} as const
}


const initialState = {
	themeMode: 'light' as ThemeModeT,
}

export const appReducer = (
	state: AppStateType = initialState,
	action: ActionsType
): AppStateType => {
	switch (action.type) {
		case 'CHANGE_THEME': {
			return {
				...state,
				themeMode: action.payload.theme === 'dark' ? 'light' : 'dark'
			};
		}
		default:
			return state
	}
}

