import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalBody,
  CCol,
  CRow,
  CModalFooter,
  CButton,
  CFormSelect,
  CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormCheck,
} from '@coreui/react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { headerConfig } from '../../../../../static/axiosConfig'
import { statusCatch } from '../../../../../static/axiosCatch'
import moment from 'moment'
import { CheckPopup } from '../../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../../components/publicPopup/NormalPopup'

export const MissionDetail = ({ onClickClose, onCloseOkEvent, onId }) => {
  const tableDetail = [{ label: '선택​' }, { label: '미션내용​' }, { label: '횟수(1month)​' }]
  const [isCreate, setIsCreate] = useState(false)
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isRuleQuest, setRuleQuest] = useState({})
  const [isType, setType] = useState()
  const [isTitle, setTitle] = useState('')
  const [isReward, setReward] = useState()
  const [isTypePoint, setTypePoint] = useState()
  const [isStartYear, setStartYear] = useState('')
  const [isStartHour, setStartHour] = useState('')
  const [isEndYear, setEndYear] = useState('')
  const [isEndHour, setEndHour] = useState('')
  const [isStatus, setStatus] = useState(1)
  const [listTab, setListTab] = useState([])
  const [role, setRole] = useState()
  const one = 1
  useEffect(() => {
    getList()
  }, [])
  const getList = async () => {
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
    const res = await axios
      .get(`/api/mission?id=${onId}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    // start Day
    const start = moment(res.data.value.started_at).format('YYYY-MM-DD').split('-')
    const startTime = moment(res.data.value.started_at).format('HH:mm:ss').split(':')
    // end Day
    const end = moment(res.data.value.ended_at).format('YYYY-MM-DD').split('-')
    const endTime = moment(res.data.value.ended_at).format('HH:mm:ss').split(':')
    setType(res.data.value.type)
    setTitle(res.data.value.title)
    setRuleQuest(res.data.value.rule_quest)
    setTypePoint(res.data.value.type_point)
    setReward(res.data.value.award_point)
    setStartYear(start.join('-'))
    setStartHour(startTime.join(':'))
    setEndYear(end.join('-'))
    setEndHour(endTime.join(':'))
    setStatus(res.data.value.status)
    setListTab(res.data.value.items)
    console.log(res.data.value)
  }
  const create = async () => {
    const data = {
      id: onId,
      title: isTitle,
      type: isType,
      rule_quest: isRuleQuest,
      type_point: isTypePoint,
      award_point: isReward,
      status: isStatus,
      started_at: moment(isStartYear + ' ' + isStartHour),
      ended_at: moment(isEndYear + ' ' + isEndHour),
      items: listTab,
    }
    const res = await axios
      .post(`/api/mission`, data, headerConfig)
      .catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
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
    onCloseOkEvent()
  }

  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody className="form-body">
        <CRow className="row">
          <CCol sm={12}>
            {/*1*/}
            <CCol className="d-flex flex-column">
              <h5>{isType === 1 ? '일일 퀘스트' : isType === 2 ? '주간 퀘스트' : '월간 퀘스트'}</h5>
            </CCol>
            {/*2*/}
            <CCol className="d-flex flex-column my-4">
              <div>
                <span>
                  {isType === 1
                    ? '일일 퀘스트 관리'
                    : isType === 2
                    ? '주간 퀘스트 관리'
                    : '월간 퀘스트 관리'}
                </span>
              </div>
              <CCol className="d-flex flex-row align-items-center">
                <CCol sm={11}>
                  <CTable className="mt-3">
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell className="text-center border-1" scope="col">
                          선택​
                        </CTableHeaderCell>
                        <CTableHeaderCell className="text-center border-1" scope="col">
                          미션내용​
                        </CTableHeaderCell>
                        {isType == 1 ? (
                          <>
                            <CTableHeaderCell className="text-center border-1" scope="col">
                              횟수(24h)​
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center border-1" scope="col">
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <span>포인트종류 </span>
                              </div>
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center border-1" scope="col">
                              보상수
                            </CTableHeaderCell>
                          </>
                        ) : isType == 2 ? (
                          <CTableHeaderCell className="text-center border-1" scope="col">
                            횟수(7day)
                          </CTableHeaderCell>
                        ) : (
                          <CTableHeaderCell className="text-center border-1" scope="col">
                            횟수(1month)
                          </CTableHeaderCell>
                        )}
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
                                    disabled={role === 1 ? false : true}
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
                                    disabled={role === 1 ? false : true}
                                    size="sm"
                                    type="number"
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
                              {isType == 1 ? (
                                <>
                                  <CTableDataCell className="text-break border-1">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                      <CFormSelect
                                        size="sm"
                                        aria-label="Large select example"
                                        className="mr-3 search-bar__select text-center w-100"
                                        disabled={role === 1 ? true : false}
                                        onChange={(e) => {
                                          value.type_point = e.target.value
                                        }}
                                      >
                                        <option value={1}>하트1포인트​</option>
                                        <option value={2}>하트2포인트​</option>
                                        <option value={3}>스타포인트​</option>
                                        <option value={4}>팬픽포인트</option>
                                      </CFormSelect>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-break border-1">
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <CFormInput
                                        onChange={(e) => {
                                          value.award_point = e.target.value
                                        }}
                                        size="sm"
                                        type="number"
                                        disabled={role === 1 ? true : false}
                                        onKeyPress={(e) => {
                                          let ch = String.fromCharCode(e.which)
                                          if (!/[0-9]/.test(ch)) {
                                            e.preventDefault()
                                          }
                                        }}
                                        defaultValue={value.award_point}
                                        className="text-end"
                                      />
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell scope="row" className="text-break border-0">
                                    <div className="d-flex flex-row align-items-center justify-content-start">
                                      <span>p</span>
                                    </div>
                                  </CTableDataCell>
                                </>
                              ) : (
                                <CTableDataCell />
                              )}
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
            {/*Two columns*/}
            <CCol className="d-flex flex-row">
              <CCol className="d-flex flex-column my-4">
                <CCol className="d-flex flex-row align-items-center">
                  <CCol sm={10}>
                    <div>
                      {isType === 1
                        ? '일일 퀘스트 미션 전체보상'
                        : isType === 2
                        ? '주간 퀘스트 미션 전체보상'
                        : '월간 퀘스트 미션 전체보상'}
                    </div>
                    <CTable className="mt-3">
                      <CTableBody>
                        <CTableRow>
                          <CTableHeaderCell className="border-0 my-auto" scope="col">
                            <CFormSelect
                              disabled={role === 1 ? false : true}
                              size="lg"
                              aria-label="Large select example"
                              className="mr-3 search-bar__select text-center w-100"
                              value={isTypePoint}
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
                          <CTableDataCell className="text-break border-0">
                            <div className="d-flex flex-row align-items-center justify-content-center">
                              <CFormInput
                                disabled={role === 1 ? false : true}
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
                            <span>p</span>
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
                        disabled={role === 1 ? false : true}
                        className="mx-2"
                        type="date"
                        defaultValue={isStartYear}
                        onChange={(e) => {
                          setStartYear(
                            moment(e.target.value, 'YYYY-MM-DD')
                              .format('YYYY-MM-DD')
                              .replace(/[^0-9]/g, '')
                              .replace(/^(\d{4})-?(\d{2})-?(\d{2})?/g, '$1-$2-$3')
                              .substr(0, e.target.placeholder.length),
                          )
                        }}
                        placeholder="YYYY-MM-DD​"
                      />
                      <CFormInput
                        type="time"
                        disabled={role === 1 ? false : true}
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
                    <CCol sm={10} className="d-flex flex-row justify-content-between mt-2">
                      <span style={{ width: '150px' }}>종료일​</span>
                      <CFormInput
                        disabled={role === 1 ? false : true}
                        className="mx-2"
                        type="date"
                        defaultValue={isEndYear}
                        onChange={(e) => {
                          setEndYear(
                            moment(e.target.value, 'YYYY-MM-DD')
                              .format('YYYY-MM-DD')
                              .replace(/[^0-9]/g, '')
                              .replace(/^(\d{4})-?(\d{2})-?(\d{2})?/g, '$1-$2-$3')
                              .substr(0, e.target.placeholder.length),
                          )
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
                        disabled={role === 1 ? false : true}
                        defaultValue={isEndHour}
                        onChange={(e) => {
                          setEndHour(
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
                </CCol>
              </CCol>
              {/*Second col*/}
              <CCol className="d-flex flex-column my-4">
                <CCol>
                  <div>
                    {isType === 1
                      ? '일일 퀘스트 정책'
                      : isType === 2
                      ? '주간 퀘스트 정책'
                      : '월간 퀘스트 정책'}
                  </div>
                  <div className="d-flex flex-column justify-content-between">
                    <div className="d-flex flex-row mt-2">
                      <span style={{ width: '100px' }}>한국어​</span>
                      <CFormInput
                        onChange={(e) => {
                          setRuleQuest({
                            ...isRuleQuest,
                            ko: e.target.value,
                          })
                        }}
                        defaultValue={isRuleQuest.ko}
                      />
                    </div>
                    <div className="d-flex flex-row mt-2">
                      <span style={{ width: '100px' }}>영어​</span>
                      <CFormInput
                        onChange={(e) => {
                          setRuleQuest({
                            ...isRuleQuest,
                            en: e.target.value,
                          })
                        }}
                        defaultValue={isRuleQuest.en}
                      />
                    </div>
                    <div className="d-flex flex-row mt-2">
                      <span style={{ width: '100px' }}>중국어​</span>
                      <CFormInput
                        onChange={(e) => {
                          setRuleQuest({
                            ...isRuleQuest,
                            ch: e.target.value,
                          })
                        }}
                        defaultValue={isRuleQuest.ch}
                      />
                    </div>
                    <div className="d-flex flex-row mt-2">
                      <span style={{ width: '100px' }}>일본어​</span>
                      <CFormInput
                        onChange={(e) => {
                          setRuleQuest({
                            ...isRuleQuest,
                            jp: e.target.value,
                          })
                        }}
                        defaultValue={isRuleQuest.jp}
                      />
                    </div>
                    <div className="d-flex flex-row mt-2">
                      <span style={{ width: '100px' }}>스페인어​</span>
                      <CFormInput
                        onChange={(e) => {
                          setRuleQuest({
                            ...isRuleQuest,
                            es: e.target.value,
                          })
                        }}
                        defaultValue={isRuleQuest.es}
                      />
                    </div>
                  </div>
                </CCol>
                <CCol className="mt-4" sm={7}>
                  <span>
                    {isType === 1
                      ? '일일 퀘스트 상태'
                      : isType === 2
                      ? '주간 퀘스트 상태'
                      : '월간 퀘스트 상태'}
                  </span>
                  <CFormSelect
                    size="lg"
                    aria-label="Large select example"
                    className="mt-2 search-bar__select text-center"
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
        {role !== one && (
          <CButton
            onClick={() => setIsCreate(true)}
            color="info"
            style={{ color: 'white' }}
            className="form-footer__btn px-5"
          >
            저장​
          </CButton>
        )}
        <CButton
          onClick={() => onClickClose()}
          color="light"
          style={{ color: 'black' }}
          className="form-footer__btn px-3"
        >
          닫기​
        </CButton>
      </CModalFooter>
      {isCreate && (
        <CheckPopup
          onClickClose={() => setIsCreate(false)}
          bodyContent={'퀘스트 내용을 수정하시겠습니까?'}
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

MissionDetail.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.number.isRequired,
  onCloseOkEvent: PropTypes.func,
}
