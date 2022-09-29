import React, {Dispatch} from 'react'

// type ICertificate = {
//   isVisible: boolean
// }

export interface ICertificateProps {
  // certificateData: ICertificate
  // setCertificateData: Dispatch<React.SetStateAction<{isVisible: boolean}>>
  showCertificate: boolean
  setShowCertificate: Dispatch<React.SetStateAction<boolean>>
  evaluateeName: string | undefined
  setEvaluateeName: Dispatch<React.SetStateAction<string | undefined>>
  setTotalScore: Dispatch<React.SetStateAction<string | undefined>>
  totalScore: string | undefined
  menual: boolean
  setMenual: Dispatch<React.SetStateAction<boolean>>
  createDate: string
  setCreateDate: Dispatch<React.SetStateAction<string>>
  evaluateeId: number | undefined
  setEvaluateeId: Dispatch<React.SetStateAction<number | undefined>>
  setNoScore: Dispatch<React.SetStateAction<boolean>>
  noScore: boolean
  certificateType: number
  setCertificateType: Dispatch<React.SetStateAction<number>>
}

export interface IContextProps {
  children?: JSX.Element | JSX.Element[]
}
