import React, {useState} from 'react'
import {Box} from '@mui/material'
import TabsLayout from '../../layouts/tabs'
import PerformanceReport from './performanceReport'
// import ComparativeReport from './comparativeReport'
// import EmployeePersonalGrowthReport from './employeePersonalGrowthReport'
import CertificateModal from '../../layouts/modal/certificateModal'
import SavedSubmissionsTabs from '../events/tabs/savedSubmissionsTabs'
// import PerformanceReportNoScores from './PerformanceReportNoScores'

const Index = () => {
  const [openModalCertificate, setOpenModalCertificate] = useState(false)

  const handleCloseModal = () => setOpenModalCertificate(false)

  return (
    <Box className="reports-page">
      <Box className="heading">Reports</Box>
      <TabsLayout
        tabs1={<PerformanceReport />}
        tabs2={<SavedSubmissionsTabs />}
        // tabs3={<PerformanceReportNoScores />}
        label1="Performance Report"
        label2="Saved Submissions"
        // label3="Performance Report No Scores"
      />
      <CertificateModal openModal={openModalCertificate} closeModal={handleCloseModal} />
    </Box>
  )
}
export default Index
