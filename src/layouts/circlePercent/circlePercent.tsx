import React from 'react'
import {Box} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

const CirclePercent = ({percent, width}: {percent: number; width: 40 | 17}) => (
  <Box className="percent-container">
    <CircularProgress
      variant="determinate"
      className={`${width === 40 && 'percent-color'} ${width === 17 && 'percent-color-2'}`}
      size={width}
      thickness={4}
      value={100}
    />
    <CircularProgress
      variant="determinate"
      size={width}
      thickness={4}
      className={` ${percent === 30 && 'percent-color-red'} ${
        percent === 50 && 'percent-color-orange'
      } 
        ${percent === 70 && 'percent-color-blue'} ${
        percent === 100 && 'percent-completed'
      } percent`}
      value={percent}
    />
  </Box>
)

export default CirclePercent
