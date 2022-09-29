import React, {ChangeEvent, useEffect, useState} from 'react'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import SwitchUnstyled from '@mui/base/SwitchUnstyled'
import TextField from '@mui/material/TextField'
import {useLocation} from 'react-router'
import {Link, useNavigate} from 'react-router-dom'
import {Box} from '@mui/system'
import {IconButton} from '@mui/material'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import UserImage from '../../assets/images/userImage'
import UserStyle from '../../assets/makeStyles/editUser/UserStyle'
import DeactivateUser from '../../assets/makeStyles/editUser/DeactivateUserSwitch'
import MakeStyles from '../../assets/makeStyles/makeStyles'
import UsersApi from '../../api/users'
import {IUsers} from '../../shared/types/user/user'
import ErrorModal from '../modal/errorModal'
import {LocationStateEditUser} from '../../shared/types/location/location'
import useStylesButton from '../../assets/makeStyles/buttons/buttons'

const EditUser = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const classesButton = useStylesButton()

  const classesUser = UserStyle()
  const classes = MakeStyles()
  const [currency, setCurrency] = useState<number | undefined>(0)
  const [selectedImage, setSelectedImage] = useState<Blob | MediaSource>(new Blob([], {}))
  const [usersData, setUsersData] = useState<IUsers>()
  const {id} = location.state as LocationStateEditUser
  const [emailDisabled, setEmailDisabled] = useState<boolean | undefined>(true)
  const [openModalError, setOpenModalError] = useState<boolean>(false)
  const [uploadImage, setUploadImage] = useState<string>('')
  const [showUserImage, setShowUserImage] = useState<boolean>(false)
  const [nameValue, setNameValue] = useState<string | Blob>('')
  const [emailValue, setEmailValue] = useState<string | Blob>('')
  const [monthlySalaryValue, setMonthlySalaryValue] = useState<string | Blob>('0')
  const [positionValue, setPositionValue] = useState<string | Blob>('')

  useEffect(() => {
    ;(async () => {
      const response = await UsersApi.userList(id)
      setUsersData(response.data)
    })()
  }, [])

  useEffect(() => {
    if (usersData) {
      setPositionValue(usersData.position as unknown as Blob)
      setMonthlySalaryValue(usersData.monthlySalary as unknown as Blob)
      setEmailValue(usersData.email as unknown as Blob)
      setNameValue(usersData.firstName as unknown as Blob)
      setEmailDisabled(usersData.isActive)
      setCurrency(usersData.currency)
    }
  }, [usersData])

  useEffect(() => {
    if (usersData?.profileImg) {
      setShowUserImage(true)
    } else {
      setShowUserImage(false)
    }
  }, [usersData])

  const handleCheckedButton = () => {
    setEmailDisabled(!emailDisabled)
  }

  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedImage(event.target.files[0])
      setUploadImage(event.target.files[0].name)
      setShowUserImage(true)
    }
  }

  const handleSave = () => {
    try {
      ;(async () => {
        if (usersData) {
          const form = new FormData()
          form.append('FirstName', nameValue)
          form.append('Email', emailValue)
          form.append('Position', positionValue)
          form.append('MonthlySalary', monthlySalaryValue)
          form.append('LastName', usersData.lastName as unknown as Blob)
          form.append('CompanyId', usersData.companyId as unknown as Blob)
          form.append('Currency', currency as unknown as Blob)
          form.append('IsActive', emailDisabled as unknown as Blob)
          if (uploadImage) {
            form.append('ProfileImg', selectedImage as unknown as Blob)
          }
          form.append('Role', usersData.role as unknown as Blob)

          const response = await UsersApi.updateUser(id, form)

          if (response.status === 200) {
            navigate('/users')
            window.location.reload()
          } else {
            setOpenModalError(true)
          }
        }
      })()
    } catch (e) {
      console.log(e, 'error')
    }
  }

  const handleCloseErrorModal = () => setOpenModalError(false)

  return (
    <Box className={`${classesUser.wrapperUserCardContainer}`}>
      <Box className="font-size-16 d-flex align-center">
        <Link className="text-decoration-none color-black" to="/users">
          Users
        </Link>
        <Box className="font-weight-700 line-height-20 ml-6"> / Edit user</Box>
      </Box>
      <Box className={classesUser.wrapperUserCard}>
        <Card className={classesUser.userCard}>
          {!showUserImage ? (
            <Box className={`${classes.mAuto}`}>
              <UserImage />
            </Box>
          ) : (
            <Avatar
              alt="Remy Sharp"
              src={
                usersData?.profileImg && !uploadImage
                  ? `https://evaluation-api.azurewebsites.net/${usersData?.profileImg}`
                  : URL.createObjectURL(selectedImage)
              }
              className={classesUser.avatar}
            />
          )}
          <Box className="d-flex justify-center">
            <Button className={classesUser.uploadBtn} component="label">
              <Box className="text">Change picture</Box>{' '}
              <input type="file" hidden onChange={handleUploadImage} />
            </Button>
          </Box>
          <Typography gutterBottom className={classesUser.nameSurname} component="div">
            {nameValue}
          </Typography>
          <Box className={classesUser.checkedButton}>
            <Box onClick={() => handleCheckedButton()}>
              <SwitchUnstyled component={DeactivateUser} checked={!emailDisabled} />
            </Box>
            <p className={classesUser.subtitle}>Deactivate User</p>
          </Box>
        </Card>
        <Card className={classesUser.detailsCard}>
          <Box className={`${classesUser.detailsTitle} d-flex justify-between align-center`}>
            <Box className="font-weight-700 font-size-20 heading">User’s Details</Box>
            <Button
              variant="contained"
              className={`${classesButton.colorBlueButton} `}
              color="blue"
              onClick={() => handleSave()}
              // className={classesUser.saveBtn}
            >
              SAVE CHANGES
            </Button>
          </Box>
          <div className={classesUser.fieldContainer}>
            <Box>
              <Box className="mb-10 color-dark-grey font-size-12 font-weight-400 ml-18">Name</Box>
              <TextField
                className={`${classes.textFieldStyle}`}
                required
                id="outlined-required"
                // label="Name"
                size="small"
                onChange={(e) => setNameValue(e.target.value)}
                value={nameValue}
              />
            </Box>
            <Box>
              <Box className="mb-10 color-dark-grey font-size-12 font-weight-400 ml-18">Email</Box>
              <TextField
                className={`${classes.textFieldStyle}`}
                required
                id="outlined-required"
                size="small"
                onChange={(e) => setPositionValue(e.target.value)}
                value={positionValue}
              />
            </Box>
            <Box>
              <Box className="mb-10 color-dark-grey font-size-12 font-weight-400 ml-18">
                Position{' '}
              </Box>
              <TextField
                className={`${classes.textFieldStyle}`}
                required
                id="outlined-required"
                disabled={emailDisabled}
                size="small"
                onChange={(e) => setEmailValue(e.target.value)}
                value={emailValue}
              />
            </Box>
            <Box className="create-event-percent-field">
              <Box className="mb-10 color-dark-grey font-size-12 font-weight-400 ml-18">
                Monthly Salary
              </Box>
              <Box className="input-field-percent">
                <TextField
                  className="text-field width-100"
                  required
                  id="outlined-required"
                  size="small"
                  onChange={(e) => setMonthlySalaryValue(e.target.value)}
                  value={monthlySalaryValue}
                />
                <IconButton size="small" className="icon-button" aria-label="directions">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currency}
                    label="Age"
                    size="small"
                    className="max-height-30"
                    onChange={(e) => setCurrency(e.target.value as number)}
                  >
                    <MenuItem value={0}>USD</MenuItem>
                    <MenuItem value={1}>AMD</MenuItem>
                  </Select>
                </IconButton>
              </Box>
            </Box>
          </div>
          {/*<div className={classesUser.btnSaveWrapper}>*/}
          {/*  <Button*/}
          {/*    variant="contained"*/}
          {/*    onClick={() => handleSave()}*/}
          {/*    className={classesUser.saveBtn}*/}
          {/*  >*/}
          {/*    SAVE DETAILS*/}
          {/*  </Button>*/}
          {/*</div>*/}
        </Card>
      </Box>
      <ErrorModal openModal={openModalError} closeModal={handleCloseErrorModal} />
    </Box>
  )
}
export default EditUser
