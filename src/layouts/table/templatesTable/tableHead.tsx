import React from 'react'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Box from '@mui/material/Box'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {
  ITableHeadTemplatesProps,
  ITableTemplatesCell,
  ITableTemplatesData,
} from '../../../shared/types/table/tableTamplates/tableTemplates'
import {useStylesTable} from '../../../assets/makeStyles/table/table'

const headCells: readonly ITableTemplatesCell[] = [
  {
    id: 'eventName',
    numeric: true,
    disablePadding: false,
    label: 'Event Name',
    sortDropIconShow: true,
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Date',
    sortDropIconShow: true,
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    sortDropIconShow: true,
  },
  {
    id: 'evaluator',
    numeric: true,
    disablePadding: false,
    label: 'Evaluators',
    sortDropIconShow: true,
  },
  {
    id: 'evaluate',
    numeric: true,
    disablePadding: false,
    label: 'Evaluatees',
    sortDropIconShow: true,
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

const TemplatesTableHead = (props: ITableHeadTemplatesProps) => {
  const classes = useStylesTable()
  const {order, orderBy, onRequestSort} = props
  const createSortHandler =
    (property: keyof ITableTemplatesData) => (event: React.MouseEvent<HTMLDivElement>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead className="table-head">
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            className={`${headCells.length - 1 > index + 1 && classes.tableEventsBorderRight} ${
              classes.tableHeadEvents
            }`}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <Box onClick={createSortHandler(headCell.id)} className="table-arrow-drop-container">
              {headCell.sortDropIconShow && (
                <Box component="span" className="table-arrow-drop">
                  <ArrowDropUpIcon />
                  <ArrowDropDownIcon />
                </Box>
              )}
              {headCell.label}
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TemplatesTableHead
