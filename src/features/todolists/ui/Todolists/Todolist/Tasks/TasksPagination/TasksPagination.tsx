import Pagination from "@mui/material/Pagination"
import Typography from "@mui/material/Typography"
import { ChangeEvent } from "react"
import { PAGE_SIZE } from "common/constants"
import styled from "styled-components"

type Props = {
  totalCount: number
  page: number
  setPage: (page: number) => void
}

export const TasksPagination = ({ totalCount, page, setPage }: Props) => {
  const changePage = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  return (
    <>
      <StyledPagination
        count={Math.ceil(totalCount / PAGE_SIZE)}
        page={page}
        onChange={changePage}
        shape="rounded"
        color="primary"
      />
      <StyledTotalCount>
        <Typography variant="caption">Total: {totalCount}</Typography>
      </StyledTotalCount>
    </>
  )
}

const StyledPagination = styled(Pagination)`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
`

const StyledTotalCount = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 16px;
`
