import React from 'react'
import {Box, Button, Modal} from '@mui/material'
import CheckIcon from '../../assets/images/Icons/checkIcon'
import useStylesModal from '../../assets/makeStyles/modals/modals'
import {IModal} from '../../shared/types/modal/modal.props'

const SavedModal = ({openModal, closeModal}: IModal) => {
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
      <Box className={classes.modalContainerViewForm}>
        <Box className="text-center">
          <Box className="m-auto">
            <CheckIcon />
          </Box>
          <Box className="mt-10 font-size-16 font-weight-500 line-height-22">
            The evaluation is added to saved submissions.
          </Box>
          <Box className="mt-22">
            <Button
              variant="contained"
              className={`${classes.modalReviewSavedButton} ${classes.modalButtonTextStyle}`}
              color="blue"
              onClick={closeModal}
            >
              REVIEW SAVED SUBMISSIONS
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default SavedModal
