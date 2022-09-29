import {Box, Button, Modal} from '@mui/material'
import React from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import useStylesModal from '../../assets/makeStyles/modals/modals'

const FeedbacksModal = ({
  isLoading,
  openModal,
  closeModal,
  feedbacks,
}: {
  isLoading: boolean
  openModal: boolean
  closeModal: () => void
  feedbacks:
    | [
        {
          evaluatee: {id: 2; firstName: string}
          feedbackText: string
          id: number
        },
      ]
    | undefined
}) => {
  const classes = useStylesModal()

  const handleBackToUsersList = () => {
    closeModal()
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
      className={`${classes.styledModal}`}
    >
      <Box className={classes.modalContainer}>
        <Box id="unstyled-modal-title" className="adding-new-user-modal-heading">
          Feedbacks
        </Box>
        {isLoading ? (
          <Box className="m-auto text-center mt-20 ">
            <CircularProgress />
          </Box>
        ) : (
          <Box className="adding-new-user-modal-body feedbacks-modal-body">
            {feedbacks && feedbacks.length
              ? feedbacks.map((item) => (
                  <Box className="mb-10" key={item.id}>
                    {item.evaluatee.firstName} - {item.feedbackText}
                  </Box>
                ))
              : 'There is not data'}
          </Box>
        )}
        <Box
          className="mt-10"
          // className="adding-new-user-modal-body"
        >
          <Button onClick={() => handleBackToUsersList()}>Back</Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default FeedbacksModal
