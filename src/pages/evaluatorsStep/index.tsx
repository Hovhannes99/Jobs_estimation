import React, {useEffect, useState} from 'react'
import {Box, Button, CircularProgress} from '@mui/material'
import clsx from 'clsx'
import {useSearchParams} from 'react-router-dom'
import moment from 'moment'
import CirclePercent from '../../layouts/circlePercent/circlePercent'
import SuccessModalSecond from '../../layouts/modal/successModalSecond'
import StepperPage from '../../layouts/stepper'
import EvaluatorsStep1 from './evaluatorsStep1'
import FeedbacksStep from './feedbacksStep'
import useStyles from '../../assets/makeStyles/evaluatorsStep/evaluatorsStep'
import MakeStyles from '../../assets/makeStyles/makeStyles'
import EvaluationApi from '../../api/evaluation'
import {UseFeedbackContext} from '../../context/feedbackContext/feedbackContext'
import {IFeedbackProps} from '../../context/feedbackContext/feedbackContext.props'
import {QuestionGroup, IQuestion} from '../../interfaces/evaulateEvent'
import RateSidebar from '../../layouts/rateEvaluateSidebar'
import ErrorModal from '../../layouts/modal/errorModal'
import {UseEvaluationContext} from '../../context/evalaution/evaluationContext'
import {IEvalautionProps} from '../../context/evalaution/evaluationContext.props'
import FeedBackApi from '../../api/feedback'
import useStylesButton from '../../assets/makeStyles/buttons/buttons'

