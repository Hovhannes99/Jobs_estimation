import {makeStyles} from '@mui/styles'
import {margin} from '../../muiVariables'

const ChartSideBySideBarStyles = makeStyles({
  legendRoot: {
    '& .legend-root': {
      display: 'flex',
      marginTop: margin.m0,
      padding: margin.m0,
      flexDirection: 'row',
    },
  },
  legendLabel: {
    display: 'flex',
    whiteSpace: 'nowrap',
    margin: margin.m0,
  },
})

export default ChartSideBySideBarStyles
