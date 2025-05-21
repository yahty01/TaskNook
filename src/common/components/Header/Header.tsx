import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Button from "@mui/material/Button"
import { ButtonSwitchTheme } from "common/components"
import React from "react"
import { StyledAppBar } from "./Header.styled"
import LinearProgress from "@mui/material/LinearProgress"
import { useAppSelector } from "common/hooks"
import { selectIsLoggedIn, selectStatus, setIsLoggedIn } from "app/model/appSlice"
import { useLogoutMutation } from "../../../features/auth/api/authApi"
import { ResultCode } from "common/types/enums"
import { useDispatch } from "react-redux"
import { AUTH_TOKEN } from "common/constants"
import { baseApi } from "app/baseApi"

export const Header = () => {
  const [logout] = useLogoutMutation()
  const dispatch = useDispatch()

  const logoutHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
          localStorage.removeItem(AUTH_TOKEN)
          // dispatch(baseApi.util.resetApiState())
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(["Todolist", "Task"]))
      })
  }

  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <StyledAppBar position={"static"}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          {isLoggedIn && <Button onClick={logoutHandler}>Logout</Button>}
          <Button color="inherit">Faq</Button>
          <ButtonSwitchTheme />
        </div>
      </Toolbar>
      {status === "loading" && <LinearProgress sx={{ height: 3 }} color="inherit" />}
    </StyledAppBar>
  )
}
