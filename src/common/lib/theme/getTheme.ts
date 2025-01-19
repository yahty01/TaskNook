import { createTheme } from "@mui/material/styles"
import { ThemeModeT } from "app/model/appSlice"

export const lightThemePalette = {
  primary: {
    // main: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)", // Градиент голубого
    main: "#251f54",
    contrastText: "#ffffff", // Белый текст на кнопках
  },
  secondary: {
    main: "#00a3b0", // Яркий розовый
    contrastText: "#ffffff", // Белый текст
  },
  background: {
    default: "#f9f9f9", // Очень светлый серый
    paper: "#ffffff", // Белый для карточек
  },
  text: {
    primary: "#2c2c2c", // Темно-серый для текста
    secondary: "#757575", // Мягкий серый для вспомогательного текста
  },
  action: {
    hover: "rgba(79, 172, 254, 0.1)", // Эффект подсветки при наведении
    selected: "rgba(255, 126, 179, 0.15)", // Эффект выбора
    disabled: "rgba(0, 0, 0, 0.26)", // Отключенные элементы
    disabledBackground: "rgba(0, 0, 0, 0.12)", // Фон для отключенных элементов
    focus: "rgba(0, 0, 0, 0.12)", // Эффект при фокусе
  },
}

export const darkThemePalette = {
  primary: {
    // main: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)", // Градиент фиолетового и синего
    main: "#2575fc", // Градиент фиолетового и синего
    contrastText: "#ffffff", // Белый текст на кнопках
  },
  secondary: {
    main: "#01aab9", // Мягкий персиково-розовый
    contrastText: "#000000", // Черный текст
  },
  background: {
    default: "#121212", // Глубокий темный
    paper: "#1f1f1f", // Чуть светлее для карточек
  },
  text: {
    primary: "#e0e0e0", // Светло-серый для основного текста
    secondary: "#a0a0a0", // Мягкий серый
  },
  action: {
    hover: "rgba(106, 17, 203, 0.1)", // Эффект подсветки при наведении
    selected: "rgba(255, 154, 158, 0.15)", // Эффект выбора
    disabled: "rgba(0, 0, 0, 0.26)", // Отключенные элементы
    disabledBackground: "rgba(0, 0, 0, 0.12)", // Фон для отключенных элементов
    focus: "rgba(0, 0, 0, 0.12)", // Эффект при фокусе
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
