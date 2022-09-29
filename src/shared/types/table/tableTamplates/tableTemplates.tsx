import React, {Key} from 'react'
import {
  StableSortArrayType,
  TableArraysType,
  TableKeyNumberOrStringType,
  TableOrderType,
} from '../table'

export interface ITableTemplatesData {
  eventName: string
  date: string
  status: string
  evaluator: string
  evaluate: string
  link: string
}

export interface ITableContainerTemplatesProps {
  order: TableOrderType
  orderBy: keyof ITableTemplatesData
  handleRequestSort: (
    event: React.MouseEvent<HTMLDivElement>,
    property: keyof ITableTemplatesData,
  ) => void
  stableSort: <T>(
    array: StableSortArrayType,
    comparator: (a: T | TableKeyNumberOrStringType, b: T | TableKeyNumberOrStringType) => number,
  ) => T[]
  rows: TableArraysType | undefined
  getComparator: (
    order: TableOrderType,
    orderBy: Key,
  ) => (a: TableKeyNumberOrStringType, b: TableKeyNumberOrStringType) => number
}

export interface ITableRowTemplatesProps {
  key: number
  labelId: string
  row: TableKeyNumberOrStringType
}

export interface ITableHeadTemplatesProps {
  onRequestSort: (
    event: React.MouseEvent<HTMLDivElement>,
    property: keyof ITableTemplatesData,
  ) => void
  order: TableOrderType
  orderBy: string
}

export interface ITableTemplatesCell {
  disablePadding: boolean
  id: keyof ITableTemplatesData
  label: string
  numeric: boolean
  sortDropIconShow: boolean
  borderRight?: boolean
}
