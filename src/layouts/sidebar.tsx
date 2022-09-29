import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
// import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import {Link} from 'react-router-dom'
import {useNavigate, useLocation} from 'react-router'

// import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import DateRangeIcon from '@mui/icons-material/DateRange'
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined'
import {Button} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import clsx from 'clsx'

import UsersIcon from '../assets/images/Icons/usersIcon'
// import TemplatesIcon from '../assets/images/Icons/templatesIcon'
// import UserImage from '../assets/images/userImage'
import '../assets/scss/layout/sidebar/sidebar.scss'
import MakeStyles from '../assets/makeStyles/makeStyles'
import useStylesSidebar from '../assets/makeStyles/sidebar/sidebar'
import useStylesButton from '../assets/makeStyles/buttons/buttons'
import CirclePercent from './circlePercent/circlePercent'
import AuthenticationsApi from '../api/authentication'
import {UseUserContext} from '../context/userContext/userContext'
import {IUserProps} from '../context/userContext/userContext.props'
import UsersApi from '../api/users'
import PlusIcon from '../assets/images/Icons/plus'

const Sidebar = () => {
  const classes = MakeStyles()
  const classesSideBar = useStylesSidebar()
  const classesButtons = useStylesButton()

  const {email, setUserData, setEmail, setUserId} = UseUserContext() as IUserProps
  // userData
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    ;(async () => {
      if (!email) {
        const getUserData = await UsersApi.userList(Number(localStorage.getItem('userId')))

        if (getUserData.data) {
          setUserData(getUserData.data)
          setEmail(getUserData.data.email)
          setUserId(getUserData.data.userId)
        }
      }
    })()
  }, [])

  const [evaluatorsStepLength] = useState([
    {
      name: 'Evaluatee 1',
      progress: 30,
      percentLabel: 'Not Started',
    },
    {
      name: 'Evaluatee 2',
      progress: 50,
      percentLabel: '50% done',
    },
    {
      name: 'Evaluatee 3',
      progress: 70,
      percentLabel: '70% done',
    },
    {
      name: 'Evaluatee 4',
      progress: 100,
      percentLabel: 'Completed',
    },
  ])

  const logout = async () => {
    await AuthenticationsApi.logOut()
    localStorage.removeItem('accessToken')
    navigate('/')
  }

  const handleCreateEvent = () => {
    navigate('events/event-create', {state: {createNewEvent: true}})
  }

  return (
    <Drawer
      classes={{
        paper: clsx(
          classesSideBar.paper,
          // location.pathname !== '/evaluators-step' && classesSideBar.paddingLeftPx8,
        ),
        root: classesSideBar.sidebarContainer,
      }}
      variant="permanent"
    >
      <Box component="div">
        {location.pathname === '/evaluators-step' ? (
          <Box className="evaluators-step-sidebar">
            <Box className="font-weight-500 evaluators-step-heading m-auto font-size-20 line-height-24">
              People you need to evaluate
            </Box>
            <Box className="evaluators-step-body ">
              {evaluatorsStepLength.map((item, index) => (
                <Box
                  key={index}
                  className={`${
                    index + 1 === 1 && 'evaluators-step-box-active'
                  } evaluators-step-box`}
                >
                  <Box className="d-flex ">
                    <CirclePercent percent={item.progress} width={17} />
                    <Box className="font-weight-500  color-light-gray font-size-18 line-height-22 ml-18">
                      {item.name}
                    </Box>
                  </Box>
                  <Box className="font-size-10 color-light-gray font-weight-300 line-height-12 font-italic mt-6">
                    {item.percentLabel}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <Box>
            {/*<Toolbar />*/}
            {/*<Box className={classes.mAuto}>*/}
            {/*  <UserImage />*/}
            {/*</Box>*/}
            <Box className="text-decoration-none mt-40 d-flex justify-center m-auto">
              <Button
                onClick={() => handleCreateEvent()}
                variant="contained"
                className={`${clsx(classesButtons.sidebarButton)}`}
              >
                <PlusIcon /> <Box className="ml-16 width-100">Create Event</Box>
              </Button>
            </Box>
            <Box className="light-gray-border mt-40 color-light-gray" />
            <List className={`sidebar-menu-wrapper ${classes.lightGray}`}>
              {/*<Box component="div" className="user-name mt-20">*/}
              {/*  {userData?.firstName} {userData?.lastName}*/}
              {/*</Box>*/}
              <Box className="mt-20">
                {/*<ListItem*/}
                {/*  selected={location.pathname === '/dashboard'}*/}
                {/*  button*/}
                {/*  component={Link}*/}
                {/*  to="/"*/}
                {/*>*/}
                {/*  <ListItemIcon>*/}
                {/*    <GridViewOutlinedIcon className={classes.colorWhite} />*/}
                {/*  </ListItemIcon>*/}
                {/*  <ListItemText*/}
                {/*    primary={<Box className={`${classesSideBar.textStyle}`}>Dashboard</Box>}*/}
                {/*  />*/}
                {/*</ListItem>*/}
                <ListItem
                  selected={location.pathname === '/events'}
                  button
                  component={Link}
                  to="/events"
                >
                  <ListItemIcon>
                    <DateRangeIcon className={classes.lightGray} />
                  </ListItemIcon>
                  {/*<ListItemText*/}
                  {/*  primary={*/}
                  {/*    <Box className={`${classesSideBar.textStyle} ${classes.lightGray}`}>*/}
                  {/*      Events*/}
                  {/*    </Box>*/}
                  {/*  }*/}
                  {/*/>*/}
                  <ListItemText
                    primary={<Box className={`${classesSideBar.textStyle}`}>Events</Box>}
                  />
                </ListItem>
                <ListItem
                  selected={location.pathname === '/reports'}
                  button
                  component={Link}
                  to="/reports"
                >
                  <ListItemIcon>
                    <EqualizerOutlinedIcon className={classes.lightGray} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Box className={`${classesSideBar.textStyle}`}>Reports</Box>}
                  />
                </ListItem>
                <ListItem
                  selected={location.pathname === '/users'}
                  button
                  component={Link}
                  to="/users"
                >
                  <ListItemIcon>
                    <UsersIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Box className={`${classesSideBar.textStyle} `}>People</Box>}
                  />
                </ListItem>
                {/*<ListItem*/}
                {/*  selected={location.pathname === '/templates'}*/}
                {/*  button*/}
                {/*  component={Link}*/}
                {/*  to="/templates"*/}
                {/*>*/}
                {/*  <ListItemIcon>*/}
                {/*    <TemplatesIcon />*/}
                {/*  </ListItemIcon>*/}
                {/*  <ListItemText*/}
                {/*    primary={<Box className={`${classesSideBar.textStyle}`}>Templates</Box>}*/}
                {/*  />*/}
                {/*</ListItem>*/}
              </Box>
            </List>
          </Box>
        )}
      </Box>
      {location.pathname !== '/evaluators-step' && (
        <Box component="div" className="sidebar-logout">
          <Button onClick={logout} className={`${classesSideBar.sidebarLogoutButton}`}>
            <LogoutIcon className={classes.lightGray} />
            <Box className="sidebar-logout-text">Log Out</Box>
          </Button>
        </Box>
      )}
    </Drawer>
  )
}
export default Sidebar
