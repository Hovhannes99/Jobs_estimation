import React, {useEffect, useState} from 'react'
import {Box, Button} from '@mui/material'
import useStylesButton from '../assets/makeStyles/buttons/buttons'
import {ISelectButton} from '../shared/types/events/events'
import {UseEvaluationContext} from '../context/evalaution/evaluationContext'
import {IEvalautionProps} from '../context/evalaution/evaluationContext.props'

const SelectButtonWithText = ({onChange, point, page}: ISelectButton) => {
  const classes = useStylesButton()
  const [buttonActive, setButtonActive] = useState(1)
  const {scorings} = UseEvaluationContext() as IEvalautionProps

  useEffect(() => {
    if (point) {
      setButtonActive(point)
    }
  }, [point])

  return (
    <Box className="d-flex">
      {scorings.map((elem, index) => (
        <Box className="mr-10" key={index + 1}>
          <Button
            onClick={() => {
              if (onChange) {
                onChange(elem.scoringValue)
                setButtonActive(index + 1)
              }
            }}
            disabled={!!page}
            className={`${
              buttonActive === index + 1
                ? classes.colorBlueButton
                : classes.transparentWithBorderButton
            }`}
          >
            {elem.scoringName}
          </Button>
        </Box>
      ))}
    </Box>
  )
}

export default SelectButtonWithText
