import {makeStyles} from '@mui/styles'
import {styled} from '@mui/material/styles'
import TableRow from '@mui/material/TableRow'
import {
  border,
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  lineHeight,
  margin,
  opacity,
} from '../../muiVariables'

export const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F7FBFF',
  },
}))

export const useStylesTable = makeStyles({
  tableHeadEvents: {
    padding: `${margin.m0}  ${margin.m16}  ${margin.m0} ${margin.m16}`,
    height: '40px',
    fontWeight: fontWeight.w700,
    color: colors.black,
    fontSize: fontSize.fSm16,
    lineHeight: lineHeight.lH20,
  },
  tableHead: {
    padding: `${margin.m32} ${margin.m30} ${margin.m6} ${margin.m30}`,
  },
  tableContainer: {
    borderRadius: '20px',
    background: '#FFFFFF',
  },
  tableBodyEvents: {
    padding: `${margin.m16}`,
    height: '40px',
    border: margin.m0,
    fontSize: fontSize.fSn15,
    fontWeight: fontWeight.w400,
    lineHeight: lineHeight.lH17,
    color: colors.sidebarRowSelectedText,
    letterSpacing: '-0.02em',
  },
  tableBodyUsers: {
    borderRight: '1px solid #C4C4C4',
    padding: '11px 48px 9px 22px',
    border: margin.m0,
    fontSize: fontSize.fSn14,
    fontWeight: fontWeight.w400,
    lineHeight: lineHeight.lH17,
    color: opacity.black6,
  },
  tableSavedSubmissionsHead: {
    '& .tableSavedSubmissionsHead:nth-child(1n+2)': {
      padding: `${margin.m12}  ${margin.m16}  ${margin.m12} ${margin.m10}`,
    },
  },
  tableSavedSubmissionsBody: {
    padding: `${margin.m10}  ${margin.m10}  ${margin.m10} ${margin.m10}`,
    borderRight: `${border.b1} solid ${colors.lightGray2}`,
    fontWeight: fontWeight.w400,
    border: margin.m0,
    borderTop: `${border.b1} solid ${colors.lightGray2}`,
    fontSize: fontSize.fSn14,
    lineHeight: lineHeight.lH17,
    color: opacity.black6,
  },
  tablePerformanceReportHead: {
    '& .tablePerformanceReportHead:nth-child(1n+2)': {
      padding: `${margin.m12}  ${margin.m16}  ${margin.m12} ${margin.m10}`,
    },
  },
  tablePerformanceReportBody: {
    padding: `${margin.m0}  ${margin.m2}  ${margin.m0} ${margin.m2}`,
    borderRight: `${border.b1} solid ${colors.lightGray2}`,
    fontWeight: fontWeight.w400,
    border: margin.m0,
    fontSize: fontSize.fSn14,
    lineHeight: lineHeight.lH17,
    color: opacity.black6,
  },
  tableEventsBorderRight: {
    borderRight: `${border.b1} solid ${colors.grayBorders}`,
  },
  tableHeadPaddingLeftRight16: {
    padding: `${margin.m0}  ${margin.m0}  ${margin.m0} ${margin.m0}`,
  },
  tableSavedSubmissionBorderRight: {
    borderRight: `${border.b1} solid ${colors.lightGray2}`,
  },
  checkboxCollapse: {
    color: colors.blue,
    borderRadius: borderRadius.bR2,
  },
  tableTextStyle: {
    fontWeight: fontWeight.w400,
    fontSize: fontSize.fSn14,
    lineHeight: lineHeight.lH16,
    color: opacity.black6,
  },
  tableRowDisFlex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  tableCheckboxContainer: {
    padding: margin.m0,
  },
})
