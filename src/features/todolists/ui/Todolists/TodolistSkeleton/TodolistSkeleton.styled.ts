import Paper from "@mui/material/Paper"
import styled from "styled-components"

export const StyledPaper = styled(Paper)`
  width: 305px;
  padding: 10px 20px;
`

export const CommonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const TitleWrapper = styled(CommonWrapper)`
  gap: 15px;
  align-items: center;
`

export const CreateItemFormWrapper = styled(CommonWrapper)`
  align-items: center;
`

export const TasksWrapper = styled(CommonWrapper)`
  gap: 15px;
`
