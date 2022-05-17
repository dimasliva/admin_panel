import React, { useState } from 'react'
import { CModal, CModalBody, CModalFooter, CButton } from '@coreui/react'
import PropTypes from 'prop-types'
import { CreateMissionSuccess } from '../../mission/popup/CreateMissionSuccess'

export const ConfirmEditPaidBox = ({ onClickClose, create, onCloseOkEvent, onTotal }) => {
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isBlock, setIsBlock] = useState(false)

  const closeModalEvent = () => {
    setIsOkCheck(false)
    setIsBlock(false)
    onCloseOkEvent()
  }
  return (
    <CModal alignment="center" visible={true} onClose={onClickClose}>
      <CModalBody
        style={{
          height: '150px',
          fontSize: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="form-body"
      >
        유료 랜덤박스 내용을 수정하시겠습니까?
      </CModalBody>
      <CModalFooter className="form-footer d-flex flex-row justify-content-center">
        <CButton
          onClick={() => {
            if (onTotal < 100 || onTotal > 100) {
              setIsBlock(true)
            } else {
              create()
              setIsOkCheck(true)
            }
          }}
          color="success"
          style={{ color: 'white', width: '45%' }}
          className="form-footer__btn"
        >
          예
        </CButton>
        <CButton
          onClick={() => onCloseOkEvent()}
          color="danger"
          style={{ color: 'white', width: '45%' }}
          className="form-footer__btn"
        >
          아니오
        </CButton>
      </CModalFooter>
      {isOkCheck && (
        <CreateMissionSuccess
          bodyContent={'수정이 완료 되었습니다.​'}
          onClickClose={() => closeModalEvent()}
        />
      )}
      {isBlock && (
        <CreateMissionSuccess
          bodyContent={'랜덤 박스가 지불 될 확률은 100%를 확인하고 기입하십시오.​'}
          onClickClose={() => {
            setIsBlock(false)
            onClickClose()
          }}
        />
      )}
    </CModal>
  )
}

ConfirmEditPaidBox.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onCloseOkEvent: PropTypes.func,
  create: PropTypes.func,
  onTotal: PropTypes.number.isRequired,
}
