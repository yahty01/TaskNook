import React from "react"
import { ThemeProvider as ThemeProviderMUI } from "@mui/material/styles"
import { ThemeProvider as ThemeProviderStyled } from "styled-components"
import { getTheme } from "common/theme/getTheme"
import { AppStyled } from "./App.styled"
import { Header } from "common/components"
import { Main } from "./Main"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectThemeMode } from "./model/appSelectors"

export function App() {
  //theme
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <ThemeProviderMUI theme={theme}>
      <ThemeProviderStyled theme={theme}>
        <AppStyled className="App">
          <Header />
          <Main />
        </AppStyled>
      </ThemeProviderStyled>
    </ThemeProviderMUI>
  )
}
