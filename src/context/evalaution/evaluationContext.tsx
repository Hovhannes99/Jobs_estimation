import React, {createContext, useContext, useState} from 'react'
import {IContextProps, IEvalautionProps} from './evaluationContext.props'
import {IEvaluatorsStepLength} from '../../shared/types/sidebar'

const EvaluationContext = createContext<IEvalautionProps | null>(null)

const EvalautionPageProvider = ({children}: IContextProps) => {
  const [activeUser, setActiveUser] = useState<number>(1)
  const [userId, setUserId] = useState<number | undefined>(0)
  const [evaluatorsStepLength, setEvaluatorsStepLength] = useState<IEvaluatorsStepLength[]>([])
  const [isPositiveFeedbacks, setIsPositiveFeedbacks] = useState<boolean>(true)
  const [isNegativeFeedbacks, setIsNegativeFeedbacks] = useState<boolean>(true)
  const [scorings, setScorings] = useState<
    {eventId: number; id: number; scoringName: string; scoringValue: number}[]
  >([])

  const [getEvaluationList, setGetEvaluationList] = useState<
    {
      eventId: number
      evaluatee: {firstName: string}
      question: {questionTitle: string}
      point: number
      event: {id: number | undefined}
    }[]
  >([])
  const [evaluationPointSumReportList, setEvaluationPointSumReportList] = useState<
    {
      eventId: number
      evaluateeName: string
      evaluatorName: string
      averagePoint: number
      questionCount: number
      bonusPercentage: number
      sumPoint: number
    }[]
  >([])
  const [feedbacksList, setFeedbacksList] = useState<
    {event: {id: number}; evaluatee: {firstName: string}; feedbackText: string}[]
  >([])
  const [evaluationUser, setEvaluationUser] = useState<IEvaluatorsStepLength | undefined>()

  const contextValues = React.useMemo(
    () => ({
      activeUser,
      setActiveUser,
      userId,
      setUserId,
      evaluatorsStepLength,
      setEvaluatorsStepLength,
      getEvaluationList,
      setGetEvaluationList,
      evaluationPointSumReportList,
      setEvaluationPointSumReportList,
      feedbacksList,
      setFeedbacksList,
      evaluationUser,
      setEvaluationUser,
      setIsNegativeFeedbacks,
      isNegativeFeedbacks,
      isPositiveFeedbacks,
      setIsPositiveFeedbacks,
      scorings,
      setScorings,
    }),
    [
      activeUser,
      userId,
      evaluatorsStepLength,
      getEvaluationList,
      evaluationPointSumReportList,
      evaluationUser,
      isNegativeFeedbacks,
      isPositiveFeedbacks,
      scorings,
    ],
  )

  return <EvaluationContext.Provider value={contextValues}>{children}</EvaluationContext.Provider>
}

export default EvalautionPageProvider
export const UseEvaluationContext = () => useContext(EvaluationContext)
