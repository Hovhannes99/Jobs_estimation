import React, {Dispatch, useEffect} from 'react'
import {Box, Button, IconButton, TextField} from '@mui/material'
import uuid from 'react-uuid'
import PercentIcon from '@mui/icons-material/Percent'
import DeleteIcon from '../../../assets/images/Icons/deleteIcon'
import useStylesTextFields from '../../../assets/makeStyles/textFields/textFields'
import {UseCreateEventContext} from '../../../context/createEventContext/createEventContext'
import {ICreateEventProps} from '../../../context/createEventContext/createEventContext.props'
import MakeStyles from '../../../assets/makeStyles/makeStyles'

const Step5 = ({
  view,
  error,
  setNextStep,
}: {
  view: boolean
  error: boolean
  setNextStep: Dispatch<React.SetStateAction<boolean>>
}) => {
  const classesTextFields = useStylesTextFields()
  const classes = MakeStyles()

  const {rangesOfvalue, setRangesOfValue} = UseCreateEventContext() as ICreateEventProps

  useEffect(() => {
    if (rangesOfvalue.length) {
      setNextStep(true)
    } else {
      setNextStep(false)
    }
  }, [rangesOfvalue])

  return (
    <Box>
      <Box className="d-flex align-center justify-between">
        <Box className="font-size-18 font-weight-500 line-height-22" />
      </Box>
      <Box className="create-event-container-step-5 justify-around d-flex mt-14 ">
        <Box className="create-event-body mt-10">
          <Box className="create-event-column">
            <Box className="font-size-16 mr-24 font-weight-700 line-height-22 color-dark-blue">
              Create/Edit ranges
            </Box>
            <Box>
              <Button
                disabled={view}
                onClick={() =>
                  rangesOfvalue.length < 10 &&
                  setRangesOfValue([
                    ...rangesOfvalue,
                    {
                      id: uuid(),
                      bonusRangeFrom: '0',
                      bonusRangeTo: '10',
                      bonusPercentage: '0',
                      bonusRangeName: 'Normal',
                    },
                  ])
                }
              >
                <Box className="text-color-gradient">Add new range</Box>
              </Button>
            </Box>
          </Box>
          <Box className="choose-evaluation-criteria create-event-body pb-30">
            <Box className="d-flex justify-between width-100 align-center">
              <Box className="width-100 range-container">
                {rangesOfvalue.length ? (
                  rangesOfvalue.map((item) => (
                    <Box key={item.id} className="d-flex mt-40 justify-around align-center">
                      <Box className="mr-10">
                        <Button
                          className="cursor-pointer"
                          onClick={() =>
                            !view &&
                            setRangesOfValue(rangesOfvalue.filter((item2) => item2.id !== item.id))
                          }
                        >
                          <DeleteIcon />
                        </Button>
                      </Box>
                      <Box className="d-flex flex-column width-100">
                        <Box>
                          <Box className="width-100 mb-10 d-flex ">
                            <Box className="cursor-pointer color-dark-grey font-size-12 font-weight-400">
                              Range of name
                            </Box>
                          </Box>
                          <Box className="mr-10">
                            <TextField
                              onChange={(e) => {
                                if (e.target.value.length < 20) {
                                  setRangesOfValue(
                                    rangesOfvalue.map((ranges) => {
                                      if (ranges.id === item.id) {
                                        return {...ranges, bonusRangeName: e.target.value}
                                      }
                                      return ranges
                                    }),
                                  )
                                }
                              }}
                              disabled={view}
                              size="small"
                              className={`${classes.inputStyle} input-base`}
                              value={item.bonusRangeName}
                            />
                          </Box>
                        </Box>
                        <Box className="mt-10 settings-container-step-5">
                          <Box className="mr-30">
                            <Box className="width-100 mb-10 d-flex">
                              <Box className="cursor-pointer color-dark-grey font-size-12 font-weight-400">
                                Range min to max
                              </Box>
                            </Box>
                            <Box className="d-flex align-center">
                              <TextField
                                disabled={view}
                                className={`${classesTextFields.numberRemoveArrowUpDown} ${classes.inputStyle} `}
                                value={item.bonusRangeFrom}
                                type="number"
                                error={
                                  item.bonusRangeFrom
                                    ? Number(item.bonusRangeFrom) > 10 ||
                                      Number(item.bonusRangeFrom) < 0
                                    : false
                                }
                                onChange={(e) => {
                                  if (
                                    Number(e.target.value) <= 100 &&
                                    Number(e.target.value) > -1
                                  ) {
                                    setRangesOfValue(
                                      rangesOfvalue.map((item2) => {
                                        if (item2.id === item.id) {
                                          return {...item2, bonusRangeFrom: e.target.value}
                                        }
                                        return item2
                                      }),
                                    )
                                  }
                                }}
                                size="small"
                              />
                              <Box className="ml-10 mr-10">To</Box>
                              <TextField
                                disabled={view}
                                className={`${classesTextFields.numberRemoveArrowUpDown} ${classes.inputStyle}`}
                                error={
                                  item.bonusRangeTo
                                    ? Number(item.bonusRangeTo) > 100 ||
                                      Number(item.bonusRangeTo) < 0
                                    : false
                                }
                                value={item.bonusRangeTo}
                                type="number"
                                onChange={(e) => {
                                  if (
                                    Number(e.target.value) <= 100 &&
                                    Number(e.target.value) > -1
                                  ) {
                                    setRangesOfValue(
                                      rangesOfvalue.map((item2) => {
                                        if (item2.id === item.id) {
                                          return {...item2, bonusRangeTo: e.target.value}
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
                          <Box>
                            <Box className="mb-10 color-dark-grey font-size-12 font-weight-400 ">
                              Bonus Amount
                            </Box>
                            <Box className="d-flex align-center">
                              <Box className="input-field-percent">
                                <TextField
                                  className="text-field width-100"
                                  required
                                  disabled={view}
                                  id="outlined-required"
                                  size="small"
                                  onChange={(e) => {
                                    if (
                                      Number(e.target.value) <= 100 &&
                                      Number(e.target.value) > -1
                                    ) {
                                      setRangesOfValue(
                                        rangesOfvalue.map((item2) => {
                                          if (item2.id === item.id) {
                                            return {...item2, bonusPercentage: e.target.value}
                                          }
                                          return item2
                                        }),
                                      )
                                    }
                                  }}
                                  value={item.bonusPercentage}
                                />
                                <IconButton className="icon-button" aria-label="directions">
                                  <PercentIcon />
                                </IconButton>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
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

export default Step5
