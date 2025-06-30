import React, { useEffect, useState } from "react"
import { ThemeProvider as ThemeProviderMUI } from "@mui/material/styles"
import styled, { ThemeProvider as ThemeProviderStyled } from "styled-components"
import { getTheme } from "common/lib/theme/getTheme"
import { AppStyled } from "./App.styled"
import { Header } from "common/components"
import { useAppSelector } from "common/hooks/useAppSelector"
import ErrorSnackbar from "common/components/ErrorSnackbar/ErrorSnackbar"
import { useAppDispatch } from "common/hooks"
import { Routing } from "common/routing"
import Container from "@mui/material/Container"
import CircularProgress from "@mui/material/CircularProgress"
import { GlobalStyle } from "../styles/GlobalStyled"
import { useMeQuery } from "../features/auth/api/authApi"
import { ResultCode } from "common/types/enums"
import { selectError, selectThemeMode, setIsLoggedIn } from "app/model/appSlice"

//todo: Полсе логаута, нужно убить данные о тудулистах в стейте
export function App() {
  const [isInitialized, setIsInitialized] = useState(false)
  const { data, isLoading } = useMeQuery()

  const dispatch = useAppDispatch()

  const themeMode = useAppSelector(selectThemeMode)
  const error = useAppSelector(selectError)

  const theme = getTheme(themeMode)

  useEffect(() => {
    if (isLoading) return
    setIsInitialized(true)
    if (data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    }
  }, [isLoading])

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
