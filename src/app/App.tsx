import React from "react"
import { ThemeProvider as ThemeProviderMUI } from "@mui/material/styles"
import { ThemeProvider as ThemeProviderStyled } from "styled-components"
import { getTheme } from "common/lib/theme/getTheme"
import { AppStyled } from "./App.styled"
import { Header } from "common/components"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectError, selectThemeMode } from "./model/appSelectors"
import ErrorSnackbar from "common/components/ErrorSnackbar/ErrorSnackbar"
import { useAppDispatch } from "common/hooks"
import { Routing } from "common/routing"
import Container from "@mui/material/Container"

export function App() {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const error = useAppSelector(selectError)
  const theme = getTheme(themeMode)

  return (
    <ThemeProviderMUI theme={theme}>
      <ThemeProviderStyled theme={theme}>
        <AppStyled className="App">
          <Header />
          <Container maxWidth="xl" style={{ marginTop: "5rem" }}>
            <Routing />
          </Container>
          <ErrorSnackbar dispatch={dispatch} error={error} />
        </AppStyled>
      </ThemeProviderStyled>
    </ThemeProviderMUI>
  )
}
