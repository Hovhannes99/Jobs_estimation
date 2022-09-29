import React from 'react'
import {Box} from '@mui/material'
import SelectButton from '../../layouts/selectButton'
import {IQuestion} from '../../interfaces/evaulateEvent'
import SelectButtonWithText from '../../layouts/selectButtonWithText'

const EvaluatorsStep1 = ({
  markWithText,
  questions,
  setQuestionAnswers,
  title,
}: {
  markWithText: boolean
  questions: IQuestion[]
  setQuestionAnswers: (questionId: number, questionValue: number) => void
  title: string
}) => (
  <Box>
    <Box className="evaluators-step-rating-heading">
      <Box className="font-weight-600 font-size-16 color-dark-blue">{title}</Box>
      <Box className="mt-12 font-weight-300 font-size-13 line-height-14  color-dark-blue">
        Read the filters and add the rating for the evaluatee
      </Box>
    </Box>
    <Box className="evaluators-step-rating-body">
      {questions.map((questionsData) => (
        <Box className="mt-18 width-fit-content" key={questionsData.id}>
          <Box className="font-weight-500 color-dark-blue font-size-16 line-height-22">
            {questionsData.questionTitle}
          </Box>
          <Box>
            <Box className="mt-14">
              {markWithText ? (
                <SelectButtonWithText
                  onChange={(rating) => setQuestionAnswers(questionsData.id, rating)}
                />
              ) : (
                <SelectButton onChange={(rating) => setQuestionAnswers(questionsData.id, rating)} />
              )}
            </Box>
            {!markWithText && (
              <Box className="mt-10 font-size-13 color-light-gray2 font-weight-400 line-height-12 align-center d-flex justify-between">
                <Box>Not at all</Box>
                <Box className="ml-10 ">Excellent</Box>
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
)

export default EvaluatorsStep1
