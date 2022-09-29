export interface ITextFieldDate {
  placeholder: string
  border: boolean
  onChange: (newValue: Date | null) => void
  value: Date | null | string
}

export interface ITextFieldSelect {
  fieldNameShow: boolean
  fieldName: string
  fieldLabel: string
  value: undefined | string | number
  handleChange: (id: number) => void
  data?: {name: string; id: number}[]
}
