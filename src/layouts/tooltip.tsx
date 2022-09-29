import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import AddIcon from '@mui/icons-material/Add'
import Tooltip from '@mui/material/Tooltip'
import clsx from 'clsx'
import {
  FormControl,
  RadioGroup,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Radio,
  Button,
  TextField,
} from '@mui/material'
import {IDropDown} from '../shared/types/tooltip/tooltip'
import MakeStyles from '../assets/makeStyles/makeStyles'
import useStylesTextFields from '../assets/makeStyles/textFields/textFields'
import useStylesButton from '../assets/makeStyles/buttons/buttons'
import {IQuestions} from '../shared/types/events/events'

const ButtonDropDown = ({
  view,
  buttonText,
  tooltip,
  applyAddFromTo,
  deletedSubQuestions,
  questionGroupId,
  handleQuestionsApplyProps,
  handleAddNewSubQuestions,
}: IDropDown) => {
  const classesTextFields = useStylesTextFields()
  const classes = MakeStyles()
  const classesButtons = useStylesButton()
  const classesFieldText = useStylesTextFields()

  const [from, setFrom] = useState<string>('')
  const [to, setTo] = useState<string>('')

  const [addNewSubfilterValue, setAddNewSubfilterValue] = useState<string>('')
  const [showInput, setShowInput] = useState<boolean>(false)
  const [uncheckedSubquestions, setUncheckedSubquestions] = useState<IQuestions[]>([])

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setFrom('')
    setTo('')
  }

  const handleChangesApply = () => {
    if (applyAddFromTo) {
      applyAddFromTo(Number(from), Number(to))
    }
    handleClose()
  }

  const handleChecked = (checked: boolean, item: IQuestions) => {
    if (!checked) {
      setUncheckedSubquestions([...uncheckedSubquestions, item])
    } else {
      setUncheckedSubquestions(
        uncheckedSubquestions.filter((itemFilter) => {
          if (itemFilter.id !== item.id) {
            return item
          }
          setUncheckedSubquestions([...uncheckedSubquestions, item])
          return null
        }),
      )
    }
  }

  useEffect(() => {
    if (deletedSubQuestions) {
      setUncheckedSubquestions(deletedSubQuestions)
    }
  }, [deletedSubQuestions])

  const handleAddSubQuestions = () => {
    setShowInput(true)
  }

  const handleAddButton = () => {
    setShowInput(false)
    if (handleAddNewSubQuestions && questionGroupId && addNewSubfilterValue) {
      handleAddNewSubQuestions(addNewSubfilterValue, questionGroupId)
      setAddNewSubfilterValue('')
    }
  }

  const handleQuestionsApply = () => {
    if (handleQuestionsApplyProps) {
      const updateQuestions =
        deletedSubQuestions &&
        deletedSubQuestions.filter((itemFilter) => {
          if (questionGroupId === itemFilter.questionGroupId) {
            return !uncheckedSubquestions.includes(itemFilter)
          }
          return null
        })
      if (updateQuestions) {
        handleQuestionsApplyProps(updateQuestions)
      }
      setUncheckedSubquestions([])
    }

    handleClose()
  }

  return (
    <Box>
      <Tooltip title="" disableHoverListener>
        <Button
          disabled={view}
          className={clsx(classes.colorBlue, classesButtons.transparentButton)}
          onClick={handleClick}
        >
          <p className="text-color-gradient">{buttonText}</p>
        </Button>
      </Tooltip>
      {tooltip === 'radio' && (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              width: '300px',
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              background: '#FFFFFF',
              border: '1px solid #E6E6E6',
              borderRadius: '4px',
              padding: 0,
              mt: 1.5,
            },
          }}
          transformOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        >
          <Box className="tooltip-heading font-size-14 font-weight-500">
            Add New Rating Score Range
          </Box>
          <Box className="tooltip-radio-container">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label={
                    <Box className="d-flex align-center">
                      From
                      <TextField
                        onChange={(event) => setFrom(event.target.value)}
                        className={classesTextFields.textFieldSmall20}
                        id="standard-basic"
                        variant="standard"
                      />
                      point - to
                      <TextField
                        onChange={(event) => setTo(event.target.value)}
                        className={classesTextFields.textFieldSmall20}
                        id="standard-basic"
                        variant="standard"
                      />
                      points
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>
            <Box className="text-right">
              <Button onClick={handleClose} className={classes.colorBlue}>
                Cancel
              </Button>
              <Button onClick={handleChangesApply} className={classes.colorBlue}>
                Apply
              </Button>
            </Box>
          </Box>
        </Menu>
      )}
      {tooltip === 'checkbox' && (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              width: '300px',
              padding: '15px 24px 20px 26px',
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              background: '#FFFFFF',
              border: '1px solid #E6E6E6',
              borderRadius: '4px',
              mt: '8px',
            },
          }}
          transformOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        >
          <Box className="tooltip-heading font-size-14 font-weight-500 line-height-22 d-flex justify-between align-center">
            <Box className="color-dark-blue font-size-16 font-weight-700">New Sub Criteria</Box>
            <Button className={classes.colorBlue} onClick={() => handleAddSubQuestions()}>
              <AddIcon />
            </Button>
          </Box>

          <Box className="tooltip-checkbox-container">
            <Box className="tooltip-checkbox-container-form-group">
              {showInput && (
                <Box className="mt-10 width-100 text-center d-flex">
                  <TextField
                    inputProps={{maxLength: 100}}
                    size="small"
                    id="outlined-basic"
                    label="Add new subfilter"
                    variant="outlined"
                    value={addNewSubfilterValue}
                    onChange={(e) => setAddNewSubfilterValue(e.target.value)}
                    className={`${classesFieldText.textFieldLong}`}
                  />
                  <Button onClick={() => handleAddButton()}>Add</Button>
                </Box>
              )}

              <FormGroup>
                {deletedSubQuestions && deletedSubQuestions.length ? (
                  deletedSubQuestions.map((item) => {
                    if (questionGroupId === item.questionGroupId) {
                      return (
                        <Box className="mt-18 ml-10 mr-10">
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
                              <Box className="color-dark-blue line-height-20 font-weight-400 font-size-15 ">
                                {item.questionTitle}
                              </Box>
                            }
                          />
                        </Box>
                      )
                    }
                    return null
                  })
                ) : (
                  <Box className="color-dark-blue mt-16">There is not data</Box>
                )}
              </FormGroup>
            </Box>
            <Box className="text-center mt-12">
              <Button
                onClick={handleClose}
                className={`${classesButtons.styleOfButtonWithoutColor}`}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleQuestionsApply()}
                className={classesButtons.transparentButton}
              >
                Apply
              </Button>
            </Box>
          </Box>
        </Menu>
      )}
    </Box>
  )
}

export default ButtonDropDown
