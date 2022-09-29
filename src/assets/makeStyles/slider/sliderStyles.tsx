import {makeStyles} from '@mui/styles'
import {margin, colors} from '../../muiVariables'

const SliderStyles = makeStyles({
  SliderContainer: {
    position: 'relative',
    '& .rec-item-wrapper': {
      justifyContent: 'flex-start',
    },
    '& .rec-slider-container': {
      position: 'relative',
      margin: margin.m0,
    },
  },
  sliderItemsSize288: {
    '& .rec-item-wrapper': {
      height: '350px',
    },
  },
  buttonRight: {
    position: 'absolute',
    right: margin.m0,
    color: colors.lightBlack,
    padding: margin.m0,
    justifyContent: 'flex-end',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  buttonLeft: {
    position: 'absolute',
    left: margin.m0,
    zIndex: 20,
    color: colors.lightBlack,
    padding: margin.m0,
    justifyContent: 'flex-start',
    '&:hover': {
      background: 'none',
    },
  },
  buttonNormal: {
    top: margin.minus10,
  },
  buttonBig: {
    top: margin.minus32,
  },
})

export default SliderStyles
