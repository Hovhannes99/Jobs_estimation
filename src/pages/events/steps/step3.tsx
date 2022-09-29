import React, {Dispatch, useEffect, useState} from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CircularProgress from '@mui/material/CircularProgress'
import {useLocation} from 'react-router'
import AddModal from '../../../layouts/modal/addModal'
import ButtonDropDown from '../../../layouts/tooltip'
import MakeStyles from '../../../assets/makeStyles/makeStyles'
import {UseCreateEventContext} from '../../../context/createEventContext/createEventContext'
import {ICreateEventProps} from '../../../context/createEventContext/createEventContext.props'
import QuestionApi from '../../../api/question'
import {IQuestionGroupTitle, IQuestions} from '../../../shared/types/events/events'
import DeleteIcon from '../../../assets/images/Icons/deleteIcon'
import EventQuestionApi from '../../../api/eventQuestion'
import useStylesTextFields from '../../../assets/makeStyles/textFields/textFields'
import useStylesIcon from '../../../assets/makeStyles/icons/icons'
import useStylesButton from '../../../assets/makeStyles/buttons/buttons'
import AddNewGroupQuestionModal from '../../../layouts/modal/addNewGroupQuestionModal'
import EditIcon from '../../../assets/images/Icons/editIcon_2'

const Step3 = ({
  error,
  setNextStep,
  setIsQuestionsLoading,
  isQuestionsLoading,
  fullQuestions,
  view,
}: {
  error: boolean
  setIsQuestionsLoading: (value: boolean) => void
  setNextStep: Dispatch<React.SetStateAction<boolean>>
  isQuestionsLoading: boolean
  fullQuestions: IQuestions[]
  view: boolean
}) => {
  const stylesIcon = useStylesIcon()
  const classes = MakeStyles()
  const location = useLocation()
  const stateLocation = location.state as {id: number; createNewEvent: boolean}

  const classesTextFields = useStylesTextFields()
  const classesButtons = useStylesButton()

  const [withOutRatingCount, setWithOutRatingCount] = useState<boolean>(true)
  const [questionGroupTitle, setQuestionGroupTitle] = useState<IQuestionGroupTitle[]>([])
  const [questionGroupTitleIsDefault, setQuestionGroupTitleIsDefault] = useState<
    IQuestionGroupTitle[]
  >([])

  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openQuestionGroupModal, setOpenQuestionGroupModal] = useState<boolean>(false)
  // const [successGroupQuestionModal, setSuccessGroupQuestionModal] = useState(false)
  const [errorGroupQuestion, setErrorGroupQuestion] = useState(false)
  const [loadingGroupQuestionModal, setLoadingGroupQuestionModal] = useState(false)
  const {
    setRatePointTo,
    setRatePointFrom,
    setQuestions,
    questions,
    setQuestionsId,
    withScores,
    customNotesQuestion,
    deletedSubQuestions,
    setDeletedSubQuestions,
    setCustomNotesQuestion,
  } = UseCreateEventContext() as ICreateEventProps
  const [allCheckedFeedbacks, setAllCheckedFeedbacks] = useState<boolean>(true)
  const [groupId, setGroupId] = useState<number>(0)
  const [ratingEvaluation, setRatingEvaluation] = useState<number>(0)
  const [groupRatingOfTitle, setGroupRatingOfTitle] = useState<number>(0)
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [questionTitle, setQuestionTitle] = useState('')
  const [ratingOfQuestion, setRatingOfQuestion] = useState('')
  const [questionGroupId, setQuestionGroupId] = useState<number>(0)
  const [questionTitleId, setQuestionTitleId] = useState<number>(0)

  const [ratingScoreRangeData] = useState([
    {
      from: 1,
      to: 10,
    },
  ])

  useEffect(() => {
    ;(async () => {
      setIsQuestionsLoading(true)
      const response = await QuestionApi.getQuestionsGroups()
      setQuestionGroupTitle(
        response.data.map((item: {applyDefault: boolean}) => item.applyDefault && item),
      )
      setQuestionGroupTitleIsDefault(
        response.data
          .filter((item: {applyDefault: boolean}) => !item.applyDefault)
          .map((item: {applyDefault: boolean}) => item),
      )
      if (!stateLocation.createNewEvent) {
        if (!questions.length) {
          const response2 = await EventQuestionApi.getEventQuestionsList(stateLocation.id)
          const updateQuestions = response2.data.map(
            (item: {
              questionId: number
              question: {
                questionTitle: string
                questionGroupId: number
                id: number
                coefficient: number
              }
            }) => ({
              id: item.questionId,
              questionGroupId: item.question.questionGroupId,
              questionTitle: item.question.questionTitle,
              coefficient: item.question.coefficient,
            }),
          )

          setQuestions(updateQuestions)
          setQuestionsId(response2.data.map((item: {id: number}) => item.id))
        }
      } else if (!questions.length) {
        const response2 = await QuestionApi.getQuestionsList()
        setQuestions(response2.data.map((item: IQuestions) => ({...item, isEdit: false})))
        setQuestionsId(response2.data.map((item: {id: number}) => item.id))
      }
      setIsQuestionsLoading(false)
    })()
  }, [])

  const handleCloseAddModal = () => setOpenModalAdd(false)
  const handleCloseAddGroupModal = () => {
    setErrorGroupQuestion(false)
    setOpenQuestionGroupModal(false)
  }

  const ratingScoreRangeHandle = (from: number, to: number) => {
    setRatePointFrom(from)
    setRatePointTo(to)
  }

  // const handleBonusPercentage = (value: string) => {
  //   if (Number(value) <= 100 && Number(value) >= 0) {
  //     setBonusPercentage(Number(value))
  //   }
  // }

  const handleDeleteQuestionGroup = (id: number) => {
    setQuestions(
      questions.filter((item) => {
        if (item.id !== id) {
          return item
        }
        setDeletedSubQuestions([...deletedSubQuestions, item])
        return null
      }),
    )
  }

  const filterItems = (item: IQuestions, questionsItem: IQuestions[]) => {
    const bool = questionsItem.map((obj) => obj.id === item.id)
    return bool.indexOf(true) > -1
  }

  useEffect(() => {
    if (!stateLocation.createNewEvent) {
      const updateDeletedSubQuestions = fullQuestions.filter((item) => {
        if (filterItems(item, questions)) {
          return null
        }
        return item
      })
      setDeletedSubQuestions(updateDeletedSubQuestions)
    }
  }, [questions])

  const handleQuestionsApply = (checkedSubquestions: IQuestions[]) => {
    if (checkedSubquestions) {
      setDeletedSubQuestions([
        ...deletedSubQuestions.filter((item) => !checkedSubquestions.includes(item)),
      ])

      setQuestions([...questions, ...checkedSubquestions.map((item: IQuestions) => item)])
    }
  }

  const handleAddNewSubQuestions = async (subQuestions: string, questionIdGroup: number) => {
    const response = await QuestionApi.createQuestion(subQuestions, questionIdGroup, true)
    setDeletedSubQuestions([response.data, ...deletedSubQuestions])
  }

  const handleAddGroupQuestion = async (value: IQuestionGroupTitle[]) => {
    setLoadingGroupQuestionModal(true)
    setQuestionGroupTitle([...questionGroupTitle, ...value])
    // setSuccessGroupQuestionModal(true)
    setErrorGroupQuestion(false)
    setLoadingGroupQuestionModal(false)
  }

  const handleCheckedCustomNodes = () => {
    const updateCustomNotesQuestion = customNotesQuestion.map((item) => ({
      ...item,
      checked: !allCheckedFeedbacks,
    }))
    setAllCheckedFeedbacks(!allCheckedFeedbacks)
    setCustomNotesQuestion(updateCustomNotesQuestion)
  }

  const handleChangeChecked = (id: number) => {
    const updateCustomNotesQuestion = customNotesQuestion.map((item) => {
      if (id === item.id) {
        return {...item, checked: !item.checked}
      }
      return item
    })

    setCustomNotesQuestion(updateCustomNotesQuestion)
  }
  const updateRating = (id: number, assessmentId: number, value: string) => {
    questionGroupTitle.forEach((group) => {
      if (group.id === id) {
        const result = questions.map((rating) => {
          if (rating.id === assessmentId) {
            return {...rating, coefficient: value}
          }
          return rating
        })
        setQuestions(result)
      }
    })
    setRatingEvaluation(assessmentId)
    setGroupId(id)
  }
  const ratingResult = () => {
    questionGroupTitle.forEach((group) => {
      if (group.id === groupId) {
        const result = questions
          .map((rating) => {
            if (group.id === Number(rating.questionGroupId)) {
              if (rating?.coefficient) {
                if (Number(rating?.coefficient) <= 10 || Number(rating?.coefficient) >= 0)
                  return Number(rating?.coefficient)
              }
            }
            return undefined
          })
          .filter((i) => i !== undefined) as number[]
        const groupRating = result.reduce((p, c) => p + c, 0)
        questions.forEach((item) => {
          if (item.id === ratingEvaluation) {
            setGroupRatingOfTitle(groupRating)
          }
        })
      }
    })
  }
  useEffect(() => {
    ratingResult()
  }, [questions])

  useEffect(() => {
    const groupRating = questionGroupTitle.map((group) => {
      if (group.id === groupId) {
        return {...group, ratingCount: groupRatingOfTitle}
      }
      return group
    })
    setQuestionGroupTitle(groupRating)
  }, [groupRatingOfTitle])

  const handleRatingCount = () => {
    setWithOutRatingCount(!withOutRatingCount)
  }

  // useEffect(() => {
  //   if (!withOutRatingCount) {
  //     const result = questions.map((item) => ({...item, coefficient: '1'}))
  //     setQuestions(result)
  //   }
  // }, [withOutRatingCount])

  useEffect(() => {
    if (questions.length) {
      setNextStep(true)
    } else {
      setNextStep(false)
    }
  }, [questions])

  const editQuestionTitle = (id: number, questionId: number, text: string) => {
    setQuestionTitle(text)
    questionGroupTitle.forEach((group) => {
      if (group.id === id) {
        const result = questions.map((item) => {
          if (item.id === questionId) {
            return {...item, questionTitle: text}
          }
          return item
        })
        setQuestions(result)
      }
    })
  }
  const handleEditTitle = (id: number, questionId: number, edited: boolean) => {
    questionGroupTitle.forEach((group) => {
      if (group.id === id) {
        const result = questions.map((item) => {
          if (item.id === questionId) {
            setRatingOfQuestion(item?.coefficient || '1')
            setIsEdited(!edited)
            setGroupId(id)
            setQuestionGroupId(id)
            setQuestionTitleId(questionId)

            return {...item, isEdit: !edited}
          }
          return {...item, isEdit: false}
        })
        setQuestions(result)
      }
    })
  }

  const changeQuestionTitle = async () => {
    if (!isEdited && questionGroupId !== 0) {
      await QuestionApi.updateQuestion(
        questionTitleId,
        questionTitle,
        ratingOfQuestion,
        questionGroupId,
      )
    }
  }
  useEffect(() => {
    changeQuestionTitle()
  }, [isEdited])

  return (
    <Box>
      <Box className="create-event-of-step-heading">
        <Box className="button-item font-size-18 font-weight-500 d-flex align-center line-height-22 d-flex">
          <Button
            onClick={() => handleRatingCount()}
            variant="contained"
            color="blue"
            disabled={view}
            className={`${classesButtons.colorBlueButton} `}
          >
            {withOutRatingCount ? 'without rating Count' : 'with rating count'}
          </Button>
        </Box>
        <Button
          onClick={() => setOpenQuestionGroupModal(true)}
          variant="contained"
          color="blue"
          disabled={view}
          className={`${classesButtons.colorBlueButton} ${classesButtons.width150}`}
        >
          Add Criteria
        </Button>
        <AddModal openModal={openModalAdd} closeModal={handleCloseAddModal} />
      </Box>
      <Box className="choose-evaluation-criteria-container">
        {isQuestionsLoading && (
          <div className="d-flex justify-center m-auto mt-20">
            <CircularProgress />
          </div>
        )}
        {questionGroupTitle &&
          questionGroupTitle.map(
            (item) =>
              item.applyDefault && (
                <Box key={item.id} className="choose-evaluation-criteria-column mt-14">
                  <Box className="choose-evaluation-criteria">
                    <FormGroup className="choose-evaluation-criteria-group align-center">
                      <Box className="font-size-16 font-weight-700 line-height-22 color-dark-blue">
                        {item.questionGroupTitle}{' '}
                        {withOutRatingCount && (`-${item.ratingCount}` ? item.ratingCount : 0)}
                      </Box>
                      <ButtonDropDown
                        view={view}
                        buttonText="Add sub criteria"
                        tooltip="checkbox"
                        deletedSubQuestions={deletedSubQuestions}
                        handleAddNewSubQuestions={handleAddNewSubQuestions}
                        applyAddFromTo={null}
                        questionGroupId={item.id}
                        handleQuestionsApplyProps={handleQuestionsApply}
                      />
                    </FormGroup>
                    <FormGroup className="choose-evaluation-criteria-group-checkboxes">
                      {questions.map((itemQuestion) => {
                        if (itemQuestion.questionGroupId === item.id) {
                          return (
                            <Box className="checkboxLabel mt-10">
                              <Box className="mr-10 d-flex align-center">
                                <CircleIcon fontSize="small" className={stylesIcon.smallIcon} />
                                {!itemQuestion.isEdit ? (
                                  <Box className="ml-16 color-dark-blue">
                                    {itemQuestion.questionTitle}
                                  </Box>
                                ) : (
                                  <Box className="ml-16 color-dark-blue">
                                    <TextField
                                      className="border-radius-30 background-input text-field"
                                      value={itemQuestion.questionTitle}
                                      onChange={(e) =>
                                        editQuestionTitle(item.id, itemQuestion.id, e.target.value)
                                      }
                                    />
                                  </Box>
                                )}
                              </Box>
                              <Box className="icons-container d-flex justify-end">
                                <Box
                                  className="d-flex justify-end align-center"
                                  minWidth={190}
                                  maxWidth={190}
                                >
                                  {withOutRatingCount && (
                                    <Box className="mr-10">
                                      {!itemQuestion.isEdit ? (
                                        <Box className="ml-16 color-dark-blue square-border">
                                          {itemQuestion.coefficient}
                                        </Box>
                                      ) : (
                                        <TextField
                                          size="small"
                                          disabled={view}
                                          className={`${classesTextFields.numberRemoveArrowUpDown}`}
                                          type="number"
                                          placeholder="0"
                                          value={itemQuestion.coefficient}
                                          InputProps={{inputProps: {min: 0, max: 10}}}
                                          error={
                                            itemQuestion.coefficient
                                              ? Number(itemQuestion.coefficient) > 10 ||
                                                Number(itemQuestion.coefficient) < 0
                                              : false
                                          }
                                          onChange={(e) =>
                                            updateRating(item.id, itemQuestion.id, e.target.value)
                                          }
                                        />
                                      )}
                                    </Box>
                                  )}
                                  <Button
                                    disabled={!stateLocation.createNewEvent || view}
                                    onClick={() => handleDeleteQuestionGroup(itemQuestion.id)}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                  {!itemQuestion.isEdit ? (
                                    <Button
                                      disabled={!stateLocation.createNewEvent || view}
                                      className="cursor-pointer width-20"
                                      onClick={() =>
                                        handleEditTitle(
                                          item.id,
                                          itemQuestion.id,
                                          itemQuestion.isEdit,
                                        )
                                      }
                                    >
                                      <EditIcon />
                                    </Button>
                                  ) : (
                                    <Button
                                      disabled={view}
                                      className="cursor-pointer width-20"
                                      onClick={() =>
                                        handleEditTitle(
                                          item.id,
                                          itemQuestion.id,
                                          itemQuestion.isEdit,
                                        )
                                      }
                                    >
                                      <CheckCircleOutlineIcon />
                                    </Button>
                                  )}
                                </Box>
                              </Box>
                            </Box>
                          )
                        }
                        return null
                      })}
                    </FormGroup>
                  </Box>
                </Box>
              ),
          )}
        <Box key={4} className="choose-evaluation-criteria-column mt-14">
          <Box className="choose-evaluation-criteria">
            <FormGroup className="choose-evaluation-criteria-group align-center">
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    onClick={() => !view && handleCheckedCustomNodes()}
                    className={`${classes.checkboxColor}`}
                    checked={allCheckedFeedbacks}
                  />
                }
                label={
                  <Box className="font-size-16 font-weight-500 line-height-22 color-dark-blue">
                    Custom Notes
                  </Box>
                }
              />
              {/*<ButtonDropDown buttonText="Add" tooltip="checkbox" applyAddFromTo={null} />*/}
            </FormGroup>
            <FormGroup className="choose-evaluation-criteria-group-checkboxes">
              {customNotesQuestion.map((itemQuestion) => (
                <FormControlLabel
                  key={itemQuestion.id}
                  control={
                    <Checkbox
                      defaultChecked
                      color="default"
                      onClick={() => !view && handleChangeChecked(itemQuestion.id)}
                      checked={itemQuestion.checked}
                      className={`${classes.checkboxColor}`}
                    />
                  }
                  label={<Box className="checkboxLabel">{itemQuestion.questionName}</Box>}
                />
              ))}
            </FormGroup>
          </Box>
        </Box>
      </Box>
      <Box className="mt-30">
        {withScores && (
          <Box className="d-flex justify-between width-100">
            <Box className="rating-score-range-container">
              <Box className="create-event-select mt-10">
                <Box className="create-event-select-column">
                  <Box className="font-size-16 font-weight-500 line-height-22 color-black color-dark-blue">
                    Rating Score Range
                  </Box>
                  <Box className=" font-size-14 line-height-22 mt-6 color-light-gray-2">
                    The rating is from the lowest score to the highest
                  </Box>
                  {/*<div>*/}
                  {/*  <ButtonDropDown applyAddFromTo={applyAddFromTo} buttonText="Add" tooltip="radio" />*/}
                  {/*</div>*/}
                </Box>
                <Box className="create-event-select-radio mt-10">
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    {ratingScoreRangeData.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        value={index}
                        onChange={() => ratingScoreRangeHandle(item.from, item.to)}
                        control={
                          <Radio
                            checked
                            // checked={ratePointFrom === item.from && ratePointTo === item.to}
                            color="default"
                            className={`${classes.checkboxColor}`}
                          />
                        }
                        label={
                          <Box>
                            From {item.from} point - to {item.to} points
                          </Box>
                        }
                      />
                    ))}
                  </RadioGroup>
                </Box>
              </Box>
            </Box>
            {/*<Box className="ml-16 create-event-select-container">*/}
            {/*  <Box className="color-black font-size-18 font-weight-500 line-height-22">*/}
            {/*    Select Bonus Percentage*/}
            {/*  </Box>*/}
            {/*  <Box className="font-weight-300 font-italic font-size-12 mt-6 line-height-15">*/}
            {/*    Percentage from monthly salary applies to the highest score*/}
            {/*  </Box>*/}
            {/*  <Box className="create-event-select mt-10">*/}
            {/*    <Box className="create-event-select-column">*/}
            {/*      <Box className="font-size-16 font-weight-500 line-height-22 color-black">*/}
            {/*        Bonus Percentage*/}
            {/*      </Box>*/}
            {/*      /!*<Button*!/*/}
            {/*      /!*  disabled={!bonusPercentage}*!/*/}
            {/*      /!*  className={clsx(classes.colorBlue, classesTextFields.textFieldCalculate)}*!/*/}
            {/*      /!*>*!/*/}
            {/*      /!*  Calculate*!/*/}
            {/*      /!*</Button>*!/*/}
            {/*    </Box>*/}
            {/*    <Box className="create-event-percent-field">*/}
            {/*      <Paper*/}
            {/*        component="form"*/}
            {/*        className="input-field-percent border-color-1 width-px-90"*/}
            {/*      >*/}
            {/*        <InputBase*/}
            {/*          disabled={view}*/}
            {/*          className={`${classesTextFields.numberRemoveArrowUpDown} input-base`}*/}
            {/*          placeholder="0"*/}
            {/*          inputProps={{'aria-label': '0'}}*/}
            {/*          type="number"*/}
            {/*          value={bonusPercentage}*/}
            {/*          onChange={(e) => handleBonusPercentage(e.target.value)}*/}
            {/*        />*/}
            {/*        <IconButton className="icon-button" aria-label="directions">*/}
            {/*          <PercentIcon />*/}
            {/*        </IconButton>*/}
            {/*      </Paper>*/}
            {/*    </Box>*/}
            {/*  </Box>*/}
            {/*</Box>*/}
          </Box>
        )}
      </Box>
      <AddNewGroupQuestionModal
        openModal={openQuestionGroupModal}
        closeModal={handleCloseAddGroupModal}
        handleSaveDetailsProps={handleAddGroupQuestion}
        // successModal={successGroupQuestionModal}
        // setSuccessModal={setSuccessGroupQuestionModal}
        loading={loadingGroupQuestionModal}
        error={errorGroupQuestion}
        data={questionGroupTitleIsDefault}
        setData={setQuestionGroupTitleIsDefault}
      />
      <Box className="color-red mt-20">{error && 'Please fill out required fields'}</Box>
    </Box>
  )
}

export default Step3
