import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import React from 'react'
import {TableContainer} from '@mui/material'
import UsersTableHead from './tableHead'
import UsersTableRow from './tableRow'
import {ITableContainerUsersProps} from '../../../shared/types/table/tableUsers/tableUsers'
import {useStylesTable} from '../../../assets/makeStyles/table/table'

const TableContainerUsers = ({
  order,
  orderBy,
  handleRequestSort,
  stableSort,
  rows,
  getComparator,
}: ITableContainerUsersProps) => {
  const classesTable = useStylesTable()

  return (
    <TableContainer className={`${classesTable.tableContainer}`}>
      <Table aria-labelledby="tableTitle">
        <UsersTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
        <TableBody>
          {rows &&
            rows.length &&
            stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`
              return <UsersTableRow key={index} labelId={labelId} row={row} />
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableContainerUsers
