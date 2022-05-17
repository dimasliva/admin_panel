import React, { useEffect, useState } from 'react'
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
import axios from 'axios'
import { headerConfig } from '../../../../../static/axiosConfig'
import { statusCatch } from '../../../../../static/axiosCatch'
import moment from 'moment'
import { CheckPopup } from '../../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../../components/publicPopup/NormalPopup'

const SignDetail = ({ onClickClose, onEndEvent, onId }) => {
  const [isStatus, setStatus] = useState()
  const [isCreate, setIsCreate] = useState(false) // Create checked
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isMessage, setMessage] = useState('') // ok Modal
  const [startYear, setStartYear] = useState('') // ok Modal
  const [startHour, setStartHour] = useState('') // ok Modal
  const [endYear, setEndYear] = useState('') // ok Modal
  const [endHour, setEndHour] = useState('') // ok Modal
  const [startDay, setStartDay] = useState({
    day: '',
    time: '',
  })
  const [endDay, setEndDay] = useState({
    day: '',
    time: '',
  })

  useEffect(() => {
    getList()
  }, [])

  // Talk Data communication
  const getList = async () => {
    const res = await axios
      .get(`/api/sign?id=${onId}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setStatus(res.data.value.status)
    // start Day
    const start = moment(res.data.value.started_at).format('YYYY-MM-DD').split('-')
    const startTime = moment(res.data.value.started_at).format('HH:mm:ss').split(':')
    // end Day
    const end = moment(res.data.value.ended_at).format('YYYY-MM-DD').split('-')
    const endTime = moment(res.data.value.ended_at).format('HH:mm:ss').split(':')
    setStartYear(start.join('-'))
    setStartHour(startTime.join(':'))
    setEndYear(end.join('-'))
    setEndHour(endTime.join(':'))
    setMessage(res.data.value.message)
    setStartDay({
      day: moment(res.data.value.started_at).format('YYYY-MM-DD'),
      time: moment(res.data.value.started_at).format('HH:mm:ss'),
    })
    setEndDay({
      day: moment(res.data.value.ended_at).format('YYYY-MM-DD'),
      time: moment(res.data.value.ended_at).format('HH:mm:ss'),
    })
  }
  // data modify api
  const modify = async () => {
    console.log('endHour', endDay)
    const data = {
      id: onId,
      started_at: moment(startDay.day + ' ' + startDay.time),
      ended_at: moment(endDay.day + ' ' + endDay.time),
      message: isMessage,
      status: isStatus,
    }

    const res = await axios.post(`/api/sign`, data, headerConfig).catch((err) => statusCatch(err))

    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }
  // delete checked
  const modalOkEvent = (value) => {
    if (value) {
      setIsCreate(false)
      modify()
    } else {
      setIsCreate(false)
    }
  }

  const closeModalEvent = () => {
    setIsOkCheck(false)
    onEndEvent()
  }

  return (
    <CModal visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol sm={12}>
            <CCol>
              <span>덕킹 전광판 수정</span>
              <CCol className="d-flex flex-row mt-4">
                <span style={{ width: '80px' }}>메시지​</span>
                <CFormTextarea
                  style={{ resize: 'none', width: '450px' }}
                  onChange={(e) => {
                    setMessage(e.target.value)
                  }}
                  defaultValue={isMessage}
                  placeholder="지금!!!주제랭킹이 시작되었습니다.!!!​"
                  className="me-2"
                />
              </CCol>
            </CCol>
            <CCol sm={12} className="my-4">
              <div className="mb-3">게시기간​​</div>
              <CCol className="d-flex flex-column">
                <div className="d-flex flex-row ">
                  <span className="text-nowrap" style={{ marginRight: '10px' }}>
                    시작일
                  </span>
                  <CFormInput
                    type="date"
                    style={{ width: '160px' }}
                    value={startDay.day}
                    onChange={(e) => {
                      setStartDay({ ...startDay, day: e.target.value })
                    }}
                    placeholder="YYYY-MM-DD​​"
                    className="mx-2"
                  />
                  <CFormInput
                    type="time"
                    style={{ width: '160px' }}
                    defaultValue={startDay.time}
                    onChange={(e) => {
                      setStartDay({ ...startDay, time: e.target.value })
                    }}
                    placeholder="HH:MM:SS​"
                  />
                </div>
                <div className="d-flex flex-row mt-3">
                  <span className="text-nowrap" style={{ marginRight: '10px' }}>
                    종료일​
                  </span>
                  <CFormInput
                    type="date"
                    style={{ width: '160px' }}
                    defaultValue={endDay.day}
                    onChange={(e) => {
                      setEndDay({ ...endDay, day: e.target.value })
                    }}
                    placeholder="YYYY-MM-DD​​"
                    className="mx-2"
                  />
                  <CFormInput
                    type="time"
                    style={{ width: '160px' }}
                    defaultValue={endDay.time}
                    onChange={(e) => {
                      setEndDay({ ...endDay, time: e.target.value })
                    }}
                    placeholder="HH:MM:SS​​"
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
                  className="search-bar__select text-center"
                  value={isStatus}
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
                onClick={() => {
                  setIsCreate(true)
                }}
                style={{ color: 'white' }}
                color="info"
                className="form-footer__btn__ml form-footer__btn px-5 me-2"
              >
                저장​
              </CButton>
              <CButton
                onClick={() => {
                  onClickClose()
                }}
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
          bodyContent={'메시지 등록 내용을 수정하시겠습니까?'}
          title={'수정'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'수정이 완료되었습니다.'}
        />
      )}
    </CModal>
  )
}
SignDetail.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.number.isRequired,
  onEndEvent: PropTypes.func,
}
export default SignDetail
