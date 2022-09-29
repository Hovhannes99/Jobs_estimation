import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import {ITableFeedbacks, TableKeyNumberOrStringType} from '../../../shared/types/table/table'
import {useStylesTable} from '../../../assets/makeStyles/table/table'

const FeedbacksTableRow = ({
  key,
  labelId,
  row,
}: {
  key: number
  labelId: string
  row: TableKeyNumberOrStringType | ITableFeedbacks
}) => {
  const classesTable = useStylesTable()

  const {eventTitle} = row.event as unknown as {eventTitle: string}
  const evaluatee = row.evaluatee as unknown as {firstName: string}
  const evaluator = row.evaluator as unknown as {firstName: string}

  return (
    <TableRow hover tabIndex={-1} key={key}>
      <TableCell
        className={classesTable.tableBodyEvents}
        component="th"
        id={labelId}
        scope="row"
        padding="none"
      >
        {row && eventTitle}
      </TableCell>
      <TableCell className={classesTable.tableBodyEvents}>{evaluatee.firstName}</TableCell>
      <TableCell className={classesTable.tableBodyEvents}>{evaluator.firstName}</TableCell>
      <TableCell className={classesTable.tableBodyEvents}>{row.feedbackText}</TableCell>
    </TableRow>
  )
}

export default FeedbacksTableRow
