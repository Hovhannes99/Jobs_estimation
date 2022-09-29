import {makeStyles} from '@mui/styles'
import {borderRadius, colors, fontSize, fontWeight, lineHeight, margin} from '../../muiVariables'

const useStylesModal = makeStyles({
  colorBlue: {
    color: colors.blue,
  },
  auto: {
    margin: margin.auto,
  },
  checkboxColor: {
    color: colors.checkboxColor,
  },
  modalContainer: {
    width: 400,
    padding: `${margin.m0} ${margin.m24} ${margin.m36} ${margin.m24}`,
    background: colors.white,
    borderRadius: borderRadius.bR4,
  },
  modalCertificateContainer: {
    width: 435,
    background: colors.white,
    borderRadius: borderRadius.bR4,
  },
  modalButtonTextStyle: {
    height: '40px',
    fontWeight: fontWeight.w500,
    fontSize: fontSize.fSn14,
    lineHeight: lineHeight.lH17,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    borderRadius: borderRadius.bR4,
  },
  modalReviewSavedButton: {
    width: '100%',
  },
  modalCertificateButton: {
    width: '272px',
  },
  modalContainerViewForm: {
    width: 300,
    background: colors.white,
    borderRadius: borderRadius.bR12,
    padding: `${margin.m30}  ${margin.m18}  ${margin.m32} ${margin.m18}`,
  },
  modalCheckIcon: {
    width: '58px',
    height: '58px',
  },
  modalSuccessContainer: {
    width: 300,
    background: colors.white,
    borderRadius: borderRadius.bR12,
  },
  styledModal: {
    position: 'fixed',
    zIndex: 1300,
    right: margin.m0,
    bottom: margin.m0,
    top: margin.m0,
    left: margin.m0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default useStylesModal
