import {Box} from '@mui/material'
import ProgressBar from 'react-customizable-progressbar'
import React, {useEffect, useState} from 'react'
import MakeStyles from '../../assets/makeStyles/makeStyles'

const CardWithPercent = ({percent}: {percent: number}) => {
  const classes = MakeStyles()

  const [progressPercent] = useState(percent)
  const [progressColor, setProgressColor] = useState('')

  useEffect(() => {
    if (progressPercent >= 70) {
      setProgressColor('#69FF97')
    } else if (progressPercent >= 50) {
      setProgressColor('#FF6B00')
    } else {
      setProgressColor('#5A1A8B')
    }
  }, [])

  const circleProgressBarProps = {
    progress: progressPercent,
    radius: 100,
    strokeColor: progressColor,
    strokeWidth: 50,
    trackStrokeWidth: 50,
  }

  return (
    <Box component="div" className="progress-column">
      <Box component="div" className="progress-bar-circle-container">
        <Box component="span" className={classes.widthPercent50}>
          <ProgressBar {...circleProgressBarProps} strokeLinecap="inherit" />
        </Box>
        <Box component="span">
          <Box component="div" className="bold line-height-44 font-size-36 color-light-black">
            {progressPercent} %
          </Box>
          <Box component="div" className="mt-10 font-size-14 line-height-22 color-light-black">
            In Progress
          </Box>
        </Box>
      </Box>
      <Box className="progress-information-container">
        <Box className="information">Quarterly Development Team Evoluation</Box>
        <Box className="information-start-end font-weight-400 line-height-17">
          <Box component="div">
            Start Date:
            <Box component="span" className="ml-6">
              Oct 15 2020
            </Box>
          </Box>
          <Box component="div" className=" mt-10">
            End Date:
            <Box component="span" className="ml-6">
              Dec 30 2020
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CardWithPercent
