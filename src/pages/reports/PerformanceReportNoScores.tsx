import React, {useEffect, useState} from 'react'
import {Box, Button, CircularProgress} from '@mui/material'
import moment from 'moment'
import {AxiosResponse} from 'axios'
import WrapperCertificates from '../../layouts/certificates/wrapperCertificates'
import EnhancedTable from '../../layouts/table/table'
import useStylesButton from '../../assets/makeStyles/buttons/buttons'
import SelectField2 from '../../layouts/fields/selectField2'
import useStylesTextFields from '../../assets/makeStyles/textFields/textFields'
import UsersApi from '../../api/users'
import {IEnhancedPerformanceReportTableRows} from '../../shared/types/table/table'
import ReportsApi from '../../api/reports'
import SelectDate from '../events/selectDate'
import {UseCertificateContext} from '../../context/certificateContext/certificateContext'
import {ICertificateProps} from '../../context/certificateContext/certificateContext.props'
import PaginationContainer from '../../layouts/pagination/pagination'

const PerformanceReport = () => {
  const classesButtons = useStylesButton()
  const classesTextFields = useStylesTextFields()
  const {
    setShowCertificate,
    showCertificate,
    setEvaluateeName,
    evaluateeName,
    setTotalScore,
    setCreateDate,
    totalScore,
    setMenual,
    menual,
    createDate,
    evaluateeId,
    certificateType,
    setNoScore,
  } = UseCertificateContext() as ICertificateProps

  const [eventTitleId, setEventTitleId] = useState<number>(-1)
  const [eventTitleData, setEventTitleData] = useState<{name: string; id: number}[]>([])
  const [rowsOfTable, setRowsOfTable] = useState<IEnhancedPerformanceReportTableRows[]>([])
  const [searchEvaluateeId, setSearchEvaluateeId] = useState<number>(-1)
  const [nameOfUsers, setNameOfUsers] = useState<{name: string; id: number}[]>([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [countPagination, setCountPagination] = useState<number>(0)
  const [totalCountOfPagination, setTotalCountOfPagination] = useState<number | undefined>()
  const [isLoadingApply, setIsLoadingApply] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  useEffect(() => {
    setNoScore(true)
  }, [])

  useEffect(() => {
    ;(async () => {
      if (totalCountOfPagination) {
        if (pageSize >= totalCountOfPagination) {
          setCountPagination(1)
        } else {
          setCountPagination(Math.ceil(totalCountOfPagination / pageSize))
        }
      }
      setIsLoading(true)

      const response = await ReportsApi.evaluationAbsolutePointReportList({
        page,
        pageSize,
        eventId: eventTitleId,
        evaluationType: 0,
        evaluateeId: searchEvaluateeId,
        ...(startDate && {startDate: moment(startDate).format()}),
        ...(endDate && {endDate: moment(endDate).format()}),
      })
      setTotalCountOfPagination(response.data.totalCount)

      const updateEventsTitleData = [
        ...response.data.reportItems.map((item: {eventTitle: string; eventId: number}) => ({
          name: item.eventTitle,
          id: item.eventId,
        })),
      ]

      setEventTitleData(
        updateEventsTitleData.filter((element: {id: number}) => {
          const isDuplicate = updateEventsTitleData.includes(element.id)
          if (!isDuplicate) {
            updateEventsTitleData.push(element.id)
            return true
          }
          return false
        }),
      )

      setRowsOfTable(response.data.reportItems)
      setIsLoading(false)
    })()
  }, [pageSize, totalCountOfPagination, page])

  useEffect(() => {
    ;(async () => {
      const resultUsers = await UsersApi.usersList()
      setNameOfUsers([
        ...resultUsers.data.map((item: {firstName: string; id: number}) => ({
          name: item.firstName,
          id: item.id,
        })),
      ])
    })()
  }, [])

  const handleChangeDate = (start: string, end: string) => {
    setStartDate(start)
    setEndDate(end)
  }

  const handleShowCertificate = () => {
    setShowCertificate(true)
    setMenual(true)
    setEvaluateeName('')
    setTotalScore('')
    setCreateDate('')
  }

  const handleApply = async () => {
    setIsLoadingApply(true)

    const response = await ReportsApi.evaluationAbsolutePointReportList({
      page,
      pageSize,
      evaluationType: 0,
      ...(eventTitleId && {eventId: eventTitleId}),
      ...(startDate && {startDate: moment(startDate).format()}),
      ...(endDate && {endDate: moment(endDate).format()}),
      ...(searchEvaluateeId && {evaluateeId: searchEvaluateeId}),
    })

    setRowsOfTable(response.data.reportItems)
    setTotalCountOfPagination(response.data.totalCount)
    setIsLoadingApply(false)
  }

  const handleOpenCertificates = () => {
    if (!showCertificate) {
      setShowCertificate(true)
    } else {
      setShowCertificate(false)
      setEvaluateeName('')
      setTotalScore('')
      setCreateDate('')
    }
  }

  const handleCreateReportTablePDF = async () => {
    await ReportsApi.createReportEvaluationPairs({
      page: -1,
      pageSize: -1,
      adminId: -1,
      evaluatorId: -1,
      evaluationType: 0,
      eventId: eventTitleId,
      evaluateeId: searchEvaluateeId,
    }).then((response: AxiosResponse) => {
      const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'PairsReportPdf.pdf') //or any other extension
      document.body.appendChild(link)
      link.click()
    })
  }

  const renderRatingWithText = (sumPoint: number, questionCount: number) => {
    if (sumPoint / questionCount <= 1) {
      return 'Good'
    }
    if (sumPoint / questionCount <= 2) {
      return 'Good'
    }
    return 'Excellent'
  }

  const handleCreateReportTableCVS = async () => {
    if (rowsOfTable) {
      const data: string[][] = [
        [
          'Event',
          'First name and Last name',
          'Hire Date',
          'Job Title',
          'Salary',
          'Rating',
          'Bonus: %',
          'Bonus Amount',
        ],
      ]

      rowsOfTable.forEach((item) =>
        data.push([
          item.eventTitle,
          item.evaluateeName,
          item.dueDate.toString(),
          item.evaluateePosition,
          `${item.monthlySalary} ${item.currency === 1 ? 'AMD' : 'USD'}`.toString(),
          renderRatingWithText(item.sumPoint, item.questionCount),
          item.bonusPercentage.toString(),
          `${((item.monthlySalary * item.bonusPercentage) / 100).toString()} ${
            item.currency === 1 ? 'AMD' : 'USD'
          }`,
        ]),
      )

      const csvContent = `data:text/csv;charset=utf-8,${data.map((e) => e.join(',')).join('\n')}`
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', 'my_data.csv')
      document.body.appendChild(link)
      link.click()
    }
  }

  const handleCreateCertificate = async () => {
    if (menual) {
      await ReportsApi.createManualCertificate({
        userName: evaluateeName,
        totalScore,
        createDate,
        certificateType,
      }).then((response: AxiosResponse) => {
        const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'Certificate.pdf')
        document.body.appendChild(link)
        link.click()
      })
    } else {
      await ReportsApi.createCertificate({
        userId: evaluateeId,
        totalScore,
        certificateType,
      }).then((response: AxiosResponse) => {
        const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'Certificate.pdf')
        document.body.appendChild(link)
        link.click()
      })
    }
  }

  const handleClear = async () => {
    setIsLoading(true)
    setEventTitleId(-1)
    setSearchEvaluateeId(-1)
    setStartDate('')
    setEndDate('')
    setPage(1)
    setPageSize(10)
    const response = await ReportsApi.evaluationAbsolutePointReportList({
      page: 1,
      pageSize: 10,
      evaluationType: 0,
      eventId: -1,
      evaluateeId: -1,
    })
    setRowsOfTable(response.data.reportItems)
    setTotalCountOfPagination(response.data.totalCount)
    setIsLoading(false)
  }

  if (!showCertificate) {
    return (
      <Box className="performance-report">
        <Box>
          <SelectDate
            applyHandle={handleChangeDate}
            startDateProps={startDate}
            endDateProps={endDate}
            disabled={false}
            border={false}
          />
        </Box>
        <Box className="d-flex flex-wrap mt-2">
          <Box className={`${classesTextFields.fieldSize190} mt-18 mr-16`}>
            <SelectField2
              value={eventTitleId}
              handleChange={(id) => setEventTitleId(id)}
              fontWeight={500}
              border={false}
              label="Event Title"
              data={eventTitleData}
            />
          </Box>
          <Box className={`${classesTextFields.fieldSize190} mt-18 mr-16`}>
            <SelectField2
              value={searchEvaluateeId}
              handleChange={(id) => setSearchEvaluateeId(id)}
              fontWeight={500}
              border={false}
              label="Evaluatee"
              data={nameOfUsers}
            />
          </Box>
        </Box>
        <Box className="d-flex justify-end mt-18">
          <Box>
            <Button
              onClick={() => handleClear()}
              color="blue"
              className={`${classesButtons.width128} ${classesButtons.transparentWithBorderButton} `}
            >
              Clear
            </Button>
          </Box>
          <Box className="ml-46">
            {!isLoadingApply ? (
              <Button
                variant="contained"
                color="blue"
                onClick={() => handleApply()}
                className={`${classesButtons.colorBlueButton} ${classesButtons.width150}`}
              >
                Apply
              </Button>
            ) : (
              <CircularProgress />
            )}
          </Box>
        </Box>
        <Box className="mt-94">
          <Box className="d-flex">
            <Box>
              <Button
                className={`${classesButtons.exportButton}`}
                onClick={() => handleCreateReportTablePDF()}
              >
                EXPORT AS PDF
              </Button>
            </Box>
            <Box className="ml-10">
              <Button
                className={`${classesButtons.exportButton}`}
                onClick={() => handleCreateReportTableCVS()}
              >
                EXPORT AS CSV
              </Button>
            </Box>
            <Box className="ml-10">
              <Button
                className={`${classesButtons.exportButton}`}
                // className={`${classesButtons.buttonPaddingNormal} ${classesButtons.transparentWithBorderButton}`}
                color="blue"
                onClick={() => handleShowCertificate()}
              >
                GET CERTIFICATE
              </Button>
            </Box>
          </Box>
          <Box className="mt-40">
            {!isLoading && rowsOfTable.length ? (
              <Box>
                <EnhancedTable table="performance-report" rows={rowsOfTable} />
                <PaginationContainer
                  limitData={totalCountOfPagination}
                  setPage={setPage}
                  page={page}
                  countPagination={countPagination}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                />
              </Box>
            ) : (
              <div className="d-flex justify-center">
                {isLoading ? <CircularProgress /> : 'There is not data'}
              </div>
            )}
          </Box>
        </Box>
      </Box>
    )
  }
  return (
    <div className="saved-submissions-certification">
      <WrapperCertificates
        handleCreateCertificate={handleCreateCertificate}
        handleOpenCertificates={handleOpenCertificates}
      />
    </div>
  )
}

export default PerformanceReport
