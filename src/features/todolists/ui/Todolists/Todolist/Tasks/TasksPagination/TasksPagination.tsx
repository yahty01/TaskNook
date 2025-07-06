import Typography from "@mui/material/Typography"
import { ChangeEvent } from "react"
import { PAGE_SIZE } from "common/constants"
import { StyledPagination, StyledTotalCount } from "./TasksPagination.styled"

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
