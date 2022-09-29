import {Box, FormControl, InputLabel, MenuItem, Select} from '@mui/material'
import React from 'react'
import useStylesTextFields from '../../assets/makeStyles/textFields/textFields'
import {ITextFieldSelect} from '../../shared/types/textField/textField'

const SelectField = ({
  fieldNameShow,
  fieldName,
  fieldLabel,
  value,
  handleChange,
  data,
}: ITextFieldSelect) => {
  const classesTextFields = useStylesTextFields()

  return (
    <Box>
      {fieldNameShow && (
        <Box className="font-weight-500 font-size-16 line-height-22">{fieldName}</Box>
      )}
      <Box className="mt-10 mr-16">
        <FormControl
          size="small"
          className={`${classesTextFields.fieldSize176} bg-white`}
          fullWidth
        >
          <InputLabel id="demo-simple-select-label">{fieldLabel}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={fieldLabel}
            value={value || ''}
          >
            {data ? (
              data.map((item) => (
                <MenuItem onClick={() => handleChange(item.id)} key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))
            ) : (
              <Box className="text-center mt-22 mb-22"> there is not data</Box>
            )}
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export default SelectField
