import React from 'react'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Box from '@mui/material/Box'
// import Checkbox from '@mui/material/Checkbox'
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {useStylesTable} from '../../../assets/makeStyles/table/table'
// import MakeStyles from '../../../assets/makeStyles/makeStyles'
import {
  ITableSavedSubmissionsCell,
  ITableSavedSubmissionsData,
  ITableSavedSubmissionsHeadProps,
} from '../../../shared/types/table/tableSavedSubmissions/tableSavedSubmissions'
import BottomArrow from '../../../assets/images/Icons/bottomArrow'

const SavedSubmissionsTableHead = (props: ITableSavedSubmissionsHeadProps) => {
  // const classes = MakeStyles()
  const classesTable = useStylesTable()

  const {order, orderBy, onRequestSort} = props

  const createSortHandler =
    (property: keyof ITableSavedSubmissionsData, sort: boolean) =>
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (sort) {
        onRequestSort(event, property)
      }
    }

  const headCellsSavedSubmissions: readonly ITableSavedSubmissionsCell[] = [
    {
      id: 'eventTitle',
      numeric: true,
      disablePadding: false,
      label: 'Event',
      sortDropIconShow: true,
      show: true,
    },
    {
      id: 'eventEvaluators',
      numeric: true,
      disablePadding: false,
      label: 'Evaluator',
      sortDropIconShow: false,
      show: true,
    },
    {
      id: 'evaluationCriteriaScore',
      numeric: true,
      disablePadding: false,
      label: 'Evaluation Criteria Score',
      sortDropIconShow: false,
      show: true,
    },
    {
      id: 'eventEvaluatees',
      numeric: true,
      disablePadding: false,
      label: 'Evaluatee',
      sortDropIconShow: false,
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
      id: 'bonusPercentage',
      numeric: true,
      disablePadding: false,
      label: 'Bonus Percentage',
      sortDropIconShow: true,
      show: true,
    },
    {
      id: 'feedback',
      numeric: true,
      disablePadding: false,
      label: 'Feedback',
      sortDropIconShow: false,
      show: true,
    },
  ]

  return (
    <TableHead className="table-head">
      <TableRow
      // className={` ${classesTable.tableSavedSubmissionsHead}`}
      >
        {headCellsSavedSubmissions.map(
          (
            headCell,
            // index
          ) =>
            headCell.show && (
              <TableCell
                // className={`${classesTable.tableHeadPaddingLeftRight16} ${
                //   headCellsSavedSubmissions.length !== index + 1 &&
                //   classesTable.tableSavedSubmissionBorderRight
                // } tableSavedSubmissionsHead`}
                className={`${classesTable.tableHead}`}
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <Box className="d-flex">
                  {/*{index === 0 && (*/}
                  {/*  <Checkbox*/}
                  {/*    color="default"*/}
                  {/*    className={`${classes.colorGray}`}*/}
                  {/*    checked={rowCount > 0 && numSelected === rowCount}*/}
                  {/*    onChange={onSelectAllClick}*/}
                  {/*  />*/}
                  {/*)}*/}
                  <Box
                    onClick={createSortHandler(headCell.id, headCell.sortDropIconShow)}
                    className="table-arrow-drop-container ml-16"
                  >
                    <Box className="text-left pr-10">{headCell.label}</Box>
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
                </Box>
              </TableCell>
            ),
        )}
      </TableRow>
    </TableHead>
  )
}

export default SavedSubmissionsTableHead
