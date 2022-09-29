import React, {useEffect, useState} from 'react'
import {Box, Tab, Tabs} from '@mui/material'
import {useLocation} from 'react-router'
// import {UseCertificateContext} from '../context/certificateContext/certificateContext'
import useStylesTabs from '../assets/makeStyles/tabs/tabs'
import {ITabPanelProps, ITabsLayoutProps} from '../shared/types/tabs/tabs'
import {UseCertificateContext} from '../context/certificateContext/certificateContext'
import {ICertificateProps} from '../context/certificateContext/certificateContext.props'
// import {ICertificateProps} from '../context/certificateContext/certificateContext.props'

const TabPanel = (props: ITabPanelProps) => {
  const {children, value, index, ...other} = props
  return (
    <Box
      role="tabpanel"
      className="tab-panel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className="height-inherit">
          <Box className="height-inherit">{children}</Box>
        </Box>
      )}
    </Box>
  )
}

const tabProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
})

const TabsLayout = (props: ITabsLayoutProps) => {
  const {tabs1, tabs2, tabs3, label1, label2, label3} = props
  const location = useLocation()
  const classes = useStylesTabs()
  // const {certificateData} = UseCertificateContext()
  const [tabValue, setTabValue] = useState(0)

  const {setShowCertificate} = UseCertificateContext() as ICertificateProps

  useEffect(() => {
    if (location.search === '?fromDashboard') {
      setTabValue(2)
    } else if (location.search === '?fromViewForm') {
      setTabValue(1)
    }
  }, [location])

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    setShowCertificate(false)
  }

  // useEffect(() => {
  //   if (certificateData.isVisible) {
  //     setTabValue(2)
  //   }
  // }, [certificateData.isVisible])

  return (
    <Box>
      <Box className="tabs-events-container">
        <Tabs
          className={` ${classes.tabStyle} `}
          TabIndicatorProps={{className: classes.indicator}}
          value={tabValue}
          onChange={handleChangeTab}
        >
          <Tab
            className={`${classes.tabStyle} ${classes.tabButton}`}
            label={label1}
            {...tabProps(0)}
          />
          <Tab
            label={label2}
            {...tabProps(0)}
            className={`${classes.tabStyle} ${classes.tabButton}`}
          />
          {tabs3 && (
            <Tab
              label={label3}
              {...tabProps(0)}
              className={`${classes.tabStyle} ${classes.tabButton}`}
            />
          )}
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        {tabs1}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {tabs2}
      </TabPanel>
      {tabs3 && (
        <TabPanel value={tabValue} index={2}>
          {tabs3}
        </TabPanel>
      )}
    </Box>
  )
}
export default TabsLayout
