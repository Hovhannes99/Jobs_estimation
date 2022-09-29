import React from 'react'
import {Box} from '@mui/material'
import CustomTooltip from '../../assets/makeStyles/overFlowTooltip/overFlowTooltip'

const OverflowTooltip = ({children}: {children: string[]}) => (
  <CustomTooltip title={children} arrow placement="top">
    <Box className="over-flow-tooltip">{children}</Box>
  </CustomTooltip>
)

export default OverflowTooltip
