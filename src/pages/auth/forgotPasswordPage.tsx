import React, {useState} from 'react'
import {useNavigate} from 'react-router'
import {Box} from '@mui/material'
import CloseIcon from '../../assets/images/Icons/closeIcon'
import AuthBG from '../../assets/images/authBG'
import PassRecov1 from '../../assets/images/passRecov1'
import PassRecov2 from '../../assets/images/passRecov2'
import PasswordRecoveryDone from './passwordRecoveryDone'
import PasswordRecovery from './passwordRecovery'
import PassRecovDone from '../../assets/images/passRecovDone'

const ForgotPasswordPage = () => {
  const [passwordRecovery, setPasswordRecovery] = useState(false)

  const [passwordIsSuccessfully, setPasswordIsSuccessfully] = useState(false)
  const navigate = useNavigate()

  const handlePasswordIsSuccessfully = () => {
    setPasswordIsSuccessfully(true)
  }

  const signIn = () => {
    setPasswordRecovery(true)
  }

  const handleClose = () => {
    navigate('/sign-in')
  }

  return (
    <div className="container auth-container">
      <div className="auth-content_wrapper">
        <div className="auth-content_bg">
          <AuthBG />
        </div>
        <div className={`${passwordIsSuccessfully ? 'password-is-successfully' : 'auth_content'}`}>
          <div className="auth-close">
            <Box className="cursor-pointer" onClick={handleClose}>
              <CloseIcon />
            </Box>
          </div>
          <div className="forgot-password-container">
            {passwordRecovery ? (
              <PasswordRecoveryDone handlePasswordIsSuccessfully={handlePasswordIsSuccessfully} />
            ) : (
              <PasswordRecovery signIn={signIn} />
            )}
          </div>
        </div>
      </div>
      {passwordRecovery ? (
        <div className="auth-image_wrapper">
          <PassRecovDone />
        </div>
      ) : (
        <div className="auth-image_wrapper">
          <PassRecov1 />
          <PassRecov2 />
        </div>
      )}
    </div>
  )
}

export default ForgotPasswordPage
