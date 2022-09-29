import React from 'react'
import {TextField, Box, MenuItem} from '@mui/material'
import {ISelect} from '../../shared/types/select'
import ArrowBottom from '../../assets/images/Icons/arrowBottom'
import useStylesTextFields from '../../assets/makeStyles/textFields/textFields'

const SelectField2 = ({
  data,
  value,
  handleChange,
  fontWeight,
  border,
  label,
  disabled,
  size = 'small',
}: ISelect) => {
  const classes = useStylesTextFields()

  return (
    <form noValidate autoComplete="off">
      <TextField
        size={size}
        id="outlined-select-gender"
        disabled={disabled}
        select
        label={
          !value || value === -1 ? (
            <Box className="d-flex justify-between align-center">
              <Box fontWeight={fontWeight} className="font-size-14">
                {label || (data && data[0].name)}
              </Box>
              <Box className="mr-10">
                {' '}
                <ArrowBottom />
              </Box>
            </Box>
          ) : (
            <Box className="d-flex justify-end align-center mt-8 mr-10">
              <ArrowBottom />
            </Box>
          )
        }
        className={`${classes.selectContainer} ${!border ? classes.border0 : classes.border1}`}
        value={value || ''}
        InputProps={{
          className: classes.textFieldLabel,
        }}
        InputLabelProps={{shrink: false}}
        margin="normal"
        variant="outlined"
      >
        {data ? (
          data.map((item) => (
            <MenuItem
              onClick={() => handleChange(item.id)}
              className={`${classes.textFieldItems}`}
              key={item.id}
              value={item.id}
            >
              {item.name}
            </MenuItem>
          ))
        ) : (
          <Box className="text-center mt-22 mb-22"> there is not data</Box>
        )}
      </TextField>
    </form>
  )
}

export default SelectField2
