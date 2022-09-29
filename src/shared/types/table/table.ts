import {Dispatch, Key, SetStateAction} from 'react'
import {IUsers} from '../user/user'
import {IEventEvaluators} from '../events/events'

export interface IEnhancedTableSavedSubmissionsRows {
  admin: string
  adminId: number
  createdDate: string
  dueDate: string
  eventEvaluatees: string[]
  eventEvaluators: string[]
  eventQuestions: string[]
  eventTitle: string
  id: number
  isDelete: boolean
  isPublish: boolean
  ratePointFrom: number
  ratePointTo: number
  startDate: string
}

export interface ITableFeedbacks {
  id: number
  feedbackText: string
  isPositive: boolean
  event: {eventTitle: string}
  evaluatee: {firstName: string}
  evaluator: {firstName: string}
}

export interface IEnhancedTableEventRows {
  admin: {
    firstName: string
    lastName: string
    position: string
    email: string
    password: string
    company: string | null
    companyId: number
    id: number
    isActive: boolean
    isFirstTime: boolean
    profileImg: string | null
    role: number
    saltKey: string
  }
  adminId: number
  createdDate: string
  dueDate: string | null
  eventEvaluatees: [
    {
      eventId: number
      userId: number
      user: string | null
      id: number
    },
  ]
  eventEvaluators: [
    {
      eventId: number
      userId: number
      user: string | null
      id: number
    },
  ]
  eventQuestions: [
    {
      eventId: number
      questionId: number
      question: null | string
      id: number
    },
  ]
  eventTitle: string
  id: number
  isDelete: boolean
  isPublish: boolean
  ratePointFrom: number
  ratePointTo: number
  startDate: string
}

export interface IEnhancedPerformanceReportTableRows {
  id: number
  eventTitle: string
  evaluateeName: string
  evaluatorName: string
  sumPoint: number
  eventEvaluatees: {userId: number}[]
  evaluateePosition: string
  evaluatorPosition: string
  eventEvaluators: {userId: number}[]
  position: string
  eventId: number
  evaluatorId: number
  evaluateeId: number
  dueDate: string
  questionCount: number
  monthlySalary: number
  bonusPercentage: number
  currency: number
}
export interface IEnhancedUsersTableRows {
  id: number
  firstName: string
  email: string
  position: string
  monthlySalary: string
}

export interface IEnhancedTemplatesTableRows {
  createdDate?: string
  id: number
  eventName: string
  date: string
  status: string
  eventTitle: string
  evaluators: IEventEvaluators[]
  evaluatees: IEventEvaluators[]
  admin: IUsers
}

export type TableKeyNumberOrStringType = {[key in Key]: number | string}

export type TableArraysType =
  | Array<IEnhancedTableSavedSubmissionsRows>
  | Array<IEnhancedPerformanceReportTableRows>
  | Array<IEnhancedTableEventRows>
  | Array<IEnhancedUsersTableRows>
  | Array<IEnhancedTemplatesTableRows>
  | Array<ITableFeedbacks>
  | undefined

export type StableSortArrayType =
  | readonly []
  | IEnhancedTableSavedSubmissionsRows[]
  | IEnhancedTableEventRows[]
  | IEnhancedPerformanceReportTableRows[]
  | IEnhancedUsersTableRows[]
  | IEnhancedTemplatesTableRows[]
  | ITableFeedbacks[]

export interface IEnhancedTable {
  table: string
  rows?: TableArraysType | undefined
  setRows?: Dispatch<SetStateAction<TableArraysType>>
}

export type TableOrderType = 'asc' | 'desc'
