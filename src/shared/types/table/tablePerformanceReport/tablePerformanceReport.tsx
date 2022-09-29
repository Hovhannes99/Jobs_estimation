import React, {Key} from 'react'
import {
  IEnhancedPerformanceReportTableRows,
  StableSortArrayType,
  TableArraysType,
  TableKeyNumberOrStringType,
  TableOrderType,
} from '../table'

export interface ITableContainerPerformanceReportProps {
  order: TableOrderType
  orderBy: keyof IEnhancedPerformanceReportTableRows
  handleRequestSort: (
    event: React.MouseEvent<HTMLDivElement>,
    property: keyof IEnhancedPerformanceReportTableRows,
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

export interface ITablePerformanceReportHeadProps {
  onRequestSort: (
    event: React.MouseEvent<HTMLDivElement>,
    property: keyof IEnhancedPerformanceReportTableRows,
  ) => void
  order: TableOrderType
  orderBy: string
}

export interface ITablePerformanceReportCell {
  disablePadding: boolean
  id: keyof IEnhancedPerformanceReportTableRows
  label: string
  numeric: boolean
  sortDropIconShow: boolean
  borderRight?: boolean
  show: boolean
}
