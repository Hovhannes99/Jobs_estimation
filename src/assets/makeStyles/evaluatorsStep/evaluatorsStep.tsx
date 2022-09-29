import {makeStyles} from '@mui/styles'
import {
  border,
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  lineHeight,
  margin,
} from '../../muiVariables'

const useStyles = makeStyles({
  pickUpButton: {
    fontWeight: fontWeight.w400,
    fontSize: fontSize.fSn14,
    borderRadius: borderRadius.bR4,
    textTransform: 'uppercase',
    color: colors.white,
  },
  normalSizeButton: {
    width: '146px',
    height: '40px',
  },
  backButton: {
    border: `${border.b1} solid ${colors.blue}`,
    borderRadius: borderRadius.bR4,
  },
  displayNone: {
    display: 'none',
  },
  clearButton: {
    fontWeight: fontWeight.w400,
    fontSize: fontSize.fSn14,
    marginRight: margin.m8,
    background: colors.white,
    border: `${border.b1} solid ${colors.blue}`,
    borderRadius: borderRadius.bR4,
    color: colors.blackCollapse,
  },
  EditIconSize20: {
    width: '20px',
    height: '20px',
  },
  textFieldWithOutBorder: {
    width: '100%',
    height: '50px',
    display: 'flex',
    border: 0,
    '& div:first-child': {
      width: '100%',
      height: '100%',
      padding: margin.m16,
      fontWeight: fontWeight.w400,
      fontSize: fontSize.fSn14,
      lineHeight: lineHeight.lH27,
      color: colors.blackCollapse,
      background: colors.white,
    },
  },
  ellipseText: {
    maxWidth: '170px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
})

export default useStyles
