import {Box, Button, FormControl, FormControlLabel, Modal, Radio, RadioGroup} from '@mui/material'
import React from 'react'
import useStylesModal from '../../assets/makeStyles/modals/modals'
import {IModal} from '../../shared/types/modal/modal.props'

const CertificateModal = ({openModal, closeModal, openCertificates}: IModal) => {
  const classes = useStylesModal()

  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={openModal}
      onClose={closeModal}
      BackdropProps={{
        timeout: 200,
      }}
      className={`${classes.styledModal}`}
    >
      <Box className={classes.modalCertificateContainer}>
        <Box
          id="unstyled-modal-title"
          className="get-certificate-heading font-size-16 font-weight-500 line-height-22 text-center"
        >
          Top Manager’s Rating
        </Box>
        <Box>
          <Box className="get-certificate-radio-container">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label={
                    <Box className="font-size-14 line-height-17 color-black font-weight-400">
                      Include rating in average score calculation
                    </Box>
                  }
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label={
                    <Box className="font-size-14 line-height-17 color-black font-weight-400">
                      Add rating separately to the calculated average score
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>
            <Box className="mt-30 text-center">
              <Button
                variant="contained"
                className={`${classes.modalCertificateButton} ${classes.modalButtonTextStyle}`}
                color="blue"
                onClick={openCertificates}
              >
                GET CERTIFICATE
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default CertificateModal
