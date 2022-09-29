import React from 'react'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import FormHelperText from '@mui/material/FormHelperText'
import {Box} from '@mui/material'
import AwardGoldLogo from '../../assets/images/CertificateImages/awardGoldLogo'
import AwardGoldStyle from '../../assets/images/CertificateImages/awardGoldStyle'
import useCertificateStyles from '../../assets/makeStyles/certificates'
import {UseCertificateContext} from '../../context/certificateContext/certificateContext'
import {ICertificateProps} from '../../context/certificateContext/certificateContext.props'
import useStylesTextFields from '../../assets/makeStyles/textFields/textFields'

const CertificateOfAchievementGold = ({errorCertificate}: {errorCertificate: boolean}) => {
  const classes = useCertificateStyles()
  const classesTextFields = useStylesTextFields()
  const {
    evaluateeName,
    totalScore,
    noScore,
    menual,
    setTotalScore,
    createDate,
    setCreateDate,
    setEvaluateeName,
  } = UseCertificateContext() as unknown as ICertificateProps

  return (
    <div className="wrapper-gold certificate">
      <div className="wrapper-achievement-gold">
        <div className="wrapper-title-logo">
          <div className="titles">
            <p className="achievement-gold-title">CERTIFICATE</p>
            <p className="achievement-gold-subtitle">OF ACHIEVEMENT</p>
            <p className="achievement-content-title-gold">
              THIS CERTIFICATE IS PROUDLY PRESENTED TO:
            </p>
            <div className="surname-field">
              <Box className="color-red mt-20 mb-10">
                {errorCertificate && 'Please fill out required fields'}
              </Box>
              <TextField
                id="standard-basic"
                className={classes.textLabelGold}
                label="Name Surname"
                variant="standard"
                value={evaluateeName}
                onChange={(event) => {
                  setEvaluateeName(event.target.value)
                }}
              />
            </div>
            {!noScore ? (
              <Box className="d-flex align-center ">
                <p className="achievement-total-score-title mt-10">Total Score:</p>

                <Box className="ml-10 mt-60">
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
            <div className="achievement-total-score-wrapper">
              <FormControl className="total-left-input" variant="standard">
                <Input
                  id="standard-adornment-weight"
                  aria-describedby="standard-weight-helper-text"
                  value={createDate}
                  onChange={(event) => {
                    setCreateDate(event.target.value)
                  }}
                />
                <FormHelperText className="text">Date</FormHelperText>
              </FormControl>
              <FormControl variant="standard">
                <Input
                  id="standard-adornment-weight"
                  aria-describedby="standard-weight-helper-text"
                />
                <FormHelperText className="text">SIGNATURE</FormHelperText>
              </FormControl>
            </div>
          </div>
          <AwardGoldLogo />
        </div>
      </div>
      <div className="left-part-style">
        <AwardGoldStyle />
      </div>
    </div>
  )
}

export default CertificateOfAchievementGold
