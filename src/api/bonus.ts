import axios from '../axios'

const getEventBonuses = async (eventId: number) => {
  const response = await axios.get(`Bonus/getEventBonuses/${eventId}`)
  return response
}

const createBonus = async (data: {
  eventId: number
  bonusArr: {
    eventId: number
    bonusPercentage: number
    bonusRangeFrom: number
    bonusRangeTo: number
    bonusRangeName: string
  }[]
}) => {
  const response = await axios.post(`Bonus/createBonus`, data)
  return response
}

const updateBonus = async (
  id: number,
  data: {
    eventId: number
    bonusArr: {
      eventId: number
      bonusPercentage: string
      bonusRangeFrom: string
      bonusRangeTo: string
      bonusRangeName: string
    }[]
  },
) => {
  const response = await axios.put(`Bonus/updateBonus/${id}`, data)
  return response
}

const BonusesApi = {
  getEventBonuses,
  updateBonus,
  createBonus,
}

export default BonusesApi
