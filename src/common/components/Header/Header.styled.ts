import styled from "styled-components"
import AppBar from "@mui/material/AppBar"

export const StyledAppBar = styled(AppBar)`
  width: 100%;

  button {
    color: ${({ theme }) => theme.palette.text.secondary};
    font-weight: 600;
    font-size: 15px;
  }

  button:hover {
    background-color: ${({ theme }) => theme.palette.action.hover};
  }
`
