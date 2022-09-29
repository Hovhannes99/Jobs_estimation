import {Box, Button, Card, CardContent, TextField, Typography} from '@mui/material'
import React, {useEffect, useState} from 'react'
import ChartSideBySideBar from './chartSideBySideBar'
import Date from '../../layouts/fields/date'
import {makeRandomColor} from '../utils'
import MakeStyles from '../../assets/makeStyles/makeStyles'
import useStylesButton from '../../assets/makeStyles/buttons/buttons'
import useStylesTextFields from '../../assets/makeStyles/textFields/textFields'
import {IChartOption} from '../../shared/types/highchartTypes/highchart.props'
import DeleteIcon from '../../assets/images/Icons/deleteIcon'

const ComparativeReport = () => {
  const classesButtons = useStylesButton()
  const classes = MakeStyles()
  const classesTextFields = useStylesTextFields()

  const [dateValue, setDateValue] = useState<Date | null | string>(null)
  const [datePickerBorder] = useState(true)
  const [cardId, setCardId] = useState(0)
  const [requiredFields, setRequiredFields] = useState(false)
  const [disabledApply, setDisabledApply] = useState(true)
  const [cardsEmployee, setCardsEmployee] = useState([
    {
      id: 1,
      title: 'Employee 1',
      background: 'pink',
      name: '',
      position: '',
    },
  ])
  const [chartData, setChartData] = useState({
    data: [0],
    name: '',
    color: '',
  })
  const [chartOption, setChartOption] = useState<IChartOption[]>([
    {
      id: 1,
      title: 'Employee 1',
      background: 'pink',
      name: '',
      data: [0],
      color: '',
    },
  ])

  const handleRemoveCard = (id: number) => {
    if (cardsEmployee.length > 1) {
      const removeCard = cardsEmployee.filter((item) => item.id !== id)
      setCardsEmployee(removeCard)
    }
  }

  useEffect(() => {
    const cards = cardsEmployee.map((card) => {
      if (card.id === cardId) {
        return {
          ...card,
          ...chartData,
        }
      }
      return card
    })
    setCardsEmployee(cards)
  }, [chartData])

  const handleChangeName = (value: string, card: {id: number; background: string}) => {
    setDisabledApply(true)

    setChartData({
      data: [Math.random() * 6.4, Math.random() * 22.3, Math.random() * 21.2],
      name: value,
      color: card.background,
    })

    const updatedCardsEmployee = cardsEmployee.map((item) => {
      if (card.id === item.id) {
        return {...item, name: value}
      }
      return item
    })

    setCardsEmployee(updatedCardsEmployee)
  }

  const handleChangePosition = (value: string, id: number) => {
    setDisabledApply(true)
    const updatedCardsEmployee = cardsEmployee.map((item) => {
      if (id === item.id) {
        return {...item, position: value}
      }
      return item
    })
    setCardsEmployee(updatedCardsEmployee)
  }

  const handleChangeDate = (newValue: Date | null) => {
    setDateValue(newValue)
  }

  const handleChartOption = () => {
    setRequiredFields(false)
    setDisabledApply(false)
    cardsEmployee.forEach((item) => {
      if (!item.name) {
        setRequiredFields(true)
        setDisabledApply(true)
      }
    })
  }

  useEffect(() => {
    if (!disabledApply) {
      setChartOption(cardsEmployee)
    }
  }, [requiredFields, disabledApply, handleRemoveCard])

  const handleAddEmployee = () => {
    setDisabledApply(true)

    if (cardsEmployee.length) {
      cardsEmployee.forEach((item, index) => {
        if (cardsEmployee.length === index + 1) {
          setCardsEmployee([
            ...cardsEmployee,
            {
              id: item.id + 1,
              title: `Employee ${item.id + 1}`,
              name: '',
              position: '',
              background: makeRandomColor(),
            },
          ])
        }
      })
    } else {
      setCardsEmployee([
        ...cardsEmployee,
        {
          id: 1,
          title: `Employee 1`,
          name: '',
          position: '',
          background: `#${Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0')
            .toUpperCase()}`,
        },
      ])
    }
  }

  return (
    <Box className="comparative-report-container">
      {requiredFields && <Box className="color-dark-red mt-20">Fill in the field</Box>}
      <Box className="card-container d-flex flex-wrap">
        {cardsEmployee.map((card, ind) => (
          <Card key={ind} className="card-column mr-16 mt-18">
            <CardContent className={`${classes.cardContainer}`}>
              <Typography className="d-flex justify-between">
                <Box className="d-flex align-center">
                  <Box>{card.title}</Box>
                  <Box className="card-text-circle ml-6" bgcolor={card.background} />
                </Box>
                <Box className="cursor-pointer" onClick={() => handleRemoveCard(card.id)}>
                  <DeleteIcon />
                </Box>
              </Typography>
              <Typography>
                <Box className="mt-20">
                  <TextField
                    value={card.name}
                    id="outlined-basic"
                    size="small"
                    className={`${classesTextFields.textFieldStyle}`}
                    label="Name / Surname"
                    variant="outlined"
                    onClick={() => setCardId(card.id)}
                    onChange={(e) => handleChangeName(e.target.value, card)}
                  />
                </Box>
                <Box className="mt-20">
                  <TextField
                    id="outlined-basic"
                    size="small"
                    value={card.position}
                    className={`${classesTextFields.textFieldStyle}`}
                    onChange={(e) => handleChangePosition(e.target.value, card.id)}
                    label="Position"
                    variant="outlined"
                  />
                </Box>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box className="mt-28 d-flex">
        <Box>
          <Button
            color="blue"
            onClick={handleAddEmployee}
            className={`${classesButtons.transparentWithBorderButton} ${classesButtons.width174}`}
          >
            ADD EMPLOYEE
          </Button>
        </Box>
        <Box className="ml-16">
          <Button
            color="blue"
            className={`${classesButtons.colorBlueButton} ${classesButtons.width150}`}
            variant="contained"
            onClick={handleChartOption}
          >
            APPLY
          </Button>
        </Box>
      </Box>
      <Box className="d-flex justify-end mt-20">
        <Button
          className={`${classesButtons.buttonPaddingNormal} ${classesButtons.transparentWithBorderButton}`}
          color="blue"
        >
          EXPORT REPORT
        </Button>
      </Box>
      <Box className="mt-24">
        <Box className="employee-personal-heading font-size-16 font-weight-500 line-height-20 d-flex justify-between align-center">
          <Box component="span">Employee average score comparison</Box>
          <Box component="span" className="width-60">
            <Date
              value={dateValue}
              onChange={handleChangeDate}
              placeholder="Search by Event title and/or date"
              border={datePickerBorder}
            />
          </Box>
        </Box>
        <ChartSideBySideBar chartOption={chartOption} />
      </Box>
    </Box>
  )
}

export default ComparativeReport
