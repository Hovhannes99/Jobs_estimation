import React, {Dispatch} from 'react'
import {IUserData} from '../../shared/types/user/user'

export interface IUserProps {
  userId: number
  setUserId: Dispatch<React.SetStateAction<number>>
  email: string | undefined
  setEmail: Dispatch<React.SetStateAction<string | undefined>>
  accessToken: string | undefined
  setAccessToken: Dispatch<React.SetStateAction<string | undefined>>
  userData: IUserData | null | undefined
  setUserData: Dispatch<React.SetStateAction<IUserData | null | undefined>>
}

export interface IContextProps {
  children?: JSX.Element | JSX.Element[]
}
