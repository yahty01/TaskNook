import React, { useEffect } from "react"
import { ThemeProvider as ThemeProviderMUI } from "@mui/material/styles"
import styled, { ThemeProvider as ThemeProviderStyled } from "styled-components"
import { getTheme } from "common/lib/theme/getTheme"
import { AppStyled } from "./App.styled"
import { Header } from "common/components"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectError, selectThemeMode } from "./model/appSelectors"
import ErrorSnackbar from "common/components/ErrorSnackbar/ErrorSnackbar"
import { useAppDispatch } from "common/hooks"
import { Routing } from "common/routing"
import Container from "@mui/material/Container"
import { initializeAppTC } from "../features/auth/model/authSlice"
import { selectIsInitialized } from "../features/auth/model/authSelectors"
import CircularProgress from "@mui/material/CircularProgress"
import { GlobalStyle } from "../styles/GlobalStyled"

//todo: Полсе логаута, нужно убить данные о тудулистах в стейте
export function App() {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const error = useAppSelector(selectError)
  const isInitialized = useAppSelector(selectIsInitialized)
  const theme = getTheme(themeMode)

  useEffect(() => {
    // useEffect срабатывает после рендера компоненты, тоесть всех ее дочерних элементов, но регестрируеться раньше
    // useEffect в дочерних компанентах сработает раньше, ТОЛЬКО
    dispatch(initializeAppTC())
  }, [])

  //todo: спозицианировать по центру и добавить 1 секунды минимальной задержи перед показом контента!
  if (!isInitialized) {
    return (
      <StyledContainer>
        <CircularProgress size={150} thickness={3} />
      </StyledContainer>
    )
  }

  return (
    <ThemeProviderMUI theme={theme}>
      <ThemeProviderStyled theme={theme}>
        <AppStyled className="s.App">
          <Header />
          <Container maxWidth="xl" style={{ marginTop: "5rem" }}>
            <Routing />
          </Container>
          <ErrorSnackbar dispatch={dispatch} error={error} />
          <GlobalStyle theme={theme} />
        </AppStyled>
      </ThemeProviderStyled>
    </ThemeProviderMUI>
  )
}

//todo: Вынести и исправить стили крутилка не стилизованна
const StyledContainer = styled.div`
  position: fixed;
  top: 30%;
  text-align: center;
  width: 100%;
`
