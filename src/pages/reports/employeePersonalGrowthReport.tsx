import React, {useState} from 'react'
import clsx from 'clsx'
import {Box, Button, Card, CardContent, TextField, Typography} from '@mui/material'
import ChartSideBySideBar from './chartSideBySideBar'
import WrapperCertificates from '../../layouts/certificates/wrapperCertificates'
import ExperienceCards from '../../layouts/userExperience/experienceCards'
import CertificateModal from '../../layouts/modal/certificateModal'
import useStylesButton from '../../assets/makeStyles/buttons/buttons'
import MakeStyles from '../../assets/makeStyles/makeStyles'
import useStylesTextFields from '../../assets/makeStyles/textFields/textFields'

const EmployeePersonalGrowthReport = () => {
  const classes = MakeStyles()
  const classesTextField = useStylesTextFields()
  const classesButtons = useStylesButton()
  const [openModalCertificate, setOpenModalCertificate] = useState(false)
  const [accordionLength] = useState(3)
  const [showCertificate, setShowCertificate] = useState(false)

  const closeModalCertificate = () => {
    setOpenModalCertificate(false)
  }
  const openCertificates = () => {
    if (!showCertificate) {
      setShowCertificate(true)
    } else {
      setShowCertificate(false)
    }

    setOpenModalCertificate(false)
  }

  return (
    <Box className="comparative-report-container">
      <Box className="card-container d-flex flex-wrap">
        <Card className="card-column mr-16 mt-26">
          <CardContent className={` ${classes.cardContainer}`}>
            <Typography className="d-flex justify-between">
              <Box className="d-flex align-center">
                <Box>Employee *</Box>
              </Box>
            </Typography>
            <Typography>
              <Box className="mt-20">
                <TextField
                  id="outlined-basic"
                  size="small"
                  className={`${classesTextField.textFieldStyle}`}
                  label="Name / Surname"
                  variant="outlined"
                />
              </Box>
              <Box className="mt-20">
                <TextField
                  id="outlined-basic"
                  size="small"
                  className={`${classesTextField.textFieldStyle}`}
                  label="Position"
                  variant="outlined"
                />
              </Box>
            </Typography>
          </CardContent>
        </Card>
        <Card className="card-column mr-44 mt-26">
          <CardContent className={` ${classes.cardContainer}`}>
            <Typography className="d-flex justify-between">
              <Box className="d-flex align-center">
                <Box>Event</Box>
              </Box>
            </Typography>
            <Typography>
              <Box className="mt-20">
                <TextField
                  id="outlined-basic"
                  size="small"
                  className={`${classesTextField.textFieldStyle}`}
                  label="Name / Surname"
                  variant="outlined"
                />
              </Box>
              <Box className="mt-20">
                <TextField
                  id="outlined-basic"
                  size="small"
                  className={`${classesTextField.textFieldStyle}`}
                  label="Position"
                  variant="outlined"
                />
              </Box>
            </Typography>
          </CardContent>
        </Card>
        <Box className="d-flex flex-end mt-26">
          <Button
            color="blue"
            className={`${clsx(classesButtons.width150, classesButtons.colorBlueButton)}`}
            variant="contained"
          >
            APPLY
          </Button>
        </Box>
      </Box>
      <Box className="d-flex mt-40">
        <Button
          className={`${clsx(
            classesButtons.transparentWithBorderButton,
            classesButtons.width150,
          )} `}
          color="blue"
        >
          EXPORT
        </Button>
      </Box>
      <Box className="mt-30 chart-side-by-side-bar">
        <Box className="employee-personal-heading font-size-16 font-weight-500 line-height-20">
          Employee’s average score progress comparison
        </Box>
        <Box>
          <ChartSideBySideBar chartOption={[]} />
        </Box>
      </Box>
      <Box className="mt-44">
        {!showCertificate && (
          <Button
            onClick={() => setOpenModalCertificate(true)}
            className={`${classesButtons.buttonPaddingNormal} ${classesButtons.transparentWithBorderButton}`}
            color="blue"
          >
            GET CERTIFICATE
          </Button>
        )}
      </Box>
      {!showCertificate && <ExperienceCards accordionLength={accordionLength} />}
      <CertificateModal
        openModal={openModalCertificate}
        closeModal={closeModalCertificate}
        openCertificates={openCertificates}
      />
      {showCertificate && <WrapperCertificates handleOpenCertificates={openCertificates} />}
    </Box>
  )
}

export default EmployeePersonalGrowthReport
