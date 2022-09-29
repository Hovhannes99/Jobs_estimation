import React, {useEffect, useState} from 'react'
import {Box, Button} from '@mui/material'
import clsx from 'clsx'
import useStylesButton from '../assets/makeStyles/buttons/buttons'
import {ISelectButton} from '../shared/types/events/events'

const SelectButton = ({onChange, point, page}: ISelectButton) => {
  const classes = useStylesButton()
  const buttonLength = 10
  const [buttonActive, setButtonActive] = useState(1)

  useEffect(() => {
    if (point) {
      setButtonActive(point)
    }
  }, [point])

  return (
    <Box>
      {[...Array(buttonLength)].map((elem, index) => (
        <Button
          key={index + 1}
          onClick={() => {
            if (!!page && onChange) {
              onChange(index + 1)
              setButtonActive(index + 1)
            }
          }}
          // disabled={!!page}
          className={` ${
            buttonActive === index + 1
              ? clsx(classes.activeButton, classes.bR100)
              : clsx(classes.selectButton, classes.bR100)
          }`}
        >
          {index + 1}
        </Button>
      ))}
    </Box>
  )
}

export default SelectButton
