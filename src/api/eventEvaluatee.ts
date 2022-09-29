import axios from '../axios'
import {IEventEvaluatee} from '../shared/types/events/events'

const getEventEvaluateesList = async (eventId: number | undefined) => {
  const data = await axios.get(`EventEvaluatee/getEventEvaluatees/${eventId}`)
  return data
}

// TODO: Finish this endpoint
const getEventEvaluateeList = async (id: number) => {
  const data = await axios.get(`EventEvaluatee/getEventEvaluatee/${id}`)
  return data
}

const createEventEvaluatee = async (data: IEventEvaluatee) => {
  await axios.post('EventEvaluatee/createEventEvaluatee', data)
}

const updateEventEvaluatee = async (id: number, data: IEventEvaluatee) => {
  await axios.put(`EventEvaluatee/updateEventEvaluatee/${id}`, data)
}

// TODO: Finish this endpoint
const deleteEventEvaluatee = async (id: number) => {
  await axios.delete(`EventEvaluatee/deleteEventEvaluatee/${id}`)
}

// TODO: Finish this endpoint
const deleteEventEvaluateeByEventId = async (eventId: number) => {
  await axios.delete(`EventEvaluatee/deleteEventEvaluateeByEventId/${eventId}`)
}

const EventEvaluateeApi = {
  getEventEvaluateesList,
  getEventEvaluateeList,
  createEventEvaluatee,
  updateEventEvaluatee,
  deleteEventEvaluatee,
  deleteEventEvaluateeByEventId,
}

export default EventEvaluateeApi
