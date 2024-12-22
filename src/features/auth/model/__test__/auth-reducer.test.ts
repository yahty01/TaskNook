import { authReducer, AuthState, setIsLoggedInAC } from "../auth-reducer"

test("correct change isLoggedIn status on true", () => {
  const startState: AuthState = {
    isLoggedIn: false,
  }
  const action = setIsLoggedInAC(true)

  const endState = authReducer(startState, action)

  expect(endState.isLoggedIn).toBe(true)
})
