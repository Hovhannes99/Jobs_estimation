import React, {useState} from 'react'
import {Box} from '@mui/material'
// import moment from 'moment'
// import EnhancedTable from '../../layouts/table/table'
import Date from '../../layouts/fields/date'
// import {IEnhancedTemplatesTableRows} from '../../shared/types/table/table'

const Index = () => {
  // const [searchResult, setSearchResults] = useState<IEnhancedTemplatesTableRows[]>()
  const [dateValue, setDateValue] = useState<Date | null | string>(null)

  const handleChangeDate = (newValue: Date | null) => {
    setDateValue(newValue)
  }

  // const [rows] = useState<IEnhancedTemplatesTableRows[]>([
  //   {
  //     id: 1,
  //     eventTitle: 'Erik',
  //     eventName: 'Quarter Evaluation 2021',
  //     date: '03/20/2021',
  //     status: 'Completed',
  //     eventEvaluators: [
  //       {
  //         eventId: 4,
  //         id: 3,
  //         userId: 4,
  //         user: {
  //           id: 1,
  //           eventEvaluatorName: 'Evaluator 1',
  //           position: 'sss',
  //           firstName: 'Armen',
  //           email: 'sss',
  //           name: 'Norvik Abdalian',
  //         },
  //       },
  //     ],
  //     eventEvaluatees: [
  //       {
  //         eventId: 4,
  //         id: 3,
  //         userId: 4,
  //         user: {
  //           id: 1,
  //           firstName: 'Armen',
  //
  //           eventEvaluatorName: 'Evaluatee 1',
  //           position: 'sss',
  //           email: 'sss',
  //           name: 'Arman Zakaryan',
  //         },
  //       },
  //     ],
  //     admin: {id: 1, firstName: ''},
  //   },
  //   {
  //     id: 2,
  //     eventTitle: 'Erik',
  //     eventName: '2 Quarter Evaluation 2021',
  //     date: '07/20/2021',
  //     status: 'Completed',
  //     eventEvaluators: [
  //       {
  //         eventId: 4,
  //         id: 3,
  //         userId: 4,
  //         user: {
  //           id: 1,
  //           firstName: 'Armen',
  //
  //           eventEvaluatorName: 'Evaluator 1',
  //           position: 'sss',
  //           email: 'sss',
  //           name: 'Norvik Abdalian',
  //         },
  //       },
  //     ],
  //     eventEvaluatees: [
  //       {
  //         eventId: 4,
  //         id: 3,
  //         userId: 4,
  //         user: {
  //           id: 1,
  //           firstName: 'Armen',
  //
  //           eventEvaluatorName: 'Evaluatee 1',
  //           position: 'sss',
  //           email: 'sss',
  //           name: 'Arman Zakaryan',
  //         },
  //       },
  //     ],
  //     admin: {id: 2, firstName: ''},
  //   },
  // ])

  // useEffect(() => {
  //   if (dateValue) {
  //     const results = rows.filter((item) =>
  //       item.date
  //         .toLowerCase()
  //         .includes(moment(dateValue).format('MM/DD/yyyy').toString().toLowerCase()),
  //     )
  //     setSearchResults(results)
  //   } else {
  //     setSearchResults(undefined)
  //   }
  // }, [dateValue, rows])

  return (
    <Box className="page-container">
      <Box className="page-padding">
        <Box className="page-heading">Templates</Box>
        <Box className="mt-30">
          <Date
            value={dateValue}
            onChange={handleChangeDate}
            border={false}
            placeholder="Search Template by Event title and/or date"
          />
        </Box>
        {/*<Box className="mt-40">*/}
        {/*  <EnhancedTable table="templates" rows={searchResult || rows} />*/}
        {/*</Box>*/}
      </Box>
    </Box>
  )
}
export default Index
