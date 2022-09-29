import React, {Dispatch, Key} from 'react'
import {
  StableSortArrayType,
  TableArraysType,
  TableKeyNumberOrStringType,
  TableOrderType,
} from '../table'

export interface ITableSavedSubmissionsData {
  eventTitle: number
  eventEvaluators: number
  evaluationCriteriaScore: number
  eventEvaluatees: string
  dueDate: number
  bonusPercentage: string
  feedback: string
  evaluatorName: string
  evaluateePosition: string
  sumPoint: number
  averagePoint: number
  questionCount: number
  monthlySalary: string
  currency: number
}

export interface ITableSavedSubmissionsCell {
  disablePadding: boolean
  id: keyof ITableSavedSubmissionsData
  label: string
  numeric: boolean
  sortDropIconShow: boolean
  borderRight?: boolean
  show: boolean
}

export interface ITableContainerSavedSubmissionsProps {
  order: TableOrderType
  orderBy: keyof ITableSavedSubmissionsData
  handleRequestSort: (
    event: React.MouseEvent<HTMLDivElement>,
    property: keyof ITableSavedSubmissionsData,
  ) => void
  stableSort: <T>(
    array: StableSortArrayType,
    comparator: (a: T | TableKeyNumberOrStringType, b: T | TableKeyNumberOrStringType) => number,
  ) => T[]
  rows?: TableArraysType
  getComparator: (
    order: TableOrderType,
    orderBy: Key,
  ) => (a: TableKeyNumberOrStringType, b: TableKeyNumberOrStringType) => number
  setIsLoading?: Dispatch<React.SetStateAction<boolean>> | undefined
  setRows?: Dispatch<React.SetStateAction<TableArraysType>>
}

export interface ITableSavedSubmissionsHeadProps {
  onRequestSort: (
    event: React.MouseEvent<HTMLDivElement>,
    property: keyof ITableSavedSubmissionsData,
  ) => void
  order: TableOrderType
  orderBy: string
  // onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  rowCount: number
  // numSelected: number
}
