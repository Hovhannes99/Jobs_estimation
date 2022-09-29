import axios from '../axios'

const getQuestionsGroups = async () => {
  const data = await axios.get('Question/getQuestionGroups')
  return data
}

// TODO: Finish this endpoint
const getQuestionsList = async () => {
  const data = await axios.get('Question/getQuestions')
  return data
}

// TODO: Finish this endpoint
const getQuestionsByAdminList = async (adminId: number) => {
  const data = await axios.get(`Question/getQuestionsByAdmin/${adminId}`)
  return data
}

// TODO: Finish this endpoint
const getQuestionList = async (id: number) => {
  const data = await axios.get(`Question/getQuestion/${id}`)
  return data
}

const createQuestion = async (
  questionTitle: string,
  questionGroupId: number,
  isDelete: boolean,
) => {
  const response = await axios.post('Question/createQuestion', {
    questionTitle,
    questionGroupId,
    isDelete,
    coefficient: 1,
  })
  return response
}

// TODO: Finish this endpoint
const updateQuestion = async (
  id: number,
  questionTitle: string,
  rating: string,
  questionId: number,
) => {
  await axios.put(`Question/updateQuestion/${id}`, {
    questionTitle,
    coefficient: rating,
    isDelete: false,
    questionGroupId: questionId,
  })
}

// TODO: Finish this endpoint
const deleteQuestion = async (id: number) => {
  await axios.delete(`Question/deleteQuestion/${id}`)
}

const QuestionApi = {
  getQuestionsGroups,
  getQuestionsList,
  getQuestionsByAdminList,
  getQuestionList,
  createQuestion,
  updateQuestion,
  deleteQuestion,
}

export default QuestionApi
