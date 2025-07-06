import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import { containerSx } from "common/styles"
import styled from "styled-components"

export function TodolistSkeleton() {
  return (
    <StyledPaper>
      <TitleWrapper>
        <Skeleton width={150} height={50} />
        <Skeleton width={20} height={40} />
      </TitleWrapper>
      <CreateItemFormWrapper>
        <Skeleton width={230} height={60} />
        <Skeleton width={20} height={40} />
      </CreateItemFormWrapper>
      {Array(4)
        .fill(null)
        .map((_, id) => (
          <Box key={id} sx={containerSx}>
            <TasksWrapper>
              <Skeleton width={20} height={40} />
              <Skeleton width={150} height={40} />
            </TasksWrapper>
            <Skeleton width={20} height={40} />
          </Box>
        ))}
      <Box sx={containerSx}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <Skeleton key={id} width={80} height={60} />
          ))}
      </Box>
    </StyledPaper>
  )
}

const StyledPaper = styled(Paper)`
  width: 305px;
  padding: 10px 20px;
`

const CommonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const TitleWrapper = styled(CommonWrapper)`
  gap: 15px;
  align-items: center;
`

const CreateItemFormWrapper = styled(CommonWrapper)`
  align-items: center;
`

const TasksWrapper = styled(CommonWrapper)`
  gap: 15px;
`
