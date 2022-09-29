import axios from '../axios'

const createScoring = async (data: {
  eventId: number
  scoringArr: {
    eventId: number
    scoringName: string
    scoringValue: string
  }[]
}) => {
  const response = await axios.post('Scoring/createScoring', data)
  return response
}

const getScoringList = async (id: number | string | undefined) => {
  const response = await axios.get(`Scoring/getEventScorings/${id}`)
  return response
}

const updateScoring = async (
  id: number | string | undefined,
  data: {
    eventId: number
    scoringArr: {
      eventId: number
      scoringName: string
      scoringValue: string
    }[]
  },
) => {
  const response = await axios.put(`Scoring/updateScoring/${id}`, data)
  return response
}

const ScoringsApi = {
  createScoring,
  getScoringList,
  updateScoring,
}

export default ScoringsApi
