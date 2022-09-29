import {makeStyles} from '@mui/styles'
import {colors, fontSize, fontWeight, margin} from '../../muiVariables'

const useStylesTabs = makeStyles({
  tabButton: {
    padding: `${margin.m22}  ${margin.m10}  ${margin.m20} ${margin.m10}`,
  },
  tabStyle: {
    fontSize: fontSize.fS18,
    color: colors.black,
    marginLeft: margin.m28,
    fontWeight: fontWeight.w400,
    textTransform: 'capitalize',
    lineHeight: margin.m22,
    '& .Mui-selected': {
      fontWeight: 'bold',
      color: colors.black,
    },
    '& div': {
      overflow: 'scroll',
    },
  },
  indicator: {
    background: colors.blue,
    height: '3px',
  },
})

export default useStylesTabs
