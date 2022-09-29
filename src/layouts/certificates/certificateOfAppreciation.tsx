import React from 'react'
import Input from '@mui/material/Input'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import {Box} from '@mui/material'
import TextField from '@mui/material/TextField'
import AwardRedStyle from '../../assets/images/CertificateImages/awardRedStyle'
import AwardRedLogo from '../../assets/images/CertificateImages/awardRedLogo'
import useCertificateStyles from '../../assets/makeStyles/certificates'
import {UseCertificateContext} from '../../context/certificateContext/certificateContext'
import {ICertificateProps} from '../../context/certificateContext/certificateContext.props'
import useStylesTextFields from '../../assets/makeStyles/textFields/textFields'

const CertificateOfAppreciation = ({errorCertificate}: {errorCertificate: boolean}) => {
  const classes = useCertificateStyles()
  const {
    evaluateeName,
    totalScore,
    noScore,
    menual,
    setTotalScore,
    setCreateDate,
    createDate,
    setEvaluateeName,
  } = UseCertificateContext() as unknown as ICertificateProps
  const classesTextFields = useStylesTextFields()

  return (
    <div className="wrapper-appreciation certificate">
      <div className="wrapper-appreciation-logo">
        <div className="wrapper-appreciation-logo-award">
          <AwardRedLogo />
        </div>
        <div className="wrapper-appreciation-logo-background-style">
          <AwardRedStyle />
        </div>
        <div className="wrapper-appreciation-logo-complete">
          <div className="wrapper-appreciation-logo-complete-fields">
            <div className="wrapper-appreciation-logo-complete-fields-part">
              <p className="title">CERTIFICATE</p>
              <p className="subtitle">OF APPRECIATION</p>
              <div className="span" />
              <p className="proudly">PROUDLY PRESENTED TO</p>
              <div className="name-surname">
                <Box className="color-red mt-20 mb-10">
                  {errorCertificate && 'Please fill out required fields'}
                </Box>
                {menual ? (
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
                ) : (
                  <Input
                    className={classes.nameFieldRed}
                    id="standard-adornment-weight"
                    aria-describedby="standard-weight-helper-text"
                    value={evaluateeName}
                    onChange={(event) => {
                      setEvaluateeName(event.target.value)
                    }}
                  />
                )}
              </div>
              {!noScore ? (
                <Box className={menual ? `width-100 d-flex justify-end mt-20` : `ml-50`}>
                  <Box className="d-flex align-center justify-center width-50">
                    <p className="achievement-total-score-title mt-10">Total Score:</p>
                    <Box className="ml-10 width-40">
                      {menual ? (
                        <Input
                          type="number"
                          className={`${classesTextFields.numberRemoveArrowUpDown} ${classes.width50}`}
                          id="standard-adornment-weight"
                          value={totalScore}
                          onChange={(event) => {
                            setTotalScore(event.target.value)
                          }}
                          aria-describedby="standard-weight-helper-text"
                        />
                      ) : (
                        <Box className="mt-10">{totalScore}</Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box className="achievement-total-score-title " />
              )}
              <div className="inputs">
                <div className="field">
                  <FormControl className="total-left-input" variant="standard">
                    <Input
                      id="standard-adornment-weight"
                      aria-describedby="standard-weight-helper-text"
                    />
                    <FormHelperText className={classes.textLabelRed}>Signature</FormHelperText>
                  </FormControl>
                </div>
                <div className="field-two">
                  <FormControl className="total-left-input" variant="standard">
                    <Input
                      id="standard-adornment-weight"
                      aria-describedby="standard-weight-helper-text"
                      value={createDate}
                      onChange={(event) => {
                        setCreateDate(event.target.value)
                      }}
                    />
                    <FormHelperText className={classes.textLabelRed}>Date</FormHelperText>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper-appreciation-background">
        <div className="wrapper-appreciation-background-whitePart" />
      </div>
    </div>
  )
}

export default CertificateOfAppreciation
