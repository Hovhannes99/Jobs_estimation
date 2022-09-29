import {OverridableStringUnion} from '@mui/types'
import {TextFieldPropsSizeOverrides} from '@mui/material/TextField/TextField'

export interface ISelect {
  data?: {name: string; id: number}[] | undefined
  value: number | undefined
  handleChange: (value: number) => void
  fontWeight?: number
  border: boolean
  label?: JSX.Element | string
  disabled?: boolean
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>
  defaultValue?: string
}

export interface ISelectDate {
  border: boolean
  label?: string
  disabled: boolean
  applyHandle: (startDate: string, endDate: string) => void
  startDateProps?: string
  endDateProps?: string
  backgroundColor?: string
}
