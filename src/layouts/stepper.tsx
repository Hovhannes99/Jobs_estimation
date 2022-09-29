import {styled} from '@mui/material/styles'
import StepConnector, {stepConnectorClasses} from '@mui/material/StepConnector'
import {makeStyles} from '@mui/styles'
import {StepIconProps} from '@mui/material/StepIcon'
import React from 'react'
import {Box, Step, StepLabel, Stepper} from '@mui/material'

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      height: '1px',
      background: 'linear-gradient(254.81deg, #4D5DFB 8.13%, #08C8F6 92.46%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: 'linear-gradient(254.81deg, #4D5DFB 8.13%, #08C8F6 92.46%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 1,
    border: 0,
    backgroundColor: '#BDBDBD',
  },
}))

const useStyles = makeStyles({
  stepCircle: {
    margin: 0,
    padding: 0,
    '& * ': {
      margin: 0,
      padding: 0,
    },
  },
})

const StepperCircleRoot = styled('div')<{
  ownerState: {completed?: boolean; active?: boolean}
}>(({theme, ownerState}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'theme.palette.grey[700]' : 'white',
  zIndex: 1,
  width: 40,
  height: 40,
  display: 'flex',
  border: '2px solid #A3AED0',
  borderRadius: '50%',
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '22px',
  color: '#A3AED0',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    background: 'linear-gradient(254.81deg, #4D5DFB 8.13%, #08C8F6 92.46%)',
    border: '2px solid #0EBFF7',
    color: 'white',
  }),
  ...(ownerState.completed && {
    background: 'linear-gradient(254.81deg, #4D5DFB 8.13%, #08C8F6 92.46%)',
    color: 'white',
    border: '2px solid #0EBFF7',
  }),
}))

const StepperCircle = (props: StepIconProps) => {
  const {active, completed, className, icon} = props
  return (
    <StepperCircleRoot ownerState={{completed, active}} className={className}>
      {icon}
    </StepperCircleRoot>
  )
}

const StepperPage = ({
  steps,
  completed,
  activeStep,
  stepperAllActive,
}: {
  steps: Array<string | number>
  completed: {[k: number]: boolean}
  activeStep: number
  stepperAllActive: boolean
}) => {
  const classes = useStyles()

  return (
    <Box className="m-auto stepper">
      <Stepper connector={<ColorlibConnector />} nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step
            key={label}
            className={classes.stepCircle}
            completed={stepperAllActive || completed[index]}
          >
            <StepLabel StepIconComponent={StepperCircle} />
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

export default StepperPage
