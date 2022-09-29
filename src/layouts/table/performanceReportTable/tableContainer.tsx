import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import React from 'react'
import {TableContainer} from '@mui/material'
import {ITableContainerPerformanceReportProps} from '../../../shared/types/table/tablePerformanceReport/tablePerformanceReport'
import PerformanceReportTableHead from './tableHead'
import PerformanceReportTableRow from './tableRow'
import {IEnhancedPerformanceReportTableRows} from '../../../shared/types/table/table'
import {useStylesTable} from '../../../assets/makeStyles/table/table'

const TableContainerPerformanceReport = ({
  order,
  orderBy,
  handleRequestSort,
  stableSort,
  rows,
  getComparator,
}: ITableContainerPerformanceReportProps) => {
  const classesTable = useStylesTable()

  return (
    <TableContainer className={`${classesTable.tableContainer}`}>
      <Table aria-labelledby="tableTitle">
        <PerformanceReportTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {rows &&
            stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`

              return (
                <PerformanceReportTableRow
                  row={row as unknown as IEnhancedPerformanceReportTableRows}
                  key={index}
                  labelId={labelId}
                />
              )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableContainerPerformanceReport
