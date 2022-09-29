import axios from '../axios'

const logIn = async (value: {email: string; password: string}) => {
  const data = await axios.post('Authentication/login', value)
  return data
}

const logOut = async () => {
  const data = await axios.post('Authentication/logout')
  return data
}

const AuthenticationsApi = {
  logIn,
  logOut,
}

export default AuthenticationsApi
