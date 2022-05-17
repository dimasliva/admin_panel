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
import { FileBtn } from 'src/components/FileBtn'
import { CheckPopup } from 'src/components/publicPopup/CheckPopup'
import { NormalPopup } from 'src/components/publicPopup/NormalPopup'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'
import { dateModify } from 'src/static/myFunction'
import axios from 'axios'
import FileApi from 'src/util/FileApi'

const EditCreateEventTalk = ({ onClickClose, onEndEvent }) => {
  const [type, setType] = useState('6')
  const [startDay, setStartDay] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
  })
  const [endDay, setEndDay] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
  })
  const [eventTitle, setEventTitle] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [eventGuide, setEventGuide] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [imgs, setImgs] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [errorMessage2, setErrorMessage2] = useState('')
  const [errorMessage3, setErrorMessage3] = useState('')
  const [errorMessage4, setErrorMessage4] = useState('')
  const [status, setStatus] = useState('1')
  const [isCreate, setIsCreate] = useState(false) // Create checked
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal

  const create = async () => {
    if (parseInt(startDay.month) < 10) {
      startDay.month = '0' + parseInt(startDay.month)
    }
    if (parseInt(startDay.day) < 10) {
      startDay.day = '0' + parseInt(startDay.day)
    }
    if (parseInt(startDay.hour) < 10) {
      startDay.hour = '0' + parseInt(startDay.hour)
    }
    if (parseInt(startDay.minute) < 10) {
      startDay.minute = '0' + parseInt(startDay.minute)
    }
    if (parseInt(endDay.month) < 10) {
      endDay.month = '0' + parseInt(endDay.month)
    }
    if (parseInt(endDay.day) < 10) {
      endDay.day = '0' + parseInt(endDay.day)
    }
    if (parseInt(endDay.hour) < 10) {
      endDay.hour = '0' + parseInt(endDay.hour)
    }
    if (parseInt(endDay.minute) < 10) {
      endDay.minute = '0' + parseInt(endDay.minute)
    }

    setStartDay(dateModify(startDay))
    setEndDay(dateModify(endDay))

    if (imgs.ko instanceof File) {
      imgs.ko = await FileApi('fanTalk', imgs.ko)
    }
    if (imgs.en instanceof File) {
      imgs.en = await FileApi('fanTalk', imgs.en)
    }
    if (imgs.ch instanceof File) {
      imgs.ch = await FileApi('fanTalk', imgs.ch)
    }
    if (imgs.jp instanceof File) {
      imgs.jp = await FileApi('fanTalk', imgs.jp)
    }
    if (imgs.es instanceof File) {
      imgs.es = await FileApi('fanTalk', imgs.es)
    }
    if (
      type == 6 &&
      eventTitle.ko === '' &&
      eventTitle.en === '' &&
      eventTitle.jp === '' &&
      eventTitle.ch === '' &&
      eventTitle.es === ''
    ) {
      alert('이벤트 팬톡 주제를 작성해주세요.')
    } else if (
      type == 7 &&
      eventGuide.ko === '' &&
      eventGuide.en === '' &&
      eventGuide.jp === '' &&
      eventGuide.ch === '' &&
      eventGuide.es === ''
    ) {
      alert('이벤트 팬톡을 작성해주세요.')
    } else {
      const data = {
        type,
        started_at: moment(
          startDay.year +
            '-' +
            startDay.month +
            '-' +
            startDay.day +
            ' ' +
            startDay.hour +
            ':' +
            startDay.minute +
            ':' +
            '00',
        ),
        ended_at: moment(
          endDay.year +
            '-' +
            endDay.month +
            '-' +
            endDay.day +
            ' ' +
            endDay.hour +
            ':' +
            endDay.minute +
            ':' +
            '00',
        ),
        title_play_lng: eventTitle,
        guide_play: eventGuide,
        img_play: {
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
        status,
      }
      console.log(data)
      const res = await axios
        .post(`/api/fan/play`, data, headerConfig)
        .catch((err) => statusCatch(err))
      console.log(res.data)
      if (res.data.success) {
        setIsOkCheck(true)
      } else {
        if (res.data.error) alert(res.data.error)
      }
    }
  }

  // delete checked
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
          <CCol sm={6}>
            <CCol>
              <span className="my-2">이벤트 타입​</span>
              <CCol sm={12}>
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="search-bar__select mt-3 mb-5"
                  style={{ width: '150px' }}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="6">이벤트형</option>
                  <option value="7">배너형</option>
                </CFormSelect>
              </CCol>
            </CCol>
            {/*2*/}
            <CCol>
              <div className="my-2">게시기간​</div>
              <CTable>
                <CTableRow>
                  <CTableDataCell>
                    <label>시작일</label>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="number"
                      placeholder="YYYY​​"
                      className="me-2"
                      defaultValue={startDay.year}
                      onChange={(e) => {
                        setStartDay({
                          ...startDay,
                          year:
                            e.target.value.length === 0 ? new Date().getFullYear() : e.target.value,
                        })
                      }}
                      onKeyPress={(e) => {
                        let ch = String.fromCharCode(e.which)
                        if (!/[0-9]/.test(ch) || e.target.value.length > 3) {
                          e.preventDefault()
                        }
                      }}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <span>년</span>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="number"
                      placeholder="MM​​"
                      className="me-2"
                      defaultValue={startDay.month}
                      onChange={(e) => {
                        setStartDay({
                          ...startDay,
                          month:
                            e.target.value.length === 0 ? new Date().getMonth() : e.target.value,
                        })
                      }}
                      onKeyPress={(e) => {
                        let ch = String.fromCharCode(e.which)
                        if (!/[0-9]/.test(ch) || e.target.value.length > 1) {
                          e.preventDefault()
                        }
                      }}
                      max={12}
                      min={1}
                      maxLength={2}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <span>월</span>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="number"
                      placeholder="DD​​"
                      className="me-2"
                      defaultValue={startDay.day}
                      onChange={(e) => {
                        setStartDay({
                          ...startDay,
                          day: e.target.value.length === 0 ? new Date().getDay() : e.target.value,
                        })
                      }}
                      onKeyPress={(e) => {
                        let ch = String.fromCharCode(e.which)
                        if (!/[0-9]/.test(ch) || e.target.value.length > 1) {
                          e.preventDefault()
                        }
                      }}
                      max={31}
                      min={1}
                      maxLength={2}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <span>일</span>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell style={{ paddingTop: '2px' }} />
                </CTableRow>
                <CTableRow>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="number"
                      placeholder="HH"
                      className="me-2"
                      defaultValue={startDay.hour}
                      onChange={(e) => {
                        setStartDay({
                          ...startDay,
                          hour:
                            e.target.value.length === 0 ? new Date().getHours() : e.target.value,
                        })
                      }}
                      onKeyPress={(e) => {
                        let ch = String.fromCharCode(e.which)
                        if (!/[0-9]/.test(ch) || e.target.value.length > 1) {
                          e.preventDefault()
                        }
                      }}
                      maxLength={2}
                      max={24}
                      min={0}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <span>시</span>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="number"
                      placeholder="MM​​"
                      className="me-2"
                      defaultValue={startDay.minute}
                      onChange={(e) => {
                        setStartDay({
                          ...startDay,
                          minute:
                            e.target.value.length === 0 ? new Date().getMinutes() : e.target.value,
                        })
                      }}
                      onKeyPress={(e) => {
                        let ch = String.fromCharCode(e.which)
                        if (!/[0-9]/.test(ch) || e.target.value.length > 1) {
                          e.preventDefault()
                        }
                      }}
                      maxLength={2}
                      max={60}
                      min={0}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <span>분</span>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell style={{ paddingTop: '5px' }} />
                </CTableRow>
                <CTableRow>
                  <CTableDataCell style={{ width: '60px' }}>
                    <label>종료일</label>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="number"
                      placeholder="YYYY​​"
                      className="me-2"
                      defaultValue={endDay.year}
                      onChange={(e) => {
                        setEndDay({
                          ...endDay,
                          year:
                            e.target.value.length === 0 ? new Date().getFullYear() : e.target.value,
                        })
                      }}
                      onKeyPress={(e) => {
                        let ch = String.fromCharCode(e.which)
                        if (!/[0-9]/.test(ch) || e.target.value.length > 3) {
                          e.preventDefault()
                        }
                      }}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <span>년</span>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="number"
                      placeholder="MM​​"
                      className="me-2"
                      defaultValue={endDay.month}
                      onChange={(e) => {
                        setEndDay({
                          ...endDay,
                          month:
                            e.target.value.length === 0 ? new Date().getMonth() : e.target.value,
                        })
                      }}
                      onKeyPress={(e) => {
                        let ch = String.fromCharCode(e.which)
                        if (!/[0-9]/.test(ch) || e.target.value.length > 1) {
                          e.preventDefault()
                        }
                      }}
                      max={12}
                      min={1}
                      maxLength={2}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <span>월</span>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="number"
                      placeholder="DD​​"
                      className="me-2"
                      defaultValue={endDay.day}
                      onChange={(e) => {
                        setEndDay({
                          ...endDay,
                          day: e.target.value.length === 0 ? new Date().getDay() : e.target.value,
                        })
                      }}
                      onKeyPress={(e) => {
                        let ch = String.fromCharCode(e.which)
                        if (!/[0-9]/.test(ch) || e.target.value.length > 1) {
                          e.preventDefault()
                        }
                      }}
                      max={31}
                      min={1}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <span>일</span>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell style={{ paddingTop: '2px' }} />
                </CTableRow>
                <CTableRow>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="number"
                      placeholder="HH"
                      className="me-2"
                      style={{ width: '100%' }}
                      defaultValue={endDay.hour}
                      onChange={(e) => {
                        setEndDay({
                          ...endDay,
                          hour:
                            e.target.value.length === 0 ? new Date().getHours() : e.target.value,
                        })
                      }}
                      onKeyPress={(e) => {
                        let ch = String.fromCharCode(e.which)
                        if (!/[0-9]/.test(ch) || e.target.value.length > 1) {
                          e.preventDefault()
                        }
                      }}
                      max={24}
                      min={0}
                      maxLength={2}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <span>시</span>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="number"
                      placeholder="MM​​"
                      className="me-2"
                      style={{ width: '100%' }}
                      defaultValue={endDay.minute}
                      onChange={(e) => {
                        setEndDay({
                          ...endDay,
                          minute:
                            e.target.value.length === 0 ? new Date().getMinutes() : e.target.value,
                        })
                      }}
                      onKeyPress={(e) => {
                        let ch = String.fromCharCode(e.which)
                        if (!/[0-9]/.test(ch) || e.target.value.length > 1) {
                          e.preventDefault()
                        }
                      }}
                      max={60}
                      min={0}
                      maxLength={2}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <span>분</span>
                  </CTableDataCell>
                </CTableRow>
                {type == 7 &&
                startDay.day === '' &&
                startDay.month === '' &&
                startDay.year === '' &&
                startDay.minute === '' &&
                startDay.hour === '' &&
                endDay.day === '' &&
                endDay.month === '' &&
                endDay.year === '' &&
                endDay.minute === '' &&
                endDay.hour === '' ? (
                  <span className="text-danger">{errorMessage3}</span>
                ) : (
                  ''
                )}
              </CTable>
            </CCol>
            {/*3*/}
            {type == 6 && (
              <CCol className="d-flex flex-column my-4">
                <div className="mb-2">이벤트 팬톡 주제​</div>
                <div className="d-flex flex-row my-1">
                  <label style={{ width: '100px' }}>한국어​</label>
                  <CFormTextarea
                    style={{ height: '100px', resize: 'none' }}
                    placeholder="내용을 입력하세요​"
                    value={eventTitle.ko}
                    onChange={(e) =>
                      setEventTitle({
                        ...eventTitle,
                        ko: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="d-flex flex-row my-1">
                  <label style={{ width: '100px' }}>영어​</label>
                  <CFormTextarea
                    style={{ height: '100px', resize: 'none' }}
                    placeholder="내용을 입력하세요​"
                    value={eventTitle.en}
                    onChange={(e) =>
                      setEventTitle({
                        ...eventTitle,
                        en: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="d-flex flex-row my-1">
                  <label style={{ width: '100px' }}>중국어​</label>
                  <CFormTextarea
                    style={{ height: '100px', resize: 'none' }}
                    placeholder="내용을 입력하세요​"
                    value={eventTitle.ch}
                    onChange={(e) =>
                      setEventTitle({
                        ...eventTitle,
                        ch: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="d-flex flex-row my-1">
                  <label style={{ width: '100px' }}>일본어​</label>
                  <CFormTextarea
                    style={{ height: '100px', resize: 'none' }}
                    placeholder="내용을 입력하세요​"
                    value={eventTitle.jp}
                    onChange={(e) =>
                      setEventTitle({
                        ...eventTitle,
                        jp: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="d-flex flex-row my-1">
                  <label style={{ width: '100px' }}>스페인어​</label>
                  <CFormTextarea
                    style={{ height: '100px', resize: 'none' }}
                    placeholder="내용을 입력하세요​"
                    value={eventTitle.es}
                    onChange={(e) =>
                      setEventTitle({
                        ...eventTitle,
                        es: e.target.value,
                      })
                    }
                  />
                </div>
                {type == 6 &&
                imgs.ko === '' &&
                imgs.en === '' &&
                imgs.ch === '' &&
                imgs.jp === '' &&
                imgs.es === '' ? (
                  <span className="text-danger">{errorMessage}</span>
                ) : (
                  ''
                )}
              </CCol>
            )}
            {/*Input P*/}
            <CCol className="d-flex flex-column my-4">
              <div className="mb-2">이벤트 팬톡 가이드 (이벤트팬톡 하단 노출)​​</div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '100px' }}>한국어​</label>
                <CFormTextarea
                  style={{ height: '100px', resize: 'none' }}
                  placeholder="내용을 입력하세요​"
                  value={eventGuide.ko}
                  onChange={(e) =>
                    setEventGuide({
                      ...eventGuide,
                      ko: e.target.value,
                    })
                  }
                />
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '100px' }}>영어​</label>
                <CFormTextarea
                  style={{ height: '100px', resize: 'none' }}
                  placeholder="내용을 입력하세요​"
                  value={eventGuide.en}
                  onChange={(e) =>
                    setEventGuide({
                      ...eventGuide,
                      en: e.target.value,
                    })
                  }
                />
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '100px' }}>중국어​</label>
                <CFormTextarea
                  style={{ height: '100px', resize: 'none' }}
                  placeholder="내용을 입력하세요​"
                  value={eventGuide.ch}
                  onChange={(e) =>
                    setEventGuide({
                      ...eventGuide,
                      ch: e.target.value,
                    })
                  }
                />
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '100px' }}>일본어​</label>
                <CFormTextarea
                  style={{ height: '100px', resize: 'none' }}
                  placeholder="내용을 입력하세요​"
                  value={eventGuide.jp}
                  onChange={(e) =>
                    setEventGuide({
                      ...eventGuide,
                      jp: e.target.value,
                    })
                  }
                />
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '100px' }}>스페인어​</label>
                <CFormTextarea
                  style={{ height: '100px', resize: 'none' }}
                  placeholder="내용을 입력하세요​"
                  value={eventGuide.es}
                  onChange={(e) =>
                    setEventGuide({
                      ...eventGuide,
                      es: e.target.value,
                    })
                  }
                />
              </div>
            </CCol>
            {type == 7 &&
              eventGuide.ko == '' &&
              eventGuide.en == '' &&
              eventGuide.ch == '' &&
              eventGuide.jp == '' &&
              eventGuide.es == '' && <span className="text-danger">{errorMessage4}</span>}
          </CCol>
          {/*Second col*/}
          <CCol sm={6}>
            <CCol>
              <div className="me-4 mb-3">이벤트 배너 이미지 (권장 : 335 X 150 JPEG)​​</div>
              <CCol className="d-flex flex-row">
                <div className="mb-3">
                  <FileBtn
                    name="한국어"
                    title="fanTalk"
                    fileData={(data) => {
                      setImgs({ ...imgs, ko: data })
                    }}
                    accept="image/*"
                    id="main"
                    imageUrl={imgs.ko}
                  />
                </div>
              </CCol>
            </CCol>
            {/*9*/}
            <CCol className="d-flex flex-column w-100 my-4">
              <span className="border border-bottom-1" />
            </CCol>
            <CCol>
              <div className="mb-3">
                <FileBtn
                  name="영어"
                  title="fanTalk"
                  fileData={(data) => {
                    setImgs({ ...imgs, en: data })
                  }}
                  accept="image/*"
                  id="main2"
                  imageUrl={imgs.en}
                />
              </div>
            </CCol>
            {/*10*/}
            <CCol className="d-flex flex-column">
              <div className="mb-3">
                <FileBtn
                  name="중국어"
                  title="fanTalk"
                  fileData={(data) => {
                    setImgs({ ...imgs, ch: data })
                  }}
                  accept="image/*"
                  id="main3"
                  imageUrl={imgs.ch}
                />
              </div>
            </CCol>
            {/*11*/}
            <CCol className="d-flex flex-column">
              <div className="mb-3">
                <FileBtn
                  name="일본어"
                  title="fanTalk"
                  fileData={(data) => {
                    setImgs({ ...imgs, jp: data })
                  }}
                  accept="image/*"
                  id="main4"
                  imageUrl={imgs.jp}
                />
              </div>
            </CCol>
            {/*  12  */}
            <CCol className="d-flex flex-column">
              <div className="mb-3">
                <FileBtn
                  name="스페인어"
                  title="fanTalk"
                  fileData={(data) => {
                    setImgs({ ...imgs, es: data })
                  }}
                  accept="image/*"
                  id="main5"
                  imageUrl={imgs.es}
                />
                {type == 7 &&
                imgs.ko == '' &&
                imgs.en == '' &&
                imgs.ch == '' &&
                imgs.jp == '' &&
                imgs.es == '' ? (
                  <span className="text-danger">{errorMessage2}</span>
                ) : (
                  ''
                )}
              </div>
            </CCol>
            {/*  13  */}
            <CCol>
              <span className="my-2">이벤트 상태​</span>
              <CCol sm={12}>
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="search-bar__select mt-3 mb-5"
                  style={{ width: '130px' }}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="1">진행중</option>
                  <option value="0">비활성</option>
                  <option value="-1">삭제</option>
                </CFormSelect>
              </CCol>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="form-footer">
        <CButton
          color="primary"
          className="form-footer__bt__ml form-footer__bt"
          onClick={() =>
            type == 6 &&
            eventTitle.ko == '' &&
            eventTitle.en == '' &&
            eventTitle.ch == '' &&
            eventTitle.jp == '' &&
            eventTitle.es == ''
              ? setErrorMessage('이벤트 팬과의 대화 주제를 입력하세요.')
              : type == 7 &&
                imgs.ko == '' &&
                imgs.en == '' &&
                imgs.ch == '' &&
                imgs.jp == '' &&
                imgs.es == ''
              ? setErrorMessage2('이미지 선택.')
              : type == 7 &&
                startDay.day === '' &&
                startDay.month === '' &&
                startDay.year === '' &&
                startDay.minute === '' &&
                startDay.hour === '' &&
                endDay.day === '' &&
                endDay.month === '' &&
                endDay.year === '' &&
                endDay.minute === '' &&
                endDay.hour === ''
              ? setErrorMessage3('날짜 기입.')
              : type == 7 &&
                eventGuide.ko == '' &&
                eventGuide.en == '' &&
                eventGuide.ch == '' &&
                eventGuide.jp == '' &&
                eventGuide.es == ''
              ? setErrorMessage4('이벤트 팬톡 주제를 작성해주세요.')
              : setIsCreate(true)
          }
        >
          저장​
        </CButton>
        <CButton
          onClick={() => onClickClose()}
          style={{ color: 'black' }}
          color="light"
          className="form-footer__bt"
        >
          닫기
        </CButton>
      </CModalFooter>
      {/* Create Checked popup*/}
      {isCreate && (
        <CheckPopup
          onClickClose={() => setIsCreate(false)}
          bodyContent={'이벤트 팬톡을 등록하시겠습니까?'}
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
EditCreateEventTalk.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onEndEvent: PropTypes.func,
}
export default EditCreateEventTalk
