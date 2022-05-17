import React, { useState } from 'react'
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

const CreateFaqPolicy = ({ onClickClose, onCloseOkEvent }) => {
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
  const [isQuestion, setIsQuestion] = useState(false) // Detail Popup
  const modalOkEvent = (value) => {
    if (value) {
      setIsQuestion(false)
      create()
    } else {
      setIsQuestion(false)
    }
  }
  const create = async () => {
    const data = {
      answer: {
        ch: answer.ch,
        en: answer.en,
        es: answer.es,
        jp: answer.jp,
        ko: answer.ko,
      },
      status: status,
      priority: priority,
      question: {
        ch: question.ch,
        en: question.en,
        es: question.es,
        jp: question.jp,
        ko: question.ko,
      },
    }
    if (data.status === undefined) data.status = 1
    const res = await axios
      .put(`/api/setting/faq`, data, headerConfig)
      .catch((err) => statusCatch(err))
    console.log(res)
    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol sm={5}>
            {/*3*/}
            <CCol className="d-flex flex-column mb-4">
              <div className="mb-2">Q. 질문 작성​​​​​</div>
              <div className="d-flex flex-row">
                <span style={{ width: '100px' }}>한국어​</span>
                <CFormInput
                  onChange={(e) => setQuestion({ ...question, ko: e.target.value })}
                  placeholder="질문을 입력하세요"
                  defaultValue={question.ko}
                />
              </div>
              <div className="d-flex flex-row my-2">
                <span style={{ width: '100px' }}>영어​</span>
                <CFormInput
                  onChange={(e) => setQuestion({ ...question, en: e.target.value })}
                  placeholder="질문을 입력하세요"
                  defaultValue={question.en}
                />
              </div>
              <div className="d-flex flex-row">
                <span style={{ width: '100px' }}>중국어​</span>
                <CFormInput
                  onChange={(e) => setQuestion({ ...question, ch: e.target.value })}
                  placeholder="질문을 입력하세요"
                  defaultValue={question.ch}
                />
              </div>
              <div className="d-flex flex-row my-2">
                <span style={{ width: '100px' }}>일본어​</span>
                <CFormInput
                  onChange={(e) => setQuestion({ ...question, jp: e.target.value })}
                  placeholder="질문을 입력하세요"
                  defaultValue={question.jp}
                />
              </div>
              <div className="d-flex flex-row">
                <span style={{ width: '100px' }}>스페인어​</span>
                <CFormInput
                  onChange={(e) => setQuestion({ ...question, es: e.target.value })}
                  placeholder="질문을 입력하세요"
                  defaultValue={question.es}
                />
              </div>
            </CCol>
            {/*Second Col1*/}
            <CCol className="d-flex flex-column my-4">
              <div className="mb-2">A. 답변작성​​​</div>
              <div className="d-flex flex-row mb-2">
                <CFormLabel style={{ width: '100px' }}>한국어​</CFormLabel>
                <CFormTextarea
                  placeholder="답변을 입력하세요"
                  defaultValue={answer.ko}
                  onChange={(e) => setAnswer({ ...answer, ko: e.target.value })}
                />
              </div>
              <div className="d-flex flex-row mb-2">
                <CFormLabel style={{ width: '100px' }}>영어​</CFormLabel>
                <CFormTextarea
                  placeholder="답변을 입력하세요"
                  defaultValue={answer.en}
                  onChange={(e) => setAnswer({ ...answer, en: e.target.value })}
                />
              </div>
              <div className="d-flex flex-row mb-2">
                <CFormLabel style={{ width: '100px' }}>중국어​</CFormLabel>
                <CFormTextarea
                  placeholder="답변을 입력하세요"
                  defaultValue={answer.ch}
                  onChange={(e) => setAnswer({ ...answer, ch: e.target.value })}
                />
              </div>
              <div className="d-flex flex-row mb-2">
                <CFormLabel style={{ width: '100px' }}>일본어​</CFormLabel>
                <CFormTextarea
                  placeholder="답변을 입력하세요"
                  onChange={(e) => setAnswer({ ...answer, jp: e.target.value })}
                  defaultValue={answer.jp}
                />
              </div>
              <div className="d-flex flex-row mb-2">
                <CFormLabel style={{ width: '100px' }}>스페인어​</CFormLabel>
                <CFormTextarea
                  placeholder="답변을 입력하세요"
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
              <div>정책 우선순위​</div>
              <div className="my-2 text-danger">
                ※ 높을수록 우선순위가 높다 ex_0이 가장 마지막에 노출됨​
              </div>
              <CCol className="d-flex flex-row my-2">
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
                  placeholder="순서를 숫자로 입력하세요"
                />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-column" sm={12}>
              <div className="mb-2 mt-4">등록상태​​</div>
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="text-center search-bar__select"
                style={{ width: '130px' }}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="1">정상​</option>
                <option value="0">비활성​</option>
                <option value="-1">삭제​</option>
              </CFormSelect>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="form-footer d-flex flex-row justify-content-end">
        <CButton
          onClick={() => {
            setIsQuestion(true)
          }}
          color="info"
          style={{ color: 'white' }}
          className="px-5 form-footer__btn__ml form-footer__btn"
        >
          저장​
        </CButton>
        <CButton
          onClick={() => onClickClose()}
          style={{ color: 'black' }}
          color="light"
          className="form-footer__btn"
        >
          닫기
        </CButton>
      </CModalFooter>
      {isQuestion && (
        <CheckPopup
          onClickClose={() => setIsQuestion(false)}
          bodyContent={'질문을 등록하시겠습니까?'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => onCloseOkEvent()}
          bodyContent={'성공적으로 생성되었습니다.'}
        />
      )}
    </CModal>
  )
}
CreateFaqPolicy.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onCloseOkEvent: PropTypes.func,
}
export default CreateFaqPolicy
