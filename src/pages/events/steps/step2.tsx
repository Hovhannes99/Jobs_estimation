import React, {Dispatch, useEffect, useState} from 'react'
import {Box, Button, Checkbox, FormGroup, ListItemText, OutlinedInput} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import {useLocation} from "react-router";
import SelectWithInputSearch from '../../../assets/makeStyles/selectWithInputSearch/selectWithInputSearch'
import MakeStyles from '../../../assets/makeStyles/makeStyles'
import {UseCreateEventContext} from '../../../context/createEventContext/createEventContext'
import {ICreateEventProps} from '../../../context/createEventContext/createEventContext.props'
import getEventEvaluatorEvaluateesList from '../../utils/eventEvaluatorEvaluateesUtils'
// import {IEventEvaluators} from '../../../shared/types/events/events'
// import getUserList from '../../utils/usersUtils'

const Step2 = ({
  setNextStep,
  view,
  getEvaluatorEvaluatee,
  error,
}: {
  setNextStep: Dispatch<React.SetStateAction<boolean>>
  view: boolean
  getEvaluatorEvaluatee: boolean
  error: boolean
}) => {
  const classes = MakeStyles()

  const [searchTermEvaluate] = useState('')
  const [searchResultsEvaluates] = useState<
    {evaluateeId: number; evaluatorId?: number; userName: string}[]
  >([]);

  const location = useLocation() as {
    state: {
      createNewEvent?: boolean
    }
  }
  const {
    checkedIdOfEvaluatee,
    checkedItemOfEvaluatee,
    checkedItemOfEvaluator,
    setCheckedOfEvaluatee,
    checkedOfEvaluatee,
  } = UseCreateEventContext() as ICreateEventProps

  useEffect(() => {
    ;(async () => {
      const updateCheckedOfEvaluatee = !getEvaluatorEvaluatee
        ? checkedItemOfEvaluator.map((item) =>
            checkedItemOfEvaluatee.map((item2) => ({
              evaluatorId: item.id,
              ...item2,
            })),
          )
        : await Promise.all(
            checkedItemOfEvaluator.map(async (item) => getEventEvaluatorEvaluateesList(item)),
          )

      const mergeObjects = updateCheckedOfEvaluatee.reduce((a, b) => a.concat(b))

      if (checkedOfEvaluatee.length) {
        const updateMergeObjects = mergeObjects.filter(
          (item: {evaluatorId: number | undefined; evaluateeId: number}) =>
            checkedOfEvaluatee.find(
              (item2) =>
                item2.evaluatorId === item.evaluatorId && item2.evaluateeId === item.evaluateeId,
            ) && item,
        )
        setCheckedOfEvaluatee(updateMergeObjects)
      } else {
        setCheckedOfEvaluatee(mergeObjects)
      }
    })()
  }, [checkedItemOfEvaluator, checkedItemOfEvaluatee])

  const handleMenuItemEvaluatee = (evaluatorId: number, evaluateeId: number, userName: string) => {
    if (
      checkedOfEvaluatee.find(
        (item) => item.evaluateeId === evaluateeId && item.evaluatorId === evaluatorId,
      )
    ) {
      const removeItem = checkedOfEvaluatee
        .filter((item) => {
          if (item.evaluateeId === evaluateeId && item.evaluatorId === evaluatorId) {
            return false
          }
          return true
        })
        .map((item) => item)
      setCheckedOfEvaluatee(removeItem)
    } else {
      setCheckedOfEvaluatee([...checkedOfEvaluatee, {evaluatorId, evaluateeId, userName}])
    }
  }

  const renderSearchListEvaluates = (id: number) => {
    if (!searchTermEvaluate.length) {
      return (
        checkedItemOfEvaluatee &&
        checkedItemOfEvaluatee.map((item) => (
          <MenuItem
            dense
            disabled={view}
            key={item.evaluateeId}
            onClick={() => handleMenuItemEvaluatee(id, item.evaluateeId, item.userName)}
            value={item.evaluateeId}
          >
            <Checkbox
              className={`${classes.checkboxColor}`}
              color="default"
              checked={checkedOfEvaluatee?.some(
                (item2) =>
                  item2 && item2.evaluateeId === item.evaluateeId && item2.evaluatorId === id,
              )}
            />
            <ListItemText primary={item.userName} />
          </MenuItem>
        ))
      )
    }

    return searchResultsEvaluates.length ? (
      searchResultsEvaluates.map(
        (item) =>
          item && (
            <MenuItem
              dense
              key={item.evaluateeId}
              onClick={() => handleMenuItemEvaluatee(id, item.evaluateeId, item.userName)}
              value={item.evaluateeId}
            >
              <Checkbox
                className={`${classes.checkboxColor}`}
                color="default"
                checked={checkedIdOfEvaluatee.some(
                  (item2) => item2 && item2.evaluateeId === item.evaluateeId,
                )}
              />
              <ListItemText primary={item.userName} />
            </MenuItem>
          ),
      )
    ) : (
      <Box className="w-100 text-center mt-22 mb-22">There is not data</Box>
    )
  }

  const handleAllCheckedEvaluatee = (value: boolean, id: number) => {
    if (value) {
      const checkedOfEvaluatorFilter = checkedItemOfEvaluator.filter(
        (item) => item.id === id && item,
      )

      const updateCheckedOfEvaluatee = checkedOfEvaluatorFilter.map((item) =>
        checkedItemOfEvaluatee.map((item2) => ({
          evaluatorId: item.id,
          ...item2,
        })),
      )

      const mergeObjects = updateCheckedOfEvaluatee.reduce((a, b) => a.concat(b))
      setCheckedOfEvaluatee([
        ...checkedOfEvaluatee.filter(
          (item) =>
            mergeObjects.find(
              (item2) =>
                item2.evaluatorId !== item.evaluatorId && item2.evaluateeId !== item.evaluateeId,
            ) && item,
        ),
        ...mergeObjects,
      ])
    } else {
      const updateCheckedOfEvaluatee = checkedOfEvaluatee.filter(
        (item) => item.evaluatorId !== id && item,
      )

      setCheckedOfEvaluatee([...updateCheckedOfEvaluatee])
    }
  }

  const stopImmediatePropagation = (e: {
    stopPropagation: () => void
    preventDefault: () => void
  }) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const returnEvaluateesArray = (id: number) => {
    const returnEvaluatees = checkedOfEvaluatee
      .filter((item) => {
        if (item.evaluatorId === id) {
          return true
        }
        return false
      })
      .map((item) => item)
    return checkedOfEvaluatee.length
      ? returnEvaluatees.map((item: {userName: string}) => item.userName)
      : []
  }

  useEffect(() => {
    if (checkedOfEvaluatee.length) {
      setNextStep(true)
    } else {
      setNextStep(false)
    }
  }, [checkedOfEvaluatee])

  return (
    <Box className="width-100 d-flex justify-center">
      <Box className="create-event-step-2 mt-14 ">
        <Box className="create-event-body mt-10">
          <Box className="create-event-column">
            <Box
              component="span"
              className="font-weight-400 font-size-16 line-height-22 color-dark-blue"
            >
              Select evaluatees per evaluator
            </Box>
          </Box>
          <Box className="choose-evaluation-criteria create-event-body  pb-30">
            {checkedItemOfEvaluator.map((item) => (
              <FormGroup key={item.id} className="choose-evaluation-criteria-group-checkboxes">
                <Box className="text-field-container width-100 align-center mt-36">
                  <Box className="text-field-of-label d-flex justify-center">
                    <Box
                      component="span"
                      className="text-center font-weight-500  font-size-16 break-word width-70 line-height-22 color-black"
                    >
                      {item.userName}
                    </Box>
                  </Box>
                  <Box className="text-field-item">
                    <Box className="d-flex justify-start">
                      <FormControl size="small" className={`${classes.w100}`}>
                        <InputLabel id="demo-multiple-checkbox-label">Select</InputLabel>
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          className={`${classes.bgWhite} select-with-input-search`}
                          value={returnEvaluateesArray(item.id)}
                          input={<OutlinedInput label="Select" />}
                          renderValue={(selected) => selected && selected.join(', ')}
                          MenuProps={SelectWithInputSearch}
                          disabled={!location.state.createNewEvent}
                        >
                          <Box className="width-100" onClickCapture={stopImmediatePropagation} />
                          <Box className="text-field-search-with-icon justify-center">
                            <Button
                              disabled={view}
                              onClick={() => handleAllCheckedEvaluatee(true, item.id)}
                            >
                              Check all
                            </Button>
                            <Button
                              disabled={view}
                              onClick={() => handleAllCheckedEvaluatee(false, item.id)}
                            >
                              Uncheck all
                            </Button>
                          </Box>
                          {renderSearchListEvaluates(item.id)}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Box>
              </FormGroup>
            ))}
          </Box>
        </Box>
        <Box className="color-red mt-20">{error && 'Please fill out required fields'}</Box>
      </Box>
    </Box>
  )
}

export default Step2
