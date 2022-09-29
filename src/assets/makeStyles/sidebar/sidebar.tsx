import {makeStyles} from '@mui/styles'
import {fontSize, fontWeight, lineHeight, margin, colors} from '../../muiVariables'

const useStylesSidebar = makeStyles({
  paper: {
    display: 'flex',
    justifyContent: 'space-between',
    background: `${colors.white}`,
  },
  sidebarLogoutButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  sidebarContainer: {
    width: 250,
    flexShrink: 0,
    boxSizing: 'border-box',
    [`& .MuiDrawer-paper`]: {width: 250, boxSizing: 'border-box'},
    '& .Mui-selected': {
      backgroundColor: colors.sidebarRowSelected,
      color: colors.sidebarRowSelectedText,
    },
    '& .MuiButtonBase-root': {
      padding: `${margin.m16}  ${margin.m16}  ${margin.m16} ${margin.m24}`,
    },
  },
  textStyle: {
    fontSize: fontSize.fS18,
    lineHeight: lineHeight.lH22,
    fontWeight: fontWeight.w500,
  },
})

export default useStylesSidebar
