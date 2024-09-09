import {
	appReducer, changeThemeAC,
	AppStateType
} from "./app-reducer";

test('themeMode', () => {
	// 1. Стартовый state
	const startState: AppStateType = {
		themeMode: 'light'
	}
	// 2. Действие
	const endState = appReducer(startState, changeThemeAC())
	// 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
	expect(endState.themeMode).toBe('dark')
})
