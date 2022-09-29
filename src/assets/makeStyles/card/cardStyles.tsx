import {makeStyles} from '@mui/styles'
import {border, borderRadius, colors, fontSize, margin} from '../../muiVariables'

const CardStyles = makeStyles({
  checkboxStyle: {
    color: colors.black,
    borderRadius: borderRadius.bR2,
  },
  accordionIcon: {
    fontSize: fontSize.fS18,
  },
  accordionDetails: {
    padding: `${margin.m22}  ${margin.m10}  ${margin.m0} ${margin.m12}`,
  },
  accordionHeight: {
    '& .accordion-container': {
      padding: margin.m0,
      height: '30px',
      minHeight: '30px',
    },
  },
  accordionStyle: {
    padding: `${margin.m12}  ${margin.m12}  ${margin.m0} ${margin.m14}`,
    border: border.b0,
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: margin.m0,
      margin: margin.m0,
    },
    '&:before': {
      display: 'none',
    },
  },
})

export default CardStyles
