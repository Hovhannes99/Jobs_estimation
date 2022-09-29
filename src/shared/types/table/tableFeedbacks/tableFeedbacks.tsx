import React, {Key} from 'react'
import {
  ITableFeedbacks,
  StableSortArrayType,
  TableArraysType,
  TableKeyNumberOrStringType,
  TableOrderType,
} from '../table'

export interface ITableContainerFeedbacksProps {
  order: TableOrderType
  orderBy: keyof ITableFeedbacks
  handleRequestSort: (
    event: React.MouseEvent<HTMLDivElement>,
    property: keyof ITableFeedbacks,
  ) => void
  stableSort: <T>(
    array: StableSortArrayType,
    comparator: (a: T | TableKeyNumberOrStringType, b: T | TableKeyNumberOrStringType) => number,
  ) => T[]
  rows: TableArraysType
  getComparator: (
    order: TableOrderType,
    orderBy: Key,
  ) => (a: TableKeyNumberOrStringType, b: TableKeyNumberOrStringType) => number
}

export interface ITableFeedbacksCell {
  disablePadding: boolean
  id: keyof ITableFeedbacks
  label: string
  numeric: boolean
  sortDropIconShow: boolean
  borderRight?: boolean
}

export interface IFeedbacksTableHeadProps {
  onRequestSort: (event: React.MouseEvent<HTMLDivElement>, property: keyof ITableFeedbacks) => void
  order: TableOrderType
  orderBy: string
}
