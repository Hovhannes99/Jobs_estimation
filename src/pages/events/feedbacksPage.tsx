import React, {useEffect, useState} from 'react'
import {Box, Button, CircularProgress} from '@mui/material'
import EnhancedTable from '../../layouts/table/table'
import useStylesButton from '../../assets/makeStyles/buttons/buttons'
import useStylesTextFields from '../../assets/makeStyles/textFields/textFields'
import {UseUserContext} from '../../context/userContext/userContext'
import {IUserProps} from '../../context/userContext/userContext.props'
import SelectField2 from '../../layouts/fields/selectField2'
import FeedBackApi from '../../api/feedback'
import {ITableFeedbacks} from '../../shared/types/table/table'
import UsersApi from '../../api/users'
import PaginationContainer from '../../layouts/pagination/pagination'

const FeedbacksTabs = () => {
  const classesButtons = useStylesButton()
  const classesTextFields = useStylesTextFields()

  const {userId, setUserId} = UseUserContext() as IUserProps

  const [countPagination, setCountPagination] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [rows, setRows] = useState<ITableFeedbacks[]>([])
  const [nameOfUsers, setNameOfUsers] = useState<{name: string; id: number}[]>([])
  const [eventTitleId, setEventTitleId] = useState<number>(-1)
  const [eventTitleData, setEventTitleData] = useState<{name: string; id: number}[]>([])
  const [evaluatorId, setEvaluatorId] = useState<number>(-1)
  const [isPositiveId, setIsPositiveId] = useState<number>(-1)
  const [evaluateeId, setEvaluateeId] = useState<number>(-1)
  const [isPositive, setIsPositive] = useState<number>(-1)
  const [isLoadingApply, setIsLoadingApply] = useState<boolean>(false)
  const [limitData, setLimitData] = useState<number | undefined>()
  const [positiveData] = useState<{name: string; id: number}[]>([
    {name: 'Positive', id: 1},
    {name: 'Negative', id: 2},
  ])

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
    if (!userId) {
      setUserId(Number(localStorage.userId))
    }
  }, [userId])

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const response = await FeedBackApi.filterFeedbacks(
        -1,
        eventTitleId,
        evaluatorId,
        evaluateeId,
        isPositiveId,
        page,
        pageSize,
      )
      const updateEventsTitleData = [
        ...response.data.feedbacks.map((item: {event: {eventTitle: string; id: number}}) => ({
          name: item.event.eventTitle,
          id: item.event.id,
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

      setLimitData(response.data.totalFeedbacksCount)
      setRows(response.data.feedbacks)
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
  }, [pageSize, limitData, page])

  const handleApply = async () => {
    setPage(1)
    setPageSize(10)
    setIsLoadingApply(true)
    const response = await FeedBackApi.filterFeedbacks(
      userId,
      eventTitleId,
      evaluatorId,
      evaluateeId,
      isPositiveId,
      1,
      10,
    )
    setRows(response.data.feedbacks)
    setLimitData(response.data.totalFeedbacksCount)
    setIsLoadingApply(false)
  }

  const handleClear = async () => {
    setEventTitleId(-1)
    setEvaluatorId(-1)
    setEvaluateeId(-1)
    setIsPositive(-1)
    setIsPositiveId(-1)
    setPageSize(10)
    setPage(1)
    setIsLoading(true)
    const response = await FeedBackApi.filterFeedbacks(userId, -1, -1, -1, -1, 1, 10)
    setLimitData(response.data.totalFeedbacksCount)
    setRows(response.data.feedbacks)
    setIsLoading(false)
  }

  const handleChangePositive = (id: number) => {
    setIsPositive(id)
    setIsPositiveId(id === 1 ? id : 0)
  }

  return (
    <Box component="div" className="events-container">
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
            value={evaluateeId}
            handleChange={(id) => setEvaluateeId(id)}
            fontWeight={500}
            border={false}
            label="Evaluatee"
            data={nameOfUsers}
          />
        </Box>
        <Box className={`${classesTextFields.fieldSize190} mt-18 mr-16`}>
          <SelectField2
            value={evaluatorId}
            handleChange={(id) => setEvaluatorId(id)}
            fontWeight={500}
            border={false}
            label="Evaluator"
            data={nameOfUsers}
          />
        </Box>
        <Box className={`${classesTextFields.fieldSize190} mt-18 mr-16`}>
          <SelectField2
            value={isPositive}
            handleChange={handleChangePositive}
            fontWeight={500}
            border={false}
            label="good/bad"
            data={positiveData}
          />
        </Box>
      </Box>
      <Box className="events-container__button-group d-flex justify-end mt-18">
        <Box>
          <Button
            onClick={() => handleClear()}
            color="blue"
            className={`${classesButtons.width128} ${classesButtons.transparentWithBorderButton} `}
          >
            Clear
          </Button>
        </Box>
        <Box className="events-container__button-group__apply">
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
        <Box className="mt-40">
          {!isLoading && rows.length ? (
            <Box>
              <EnhancedTable table="feedbacks" rows={rows} />
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
      </Box>
    </Box>
  )
}

export default FeedbacksTabs
