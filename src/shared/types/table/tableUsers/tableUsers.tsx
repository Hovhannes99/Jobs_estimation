import React, {Key} from 'react'
import {
  StableSortArrayType,
  TableArraysType,
  TableKeyNumberOrStringType,
  TableOrderType,
} from '../table'

export interface ITableUsersData {
  firstName: string
  email: string
  position: string
  monthlySalary: number | undefined
}

export interface ITableContainerUsersProps {
  order: TableOrderType
  orderBy: keyof ITableUsersData
  handleRequestSort: (
    event: React.MouseEvent<HTMLDivElement>,
    property: keyof ITableUsersData,
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

export interface IUsersTableHeadProps {
  onRequestSort: (event: React.MouseEvent<HTMLDivElement>, property: keyof ITableUsersData) => void
  order: TableOrderType
  orderBy: string
}

export interface ITableUsersCell {
  disablePadding: boolean
  id: keyof ITableUsersData
  label: string
  numeric: boolean
  sortDropIconShow: boolean
  borderRight?: boolean
}
