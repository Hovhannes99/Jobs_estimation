import {Box, Pagination} from '@mui/material'
import TablePagination from '@mui/material/TablePagination'
import PaginationItem from '@mui/material/PaginationItem'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import React, {Dispatch, useState} from 'react'
import MakeStyles from '../../assets/makeStyles/makeStyles'

const PaginationContainer = ({
  limitData,
  page,
  setPage,
  countPagination,
  pageSize,
  setPageSize,
}: {
  limitData: number | undefined
  page: number
  setPage: Dispatch<React.SetStateAction<number>>
  countPagination: number
  pageSize: number
  setPageSize: Dispatch<React.SetStateAction<number>>
}) => {
  const classes = MakeStyles()

  const [fromPagination, setFromPagination] = useState<number>(0)
  const [toPagination, setToPagination] = useState<number>(0)

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value)
    setPage(1)
  }

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleDisplayedRows = ({from, to}: {from: number; to: number}) => {
    setFromPagination(from)
    setToPagination(to)
    return false
  }

  return (
    <Box className="pagination-wrapper">
      <Box className="font-size-15 line-height-18">
        <Box className="font-weight-700" component="span">
          {fromPagination} - {toPagination}
        </Box>{' '}
        of
        <Box className="font-weight-700" component="span">
          {' '}
          {limitData}
        </Box>{' '}
        results
      </Box>
      <Box className="pagination-wrapper__table">
        <TablePagination
          nextIconButtonProps={{className: classes.displayNone}}
          backIconButtonProps={{className: classes.displayNone}}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          labelDisplayedRows={handleDisplayedRows}
          count={limitData || 0}
          rowsPerPage={pageSize}
          page={page - 1}
          labelRowsPerPage="Results per page"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Pagination
          count={countPagination}
          page={page}
          onChange={handleChangePagination}
          variant="outlined"
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              components={{previous: ArrowBackIcon, next: ArrowForwardIcon}}
              {...item}
            />
          )}
        />
      </Box>
    </Box>
  )
}

export default PaginationContainer
