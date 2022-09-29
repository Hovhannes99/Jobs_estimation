import {ReactNode} from 'react'

export interface ITabPanelProps {
  children: ReactNode
  index: number
  value: number
}

export interface ITabsLayoutProps {
  tabs1: ReactNode
  tabs2?: ReactNode
  tabs3?: ReactNode
  label1: string
  label2?: string
  label3?: string
}
