import React from 'react'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Box from '@mui/material/Box'
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {
  IEventsTableHeadProps,
  ITableEventsCell,
  ITableEventsData,
} from '../../../shared/types/table/tableEvents/tableEvents'
import BottomArrow from '../../../assets/images/Icons/bottomArrow'
import {useStylesTable} from '../../../assets/makeStyles/table/table'

const headCells: readonly ITableEventsCell[] = [
  {
    id: 'eventTitle',
    numeric: true,
    disablePadding: false,
    label: 'Event Title',
    sortDropIconShow: true,
  },
  {
    id: 'firstName',
    numeric: true,
    disablePadding: false,
    label: 'Name',
    sortDropIconShow: false,
  },
  {
    id: 'createdDate',
    numeric: true,
    disablePadding: false,
    label: 'Date',
    sortDropIconShow: true,
  },
  {
    id: 'eventEvaluators',
    numeric: true,
    disablePadding: false,
    label: 'Evaluators',
    sortDropIconShow: false,
  },
  {
    id: 'eventEvaluatees',
    numeric: true,
    disablePadding: false,
    label: 'Evaluatees',
    sortDropIconShow: false,
    borderRight: true,
  },
  {
    id: 'eventEvaluatees',
    numeric: true,
    disablePadding: false,
    label: 'Evaluatees',
    sortDropIconShow: false,
    borderRight: true,
  },
  {
    id: 'link',
    numeric: false,
    disablePadding: false,
    label: '',
    sortDropIconShow: false,
  },
]

const EventsTableHead = (props: IEventsTableHeadProps) => {
  const classes = useStylesTable()
  const {order, orderBy, onRequestSort} = props
  const createSortHandler =
    (property: keyof ITableEventsData) => (event: React.MouseEvent<HTMLDivElement>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead className="table-head">
      <TableRow>
        {/*index*/}
        {headCells.map((headCell) => (
          <TableCell
            // className={`${headCells.length - 1 > index + 1 && classes.tableEventsBorderRight} ${
            //   classes.tableHeadEvents
            // }`}
            className={`${classes.tableHead}`}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <Box onClick={createSortHandler(headCell.id)} className="table-arrow-drop-container">
              <Box>{headCell.label}</Box>
              {headCell.sortDropIconShow && (
                <Box component="span" className="ml-14">
                  {/*<ArrowDropUpIcon />*/}
                  {/*<ArrowDropDownIcon />*/}
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

export default EventsTableHead
