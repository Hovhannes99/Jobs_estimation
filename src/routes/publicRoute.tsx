import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import {useLocation} from 'react-router'
import {isAuthenticated} from '../pages/utils'
import RateSidebar from '../layouts/rateEvaluateSidebar'
import FeedbackContext from '../context/feedbackContext/feedbackContext'
import EvaluationContext from '../context/evalaution/evaluationContext'

const PublicRoute = () => {
  const location = useLocation()
  if (!isAuthenticated()) {
    if (location.pathname !== '/Evaluation/getEventForEvaluation') {
      return <Outlet />
    }
    return (
      <EvaluationContext>
        <FeedbackContext>
          <RateSidebar />
          <Outlet />
        </FeedbackContext>
      </EvaluationContext>
    )
  }
  return <Navigate to="/events" />
}

export default PublicRoute
