import React from 'react'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import {Box} from '@mui/material'
import useCertificateStyles from '../../assets/makeStyles/certificates'
import {UseCertificateContext} from '../../context/certificateContext/certificateContext'
import {ICertificateProps} from '../../context/certificateContext/certificateContext.props'
import useStylesTextFields from '../../assets/makeStyles/textFields/textFields'

const CertificateOfAchievement = ({errorCertificate}: {errorCertificate: boolean}) => {
  const classes = useCertificateStyles()
  const {
    evaluateeName,
    menual,
    setEvaluateeName,
    totalScore,
    createDate,
    setCreateDate,
    noScore,
    setTotalScore,
  } = UseCertificateContext() as unknown as ICertificateProps
  const classesTextFields = useStylesTextFields()

  return (
    <div className="wrapper-achievement certificate">
      <div className="achievement-info">
        <p className="achievement-title">Certificate</p>
        <p className="achievement-subtitle">of Achievement</p>
        <p className="achievement-content-title">This certificate is proudly presented to </p>
        <Box className="surname-field">
          <Box className="color-red mt-20">
            {errorCertificate && 'Please fill out required fields'}
          </Box>
          <TextField
            id="standard-basic"
            className={classes.nameField}
            label="Name Surname"
            variant="standard"
            value={evaluateeName}
            onChange={(event) => {
              setEvaluateeName(event.target.value)
            }}
          />
        </Box>
        {!noScore ? (
          <Box className="d-flex align-center">
            <p className="achievement-total-score-title mt-10">Total Score:</p>

            <Box className="ml-10">
              {menual ? (
                <FormControl variant="standard">
                  <Input
                    type="number"
                    className={classesTextFields.numberRemoveArrowUpDown}
                    id="standard-adornment-weight"
                    value={totalScore}
                    onChange={(event) => {
                      setTotalScore(event.target.value)
                    }}
                    aria-describedby="standard-weight-helper-text"
                  />
                </FormControl>
              ) : (
                totalScore
              )}
            </Box>
          </Box>
        ) : (
          <Box className="achievement-total-score-title " />
        )}

        <Box className="achievement-total-score-wrapper">
          <FormControl variant="standard">
            <Input
              id="standard-adornment-weight"
              value={createDate}
              onChange={(event) => {
                setCreateDate(event.target.value)
              }}
              aria-describedby="standard-weight-helper-text"
            />
            <FormHelperText className={classes.textLabel}>date</FormHelperText>
          </FormControl>
          <FormControl variant="standard">
            <Input id="standard-adornment-weight" aria-describedby="standard-weight-helper-text" />
            <FormHelperText className={classes.textLabel}>signature</FormHelperText>
          </FormControl>
        </Box>
      </div>
    </div>
  )
}

export default CertificateOfAchievement
