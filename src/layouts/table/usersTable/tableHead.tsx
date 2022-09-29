import React from 'react'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Box from '@mui/material/Box'
import {useStylesTable} from '../../../assets/makeStyles/table/table'
import {
  ITableUsersData,
  IUsersTableHeadProps,
  ITableUsersCell,
} from '../../../shared/types/table/tableUsers/tableUsers'
import BottomArrow from '../../../assets/images/Icons/bottomArrow'

const headCells: readonly ITableUsersCell[] = [
  {
    id: 'firstName',
    numeric: true,
    disablePadding: false,
    label: 'Name',
    sortDropIconShow: true,
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
    sortDropIconShow: true,
  },
  {
    id: 'position',
    numeric: true,
    disablePadding: false,
    label: 'Position',
    sortDropIconShow: true,
  },
  {
    id: 'monthlySalary',
    numeric: true,
    disablePadding: false,
    label: 'Monthly Salary (net)',
    sortDropIconShow: true,
  },
]

const UsersTableHead = (props: IUsersTableHeadProps) => {
  const classesTable = useStylesTable()
  const {order, orderBy, onRequestSort} = props
  const createSortHandler =
    (property: keyof ITableUsersData) => (event: React.MouseEvent<HTMLDivElement>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead className="table-head">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            // className={`${headCells.length !== index + 1 && classes.tableEventsBorderRight} ${
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
        <TableCell />
      </TableRow>
    </TableHead>
  )
}

export default UsersTableHead
