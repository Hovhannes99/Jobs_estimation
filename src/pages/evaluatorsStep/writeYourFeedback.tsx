import React, {useState} from 'react'
import {Box, Button, TextField} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '../../assets/images/Icons/editIcon'
import useStyles from '../../assets/makeStyles/evaluatorsStep/evaluatorsStep'
import {IWriteYourFeedback} from '../../shared/types/feedback/feedback'
import useStylesButton from '../../assets/makeStyles/buttons/buttons'

const WriteYourFeedback = ({
  feedbackName,
  handleFeedback,
  handleClearProps,
}: IWriteYourFeedback) => {
  const classes = useStyles()
  const classesButtons = useStylesButton()

  const [showBoxFeedback, setShowBoxFeedback] = useState(false)
  const [showCollapseBody, setShowCollapseBody] = useState(false)
  const [writeYourFeedback, setWriteYourFeedback] = useState<string[]>([])

  const [newWriteYourFeedBackElement, setNewWriteYourFeedBackElement] = useState<
    string | undefined
  >('')

  const addNewWriteFeedBackElement = () => {
    setShowCollapseBody(true)
    if (newWriteYourFeedBackElement) {
      setWriteYourFeedback([...writeYourFeedback, newWriteYourFeedBackElement])
    }
    if (newWriteYourFeedBackElement) {
      handleFeedback(newWriteYourFeedBackElement)
    }
    setNewWriteYourFeedBackElement('')
  }

  const addBoxFeedback = () => {
    if (newWriteYourFeedBackElement) {
      setShowCollapseBody(false)
      setShowBoxFeedback(true)
      setWriteYourFeedback([...writeYourFeedback, newWriteYourFeedBackElement])
      handleFeedback(newWriteYourFeedBackElement)
      setNewWriteYourFeedBackElement('')
    }
  }

  const handleEdit = () => {
    setShowBoxFeedback(false)
    setShowCollapseBody(true)
  }

  const handleClear = () => {
    setNewWriteYourFeedBackElement('')
    setShowCollapseBody(false)
    setWriteYourFeedback([])
    handleClearProps()
  }

  return (
    <Box>
      <Box className="font-weight-500 font-size-16 line-height-20 d-flex align-center">
        <Box>{feedbackName}</Box>
        {showBoxFeedback && (
          <Box className="ml-24 cursor-pointer">
            <Box onClick={() => handleEdit()}>
              <EditIcon />
            </Box>
          </Box>
        )}
      </Box>
      {showBoxFeedback ? (
        <Box className="evaluators-step-box-container">
          {writeYourFeedback &&
            writeYourFeedback.length &&
            writeYourFeedback.map((item) => (
              <Box className="evaluators-step-box-row" key={item}>
                {' '}
                {item}{' '}
              </Box>
            ))}
        </Box>
      ) : (
        <Box className="collapse-container">
          <Box className="collapse-container-heading mt-26">
            <Box className="font-size-16 font-weight-500 color-black">Write your feedback</Box>
            <Box className="cursor-pointer" onClick={() => addNewWriteFeedBackElement()}>
              <AddIcon />
            </Box>
          </Box>
          {showCollapseBody && (
            <Box>
              <Box className="collapse-container-body">
                {writeYourFeedback.length ? (
                  writeYourFeedback.map((item) => (
                    <Box
                      className="collapse-box font-size-14 font-weight-400 line-height-20"
                      key={item}
                    >
                      {' '}
                      {item}{' '}
                    </Box>
                  ))
                ) : (
                  <Box />
                )}
                <TextField
                  value={newWriteYourFeedBackElement}
                  onChange={(event) => setNewWriteYourFeedBackElement(event.target.value)}
                  id="standard-basic"
                  className={`${classes.textFieldWithOutBorder}`}
                  variant="standard"
                />
              </Box>
              <Box className="collapse-container-footer">
                <Button
                  // ${classes.clearButton}
                  onClick={handleClear}
                  className={`${classesButtons.transparentWithBorderButton}`}
                >
                  Clear
                </Button>
                <Box className="ml-10">
                  <Button
                    className={`${classesButtons.colorBlueButton} `}
                    onClick={() => addBoxFeedback()}
                    color="blue"
                    variant="contained"
                  >
                    Add
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default WriteYourFeedback
