import React, {useEffect, useState} from 'react'
import {Box, IconButton, InputBase, Paper, TextField} from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PercentIcon from '@mui/icons-material/Percent'
import useStylesTextFields from '../../assets/makeStyles/textFields/textFields'

const EditEvaluatesCard = () => {
  const [salary, setSalary] = useState(0)
  const [pracent, setPracent] = useState<number>(0)
  const [premium, setPremium] = useState(0)
  const classesTextFields = useStylesTextFields()

  useEffect(() => {
    if (salary && pracent) {
      const sum = salary * pracent
      setPremium(Math.floor(sum / 100))
    } else {
      setPremium(0)
    }
  }, [salary, pracent])

  return (
    <Box className="pt-12">
      <Box className="mt-10">
        <TextField
          className={`${classesTextFields.textFieldEvaluator} text-field-evaluate`}
          size="small"
          label="Name / Surname"
        />
      </Box>
      <Box className="mt-20">
        <TextField
          className={`${classesTextFields.textFieldEvaluator} text-field-evaluate`}
          size="small"
          label="Position"
        />
      </Box>
      <Box className="mt-20">
        <TextField
          className={`${classesTextFields.textFieldEvaluator} text-field-evaluate`}
          size="small"
          label="Hire date"
        />
      </Box>
      <Box className="mt-20">
        <Paper component="form" className="input-field-dolar">
          <InputBase
            className={`${classesTextFields.textFieldEvaluator} input-base`}
            placeholder="0"
            inputProps={{'aria-label': '0'}}
            onChange={(e) => setSalary(parseInt(e.target.value, 10))}
          />
          <IconButton className="icon-button" aria-label="directions">
            <AttachMoneyIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box className="mt-20 d-flex align-center justify-between">
        <Paper component="form" className="width-25 input-field-percent">
          <InputBase
            className="input-base"
            placeholder="0"
            inputProps={{'aria-label': '0'}}
            onChange={(e) => setPracent(parseInt(e.target.value, 10))}
          />
          <IconButton className="icon-button" aria-label="directions">
            <PercentIcon />
          </IconButton>
        </Paper>
        =
        <Paper component="form" className="input-field-dolar">
          <InputBase
            className={`${classesTextFields.textFieldEvaluator} input-base`}
            placeholder="0"
            inputProps={{'aria-label': '0'}}
            value={premium}
          />
          <IconButton className="icon-button" aria-label="directions">
            <AttachMoneyIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  )
}

export default EditEvaluatesCard
