import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
// import {useLocation} from 'react-router'
import clsx from 'clsx'
import '../assets/scss/layout/sidebar/sidebar.scss'
import {useSearchParams} from 'react-router-dom'
import useStylesSidebar from '../assets/makeStyles/sidebar/sidebar'
import EvaluationApi from '../api/evaluation'
import {IQuestion} from '../interfaces/evaulateEvent'
import {UseEvaluationContext} from '../context/evalaution/evaluationContext'
import {IEvalautionProps} from '../context/evalaution/evaluationContext.props'

const RateSidebar = () => {
  const classesSideBar = useStylesSidebar()
  // const location = useLocation()
  const [searchParameters] = useSearchParams()
  const [eventData, setEventData] = useState<{
    dueDate: string
    id: number
    questionsGrouped: Record<number, IQuestion[]>
    evaluatees: {firstName: string; lastName: string; id: number; position: string}[]
  } | null>(null)

  const {activeUser, setUserId, evaluatorsStepLength, setEvaluatorsStepLength, setEvaluationUser} =
    UseEvaluationContext() as IEvalautionProps

  useEffect(() => {
    // @ts-ignore
    const searchParams = [...searchParameters.entries()]
    const eventToken = searchParams.find(([paramName]) => paramName === 'event_token')[1]
    const userToken = searchParams.find(([paramName]) => paramName === 'user_token')[1]
    ;(async () => {
      if (userToken && eventToken) {
        const eventEvaluation = await EvaluationApi.getEventForEvaluation(userToken, eventToken)
        if (eventEvaluation.status === 200) {
          setEventData({
            ...eventEvaluation.data,
            questionsGrouped: eventEvaluation.data.questions.reduce(
              (acc: Record<number, IQuestion[]>, val: IQuestion) =>
                acc[val.questionGroupId]
                  ? {
                      ...acc,
                      [val.questionGroupId]: [...acc[val.questionGroupId], val],
                    }
                  : {
                      ...acc,
                      [val.questionGroupId]: [val],
                    },
              {},
            ),
          })
        }
      }
    })()
  }, [searchParameters])

  useEffect(() => {
    if (eventData) {
      const evaluatees =
        eventData.evaluatees &&
        eventData.evaluatees.map((item) => ({
          name: `${item.firstName} ${item.lastName}`,
          id: item.id,
          position: item.position,
        }))
      setEvaluatorsStepLength(evaluatees)
    }
  }, [eventData])

  useEffect(() => {
    if (evaluatorsStepLength && evaluatorsStepLength[activeUser - 1]) {
      setUserId(evaluatorsStepLength[activeUser - 1].id)
      setEvaluationUser(evaluatorsStepLength[activeUser - 1])
    }
  }, [activeUser, evaluatorsStepLength])

  return (
    <Drawer
      classes={{
        paper: clsx(
          classesSideBar.paper,
          // location.pathname !== '/evaluators-step' && classesSideBar.paddingLeftPx8,
        ),
        root: classesSideBar.sidebarContainer,
      }}
      variant="permanent"
    >
      <Box component="div">
        <Box className="evaluators-step-sidebar">
          <Box className="font-weight-500 evaluators-step-heading m-auto font-size-20 line-height-24">
            People you need to evaluate
          </Box>
          <Box className="evaluators-step-body">
            {evaluatorsStepLength.map((item, index) => (
              <Box
                key={index}
                className={`${
                  index + 1 === activeUser && 'evaluators-step-box-active'
                } evaluators-step-box`}
              >
                <Box className="d-flex break-all">
                  {/*<CirclePercent percent={item.progress} width={17} />*/}
                  <Box className="font-weight-500 font-size-18 line-height-22 ml-18">
                    {item.name}
                  </Box>
                </Box>
                {/*<Box className="font-size-10 font-weight-300 line-height-12 font-italic mt-6">*/}
                {/*  {item.percentLabel}*/}
                {/*</Box>*/}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}
export default RateSidebar
