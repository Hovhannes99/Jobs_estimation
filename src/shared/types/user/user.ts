export interface IUsers {
  firstName: string
  lastName: string
  cardName?: string
  position: string
  monthlySalary: string
  email: string
  password?: string
  saltKey?: string
  companyId?: number
  company?: string | null
  role?: number | Blob
  isFirstTime?: boolean
  isActive?: boolean
  profileImg: Blob
  id: number
  currency?: number
}

export interface IUserData {
  adminId: number
  firstName: string
  lastName: string
  position: string
  password: string
  saltKey: string
  companyId: number
  company: {companyName: string; id: number} | null
  role: number
  isFirstTime: boolean
  isActive: boolean
  profileImg: string | null | undefined
  monthlySalary: number
}
