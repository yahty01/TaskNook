// @flow
import * as React from "react"
import IconButton from "@mui/material/IconButton"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import { changeThemeAC } from "app/model/app-reducer"
import { getTheme } from "common/lib/theme"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectThemeMode } from "app/model/appSelectors"

export const ButtonSwitchTheme = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  const toggleColorMode = () => {
    dispatch(changeThemeAC(themeMode))
  }

  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
      {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}
