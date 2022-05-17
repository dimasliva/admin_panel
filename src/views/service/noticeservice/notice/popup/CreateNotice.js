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
  CModalFooter,
  CRow,
} from '@coreui/react'
import moment from 'moment'

import { FileBtn } from 'src/components/FileBtn'
import FileApi from 'src/util/FileApi'

import { CheckPopup } from '../../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../../components/publicPopup/NormalPopup'
import axios from 'axios'
import { headerConfig } from '../../../../../static/axiosConfig'
import { statusCatch } from '../../../../../static/axiosCatch'

const CreateBanner = ({ onClickClose, onEndEvent }) => {
  const [isStatus, setStatus] = useState(1)
  const [isType, setType] = useState(1)
  const [error, setError] = useState('')
  const [isTitleNotice, setTitleNotice] = useState({
    ch: '',
    en: '',
    es: '',
    jp: '',
    ko: '',
  })
  const [isBodyNotice, setBodyNotice] = useState({
    ch: '',
    en: '',
    es: '',
    jp: '',
    ko: '',
  })
  //Date
  const [isStartYear, setStartYear] = useState('')
  const [isStartHour, setStartHour] = useState('')
  const [imgs, setImgs] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [isCreate, setIsCreate] = useState(false) // Create checked
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const create = async () => {
    if (
      isTitleNotice.ko === '' &&
      isTitleNotice.en === '' &&
      isTitleNotice.ch === '' &&
      isTitleNotice.jp === '' &&
      isTitleNotice.es === ''
    ) {
      setError('필드 채우기')
    } else {
      if (imgs.ko !== '') {
        imgs.ko = await FileApi('notice', imgs.ko)
      }
      if (imgs.en !== '') {
        imgs.en = await FileApi('notice', imgs.en)
      }
      if (imgs.ch !== '') {
        imgs.ch = await FileApi('notice', imgs.ch)
      }
      if (imgs.jp !== '') {
        imgs.jp = await FileApi('notice', imgs.jp)
      }
      if (imgs.es !== '') {
        imgs.es = await FileApi('notice', imgs.es)
      }

      const data = {
        type: isType,
        title_notice: isTitleNotice,
        body_notice: isBodyNotice,
        img_totice: {
          ko:
            imgs.ko === ''
              ? ''
              : imgs.ko.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
          en:
            imgs.en === ''
              ? ''
              : imgs.en.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
          ch:
            imgs.ch === ''
              ? ''
              : imgs.ch.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
          jp:
            imgs.jp === ''
              ? ''
              : imgs.jp.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
          es:
            imgs.es === ''
              ? ''
              : imgs.es.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        },
        started_at: moment(isStartYear + ' ' + isStartHour + '00'),
        status: isStatus,
      }
      const res = await axios
        .post(`/api/notice`, data, headerConfig)
        .catch((err) => statusCatch(err))

      if (res.data.success) {
        setIsOkCheck(true)
      } else {
        alert('다시 시도해 주세요.')
      }
    }
  }
  const modalOkEvent = (value) => {
    if (value) {
      setIsCreate(false)
      create()
    } else {
      setIsCreate(false)
    }
  }

  const closeModalEvent = () => {
    setIsOkCheck(false)
    onEndEvent()
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol sm={5}>
            <CCol className="my-2 d-flex flex-row align-items-center">
              <span>공지 타입​</span>
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="ms-3 search-bar__select"
                style={{ width: '130px' }}
                value={isType}
                onChange={(e) => {
                  setType(e.target.value)
                }}
              >
                <option value={1}>일반</option>
                <option value={2}>이벤트</option>
                <option value={3}>기타</option>
              </CFormSelect>
            </CCol>
            {/*3*/}
            <CCol className="d-flex flex-column my-4">
              <div className="mb-2">공지사항 제목​</div>
              <div className="my-2 text-danger">{error}</div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '100px' }}>한국어​</label>
                <CFormInput
                  value={isTitleNotice.ko}
                  onChange={(e) => {
                    setTitleNotice({ ...isTitleNotice, ko: e.target.value })
                  }}
                  placeholder="제목을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '100px' }}>영어​</label>
                <CFormInput
                  value={isTitleNotice.en}
                  onChange={(e) => {
                    setTitleNotice({ ...isTitleNotice, en: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '100px' }}>중국어​</label>
                <CFormInput
                  value={isTitleNotice.ch}
                  onChange={(e) => {
                    setTitleNotice({ ...isTitleNotice, ch: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '100px' }}>일본어​</label>
                <CFormInput
                  value={isTitleNotice.jp}
                  onChange={(e) => {
                    setTitleNotice({ ...isTitleNotice, jp: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '100px' }}>스페인어​</label>
                <CFormInput
                  value={isTitleNotice.es}
                  onChange={(e) => {
                    setTitleNotice({ ...isTitleNotice, es: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                />
              </div>
            </CCol>
            {/*Input P*/}
            <CCol className="d-flex flex-column my-4">
              <div className="mb-2">공지사항 상세 내용​</div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '100px' }}>한국어</label>
                <CFormTextarea
                  value={isBodyNotice.ko}
                  onChange={(e) => {
                    setBodyNotice({ ...isBodyNotice, ko: e.target.value })
                  }}
                  style={{ resize: 'none' }}
                  placeholder="제목을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '100px' }}>영어​</label>
                <CFormTextarea
                  style={{ resize: 'none' }}
                  value={isBodyNotice.en}
                  onChange={(e) => {
                    setBodyNotice({ ...isBodyNotice, en: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '100px' }}>중국어​</label>
                <CFormTextarea
                  style={{ resize: 'none' }}
                  value={isBodyNotice.ch}
                  onChange={(e) => {
                    setBodyNotice({ ...isBodyNotice, ch: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '100px' }}>일본어​</label>
                <CFormTextarea
                  style={{ resize: 'none' }}
                  value={isBodyNotice.jp}
                  onChange={(e) => {
                    setBodyNotice({ ...isBodyNotice, jp: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '100px' }}>스페인어​</label>
                <CFormTextarea
                  style={{ resize: 'none' }}
                  value={isBodyNotice.es}
                  onChange={(e) => {
                    setBodyNotice({ ...isBodyNotice, es: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                />
              </div>
            </CCol>
          </CCol>
          {/*Second col*/}
          <CCol sm={1} />
          {/*1*/}
          <CCol sm={6}>
            <CCol>
              <div className="my-2">게시기간​</div>
              <CCol className="d-flex flex-row my-4">
                <label className="me-1" style={{ width: '150px' }}>
                  시작일
                </label>
                <CFormInput
                  type="date"
                  defaultValue={isStartYear}
                  onChange={(e) => {
                    setStartYear(
                      moment(e.target.value, 'YYYY-MM-DD')
                        .format('YYYY-MM-DD')
                        .replace(/[^0-9]/g, '')
                        .replace(/^(\d{4})?(\d{2})?(\d{2})?/g, '$1-$2-$3')
                        .substr(0, e.target.placeholder.length),
                    )
                    let num = e.target.value.replace(/\D/g, '')
                    e.target.value =
                      num.substring(0, 4) + '-' + num.substring(4, 6) + '-' + num.substring(6, 8)
                  }}
                  placeholder="YYYY-MM-DD​​"
                  className="mx-2"
                />
                <CFormInput
                  type="time"
                  defaultValue={isStartHour}
                  onChange={(e) => {
                    setStartHour(
                      e.target.value
                        .replace(/[^0-9]/g, '')
                        .replace(/^(\d{2})?(\d{2})?(\d{2})?/g, '$1:$2:$3')
                        .substr(0, e.target.placeholder.length),
                    )
                  }}
                  placeholder="HH:MM:SS​"
                />
              </CCol>
            </CCol>
            {/*2*/}
            <CCol className="mb-3">
              <span>공지사항 이미지 (권장 : 335 X 000 JPEG)</span>
            </CCol>
            <CCol className="d-flex flex-column">
              <FileBtn
                name="한국어"
                title="notice"
                fileData={(data) => {
                  setImgs({ ...imgs, ko: data })
                }}
                accept="image/*"
                id="main"
                imageUrl={imgs.ko}
              />
            </CCol>
            {/*10*/}
            <CCol className="d-flex flex-column">
              <FileBtn
                name="영어"
                title="notice"
                fileData={(data) => {
                  setImgs({ ...imgs, en: data })
                }}
                accept="image/*"
                id="main2"
                imageUrl={imgs.en}
              />
            </CCol>
            {/*11*/}
            <CCol className="d-flex flex-column">
              <FileBtn
                name="중국어"
                title="notice"
                fileData={(data) => {
                  setImgs({ ...imgs, ch: data })
                }}
                accept="image/*"
                id="main3"
                imageUrl={imgs.ch}
              />
            </CCol>
            {/*  12  */}
            <CCol className="d-flex flex-column">
              <FileBtn
                name="일본어"
                title="notice"
                fileData={(data) => {
                  setImgs({ ...imgs, jp: data })
                }}
                accept="image/*"
                id="main4"
                imageUrl={imgs.jp}
              />
            </CCol>
            <CCol className="d-flex flex-column">
              <FileBtn
                name="스페인어"
                title="notice"
                fileData={(data) => {
                  setImgs({ ...imgs, es: data })
                }}
                accept="image/*"
                id="main5"
                imageUrl={imgs.es}
              />
            </CCol>
            <CCol className="d-flex flex-column align-items-start mt-4">
              <div className="mb-2" style={{ marginLeft: '30px' }}>
                등록상태​
              </div>
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="text-center search-bar__select"
                value={isStatus}
                style={{ width: '140px' }}
                onChange={(e) => {
                  setStatus(e.target.value)
                }}
              >
                <option value={1}>진행중​</option>
                <option value={0}>비활성​</option>
                <option value={-1}>삭제​</option>
              </CFormSelect>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="form-footer">
        <CButton
          color="info"
          style={{ color: 'white' }}
          className="px-4 form-footer__btn__ml form-footer__btn"
          onClick={() => setIsCreate(true)}
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
          bodyContent={'공지사항을 등록하시겠습니까?'}
          title={'등록'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'등록이 완료되었습니다.'}
        />
      )}
    </CModal>
  )
}
CreateBanner.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onEndEvent: PropTypes.func,
}
export default CreateBanner
