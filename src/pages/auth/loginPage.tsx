import React, {ChangeEvent, useEffect, useState} from 'react'
import clsx from 'clsx'

import {Checkbox, Box, FormControl, FormControlLabel, TextField} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import Visibility from '@mui/icons-material/Visibility'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import {useNavigate} from 'react-router'
// import {NavLink} from 'react-router-dom'

import AuthBG from '../../assets/images/authBG'
import SignInIllu1 from '../../assets/images/signInIllu1'
import SignInIllu2 from '../../assets/images/signInIllu2'
import useStylesButton from '../../assets/makeStyles/buttons/buttons'
import MakeStyles from '../../assets/makeStyles/makeStyles'
import useStylesTextFields from '../../assets/makeStyles/textFields/textFields'
import AuthenticationsApi from '../../api/authentication'
import {UseUserContext} from '../../context/userContext/userContext'
import {IUserProps} from '../../context/userContext/userContext.props'
import UsersApi from '../../api/users'

const LoginPage = () => {
  const navigate = useNavigate()
  const classesButton = useStylesButton()
  const classesFields = useStylesTextFields()

  const {setUserId, setEmail, setAccessToken, userId, setUserData, accessToken} =
    UseUserContext() as IUserProps

  const classes = MakeStyles()
  const [signInValues, setSignInValues] = useState({
    amount: '',
    email: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })
  const [showError, setShowError] = useState({
    emailError: false,
    passwordError: false,
  })

  const login = async () => {
    if (signInValues.email.length > 4 && signInValues.password.length > 4) {
      const {email} = signInValues
      const {password} = signInValues
      const response = await AuthenticationsApi.logIn({email, password})
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('userId', response.data.userId)

      setEmail(response.data.email)
      setUserId(response.data.userId)
      setAccessToken(response.data.accessToken)

      navigate('/events')
    } else {
      setShowError({
        ...showError,
        emailError: true,
        passwordError: true,
      })
    }
  }

  useEffect(() => {
    ;(async () => {
      if (accessToken) {
        const userData = await UsersApi.userList(userId)

        if (userData) {
          setUserData(userData.data)
        }
      }
    })()
  }, [accessToken])

  const forgotPassword = () => {
    navigate('/forgot-password')
  }

  const handleChange = (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setSignInValues({...signInValues, [prop]: event.target.value})
  }

  const handleClickShowPassword = () => {
    setSignInValues({
      ...signInValues,
      showPassword: !signInValues.showPassword,
    })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
  }

  return (
    <div className="container auth-container">
      <div className="auth-content_wrapper">
        <div className="auth-content_bg">
          <AuthBG />
        </div>
        <div className="auth_content">
          <Stack direction="column">
            <p className="auth_title mt-52">Sign in</p>
            <p className="auth_text">Don&apos;t have an account yet?</p>
            {/*<Box className="mt-4 font-size-16 font-weight-400 line-height-22">*/}
            {/*  <NavLink to="/sign-up">Sign up now</NavLink>*/}
            {/*</Box>*/}
            <TextField
              className={`${classes.marginTop26}`}
              size="small"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(e) => {
                setSignInValues({
                  ...signInValues,
                  email: e.target.value,
                })
              }}
              error={showError.emailError}
            />
            <FormControl size="small" className={`${classes.marginTop26}`} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={signInValues.showPassword ? 'text' : 'password'}
                value={signInValues.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {signInValues.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                error={showError.passwordError}
              />
            </FormControl>
            <FormControlLabel
              className={`${classesFields.checkboxStyle} auth_checkbox`}
              control={<Checkbox />}
              label="Keep me signed in"
            />
            <Button
              color="blue"
              className={`${clsx(classes.marginTop20, classesButton.colorBlueButton)}`}
              variant="contained"
              onClick={login}
            >
              SIGN IN
            </Button>
            <Box className="mt-6">
              <Button
                color="blue"
                onClick={forgotPassword}
                className={`${classesButton.transparentButton}`}
              >
                Forgot Password?{' '}
              </Button>
            </Box>
          </Stack>
        </div>
      </div>
      <div className="auth-image_wrapper">
        <SignInIllu1 />
        <SignInIllu2 />
      </div>
    </div>
  )
}

export default LoginPage
