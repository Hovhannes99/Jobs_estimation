import {makeStyles} from '@mui/styles'
import {
  fontSize,
  fontWeight,
  lineHeight,
  margin,
  colors,
  border,
  boxShadow,
  opacity,
  borderRadius,
} from '../../muiVariables'

const UserStyle = makeStyles({
  wrapperUserCardContainer: {
    width: 'calc(100% - 250px)',
    padding: `${(margin.m40, margin.m30, margin.m55, margin.m30)}`,
  },
  wrapperUserCard: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: margin.m55,
    '@media (max-width:780px)': {
      display: 'grid',
      rowGap: '20px',
    },
  },
  userCard: {
    minWidth: '30%',
    paddingTop: margin.m32,
    display: 'inline-block',
    justifyContent: 'center',
    boxShadow: `${boxShadow.bS0} ${boxShadow.bS1} ${boxShadow.bS1} ${opacity.gray06}, ${boxShadow.bS0} ${boxShadow.bS1} ${boxShadow.bS2}
    ${opacity.gray1}`,
  },
  avatar: {
    width: '105px',
    height: '105px',
    margin: margin.auto,
  },
  nameSurname: {
    paddingTop: margin.m20,
    fontSize: fontSize.fS24,
    lineHeight: lineHeight.lH29,
    fontWeight: fontWeight.w700,
    textAlign: 'center',
  },
  btnWrapper: {
    borderTop: `${border.b1} solid ${colors.whiteCalendar}`,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: margin.m32,
    paddingBottom: margin.m24,
  },
  uploadBtn: {
    fontSize: fontSize.fSn14,
    fontWeight: fontWeight.w500,
    letterSpacing: '0.5px',
    position: 'relative',
    textTransform: 'capitalize',
    width: '150px',
    '& .text': {
      color: colors.sidebarRowSelectedText,
      zIndex: 2,
      fontWeight: fontWeight.w400,
      fontSize: fontSize.fS12,
      position: 'absolute',
      top: '-12px',
    },
    '& span': {
      zIndex: 1,
      background: 'linear-gradient(5deg, #D6D8E0 0%, rgba(255, 255, 255, 0.8) 110.84%)',
      border: `${border.b2} solid ${colors.white}`,
      boxShadow: `${boxShadow.bS0} ${boxShadow.bS2} ${boxShadow.bS5} rgba(0, 0, 0, 0.02)`,
      borderRadius: borderRadius.bR10,
      position: 'absolute',
      top: '-12px',
    },
  },
  checkedButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: margin.m24,
    paddingBottom: margin.m34,
  },
  detailsCard: {
    minWidth: '70%',
    boxShadow: `${boxShadow.bS0} ${boxShadow.bS1} ${boxShadow.bS1} ${opacity.gray06}, ${boxShadow.bS0} ${boxShadow.bS1} ${boxShadow.bS2} ${opacity.gray1}`,
    marginLeft: margin.m16,
    '@media (max-width:780px)': {
      display: 'grid',
      marginLeft: margin.m0,
    },
  },
  subtitle: {
    fontSize: fontSize.fSn14,
    color: colors.black,
    fontWeight: fontWeight.w500,
    paddingLeft: margin.m10,
  },
  detailsTitle: {
    fontSize: fontSize.fS18,
    fontWeight: fontWeight.w600,
    margin: `${margin.m26} ${margin.m30} ${margin.m0} ${margin.m44}`,
    paddingBottom: `${margin.m32}`,
    borderBottom: `${border.b1} solid ${colors.grayBorder}`,
    '& .heading': {
      color: colors.sidebarRowSelectedText,
    },
    '@media (max-width: 1024px)': {
      display: 'grid',
      justifyContent: 'center',
      rowGap: '10px',
      alignItems: 'center',
    },
  },
  fieldContainer: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridColumnGap: margin.m40,
    gridRowGap: margin.m40,
    padding: `${margin.m26} ${margin.m30} ${margin.m32} ${margin.m44}`,
    '@media (max-width: 1024px)': {
      gridTemplateColumns: 'auto',
    },
  },
  btnSaveWrapper: {
    borderTop: `${border.b1} solid ${colors.whiteCalendar}`,
    display: 'flex',
    justifyContent: 'end',
    paddingTop: margin.m34,
    paddingBottom: margin.m24,
    paddingRight: margin.m24,
  },
})

export default UserStyle
