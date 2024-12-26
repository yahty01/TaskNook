import { authReducer, AuthState, setIsInitializedAC, setIsLoggedInAC } from "../auth-reducer"

describe("authReducer tests", () => {
  it("должен корректно изменить статус isLoggedIn на true", () => {
    const startState: AuthState = { isLoggedIn: false, isInitialized: false }
    const action = setIsLoggedInAC(true)

    const endState = authReducer(startState, action)

    expect(endState.isLoggedIn).toBe(true)
  })

  it("должен корректно изменить статус isInitialized на true", () => {
    const startState: AuthState = { isLoggedIn: false, isInitialized: false }
    const action = setIsInitializedAC(true)

    const endState = authReducer(startState, action)

    expect(endState.isInitialized).toBe(true)
  })

  it("не должен изменять состояние, если экшен не распознан", () => {
    const startState: AuthState = { isLoggedIn: false, isInitialized: false }
    const action = { type: "UNKNOWN_ACTION" }

    const endState = authReducer(startState, action as any)

    expect(endState).toEqual(startState)
  })
})
