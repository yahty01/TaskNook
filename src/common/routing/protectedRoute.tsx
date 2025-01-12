import React from "react"
import { Outlet, useNavigate } from "react-router"

type Props = {
  isAuthenticated: boolean
  path: string
}

const ProtectedRoute = ({ isAuthenticated, path }: Props) => {
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate(path, { replace: true })
    }
  }, [isAuthenticated, navigate])

  return isAuthenticated ? (
    <>
      <Outlet />
    </>
  ) : null
}

export default ProtectedRoute
