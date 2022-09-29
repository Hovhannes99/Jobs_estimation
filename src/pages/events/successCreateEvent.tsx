import React from 'react'
import {Box, Button} from '@mui/material'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router'
import EventSuccess from '../../assets/images/eventSuccess'
import useStylesButton from '../../assets/makeStyles/buttons/buttons'
import MakeStyles from '../../assets/makeStyles/makeStyles'

const SuccessEvent = () => {
  const classes = MakeStyles()
  const classesButton = useStylesButton()
  const navigate = useNavigate()

  const handleCreateEvent = () => {
    navigate('/events/event-create', {state: {createNewEvent: true}})
  }

  return (
    <Box className="events-page">
      <Box className="events-success">
        <Box className="text-center">
          <Box className={classes.mAuto}>
            <EventSuccess />
          </Box>
          <Box className="mt-44 font-size-18 font-weight-400 line-height-22 color-black">
            Your evaluation event is all set!
          </Box>
          <Box className="mt-36 d-flex">
            <Box className="mr-32">
              <Link to="/events" className="text-decoration-none">
                <Button
                  className={`${classesButton.transparentWithBorderButton} ${classesButton.width190}`}
                >
                  VIEW EVENTS LIST
                </Button>
              </Link>
            </Box>
            <Button
              variant="contained"
              color="blue"
              onClick={() => handleCreateEvent()}
              className={`${classesButton.colorBlueButton} ${classesButton.width190}`}
            >
              Create New Event
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default SuccessEvent
