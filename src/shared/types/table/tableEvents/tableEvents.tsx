import React, {Key} from 'react'
import {
  StableSortArrayType,
  TableArraysType,
  TableKeyNumberOrStringType,
  TableOrderType,
} from '../table'

export interface ITableEventsData {
  eventTitle: string
  firstName: string
  createdDate: string
  eventEvaluators: string
  eventEvaluatees: string
  link: string
}

export interface ITableContainerEventsProps {
  order: TableOrderType
  orderBy: keyof ITableEventsData
  handleRequestSort: (
    event: React.MouseEvent<HTMLDivElement>,
    property: keyof ITableEventsData,
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

export interface ITableEventsCell {
  disablePadding: boolean
  id: keyof ITableEventsData
  label: string
  numeric: boolean
  sortDropIconShow: boolean
  borderRight?: boolean
}

export interface IEventsTableHeadProps {
  onRequestSort: (event: React.MouseEvent<HTMLDivElement>, property: keyof ITableEventsData) => void
  order: TableOrderType
  orderBy: string
}