const Index = () => {
  const classesEvaluatorsStep = useStyles()
  const classes = MakeStyles()
  const classesButtons = useStylesButton()

  const [openModalSuccess, setOpenModalSuccess] = useState(false)
  const [donePercent, setDonePercent] = useState(0)

  const {
    setActiveUser,
    activeUser,
    userId,
    evaluatorsStepLength,
    evaluationUser,
    setEvaluationUser,
    setIsNegativeFeedbacks,
    setIsPositiveFeedbacks,
    setScorings,
  } = UseEvaluationContext() as IEvalautionProps

  const [markWithText, setMarkWithText] = useState(false)
  const [step, setStep] = useState(0)
  const [steps, setSteps] = useState<string[] | number[]>([1, 2, 3, 4])
  const [activeStep, setActiveStep] = useState(0)
  const [openModalError, setOpenModalError] = useState(false)
  const [eventError, setEventError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [completed, setCompleted] = useState<{
    [k: number]: boolean
  }>({})

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [disabledSubmitButton, setDisabledSubmitButton] = useState<boolean>(false)
  const [searchParameters] = useSearchParams()
  const [eventData, setEventData] = useState<
    | {
        dueDate: string
        evaluatees: {firstName: string; lastName: string}[]
        questionsGrouped: Record<number, IQuestion[]>
      }
    | undefined
  >()
  const [questionAnswers, setQuestionAnswers] = useState<{
    [k: number]: number
  }>({})
  const handleCloseErrorModal = () => {
    setOpenModalError(false)
  }
  const [questionGroups, setQuestionGroups] = useState<QuestionGroup[]>([])
  const {positiveFeedback, negativeFeedback, setPositiveFeedback, setNegativeFeedback} =
    UseFeedbackContext() as IFeedbackProps

  useEffect(() => {
    // @ts-ignore
    const searchParams = [...searchParameters.entries()]
    setIsLoading(true)
    const eventToken = searchParams.find(([paramName]) => paramName === 'event_token')[1]
    const userToken = searchParams.find(([paramName]) => paramName === 'user_token')[1]
    ;(async () => {
      if (userToken && eventToken) {
        const eventEvaluation = await EvaluationApi.getEventForEvaluation(userToken, eventToken)
        if (eventEvaluation.status === 200) {
          setIsPositiveFeedbacks(eventEvaluation.data.isPositiveFeedbacks)
          setIsNegativeFeedbacks(eventEvaluation.data.isNegativeFeedbacks)
          setScorings(eventEvaluation.data.scorings)
          setEventData({
            ...eventEvaluation.data,
            questionsGrouped: eventEvaluation.data.questions.reduce(
              (acc: Record<number, IQuestion[]>, val: IQuestion) =>
                acc[val.questionGroupId]
                  ? {
                      ...acc,
                      [val.questionGroupId]: [...acc[val.questionGroupId], val],
                    }
                  : {
                      ...acc,
                      [val.questionGroupId]: [val],
                    },
              {},
            ),
          })
          setMarkWithText(eventEvaluation.data.evaluationType === 0)

          if (eventEvaluation.data.evaluationType === 0) {
            setQuestionAnswers(
              Object.fromEntries(
                eventEvaluation.data.questions.map((question: IQuestion) => [
                  question.id,
                  eventEvaluation.data.scorings[0]
                    ? eventEvaluation.data.scorings[0].scoringValue
                    : 1,
                ]),
              ),
            )
          } else {
            setQuestionAnswers(
              Object.fromEntries(
                eventEvaluation.data.questions.map((question: IQuestion) => [question.id, 1]),
              ),
            )
          }
        } else {
          setOpenModalError(true)
          setEventError(true)
          // @ts-ignore
          setErrorMessage(eventEvaluation.response.data.message || '')
        }
        setIsLoading(false)
      }
    })()
    ;(async () => {
      if (userToken && eventToken) {
        const questionGroupsData = await EvaluationApi.getQuestionGroups(userToken, eventToken)
        setQuestionGroups(questionGroupsData.data)
      }
    })()
  }, [searchParameters])

  const handleNext = () => {
    const newCompleted = completed
    newCompleted[activeStep] = true
    setCompleted(newCompleted)
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    const newCompleted = completed
    newCompleted[activeStep] = false
    setCompleted(newCompleted)
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleCloseModal = () => setOpenModalSuccess(false)

  const handleSubmit = async () => {
    try {
      // @ts-ignore
      const searchParams = [...searchParameters.entries()]
      setIsLoading(true)

      const eventToken = searchParams.find(([paramName]) => paramName === 'event_token')[1]
      const userToken = searchParams.find(([paramName]) => paramName === 'user_token')[1]
      const response = await EvaluationApi.saveQuestionGroups({
        eventToken,
        userToken,
        evaluatorId: 0,
        evaluateeId: userId,
        questionPointArr: Object.entries(questionAnswers).map((questionPoints) => ({
          questionId: Number(questionPoints[0]),
          point: Number(questionPoints[1]),
        })),
      })

      if (positiveFeedback.length) {
        await FeedBackApi.saveFeedbackArr({
          eventToken,
          userToken,
          eventId: 0,
          evaluatorId: 0,
          evaluateeId: userId,
          feedbackText: positiveFeedback,
          isPositive: 1,
        })
      }

      if (negativeFeedback.length) {
        await FeedBackApi.saveFeedbackArr({
          eventToken,
          userToken,
          eventId: 0,
          evaluatorId: 0,
          evaluateeId: userId,
          feedbackText: negativeFeedback,
          isPositive: 0,
        })
      }
      if (response.status === 200) {
        setOpenModalSuccess(true)
        setPositiveFeedback([])
        setNegativeFeedback([])

        const eventEvaluation = await EvaluationApi.getEventForEvaluation(userToken, eventToken)
        setQuestionAnswers(
          Object.fromEntries(
            eventEvaluation.data.questions.map((question: IQuestion) => [question.id, 0]),
          ),
        )
        setDonePercent(100 / (evaluatorsStepLength.length + 1 - activeUser))
        if (evaluatorsStepLength.length > activeUser) {
          setActiveUser(activeUser + 1)
          setStep(0)
          setCompleted({})
          setActiveStep(0)
        } else {
          setDisabledSubmitButton(true)
          setActiveUser(activeUser + 1)
          setStep(0)
          setCompleted({})
          setActiveStep(0)
          setEvaluationUser(undefined)
        }
        setIsLoading(false)
      } else {
        setOpenModalError(true)
        setErrorMessage('')
      }
    } catch (e) {
      console.log(e, 'error')
    }
  }

  useEffect(() => {
    if (eventData && !eventData.evaluatees[0]) {
      setEventError(true)
    }
  }, [eventData])

  useEffect(() => {
    if (eventData) {
      setSteps(Object.keys(eventData.questionsGrouped))
    }
  }, [eventData])

  useEffect(() => {
    if (evaluatorsStepLength.length < activeUser) {
      setEventError(true)
    } else {
      setEventError(false)
    }
  }, [activeUser, evaluatorsStepLength])

  return (
    <Box className="evaluators-step-container">
      <RateSidebar />
      <Box className="d-flex align-center flex-wrap">
        <Box className="mr-30 mt-12 font-size-20 font-weight-500 line-height-24">
          {evaluationUser ? (
            evaluationUser.name && `${evaluationUser.name}`
          ) : (
            <Box>There is no Data</Box>
          )}
        </Box>
        {eventData?.dueDate && (
          <Box className="mr-50 mt-12">
            Evaluation due date:{' '}
            <Box component="span" className="bold font-size-18 line-height-22">
              {evaluationUser && moment(eventData.dueDate).format('YYYY-MM-DD')}
            </Box>
          </Box>
        )}
        <Box className="d-flex align-center mr-36 mt-12">
          <CirclePercent percent={Math.floor(donePercent)} width={40} />
          <Box
            className={`ml-16 font-size-12 font-weight-300 line-height-14 font-italic ${classes.colorGray}`}
          >
            {Math.floor(donePercent) <= 0 ? 'Not started yet' : `${Math.floor(donePercent)}% done`}
          </Box>
        </Box>
        {step === 0 && (
          <Box className="mt-12">
            {!isLoading ? (
              <Button
                variant="contained"
                onClick={() => setStep(1)}
                disabled={eventError}
                // className={classes.pickUpButton}
                className={`${classesButtons.colorBlueButton} `}
                color="blue"
              >
                Pick up where you left off{' '}
              </Button>
            ) : (
              <Box className="text-center m-auto w-100">
                <CircularProgress className="pt-12 pb-10" />
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Box className="mt-12 font-size-18 line-height-22 font-weight-400">
        {evaluationUser && evaluationUser.position ? evaluationUser.position : ''}
      </Box>
      {step === 1 && (
        <Box className="mt-60">
          <Box className="width-60 m-auto">
            <StepperPage
              stepperAllActive={false}
              steps={
                eventData?.questionsGrouped
                  ? [...Object.keys(eventData?.questionsGrouped), 'Last']
                  : []
              }
              completed={completed}
              activeStep={activeStep}
            />
          </Box>
          <Box className="mt-50">
            <Box className="evaluators-step-rating-container">
              {eventData?.questionsGrouped &&
                Object.keys(eventData?.questionsGrouped).map(
                  (questionGroupId, index) =>
                    activeStep === index && (
                      <EvaluatorsStep1
                        markWithText={markWithText}
                        questions={eventData.questionsGrouped[questionGroupId as unknown as number]}
                        setQuestionAnswers={(questionId: number, questionValue: number) => {
                          setQuestionAnswers({
                            ...questionAnswers,
                            [questionId]: questionValue,
                          })
                        }}
                        title={
                          questionGroups?.find(
                            (questionGroup) => questionGroup.id === Number(questionGroupId),
                          )?.questionGroupTitle || ''
                        }
                        key={questionGroupId}
                      />
                    ),
                )}
              {activeStep + 1 === steps.length + 1 && <FeedbacksStep />}
              {isLoading ? (
                <Box className="text-center m-auto w-100 evaluators-step-button-container-step-4">
                  <CircularProgress />
                </Box>
              ) : (
                <Box
                  className={`${
                    activeStep + 1 !== steps.length + 1
                      ? 'evaluators-step-button-container'
                      : 'evaluators-step-button-container-step-4'
                  } d-flex`}
                >
                  {activeStep > 0 && (
                    <Box className={`${activeStep === 0 && 'd-none'} mr-46`}>
                      <Button
                        className={clsx(
                          classesButtons.transparentWithBorderButton,
                          // classesEvaluatorsStep.backButton,
                          classesEvaluatorsStep.normalSizeButton,
                        )}
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                    </Box>
                  )}

                  <Button
                    variant="contained"
                    color="blue"
                    size="large"
                    className={`${
                      activeStep === steps.length && classesEvaluatorsStep.displayNone
                    } ${classesButtons.colorBlueButton} ${classesEvaluatorsStep.normalSizeButton}`}
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                  {activeStep + 1 === steps.length + 1 && (
                    <Button
                      onClick={() => handleSubmit()}
                      variant="contained"
                      color="blue"
                      size="large"
                      disabled={disabledSubmitButton}
                      className={`${classesButtons.colorBlueButton} ${classesEvaluatorsStep.normalSizeButton}`}
                    >
                      Submit
                    </Button>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
      <SuccessModalSecond openModal={openModalSuccess} closeModal={handleCloseModal} />
      <ErrorModal
        errorMessage={errorMessage}
        openModal={openModalError}
        closeModal={handleCloseErrorModal}
      />
    </Box>
  )
}

export default Index
