import {makeStyles} from '@mui/styles'
import {colors, margin, borderRadius, fontSize} from '../muiVariables'

const MakeStyles = makeStyles({
  colorWhite: {
    color: colors.white,
  },
  lightGray: {
    color: colors.lightGray3,
  },
  w100: {
    width: '100%',
  },
  boxShadowNone: {
    boxShadow: 'inherit',
  },
  marginAuto: {
    margin: margin.auto,
  },
  marginRight20: {
    marginRight: margin.m20,
  },
  marginRight10: {
    marginRight: margin.m10,
  },
  marginTop10: {
    marginTop: margin.m10,
  },
  marginTop20: {
    marginTop: margin.m20,
  },
  padding30: {
    padding: margin.m30,
  },
  size12: {
    fontSize: fontSize.fS12,
  },
  marginTop26: {
    marginTop: margin.m26,
  },
  marginTop35: {
    marginTop: margin.m36,
  },
  widthPercent50: {
    width: '50%',
  },
  BorderRadiusRight0: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  bgWhite: {
    background: colors.white,
  },
  displayNone: {
    display: 'none',
  },
  colorBlue: {
    color: colors.blue,
  },
  checkboxColor: {
    color: colors.checkboxColor,
  },
  colorRed: {
    color: colors.red,
  },
  colorGreen: {
    color: colors.green,
  },
  colorOrange: {
    color: colors.orangePercent,
  },
  bgRed: {
    background: colors.red,
  },
  bgGreen: {
    background: colors.green,
  },
  bgBlue: {
    background: colors.blue,
  },
  bgGreen2: {
    background: colors.lightGreen,
  },
  bgPink: {
    background: colors.pink,
  },
  bgOrange: {
    background: colors.orangePercent,
  },
  colorGray: {
    color: colors.lightGray2,
  },
  textCenter: {
    textAlign: 'center',
  },
  pl0: {
    paddingLeft: margin.m0,
  },
  cardContainer: {
    padding: `${margin.m4}  ${margin.m14}  ${margin.m20} ${margin.m14}`,
  },
  percentFull: {
    borderRadius: `${borderRadius.bR100}`,
  },
  legendRoot: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
  legendLabel: {
    whiteSpace: 'nowrap',
  },
  mAuto: {
    margin: margin.auto,
    textAlign: 'center',
  },
  pLeft16: {
    paddingLeft: margin.m16,
  },
  active: {
    color: '#0056b3',
    fontWeight: 'bolder',
  },
  textFieldStyle: {
    maxWidth: '272px',
    height: '45px',
    '& fieldset': {
      border: ' 1px solid rgba(163, 174, 208, 0.2)',
      boxShadow: '14px 17px 40px 2px rgba(112, 144, 176, 0.04)',
      borderRadius: '30px',
    },
  },
  inputStyle: {
    backgroundColor: '#F4F7FE',
    borderRadius: '30px',
    boxShadow: '14px 17px 40px 2px rgba(112, 144, 176, 0.04)',
    color: 'gray',
    '& fieldset': {
      border: 'none',
    },
    minWidth: '45px',
  },
  backgroundLightGrayInput: {
    '& fieldset': {
      backgroundColor: '#F4F7FE',
    },
  },
  creatEventContainer: {
    width: 'calc(100% - 205px)',
    background: '#FFFFFF',
    borderRadius: '15px',
    margin: '0 auto',
    marginTop: '30px',
    padding: '70px 0 70px 0',
    boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
    '@media (max-width: 1000px)': {
      width: '100%',
    },
  },
  calendarTextField: {
    '& fieldset': {
      borderRadius: '30px',
      borderColor: 'blue',
    },
  },
  textFieldBorderNone: {
    '& fieldset': {
      border: 'none',
    },
  },
})

export default MakeStyles
