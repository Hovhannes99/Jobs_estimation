import React, {useEffect, useState} from 'react'
import {Box, Button, IconButton, InputBase} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import moment from 'moment'
import SearchIcon from '../../assets/images/Icons/searchIcon'
import EnhancedTable from '../../layouts/table/table'
import useStylesButton from '../../assets/makeStyles/buttons/buttons'
import AddingNewUserModal from '../../layouts/modal/addingNewUserModal'
import UsersApi from '../../api/users'
import {IUsers} from '../../shared/types/user/user'
import Regex from '../../constants/regex'
import {ISliderStatus} from '../../shared/types/slider/slider'
import PaginationContainer from '../../layouts/pagination/pagination'

const Index = () => {
  const classesButton = useStylesButton()
  const regEmail = Regex.email
  const [successModal, setSuccessModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [openModalAddingNewUser, setOpenModalAddingNewUser] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchResult, setSearchResults] = useState<IUsers[]>([])
  const [users, setUsers] = useState<IUsers[]>([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [countPagination, setCountPagination] = useState<number>(0)
  const [limitData, setLimitData] = useState<number | undefined>()

  useEffect(() => {
    ;(async () => {
      await getUsersData()
    })()
  }, [pageSize, page])

  useEffect(() => {
    if (limitData) {
      if (pageSize >= limitData) {
        setCountPagination(1)
      } else {
        setCountPagination(Math.ceil(limitData / pageSize))
      }
    }
  }, [pageSize, page, limitData])

  useEffect(() => {
    if (users.length && searchValue) {
      const results = users.filter(
        (item) =>
          item.firstName && item.firstName.toLowerCase().includes(searchValue.toLowerCase()),
      )
      setSearchResults(results)
    }
  }, [searchValue, users])

  const getUsersData = async () => {
    setIsLoading(true)
    const response = await UsersApi.getUsersPagination(page, pageSize)
    const updateUsers = response.data.users.map((item: ISliderStatus[]) => item)
    setLimitData(response.data.totalUsersCount)
    setUsers(updateUsers)
    setIsLoading(false)
  }

  const handleOpenModal = () => {
    setOpenModalAddingNewUser(true)
  }

  const handleSaveDetails = (
    firstName: string,
    lastName: string,
    currency: number,
    email: string,
    position: string,
    monthlySalary: string,
    image: Blob | MediaSource | string,
    hireDate: string | null,
  ) => {
    if (users.length) {
      if (!regEmail.test(email)) {
        setErrorMessage('Invalid Email')
      } else {
        // TODO: talk with Norvik about CompanyId and Role fields
        ;(async () => {
          setIsLoading(true)
          const form = new FormData()
          form.append('FirstName', firstName)
          form.append('Email', email)
          form.append('Position', position)
          form.append('MonthlySalary', monthlySalary)
          form.append('LastName', lastName)
          form.append('CompanyId', '1')
          form.append('Currency', currency as unknown as Blob)
          form.append('IsActive', 'true')
          form.append('ProfileImg', image as Blob)
          form.append(
            'HireDate',
            moment(hireDate).format('yyyy-MM-DDThh:mm:ss') as unknown as string,
          )
          const response: any = await UsersApi.createUser(form)
          if (response.status === 200) {
            setSuccessModal(true)
            setIsLoading(false)
            setError(false)
            setErrorMessage('')
            setUsers([
              ...users,
              {
                id: users.length,
                firstName,
                lastName,
                email,
                position,
                monthlySalary,
                profileImg: image as Blob,
              },
            ])
            getUsersData()
          } else if (response.response.status === 400) {
            setErrorMessage(response.response.data.message)
            setError(false)
            setIsLoading(false)
          } else {
            setIsLoading(false)
            setError(true)
            setErrorMessage('')
          }
        })()
      }
    }
  }

  const handleCloseAddingNewUserModal = () => setOpenModalAddingNewUser(false)

  const renderTableAndPagination = () => {
    if (!isLoading && (searchValue ? searchResult.length : users.length)) {
      return (
        <Box>
          <EnhancedTable table="users" rows={searchValue ? searchResult : users} />
          <PaginationContainer
            limitData={limitData}
            page={page}
            setPage={setPage}
            countPagination={countPagination}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </Box>
      )
    }
    return (
      <div className="d-flex justify-center">
        {isLoading ? <CircularProgress /> : 'There is not data'}
      </div>
    )
  }

  return (
    <Box className="page-container">
      <Box className="page-padding">
        <Box className="page-heading">People</Box>
        <Box className="mt-30 d-flex justify-between width-100">
          <Box className="text-field-style">
            <IconButton className="icon-button" aria-label="directions">
              <SearchIcon />
            </IconButton>
            <InputBase
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="input-base"
              placeholder="Search user"
              inputProps={{'aria-label': '0'}}
            />
          </Box>
        </Box>
        <Box className="mt-20 d-flex justify-end width-100">
          <Button
            variant="contained"
            className={`${classesButton.colorBlueButton} ${classesButton.width150}`}
            color="blue"
            onClick={() => handleOpenModal()}
          >
            ADD PERSON
          </Button>
        </Box>
        <Box className="mt-44">{renderTableAndPagination()}</Box>
        <AddingNewUserModal
          openModal={openModalAddingNewUser}
          closeModal={handleCloseAddingNewUserModal}
          handleSaveDetailsProps={handleSaveDetails}
          successModal={successModal}
          setSuccessModal={setSuccessModal}
          isLoading={isLoading}
          error={error}
          errorMessage={errorMessage}
        />
      </Box>
    </Box>
  )
}
export default Index
