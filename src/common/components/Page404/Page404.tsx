import { Path } from "common/routing"
import Button from "@mui/material/Button"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import { SubTitle, Title } from "common/components/Page404/Page404.styled"

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
