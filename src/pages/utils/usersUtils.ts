import UsersApi from '../../api/users'

const getUserList = async (item: {userId: number; eventId: number}) => {
  const data = await UsersApi.userList(item.userId).then((response) => ({
    id: item.userId,
    userName: response.data.firstName,
    position: response.data.position,
    eventId: item.eventId,
  }))
  return data
}

export default getUserList
