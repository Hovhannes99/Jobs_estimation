export const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken')
  return Boolean(token)
}
export const makeRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
