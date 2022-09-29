import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import React from 'react'
import {TableContainer} from '@mui/material'
import FeedbacksTableHead from './tableHead'
import FeedbacksTableRow from './tableRow'
import {ITableContainerFeedbacksProps} from '../../../shared/types/table/tableFeedbacks/tableFeedbacks'
import {useStylesTable} from '../../../assets/makeStyles/table/table'

const TableContainerFeedbacks = ({
  order,
  orderBy,
  handleRequestSort,
  stableSort,
  rows,
  getComparator,
}: ITableContainerFeedbacksProps) => {
  const classesTable = useStylesTable()

  return (
    <TableContainer className={`${classesTable.tableContainer}`}>
      <Table aria-labelledby="tableTitle">
        <FeedbacksTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
        <TableBody>
          {rows &&
            stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`
              return <FeedbacksTableRow key={index} labelId={labelId} row={row} />
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableContainerFeedbacks
