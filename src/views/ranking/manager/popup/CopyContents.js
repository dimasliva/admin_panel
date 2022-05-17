import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CButton, CCol, CFormInput, CModal, CModalBody, CModalFooter, CRow } from '@coreui/react'
import { CheckPopup } from '../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../components/publicPopup/NormalPopup'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'

const CopyContents = ({ onClickClose, onCloseOkEvent, onId }) => {
  const [isCopyContent, setIsCopyContent] = useState(false)
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isOkCheckErr, setIsOkCheckErr] = useState(false) // ok Modal
  const [isContent, setContent] = useState('')
  const [isCancel, setIsCancel] = useState(false)

  const create = async () => {
    if (isContent === '') {
      setIsCancel(true)
    }
    const data = {
      rank_id: onId,
      copy_rank_id: isContent,
    }
    const res = await axios
      .post(`/api/rank/artist/copy`, data, headerConfig)
      .catch((err) => statusCatch(err))
    if (res.data.value === 'There are no artists left to copy.') {
      setIsOkCheckErr(true)
    } else {
      if (res.data.success) {
        setIsOkCheck(true)
      } else {
        alert('등록에 실패했습니다.')
      }
    }
  }
  const closeModalEvent = () => {
    setIsOkCheck(false)
    setIsOkCheckErr(false)
    setIsCancel(false)
    onCloseOkEvent()
  }
  const modalOkEvent = (value) => {
    if (value) {
      setIsCopyContent(false)
      create()
    } else {
      setIsCopyContent(false)
    }
  }
  return (
    <CModal visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol>
            <CCol className="d-flex flex-column mb-5">
              <div className="d-flex flex-row align-items-center">
                <label style={{ width: '100px' }}>투표ID​</label>
                <CFormInput
                  defaultValue={isContent}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="복사할 투표 아이디를 입력하세요"
                />
              </div>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="form-footer">
        <CButton
          onClick={() => onClickClose()}
          className="form-footer__btn"
          style={{ color: 'white' }}
          color="dark"
        >
          닫기
        </CButton>
        <CButton
          onClick={() => setIsCopyContent(true)}
          style={{ color: 'white' }}
          color="success"
          className="form-footer__btn px-5"
        >
          복사하기
        </CButton>
      </CModalFooter>
      {isCopyContent && (
        <CheckPopup
          onClickClose={() => setIsCopyContent(false)}
          bodyContent={`※ 주의`}
          bodyContent2={`해당 콘텐츠를 모두 복사 하시겠습니까?`}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'콘텐츠가 복사되었습니다. '}
        />
      )}
      {isOkCheckErr && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'존재 하지 않는 아이디입니다.'}
        />
      )}
      {isCancel && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'복사할 투표 아이디를 입력해주세요.'}
        />
      )}
    </CModal>
  )
}

CopyContents.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onCloseOkEvent: PropTypes.func,
  onId: PropTypes.string.isRequired || PropTypes.number.isRequired,
}

export default CopyContents
