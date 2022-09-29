import React, {useState} from 'react'
import {Box, Button} from '@mui/material'
import {useNavigate} from 'react-router'
// import CalendarImg from '../../../assets/images/Icons/calendarIconColor'
import EventsPage from '../eventsPage'
import MakeStyles from '../../../assets/makeStyles/makeStyles'
import useStylesButton from '../../../assets/makeStyles/buttons/buttons'
import PlusIcon from '../../../assets/images/Icons/plus'
import TableCalendarIcon from '../../../assets/images/Icons/tableCalendarIcon'

const EventsTabs = () => {
  const classes = MakeStyles()
  const classesButton = useStylesButton()
  const [noEventInformation, setNoEventInformation] = useState(false)
  const navigate = useNavigate()

  const handleCreateEvent = () => {
    navigate('event-create', {state: {createNewEvent: true}})
  }

  if (noEventInformation) {
    return (
      <Box component="div" className="no-event-information-container">
        <Box component="div">
          <Box className={classes.mAuto}>
            {/*<CalendarImg />*/}
            <TableCalendarIcon />
          </Box>
          <Box component="div" className="no-event-information ">
            No event information is available yet.
          </Box>
          <Box component="div" className="no-event-information-description mt-6">
            To see event details first you need to create evaluation event.
          </Box>
          <Box className="text-center mt-50">
            <Button
              color="blue"
              className={`${classesButton.colorBlueButton} `}
              variant="contained"
              onClick={() => handleCreateEvent()}
            >
              <Box className="mr-16">
                <PlusIcon />
              </Box>{' '}
              Create new event
            </Button>
          </Box>
        </Box>
      </Box>
    )
  }
  return <EventsPage setNoEventInformation={setNoEventInformation} />
}

export default EventsTabs
