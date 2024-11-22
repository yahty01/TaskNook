import { createTheme } from "@mui/material/styles"
import { ThemeModeT } from "app/model/app-reducer"

export const lightThemePalette = {
  primary: {
    main: "#10a3af",
  },
  secondary: {
    main: "#dc004e",
  },
  background: {
    default: "#d2d8d4",
    paper: "#ffffff",
  },
  text: {
    primary: "#000000",
    secondary: "#666666",
  },
}

export const darkThemePalette = {
  primary: {
    main: "#90caf9",
  },
  secondary: {
    main: "#f48fb1",
  },
  background: {
    default: "#043432",
    paper: "#105930",
  },
  text: {
    primary: "#ffffff",
    secondary: "#bbbbbb",
  },
}

export const getTheme = (mode: ThemeModeT) => {
  return createTheme({
    palette: {
      mode,
      ...(mode === "light" ? lightThemePalette : darkThemePalette),
    },
  })
}
