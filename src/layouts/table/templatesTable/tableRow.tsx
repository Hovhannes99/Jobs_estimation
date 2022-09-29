import TableCell from '@mui/material/TableCell'
import Box from '@mui/material/Box'
import {Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import {ITableRowTemplatesProps} from '../../../shared/types/table/tableTamplates/tableTemplates'
import useStylesButton from '../../../assets/makeStyles/buttons/buttons'
import {useStylesTable} from '../../../assets/makeStyles/table/table'
// import OverflowTooltip from '../../overFlowToolTip/overFlowToolTip'
// import {IEventEvaluators} from '../../../shared/types/events/events'

const TemplatesTableRow = ({key, labelId, row}: ITableRowTemplatesProps) => {
  const classesButtons = useStylesButton()
  const classesTable = useStylesTable()

  const navigate = useNavigate()

  const handleReviewAndRestart = () => {
    navigate('/events/event-create', {state: {isAdminLocation: true}})
  }

  // const eventEvaluators = row.eventEvaluators as unknown as IEventEvaluators[]
  // const eventEvaluatees = row.eventEvaluatees as unknown as IEventEvaluators[]
  return (
    <TableRow hover tabIndex={-1} key={key}>
      <TableCell
        className={classesTable.tableBodyEvents}
        component="th"
        id={labelId}
        scope="row"
        padding="none"
      >
        {row.eventName}
      </TableCell>
      <TableCell className={classesTable.tableBodyEvents}>{row.date}</TableCell>
      <TableCell className={classesTable.tableBodyEvents}>{row.status}</TableCell>
      <TableCell className={classesTable.tableBodyEvents}>
        {/*<OverflowTooltip>{eventEvaluators.user && eventEvaluators.user.firstName}</OverflowTooltip>*/}
      </TableCell>
      <TableCell className={classesTable.tableBodyEvents}>
        {/*{eventEvaluatees.user && eventEvaluatees.user.firstName}*/}
      </TableCell>
      <TableCell className={classesTable.tableBodyEvents}>
        <Box component="span">
          <Button
            onClick={handleReviewAndRestart}
            className={`${classesButtons.transparentButton}`}
          >
            Review and Restart
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  )
}

export default TemplatesTableRow
