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
  CModalFooter,
  CRow,
  CTable,
  CTableDataCell,
  CTableRow,
} from '@coreui/react'
import moment from 'moment'
import { FileBtn } from '../../../../../components/FileBtn'
import { CheckPopup } from '../../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../../components/publicPopup/NormalPopup'
import axios from 'axios'
import { headerConfig } from '../../../../../static/axiosConfig'
import { statusCatch } from '../../../../../static/axiosCatch'
import FileApi from '../../../../../util/FileApi'

const NoticeDetail = ({ onClickClose, onCloseOkEvent, onId }) => {
  const [isNoticeContent, setIsNoticeContent] = useState(false) // Detail Popup
  const [isStatus, setStatus] = useState(1)
  const [isType, setType] = useState(1)
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
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const one = 1
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
      .get(`/api/notice?id=${onId}`, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) return
    // Start Day
    const start = moment(res.data.value.started_at).format('YYYY-MM-DD').split('-')
    const startTime = moment(res.data.value.started_at).format('HH:mm:ss').split(':')
    // end Day
    setStartYear(start.join('-'))
    setStartHour(startTime.join(':'))
    if (res.data.value.title_notice !== null) {
      setTitleNotice({
        ko: res.data.value.title_notice.ko,
        en: res.data.value.title_notice.en,
        ch: res.data.value.title_notice.ch,
        jp: res.data.value.title_notice.jp,
        es: res.data.value.title_notice.es,
      })
    }
    if (res.data.value.body_notice !== null) {
      setBodyNotice({
        ko: res.data.value.body_notice.ko,
        en: res.data.value.body_notice.en,
        ch: res.data.value.body_notice.ch,
        jp: res.data.value.body_notice.jp,
        es: res.data.value.body_notice.es,
      })
    }
    setImgs({
      ko: res.data.value.img_totice.ko,
      en: res.data.value.img_totice.en,
      ch: res.data.value.img_totice.ch,
      jp: res.data.value.img_totice.jp,
      es: res.data.value.img_totice.es,
    })
    setType(res.data.value.type)
    setStatus(res.data.value.status)
  }
  const modify = async () => {
    if (imgs.ko instanceof File) {
      imgs.ko = await FileApi('notice', imgs.ko)
    }
    if (imgs.en instanceof File) {
      imgs.en = await FileApi('notice', imgs.en)
    }
    if (imgs.ch instanceof File) {
      imgs.ch = await FileApi('notice', imgs.ch)
    }
    if (imgs.jp instanceof File) {
      imgs.jp = await FileApi('notice', imgs.jp)
    }
    if (imgs.es instanceof File) {
      imgs.es = await FileApi('notice', imgs.es)
    }
    const data = {
      id: onId,
      type: isType,
      title_notice: isTitleNotice,
      body_notice: isBodyNotice,
      img_totice: {
        ko:
          imgs.ko.data === undefined || imgs.ko.data.value[0] === undefined
            ? imgs.ko
            : imgs.ko.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        en:
          imgs.en.data === undefined || imgs.en.data.value[0] === undefined
            ? imgs.en
            : imgs.en.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        ch:
          imgs.ch.data === undefined || imgs.ch.data.value[0] === undefined
            ? imgs.ch
            : imgs.ch.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        jp:
          imgs.jp.data === undefined || imgs.jp.data.value[0] === undefined
            ? imgs.jp
            : imgs.jp.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        es:
          imgs.es.data === undefined || imgs.es.data.value[0] === undefined
            ? imgs.es
            : imgs.es.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
      },
      started_at: moment(isStartYear + ' ' + isStartHour),
      status: isStatus,
    }
    const res = await axios.post(`/api/notice`, data, headerConfig).catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }
  const closeModalEvent = () => {
    setIsOkCheck(false)
    onCloseOkEvent()
  }
  const modalOkEvent = (value) => {
    if (value) {
      setIsNoticeContent(false)
      modify()
    } else {
      setIsNoticeContent(false)
    }
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol sm={6}>
            <CCol className="my-2 d-flex flex-row align-items-center">
              <span>공지 타입​</span>
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="ms-3 search-bar__select"
                value={isType}
                style={{ width: '130px' }}
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
            <CCol>
              <div className="my-2">게시기간​</div>
              <CTable>
                <CTableRow>
                  <CTableDataCell>
                    <label>시작일</label>
                  </CTableDataCell>
                  <CTableDataCell>
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
                      }}
                      placeholder="YYYY-MM-DD​​"
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="time"
                      value={isStartHour}
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
                  </CTableDataCell>
                </CTableRow>
              </CTable>
            </CCol>
          </CCol>
          {/*Second col*/}
          <CCol sm={1} />
          {/*1*/}
          <CCol sm={5}>
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
            <CCol sm={5} className="d-flex flex-column align-items-center mt-4">
              <div className="mb-2">등록상태​</div>
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="text-center search-bar__select"
                style={{ width: '130px' }}
                value={isStatus}
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
        {role !== one && (
          <CButton
            color="info"
            style={{ color: 'white' }}
            className="px-4 form-footer__btn__ml form-footer__btn"
            onClick={() => {
              setIsNoticeContent(true)
            }}
          >
            저장​
          </CButton>
        )}
        <CButton
          onClick={() => onClickClose()}
          style={{ color: 'black' }}
          color="light"
          className="form-footer__btn"
        >
          닫기
        </CButton>
      </CModalFooter>
      {isNoticeContent && role !== one && (
        <CheckPopup
          onClickClose={() => setIsNoticeContent(false)}
          bodyContent={'공지사항을 등록하시겠습니까?'}
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
NoticeDetail.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onCloseOkEvent: PropTypes.func,
  onId: PropTypes.number.isRequired,
}
export default NoticeDetail
