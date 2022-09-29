import React, {useState} from 'react'
import {TextField} from '@mui/material'
import Button from '@mui/material/Button'
import clsx from 'clsx'
import Stack from '@mui/material/Stack'
import useStylesButton from '../../assets/makeStyles/buttons/buttons'
import CheckIcon from '../../assets/images/Icons/checkIcon'
import MakeStyles from '../../assets/makeStyles/makeStyles'

const PasswordRecoveryDone = ({
  handlePasswordIsSuccessfully,
}: {
  handlePasswordIsSuccessfully: () => void
}) => {
  const classes = MakeStyles()
  const classesButtons = useStylesButton()

  const [passwordIsSuccessfullyUpdated, setPasswordIsSuccesfullyUpdated] = useState(false)

  const save = () => {
    setPasswordIsSuccesfullyUpdated(true)
    handlePasswordIsSuccessfully()
  }

  return (
    <div>
      {!passwordIsSuccessfullyUpdated ? (
        <Stack direction="column">
          <p className="auth_title">Password Recovery</p>
          <p className="auth_text">Write your new password</p>
          <TextField
            className={`${classes.marginTop20}`}
            size="small"
            id="outlined-basic"
            label="New Password"
            variant="outlined"
          />
          <div className="line-height-12 font-size-10 font-weight-400 color-light-gray mt-6">
            Password shall be 6+ charachter , 1 capital letter, 1 number
          </div>
          <TextField
            className={`${classes.marginTop10}`}
            size="small"
            id="outlined-basic2"
            label="Confirm password"
            variant="outlined"
          />
          <Button
            color="blue"
            className={`${clsx(classesButtons.colorBlueButton, classes.marginTop35)}`}
            variant="contained"
            onClick={save}
          >
            SAVE
          </Button>
        </Stack>
      ) : (
        <Stack direction="column">
          <p className="auth_title">Password Recovery</p>
          <p className="auth_text">Your password is succesfully updated </p>
          <div className="d-flex justify-center mt-48">
            <CheckIcon />
          </div>
        </Stack>
      )}
    </div>
  )
}

export default PasswordRecoveryDone
