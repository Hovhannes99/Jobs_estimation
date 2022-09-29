import React from 'react'
import {Box} from '@mui/material'
import TabsLayout from '../../layouts/tabs'
import EventsTabs from './tabs/eventsTabs'
import SubmissionsTabs from './tabs/submissionsTabs'
import FeedbacksTabs from './feedbacksPage'

const Index = () => (
  <Box className="events-page">
    <Box className="heading">Events</Box>
    <TabsLayout
      tabs1={<EventsTabs />}
      tabs2={<SubmissionsTabs />}
      tabs3={<FeedbacksTabs />}
      label1="Events List"
      label2="Submissions"
      label3="Feedbacks"
    />
  </Box>
)
export default Index
