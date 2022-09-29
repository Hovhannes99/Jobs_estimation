import axios from '../axios'

// TODO: Finish this endpoint
const filterEvaluations = async (
  adminId: undefined | number,
  eventId: undefined | number,
  questionId: undefined | number,
  evaluatorId: undefined | number,
  evaluateeId: undefined | number,
) => {
  const data = await axios.get(
    `Evaluation/filterEvaluations/${adminId}/${eventId}/${questionId}/${evaluatorId}/${evaluateeId}`,
  )
  return data
}

// TODO: Finish this endpoint
const getEvaluationsList = async () => {
  const data = await axios.get(`Evaluation/getEvaluations`)
  return data
}

// TODO: Finish this endpoint
const getEvaluationList = async (id: number) => {
  const data = await axios.get(`Evaluation/getEvaluation/${id}`)
  return data
}

// TODO: Finish this endpoint
const createEvaluation = async () => {
  await axios.post('Evaluation/createEvaluation')
}

// TODO: Finish this endpoint
const updateEvaluation = async (id: number) => {
  await axios.put(`Evaluation/updateEvaluation/${id}`)
}

// TODO: Finish this endpoint
const deleteEvaluation = async (id: number) => {
  await axios.delete(`Evaluation/deleteEvaluation/${id}`)
}

const getEventForEvaluation = (userToken: string, eventToken: string) =>
  axios.get(`Evaluation/getEventForEvaluation/${userToken}/${eventToken}`)
const getQuestionGroups = (userToken: string, eventToken: string) =>
  axios.get(`Evaluation/getQuestionGrops/${userToken}/${eventToken}`)
const saveQuestionGroups = (data: {
  eventToken: string
  userToken: string
  evaluatorId: number
  evaluateeId: number | undefined
  questionPointArr: {
    questionId: number
    point: number
  }[]
}) => axios.post(`Evaluation/saveEvaluationArr`, data)

const EvaluationApi = {
  filterEvaluations,
  getEvaluationsList,
  getEvaluationList,
  createEvaluation,
  updateEvaluation,
  deleteEvaluation,
  getEventForEvaluation,
  getQuestionGroups,
  saveQuestionGroups,
}

export default EvaluationApi
