import axios from '../axios'
import {ICustomNotesQuestion} from '../shared/types/events/events'

// TODO: Finish this endpoint
const getEventQuestionsList = async (eventId: number) => {
  const data = await axios.get(`EventQuestion/getEventQuestions/${eventId}`)
  return data
}

const getEventQuestionList = async (id: number) => {
  const data = await axios.get(`EventQuestion/getEventQuestion/${id}`)
  return data
}

const createEventQuestion = async (data: {
  eventId: number
  questionId: number
  eventQuestion: ICustomNotesQuestion[]
}) => {
  await axios.post('EventQuestion/createEventQuestion', data)
}

// TODO: Finish this endpoint
const updateEventQuestion = async (id: number, eventQuestion: ICustomNotesQuestion[]) => {
  await axios.put(`EventQuestion/updateEventQuestion/${id}`, eventQuestion)
}

// TODO: Finish this endpoint
const deleteEventQuestion = async (id: number) => {
  await axios.delete(`EventQuestion/deleteEventQuestion/${id}`)
}

// TODO: Finish this endpoint
const deleteEventQuestionByEventId = async (eventId: number) => {
  await axios.delete(`EventQuestion/deleteEventQuestionByEventId/${eventId}`)
}

const EventQuestionApi = {
  getEventQuestionsList,
  getEventQuestionList,
  createEventQuestion,
  updateEventQuestion,
  deleteEventQuestion,
  deleteEventQuestionByEventId,
}

export default EventQuestionApi
