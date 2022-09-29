import React, {Dispatch} from 'react'

export interface IFeedbackProps {
  positiveFeedback: string[]
  setPositiveFeedback: Dispatch<React.SetStateAction<string[]>>
  negativeFeedback: string[]
  setNegativeFeedback: Dispatch<React.SetStateAction<string[]>>
}

export interface IContextProps {
  children?: JSX.Element | JSX.Element[]
}
