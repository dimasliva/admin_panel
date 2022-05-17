import React from 'react'
import { CModal, CModalBody, CModalFooter, CButton } from '@coreui/react'
import PropTypes from 'prop-types'

export const CheckPopup = ({ onClickClose, bodyContent, bodyContent2, onCheked, title }) => {
  return (
    <CModal visible={true} onClose={onClickClose} alignment="center">
      <CModalBody
        style={{
          height: '200px',
          fontSize: '25px',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <span className="mx-auto">{bodyContent}</span>
        {bodyContent2 && <span>{bodyContent2}</span>}
      </CModalBody>
      <CModalFooter style={{ display: 'flex', justifyContent: 'center' }}>
        <CButton color="danger" onClick={() => onCheked(true)} style={{ width: '45%' }}>
          예
        </CButton>
        <CButton
          color="secondary"
          onClick={() => {
            onCheked(false)
            onClickClose()
          }}
          style={{ width: '45%' }}
        >
          아니요
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

CheckPopup.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  bodyContent: PropTypes.string.isRequired,
  bodyContent2: PropTypes.string,
  onCheked: PropTypes.func.isRequired,
  title: PropTypes.string,
}
