import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalBody,
  CCol,
  CRow,
  CModalFooter,
  CButton,
  CFormSelect,
  CInputGroup,
  CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormCheck,
  CFormTextarea,
} from '@coreui/react'
import PropTypes from 'prop-types'
import moment from 'moment'
import axios from 'axios'
import { headerConfig } from '../../../../../static/axiosConfig'
import { statusCatch } from '../../../../../static/axiosCatch'
import { CheckPopup } from '../../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../../components/publicPopup/NormalPopup'

export const CreateMissionMonth = ({ onClickClose, onCloseOkEvent }) => {
  const [isCreate, setIsCreate] = useState(false) // Create checked
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isTitle, setTitle] = useState('')
  const [isTypePoint, setTypePoint] = useState(1)
  const [isRuleQuest, setRuleQuest] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [listTab, setListTab] = useState([])
  const [isReward, setReward] = useState(0)
  //Date
  const [isStartYear, setStartYear] = useState('')
  const [isStartHour, setStartHour] = useState('')
  const [isEndYear, setEndYear] = useState('')
  const [isEndHour, setEndHour] = useState('')
  const [role, setRole] = useState()
  //Status
  const [isStatus, setStatus] = useState(1)
  const closeModalEvent = () => {
    setIsOkCheck(false)
    onCloseOkEvent()
  }
  useEffect(() => {
    getList()
    getRole()
  }, [])
  const getList = async () => {
    const res = await axios
      .get(`/api/mission/items/empty?type=3`, headerConfig)
      .catch((err) => statusCatch(err))
    setListTab(res.data.value)
  }
  const getRole = async () => {
    const res = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(res.data.value.role)
  }
  const create = async () => {
    let isChecked = false
    for (const element of listTab) {
      if (element.is_active === 1) {
        isChecked = true
        break
      }
    }
    if (!isChecked) {
      alert('미션내용을 선택해 주세요.')
      return
    }
    const data = {
      title: isTitle,
      type: 3,
      rule_quest: isRuleQuest,
      type_point: isTypePoint,
      award_point: isReward,
      status: isStatus,
      started_at: moment(isStartYear + ' ' + isStartHour + ':00'),
      ended_at: moment(isEndYear + ' ' + isEndHour + ':00'),
      items: listTab,
    }
    const res = await axios
      .post(`/api/mission`, data, headerConfig)
      .catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      if (res.data.error) alert(res.data.error)
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
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody className="form-body">
        <CRow className="row">
          <CCol sm={12}>
            {/*1*/}
            <CCol className="d-flex flex-column w-75">
              <h5>월간 퀘스트 ​​</h5>
              <div className="mt-3">
                <span>퀘스트 타이틀 (외부노출x/ 메모용)</span>
                <CInputGroup className="mt-2">
                  <CFormInput
                    onChange={(e) => {
                      setTitle(e.target.value)
                    }}
                    type="text"
                    placeholder="내용을 입력하세요 ex)일일 퀘스트 v.001​"
                  />
                </CInputGroup>
              </div>
            </CCol>
            {/*2*/}
            <CCol className="d-flex flex-column my-4">
              <div className="mb-3">
                <span>월간 퀘스트 관리</span>
              </div>
              <CCol className="d-flex flex-row align-items-center">
                <CCol sm={11}>
                  <CTable className="mt-3">
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell className="text-center border-1" scope="col">
                          선택
                        </CTableHeaderCell>
                        <CTableHeaderCell className="text-center border-1" scope="col">
                          미션내용
                        </CTableHeaderCell>
                        <CTableHeaderCell className="text-center border-1" scope="col">
                          횟수(1month)
                        </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {listTab !== null && listTab !== undefined ? (
                        listTab.map((value, index) => {
                          value.is_active = value.is_active === undefined ? 0 : value.is_active
                          value.type_point = value.type_point === undefined ? 1 : value.type_point
                          value.award_point =
                            value.award_point === undefined ? 0 : value.award_point
                          return (
                            <CTableRow key={index}>
                              <CTableDataCell scope="row" className="text-break border-1">
                                <div className="d-flex flex-row align-items-center justify-content-center">
                                  <CFormCheck
                                    disabled={role === 1 ? true : false}
                                    onClick={(e) => {
                                      value.is_active = e.target.checked === false ? 0 : 1
                                    }}
                                    defaultChecked={value.is_active}
                                    id="flexCheckDefault"
                                  />
                                </div>
                              </CTableDataCell>
                              <CTableDataCell scope="row" className="text-break border-1">
                                <div className="d-flex flex-row align-items-center justify-content-center">
                                  <span>{value.term}</span>
                                </div>
                              </CTableDataCell>
                              <CTableDataCell scope="row" className="text-break border-1">
                                <div className="d-flex flex-row align-items-center justify-content-center">
                                  <CFormInput
                                    size="sm"
                                    type="number"
                                    disabled={role === 1 ? true : false}
                                    onKeyPress={(e) => {
                                      let ch = String.fromCharCode(e.which)
                                      if (!/[0-9]/.test(ch)) {
                                        e.preventDefault()
                                      }
                                    }}
                                    onChange={(e) => {
                                      value.quantity = e.target.value
                                    }}
                                    defaultValue={value.quantity}
                                    className="text-end"
                                  />
                                </div>
                              </CTableDataCell>
                            </CTableRow>
                          )
                        })
                      ) : (
                        <CTableRow />
                      )}
                    </CTableBody>
                  </CTable>
                </CCol>
              </CCol>
            </CCol>
            <CCol className="d-flex flex-row">
              <CCol className="d-flex flex-column my-4">
                <span className="mb-3">월간 퀘스트 미션 전체보상</span>
                <CCol className="d-flex flex-row align-items-center">
                  <CCol sm={11}>
                    <CTable className="mt-3">
                      <CTableHead className="text-center">
                        <CTableRow>
                          <CTableHeaderCell className="border-0" scope="col">
                            <CFormSelect
                              size="lg"
                              aria-label="Large select example"
                              className="mr-3 search-bar__select text-center w-100"
                              onChange={(e) => {
                                setTypePoint(e.target.value)
                              }}
                            >
                              <option value={1}>하트1포인트​</option>
                              <option value={2}>하트2포인트​</option>
                              <option value={3}>스타포인트​</option>
                              <option value={4}>팬픽포인트</option>
                            </CFormSelect>
                          </CTableHeaderCell>
                          <CTableHeaderCell className="border-1" scope="col">
                            <span>보상수​</span>
                          </CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow>
                          <CTableDataCell className="text-break border-0 d-flex align-items-center justify-content-center" />
                          <CTableDataCell className="text-break border-1">
                            <div className="d-flex flex-row align-items-center justify-content-center">
                              <CFormInput
                                className="text-center"
                                type="number"
                                onKeyPress={(e) => {
                                  let ch = String.fromCharCode(e.which)
                                  if (!/[0-9]/.test(ch)) {
                                    e.preventDefault()
                                  }
                                }}
                                defaultValue={isReward}
                                onChange={(e) => {
                                  setReward(e.target.value)
                                }}
                              />
                            </div>
                          </CTableDataCell>
                          <CTableDataCell className="text-break border-0">
                            <div className="d-flex flex-row align-items-center justify-content-center">
                              <span>p</span>
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                  </CCol>
                </CCol>
                <CCol className="d-flex flex-column my-4">
                  <span>게시기간</span>
                  <CCol sm={12}>
                    <CCol sm={10} className="d-flex flex-row justify-content-between mt-4">
                      <span style={{ width: '150px' }}>시작일​</span>
                      <CFormInput
                        type="date"
                        defaultValue={isStartYear}
                        onChange={(e) => {
                          setStartYear(e.target.value)
                        }}
                        placeholder="YYYY-MM-DD​​"
                        className="mx-2"
                      />
                      <CFormInput
                        type="time"
                        defaultValue={isStartHour}
                        onChange={(e) => {
                          setStartHour(e.target.value)
                        }}
                        placeholder="HH:MM:SS​"
                      />
                    </CCol>
                    <CCol sm={10} className="d-flex flex-row justify-content-between mt-2">
                      <span style={{ width: '150px' }}>종료일​</span>
                      <CFormInput
                        className="mx-2"
                        type="date"
                        defaultValue={isEndYear}
                        onChange={(e) => {
                          setEndYear(e.target.value)
                        }}
                        onKeyPress={(e) => {
                          let ch = String.fromCharCode(e.which)
                          if (!/[0-9]/.test(ch)) {
                            e.preventDefault()
                          }
                        }}
                        placeholder="YYYY-MM-DD​"
                      />
                      <CFormInput
                        type="time"
                        defaultValue={isEndHour}
                        onChange={(e) => {
                          setEndHour(e.target.value)
                        }}
                        placeholder="HH:MM:SS​"
                      />
                    </CCol>
                  </CCol>
                </CCol>
              </CCol>
              {/*Second col*/}
              <CCol className="d-flex flex-column my-4">
                <CCol>
                  <div className="mb-2">월간 퀘스트 정책</div>
                  <div className="d-flex flex-column justify-content-between">
                    <div className="d-flex flex-row mt-2">
                      <span style={{ width: '100px' }}>한국어​</span>
                      <CFormTextarea
                        defaultValue={isRuleQuest.ko}
                        onChange={(e) => {
                          setRuleQuest({ ...isRuleQuest, ko: e.target.value })
                        }}
                        placeholder="내용을 입력하세요​"
                      />
                    </div>
                    <div className="d-flex flex-row mt-2">
                      <span style={{ width: '100px' }}>영어​</span>
                      <CFormTextarea
                        defaultValue={isRuleQuest.en}
                        onChange={(e) => {
                          setRuleQuest({ ...isRuleQuest, en: e.target.value })
                        }}
                        placeholder="내용을 입력하세요"
                      />
                    </div>
                    <div className="d-flex flex-row mt-2">
                      <span style={{ width: '100px' }}>중국어​</span>
                      <CFormTextarea
                        defaultValue={isRuleQuest.ch}
                        onChange={(e) => {
                          setRuleQuest({ ...isRuleQuest, ch: e.target.value })
                        }}
                        placeholder="내용을 입력하세요"
                      />
                    </div>
                    <div className="d-flex flex-row mt-2">
                      <span style={{ width: '100px' }}>일본어​</span>
                      <CFormTextarea
                        defaultValue={isRuleQuest.jp}
                        onChange={(e) => {
                          setRuleQuest({ ...isRuleQuest, jp: e.target.value })
                        }}
                        placeholder="내용을 입력하세요"
                      />
                    </div>
                    <div className="d-flex flex-row mt-2">
                      <span style={{ width: '100px' }}>스페인어​</span>
                      <CFormTextarea
                        defaultValue={isRuleQuest.es}
                        onChange={(e) => {
                          setRuleQuest({ ...isRuleQuest, es: e.target.value })
                        }}
                        placeholder="내용을 입력하세요"
                      />
                    </div>
                  </div>
                </CCol>
                <CCol className="mt-4">
                  <span>월간 퀘스트 상태​</span>
                  <CFormSelect
                    size="lg"
                    aria-label="Large select example"
                    className="mt-3 search-bar__select text-center"
                    style={{ width: '140px' }}
                    value={isStatus}
                    onChange={(e) => {
                      setStatus(e.target.value)
                    }}
                  >
                    <option value={1}>진행중</option>
                    <option value={0}>비활성​</option>
                    <option value={-1}>삭제​</option>
                  </CFormSelect>
                </CCol>
              </CCol>
            </CCol>
            {/*5*/}
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="form-footer">
        <CButton
          color="info"
          onClick={() => setIsCreate(true)}
          style={{ color: 'white' }}
          className="form-footer__btn px-5"
        >
          저장​
        </CButton>
        <CButton
          onClick={() => onClickClose()}
          color="light"
          style={{ color: 'black' }}
          className="form-footer__btn"
        >
          닫기​
        </CButton>
      </CModalFooter>
      {isCreate && (
        <CheckPopup
          onClickClose={() => setIsCreate(false)}
          bodyContent={'퀘스트를 등록하시겠습니까?'}
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

CreateMissionMonth.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onCloseOkEvent: PropTypes.func,
}
