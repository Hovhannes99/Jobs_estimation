export interface IFeedback {
  thingsToImprove: string[]
  positiveFeedback: string[]
}

export interface IWriteYourFeedback {
  feedbackName: string
  handleFeedback: (value: string) => void
  handleClearProps: () => void
}
