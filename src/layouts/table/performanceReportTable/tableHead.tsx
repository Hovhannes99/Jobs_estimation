import React from 'react'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Box from '@mui/material/Box'
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {IEnhancedPerformanceReportTableRows} from '../../../shared/types/table/table'
import {useStylesTable} from '../../../assets/makeStyles/table/table'
import {
  ITablePerformanceReportCell,
  ITablePerformanceReportHeadProps,
} from '../../../shared/types/table/tablePerformanceReport/tablePerformanceReport'
import BottomArrow from '../../../assets/images/Icons/bottomArrow'
// import {UseCertificateContext} from '../../../context/certificateContext/certificateContext'
// import {ICertificateProps} from '../../../context/certificateContext/certificateContext.props'

const PerformanceReportTableHead = (props: ITablePerformanceReportHeadProps) => {
  const classesTable = useStylesTable()

  const {order, orderBy, onRequestSort} = props
  const createSortHandler =
    (property: keyof IEnhancedPerformanceReportTableRows) =>
    (event: React.MouseEvent<HTMLDivElement>) => {
      onRequestSort(event, property)
    }

  // const {noScore} = UseCertificateContext() as unknown as ICertificateProps

  const headCellsPerformanceReport: readonly ITablePerformanceReportCell[] = [
    {
      id: 'eventTitle',
      numeric: true,
      disablePadding: false,
      label: 'Event',
      sortDropIconShow: true,
      show: true,
    },
    {
      id: 'evaluateeName',
      numeric: true,
      disablePadding: false,
      label: 'Last name, First name',
      sortDropIconShow: true,
      show: true,
    },
    {
      id: 'dueDate',
      numeric: true,
      disablePadding: false,
      label: 'Hire Date',
      sortDropIconShow: true,
      show: true,
    },
    {
      id: 'evaluateePosition',
      numeric: true,
      disablePadding: false,
      label: 'Job Title',
      sortDropIconShow: true,
      show: true,
    },
    {
      id: 'monthlySalary',
      numeric: true,
      disablePadding: false,
      label: 'Salary',
      sortDropIconShow: true,
      show: true,
    },
    {
      id: 'sumPoint',
      numeric: true,
      disablePadding: false,
      label: 'Rating',
      sortDropIconShow: true,
      // show: !noScore,
      show: true,
    },
    {
      id: 'bonusPercentage',
      numeric: true,
      disablePadding: false,
      label: 'Bonus: %',
      sortDropIconShow: true,
      show: true,
    },
    {
      id: 'sumPoint',
      numeric: true,
      disablePadding: false,
      label: 'Bonus: Amount',
      sortDropIconShow: true,
      show: true,
    },
    {
      id: 'evaluatorPosition',
      numeric: true,
      disablePadding: false,
      label: 'Certificate',
      sortDropIconShow: false,
      show: true,
    },
  ]

  return (
    <TableHead className="table-head">
      <TableRow>
        {headCellsPerformanceReport.map(
          (headCell) =>
            headCell.show && (
              <TableCell
                // className={`${
                //   headCellsPerformanceReport.length !== index + 1 &&
                //   classesTable.tableSavedSubmissionBorderRight
                // } tablePerformanceReportHead`}
                className={`${classesTable.tableHead}`}
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <Box
                  onClick={createSortHandler(headCell.id)}
                  className="table-arrow-drop-container"
                >
                  <Box className="text-left ml-6">{headCell.label}</Box>
                  {headCell.sortDropIconShow && (
                    <Box
                      component="span"
                      className="ml-14"
                      // className="table-arrow-drop"
                    >
                      {/*<ArrowDropUpIcon />*/}
                      {/*<ArrowDropDownIcon />*/}
                      <BottomArrow />
                    </Box>
                  )}
                </Box>
              </TableCell>
            ),
        )}
      </TableRow>
    </TableHead>
  )
}

export default PerformanceReportTableHead
