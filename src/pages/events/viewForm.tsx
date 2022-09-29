import React, {useEffect, useState} from 'react'
import {Box, Button, CircularProgress} from '@mui/material'
import {useLocation} from 'react-router'
import {Link} from 'react-router-dom'
import SelectButton from '../../layouts/selectButton'
import StepperPage from '../../layouts/stepper'
import useStylesButton from '../../assets/makeStyles/buttons/buttons'
// import CirclePercent from '../../layouts/circlePercent/circlePercent'
import {QuestionGroup} from '../../interfaces/evaulateEvent'
import QuestionApi from '../../api/question'
import useStyles from '../../assets/makeStyles/evaluatorsStep/evaluatorsStep'
import {TypeLocationState} from '../../shared/types/location/location'
import {IViewForm} from '../../shared/types/viewForm/viewForm'
import EvaluationApi from '../../api/evaluation'

const ViewForm = () => {
  const location = useLocation()
  const classesEvaluatorsStep = useStyles()

  const {id, adminId, eventPairModelOut} = location.state as TypeLocationState
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [questionGroups, setQuestionGroups] = useState<QuestionGroup[]>([])
  const [subQuestions, setSubQuestions] = useState<IViewForm[]>([])
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState<{
    [k: number]: boolean
  }>({})

  const [buttonNextDisabled, setButtonNextDisabled] = useState<boolean>(true)

  const classesButton = useStylesButton()

  const [stepperAllActive] = useState(false)

  const [steps, setSteps] = useState<string[] | number[]>([1, 2, 3])

  const [stepsPairModelOut, setStepsPairModelOut] = useState<number>(0)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const questionGroupsData = await QuestionApi.getQuestionsGroups()
      setQuestionGroups(questionGroupsData.data)

      const response = await EvaluationApi.filterEvaluations(
        adminId,
        id,
        -1,
        -1,
        eventPairModelOut[stepsPairModelOut].evaluatees.id,
      )
      setSubQuestions(response.data)
      setIsLoading(false)
    })()
  }, [])

  useEffect(() => {
    if (!subQuestions || !subQuestions.length) {
      setButtonNextDisabled(true)
    } else {
      setButtonNextDisabled(false)
    }
  }, [subQuestions, questionGroups])

  useEffect(() => {
    if (questionGroups) {
      setSteps(Object.keys(questionGroups))
    }
  }, [questionGroups])

  const handleBack = () => {
    const newCompleted = completed
    newCompleted[activeStep] = false
    setCompleted(newCompleted)
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleNext = () => {
    const newCompleted = completed
    newCompleted[activeStep] = true
    setCompleted(newCompleted)
    setActiveStep(activeStep + 1)
    setStepsPairModelOut(stepsPairModelOut + 1)
  }

  useEffect(() => {
    const updateQuestionGroups =
      questionGroups &&
      subQuestions &&
      questionGroups
        .filter((item) =>
          subQuestions.some((item2) => {
            if (item.id === item2.question.questionGroupId) {
              return true
            }
            return false
          }),
        )
        .map((item) => item)
    setQuestionGroups(updateQuestionGroups)
  }, [subQuestions])

  return (
    <Box className="submission-view-form-page">
      <Box className="d-flex color-dark-blue font-weight-400 font-size-18">
        <Box>
          <Link className="text-decoration-none color-dark-blue" to="/events">
            Events /
          </Link>
          <Link
            className="text-decoration-none color-dark-blue"
            to={{
              pathname: '/events',
              search: '?fromViewForm',
            }}
          >
            {' '}
            Submissions /
          </Link>
          <Box component="span" className="bold">
            {' '}
            View Form
          </Box>
        </Box>
      </Box>
      <Box className="submission-view-form-container">
        {steps && !steps.length && 'There is not data'}
        <StepperPage
          steps={steps || []}
          activeStep={activeStep}
          completed={completed}
          stepperAllActive={stepperAllActive}
        />
        {questionGroups &&
          questionGroups.map(
            (item, index) =>
              index === activeStep && (
                <Box className="bg-white mt-30 b-radius-10">
                  <Box className="view-form-heading-checkbox color-dark-blue">
                    <Box className="font-weight-700 font-size-16 line-height-22">
                      {item.questionGroupTitle}
                    </Box>
                    <Box className="font-weight-400 mt-12 font-size-15 line-height-20 d-flex align-center">
                      <Box>You can choose which score include in the report</Box>
                    </Box>
                  </Box>
                  <Box className="view-form-body-container">
                    {isLoading && (
                      <Box className="w-100 text-center">
                        <CircularProgress />
                      </Box>
                    )}
                    {subQuestions &&
                      subQuestions.map(
                        (item2) =>
                          item2.question.questionGroupId === item.id && (
                            <Box className="width-fit-content mt-18">
                              <Box className="mt-10 color-dark-blue">
                                {item2.question.questionTitle}
                                <Box className="mt-20">
                                  <SelectButton page="view-form" point={item2.point} />
                                </Box>
                                <Box className="mt-10 font-size-13 color-light-gray2 font-weight-400 line-height-12 align-center d-flex justify-between">
                                  <Box>Not at all</Box>
                                  <Box>Excellent</Box>
                                </Box>
                              </Box>
                            </Box>
                          ),
                      )}
                    {!isLoading && buttonNextDisabled && (
                      <Box className="width-100 text-center mt-18">There is not data</Box>
                    )}
                  </Box>
                  <Box className="d-flex justify-center view-form-button-container">
                    {activeStep > 0 && (
                      <Box className="mr-46 mt-10">
                        <Button
                          color="blue"
                          className={`${classesButton.transparentWithBorderButton} ${classesButton.width150}`}
                          size="large"
                          onClick={handleBack}
                        >
                          Back
                        </Button>
                      </Box>
                    )}
                    <Box className="mr-46 mt-10">
                      <Button
                        color="blue"
                        size="large"
                        disabled={buttonNextDisabled}
                        onClick={handleNext}
                        className={`${classesButton.transparentWithBorderButton} ${
                          classesButton.width150
                        } ${activeStep === steps.length - 1 && classesEvaluatorsStep.displayNone} ${
                          classesEvaluatorsStep.normalSizeButton
                        }`}
                      >
                        Next
                      </Button>
                    </Box>
                    {/*<Box className="mt-10">*/}
                    {/*<Button*/}
                    {/*  onClick={() => setOpenModalAdd(true)}*/}
                    {/*  variant="contained"*/}
                    {/*  className={`${classesButton.colorBlueButton}`}*/}
                    {/*  color="blue"*/}
                    {/*  size="large"*/}
                    {/*>*/}
                    {/*  ADD TO SAVED SUBMISSIONS*/}
                    {/*</Button>*/}
                    {/*<SavedModal openModal={openModalAdd} closeModal={handleCloseModal} />*/}
                    {/*</Box>*/}
                  </Box>
                </Box>
              ),
          )}
      </Box>
    </Box>
  )
}
export default ViewForm
