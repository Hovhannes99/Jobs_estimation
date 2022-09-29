import React, {Dispatch} from 'react'

export interface IModal {
  openModal: boolean
  closeModal: () => void
  openCertificates?: () => void
  errorMessage?: string
}
export interface IModalUsers {
  openModal: boolean
  closeModal: () => void
  handleSaveDetailsProps: (
    name: string,
    lastName: string,
    currency: number,
    email: string,
    position: string,
    monthlySalary: string,
    selectedImage: Blob | MediaSource | string,
    hireDate: string | null,
  ) => void
  successModal: boolean
  setSuccessModal: Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  error: boolean
  errorMessage: string
}
