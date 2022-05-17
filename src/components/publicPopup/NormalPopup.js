import React from 'react'
import { CModal, CModalBody, CModalFooter, CButton } from '@coreui/react'
import PropTypes from 'prop-types'

export const NormalPopup = ({ onClickClose, bodyContent }) => {
  return (
    <CModal visible={true} onClose={onClickClose} alignment="center">
      <CModalBody
        style={{
          height: '200px',
          fontSize: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {bodyContent}
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          style={{ width: '100%' }}
          onClick={() => {
            onClickClose()
          }}
        >
          확인
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

NormalPopup.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  bodyContent: PropTypes.string.isRequired,
}
