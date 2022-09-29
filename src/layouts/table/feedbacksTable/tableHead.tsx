import React from 'react'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Box from '@mui/material/Box'
import {
  ITableFeedbacksCell,
  IFeedbacksTableHeadProps,
} from '../../../shared/types/table/tableFeedbacks/tableFeedbacks'
import {useStylesTable} from '../../../assets/makeStyles/table/table'
import {ITableFeedbacks} from '../../../shared/types/table/table'
import BottomArrow from '../../../assets/images/Icons/bottomArrow'

const headCells: readonly ITableFeedbacksCell[] = [
  {
    id: 'event',
    numeric: true,
    disablePadding: false,
    label: 'event Title',
    sortDropIconShow: false,
  },
  {
    id: 'evaluatee',
    numeric: true,
    disablePadding: false,
    label: 'Evaluatee Name',
    sortDropIconShow: false,
  },
  {
    id: 'evaluator',
    numeric: true,
    disablePadding: false,
    label: 'Evaluator Name',
    sortDropIconShow: false,
  },
  {
    id: 'feedbackText',
    numeric: true,
    disablePadding: false,
    label: 'feedbackText',
    sortDropIconShow: true,
  },
]

const FeedbacksTableHead = (props: IFeedbacksTableHeadProps) => {
  const classesTable = useStylesTable()
  const {order, orderBy, onRequestSort} = props
  const createSortHandler =
    (property: keyof ITableFeedbacks) => (event: React.MouseEvent<HTMLDivElement>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead className="table-head">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            // className={`${headCells.length - 1 > index + 1 && classes.tableEventsBorderRight} ${
            //   classes.tableHeadEvents
            // }`}
            className={`${classesTable.tableHead}`}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <Box onClick={createSortHandler(headCell.id)} className="table-arrow-drop-container">
              {headCell.label}
              {headCell.sortDropIconShow && (
                <Box component="span" className="ml-14">
                  <BottomArrow />
                </Box>
              )}
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default FeedbacksTableHead
