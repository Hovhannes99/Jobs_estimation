import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'text/json',
  },
})

instance.interceptors.request.use((config) => {
  const token = localStorage.accessToken
  if (config.headers) {
    config.headers.Authorization = `Bearer ${token}` || ''
  }
  return config
})

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear()
      window.location.href = '/sign-in'
    }
    return error
  },
)

export default instance
