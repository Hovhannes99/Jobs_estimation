import React, {ChangeEvent} from 'react'
import clsx from 'clsx'
import {Box, Checkbox, FormControl, FormControlLabel, TextField} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import {NavLink} from 'react-router-dom'

import AuthBG from '../../assets/images/authBG'
import SignUpIllu1 from '../../assets/images/signUpIllu1'
import SignUpIllu2 from '../../assets/images/signUpIllu2'
import MakeStyles from '../../assets/makeStyles/makeStyles'
import useStylesButton from '../../assets/makeStyles/buttons/buttons'
import useStylesTextFields from '../../assets/makeStyles/textFields/textFields'

const RegisterPage = () => {
  const classesFields = useStylesTextFields()
  const classes = MakeStyles()
  const classesButtons = useStylesButton()
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })

  const handleChange = (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [prop]: event.target.value})
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
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
            <p className="auth_title mt-52">Sign up</p>
            <p className="auth_text">Already have an account?</p>
            <Box className="mt-4 font-size-16 font-weight-400 line-height-22">
              <NavLink to="/sign-in">Sign in</NavLink>
            </Box>
            <TextField
              className={`${classes.marginTop26}`}
              id="outlined-basic"
              label="Name / Surname"
              size="small"
              variant="outlined"
            />
            <TextField
              className={`${classes.marginTop26}`}
              id="outlined-basic2"
              label="Email"
              size="small"
              variant="outlined"
            />
            <FormControl size="small" className={`${classes.marginTop26}`} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControlLabel
              className={`${classesFields.checkboxStyle} auth_checkbox`}
              control={<Checkbox />}
              label="Keep me signed in"
            />
            <Button
              className={`${clsx(classes.marginTop20, classesButtons.colorBlueButton)}`}
              color="blue"
              variant="contained"
            >
              SIGN UP
            </Button>
          </Stack>
        </div>
      </div>
      <div className="auth-image_wrapper">
        <SignUpIllu1 />
        <SignUpIllu2 />
      </div>
    </div>
  )
}

export default RegisterPage
