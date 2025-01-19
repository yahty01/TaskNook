// src/store/__tests__/auth-reducer.test.ts

import { authReducer, setIsInitialized, setIsLoggedIn } from "../authSlice"

type authState = {
  isLoggedIn: boolean
  isInitialized: boolean
}

describe("authReducer tests", () => {
  let startState: authState = {
    isLoggedIn: false,
    isInitialized: false,
  }

  beforeEach(() => {
    startState = { isLoggedIn: false, isInitialized: false }
  })

  // Тест: изменение статуса isLoggedIn на true
  it("должен корректно изменить статус isLoggedIn на true", () => {
    // Arrange
    const action = setIsLoggedIn({ isLoggedIn: true })

    // Act
    const endState = authReducer(startState, action)

    // Assert
    expect(endState.isLoggedIn).toBe(true)
  })

  // Тест: изменение статуса isInitialized на true
  it("должен корректно изменить статус isInitialized на true", () => {
    // Arrange
    const action = setIsInitialized({ isInitialized: true })

    // Act
    const endState = authReducer(startState, action)

    // Assert
    expect(endState.isInitialized).toBe(true)
  })

  // Тест: отсутствие изменений при неизвестном экшене
  it("не должен изменять состояние, если экшен не распознан", () => {
    // Arrange
    const action = { type: "UNKNOWN_ACTION" } as any

    // Act
    const endState = authReducer(startState, action)

    // Assert
    expect(endState).toEqual(startState)
  })

  // Дополнительный тест: возвращение начального состояния при неопределенном состоянии
  it("должен возвращать начальное состояние, если state неопределен", () => {
    // Arrange
    const action = { type: undefined } as any

    // Act
    const endState = authReducer(undefined, action)

    // Assert
    expect(endState).toEqual({ isLoggedIn: false, isInitialized: false })
  })

  // Дополнительный тест: изменение isLoggedIn на false
  it("должен корректно изменить статус isLoggedIn на false", () => {
    // Arrange
    startState.isLoggedIn = true
    const action = setIsLoggedIn({ isLoggedIn: false })

    // Act
    const endState = authReducer(startState, action)

    // Assert
    expect(endState.isLoggedIn).toBe(false)
  })

  // Дополнительный тест: изменение isInitialized на false
  it("должен корректно изменить статус isInitialized на false", () => {
    // Arrange
    startState.isInitialized = true
    const action = setIsInitialized({ isInitialized: false })

    // Act
    const endState = authReducer(startState, action)

    // Assert
    expect(endState.isInitialized).toBe(false)
  })
})
