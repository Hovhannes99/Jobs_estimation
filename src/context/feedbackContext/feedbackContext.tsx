import React, {createContext, useContext, useState} from 'react'
import {IContextProps, IFeedbackProps} from './feedbackContext.props'

const FeedbackContext = createContext<IFeedbackProps | null>(null)

const FeedbackPageProvider = ({children}: IContextProps) => {
  const [positiveFeedback, setPositiveFeedback] = useState<string[]>([])

  const [negativeFeedback, setNegativeFeedback] = useState<string[]>([])

  const contextValues = React.useMemo(
    () => ({
      positiveFeedback,
      setPositiveFeedback,
      negativeFeedback,
      setNegativeFeedback,
    }),
    [positiveFeedback, negativeFeedback],
  )

  return <FeedbackContext.Provider value={contextValues}>{children}</FeedbackContext.Provider>
}

export default FeedbackPageProvider
export const UseFeedbackContext = () => useContext(FeedbackContext)
