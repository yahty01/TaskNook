import styled from "styled-components"
import { Path } from "common/routing"
import Button from "@mui/material/Button"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"

export const Page404 = () => {
  return (
    <>
      <Title>404</Title>
      <SubTitle>page not found</SubTitle>
      <Button href={Path.Main} variant="outlined" startIcon={<KeyboardReturnIcon />}>
        На главную страницу
      </Button>
    </>
  )
}

const Title = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 250px;
`

const SubTitle = styled.h2`
  text-align: center;
  font-size: 50px;
  margin: 0;
  text-transform: uppercase;
`
