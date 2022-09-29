import axios from '../axios'

const getEventsList = async () => {
  const data = await axios.get('Event/getEvents')
  return data
}

const getFullEventsPairsByAdmin = async (eventId: number, page: number, pageSize: number) => {
  const data = await axios.get(`Event/getFullEventPairsByAdmin/${eventId}/${page}/${pageSize}`)
  return data
}

// TODO: Finish this endpoint
const getFullEventsList = async (page: number, pageSize: number) => {
  const data = await axios.get(`Event/getFullEvents/${page}/${pageSize}`)
  return data
}

// TODO: Finish this endpoint
const getEventsByAdminList = async () => {
  const data = await axios.get(`Event/getEventsByAdmin`)
  return data
}

// TODO: Finish this endpoint
const getFullEventsByAdminList = async (page: number, pageSize: number) => {
  const data = await axios.get(`Event/getFullEventsByAdmin/${page}/${pageSize}`)
  return data
}

const getEvent = async (id: number | string | undefined) => {
  const data = await axios.get(`Event/getEvent/${id}`)
  return data
}

// TODO: Finish this endpoint
const getFullEvent = async (id: number) => {
  const data = await axios.get(`Event/getFullEvent/${id}`)
  return data
}

const createEvent = async (data: {startDate: string; dueDate: string}) => {
  const response = await axios.post('Event/createEvent', data)
  return response
}

const updateEvent = async (id: number | undefined, data: {startDate: string; dueDate: string}) => {
  const response = await axios.put(`Event/updateEvent/${id}`, data)
  return response
}

// TODO: Finish this endpoint
const deleteEvent = async (id: number) => {
  await axios.delete(`Event/deleteEvent/${id}`)
}

const createEventEvaluatorEvaluatees = async (data: {
  eventId: number
  evaluatorEvaluateeArr: {
    evaluatorId?: number
    evaluateeId: number
  }[]
}) => {
  const response = await axios.post(`Event/createEventEvaluatorEvaluatees`, data)
  return response
}
const updateEventEvaluatorEvaluatees = async (data: {
  eventId: number
  evaluatorEvaluateeArr: {
    evaluatorId?: number
    evaluateeId: number
  }[]
}) => {
  const response = await axios.post(`Event/updateEventEvaluatorEvaluatees`, data)
  return response
}

const getEventEvaluatorEvaluatees = async (eventId: number | undefined, evaluatorId: number) => {
  const response = await axios.get(`/Event/getEventEvaluatorEvaluatees/${eventId}/${evaluatorId}`)
  return response
}

const EventsApi = {
  getEventsList,
  getFullEventsList,
  getEventsByAdminList,
  getFullEventsByAdminList,
  getEvent,
  getFullEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getFullEventsPairsByAdmin,
  createEventEvaluatorEvaluatees,
  updateEventEvaluatorEvaluatees,
  getEventEvaluatorEvaluatees,
}

export default EventsApi
