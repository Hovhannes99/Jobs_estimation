import {Dispatch} from 'react'
import {ISliderStatus} from '../slider/slider'

export interface IEventEvaluatee {
  eventId: number
  userId: number
}

export interface IEventEvaluator {
  eventId: number
  userId: number
}

export interface IQuestionGroupTitle {
  id: number
  applyDefault: boolean
  isDelete: boolean
  questionGroupTitle: string
  ratingCount?: number
  coefficient: number
}

export interface IQuestionsId {
  questionId: number
}

export interface IQuestions {
  id: number
  questionTitle: string
  questionGroupId: number
  questionGroup?: {
    questionGroupTitle: string
    isDelete: boolean
    id: number
  }
  question: {
    coefficient: number
  }
  coefficient: string
  assessmentRating?: string
  isEdit: boolean
}

export interface ICustomNotesQuestion {
  id: number
  questionName: string
  checked: boolean
}

export interface IEventEvaluatorsUser {
  id: number
  eventEvaluatorName: string
  name: string
  position: string
  firstName: string
  email: string
}

export interface IEventEvaluators {
  firstName: string
  eventId: number
  id: number
  user: IEventEvaluatorsUser
  userId: number
}

export interface ISavedSubmissionsOfTable {
  id: number
  eventTitle: string
  evaluators: IEventEvaluators[]
  evaluatees: IEventEvaluators[]
  createdDate: string
  bonusPercentage: string
  evaluateeName: string
  evaluatorName: string
  eventId: number
}

export interface IStep1 {
  error: boolean
  view: boolean
  setNextStep: Dispatch<React.SetStateAction<boolean>>
  clone: boolean
}

export interface ISubmissions {
  status: number
  data: {
    evaluatees: {id: number; firstName: string; position: string}
    evaluators: {id: number; firstName: string; position: string}
    status: number
  }
  id: number
  carouselItems: ISliderStatus
}

export interface ISelectButton {
  onChange?: (a: number) => void
  point?: number
  page?: string
}

export type IUsersOfEvaluator = string
