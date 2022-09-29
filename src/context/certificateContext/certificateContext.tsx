import React, {createContext, useContext, useState} from 'react'
import {ICertificateProps, IContextProps} from './certificateContext.props'

// const initialState = {
//   isVisible: false,
// }

// const CertificateContext = createContext<ICertificateProps>({
//   certificateData: initialState,
//   setCertificateData: () => ({}),
// })

const CertificateContext = createContext<ICertificateProps | null>(null)

const CertificatePageProvider = ({children}: IContextProps) => {
  // const [certificateData, setCertificateData] = useState(initialState)
  const [showCertificate, setShowCertificate] = useState<boolean>(false)
  const [totalScore, setTotalScore] = useState<string | undefined>()
  const [evaluateeName, setEvaluateeName] = useState<string | undefined>()
  const [evaluateeId, setEvaluateeId] = useState<number | undefined>()
  const [menual, setMenual] = useState<boolean>(false)
  const [createDate, setCreateDate] = useState<string>('')
  const [noScore, setNoScore] = useState<boolean>(false)
  const [certificateType, setCertificateType] = useState<number>(1)

  const contextValues = React.useMemo(
    () => ({
      // certificateData,
      // setCertificateData,
      showCertificate,
      setShowCertificate,
      setTotalScore,
      totalScore,
      setEvaluateeName,
      evaluateeName,
      setMenual,
      menual,
      createDate,
      setCreateDate,
      evaluateeId,
      setEvaluateeId,
      noScore,
      setNoScore,
      certificateType,
      setCertificateType,
    }),
    [
      showCertificate,
      totalScore,
      evaluateeName,
      menual,
      createDate,
      evaluateeId,
      noScore,
      certificateType,
    ],
  )

  return <CertificateContext.Provider value={contextValues}>{children}</CertificateContext.Provider>
}

export default CertificatePageProvider
export const UseCertificateContext = () => useContext(CertificateContext)
