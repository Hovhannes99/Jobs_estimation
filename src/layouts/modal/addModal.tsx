import {Box, Button, Checkbox, FormControlLabel, FormGroup} from '@mui/material'
import React from 'react'
import Modal from '@mui/material/Modal'
import useStylesModal from '../../assets/makeStyles/modals/modals'
import {IModal} from '../../shared/types/modal/modal.props'

const AddModal = ({openModal, closeModal}: IModal) => {
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
      <Box className={classes.modalContainer}>
        <Box id="unstyled-modal-title" className="add-evaluation-criteria-name">
          Add Evaluation Criteria Name
        </Box>
        <Box className="add-evaluation-criteria-radio">
          <FormGroup className="choose-evaluation-criteria-group-checkboxes">
            <FormControlLabel
              control={
                <Checkbox defaultChecked color="default" className={classes.checkboxColor} />
              }
              label={<Box className="color-light-gray">Add subfilter (optional )</Box>}
            />
            <FormControlLabel
              control={
                <Checkbox defaultChecked color="default" className={classes.checkboxColor} />
              }
              label={<Box className="color-light-gray">Add subfilter (optional )</Box>}
            />
            <FormControlLabel
              control={
                <Checkbox defaultChecked color="default" className={classes.checkboxColor} />
              }
              label={<Box className="color-light-gray">Add subfilter (optional )</Box>}
            />
          </FormGroup>
        </Box>
        <Box className="modal-button-container">
          <Button className={classes.colorBlue} onClick={closeModal}>
            Cancel
          </Button>
          <Button className={classes.colorBlue} onClick={closeModal}>
            Apply
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default AddModal
