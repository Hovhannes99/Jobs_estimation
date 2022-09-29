import React, {Fragment} from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import {Box, Button} from '@mui/material'
import moment from 'moment'
import MakeStyles from '../../../assets/makeStyles/makeStyles'
import {useStylesTable} from '../../../assets/makeStyles/table/table'
import {IEnhancedPerformanceReportTableRows} from '../../../shared/types/table/table'
import {UseCertificateContext} from '../../../context/certificateContext/certificateContext'
import {ICertificateProps} from '../../../context/certificateContext/certificateContext.props'

const PerformanceReportTableRow = ({
  key,
  labelId,
  row,
}: {
  key: number
  labelId: string
  row: IEnhancedPerformanceReportTableRows
}) => {
  const classes = MakeStyles()
  const classesTable = useStylesTable()
  const {
    setShowCertificate,
    setEvaluateeName,
    setMenual,
    setCreateDate,
    setTotalScore,
    setEvaluateeId,
    noScore,
  } = UseCertificateContext() as unknown as ICertificateProps
  const {
    eventTitle,
    evaluateeName,
    sumPoint,
    evaluateePosition,
    dueDate,
    questionCount,
    monthlySalary,
    currency,
    evaluateeId,
    bonusPercentage,
  } = row

  const handleShowCertificate = (evaluateeNameProps: string, pointProps: string) => {
    setShowCertificate(true)
    setTotalScore(pointProps)
    setMenual(false)
    setCreateDate(moment(dueDate).calendar())
    setEvaluateeId(evaluateeId)
    setEvaluateeName(evaluateeNameProps)
  }

  const renderRatingWithText = () => {
    if (sumPoint / questionCount <= 1) {
      return 'Good'
    }
    if (sumPoint / questionCount <= 2) {
      return 'Good'
    }
    return 'Excellent'
  }

  return (
    <Fragment key={key}>
      <TableRow key={row.id} hover tabIndex={-1}>
        <TableCell
          className={classesTable.tableBodyEvents}
          // className={clsx(classesTable.tablePerformanceReportBody, classes.pLeft16)}
          component="th"
          id={labelId}
          scope="row"
          padding="none"
        >
          <Box className={`${classes.pLeft16}`}>{eventTitle}</Box>
        </TableCell>
        <TableCell
          className={classesTable.tableBodyEvents}
          // className={clsx(classesTable.tablePerformanceReportBody, classes.pLeft16)}
          component="th"
          id={labelId}
          scope="row"
          padding="none"
        >
          <Box className={`${classes.pLeft16}`}>{evaluateeName}</Box>
        </TableCell>
        <TableCell
          key="dueDate"
          id="dueDate"
          className={classesTable.tableBodyEvents}

          // className={`${classesTable.tableTextStyle} ${classesTable.tablePerformanceReportBody}`}
        >
          <Box className={`${classes.pLeft16}`}>{dueDate && moment(dueDate).format('L')}</Box>
        </TableCell>
        <TableCell
          key="averagePoint"
          className={classesTable.tableBodyEvents}

          // className={`${classesTable.tableTextStyle} ${classesTable.tablePerformanceReportBody}`}
        >
          <Box className={`${classes.pLeft16}`}>{evaluateePosition}</Box>
        </TableCell>
        <TableCell
          className={classesTable.tableBodyEvents}

          // className={`${classesTable.tableTextStyle} ${classesTable.tablePerformanceReportBody}`}
        >
          <Box className={`${classes.pLeft16}`}>
            {monthlySalary}
            {currency === 1 ? ' AMD' : ' USD'}
          </Box>
        </TableCell>
        {/*{!noScore && (*/}
        <TableCell
          className={classesTable.tableBodyEvents}

          // className={`${classesTable.tableTextStyle} ${classesTable.tablePerformanceReportBody}`}
        >
          <Box className={`${classes.pLeft16}`}>
            {noScore ? renderRatingWithText() : (sumPoint / questionCount).toString().slice(0, 4)}
          </Box>
        </TableCell>
        {/*)}*/}
        <TableCell
          className={classesTable.tableBodyEvents}

          // className={` ${classesTable.tablePerformanceReportBody}`}
        >
          <Box className={`${classes.pLeft16} pb-10 pt-10`}>{bonusPercentage % 100}</Box>
        </TableCell>
        <TableCell
          className={classesTable.tableBodyEvents}

          // className={` ${classesTable.tablePerformanceReportBody}`}
        >
          <Box className={`${classes.pLeft16}`}>
            {(monthlySalary * bonusPercentage) / 100} {currency === 1 ? ' AMD' : ' USD'}
          </Box>
        </TableCell>
        <TableCell
          className={classesTable.tableBodyEvents}

          // className={` ${classesTable.tablePerformanceReportBody}`}
        >
          <Box className={`${classes.pLeft16}`}>
            <Button
              color="blue"
              variant="text"
              onClick={() =>
                handleShowCertificate(
                  evaluateeName,
                  (sumPoint / questionCount).toString().slice(0, 4),
                )
              }
            >
              GET CERTIFICATE
            </Button>
          </Box>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}
export default PerformanceReportTableRow
