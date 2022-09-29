import React, {useState} from 'react'
import {Box, Button} from '@mui/material'
import {Link} from 'react-router-dom'
import Paper from '@mui/material/Paper'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'
import Circle from '../../assets/images/circle'
// import Slider from '../../layouts/slider/slider'
import SelectField2 from '../../layouts/fields/selectField2'
import useStylesButton from '../../assets/makeStyles/buttons/buttons'
import MakeStyles from '../../assets/makeStyles/makeStyles'

const Dashboard = () => {
  const classes = MakeStyles()
  const classesButton = useStylesButton()
  const [carouselItems] = useState([])
  const [showBorder] = useState(false)
  const [searchByEventTitle, setSearchByEventTitle] = useState<number | undefined>()
  const [noDashboardInformation] = useState(false)

  const [chartData] = useState({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: 'Overview',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    legend: {
      title: {
        style: {
          fontSize: '14px',
          fontFamily: 'Montserrat',
          fontWeight: 400,
        },
      },
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      itemMarginTop: 20,
      itemMarginBottom: 20,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: 'Overview',
        colorByPoint: true,
        data: [
          {
            name: 'Rock Stars',
            y: 21.41,
            sliced: false,
            selected: false,
          },
          {
            name: 'Good Potential',
            y: 11.84,
          },
          {
            name: 'Need Help',
            y: 10.85,
          },
          {
            name: 'Waiting For The Evolution',
            y: 4.67,
          },
        ],
      },
    ],
  })

  return (
    <Box component="div" className="dashboard-container">
      <Box component="div" className="dashboard-padding">
        <Box component="div" className="dashboard-heading line-height-24 bold">
          Dashboard
        </Box>
        {noDashboardInformation ? (
          <Box component="div" className="no-dashboard-container mt-30">
            <Box className="text-center">
              <Box component="div" className={classes.mAuto}>
                <Circle />
              </Box>
              <Box
                component="div"
                className="no-dashboard-information-heading line-height-22 bold text-center"
              >
                No dashboard information is available yet.
              </Box>
              <Box component="div" className="dashboard-information m-auto font-weight-400">
                To see dashboard information you need to set up evaluation event first.
              </Box>
              <Box component="div" className="mt-20">
                <Link to="events/event-create" className="text-decoration-none">
                  <Button
                    color="blue"
                    className={classesButton.colorBlueButton}
                    variant="contained"
                  >
                    Create Event
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box component="div">
            <Box component="div" className="mt-20">
              <SelectField2
                value={searchByEventTitle}
                handleChange={(id) => setSearchByEventTitle(id)}
                fontWeight={400}
                size="small"
                data={undefined}
                border={showBorder}
                label="Search by Event title"
              />
            </Box>
            <Box component="div" className="mt-50">
              <Box className="bold font-size-20 color-black">Recent Evaluation Event Activity</Box>
              <Box component="div" className="mt-20 dashboard-pieCharts-container">
                <Box component="div" className="pieCharts-column">
                  <Box component="div">
                    <Paper className={`${classes.boxShadowNone} font-size-18 bold`}>
                      <HighchartsReact highcharts={Highcharts} options={chartData} />
                    </Paper>
                  </Box>
                </Box>
                <Box component="div" className="pieCharts-column">
                  <Box className="evaluated-employees-heading">
                    <Box className="bold font-size-18 color-black" component="div">
                      Not Evaluated Employees
                    </Box>
                    <Box>
                      <Link to="/events/event-create" className="text-decoration-none">
                        <Button className={classesButton.transparentButton}>
                          Set Up Evaluation <ChevronRightIcon />
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                  <Box component="div" className="evaluated-employees-container">
                    <Box component="div" className="pia-container-information">
                      <Box component="div" className="font-size-15 bold color-black">
                        Anna Cooper
                      </Box>
                      <Box component="div" className="font-size-13 mt-6">
                        Designer
                      </Box>
                      <Box component="div" className="font-size-10 mt-6">
                        Last evaluated 6 months ago
                      </Box>
                    </Box>
                    <Box component="div" className="pia-container-information">
                      <Box component="div" className="font-size-15 bold color-black">
                        Anna Cooper
                      </Box>
                      <Box component="div" className="font-size-13 mt-6">
                        Designer
                      </Box>
                      <Box component="div" className="font-size-10 mt-6">
                        Last evaluated 6 months ago
                      </Box>
                    </Box>
                    <Box component="div" className="pia-container-information">
                      <Box component="div" className="font-size-15 bold color-black">
                        Anna Cooper
                      </Box>
                      <Box component="div" className="font-size-13 mt-6">
                        Designer
                      </Box>
                      <Box component="div" className="font-size-10 mt-6">
                        Last evaluated 6 months ago
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box component="div" className="mt-28">
              <Box component="div" className="bold font-size-20 color-black">
                Top Performers
              </Box>
              <Box component="div" className="mt-26 font-size-14 color-light-gray">
                {carouselItems.length} Rock Stars
              </Box>
              <Box component="div" className="mt-20">
                {/*<Slider carouselItems={carouselItems} sizeItems="normal">*/}
                {/*  <Link*/}
                {/*    to={{*/}
                {/*      pathname: '/reports',*/}
                {/*      search: '?fromDashboard',*/}
                {/*    }}*/}
                {/*    className="text-decoration-none"*/}
                {/*  >*/}
                {/*    <Box component="div" className="slide-div">*/}
                {/*      <Box component="div" className="text-center">*/}
                {/*        <Box component="div" className="bold font-size-18 color-gray">*/}
                {/*          Jenny Cooper*/}
                {/*        </Box>*/}
                {/*        <Box component="div" className=" font-size-13 mt-10 color-gray">*/}
                {/*          UI UX Designer*/}
                {/*        </Box>*/}
                {/*        <Box*/}
                {/*          component="div"*/}
                {/*          className="font-weight-400 font-size-36 mt-24 color-gray"*/}
                {/*        >*/}
                {/*          10*/}
                {/*        </Box>*/}
                {/*      </Box>*/}
                {/*    </Box>*/}
                {/*  </Link>*/}
                {/*</Slider>*/}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Dashboard
