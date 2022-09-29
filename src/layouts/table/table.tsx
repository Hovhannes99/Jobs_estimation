import React, {useState, Key} from 'react'
import Box from '@mui/material/Box'
import '../../assets/scss/layout/table/table.scss'
import {
  TableOrderType,
  IEnhancedPerformanceReportTableRows,
  TableKeyNumberOrStringType,
  IEnhancedTableEventRows,
  IEnhancedTableSavedSubmissionsRows,
  IEnhancedUsersTableRows,
  IEnhancedTemplatesTableRows,
  IEnhancedTable,
  ITableFeedbacks,
} from '../../shared/types/table/table'
import {ITableTemplatesData} from '../../shared/types/table/tableTamplates/tableTemplates'
import TableContainerTemplates from './templatesTable/tableContainer'
import TableContainerEvents from './eventsTable/tableContainer'
import TableContainerUsers from './usersTable/tableContainer'
import TableContainerSavedSubmissions from './savedSubmissionsTable/tableContainer'
import TableContainerPerformanceReport from './performanceReportTable/tableContainer'
import {ITableUsersData} from '../../shared/types/table/tableUsers/tableUsers'
import {ITableEventsData} from '../../shared/types/table/tableEvents/tableEvents'
import {ITableSavedSubmissionsData} from '../../shared/types/table/tableSavedSubmissions/tableSavedSubmissions'
import TableContainerFeedbacks from './feedbacksTable/tableContainer'

const descendingComparator = (
  a: TableKeyNumberOrStringType,
  b: TableKeyNumberOrStringType,
  orderBy: React.Key,
) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const getComparator = (
  order: TableOrderType,
  orderBy: Key,
): ((a: TableKeyNumberOrStringType, b: TableKeyNumberOrStringType) => number) =>
  order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)

const stableSort = <T,>(
  array:
    | readonly T[]
    | IEnhancedTableSavedSubmissionsRows[]
    | IEnhancedTableEventRows[]
    | IEnhancedPerformanceReportTableRows[]
    | IEnhancedUsersTableRows[]
    | IEnhancedTemplatesTableRows[]
    | ITableFeedbacks[],
  comparator: (a: T | TableKeyNumberOrStringType, b: T | TableKeyNumberOrStringType) => number,
) => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const EnhancedTable = ({table, rows, setRows}: IEnhancedTable) => {
  const [order, setOrder] = useState<TableOrderType>('asc')
  const [orderByUsers, setOrderByUsers] = useState<keyof ITableUsersData>('firstName')
  const [orderBy, setOrderBy] = useState<keyof ITableSavedSubmissionsData>('eventTitle')

  const [orderByPerformanceReport, setOrderByPerformanceReport] =
    useState<keyof IEnhancedPerformanceReportTableRows>('eventTitle')

  const [orderByEvents, setOrderByEvents] = useState<keyof ITableEventsData>('eventTitle')
  const [orderByFeedbacks, setOrderByFeedbacks] = useState<keyof ITableFeedbacks>('feedbackText')
  const [orderByTemplates, setOrderByTemplates] = useState<keyof ITableTemplatesData>('eventName')

  const handleRequestSortEvents = (
    event: React.MouseEvent<HTMLDivElement>,
    property: keyof ITableEventsData,
  ) => {
    const isAsc = orderByEvents === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderByEvents(property)
  }

  const handleRequestSortFeedbacks = (
    event: React.MouseEvent<HTMLDivElement>,
    property: keyof ITableFeedbacks,
  ) => {
    const isAsc = orderByFeedbacks === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderByFeedbacks(property)
  }

  const handleRequestSortTemplates = (
    event: React.MouseEvent<HTMLDivElement>,
    property: keyof ITableTemplatesData,
  ) => {
    const isAsc = orderByTemplates === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderByTemplates(property)
  }

  const handleRequestSortPerformanceReport = (
    event: React.MouseEvent<HTMLDivElement>,
    property: keyof IEnhancedPerformanceReportTableRows,
  ) => {
    const isAsc = orderByPerformanceReport === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderByPerformanceReport(property)
  }

  const handleRequestSort = (
    event: React.MouseEvent<HTMLDivElement>,
    property: keyof ITableSavedSubmissionsData,
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleRequestSortTableUsers = (
    event: React.MouseEvent<HTMLDivElement>,
    property: keyof ITableUsersData,
  ) => {
    const isAsc = orderByUsers === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderByUsers(property)
  }

  return (
    <Box className="mt-30 table-container">
      {table === 'events' && (
        <TableContainerEvents
          order={order}
          orderBy={orderByEvents}
          handleRequestSort={handleRequestSortEvents}
          stableSort={stableSort}
          rows={rows}
          getComparator={getComparator}
        />
      )}
      {table === 'templates' && (
        <TableContainerTemplates
          order={order}
          orderBy={orderByTemplates}
          handleRequestSort={handleRequestSortTemplates}
          stableSort={stableSort}
          rows={rows}
          getComparator={getComparator}
        />
      )}
      {table === 'users' && (
        <TableContainerUsers
          order={order}
          orderBy={orderByUsers}
          handleRequestSort={handleRequestSortTableUsers}
          stableSort={stableSort}
          rows={rows}
          getComparator={getComparator}
        />
      )}
      {table === 'saved-submissions' && (
        <TableContainerSavedSubmissions
          order={order}
          orderBy={orderBy}
          handleRequestSort={handleRequestSort}
          stableSort={stableSort}
          rows={rows}
          getComparator={getComparator}
          setRows={setRows}
        />
      )}
      {table === 'performance-report' && (
        <TableContainerPerformanceReport
          order={order}
          orderBy={orderByPerformanceReport}
          handleRequestSort={handleRequestSortPerformanceReport}
          stableSort={stableSort}
          rows={rows}
          getComparator={getComparator}
        />
      )}

      {table === 'feedbacks' && (
        <TableContainerFeedbacks
          order={order}
          orderBy={orderByFeedbacks}
          handleRequestSort={handleRequestSortFeedbacks}
          stableSort={stableSort}
          rows={rows}
          getComparator={getComparator}
        />
      )}
    </Box>
  )
}

export default EnhancedTable
