import React, {createContext, useContext, useState} from 'react'
import {IQuestions, IQuestionsId, IUsersOfEvaluator} from '../../shared/types/events/events'
import {IContextProps, ICreateEventProps} from './createEventContext.props'
import {INameOfUsers} from '../../shared/types'

const CreateEventContext = createContext<ICreateEventProps | null>(null)

const CreateEventPageProvider = ({children}: IContextProps) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [eventTitle, setEventTitle] = useState('')
  const [ratePointFrom, setRatePointFrom] = useState(1)
  const [ratePointTo, setRatePointTo] = useState(10)
  const [eventEvaluatee, setEventEvaluatee] = useState<IUsersOfEvaluator[]>([])
  const [eventEvaluator, setEventEvaluator] = useState<IUsersOfEvaluator[]>([])
  const [questions, setQuestions] = useState<IQuestions[]>([])
  const [questionsId, setQuestionsId] = useState<IQuestionsId[]>([])
  const [bonusPercentage, setBonusPercentage] = useState<number | undefined | null>()
  const [checkedIdOfEvaluator, setCheckedIdOfEvaluator] = useState<{evaluatorId: number}[]>([])
  const [checkedIdOfEvaluatee, setCheckedIdOfEvaluatee] = useState<{evaluateeId: number}[]>([])
  const [deletedSubQuestions, setDeletedSubQuestions] = useState<IQuestions[]>([])
  const [checkedItemOfEvaluatee, setCheckedItemOfEvaluatee] = useState<
    {evaluatorId?: number; evaluateeId: number; userName: string}[]
  >([])
  const [nameOfUsers, setNameOfUsers] = useState<INameOfUsers[]>([])
  const [checkedItemOfEvaluator, setCheckedItemOfEvaluator] = useState<
    {id: number; userName: string; eventId?: number}[]
  >([])
  const [withScores, setWithScores] = useState<boolean>(true)
  const [customNotesQuestion, setCustomNotesQuestion] = useState([
    {
      id: 1,
      questionName: 'Positive Feedback',
      checked: true,
    },
    {
      id: 2,
      questionName: 'Things To Improve',
      checked: true,
    },
  ])
  const [checkedOfEvaluatee, setCheckedOfEvaluatee] = useState<
    {evaluatorId?: number; evaluateeId: number; userName: string}[]
  >([])
  const [buttonsOfValue, setButtonsOfValue] = useState<
    {
      id: string
      scoringName: string
      edit: boolean
      scoringValue: string
    }[]
  >([])

  const [rangesOfvalue, setRangesOfValue] = useState<
    {
      id: string
      bonusRangeFrom: string
      bonusRangeTo: string
      bonusPercentage: string
      bonusRangeName: string
    }[]
  >([])

  const contextValues = React.useMemo(
    () => ({
      startDate,
      setStartDate,
      endDate,
      setEndDate,
      eventTitle,
      setEventTitle,
      ratePointFrom,
      ratePointTo,
      setRatePointFrom,
      setRatePointTo,
      eventEvaluatee,
      setEventEvaluatee,
      buttonsOfValue,
      setButtonsOfValue,
      rangesOfvalue,
      setRangesOfValue,
      eventEvaluator,
      setEventEvaluator,
      questions,
      setQuestions,
      setNameOfUsers,
      nameOfUsers,
      setCheckedIdOfEvaluator,
      setCheckedIdOfEvaluatee,
      checkedIdOfEvaluator,
      checkedIdOfEvaluatee,
      setQuestionsId,
      questionsId,
      checkedItemOfEvaluatee,
      customNotesQuestion,
      setCustomNotesQuestion,
      setCheckedItemOfEvaluatee,
      checkedItemOfEvaluator,
      setCheckedItemOfEvaluator,
      setBonusPercentage,
      deletedSubQuestions,
      setDeletedSubQuestions,
      bonusPercentage,
      withScores,
      setWithScores,
      checkedOfEvaluatee,
      setCheckedOfEvaluatee,
    }),
    [
      checkedOfEvaluatee,
      startDate,
      endDate,
      nameOfUsers,
      eventTitle,
      rangesOfvalue,
      checkedItemOfEvaluator,
      customNotesQuestion,
      checkedItemOfEvaluatee,
      ratePointFrom,
      ratePointTo,
      buttonsOfValue,
      eventEvaluatee,
      eventEvaluator,
      questions,
      withScores,
      questionsId,
      deletedSubQuestions,
    ],
  )

  return <CreateEventContext.Provider value={contextValues}>{children}</CreateEventContext.Provider>
}

export default CreateEventPageProvider
export const UseCreateEventContext = () => useContext(CreateEventContext)
