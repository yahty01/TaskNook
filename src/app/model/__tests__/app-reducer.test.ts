import {
	appReducer, changeThemeAC,
	AppStateType, ThemeModeT
} from "../app-reducer";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

test('themeMode', () => {
	// 1. Стартовый state
	const startState: AppStateType = {
		themeMode: 'light'
	}

	const themeMode = useSelector<RootState, ThemeModeT>(state => state.app.themeMode)

	// 2. Действие
	const endState = appReducer(startState, changeThemeAC(themeMode))
	// 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
	expect(endState.themeMode).toBe('dark')
})
