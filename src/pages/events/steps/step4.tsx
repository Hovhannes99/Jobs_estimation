import React, {Dispatch, useEffect} from 'react'
import {Box, Button, TextField} from '@mui/material'
import uuid from 'react-uuid'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DeleteIcon from '../../../assets/images/Icons/deleteIcon'
import EditIcon from '../../../assets/images/Icons/editIcon_2'
import useStylesButton from '../../../assets/makeStyles/buttons/buttons'
import {UseCreateEventContext} from '../../../context/createEventContext/createEventContext'
import {ICreateEventProps} from '../../../context/createEventContext/createEventContext.props'
import MakeStyles from '../../../assets/makeStyles/makeStyles'

const Step4 = ({
  view,
  error,
  setNextStep,
}: {
  view: boolean
  error: boolean
  setNextStep: Dispatch<React.SetStateAction<boolean>>
}) => {
  const classesButtons = useStylesButton()
  const classes = MakeStyles()

  const {buttonsOfValue, setButtonsOfValue} = UseCreateEventContext() as ICreateEventProps

  useEffect(() => {
    if (buttonsOfValue.length) {
      setNextStep(true)
    } else {
      setNextStep(false)
    }
  }, [buttonsOfValue])

  return (
    <Box>
      <Box className="d-flex align-center justify-between">
        <Box className="font-size-18 font-weight-500 line-height-22" />
      </Box>
      <Box className="create-event-container-step-5 justify-around d-flex mt-14 ">
        <Box className="create-event-body mt-10">
          <Box className="create-event-column">
            <Box className="font-size-16 mr-24 font-weight-700 line-height-22 color-dark-blue">
              Create/Edit buttons
            </Box>
            <Box>
              <Button
                disabled={view}
                onClick={() =>
                  buttonsOfValue.length < 10 &&
                  setButtonsOfValue([
                    ...buttonsOfValue,
                    {
                      id: uuid(),
                      scoringName: `New Button ${buttonsOfValue.length}`,
                      edit: false,
                      scoringValue: '1',
                    },
                  ])
                }
              >
                <p className="text-color-gradient">Add new button</p>
              </Button>
            </Box>
          </Box>
          <Box className="choose-evaluation-criteria create-event-body pb-30">
            <Box className="d-flex justify-between mr-30 width-100 align-center">
              <Box className="width-100">
                {buttonsOfValue.length ? (
                  buttonsOfValue.map((item) => (
                    <Box key={item.id} className="settings-container mt-40">
                      <Box className="mr-30 setting-item">
                        <Box className="width-100 mb-10 d-flex ">
                          <Box
                            className="cursor-pointer"
                            onClick={() =>
                              !view &&
                              setButtonsOfValue(
                                buttonsOfValue.filter((item2) => item2.id !== item.id),
                              )
                            }
                          >
                            <DeleteIcon />
                          </Box>
                          <Box
                            className="ml-10 cursor-pointer"
                            onClick={() =>
                              !view &&
                              setButtonsOfValue(
                                buttonsOfValue.map((item2) => {
                                  if (item2.id === item.id) {
                                    return {...item2, edit: !item2.edit}
                                  }
                                  return item2
                                }),
                              )
                            }
                          >
                            {!item.edit ? <EditIcon /> : <CheckCircleOutlineIcon />}
                          </Box>
                        </Box>
                        {!item.edit ? (
                          <Button
                            disabled={view}
                            onClick={() =>
                              setButtonsOfValue(
                                buttonsOfValue.map((item2) => {
                                  if (item2.id === item.id) {
                                    return {...item2, edit: !item2.edit}
                                  }
                                  return item2
                                }),
                              )
                            }
                            className={`${classesButtons.transparentWithBorderButton} ${classesButtons.width190}`}
                          >
                            {item.scoringName}
                          </Button>
                        ) : (
                          <TextField
                            disabled={view}
                            className={`${classes.inputStyle}`}
                            value={item.scoringName}
                            onChange={(e) =>
                              e.target.value.length < 15 &&
                              setButtonsOfValue(
                                buttonsOfValue.map((item2) => {
                                  if (item2.id === item.id) {
                                    return {...item2, scoringName: e.target.value}
                                  }
                                  return item2
                                }),
                              )
                            }
                            size="small"
                          />
                        )}
                      </Box>
                      <Box>
                        <Box className="width-100 mb-10 d-flex">
                          <Box className="cursor-pointer">Point</Box>
                        </Box>
                        <TextField
                          disabled={view}
                          error={
                            item.scoringValue
                              ? Number(item.scoringValue) > 10 || Number(item.scoringValue) < -1
                              : false
                          }
                          className={`${classes.inputStyle}`}
                          value={item.scoringValue}
                          type="number"
                          onChange={(e) => {
                            if (Number(e.target.value) <= 20 && Number(e.target.value) > -1) {
                              setButtonsOfValue(
                                buttonsOfValue.map((item2) => {
                                  if (item2.id === item.id) {
                                    return {...item2, scoringValue: e.target.value}
                                  }
                                  return item2
                                }),
                              )
                            }
                          }}
                          size="small"
                        />
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box className="mt-40 ml-24">There is not data</Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="color-red mt-20">{error && 'Please fill out required fields'}</Box>
    </Box>
  )
}

export default Step4
