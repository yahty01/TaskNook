import React from "react"
import { Route, Routes } from "react-router"
import { Login } from "../../features/auth/ui/Login/Login"
import { Main } from "app/Main"
import { Page404 } from "common/components/Page404/Page404"
import ProtectedRoute from "common/routing/protectedRoute"
import { useAppSelector } from "common/hooks"
import { selectIsLoggedIn } from "../../features/auth/model/authSelectors"

export const Path = {
  Main: "/",
  Login: "login",
  NotFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      {/* Открытые маршруты */}
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.NotFound} element={<Page404 />} />

      {/* Защищенные маршруты */}
      <Route element={<ProtectedRoute isAuthenticated={isLoggedIn} path={Path.Login} />}>
        <Route path={Path.Main} element={<Main />} />
      </Route>
    </Routes>
  )
}

// <Router>
//   <Routes>
//     {/* Открытые маршруты */}
//     <Route path="/login" element={<LoginPage />} />
//
//     {/* Защищенные маршруты */}
//     <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/profile" element={<Profile />} />
//     </Route>
//   </Routes>
// </Router>
