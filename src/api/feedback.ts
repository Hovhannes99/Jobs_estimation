import axios from '../axios'
import {IFeedback} from '../shared/types/feedback/feedback'

const saveFeedbackArr = async (dataProps: {
  eventToken: string
  userToken: string
  eventId: number
  evaluatorId: number
  evaluateeId: number | undefined
  feedbackText: string[]
  isPositive: number
}) => {
  const data = await axios.post('Feedback/saveFeedbackArr', dataProps)
  return data
}

const filterFeedbacks = async (
  adminId: number,
  eventId: number,
  evaluatorId: number,
  evaluateeId: number,
  isPositive: number,
  page: number,
  pageSize: number,
) => {
  const data = await axios.get(
    `Feedback/filterFeedbacks/${adminId}/${eventId}/${evaluatorId}/${evaluateeId}/${isPositive}/${page}/${pageSize}`,
  )
  return data
}

const getFeedbacksList = async () => {
  const data = await axios.get('Feedback/getFeedbacks')
  return data
}

// TODO: Finish this endpoint
const getFeedbackList = async (id: number) => {
  const data = await axios.get(`Feedback/getFeedback/${id}`)
  return data
}

const createFeedbackArr = async (data: IFeedback) => {
  await axios.post(`Feedback/createFeedbackArr`, data)
}

const createFeedback = async (data: IFeedback) => {
  await axios.post(`Feedback/createFeedback`, data)
}

// TODO: Finish this endpoint
const updateFeedback = async (id: number) => {
  await axios.put(`Feedback/updateFeedback/${id}`)
}

// TODO: Finish this endpoint
const deleteFeedback = async (id: number) => {
  await axios.delete(`Feedback/deleteFeedback/${id}`)
}

const FeedBackApi = {
  getFeedbacksList,
  getFeedbackList,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  createFeedbackArr,
  saveFeedbackArr,
  filterFeedbacks,
}

export default FeedBackApi
