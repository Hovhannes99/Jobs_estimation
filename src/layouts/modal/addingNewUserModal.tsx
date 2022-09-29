import {Box, Button, IconButton, Modal, Stack, TextField} from '@mui/material'
import React, {ChangeEvent, useEffect, useState} from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import {DatePicker} from '@mui/lab'
import moment from 'moment'
import clsx from 'clsx'
import {IModalUsers} from '../../shared/types/modal/modal.props'
// import useStylesTextFields from '../../assets/makeStyles/textFields/textFields'
import useStylesButton from '../../assets/makeStyles/buttons/buttons'
import CheckIcon from '../../assets/images/Icons/checkIcon'
import useStylesModal from '../../assets/makeStyles/modals/modals'
import UserStyle from '../../assets/makeStyles/editUser/UserStyle'
import MakeStyles from '../../assets/makeStyles/makeStyles'

const AddingNewUserModal = ({
  openModal,
  closeModal,
  handleSaveDetailsProps,
  successModal,
  setSuccessModal,
  isLoading,
  error,
  errorMessage,
}: IModalUsers) => {
  const classesModal = useStylesModal()
  const classesUser = UserStyle()
  const classes = MakeStyles()

  const [selectedImage, setSelectedImage] = useState<Blob | MediaSource>(new Blob([], {}))
  const [showUserImage, setShowUserImage] = useState(false)
  const [currency, setCurrency] = useState<number>(0)

  const [disabledSaveButton, setDisabledSaveButton] = useState(true)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [position, setPosition] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [monthlySalary, setMonthlySalary] = useState<string>()
  const [hireDate, setHireDate] = useState<string | null>(moment() as unknown as string)
  // const classesTextFields = useStylesTextFields()
  const classesButtons = useStylesButton()
  const [openDateModal, setOpenDateModal] = useState<boolean>(false)

  const handleSaveDetails = () => {
    handleSaveDetailsProps(
      firstName,
      lastName,
      currency,
      email,
      position,
      monthlySalary || '0',
      showUserImage ? selectedImage : '',
      hireDate,
    )
  }

  const handleBackToUsersList = () => {
    closeModal()
    setSuccessModal(false)
    setFirstName('')
    setEmail('')
    setPosition('')
    setLastName('')
    setMonthlySalary('')
    setSelectedImage(new Blob([], {}))
    setShowUserImage(false)
    setCurrency(0)
  }

  useEffect(() => {
    if (firstName && position && email && lastName) {
      setDisabledSaveButton(false)
    } else {
      setDisabledSaveButton(true)
    }
  }, [firstName, position, email, lastName])

  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedImage(event.target.files[0])
      setShowUserImage(true)
    } else {
      setShowUserImage(false)
    }
  }

  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={openModal}
      onClose={closeModal}
      BackdropProps={{
        timeout: 200,
      }}
      className={`${classesModal.styledModal}`}
    >
      {!successModal ? (
        <Box className={classesModal.modalContainer}>
          <Box
            id="unstyled-modal-title"
            className="adding-new-user-modal-heading color-dark-blue d-flex justify-center  font-weight-700 font-size-16 line-height-22"
          >
            Adding new user
          </Box>
          <Box className="d-flex flex-column justify-center align-center">
            <Box className="font-size-16 mt-20 line-height-22 font-weight-400 color-dark-blue">
              Evaluation Criteria Name
            </Box>
            <Box className="mt-30">
              <TextField
                onChange={(event) => setFirstName(event.target.value)}
                className={`${classes.inputStyle} width-px-272`}
                size="small"
                value={firstName}
                label="Name"
                variant="outlined"
              />
            </Box>
            <Box className="mt-30">
              <TextField
                onChange={(event) => setLastName(event.target.value)}
                className={`${classes.inputStyle} width-px-272`}
                value={lastName}
                size="small"
                label="Last Name"
                variant="outlined"
              />
            </Box>
            <Box className="mt-30">
              <TextField
                onChange={(event) => setPosition(event.target.value)}
                className={`${classes.inputStyle} width-px-272`}
                // className={`${classesTextFields.textField} ${classesTextFields.textFieldLong}`}
                id="outlined-basic"
                variant="outlined"
                size="small"
                value={position}
                label="Position "
              />
            </Box>
            <Box className="mt-30">
              <TextField
                onChange={(event) => setEmail(event.target.value)}
                className={`${classes.inputStyle} width-px-272`}
                variant="outlined"
                size="small"
                value={email}
                type="email"
                label="Email"
              />
            </Box>

            {/*<Box className="create-event-percent-field">*/}
            {/*  */}
            {/*  <Paper component="form" className="input-field-percent">*/}
            {/*    <TextField*/}
            {/*      onChange={(event) => setMonthlySalary(event.target.value)}*/}
            {/*      size="small"*/}
            {/*      type="number"*/}
            {/*      placeholder="0"*/}
            {/*      value={monthlySalary}*/}
            {/*      className={`${classes.inputStyle} width-px-272`}*/}
            {/*      // className={` ${classesTextFields.textField}  ${classesTextFields.numberRemoveArrowUpDown} ${classesTextFields.textFieldLong}`}*/}
            {/*      label="Monthly Salary"*/}
            {/*    />*/}
            {/*    <IconButton size="small" className="icon-button" aria-label="directions">*/}
            {/*      <Select*/}
            {/*        labelId="demo-simple-select-label"*/}
            {/*        id="demo-simple-select"*/}
            {/*        value={currency}*/}
            {/*        label="Age"*/}
            {/*        size="small"*/}
            {/*        className="max-height-30"*/}
            {/*        onChange={(e) => setCurrency(e.target.value as number)}*/}
            {/*      >*/}
            {/*        <MenuItem value={0}>USD</MenuItem>*/}
            {/*        <MenuItem value={1}>AMD</MenuItem>*/}
            {/*      </Select>*/}
            {/*    </IconButton>*/}
            {/*  </Paper>*/}
            {/*</Box>*/}
            <Box className="mt-30">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DatePicker
                    inputFormat="MM/dd/yyyy"
                    open={openDateModal}
                    value={hireDate}
                    onOpen={() => setOpenDateModal(true)}
                    onClose={() => setOpenDateModal(false)}
                    onChange={(newValue) => setHireDate(newValue as unknown as string)}
                    renderInput={(params) => (
                      <TextField
                        className={`${classes.inputStyle} width-px-272`}
                        onClick={() => setOpenDateModal(true)}
                        size="small"
                        {...params}
                      />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
            </Box>
            <Box className="mt-30">
              <Box className="input-field-percent">
                <TextField
                  className={`text-field width-100 ${classes.backgroundLightGrayInput}`}
                  label="Monthly Salary "
                  id="outlined-required"
                  size="small"
                  onChange={(event) => setMonthlySalary(event.target.value)}
                  value={monthlySalary}
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
            <Box className="mt-24 d-flex align-center">
              <Button
                className={classesButtons.colorBlueButton}
                variant="contained"
                component="label"
              >
                Upload picture
                <input type="file" hidden onChange={handleUploadImage} />
              </Button>
              {showUserImage && <Box className="ml-16">Selected image</Box>}
            </Box>
            {showUserImage && (
              <Box className="mt-26">
                <Avatar
                  variant="square"
                  src={URL.createObjectURL(selectedImage)}
                  className={classesUser.avatar}
                />
              </Box>
            )}
          </Box>
          <Box className="mt-40 d-flex justify-center">
            <Button
              onClick={() => handleBackToUsersList()}
              className={clsx(classes.colorBlue, classesButtons.transparentButton)}
            >
              <p className="text-color-gradient">Cancel</p>
            </Button>
            {isLoading ? (
              <Box className="m-auto text-center pb-10">
                <CircularProgress />
              </Box>
            ) : (
              <Button
                disabled={disabledSaveButton}
                onClick={() => handleSaveDetails()}
                className={clsx(classes.colorBlue, classesButtons.transparentButton)}
              >
                <p className="text-color-gradient">Save</p>
              </Button>
            )}
          </Box>
          {error && <Box className="m-auto color-red text-center pb-20">Something went wrong</Box>}
          {errorMessage && <Box className="m-auto color-red text-center pb-20">{errorMessage}</Box>}
        </Box>
      ) : (
        <Box className={classesModal.modalContainer}>
          <Box className="check-icon-container">
            <Box className={` ${classesModal.auto}`}>
              <CheckIcon />
            </Box>
            <Box className="mt-10 font-weight-500 font-size-16 line-height-22"> Success!</Box>
            <Box className="mt-20 font-weight-500 font-size-16 line-height-22">
              This user will receive an email invite.
            </Box>
            <Box className="mt-20">
              <Button
                className={`${classesButtons.colorBlueButton} ${classesButtons.widthPercent100}`}
                color="blue"
                variant="contained"
                onClick={() => handleBackToUsersList()}
              >
                Back to users list
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Modal>
  )
}

export default AddingNewUserModal
