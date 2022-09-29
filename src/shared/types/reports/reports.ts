export interface IReportsFilter {
  page?: number
  pageSize?: number
  userId?: number
  eventId?: number
  questionId?: number
  evaluatorId?: number
  evaluateeId?: number
  startDate?: string | number
  endDate?: string | number
  evaluationType?: number
}

export interface IReportEvaluationPairs {
  page: number
  pageSize: number
  adminId: number
  eventId: number
  evaluatorId: number
  evaluateeId: number
  startDate?: string
  endDate?: string
  evaluationType?: number
}
