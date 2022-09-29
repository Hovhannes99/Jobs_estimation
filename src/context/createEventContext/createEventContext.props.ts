import React, {Dispatch} from 'react'
import {
  ICustomNotesQuestion,
  IQuestions,
  IQuestionsId,
  IUsersOfEvaluator,
} from '../../shared/types/events/events'
import {INameOfUsers} from '../../shared/types'

export interface ICreateEventProps {
  startDate: string
  setStartDate: Dispatch<React.SetStateAction<string>>
  endDate: string
  setEndDate: Dispatch<React.SetStateAction<string>>
  eventTitle: string
  setEventTitle: Dispatch<React.SetStateAction<string>>
  ratePointTo: number
  setRatePointTo: Dispatch<React.SetStateAction<number>>
  ratePointFrom: number
  setRatePointFrom: Dispatch<React.SetStateAction<number>>
  customNotesQuestion: ICustomNotesQuestion[]
  setCustomNotesQuestion: Dispatch<React.SetStateAction<ICustomNotesQuestion[]>>
  eventEvaluatee: IUsersOfEvaluator[]
  setEventEvaluatee: Dispatch<React.SetStateAction<IUsersOfEvaluator[]>>
  eventEvaluator: IUsersOfEvaluator[]
  setEventEvaluator: Dispatch<React.SetStateAction<IUsersOfEvaluator[]>>
  questions: IQuestions[]
  setQuestions: Dispatch<React.SetStateAction<IQuestions[]>>
  checkedIdOfEvaluator: {evaluatorId: number}[]
  setCheckedIdOfEvaluator: Dispatch<React.SetStateAction<{evaluatorId: number}[]>>
  checkedIdOfEvaluatee: {evaluateeId: number}[]
  setCheckedIdOfEvaluatee: Dispatch<React.SetStateAction<{evaluateeId: number}[]>>
  questionsId: IQuestionsId[]
  setQuestionsId: Dispatch<React.SetStateAction<IQuestionsId[]>>
  checkedItemOfEvaluatee: {evaluateeId: number; userName: string}[]
  setCheckedItemOfEvaluatee: Dispatch<
    React.SetStateAction<{evaluateeId: number; userName: string}[]>
  >
  checkedItemOfEvaluator: {id: number; userName: string; eventId?: number}[]
  setCheckedItemOfEvaluator: Dispatch<
    React.SetStateAction<{id: number; userName: string; eventId?: number}[]>
  >
  bonusPercentage: number | undefined | null
  setBonusPercentage: Dispatch<React.SetStateAction<number | undefined | null>>
  withScores: boolean
  setWithScores: Dispatch<React.SetStateAction<boolean>>
  checkedOfEvaluatee: {evaluatorId?: number; evaluateeId: number; userName: string}[]
  setCheckedOfEvaluatee: Dispatch<
    React.SetStateAction<{evaluatorId?: number; evaluateeId: number; userName: string}[]>
  >
  nameOfUsers: INameOfUsers[]
  setNameOfUsers: Dispatch<React.SetStateAction<INameOfUsers[]>>
  buttonsOfValue: {
    id: string
    scoringName: string
    edit: boolean
    scoringValue: string
  }[]
  setButtonsOfValue: Dispatch<
    React.SetStateAction<
      {
        id: string
        scoringName: string
        edit: boolean
        scoringValue: string
      }[]
    >
  >
  rangesOfvalue: {
    id: string
    bonusRangeFrom: string
    bonusRangeTo: string
    bonusPercentage: string
    bonusRangeName: string
  }[]
  setRangesOfValue: Dispatch<
    React.SetStateAction<
      {
        id: string
        bonusRangeFrom: string
        bonusRangeTo: string
        bonusPercentage: string
        bonusRangeName: string
      }[]
    >
  >
  deletedSubQuestions: IQuestions[]
  setDeletedSubQuestions: Dispatch<React.SetStateAction<IQuestions[]>>
}

export interface IContextProps {
  children?: JSX.Element | JSX.Element[]
}
