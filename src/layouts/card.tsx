import React, {useEffect, useState} from 'react'
import {Box, Button, CardContent, Typography, Card} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import moment from 'moment'
import useStylesButton from '../assets/makeStyles/buttons/buttons'
import MakeStyles from '../assets/makeStyles/makeStyles'
import {ISubmissions} from '../shared/types/events/events'
import FeedbacksModal from './modal/feedbacksModal'
import FeedBackApi from '../api/feedback'

const CardPage = ({status, data, carouselItems, id}: ISubmissions) => {
  const navigate = useNavigate()

  const classes = MakeStyles()
  const classesButtons = useStylesButton()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState(false)
  const [feedbacksData, setFeedbacksData] = useState<
    [
      {
        evaluatee: {id: 2; firstName: string}
        feedbackText: string
        id: number
      },
    ]
  >()

  const boxClass = `${status === 0 && classes.bgRed} ${
    status === 2 && classes.bgGreen
  } submission-border`
  // ${status === 'partially completed' && classes.bgOrange}
  useEffect(() => {
    if (openModal) {
      ;(async () => {
        setIsLoading(true)
        const response = await FeedBackApi.filterFeedbacks(
          carouselItems.adminId,
          carouselItems.id,
          data.evaluators.id,
          data.evaluatees.id,
          -1,
          1,
          10,
        )
        setFeedbacksData(response.data.feedbacks)
        setIsLoading(false)
      })()
    }
  }, [openModal])

  const renderLabel = () => (
    <Box className="d-flex align-center color-red bold font-size-10 line-height-12">
      <Box
        className={`${status === 0 && classes.bgRed} ${
          status === 2 && classes.bgGreen
        } submission-circle`}
      />
      {/*${status === 'partially completed' && classes.bgOrange}*/}
      <Box
        className={`${status === 0 && classes.colorRed} ${status === 2 && classes.colorGreen} 
        uppercase`}
      >
        {/*${status === 'partially completed' && classes.colorOrange}*/}
        {status === 0 ? 'new' : 'completed'}
      </Box>
    </Box>
  )

  const renderCardButton = () => (
    <Box>
      {status === 2 && (
        <Box className="font-size-8 w line-height-10 font-weight-400 color-light-gray2 ">
          Saved Submission
        </Box>
      )}
      <Box className="d-flex justify-between align-center mt-6">
        <Button
          color="blue"
          onClick={() => handleFeedback()}
          className={`${classesButtons.transparentButton}`}
          size="small"
        >
          Feedback
        </Button>
        <Button
          color="blue"
          onClick={() => handleViewForm()}
          className={`${classesButtons.transparentButton}`}
          size="small"
        >
          View form
        </Button>
      </Box>
    </Box>
  )

  const handleViewForm = () => {
    navigate(`/view-form/${id}`, {state: carouselItems})
  }

  const handleFeedback = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <Card className="submission-card">
      <Box className={boxClass} />
      <CardContent className="card-content">
        <Typography className="d-flex align-center justify-between">
          {renderLabel()}
          <Box className="font-size-10 line-height-14 font-weight-400 color-light-gray2 ml-16">
            Submitted on : {moment(carouselItems.createdDate).format('LL')}
          </Box>
        </Typography>
        <Box className="font-weight-800 font-size-16 mt-6 line-height-20 color-dark-blue">
          Quarterly Development Team Evoluation
        </Box>
        <Box className="border-bottom-gray mt-10" />
        <Box className="submissions-card-of-evaluators color-dark-blue">
          {data && (
            <Box>
              <Box className="mt-10  font-size-14 font-weight-700  line-height-19">
                {data.evaluatees.firstName}
              </Box>
              <Box className="font-size-12 font-weight-400 color-light-gray2 line-height-16 mt-4">
                {data.evaluatees.position}
              </Box>
            </Box>
          )}
          {data && (
            <Box>
              <Box className="mt-10  font-size-14  font-weight-700  line-height-19">
                {data.evaluators.firstName}
              </Box>
              <Box className="font-size-12 font-weight-400 color-light-gray2 line-height-16 mt-4">
                {data.evaluators.position}
              </Box>
            </Box>
          )}
        </Box>
        <Box className="font-size-10 line-height-14 font-weight-400 color-light-gray2 mt-12">
          submitted review for
        </Box>
        {renderCardButton()}
      </CardContent>
      <FeedbacksModal
        isLoading={isLoading}
        openModal={openModal}
        closeModal={handleCloseModal}
        feedbacks={feedbacksData}
      />
    </Card>
  )
}

export default CardPage
