import React, {useState} from 'react'
import {Box} from '@mui/material'
import Folder from '../../../assets/images/folder'
import Submissions from '../submissions'
import MakeStyles from '../../../assets/makeStyles/makeStyles'

const SubmissionsTabs = () => {
  const classes = MakeStyles()

  const [noOneSubmitted] = useState(false)

  if (noOneSubmitted) {
    return (
      <Box component="div" className="no-event-information-container">
        <Box component="div">
          <Box className={classes.mAuto}>
            <Folder />
          </Box>
          <Box component="div" className="no-event-information">
            No one submitted their evaluation form yet.
          </Box>
          <Box component="div" className="no-event-information-description mt-10">
            As soon as evaluator submits the form , you will be able to review it here.
          </Box>
        </Box>
      </Box>
    )
  }
  return <Submissions />
}

export default SubmissionsTabs
