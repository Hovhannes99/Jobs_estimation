import {Box, Button, Checkbox, FormControlLabel, Modal, TextField} from '@mui/material'
import React, {Dispatch, useEffect, useState} from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import useStylesButton from '../../assets/makeStyles/buttons/buttons'
// import CheckIcon from '../../assets/images/Icons/checkIcon'
import useStylesModal from '../../assets/makeStyles/modals/modals'
import {IQuestionGroupTitle} from '../../shared/types/events/events'
import MakeStyles from '../../assets/makeStyles/makeStyles'

const AddNewGroupQuestionModal = ({
  openModal,
  closeModal,
  handleSaveDetailsProps,
  // successModal,
  // setSuccessModal,
  loading,
  error,
  data,
  setData,
}: {
  openModal: boolean
  closeModal: () => void
  handleSaveDetailsProps: (value: IQuestionGroupTitle[]) => void
  // successModal: boolean
  // setSuccessModal: Dispatch<React.SetStateAction<boolean>>
  loading: boolean
  error: boolean
  data: IQuestionGroupTitle[]
  setData: Dispatch<React.SetStateAction<IQuestionGroupTitle[]>>
}) => {
  const classes = useStylesModal()
  const classesStyles = MakeStyles()

  const [disabledSaveButton, setDisabledSaveButton] = useState(true)
  const [checkedSubquestions, setCheckedSubquestions] = useState<IQuestionGroupTitle[]>([])

  const classesButtons = useStylesButton()

  // const handleBackToUsersList = () => {
  //   closeModal()
  //   setSuccessModal(false)
  //   setCheckedSubquestions([])
  // }

  useEffect(() => {
    console.log(checkedSubquestions, 'checkedSubquestions')
    console.log(data, 'data')
  }, [checkedSubquestions, data])

  const handleBack = () => {
    closeModal()
  }

  useEffect(() => {
    if (checkedSubquestions.length) {
      setDisabledSaveButton(false)
    } else {
      setDisabledSaveButton(true)
    }
  }, [checkedSubquestions])

  const handleAdd = () => {
    handleSaveDetailsProps(checkedSubquestions)
    setData(data.filter((itemFilter) => checkedSubquestions.indexOf(itemFilter)))
    // setData([...data.map((item) => checkedSubquestions.filter((item2) => item2))
    closeModal()
    // setSuccessModal(false)
    // setCheckedSubquestions([])
  }

  const handleChecked = (checked: boolean, item: IQuestionGroupTitle) => {
    if (checked) {
      setCheckedSubquestions([...checkedSubquestions, {...item, applyDefault: true}])
    } else {
      setCheckedSubquestions(
        checkedSubquestions.filter((itemFilter: {id: number}) => {
          if (itemFilter.id !== item.id) {
            return item
          }
          setCheckedSubquestions([...checkedSubquestions, {...item, applyDefault: false}])
          return null
        }),
      )
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
      className={`${classes.styledModal}`}
    >
      {/*{!successModal ? (*/}
      <Box className={classes.modalContainer}>
        <Box
          id="unstyled-modal-title"
          className="modal-heading text-center font-weight-700 font-size-16 line-height-22 color-dark-blue"
        >
          New Criteria
        </Box>
        <Box className="modal-body">
          <Box className="font-size-16 font-weight-400 line-height-22 color-dark-blue text-center">
            Evaluation Criteria Name
          </Box>
          <Box className="d-flex justify-center mt-20 pr-10 pl-10">
            <TextField
              placeholder="Type Name"
              size="small"
              className={`${classesStyles.inputStyle} ${classesStyles.w100} `}
            />
          </Box>
          <Box className="mt-32">
            {data && data.length ? (
              data.map((item) => (
                <Box key={item.id} className="ml-10 mr-10">
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="default"
                        className={`${classes.checkboxColor}`}
                        onChange={(e) => handleChecked(e.target.checked, item)}
                      />
                    }
                    key={item.id}
                    label={
                      <Box className="color-dark-blue font-weight-400 font-size-15 ">
                        {item.questionGroupTitle}
                      </Box>
                    }
                  />
                </Box>
              ))
            ) : (
              <Box className="color-dark-blue">There is no Data</Box>
            )}
          </Box>
        </Box>
        <Box className="modal-footer">
          {loading ? (
            <Box className="m-auto text-center pb-10">
              <CircularProgress />
            </Box>
          ) : (
            <Box className="d-flex">
              <Box className="mr-10">
                <Button
                  className={`${classesButtons.styleOfButtonWithoutColor}`}
                  onClick={() => handleBack()}
                >
                  Cancel
                </Button>
              </Box>
              <Button
                className={classesButtons.transparentButton}
                disabled={disabledSaveButton}
                onClick={() => handleAdd()}
              >
                Add
              </Button>
            </Box>
          )}
        </Box>
        {error && <Box className="m-auto color-red text-center pb-20">Something went wrong</Box>}
      </Box>
      {/*) : (*/}
      {/*<Box className={classes.modalContainer}>*/}
      {/*  <Box className="check-icon-container">*/}
      {/*    <Box className={` ${classes.auto}`}>*/}
      {/*      <CheckIcon />*/}
      {/*    </Box>*/}
      {/*    <Box className="mt-10 font-weight-500 font-size-16 line-height-22"> Success!</Box>*/}
      {/*    <Box className="mt-20 font-weight-500 font-size-16 line-height-22">*/}
      {/*      This group question added.*/}
      {/*    </Box>*/}
      {/*    <Box className="mt-20">*/}
      {/*      <Button*/}
      {/*        className={`${classesButtons.colorBlueButton} ${classesButtons.widthPercent100}`}*/}
      {/*        color="blue"*/}
      {/*        variant="contained"*/}
      {/*        onClick={() => handleBackToUsersList()}*/}
      {/*      >*/}
      {/*        Back*/}
      {/*      </Button>*/}
      {/*    </Box>*/}
      {/*  </Box>*/}
      {/*</Box>*/}
      {/*)}*/}
    </Modal>
  )
}

export default AddNewGroupQuestionModal
