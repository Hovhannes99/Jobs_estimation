import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import {isAuthenticated} from '../pages/utils'
import Sidebar from '../layouts/sidebar'
import CertificateContext from '../context/certificateContext/certificateContext'
import CreateEventContext from '../context/createEventContext/createEventContext'
import EvaluationContext from '../context/evalaution/evaluationContext'

const PrivateRoute = () =>
  isAuthenticated() ? (
    <>
      <Sidebar />
      <EvaluationContext>
        <CreateEventContext>
          <CertificateContext>
            <Outlet />
          </CertificateContext>
        </CreateEventContext>
      </EvaluationContext>
    </>
  ) : (
    <Navigate to="/sign-in" />
  )

export default PrivateRoute
