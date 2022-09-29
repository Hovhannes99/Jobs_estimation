import {styled} from '@mui/material/styles'
import Tooltip, {tooltipClasses, TooltipProps} from '@mui/material/Tooltip'
import React from 'react'
import {borderRadius, colors, fontSize, fontWeight, lineHeight, margin} from '../../muiVariables'

const CustomTooltip = styled(({className, ...props}: TooltipProps) => (
  <Tooltip {...props} classes={{popper: className}} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 373,
    background: colors.black,
    borderRadius: borderRadius.bR8,
    padding: margin.m8,
    fontWeight: fontWeight.w500,
    fontSize: fontSize.fSn14,
    lineHeight: lineHeight.lH17,
    color: colors.white,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: colors.blackTooltipArrow,
  },
})

export default CustomTooltip
