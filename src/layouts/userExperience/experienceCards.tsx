import React from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {IExperienceCardsProps} from './experineceCards.props'
import CardStyles from '../../assets/makeStyles/card/cardStyles'

const ExperienceCards = ({accordionLength}: IExperienceCardsProps) => {
  const classes = CardStyles()
  const renderPersonalCardInfo = () => (
    <>
      {[...Array(accordionLength)].map((elem, index) => (
        <Accordion className={`${classes.accordionStyle} ${classes.accordionHeight}`} key={index}>
          <AccordionSummary
            className="accordion-container"
            expandIcon={<ExpandMoreIcon className={`${classes.accordionIcon}`} />}
          >
            <Box className="d-flex align-center color-transparent-black-6">
              <Box component="span" className="font-size-14 line-height-16 ">
                Work Performance average -{' '}
                <Box className="bold" component="span">
                  8
                </Box>
                <Box
                  component="span"
                  className="ml-6 font-size-10 line-height-12 font-weight-300 font-italic"
                >
                  (out of 10)
                </Box>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails className={`${classes.accordionDetails}`}>
            <FormGroup className={`${classes.accordionHeight}`}>
              <FormControlLabel
                className="accordion-container"
                control={
                  <Checkbox color="default" className={`${classes.checkboxStyle}`} defaultChecked />
                }
                label={
                  <Box className="ml-16 font-size-14 line-height-16 font-weight-400 accordion-checkbox-label">
                    Open to feedback - 8
                  </Box>
                }
              />
              <FormControlLabel
                className="accordion-container"
                control={
                  <Checkbox color="default" className={`${classes.checkboxStyle}`} defaultChecked />
                }
                label={
                  <Box className="ml-16 font-size-14 line-height-16 font-weight-400 accordion-checkbox-label">
                    Team worker - 10
                  </Box>
                }
              />
              <FormControlLabel
                className="accordion-container"
                control={
                  <Checkbox color="default" className={`${classes.checkboxStyle}`} defaultChecked />
                }
                label={
                  <Box className="ml-16 font-size-14 line-height-16 font-weight-400 accordion-checkbox-label">
                    Responsible - 10
                  </Box>
                }
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  )
  return (
    <Box className="mt-30 ">
      <Box className="employee-personal-heading line-height-21 font-size-16 font-weight-500">
        This employee was evaluated by
      </Box>
      <Box className="d-flex flex-wrap space-around ">
        {[...Array(accordionLength)].map((evaluatee, ind) => (
          <Box className="mt-24 mr-16" key={ind}>
            <Box className="font-size-16 line-height-20 bold font-weight-700">
              Evaluatee {ind + 1}
            </Box>
            <Box className="employee-personal-card mt-24">
              <Box className="employee-personal-card-heading">
                <Box className="line-height-20 font-size-16 font-weight-500">Samvel Hovsepyan</Box>
                <Box className="mt-10 line-height-16 font-size-13 font-weight-400 color-transparent-black-6">
                  QA Team Lead
                </Box>
              </Box>
              <Box className="employee-personal-card-checkbox-container">
                {renderPersonalCardInfo()}
                <Box>
                  <Accordion className={`${classes.accordionStyle} ${classes.accordionHeight}`}>
                    <AccordionSummary
                      className="accordion-container"
                      expandIcon={<ExpandMoreIcon className={`${classes.accordionIcon}`} />}
                    >
                      <Box className="d-flex align-center color-transparent-black-6">
                        <Box
                          component="span"
                          className="font-size-14 line-height-17 font-weight-700"
                        >
                          Feedback
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails className={`${classes.accordionDetails}`}>
                      <FormGroup className={`${classes.accordionHeight}`}>
                        <FormControlLabel
                          className="accordion-container"
                          control={
                            <Checkbox
                              color="default"
                              className={`${classes.checkboxStyle}`}
                              defaultChecked
                            />
                          }
                          label={
                            <Box className="ml-16 font-size-14 line-height-16 font-weight-400 accordion-checkbox-label">
                              Open to feedback - 8
                            </Box>
                          }
                        />
                        <FormControlLabel
                          className="accordion-container"
                          control={
                            <Checkbox
                              color="default"
                              className={`${classes.checkboxStyle}`}
                              defaultChecked
                            />
                          }
                          label={
                            <Box className="ml-16 font-size-14 line-height-16 font-weight-400 accordion-checkbox-label">
                              Team worker - 10
                            </Box>
                          }
                        />
                        <FormControlLabel
                          className="accordion-container"
                          control={
                            <Checkbox
                              color="default"
                              className={`${classes.checkboxStyle}`}
                              defaultChecked
                            />
                          }
                          label={
                            <Box className="ml-16 font-size-14 line-height-16 font-weight-400 accordion-checkbox-label">
                              Responsible - 10
                            </Box>
                          }
                        />
                      </FormGroup>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ExperienceCards
