export interface ICardEvaluator {
  id: number
  cardName: string
  firstName: string
  position: string
  email: string
}
export interface ICardEvaluate {
  id: number
  cardName: string
  position?: string
  monthlySalary?: number
  nameValue: string
}

export interface ICardOfSalary {
  values?: ICardEvaluate
  key: number
  handleChangeName?: (value: string, id: number | undefined) => void
  handleChangePosition?: (value: string, id: number | undefined) => void
  handleChangeDate?: (start: string, end: string, id: number | undefined) => void
  handleChangeMonthlySalary?: (value: number, id: number | undefined) => void
  deleteCard?: (id: number) => void
  handleChange?: (value: string, id: number) => void
  editCard?: boolean
}
