import React, {useState} from 'react'
import {Box} from '@mui/material'
import EmptyPageImg from '../../../assets/images/emptyPage'
import SavedSubmissions from '../savedSubmissions'
import MakeStyles from '../../../assets/makeStyles/makeStyles'

const SavedSubmissionsTabs = () => {
  const classes = MakeStyles()
  const [notSavedAnySubmission] = useState(false)

  if (notSavedAnySubmission) {
    return (
      <Box component="div" className="no-event-information-container">
        <Box component="div">
          <Box className={classes.mAuto}>
            <EmptyPageImg />
          </Box>
          <Box component="div" className="no-event-information">
            You have not saved any submission yet.
          </Box>
          <Box component="div" className="no-event-information-description mt-10">
            When you review the submitted form you can save it here.
          </Box>
        </Box>
      </Box>
    )
  }
  return <SavedSubmissions />
}

export default SavedSubmissionsTabs
