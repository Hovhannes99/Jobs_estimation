import axios from '../axios'
import {IReportEvaluationPairs, IReportsFilter} from '../shared/types/reports/reports'

const evaluationPointSumReportList = async ({
  page,
  pageSize,
  userId,
  eventId,
  evaluatorId,
  evaluateeId,
  startDate,
  endDate,
}: IReportsFilter) => {
  const data = await axios.post(
    'Report/evaluationPointSumReport',
    {
      page,
      pageSize,
      adminId: userId,
      eventId,
      evaluationType: -1,
      evaluatorId,
      evaluateeId,
      startDate,
      endDate,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return data
}

const createCertificate = async ({
  userId,
  totalScore,
  certificateType,
}: {
  userId: number | undefined
  totalScore: string | undefined
  certificateType: number
}) => {
  const data = await axios.get(
    `Report/createCertificate/${userId}/${totalScore}/${certificateType}`,
    {
      responseType: 'blob',
    },
  )
  return data
}

const createReportEvaluationPairs = async (data: IReportEvaluationPairs) => {
  const response = await axios.post(`Report/createReportEvaluationPairs`, data, {
    responseType: 'blob',
  })
  return response
}

const createManualCertificate = async ({
  userName,
  totalScore,
  createDate,
  certificateType,
}: {
  userName: string | undefined
  totalScore: string | undefined
  createDate: string
  certificateType: number
}) => {
  const data = await axios.get(
    `Report/createManualCertificate/${userName}/${totalScore}/${createDate}/${certificateType}`,
    {
      responseType: 'blob',
    },
  )
  return data
}

const evaluationAbsolutePointReportList = async ({
  page,
  pageSize,
  userId,
  eventId,
  questionId,
  evaluationType,
  evaluatorId,
  evaluateeId,
  startDate,
  endDate,
}: IReportsFilter) => {
  const data = await axios.post(
    'Report/evaluationAbsolutePointReport',
    {
      page,
      pageSize,
      adminId: userId,
      eventId,
      questionId,
      evaluatorId,
      evaluateeId,
      evaluationType,
      startDate,
      endDate,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return data
}

const ReportsApi = {
  evaluationPointSumReportList,
  evaluationAbsolutePointReportList,
  createCertificate,
  createManualCertificate,
  createReportEvaluationPairs,
}

export default ReportsApi
