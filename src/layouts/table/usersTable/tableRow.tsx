import TableCell from '@mui/material/TableCell'
import {useNavigate} from 'react-router-dom'
import {Box} from '@mui/material'
import React from 'react'
import {TableKeyNumberOrStringType} from '../../../shared/types/table/table'
import {useStylesTable, StyledTableRow} from '../../../assets/makeStyles/table/table'
import EditIcon from '../../../assets/images/Icons/editIcon_2'

const UsersTableRow = ({
  key,
  labelId,
  row,
}: {
  key: number
  labelId: string
  row: TableKeyNumberOrStringType
}) => {
  const classesTable = useStylesTable()

  const navigate = useNavigate()

  const handleEdit = (values: TableKeyNumberOrStringType) => {
    navigate(`user-edit/${values.id}`, {state: values})
  }

  return (
    <StyledTableRow hover tabIndex={-1} key={key}>
      <TableCell
        className={classesTable.tableBodyEvents}
        // className={classesTable.tableBodyUsers}
        component="th"
        id={labelId}
        scope="row"
        padding="none"
      >
        {row.firstName}
      </TableCell>
      <TableCell
        className={classesTable.tableBodyEvents}

        // className={classesTable.tableBodyUsers}
      >
        {row.email}
      </TableCell>
      <TableCell
        className={classesTable.tableBodyEvents}

        // className={classesTable.tableBodyUsers}
      >
        {row.position}
      </TableCell>
      <TableCell
        className={`${classesTable.tableBodyEvents} `}

        // className={`${classesTable.tableBodyUsers} ${classesTable.tableRowDisFlex}`}
      >
        {row.monthlySalary} {row.currency === 1 ? 'AMD' : 'USD'}
      </TableCell>
      <TableCell className={`${classesTable.tableBodyEvents} `}>
        <Box className="cursor-pointer ml-14" onClick={() => handleEdit(row)}>
          <EditIcon />
        </Box>
      </TableCell>
    </StyledTableRow>
  )
}

export default UsersTableRow
