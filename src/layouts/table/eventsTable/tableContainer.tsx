import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import React from 'react'
import {Box, TableContainer} from '@mui/material'
import EventsTableHead from './tableHead'
import EventsTableRow from './tableRow'
import {ITableContainerEventsProps} from '../../../shared/types/table/tableEvents/tableEvents'
import {useStylesTable} from '../../../assets/makeStyles/table/table'

const TableContainerEvents = ({
  order,
  orderBy,
  handleRequestSort,
  stableSort,
  rows,
  getComparator,
}: ITableContainerEventsProps) => {
  const classesTable = useStylesTable()

  return (
    <TableContainer className={`${classesTable.tableContainer}`}>
      <Table aria-labelledby="tableTitle">
        <EventsTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
        <TableBody>
          {rows &&
            stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`
              return <EventsTableRow key={index} labelId={labelId} row={row} />
            })}
        </TableBody>
      </Table>
      {rows && !rows.length && (
        <Box className="text-center">
          <Box className="mb-22 mt-22">there is not data</Box>
        </Box>
      )}
    </TableContainer>
  )
}

export default TableContainerEvents
