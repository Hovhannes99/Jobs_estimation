import axios from '../axios'
import {IEventEvaluator} from '../shared/types/events/events'

const getEventEvaluatorsList = async (eventId: number | undefined) => {
  const data = await axios.get(`EventEvaluator/getEventEvaluators/${eventId}`)
  return data
}

// TODO: Finish this endpoint
const getEventEvaluatorList = async (id: number) => {
  const data = await axios.get(`EventEvaluator/getEventEvaluator/${id}`)
  return data
}

const createEventEvaluator = async (data: IEventEvaluator) => {
  await axios.post('EventEvaluator/createEventEvaluator', data)
}

const updateEventEvaluator = async (id: number, data: IEventEvaluator) => {
  await axios.put(`EventEvaluator/updateEventEvaluator/${id}`, data)
}

// TODO: Finish this endpoint
const deleteEventEvaluator = async (id: number) => {
  await axios.delete(`EventEvaluator/deleteEventEvaluatee/${id}`)
}

// TODO: Finish this endpoint
const deleteEventEvaluatorByEventId = async (eventId: number) => {
  await axios.delete(`EventEvaluator/deleteEventEvaluatorByEventId/${eventId}`)
}

const EventEvaluatorApi = {
  getEventEvaluatorsList,
  getEventEvaluatorList,
  createEventEvaluator,
  updateEventEvaluator,
  deleteEventEvaluator,
  deleteEventEvaluatorByEventId,
}

export default EventEvaluatorApi
