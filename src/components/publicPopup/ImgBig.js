import React from 'react'
import { CModal, CModalBody, CModalFooter, CButton, CImage } from '@coreui/react'
import PropTypes from 'prop-types'

export const ImgBig = ({ onClickClose, onImg }) => {
  return (
    <CModal visible={true} onClose={onClickClose} alignment="center" size="lg">
      <CModalBody className="text-center">
        <CImage
          src={onImg !== null ? onImg : ''}
          alt=""
          style={{ width: '98%', height: '500px', objectFit: 'scale-down' }}
          onError={(e) => (e.target.src = '/icon.png')}
        />
      </CModalBody>
      <CModalFooter className="d-flex justify-content-center">
        <CButton color="secondary" onClick={onClickClose}>
          닫기
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

ImgBig.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onImg: PropTypes.string.isRequired,
}
