import React, {Dispatch} from 'react'
import {IEvaluatorsStepLength} from '../../shared/types/sidebar'

export interface IEvalautionProps {
  activeUser: number
  setActiveUser: Dispatch<React.SetStateAction<number>>
  userId: number | undefined
  setUserId: Dispatch<React.SetStateAction<number | undefined>>
  evaluatorsStepLength: IEvaluatorsStepLength[]
  setEvaluatorsStepLength: Dispatch<React.SetStateAction<IEvaluatorsStepLength[]>>
  getEvaluationList: {
    eventId: number
    evaluatee: {firstName: string}
    question: {questionTitle: string}
    point: number
    event: {id: number | undefined}
  }[]
  setGetEvaluationList: Dispatch<
    React.SetStateAction<
      {
        eventId: number
        evaluatee: {firstName: string}
        question: {questionTitle: string}
        point: number
        event: {id: number | undefined}
      }[]
    >
  >
  evaluationPointSumReportList: {
    eventId: number
    evaluateeName: string
    evaluatorName: string
    averagePoint: number
    questionCount: number
    bonusPercentage: number
    sumPoint: number
  }[]
  setEvaluationPointSumReportList: Dispatch<
    React.SetStateAction<
      {
        eventId: number
        evaluateeName: string
        evaluatorName: string
        averagePoint: number
        questionCount: number
        bonusPercentage: number
        sumPoint: number
      }[]
    >
  >
  feedbacksList: {event: {id: number}; evaluatee: {firstName: string}; feedbackText: string}[]
  setFeedbacksList: Dispatch<
    React.SetStateAction<
      {event: {id: number}; evaluatee: {firstName: string}; feedbackText: string}[]
    >
  >
  evaluationUser: IEvaluatorsStepLength | undefined
  setEvaluationUser: Dispatch<React.SetStateAction<IEvaluatorsStepLength | undefined>>
  isPositiveFeedbacks: boolean
  setIsPositiveFeedbacks: Dispatch<React.SetStateAction<boolean>>
  isNegativeFeedbacks: boolean
  setIsNegativeFeedbacks: Dispatch<React.SetStateAction<boolean>>
  scorings: {eventId: number; id: number; scoringName: string; scoringValue: number}[]
  setScorings: Dispatch<
    React.SetStateAction<{eventId: number; id: number; scoringName: string; scoringValue: number}[]>
  >
}

export interface IContextProps {
  children?: JSX.Element | JSX.Element[]
}
