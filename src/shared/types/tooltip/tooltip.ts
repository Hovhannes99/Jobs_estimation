import {IQuestions} from '../events/events'

export interface IDropDown {
  view: boolean
  buttonText: string
  tooltip: string
  applyAddFromTo: ((from: number, to: number) => void) | null
  deletedSubQuestions?: IQuestions[]
  questionGroupId?: number
  handleQuestionsApplyProps?: (checkedSubquestions: IQuestions[]) => void
  handleAddNewSubQuestions?: (subQuestions: string, questionGroupId: number) => void
}
