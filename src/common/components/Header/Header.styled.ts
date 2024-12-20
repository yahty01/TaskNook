import styled from "styled-components"
import AppBar from "@mui/material/AppBar"
import { Link } from "react-router"

export const StyledAppBar = styled(AppBar)`
  max-height: 200px;
  width: 100%;
`

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: 500;
  font-size: 15px;
`
