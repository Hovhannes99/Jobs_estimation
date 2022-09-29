import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
// import Paper from '@mui/material/Paper'
import React from 'react'
import {TableContainer} from '@mui/material'
import SavedSubmissionsTableHead from './tableHead'
import SavedSubmissionsTableRow from './tableRow'
import {ITableContainerSavedSubmissionsProps} from '../../../shared/types/table/tableSavedSubmissions/tableSavedSubmissions'
import {useStylesTable} from '../../../assets/makeStyles/table/table'

const TableContainerSavedSubmissions = ({
  order,
  orderBy,
  handleRequestSort,
  stableSort,
  rows,
  getComparator,
}: ITableContainerSavedSubmissionsProps) => {
  const classesTable = useStylesTable()

  return (
    // <Paper>
    <TableContainer className={`${classesTable.tableContainer}`}>
      <Table aria-labelledby="tableTitle">
        <SavedSubmissionsTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          // numSelected={selected.length}
          // onSelectAllClick={handleSelectAllClick}
          rowCount={rows ? rows.length : 0}
        />
        {rows && (
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`
              // const isItemSelected = isSelected(Number(row.id))
              return (
                <SavedSubmissionsTableRow
                  // handleClick={handleClick}
                  // isItemSelected={isItemSelected}
                  row={row}
                  key={index}
                  labelId={labelId}
                />
              )
            })}
          </TableBody>
        )}
      </Table>
    </TableContainer>
    // </Paper>
  )
}
export default TableContainerSavedSubmissions
