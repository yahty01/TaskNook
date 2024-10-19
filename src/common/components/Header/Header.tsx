import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Button from "@mui/material/Button"
import { ButtonSwitchTheme } from "common/components"
import React from "react"
import { StyledAppBar } from "./Header.styled"

export const Header = () => {
  return (
    <StyledAppBar>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Logout</Button>
            <Button color="inherit">Faq</Button>
            <ButtonSwitchTheme />
          </div>
        </Toolbar>
      </AppBar>
    </StyledAppBar>
  )
}
