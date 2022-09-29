import React from 'react'
import {Box, TextField} from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Stack from '@mui/material/Stack'
import {DatePicker} from '@mui/lab'
import useStylesTextFields from '../../assets/makeStyles/textFields/textFields'
import {ITextFieldDate} from '../../shared/types/textField/textField'

const Date = ({border, placeholder, onChange, value}: ITextFieldDate) => {
  const classes = useStylesTextFields()

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DatePicker
            label={!value && <Box className="font-size-14 font-weight-400">{placeholder}</Box>}
            value={value}
            inputFormat="MM/dd/yyyy"
            onChange={onChange}
            renderInput={(params) => (
              <TextField
                className={`${classes.datePicker} ${
                  border ? classes.datePickerWithBorder : classes.borderNone
                } label-style`}
                size="small"
                {...params}
              />
            )}
          />
        </Stack>
      </LocalizationProvider>
    </Box>
  )
}

export default Date
