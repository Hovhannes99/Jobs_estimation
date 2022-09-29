import React, {useState} from 'react'
import clsx from 'clsx'
import {Box, TextField} from '@mui/material'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import {useNavigate} from 'react-router'
import useStylesButton from '../../assets/makeStyles/buttons/buttons'
import MakeStyles from '../../assets/makeStyles/makeStyles'

const PasswordRecovery = ({signIn}: {signIn: () => void}) => {
  const classes = MakeStyles()
  const classesButtons = useStylesButton()

  const [sendLink, setSendLink] = useState(false)
  const navigate = useNavigate()

  const sendMeLink = () => {
    setSendLink(true)
  }

  const handleClose = () => {
    navigate('/sign-in')
  }

  return (
    <div>
      {sendLink ? (
        <Stack direction="column">
          <p className="auth_title">Password Recovery</p>
          <p className="auth_text">We sent you recovery link , check your inbox</p>
          <Box className="d-flex mt-26">
            <Button
              color="blue"
              className={`${classesButtons.transparentWithBorderButton} ${classesButtons.width150}`}
              onClick={handleClose}
            >
              RESEND
            </Button>
            <Box className="ml-42">
              <Button
                color="blue"
                className={`${clsx(classesButtons.colorBlueButton, classesButtons.width150)}`}
                variant="contained"
                onClick={signIn}
              >
                SIGN IN
              </Button>
            </Box>
          </Box>
        </Stack>
      ) : (
        <Stack direction="column">
          <p className="auth_title">Password Recovery</p>
          <p className="auth_text">Write your email , we will send you recovery link</p>
          <TextField
            size="small"
            className={classes.marginTop26}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <Button
            color="blue"
            className={`${clsx(classesButtons.colorBlueButton, classes.marginTop26)}`}
            variant="contained"
            onClick={sendMeLink}
          >
            SEND ME LINK
          </Button>
        </Stack>
      )}
    </div>
  )
}

export default PasswordRecovery
