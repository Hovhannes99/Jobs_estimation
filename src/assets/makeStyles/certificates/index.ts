import {makeStyles} from '@mui/styles'
import {colors, fontFamily, fontSize, fontWeight} from '../../muiVariables'

const useCertificateStyles = makeStyles({
  nameField: {
    width: '100%',
    '& label': {
      fontFamily: fontFamily.quicksand,
      fontWeight: fontWeight.w700,
      fontSize: fontSize.fSn14,
    },
  },
  textLabel: {
    fontFamily: fontFamily.quicksand,
    fontWeight: fontWeight.w300,
    fontSize: fontSize.fS10,
    textAlign: 'center',
  },
  width50: {
    width: '50%',
  },
  textLabelGold: {
    width: '100%',
    '& label': {
      width: '100%',
      fontFamily: fontFamily.lato,
      fontSize: fontSize.fS10,
      textAlign: 'center',
    },
  },
  nameFieldRed: {
    fontSize: fontSize.fS18,
    fontFamily: fontFamily.greatVibes,
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
  textLabelRed: {
    fontFamily: fontFamily.oldStandart,
    fontSize: fontSize.fS6,
    color: colors.black,
    fontWeight: fontWeight.w400,
    textAlign: 'center',
  },
})

export default useCertificateStyles
