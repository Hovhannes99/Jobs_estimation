import {Avatar, Box, Modal} from '@mui/material'
import React from 'react'
import Error from '../../assets/images/Icons/error.png'
import useStylesModal from '../../assets/makeStyles/modals/modals'
import {IModal} from '../../shared/types/modal/modal.props'

const ErrorModal = ({openModal, closeModal, errorMessage}: IModal) => {
  const classes = useStylesModal()
  return (
    <Modal
      className={`${classes.styledModal}`}
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={openModal}
      onClose={closeModal}
      BackdropProps={{
        timeout: 200,
      }}
    >
      <Box className={classes.modalSuccessContainer}>
        <Box className="modal-success-container mt-26 text-center">
          <Box className="m-auto d-flex justify-center">
            <Avatar src={Error} />
          </Box>
          <Box className="mt-14 font-size-16 font-weight-500 line-height-22">
            {errorMessage || 'Something went wrong'}
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ErrorModal
