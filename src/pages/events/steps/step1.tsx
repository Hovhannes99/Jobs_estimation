import React, {ChangeEvent, useEffect, useState} from 'react'
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  IconButton,
  InputBase,
  ListItemText,
  OutlinedInput,
  TextField,
} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import {useLocation} from 'react-router'
import MakeStyles from '../../../assets/makeStyles/makeStyles'
import {UseCreateEventContext} from '../../../context/createEventContext/createEventContext'
import {ICreateEventProps} from '../../../context/createEventContext/createEventContext.props'
import SelectWithInputSearch from '../../../assets/makeStyles/selectWithInputSearch/selectWithInputSearch'
import SearchIcon from '../../../assets/images/Icons/searchIcon'
import SelectDate from '../selectDate'
import {IStep1} from '../../../shared/types/events/events'
import UsersApi from '../../../api/users'
import {INameOfUsers} from '../../../shared/types'

const Step1 = ({setNextStep, error, clone, view}: IStep1) => {
  const classes = MakeStyles()

  const location = useLocation() as {
    state: {
      createNewEvent?: boolean
      id?: number
    }
  }
  const {
    setStartDate,
    startDate,
    setEndDate,
    endDate,
    setCheckedIdOfEvaluator,
    setCheckedIdOfEvaluatee,
    checkedIdOfEvaluator,
    checkedIdOfEvaluatee,
    checkedItemOfEvaluatee,
    setCheckedItemOfEvaluatee,
    checkedItemOfEvaluator,
    nameOfUsers,
    setNameOfUsers,
    setCheckedItemOfEvaluator,
  } = UseCreateEventContext() as ICreateEventProps

  const [searchTermEvaluate, setSearchTermEvaluate] = useState('')
  const [searchResultsEvaluates, setSearchResultsEvaluates] = useState<INameOfUsers[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [searchTermEvaluator, setSearchTermEvaluator] = useState('')
  const [searchResultsEvaluators, setSearchResultsEvaluators] = useState<INameOfUsers[]>([])

  const handleChangeSearchEvaluate = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTermEvaluate(event.target.value)
  }
  const handleChangeSearchEvaluator = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTermEvaluator(event.target.value)
  }

  const {
    setEventTitle,
    eventTitle,
    setEventEvaluatee,
    eventEvaluator,
    eventEvaluatee,
    setEventEvaluator,
  } = UseCreateEventContext() as ICreateEventProps

  const renderSearchListEvaluator = () => {
    if (!searchTermEvaluator.length) {
      return isLoading ? (
        <Box className="mt-22 mb-22 width-100 text-center">
          <CircularProgress />
        </Box>
      ) : (
        nameOfUsers &&
          nameOfUsers.map((user) => (
            <MenuItem
              key={user.id}
              onClick={() => handleMenuItemEvaluator(user.id, user.firstName)}
              value={user.id}
            >
              <Checkbox
                className={`${classes.checkboxColor}`}
                color="default"
                checked={checkedIdOfEvaluator.some((item) => item && item.evaluatorId === user.id)}
              />
              <ListItemText primary={user.firstName} />
            </MenuItem>
          ))
      )
    }
    return searchResultsEvaluators.length ? (
      searchResultsEvaluators.map((user) => (
        <MenuItem
          key={user.id}
          onClick={() => handleMenuItemEvaluator(user.id, user.firstName)}
          value={user.id}
        >
          <Checkbox
            className={`${classes.checkboxColor}`}
            color="default"
            checked={checkedIdOfEvaluator.some((item) => item && item.evaluatorId === user.id)}
          />
          <ListItemText primary={user.firstName} />
        </MenuItem>
      ))
    ) : (
      <Box className="w-100 text-center mt-22 mb-22">There is not data</Box>
    )
  }

  const handleMenuItemEvaluatee = (id: number, userName: string) => {
    if (checkedItemOfEvaluatee.find((item) => item && item.evaluateeId === id)) {
      const removeItem = checkedItemOfEvaluatee
        .filter((item) => {
          if (item.evaluateeId !== id) {
            return true
          }
          return false
        })
        .map((item) => item)

      const removeId = checkedIdOfEvaluatee.filter((item) => item && item.evaluateeId !== id)
      setCheckedIdOfEvaluatee(removeId)

      setCheckedItemOfEvaluatee(removeItem)
    } else {
      setCheckedItemOfEvaluatee([...checkedItemOfEvaluatee, {evaluateeId: id, userName}])
      setCheckedIdOfEvaluatee([...checkedIdOfEvaluatee, {evaluateeId: id}])
    }
  }

  const handleMenuItemEvaluator = (id: number, userName: string) => {
    if (checkedItemOfEvaluator.find((item) => item && item.id === id)) {
      const removeItem = checkedItemOfEvaluator
        .filter((item) => {
          if (item.id !== id) {
            return true
          }
          return false
        })
        .map((item) => ({
          ...item,
          ...(!location.state.createNewEvent && {eventId: location.state.id}),
        }))
      const removeId = checkedIdOfEvaluator.filter((item) => item && item.evaluatorId !== id)
      setCheckedIdOfEvaluator(removeId)

      setCheckedItemOfEvaluator(removeItem)
    } else {
      setCheckedItemOfEvaluator([
        ...checkedItemOfEvaluator,
        {id, userName, ...(!location.state.createNewEvent && {eventId: location.state.id})},
      ])
      setCheckedIdOfEvaluator([...checkedIdOfEvaluator, {evaluatorId: id}])
    }
  }

  useEffect(() => {
    const updateItemOfEvaluator = checkedItemOfEvaluator.map((item) => item && item.userName)
    setEventEvaluator(updateItemOfEvaluator)
  }, [checkedItemOfEvaluator])

  useEffect(() => {
    const updateItemOfEvaluatee = checkedItemOfEvaluatee.map((item) => item && item.userName)
    setEventEvaluatee(updateItemOfEvaluatee)
  }, [checkedItemOfEvaluatee])

  const renderSearchListEvaluates = () => {
    if (!searchTermEvaluate.length) {
      return isLoading ? (
        <Box className="mt-22 mb-22 width-100 text-center">
          <CircularProgress />
        </Box>
      ) : (
        nameOfUsers &&
          nameOfUsers.map((user) => (
            <MenuItem
              dense
              key={user.id}
              onClick={() => handleMenuItemEvaluatee(user.id, user.firstName)}
              value={user.id}
            >
              <Checkbox
                className={`${classes.checkboxColor}`}
                color="default"
                checked={checkedIdOfEvaluatee.some((item) => item && item.evaluateeId === user.id)}
              />
              <ListItemText primary={user.firstName} />
            </MenuItem>
          ))
      )
    }
    return searchResultsEvaluates.length ? (
      searchResultsEvaluates.map((user) => (
        <MenuItem
          dense
          key={user.id}
          onClick={() => handleMenuItemEvaluatee(user.id, user.firstName)}
          value={user.id}
        >
          <Checkbox
            className={`${classes.checkboxColor}`}
            color="default"
            checked={checkedIdOfEvaluatee.some((item) => item && item.evaluateeId === user.id)}
          />
          <ListItemText primary={user.firstName} />
        </MenuItem>
      ))
    ) : (
      <Box className="w-100 text-center mt-22 mb-22">There is not data</Box>
    )
  }

  useEffect(() => {
    const results = nameOfUsers.filter((item) =>
      item.firstName.toLowerCase().includes(searchTermEvaluate.toLowerCase()),
    )
    setSearchResultsEvaluates(results)
  }, [searchTermEvaluate])

  useEffect(() => {
    const results = nameOfUsers.filter((item) =>
      item.firstName.toLowerCase().includes(searchTermEvaluator.toLowerCase()),
    )
    setSearchResultsEvaluators(results)
  }, [searchTermEvaluator])

  const stopImmediatePropagation = (e: {
    stopPropagation: () => void
    preventDefault: () => void
  }) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const applyHandle = (start: string, end: string) => {
    setStartDate(start)
    setEndDate(end)
  }

  useEffect(() => {
    ;(async () => {
      if (!nameOfUsers.length) {
        setIsLoading(true)
        const resultUsers = await UsersApi.usersList()
        setNameOfUsers(resultUsers.data)
        setIsLoading(false)
      }
    })()
  }, [])

  useEffect(() => {
    if (eventTitle && startDate && endDate && eventEvaluatee.length && eventEvaluator.length) {
      setNextStep(true)
    } else {
      setNextStep(false)
    }
  }, [eventEvaluator, eventEvaluatee, startDate, endDate, eventTitle])

  const handleCheckedEvaluator = (value: boolean) => {
    if (value) {
      const updateCheckedItemOfEvaluator = nameOfUsers.map(
        (item: {firstName: string; id: number}) => ({
          id: item.id,
          userName: item.firstName,
          ...(!location.state.createNewEvent && {eventId: location.state.id}),
        }),
      )

      setCheckedItemOfEvaluator([...updateCheckedItemOfEvaluator])

      setCheckedIdOfEvaluator([...nameOfUsers.map((item) => ({evaluatorId: item.id}))])
      setEventEvaluator([...nameOfUsers.map((item) => item.firstName)])
    } else {
      setEventEvaluator([])
      setCheckedItemOfEvaluator([])
      setCheckedIdOfEvaluator([])
    }
  }

  const handleCheckedEvaluatee = (value: boolean) => {
    if (value) {
      const updateCheckedItemOfEvaluatee = nameOfUsers.map(
        (item: {firstName: string; id: number}) => ({
          userName: item.firstName,
          evaluateeId: item.id,
        }),
      )

      setCheckedItemOfEvaluatee([...updateCheckedItemOfEvaluatee])

      setCheckedIdOfEvaluatee([
        ...nameOfUsers.map((item) => ({
          evaluateeId: item.id,
        })),
      ])
      setEventEvaluatee([...nameOfUsers.map((item) => item.firstName)])
    } else {
      setEventEvaluatee([])
      setCheckedItemOfEvaluatee([])
      setCheckedIdOfEvaluatee([])
    }
  }

  return (
    <Box className="create-event-container">
      <Box className="text-field-container align-center mt-40">
        <Box
          component="span"
          className="font-weight-400 font-size-16 line-height-22 color-dark-blue"
        >
          Event Title:
        </Box>
        <Box className="text-field-item">
          <TextField
            className={`${classes.w100} ${classes.inputStyle}`}
            inputProps={{maxLength: 30}}
            size="small"
            disabled={view}
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            variant="outlined"
            id="outlined-basic"
          />
        </Box>
      </Box>
      <Box className="text-field-container align-center mt-30">
        <Box
          component="span"
          className="font-weight-400 font-size-16 line-height-22 color-dark-blue"
        >
          Assign Dates:
        </Box>
        <Box className="text-field-item">
          <SelectDate
            applyHandle={applyHandle}
            startDateProps={startDate}
            endDateProps={endDate}
            border={false}
            disabled={location.state.createNewEvent ? false : !clone || view}
            backgroundColor="background-input"
          />
        </Box>
      </Box>
      <Box className="text-field-container align-center mt-30">
        <Box
          component="span"
          className="font-weight-400 font-size-16 line-height-22 color-dark-blue"
        >
          Evaluators:
        </Box>
        <Box className="text-field-item">
          <FormControl size="small" className={`${classes.w100}`}>
            <InputLabel id="demo-multiple-checkbox-label">Select</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              disabled={location.state.createNewEvent ? false : !clone || view}
              multiple
              className={`${classes.bgWhite} ${classes.inputStyle}`}
              value={eventEvaluator}
              input={<OutlinedInput label="Select" />}
              renderValue={(selected) => selected && selected.join(', ')}
              MenuProps={SelectWithInputSearch}
            >
              <Box onClickCapture={stopImmediatePropagation}>
                <Box className="text-field-search-with-icon">
                  <IconButton className="icon-button" aria-label="directions">
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    onKeyUp={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                    value={searchTermEvaluator}
                    onChange={handleChangeSearchEvaluator}
                    className={`${classes.w100} input-base border-radius-30`}
                    placeholder="Search user"
                    inputProps={{'aria-label': '0'}}
                  />
                </Box>
              </Box>
              <Box className="text-field-search-with-icon justify-center">
                <Button onClick={() => handleCheckedEvaluator(true)}>Check all</Button>
                <Button onClick={() => handleCheckedEvaluator(false)}>Uncheck all</Button>
              </Box>
              {renderSearchListEvaluator()}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box className="text-field-container align-center mt-36">
        <Box
          component="span"
          className="font-weight-400 font-size-16 line-height-22 color-dark-blue"
        >
          Evaluatees:
        </Box>
        <Box className="text-field-item">
          <Box>
            <FormControl size="small" className={` ${classes.w100}`}>
              <InputLabel id="demo-multiple-checkbox-label">Select</InputLabel>
              <Select
                disabled={location.state.createNewEvent ? false : !clone || view}
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                className={`${classes.bgWhite} ${classes.inputStyle}
                `}
                value={eventEvaluatee}
                input={<OutlinedInput label="Select" />}
                renderValue={(selected) => selected && selected.join(', ')}
                MenuProps={SelectWithInputSearch}
              >
                <Box className="width-100" onClickCapture={stopImmediatePropagation}>
                  <Box className="text-field-search-with-icon">
                    <IconButton className="icon-button" aria-label="directions">
                      <SearchIcon />
                    </IconButton>
                    <InputBase
                      onKeyUp={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                      value={searchTermEvaluate}
                      onChange={handleChangeSearchEvaluate}
                      className={`${classes.w100} input-base`}
                      placeholder="Search user"
                      inputProps={{'aria-label': '0'}}
                    />
                  </Box>
                </Box>
                <Box className="text-field-search-with-icon justify-center">
                  <Button onClick={() => handleCheckedEvaluatee(true)}>Check all</Button>
                  <Button onClick={() => handleCheckedEvaluatee(false)}>Uncheck all</Button>
                </Box>
                {renderSearchListEvaluates()}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box className="color-red mt-26">{error && 'Please fill out required fields'}</Box>
    </Box>
  )
}
export default Step1
