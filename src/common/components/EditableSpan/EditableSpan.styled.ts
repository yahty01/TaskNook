import styled from "styled-components";
import TextField from "@mui/material/TextField";

export const StyledInput = styled(TextField)`
  &:hover {
    cursor: pointer;
  }
	flex-grow: 1;
`
export const StyledSpan = styled.span`
  &:hover {
    cursor: pointer;
  }
  flex-grow: 1;
	max-width: 75%;
	word-break: break-word;
	
`