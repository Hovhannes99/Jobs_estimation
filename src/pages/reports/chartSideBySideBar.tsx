import * as React from 'react'
import {Paper, Box} from '@mui/material'
import {useEffect, useState} from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'
import {IChartOption} from '../../shared/types/highchartTypes/highchart.props'

const ChartSideBySideBar = ({chartOption}: {chartOption: IChartOption[]}) => {
  const [chartData, setChartData] = useState({
    chart: {
      type: 'column',
      height: '600px',
    },
    credits: {
      enabled: false,
    },
    legend: {
      title: {
        text: 'Score',
        style: {
          fontSize: '14px',
          fontFamily: 'Montserrat',
          fontWeight: 400,
        },
      },
      verticalAlign: 'top',
      align: 'left',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: ['Work Performance', 'Personal Skills', 'Company Culture'],
      max: 2,
      padding: 0,
      labels: {
        style: {
          fontSize: '14px',
          fontFamily: 'Montserrat',
        },
      },
    },
    yAxis: {
      min: 0,
      max: 7,
      title: {
        text: '',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: '</table>',
      shared: false,
      useHTML: false,
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        pointPadding: 0.3,
      },
    },
    series: chartOption,
  })

  useEffect(() => {
    setChartData({...chartData, series: chartOption})
  }, [chartOption])

  return (
    <Box>
      <Paper>
        <HighchartsReact highcharts={Highcharts} options={chartData} />
      </Paper>
    </Box>
  )
}
export default ChartSideBySideBar
