import React, {useState} from 'react'
import DownloadIcon from '../../assets/images/Icons/downloadIcon'
import PrintIcon from '../../assets/images/Icons/printIcon'
import CloseIcon from '../../assets/images/Icons/closeIcon'
import CertificateOfAchievement from './certificateOfAchievement'
import CertificateOfAchievementGold from './certificateOfAchievementGold'
import CertificateOfAppreciation from './certificateOfAppreciation'
import {ICertificatesProps} from './certificates.props'
import {UseCertificateContext} from '../../context/certificateContext/certificateContext'
import {ICertificateProps} from '../../context/certificateContext/certificateContext.props'

const WrapperCertificates = ({
  handleOpenCertificates,
  handleCreateCertificate,
}: ICertificatesProps) => {
  const [errorCertificate, setErrorCertificate] = useState<boolean>(false)
  const {evaluateeName, totalScore, createDate, setCertificateType} =
    UseCertificateContext() as ICertificateProps

  const certificates = [
    {
      component: <CertificateOfAchievement errorCertificate={errorCertificate} />,
    },
    {
      component: <CertificateOfAchievementGold errorCertificate={errorCertificate} />,
    },
    {
      component: <CertificateOfAppreciation errorCertificate={errorCertificate} />,
    },
  ]

  const [current, setCurrent] = useState(0)

  const handleDonwload = () => {
    if (evaluateeName && totalScore && createDate) {
      setErrorCertificate(false)
      if (handleCreateCertificate) {
        handleCreateCertificate()
      }
    } else {
      setErrorCertificate(true)
    }
  }

  const handleShowCertificate = (index: number) => {
    setCertificateType(index + 1)
    setCurrent(index)
  }

  return (
    <div className="wrapper-certificates">
      <div className="wrapper-certificates-header">
        <div>
          <p className="title">Preview</p>
          <div className="custom-pagination">
            {certificates.map((item, index) => (
              <span
                key={index}
                onClick={() => handleShowCertificate(index)}
                className={current === index ? 'circle circle-active' : 'circle'}
              />
            ))}
          </div>
        </div>
        <div className="icons">
          <div onClick={handleDonwload}>
            <DownloadIcon />
          </div>
          <div>
            <PrintIcon />
          </div>
          <div onClick={handleOpenCertificates}>
            <CloseIcon />
          </div>
        </div>
      </div>
      <div className="certificates">{certificates[current].component}</div>
    </div>
  )
}

export default WrapperCertificates
