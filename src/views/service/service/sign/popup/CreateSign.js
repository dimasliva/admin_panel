import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCol,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CModal,
  CModalBody,
  CRow,
} from '@coreui/react'
import moment from 'moment'
import axios from 'axios'
import { headerConfig } from '../../../../../static/axiosConfig'
import { statusCatch } from '../../../../../static/axiosCatch'
import { CheckPopup } from '../../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../../components/publicPopup/NormalPopup'

const CreateSign = ({ onClickClose, onEndEvent }) => {
  const [isStatus, setStatus] = useState(1)
  const [isMessage, setMessage] = useState('') // Create checked
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isCreate, setIsCreate] = useState(false) // Create checked
  //Date
  const [isStartYear, setStartYear] = useState('')
  const [isStartHour, setStartHour] = useState('')
  const [isEndYear, setEndYear] = useState('')
  const [isEndHour, setEndHour] = useState('')
  const create = async () => {
    if (!isMessage || !isStartYear || !isStartHour || !isEndYear || !isEndHour) {
      alert('입력하지 않은 값이 있습니다.')
      return
    }
    const data = {
      message: isMessage,
      status: isStatus,
      started_at: moment(isStartYear + ' ' + isStartHour + ':00'),
      ended_at: moment(isEndYear + ' ' + isEndHour + ':00'),
    }
    const res = await axios.post(`/api/sign`, data, headerConfig).catch((err) => statusCatch(err))

    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }
  const closeModalEvent = () => {
    setIsOkCheck(false)
    onEndEvent()
  }
  const modalOkEvent = (value) => {
    if (value) {
      setIsCreate(false)
      create()
    } else {
      setIsCreate(false)
    }
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol sm={12}>
            <CCol>
              <span>덕킹 전광판 등록 (30자내 작성)​</span>
              <CCol className="d-flex flex-row mt-4">
                <span style={{ width: '80px' }}>메시지​</span>
                <CFormTextarea
                  style={{ resize: 'none' }}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="내용을 입력하세요​"
                  className="me-2"
                />
              </CCol>
            </CCol>
            <CCol sm={12} className="my-4">
              <div className="mb-3">게시기간​​</div>
              <CCol className="d-flex flex-column">
                <div className="d-flex flex-row ">
                  <span className="text-nowrap" style={{ marginRight: '10px' }}>
                    시작일​
                  </span>
                  <CFormInput
                    type="date"
                    style={{ width: '150px' }}
                    defaultValue={isStartYear}
                    onChange={(e) => {
                      setStartYear(e.target.value)
                    }}
                    placeholder="YYYY-MM-DD​​"
                    className="mx-2"
                  />
                  <CFormInput
                    type="time"
                    style={{ width: '150px' }}
                    defaultValue={isStartHour}
                    onChange={(e) => {
                      setStartHour(e.target.value)
                    }}
                    placeholder="HH:MM:SS​​"
                  />
                </div>
                <div className="d-flex flex-row mt-3">
                  <span className="text-nowrap" style={{ marginRight: '10px' }}>
                    종료일​
                  </span>
                  <CFormInput
                    type="date"
                    style={{ width: '150px' }}
                    defaultValue={isEndYear}
                    onChange={(e) => {
                      setEndYear(e.target.value)
                    }}
                    placeholder="YYYY-MM-DD​​"
                    className="mx-2"
                  />
                  <CFormInput
                    type="time"
                    defaultValue={isEndHour}
                    style={{ width: '150px' }}
                    onChange={(e) => {
                      setEndHour(e.target.value)
                    }}
                    placeholder="HH:MM:SS​"
                  />
                </div>
              </CCol>
            </CCol>
            <CCol className="my-4">
              <div className="mb-2">등록상태</div>
              <CCol sm={4}>
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="search-bar__select"
                  style={{ width: '130px' }}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value={1}>진행중</option>
                  <option value={0}>비활성​</option>
                  <option value={-1}>삭제​</option>
                </CFormSelect>
              </CCol>
            </CCol>
            <CCol>
              <CButton
                onClick={() => setIsCreate(true)}
                style={{ color: 'white' }}
                color="info"
                className="form-footer__btn__ml form-footer__btn px-5 me-2"
              >
                저장​
              </CButton>
              <CButton
                onClick={() => onClickClose()}
                style={{ color: 'black' }}
                color="light"
                className="form-footer__btn px-3"
              >
                닫기
              </CButton>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      {isCreate && (
        <CheckPopup
          onClickClose={() => setIsCreate(false)}
          bodyContent={'덕킹 메시지를 등록하시겠습니까?'}
          title={'등록'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'등록이 완료 되었습니다.'}
        />
      )}
    </CModal>
  )
}
CreateSign.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onEndEvent: PropTypes.func,
}
export default CreateSign
