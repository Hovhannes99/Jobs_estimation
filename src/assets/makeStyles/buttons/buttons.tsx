import {makeStyles} from '@mui/styles'
import {
  borderRadius,
  fontWeight,
  lineHeight,
  colors,
  fontSize,
  border,
  margin,
} from '../../muiVariables'

const useStylesButton = makeStyles({
  width128: {
    width: '128px',
  },
  width150: {
    width: '150px',
    borderRadius: borderRadius.bR4,
  },
  width174: {
    width: '174px',
  },
  width190: {
    width: '190px',
  },
  colorGrey: {
    color: 'gray',
    '& button': {
      color: 'gray',
    },
  },
  sidebarButton: {
    width: '183px',
    height: '45px',
    fontSize: fontSize.fSn14,
    lineHeight: '112%',
    background: 'linear-gradient(254.81deg, #4D5DFB 8.13%, #08C8F6 92.46%)',
    borderRadius: borderRadius.bR30,
  },
  colorBlueButton: {
    height: '45px',
    fontSize: fontSize.fSn14,
    fontWeight: fontWeight.w500,
    lineHeight: lineHeight.lH17,
    color: colors.white,
    letterSpacing: '0.5px',
    borderRadius: borderRadius.bR30,
    background: 'linear-gradient(254.81deg, #4D5DFB 8.13%, #08C8F6 92.46%)',
  },
  widthPercent100: {
    width: '100%',
  },
  transparentButton: {
    width: 'fit-content',
    fontSize: fontSize.fSm16,
    fontWeight: fontWeight.w400,
    color: colors.blueLight,
    textTransform: 'capitalize',
    letterSpacing: '0.5px',
  },
  transparentWithBorderButton: {
    height: '45px',
    fontSize: fontSize.fSn14,
    fontWeight: fontWeight.w500,
    lineHeight: lineHeight.lH17,
    color: colors.blue,
    letterSpacing: '0.5px',
    borderRadius: borderRadius.bR30,
    textTransform: 'capitalize',
    border: `${border.b1} solid ${colors.blue}`,
  },
  buttonPaddingNormal: {
    padding: `${margin.m14}  ${margin.m18}  ${margin.m12} ${margin.m18}`,
  },
  countButton: {
    '& button': {
      border: border.b0,
    },
  },
  decrementIncrementButton: {
    fontWeight: fontWeight.w500,
    fontSize: fontSize.fS18,
    border: border.b0,
    color: colors.borderBox,
    borderLeft: `${border.b1} solid ${colors.borderBox}`,
    lineHeight: lineHeight.lH22,
  },
  buttonLeftBorder: {
    borderLeft: `${border.b2} solid ${colors.borderBox}`,
    padding: margin.m0,
  },
  buttonRightBorder: {
    borderRight: `${border.b2} solid ${colors.borderBox}`,
    padding: margin.m0,
  },
  buttonDisabled: {
    borderTop: `${border.b2} solid ${colors.borderBox}`,
    borderBottom: `${border.b2} solid ${colors.borderBox}`,
    '& .button-disabled': {
      borderTop: border.b0,
      borderBottom: border.b0,
    },
  },
  buttonBorderLeft0: {
    borderTopLeftRadius: borderRadius.bR0,
    borderBottomLeftRadius: borderRadius.bR0,
    width: 128,
    height: 40,
  },
  exportButton: {
    border: `${border.b1} solid ${colors.blue}`,
    borderRadius: borderRadius.bR30,
    color: colors.lightGray3,
    fontWeight: fontWeight.w500,
    fontSize: fontSize.fSn14,
    lineHeight: lineHeight.lH17,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    padding: `${margin.m14}  ${margin.m18}  ${margin.m12} ${margin.m18}`,
  },
  getCertificateButton: {
    border: `${border.b1} solid ${colors.blue}`,
    borderRadius: borderRadius.bR30,
    color: colors.white,
    fontWeight: fontWeight.w500,
    fontSize: fontSize.fSn14,
    lineHeight: lineHeight.lH17,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    background: 'linear-gradient(254.81deg, #4D5DFB 8.13%, #08C8F6 92.46%)',
    padding: `${margin.m14}  ${margin.m18}  ${margin.m12} ${margin.m18}`,
  },
  activeButton: {
    minWidth: '40px',
    height: '40px',
    background: colors.blue,
    marginRight: margin.m6,
    fontWeight: fontWeight.w500,
    fontSize: fontSize.fS18,
    lineHeight: lineHeight.lH22,
    color: colors.white,
    '&:hover': {
      background: colors.white,
      color: colors.blue,
      border: `${border.b2} solid ${colors.blue}`,
    },
  },
  bR100: {
    borderRadius: borderRadius.bR100,
  },
  selectButton: {
    border: `${border.b2} solid ${colors.grayBorders}`,
    minWidth: '40px',
    height: '40px',
    // borderRadius: borderRadius.bR100,
    marginRight: margin.m6,
    fontSize: fontSize.fS18,
    lineHeight: lineHeight.lH22,
    fontWeight: fontWeight.w500,
    color: colors.grayBorders,
    '&:hover': {
      background: colors.white,
      color: colors.blue,
      border: `${border.b2} solid ${colors.blue}`,
    },
  },
  styleOfButtonWithoutColor: {
    fontSize: fontSize.fSm16,
    fontWeight: fontWeight.w400,
    color: colors.lightGray3,
    textTransform: 'capitalize',
  },
})

export default useStylesButton
