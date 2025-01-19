import IconButton from "@mui/material/IconButton"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import { changeTheme } from "app/model/appSlice"
import { getTheme } from "common/lib/theme"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectThemeMode } from "app/model/appSelectors"

export const ButtonSwitchTheme = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  const toggleColorMode = () => {
    dispatch(changeTheme({ themeMode }))
  }

  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
      {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}
