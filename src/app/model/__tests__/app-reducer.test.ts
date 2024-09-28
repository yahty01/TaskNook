import {appReducer, AppStateType, changeThemeAC} from "../app-reducer";
import {useAppSelector} from "../../../common/hooks/useAppSelector";

test('themeMode', () => {
	// 1. Стартовый state
	const startState: AppStateType = {
		themeMode: 'light'
	}

	const themeMode = useAppSelector(state => state.app.themeMode)

	// 2. Действие
	const endState = appReducer(startState, changeThemeAC(themeMode))
	// 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
	expect(endState.themeMode).toBe('dark')
})
