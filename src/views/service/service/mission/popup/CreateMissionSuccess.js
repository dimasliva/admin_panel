import React from 'react'
import { CModal, CModalBody, CModalFooter, CButton } from '@coreui/react'
import PropTypes from 'prop-types'

export const CreateMissionSuccess = ({ onClickClose, bodyContent }) => {
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
      <CModalFooter style={{ display: 'flex', justifyContent: 'center' }}>
        <CButton
          color="success"
          onClick={() => {
            onClickClose()
          }}
          style={{ width: '100%', color: 'white' }}
        >
          확인
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

CreateMissionSuccess.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  bodyContent: PropTypes.string.isRequired,
}
