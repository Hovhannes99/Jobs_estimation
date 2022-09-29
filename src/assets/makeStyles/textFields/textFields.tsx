import {makeStyles} from '@mui/styles'
import {
  fontSize,
  fontWeight,
  lineHeight,
  margin,
  colors,
  border,
  borderRadius,
  opacity,
} from '../../muiVariables'

const useStylesTextFields = makeStyles({
  textField: {
    fontSize: fontSize.fSn14,
    fontWeight: fontWeight.w400,
    color: colors.lightGray,
    background: colors.white,
    '& fieldset': {
      border: `${border.b1} solid ${colors.borderBox}`,
    },
  },
  textFieldLong: {
    width: '100%',
    height: '40px',
  },
  textFieldEvaluator: {
    width: '100%',
    height: '40px',
    background: colors.white,
    border: `${border.b1} solid ${colors.borderBox}`,
    borderRadius: borderRadius.bR2,
  },
  numberRemoveArrowUpDown: {
    '& input[type=number]': {
      '-moz-appearance': 'textField',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
    },
  },
  textFieldCalculate: {
    '&:disabled': {
      color: opacity.blue5,
    },
  },
  checkboxStyle: {
    fontSize: fontSize.fSn14,
    fontWeight: fontWeight.w400,
    lineHeight: lineHeight.lH17,
    color: colors.lightGray,
  },
  checkboxStyle2: {
    fontSize: fontSize.fSn14,
    fontWeight: fontWeight.w400,
    lineHeight: lineHeight.lH22,
    color: colors.black,
  },
  textFieldSmall20: {
    width: '20px',
    marginLeft: margin.m6,
    marginRight: margin.m6,
  },
  checkboxDisabledShowLabel: {
    '& span': {
      display: 'block',
    },
  },
  fieldSize176: {
    width: '176px',
  },
  fieldSize190: {
    width: '190px',
  },
  selectFieldLabel: {
    fontSize: fontSize.fSn14,
    fontWeight: fontWeight.w500,
    lineHeight: lineHeight.lH17,
    letterSpacing: '0.5px',
    color: colors.lightBlack,
  },
  textFieldLabel: {
    width: '100%',
    height: '40px',
    color: colors.lightBlack,
    fontSize: fontSize.fS13,
    fontWeight: fontWeight.w400,
    lineHeight: lineHeight.lH17,
  },
  textFieldLabel2: {
    width: '100%',
    color: colors.lightBlack,
    fontSize: fontSize.fS13,
    fontWeight: fontWeight.w500,
    lineHeight: lineHeight.lH17,
  },
  textFieldItems: {
    color: colors.lightGray,
    fontSize: fontSize.fS13,
    fontWeight: fontWeight.w400,
  },
  selectContainer: {
    background: '#FFFFFF',
    boxShadow: '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
    borderRadius: '30px',
    width: '100%',
    border: margin.m0,
    marginTop: margin.m0,
    marginBottom: margin.m0,
    '& label': {
      width: '100%',
    },
    '& fieldset': {
      borderRadius: '30px',
      background: '#FFFFFF',
      height: '45px',
    },
    '& >div': {
      '& >div': {
        zIndex: 1,
      },
    },
  },
  border0: {
    '& fieldset': {
      border: margin.m0,
    },
  },
  border1: {
    '& fieldset': {
      border: `${border.b1} solid ${colors.grayBorders2}`,
    },
  },
  textFieldStyle: {
    width: '247px',
    borderRadius: borderRadius.bR2,
    fontSize: fontSize.fSn14,
    lineHeight: lineHeight.lH17,
    color: opacity.black6,
  },
  borderNone: {
    border: border.b0,
  },
  datePickerWithBorder: {
    border: `${border.b1} solid ${colors.grayBorders2}`,
  },
  datePicker: {
    background: colors.white,
    borderRadius: borderRadius.bR2,
    fontSize: fontSize.fSn14,
    fontWeight: fontWeight.w400,
    lineHeight: lineHeight.lH17,
    color: opacity.black6,
    '& fieldset': {
      borderRadius: borderRadius.bR2,
      border: border.b0,
    },
  },
})

export default useStylesTextFields
