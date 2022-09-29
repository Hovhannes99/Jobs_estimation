import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import Paper from '@mui/material/Paper'
import React from 'react'
import {TableContainer} from '@mui/material'
import TemplatesTableRow from './tableRow'
import TemplatesTableHead from './tableHead'
import {ITableContainerTemplatesProps} from '../../../shared/types/table/tableTamplates/tableTemplates'

const TableContainerTemplates = ({
  order,
  orderBy,
  handleRequestSort,
  stableSort,
  rows,
  getComparator,
}: ITableContainerTemplatesProps) => (
  <Paper>
    <TableContainer>
      <Table aria-labelledby="tableTitle">
        <TemplatesTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
        <TableBody>
          {rows &&
            stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`
              return <TemplatesTableRow key={index} labelId={labelId} row={row} />
            })}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
)

export default TableContainerTemplates
