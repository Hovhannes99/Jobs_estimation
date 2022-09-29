export interface ISliderStatus {
  adminId: number
  eventTitle?: string
  createdDate?: string
  eventPairModelOut: {
    evaluatees: {id: number; firstName: string; position: string}
    evaluators: {id: number; firstName: string; position: string}
    status: number
  }[]
  evaluators: {id: number; firstName: string; position: string}[]
  id: number
}

export interface ISlider {
  children?: JSX.Element
  carouselItems: ISliderStatus
  sizeItems: 'normal' | 'big'
  labels?: 'new' | 'completed'
  isLoading?: boolean
}
