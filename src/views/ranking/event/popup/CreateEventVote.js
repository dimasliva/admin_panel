import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCol,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
} from '@coreui/react'
import { FileBtn } from 'src/components/FileBtn'
import moment from 'moment'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import FileApi from '../../../../util/FileApi'
import { NormalPopup } from '../../../../components/publicPopup/NormalPopup'
import { CheckPopup } from 'src/components/publicPopup/CheckPopup'

const CreateEventVote = ({ onClickClose }) => {
  const [isCreate, setIsCreate] = useState(false)
  const [isOkCheck, setIsOkCheck] = useState(false)
  const [isOkCheckId, setIsOkCheckId] = useState(false)
  const [startYear, setStartYear] = useState('')
  const [startHour, setStartHour] = useState('')
  const [isEndYear, setEndYear] = useState('')
  const [isEndHour, setEndHour] = useState('')
  const [isType, setType] = useState(3)
  const [eventUid, setEventUid] = useState()
  const [isStatus, setStatus] = useState()
  const [isPriority, setPriority] = useState()
  const [imgs, setImgs] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [nameVote, setNameVote] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })

  // Talk Data communication
  const create = async () => {
    if (
      nameVote.ko === '' &&
      nameVote.en === '' &&
      nameVote.ch === '' &&
      nameVote.jp === '' &&
      nameVote.es === ''
    ) {
      alert('배너 타이틀 입력')
    } else {
      if (imgs.ko instanceof File) {
        imgs.ko = await FileApi('ranking', imgs.ko)
      }
      if (imgs.en instanceof File) {
        imgs.en = await FileApi('ranking', imgs.en)
      }
      if (imgs.ch instanceof File) {
        imgs.ch = await FileApi('ranking', imgs.ch)
      }
      if (imgs.jp instanceof File) {
        imgs.jp = await FileApi('ranking', imgs.jp)
      }
      if (imgs.es instanceof File) {
        imgs.es = await FileApi('ranking', imgs.es)
      }
      const data = {
        type: isType,
        event_uid: eventUid,
        priority: isPriority,
        name_vote: nameVote,
        started_at: moment(startYear + ' ' + startHour + ':00'),
        ended_at: moment(isEndYear + ' ' + isEndHour + ':00'),
        event_banner: {
          ko:
            imgs.ko === ''
              ? imgs.ko
              : imgs.ko.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
          en:
            imgs.en === ''
              ? imgs.en
              : imgs.en.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
          ch:
            imgs.ch === ''
              ? imgs.ch
              : imgs.ch.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
          jp:
            imgs.jp === ''
              ? imgs.jp
              : imgs.jp.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
          es:
            imgs.es === ''
              ? imgs.es
              : imgs.es.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        },
        status: isStatus,
      }
      const res = await axios.post(`/api/rank`, data, headerConfig).catch((err) => statusCatch(err))
      console.log(res.data)
      if (res.data.success) {
        setIsOkCheck(true)
      } else if (res.data.success === false) {
        setIsOkCheckId(true)
      } else {
        alert('다시 시도해 주세요.')
      }
    }
  }

  const modalCreateEvent = (bool) => {
    if (bool) {
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
          <CCol sm={6}>
            <CCol className="mb-5">
              <span className="my-2">이벤트 형태​</span>
              <CCol sm={6} className="mt-3">
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="search-bar__select text-center"
                  style={{ width: '210px' }}
                  value={isType}
                  onChange={(e) => {
                    setType(e.target.value)
                  }}
                >
                  <option value={3}>이벤트 투표​​</option>
                  <option value={4}>이벤트 댓글 투표​</option>
                  <option value={5}>누적투표​</option>
                </CFormSelect>
              </CCol>
            </CCol>
            <CCol className="mb-5 d-flex flex-column">
              <div className="my-2">배너우선순위​</div>
              <div className="text-danger">
                ※ 높을수록 우선순위가 높다 ex_0이 가장 마지막에 노출됨​
              </div>
              <CCol sm={4} className="mt-3">
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="mr-3 search-bar__select mt-3 text-center"
                  onChange={(e) => setPriority(e.target.value)}
                  value={isPriority}
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                </CFormSelect>
              </CCol>
            </CCol>
            <CCol className="my-4 mb-5">
              <span>배너상태​</span>
              <CCol sm={4} className="mt-3">
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="mr-3 search-bar__select mt-3 text-center"
                  onChange={(e) => setStatus(e.target.value)}
                  value={isStatus}
                >
                  <option value={1}>진행중​</option>
                  <option value={0}>비활성​</option>
                  {/* <option value={2}>종료​</option> */}
                  <option value={-1}>삭제</option>
                </CFormSelect>
              </CCol>
            </CCol>
            <CCol className="d-flex flex-column my-4 mb-5">
              <span className="mb-2">이벤트 연결 (투표ID입력)​</span>
              <CFormInput
                defaultValue={eventUid}
                onChange={(e) => setEventUid(e.target.value)}
                placeholder="ex) 60efefccc82e568707cdafb2​"
              />
            </CCol>
            {/*Input P*/}
            <CCol className="mb-5 d-flex flex-column">
              <div className="mb-3">게시기간​</div>
              <CInputGroup>
                <span style={{ width: '50px' }}>시작일​</span>
                <CFormInput
                  type="date"
                  defaultValue={startYear}
                  onChange={(e) => {
                    setStartYear(e.target.value)
                  }}
                  placeholder="YYYY-MM-DD​​"
                  className="mx-2"
                />
                <CFormInput
                  type="time"
                  defaultValue={startHour}
                  onChange={(e) => {
                    setStartHour(e.target.value)
                  }}
                  placeholder="HH:MM:SS​"
                />
              </CInputGroup>
              <CInputGroup className="mt-3">
                <span className="me-2" style={{ width: '50px' }}>
                  종료일​
                </span>
                <CFormInput
                  className="me-2"
                  type="date"
                  onChange={(e) => {
                    setEndYear(e.target.value)
                  }}
                  placeholder="YYYY-MM-DD"
                />
                <CFormInput
                  type="time"
                  defaultValue={isEndHour}
                  onChange={(e) => {
                    setEndHour(e.target.value)
                  }}
                  placeholder="HH:MM:SS"
                />
              </CInputGroup>
            </CCol>
          </CCol>
          <CCol sm={1} />
          {/*Second col*/}
          <CCol sm={5}>
            <CCol className="mb-5 d-flex flex-column">
              <div className="mb-3">배너 타이틀​</div>
              <CInputGroup>
                <label htmlFor="ko" className="me-2" style={{ width: '70px' }}>
                  한국어​
                </label>
                <CFormInput
                  id="ko"
                  placeholder="내용을 입력하세요​"
                  defaultValue={nameVote.ko}
                  onChange={(e) => {
                    setNameVote({ ...nameVote, ko: e.target.value })
                  }}
                />
              </CInputGroup>
              <CInputGroup className="my-2">
                <label htmlFor="en" className="me-2" style={{ width: '70px' }}>
                  영어​
                </label>
                <CFormInput
                  id="en"
                  placeholder="내용을 입력하세요​"
                  defaultValue={nameVote.en}
                  onChange={(e) => {
                    setNameVote({ ...nameVote, en: e.target.value })
                  }}
                />
              </CInputGroup>
              <CInputGroup>
                <label htmlFor="ch" className="me-2" style={{ width: '70px' }}>
                  중국어​
                </label>
                <CFormInput
                  id="ch"
                  placeholder="내용을 입력하세요​"
                  defaultValue={nameVote.ch}
                  onChange={(e) => {
                    setNameVote({ ...nameVote, ch: e.target.value })
                  }}
                />
              </CInputGroup>
              <CInputGroup className="my-2">
                <label htmlFor="jp" className="me-2" style={{ width: '70px' }}>
                  일본어​
                </label>
                <CFormInput
                  id="jp"
                  placeholder="내용을 입력하세요​"
                  defaultValue={nameVote.jp}
                  onChange={(e) => {
                    setNameVote({ ...nameVote, jp: e.target.value })
                  }}
                />
              </CInputGroup>
              <CInputGroup>
                <label htmlFor="es" className="me-2" style={{ width: '70px' }}>
                  스페인어​
                </label>
                <CFormInput
                  id="es"
                  placeholder="내용을 입력하세요​"
                  defaultValue={nameVote.es}
                  onChange={(e) => {
                    setNameVote({ ...nameVote, es: e.target.value })
                  }}
                />
              </CInputGroup>
            </CCol>
            <CCol>
              <div className="me-4 mb-3">배너 이미지 (권장 : 0000 X 000 JPEG)​​</div>
              <div className="mb-3">
                <FileBtn
                  name="한국어​"
                  title="vote"
                  fileData={(data) => {
                    setImgs({ ...imgs, ko: data })
                  }}
                  accept="image/*"
                  id="img"
                  imageUrl={imgs.ko}
                />
              </div>
              <div className="mb-3">
                <FileBtn
                  name="영어​"
                  title="vote"
                  fileData={(data) => {
                    setImgs({ ...imgs, en: data })
                  }}
                  accept="image/*"
                  id="img2"
                  imageUrl={imgs.es}
                />
              </div>
              <div className="mb-3">
                <FileBtn
                  name="중국어​"
                  title="vote"
                  fileData={(data) => {
                    setImgs({ ...imgs, ch: data })
                  }}
                  accept="image/*"
                  id="img3"
                  imageUrl={imgs.ch}
                />
              </div>
              <div className="mb-3">
                <FileBtn
                  name="일본어​"
                  title="vote"
                  fileData={(data) => {
                    setImgs({ ...imgs, jp: data })
                  }}
                  accept="image/*"
                  id="img4"
                  imageUrl={imgs.jp}
                />
              </div>
              <div className="mb-3">
                <FileBtn
                  name="스페인어​"
                  title="vote"
                  fileData={(data) => {
                    setImgs({ ...imgs, es: data })
                  }}
                  accept="image/*"
                  id="img5"
                  imageUrl={imgs.es}
                />
              </div>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="form-footer">
        <CButton
          onClick={() => setIsCreate(true)}
          className="form-footer__btn px-5"
          style={{ color: 'white' }}
          color="info"
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
      {isCreate && (
        <CheckPopup
          onClickClose={() => setIsCreate(false)}
          bodyContent={'배너를 등록하시겠습니까?'}
          onCheked={(value) => modalCreateEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup onClickClose={() => onClickClose()} bodyContent={'등록을 완료했습니다.'} />
      )}
      {isOkCheckId && (
        <NormalPopup
          onClickClose={() => setIsOkCheckId(false)}
          bodyContent={'존재 하지 않는 아이디입니다.'}
        />
      )}
    </CModal>
  )
}

CreateEventVote.propTypes = {
  onClickClose: PropTypes.func.isRequired,
}

export default CreateEventVote
