import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Events from '../pages/events'
import SuccessEvent from '../pages/events/successCreateEvent'
import PublicRoute from './publicRoute'
import RegisterPage from '../pages/auth/registerPage'
import PrivateRoute from './privateRoute'
import LoginPage from '../pages/auth/loginPage'
import EventCreate from '../pages/events/eventCreate'
import ViewForm from '../pages/events/viewForm'
import Reports from '../pages/reports'
import Index from '../pages/evaluatorsStep'
import ForgotPasswordPage from '../pages/auth/forgotPasswordPage'
import Users from '../pages/users/index'
import EditUser from '../layouts/editUser/EditUser'
// import Templates from '../pages/templates/index'
// import Dashboard from '../pages/dashboard'

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PublicRoute />}>
        <Route index element={<LoginPage />} />
        <Route path="sign-in" element={<LoginPage />} />
        <Route path="sign-up" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="Evaluation/getEventForEvaluation" element={<Index />} />
      </Route>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="events" element={<Events />} />
        <Route path="events/success" element={<SuccessEvent />} />
        <Route path="events/event-create" element={<EventCreate />} />
        <Route path="events/event-create/:id" element={<EventCreate />} />

        <Route path="view-form/:id" element={<ViewForm />} />
        <Route path="reports" element={<Reports />} />

        <Route path="users" element={<Users />} />
        <Route path="users/user-edit/:id" element={<EditUser />} />

        {/*<Route path="dashboard" element={<Dashboard />} />*/}
        {/*<Route path="templates" element={<Templates />} />*/}
      </Route>
    </Routes>
  </Router>
)

export default AppRoutes
