export interface IViewForm {
  event: {id: number}
  question: {
    questionTitle: string
    questionGroupId: number
    id: number
  }
  point: number
  id: number
  evaluatees: {id: number}[]
  evaluators: {id: number}[]
}
