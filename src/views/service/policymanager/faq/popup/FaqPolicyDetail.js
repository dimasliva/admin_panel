import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import { headerConfig } from '../../../../../static/axiosConfig'
import { statusCatch } from '../../../../../static/axiosCatch'
import { NormalPopup } from '../../../../../components/publicPopup/NormalPopup'
import { CheckPopup } from '../../../../../components/publicPopup/CheckPopup'

const FaqPolicyDetail = ({ onClickClose, onId, onCloseOkEvent }) => {
  const [isQuestion, setIsQuestion] = useState(false) // Detail Popup
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [answer, setAnswer] = useState({
    ch: '',
    en: '',
    es: '',
    jp: '',
    ko: '',
  })
  const [question, setQuestion] = useState({
    ch: '',
    en: '',
    es: '',
    jp: '',
    ko: '',
  })
  const [priority, setPriority] = useState()
  const [status, setStatus] = useState()
  const one = 3
  const [role, setRole] = useState('')
  useEffect(() => {
    getList()
  }, [])

  // Talk Data communication
  const getList = async () => {
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
    const res = await axios
      .get(`/api/setting/faq/${onId}`, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) return
    setPriority(res.data.value.priority)
    setQuestion({
      ko: res.data.value.question.ko,
      en: res.data.value.question.en,
      ch: res.data.value.question.ch,
      jp: res.data.value.question.jp,
      es: res.data.value.question.es,
    })
    setAnswer({
      ko: res.data.value.answer.ko,
      en: res.data.value.answer.en,
      ch: res.data.value.answer.ch,
      jp: res.data.value.answer.jp,
      es: res.data.value.answer.es,
    })
    setStatus(res.data.value.status)
  }
  const modify = async () => {
    const data = {
      id: onId,
      answer: answer,
      status: status,
      priority: priority,
      question: question,
    }
    const res = await axios
      .put(`/api/setting/faq/`, data, headerConfig)
      .catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('?????? ????????? ?????????.')
    }
  }
  const modalOkEvent = (value) => {
    if (value) {
      setIsQuestion(false)
      modify()
    } else {
      setIsQuestion(false)
    }
  }
  const okEvent = () => {
    setIsOkCheck(false)
    onCloseOkEvent()
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol sm={6}>
            {/*3*/}
            <CCol className="d-flex flex-column mb-4">
              <div className="mb-3">Q. ?????? ?????????????????????</div>
              <div className="d-flex flex-row">
                <span style={{ width: '100px' }}>????????????</span>
                <CFormInput
                  onChange={(e) => setQuestion({ ...question, ko: e.target.value })}
                  placeholder="????????? ???????????????"
                  defaultValue={question.ko}
                />
              </div>
              <div className="d-flex flex-row my-2">
                <span style={{ width: '100px' }}>?????????</span>
                <CFormInput
                  onChange={(e) => setQuestion({ ...question, en: e.target.value })}
                  placeholder="????????? ???????????????"
                  defaultValue={question.en}
                />
              </div>
              <div className="d-flex flex-row">
                <span style={{ width: '100px' }}>????????????</span>
                <CFormInput
                  onChange={(e) => setQuestion({ ...question, ch: e.target.value })}
                  placeholder="????????? ???????????????"
                  defaultValue={question.ch}
                />
              </div>
              <div className="d-flex flex-row my-2">
                <span style={{ width: '100px' }}>????????????</span>
                <CFormInput
                  onChange={(e) => setQuestion({ ...question, jp: e.target.value })}
                  placeholder="????????? ???????????????"
                  defaultValue={question.jp}
                />
              </div>
              <div className="d-flex flex-row">
                <span style={{ width: '100px' }}>???????????????</span>
                <CFormInput
                  onChange={(e) => setQuestion({ ...question, es: e.target.value })}
                  placeholder="????????? ???????????????"
                  defaultValue={question.es}
                />
              </div>
            </CCol>
            {/*Second Col1*/}
            <CCol className="d-flex flex-column my-4">
              <div className="mb-3">A. ?????????????????????</div>
              <div className="d-flex flex-row mb-2">
                <CFormLabel style={{ width: '100px' }}>????????????</CFormLabel>
                <CFormTextarea
                  placeholder="????????? ???????????????"
                  defaultValue={answer.ko}
                  onChange={(e) => setAnswer({ ...answer, ko: e.target.value })}
                />
              </div>
              <div className="d-flex flex-row mb-2">
                <CFormLabel style={{ width: '100px' }}>?????????</CFormLabel>
                <CFormTextarea
                  placeholder="????????? ???????????????"
                  defaultValue={answer.en}
                  onChange={(e) => setAnswer({ ...answer, en: e.target.value })}
                />
              </div>
              <div className="d-flex flex-row mb-2">
                <CFormLabel style={{ width: '100px' }}>????????????</CFormLabel>
                <CFormTextarea
                  placeholder="????????? ???????????????"
                  defaultValue={answer.ch}
                  onChange={(e) => setAnswer({ ...answer, ch: e.target.value })}
                />
              </div>
              <div className="d-flex flex-row mb-2">
                <CFormLabel style={{ width: '100px' }}>????????????</CFormLabel>
                <CFormTextarea
                  placeholder="????????? ???????????????"
                  onChange={(e) => setAnswer({ ...answer, jp: e.target.value })}
                  defaultValue={answer.jp}
                />
              </div>
              <div className="d-flex flex-row mb-2">
                <CFormLabel style={{ width: '100px' }}>???????????????</CFormLabel>
                <CFormTextarea
                  placeholder="????????? ???????????????"
                  onChange={(e) => setAnswer({ ...answer, es: e.target.value })}
                  defaultValue={answer.es}
                />
              </div>
            </CCol>
          </CCol>
          {/*Second col*/}
          <CCol sm={1} />
          {/*1*/}
          <CCol sm={5}>
            <CCol>
              <div>?????? ???????????????</div>
              <div className="my-2 text-danger">
                ??? ???????????? ??????????????? ?????? ex_0??? ?????? ???????????? ????????????
              </div>
              <CFormInput
                type="number"
                onKeyPress={(e) => {
                  let ch = String.fromCharCode(e.which)
                  if (!/[0-9]/.test(ch)) {
                    e.preventDefault()
                  }
                }}
                onChange={(e) => setPriority(e.target.value)}
                defaultValue={priority}
                placeholder="????????? ????????? ???????????????"
              />
            </CCol>
            <CCol className="d-flex flex-column" sm={12}>
              <div className="mb-2 mt-4">??????????????????</div>
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="text-center search-bar__select"
                style={{ width: '130px' }}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="1">?????????</option>
                <option value="0">????????????</option>
                <option value="-1">?????????</option>
              </CFormSelect>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="form-footer d-flex flex-row justify-content-end">
        {role === one && (
          <CButton
            onClick={() => {
              setIsQuestion(true)
            }}
            color="info"
            style={{ color: 'white' }}
            className="px-5 form-footer__btn__ml form-footer__btn"
          >
            ?????????
          </CButton>
        )}
        <CButton
          onClick={() => onClickClose()}
          style={{ color: 'black' }}
          color="light"
          className="form-footer__btn"
        >
          ??????
        </CButton>
      </CModalFooter>
      {isQuestion && role === one && (
        <CheckPopup
          onClickClose={() => setIsQuestion(false)}
          bodyContent={'???????????? ?????? ????????? ?????????????????????????'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup onClickClose={() => okEvent()} bodyContent={'??????????????? ?????????????????????.'} />
      )}
    </CModal>
  )
}
FaqPolicyDetail.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.number.isRequired,
  onCloseOkEvent: PropTypes.func,
}
export default FaqPolicyDetail
