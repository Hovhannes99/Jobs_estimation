export interface IQuestion {
  adminId: number
  id: number
  isDelete: boolean
  questionGroupId: number
  questionTitle: string
}
export interface QuestionGroup {
  id: number
  isDelete: boolean
  questionGroupTitle: string
}
