// import { RequestStatus } from "common/types/enums"
// import { AppInitialState, appReducer, changeTheme } from "app/model/appSlice"
//
// test("themeMode", () => {
//   // 1. Стартовый state
//   const startState: AppInitialState = {
//     themeMode: "light",
//     status: RequestStatus.idle,
//     error: null,
//   }
//
//   // Вместо хуков используем значение напрямую
//   const themeMode = startState.themeMode
//
//   // 2. Действие
//   const endState = appReducer(startState, changeTheme({ themeMode: "dark" }))
//
//   // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
//   expect(endState.themeMode).toBe("dark")
// })
