import {Box} from '@mui/material'
import React from 'react'
import Modal from '@mui/material/Modal'
import CheckIcon from '../../assets/images/Icons/checkIcon'
import useStylesModal from '../../assets/makeStyles/modals/modals'
import {IModal} from '../../shared/types/modal/modal.props'

const SuccessModalSecond = ({openModal, closeModal}: IModal) => {
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
        <Box className="modal-success-container-2 pt-30 text-center">
          <Box className="m-auto">
            <CheckIcon />
          </Box>
          <Box className="mt-12">Your Evaluation is successfully submitted</Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default SuccessModalSecond
