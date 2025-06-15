import IconButton from "@mui/material/IconButton"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import { changeTheme, selectThemeMode } from "app/model/appSlice"
import { getTheme } from "common/lib/theme"
import { useAppDispatch, useAppSelector } from "common/hooks"

export const ButtonSwitchTheme = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  const toggleColorMode = () => {
    debugger
    dispatch(changeTheme({ themeMode }))
  }

  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
      {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}
