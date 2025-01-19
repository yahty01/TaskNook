import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Button from "@mui/material/Button"
import { ButtonSwitchTheme } from "common/components"
import React from "react"
import { StyledAppBar } from "./Header.styled"
import LinearProgress from "@mui/material/LinearProgress"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectStatus } from "app/model/appSelectors"
import { selectIsLoggedIn } from "../../../features/auth/model/authSelectors"
import { logoutTC } from "../../../features/auth/model/authSlice"

export const Header = () => {
  const dispatch = useAppDispatch()

  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const logout = () => {
    dispatch(logoutTC())
  }

  return (
    <StyledAppBar position={"static"}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          {isLoggedIn && <Button onClick={logout}>Logout</Button>}
          <Button color="inherit">Faq</Button>
          <ButtonSwitchTheme />
        </div>
      </Toolbar>
      {status === "loading" && <LinearProgress sx={{ height: 3 }} color="inherit" />}
    </StyledAppBar>
  )
}
