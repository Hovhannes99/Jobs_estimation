import axios from '../axios'

const usersList = async () => {
  const data = await axios.get('User/getUsers')
  return data
}

const userList = async (id: number | undefined) => {
  const data = await axios.get(`User/getUser/${id}`)
  return data
}

const createUser = async (data: FormData) => {
  const response = await axios.post(`User/createUser`, data)
  return response
}

const updateUser = async (id: number, data: FormData) => {
  const response = await axios.put(`User/updateUser/${id}`, data)
  return response
}

const getUsersPagination = async (page: number, pageSize: number) => {
  const response = await axios.get(`User/getUsers/${page}/${pageSize}`)
  return response
}

// TODO: Finish this endpoint
const deleteUser = async (id: number) => {
  await axios.delete(`User/updateUser/${id}`)
}

const UsersApi = {
  usersList,
  userList,
  createUser,
  updateUser,
  deleteUser,
  getUsersPagination,
}

export default UsersApi
