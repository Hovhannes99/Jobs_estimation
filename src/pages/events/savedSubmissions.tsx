import React, {useEffect, useState} from 'react'
import {Autocomplete, Box, Button, CircularProgress, TextField} from '@mui/material'
// import {AxiosResponse} from 'axios'
// import SelectField from '../../layouts/fields/selectField'
import EnhancedTable from '../../layouts/table/table'
import useStylesButton from '../../assets/makeStyles/buttons/buttons'
import {TableArraysType} from '../../shared/types/table/table'
import UsersApi from '../../api/users'
import EvaluationApi from '../../api/evaluation'
import ReportsApi from '../../api/reports'
import {UseEvaluationContext} from '../../context/evalaution/evaluationContext'
import {IEvalautionProps} from '../../context/evalaution/evaluationContext.props'
import FeedBackApi from '../../api/feedback'
import PaginationContainer from '../../layouts/pagination/pagination'
import {ITableSavedSubmissionsData} from '../../shared/types/table/tableSavedSubmissions/tableSavedSubmissions'
import SearchIcon from '../../assets/images/Icons/searchIcon'
import useStylesTextFields from "../../assets/makeStyles/textFields/textFields";

const SavedSubmissions = () => {
  const classesButtons = useStylesButton()
  const classes = useStylesTextFields()
  const {setGetEvaluationList, setEvaluationPointSumReportList, setFeedbacksList} =
    UseEvaluationContext() as IEvalautionProps
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [eventId, setEventId] = useState<number>(-1)
  const [evaluatorId, setEvaluatorId] = useState<number>(-1)
  const [evaluateeId, setEvaluateeId] = useState<number>(-1)
  const [isLoadingApply, setIsLoadingApply] = useState<boolean>(false)
  const [limitData, setLimitData] = useState<number | undefined>()
  const [countPagination, setCountPagination] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [eventsData, setEventsData] = useState<{name: string; id: number}[]>([])
  const [nameOfUsers, setNameOfUsers] = useState<{name: string; id: number}[]>([])
  const [rows, setRows] = useState<ITableSavedSubmissionsData[]>([])
  const [disabledHandleApply, setDisabledHandleApply] = useState<boolean>(true)

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

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const response = await ReportsApi.evaluationPointSumReportList({
        ...(eventId && {eventId}),
        ...(evaluatorId && {evaluatorId}),
        ...(evaluateeId && {evaluateeId}),
        page,
        pageSize,
      })
      setEvaluationPointSumReportList(response.data.reportItems)
      setLimitData(response.data.totalCount)
      if (response.data.reportItems) {
        setRows(response.data.reportItems)
        const updateEventsData = response.data.reportItems.map(
          (item: {eventTitle: string; eventId: number}) => ({
            name: item.eventTitle,
            id: item.eventId,
          }),
        )
        setEventsData(
          updateEventsData.filter((element: {id: number}) => {
            const isDuplicate = updateEventsData.includes(element.id)
            if (!isDuplicate) {
              updateEventsData.push(element.id)
              return true
            }
            return false
          }),
        )
      }
      setIsLoading(false)
    })()
  }, [pageSize, page])

  useEffect(() => {
    if (limitData) {
      if (pageSize >= limitData) {
        setCountPagination(1)
      } else {
        setCountPagination(Math.ceil(limitData / pageSize))
      }
    }
  }, [pageSize, page, limitData])

  useEffect(() => {
    ;(async () => {
      const response = await EvaluationApi.getEvaluationsList()
      setGetEvaluationList(response.data)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const response = await FeedBackApi.getFeedbacksList()
      setFeedbacksList(response.data)
    })()
  }, [])

  useEffect(() => {
    if (evaluateeId !== -1 || evaluatorId !== -1 || eventId !== -1) {
      setDisabledHandleApply(false)
    } else {
      setDisabledHandleApply(true)
    }
  }, [evaluateeId, evaluatorId, eventId])

  // useEffect(() => {
  //   ;(async () => {
  //     const response = await ReportsApi.evaluationPointSumReportList({
  //       ...(eventId && {eventId}),
  //       ...(evaluatorId && {evaluatorId}),
  //       ...(evaluateeId && {evaluateeId}),
  //       page,
  //       pageSize,
  //     })
  //     setEvaluationPointSumReportList(response.data.reportItems)
  //   })()
  // }, [])

  const handleClear = async () => {
    setIsLoading(true)
    setEventId(-1)
    setEvaluatorId(-1)
    setEvaluateeId(-1)
    const response = await ReportsApi.evaluationPointSumReportList({
      page: 1,
      pageSize: 10,
    })
    setRows(response.data.reportItems)
    setLimitData(response.data.totalCount)
    setPage(1)
    setPageSize(10)
    setIsLoading(false)
  }

  const handleApply = async () => {
    setIsLoadingApply(true)
    const response = await ReportsApi.evaluationPointSumReportList({
      ...(eventId && {eventId}),
      ...(evaluatorId && {evaluatorId}),
      ...(evaluateeId && {evaluateeId}),
    })
    setRows(response.data.reportItems)
    setLimitData(response.data.totalCount)
    setIsLoadingApply(false)
  }

  // const [showCertificate, setShowCertificate] = useState(certificateData.isVisible)
  // const {certificateData} = UseCertificateContext()
  // const [openModalCertificate, setOpenModalCertificate] = useState(false)
  // const openCertificates = () => {
  //   if (!showCertificate) {
  //     setShowCertificate(true)
  //   } else {
  //     setShowCertificate(false)
  //   }
  //   setOpenModalCertificate(false)
  // }
  // const closeModalCertificate = () => setOpenModalCertificate(false)
  // if (!showCertificate) {

  // const handleCreateReportTablePDF = async () => {
  //   await ReportsApi.createReportEvaluationPairs({
  //     page,
  //     pageSize,
  //     adminId: -1,
  //     eventId,
  //     evaluateeId,
  //     evaluatorId,
  //   }).then((response: AxiosResponse) => {
  //     const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}))
  //     const link = document.createElement('a')
  //     link.href = url
  //     link.setAttribute('download', 'PairsReportPdf.pdf') //or any other extension
  //     document.body.appendChild(link)
  //     link.click()
  //   })
  // }

  // const handleCreateReportTableCVS = async () => {
  //   if (rows) {
  //     const data: string[][] = [
  //       [
  //         'First name and Last name',
  //         'Hire Date',
  //         'Job Title',
  //         'Salary',
  //         'Score',
  //         'Score %',
  //         'Bonus AMD',
  //       ],
  //     ]
  //
  //     rows.forEach((item) =>
  //       data.push([
  //         item.evaluatorName,
  //         item.dueDate.toString(),
  //         item.evaluateePosition,
  //         `${item.monthlySalary} ${item.currency === 1 ? 'AMD' : 'USD'}`.toString(), //?
  //         (item.sumPoint / item.questionCount).toString().slice(0, 4), //?
  //         (item.sumPoint % item.questionCount).toString().slice(0, 4), //?
  //         item.bonusPercentage,
  //       ]),
  //     )
  //
  //     const csvContent = `data:text/csv;charset=utf-8,${data.map((e) => e.join(',')).join('\n')}`
  //     const encodedUri = encodeURI(csvContent)
  //     const link = document.createElement('a')
  //     link.setAttribute('href', encodedUri)
  //     link.setAttribute('download', 'my_data.csv')
  //     document.body.appendChild(link)
  //     link.click()
  //   }
  // }

  return (
    <Box className="saved-submissions-container">
      <Box className="d-flex height-inherit flex-wrap flex-end">
        <Box className="mr-64 mb-24 width-px-218 autocomplete-style">
          <Box className="d-flex justify-around align-center">
          <SearchIcon />
          <Autocomplete
              size="small"
              fullWidth
              onChange={(e, value)=>setEventId(value ? value.id : 1)}
              options={eventsData.map((item)=>({
                     label:item.name,
                     id: item.id
                 }))}
              className={`${classes.border0}`}
              renderInput={(params) => (<TextField {...params} label="Search by event title" />)}
          />
          </Box>
        </Box>
          <Box className="mr-64 mb-24 width-px-218 autocomplete-style">
              <Box className="d-flex justify-around align-center">
                  <SearchIcon />
                  <Autocomplete
                      size="small"
                      fullWidth
                      onChange={(e, value)=>setEvaluatorId(value ? value.id : 1)}
                      options={nameOfUsers.map((item)=>({
                          label:item.name,
                          id: item.id
                      }))}
                      className={`${classes.border0}`}
                      renderInput={(params) => (<TextField {...params} label="Evaluator" />)}
                  />
              </Box>
          </Box>
          <Box className="mr-64 mb-24 width-px-218 autocomplete-style">
          <Box className="d-flex justify-around align-center">
              <SearchIcon />
              <Autocomplete
                  size="small"
                  fullWidth
                  onChange={(e, value)=>setEvaluateeId(value ? value.id : 1)}
                  options={nameOfUsers.map((item)=>({
                      label:item.name,
                      id: item.id
                  }))}
                  className={`${classes.border0}`}
                  renderInput={(params) => (<TextField {...params} label="Evaluatee" />)}
              />
          </Box>
          </Box>
        <Box className="mr-44 mb-24">
          <Button
            color="blue"
            onClick={() => handleClear()}
            className={`${classesButtons.transparentWithBorderButton} ${classesButtons.width150}`}
          >
            CLEAR
          </Button>
        </Box>
        <Box className="mb-24">
          {!isLoadingApply ? (
            <Button
              color="blue"
              variant="contained"
              disabled={disabledHandleApply}
              onClick={() => handleApply()}
              className={`${classesButtons.colorBlueButton} ${classesButtons.width150}`}
            >
              APPLY
            </Button>
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Box>
      {/*<Box className="mt-26 d-flex">*/}
      {/*  <Box>*/}
      {/*    <Button*/}
      {/*      className={`${classesButtons.exportButton}`}*/}
      {/*      onClick={() => handleCreateReportTablePDF()}*/}
      {/*    >*/}
      {/*      EXPORT AS PDF*/}
      {/*    </Button>*/}
      {/*  </Box>*/}
      {/*  <Box className="ml-10">*/}
      {/*    <Button*/}
      {/*      className={`${classesButtons.exportButton}`}*/}
      {/*      onClick={() => handleCreateReportTableCVS()}*/}
      {/*    >*/}
      {/*      EXPORT AS CSV*/}
      {/*    </Button>*/}
      {/*  </Box>*/}
      {/*</Box>*/}
      <Box className="mt-30">
        {!isLoading && rows && rows.length ? (
          <Box>
            <EnhancedTable table="saved-submissions" rows={rows as unknown as TableArraysType} />
            <PaginationContainer
              limitData={limitData}
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
      {/*<CertificateModal*/}
      {/*  openModal={openModalCertificate}*/}
      {/*  closeModal={closeModalCertificate}*/}
      {/*  openCertificates={openCertificates}*/}
      {/*/>*/}
    </Box>
  )
  // }
  // return (
  //   <div className="saved-submissions-certification">
  //     <WrapperCertificates openCertificates={openCertificates} />
  //   </div>
  // )
}

export default SavedSubmissions
