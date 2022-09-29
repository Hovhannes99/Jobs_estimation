import React, {useState} from 'react'
import {Button, ButtonGroup} from '@mui/material'
import clsx from 'clsx'
import useStyles from '../assets/makeStyles/buttons/buttons'

const ButtonDecrementIncrement = () => {
  const classes = useStyles()

  const [counter, setCounter] = useState(0)

  const handleIncrement = () => {
    if (counter < 20) {
      setCounter(counter + 1)
    }
  }

  const handleDecrement = () => {
    if (counter > 0) {
      setCounter(counter - 1)
    }
  }

  return (
    <ButtonGroup
      className={`${classes.buttonDisabled}`}
      size="small"
      aria-label="small outlined button group"
    >
      <Button
        className={`${clsx(classes.decrementIncrementButton, classes.buttonLeftBorder)}`}
        onClick={handleIncrement}
      >
        +
      </Button>
      <Button disabled className={`${classes.decrementIncrementButton} button-disabled`}>
        {counter}
      </Button>
      <Button
        className={`${clsx(classes.decrementIncrementButton, classes.buttonRightBorder)}`}
        onClick={handleDecrement}
      >
        -
      </Button>
    </ButtonGroup>
  )
}

export default ButtonDecrementIncrement
