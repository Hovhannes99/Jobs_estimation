import React from 'react'
import {Box} from '@mui/material'
import WriteYourFeedback from './writeYourFeedback'
import {UseFeedbackContext} from '../../context/feedbackContext/feedbackContext'
import {IFeedbackProps} from '../../context/feedbackContext/feedbackContext.props'
import {UseEvaluationContext} from '../../context/evalaution/evaluationContext'
import {IEvalautionProps} from '../../context/evalaution/evaluationContext.props'

const FeedbacksStep = () => {
  const {positiveFeedback, negativeFeedback, setPositiveFeedback, setNegativeFeedback} =
    UseFeedbackContext() as IFeedbackProps

  const {isNegativeFeedbacks, isPositiveFeedbacks} = UseEvaluationContext() as IEvalautionProps

  const handlePositiveFeedback = (value: string) => {
    setPositiveFeedback([...positiveFeedback, value])
  }

  const handleNegativeFeedback = (value: string) => {
    setNegativeFeedback([...negativeFeedback, value])
  }

  return (
    <Box>
      <Box className="evaluators-step-rating-heading-step-4">
        <Box className="font-weight-600 font-size-16 line-height-22 color-black">Feedback</Box>
        <Box className="mt-12 font-weight-300 font-size-12 font-italic line-height-14">
          Leave feedback for the evaluatee
        </Box>
      </Box>
      <Box className="evaluators-step-rating-body-step-4">
        {isPositiveFeedbacks && (
          <WriteYourFeedback
            feedbackName="Positive Feedback"
            handleFeedback={handlePositiveFeedback}
            handleClearProps={() => setPositiveFeedback([])}
          />
        )}
        <Box className="mt-40">
          {isNegativeFeedbacks && (
            <WriteYourFeedback
              feedbackName="Things To Improve"
              handleFeedback={handleNegativeFeedback}
              handleClearProps={() => setNegativeFeedback([])}
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default FeedbacksStep
