import { appReducer, AppStateType, changeThemeAC } from "../app-reducer"

test("themeMode", () => {
  // 1. Стартовый state
  const startState: AppStateType = {
    themeMode: "light",
  }

  // Вместо хуков используем значение напрямую
  const themeMode = startState.themeMode

  // 2. Действие
  const endState = appReducer(startState, changeThemeAC(themeMode))

  // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
  expect(endState.themeMode).toBe("dark")
})
