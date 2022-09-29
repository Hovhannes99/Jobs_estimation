import React, {createContext, useContext, useState} from 'react'
import {IContextProps, IUserProps} from './userContext.props'
import {IUserData} from '../../shared/types/user/user'

const UserContext = createContext<IUserProps | null>(null)

const UserPageProvider = ({children}: IContextProps) => {
  const [userId, setUserId] = useState<number>(Number(localStorage.userId))
  const [email, setEmail] = useState<string | undefined>()
  const [accessToken, setAccessToken] = useState<string | undefined>(localStorage.accessToken)
  const [adminId, setAdminId] = useState<number>(0)
  const [userData, setUserData] = useState<IUserData | null>()
  const contextValues = React.useMemo(
    () => ({
      email,
      setEmail,
      userId,
      setUserId,
      accessToken,
      setAccessToken,
      adminId,
      setAdminId,
      userData,
      setUserData,
    }),
    [email, userId, accessToken, adminId, userData],
  )

  return <UserContext.Provider value={contextValues}>{children}</UserContext.Provider>
}

export default UserPageProvider
export const UseUserContext = () => useContext(UserContext)
