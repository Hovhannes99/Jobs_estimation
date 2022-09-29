import TableCell from '@mui/material/TableCell'
import Box from '@mui/material/Box'
import {Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import moment from 'moment'
import {
  IEnhancedTemplatesTableRows,
  TableKeyNumberOrStringType,
} from '../../../shared/types/table/table'
import useStylesButton from '../../../assets/makeStyles/buttons/buttons'
import {useStylesTable} from '../../../assets/makeStyles/table/table'
// import {IEventEvaluators} from '../../../shared/types/events/events'
// import getUserList from '../../../pages/utils/usersUtils'

const EventsTableRow = ({
  key,
  labelId,
  row,
}: {
  key: number
  labelId: string
  row: TableKeyNumberOrStringType | IEnhancedTemplatesTableRows
}) => {
  const classesButtons = useStylesButton()
  const classesTable = useStylesTable()

  const navigate = useNavigate()
  // const eventEvaluators = row?.eventEvaluators as IEventEvaluators[]
  // const eventEvaluatees = row?.eventEvaluatees as IEventEvaluators[]
  const {admin, evaluatees, evaluators} = row as IEnhancedTemplatesTableRows

  // const [getEvaluateeUsers, setGetEvaluateeUsers] = useState<{id: number; userName: string}[]>([])
  // const [getEvaluatorUsers, setGetEvaluatorUsers] = useState<{id: number; userName: string}[]>([])

  const {firstName} = admin

  const handleSeeReport = (id: number | string) => {
    navigate(`/events/event-create/${id}`, {state: {isAdminLocation: true, id, view: true}})
  }

  const handleClone = (id: number | string) => {
    navigate(`/events/event-create/${id}`, {state: {isAdminLocation: true, id, clone: true}})
  }

  const handleEdit = (id: number | string) => {
    navigate(`/events/event-create/${id}`, {state: {isAdminLocation: true, id, edit: true}})
  }

  // useEffect(() => {
  //   ;(async () => {
  //     const updateEvaluatorUsers = await Promise.all(
  //       eventEvaluators.map(async (item) => getUserList(item)),
  //     )
  //     const updateEvaluateeUsers = await Promise.all(
  //       eventEvaluatees.map(async (item) => getUserList(item)),
  //     )
  //     setGetEvaluatorUsers(updateEvaluatorUsers)
  //     setGetEvaluateeUsers(updateEvaluateeUsers)
  //   })()
  // }, [eventEvaluators, eventEvaluatees])

  return (
    <TableRow hover tabIndex={-1} key={key}>
      <TableCell
        className={`${classesTable.tableBodyEvents} break-all`}
        component="th"
        id={labelId}
        scope="row"
        padding="none"
      >
        {row.eventTitle}
      </TableCell>
      <TableCell className={classesTable.tableBodyEvents}>{firstName}</TableCell>
      <TableCell className={classesTable.tableBodyEvents}>
        {row.createdDate && moment(row.createdDate).format('L')}
      </TableCell>
      <TableCell className={classesTable.tableBodyEvents}>
        {evaluators &&
          evaluators.map((item, index) => item && (index ? ', ' : '') + item.firstName)}
      </TableCell>
      <TableCell className={`${classesTable.tableBodyEvents}`}>
        {evaluatees &&
          evaluatees.map((item, index) => item && (index ? ', ' : '') + item.firstName)}
      </TableCell>
      <TableCell className={classesTable.tableBodyEvents}>
        <Box component="span">
          <Button
            onClick={() => handleSeeReport(row.id)}
            className={`${classesButtons.transparentButton}`}
          >
            View
          </Button>
        </Box>
        <Box component="span">
          <Button
            onClick={() => handleEdit(row.id)}
            className={`${classesButtons.transparentButton}`}
          >
            Edit
          </Button>
        </Box>
        <Box component="span">
          <Button
            onClick={() => handleClone(row.id)}
            className={`${classesButtons.transparentButton}`}
          >
            Clone
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  )
}

export default EventsTableRow
