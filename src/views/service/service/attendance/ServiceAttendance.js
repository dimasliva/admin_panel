import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import { CheckPopup } from '../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../components/publicPopup/NormalPopup'
import moment from 'moment'
const ServiceAttendance = () => {
  const one = 1
  const [role, setRole] = useState('')
  const [activeKey, setActiveKey] = useState(1)
  const [isModal, setIsModal] = useState(false) // delete check Modal
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isVersion, setVersion] = useState({
    service_id: '',
    sign: '',
    version: '',
    setting: {
      awards: [
        {
          item: '',
          chance: '',
          type_point: '',
          award_point: '',
        },
      ],
      policy: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
      status: '',
      max_use_day: '',
    },
    action: {
      manager_id: '',
      login: '',
      last_name: '',
      first_name: '',
    },
  })
  const [isSetting, setSetting] = useState({
    awards: [
      {
        val: '',
        maxday: '',
        minday: '',
      },
      {
        val: '',
        maxday: '',
        minday: '',
      },
      {
        val: '',
        maxday: '',
        minday: '',
      },
      {
        val: '',
        maxday: '',
        minday: '',
      },
      {
        val: '',
        maxday: '',
        minday: '',
      },
    ],
    policy: {
      ch: '',
      en: '',
      es: '',
      jp: '',
      ko: '',
    },
    status: '',
    reset_visit_reward: '',
    reset_attendance_quest: '',
  })
  const [policy, setPolicy] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [partOne, setPartOne] = useState([
    {
      val: '',
      maxday: '',
      minday: '',
    },
  ])
  useEffect(() => {
    getList()
  }, [])
  const getList = async () => {
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
    const res = await axios
      .get(`/api/setting/attendance`, headerConfig)
      .catch((err) => statusCatch(err))
    setSetting(res.data.value.setting)
    setPartOne(res.data.value.setting.awards[0])
    setVersion(res.data.value)
    setPolicy(res.data.value.setting.policy)
  }
  const create = async () => {
    let isValidate = true
    Object.values(policy).some((value) => {
      if (!value) {
        isValidate = false
        alert('모든 항목을 입력해주세요')
        return true
      }
    })

    isSetting.awards.some((award) => {
      Object.values(award).some((value) => {
        if (!value) {
          isValidate = false
          alert('모든 항목을 입력해주세요')
          return true
        }
      })
      if (!isValidate) return true
    })

    if (!isValidate) return false

    const data = {
      setting: {
        reset_attendance_quest: isSetting.reset_attendance_quest,
        reset_visit_reward: isSetting.reset_visit_reward,
        policy: {
          ch: policy.ch,
          en: policy.en,
          es: policy.es,
          jp: policy.jp,
          ko: policy.ko,
        },
        awards: [
          {
            minday: isSetting.awards[0].minday,
            maxday: isSetting.awards[0].maxday,
            val: isSetting.awards[0].val,
          },
          {
            minday: isSetting.awards[1].minday,
            maxday: isSetting.awards[1].maxday,
            val: isSetting.awards[1].val,
          },
          {
            minday: isSetting.awards[2].minday,
            maxday: isSetting.awards[2].maxday,
            val: isSetting.awards[2].val,
          },
          {
            minday: isSetting.awards[3].minday,
            maxday: isSetting.awards[3].maxday,
            val: isSetting.awards[3].val,
          },
          {
            minday: isSetting.awards[4].minday,
            maxday: isSetting.awards[4].maxday,
            val: isSetting.awards[4].val,
          },
        ],
        status: isSetting.status,
      },
    }

    const res = await axios
      .post(`/api/setting/attendance`, data, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) {
      alert('등록에 실패했습니다.')
    } else {
      setIsOkCheck(true)
    }
  }
  const modalOkEvent = (value) => {
    if (value) {
      setIsModal(false)
      create()
    } else {
      setIsModal(false)
    }
  }

  const closeModalEvent = () => {
    getList()
    setIsOkCheck(false)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CNav variant="tabs" className="mt-2 nav-custom">
            <CNavItem>
              <CNavLink
                className="cursor custom-tab-color-main"
                active={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                출석퀘스트​
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CRow className="g-3">
              <CCol sm={12}>
                <div>
                  <span>version.{isVersion.version}</span>
                  <div>
                    <span>{moment(isVersion.updated_at).format('YYYY-MM-DD HH:mm:ss')}에 </span>
                    <span style={{ color: 'blue' }}>
                      {isVersion.action.first_name} {isVersion.action.last_name}
                    </span>
                    <span>이 마지막 정책 수정</span>
                  </div>
                </div>
              </CCol>
            </CRow>
            <CRow className="g-3 mt-4">
              <CCol sm={5}>
                {/*Input1*/}
                <div className="mt-2 d-flex flex-column">
                  <div className="mb-2">출석퀘스트 리셋 (매달 지정일 출석판 리셋)​​</div>
                  <CInputGroup
                    style={{ width: '300px' }}
                    className="d-flex flex-row align-items-center"
                  >
                    <CFormInput
                      onChange={(e) => {
                        setSetting({
                          ...isSetting,
                          reset_attendance_quest: e.target.value,
                        })
                      }}
                      type="number"
                      onKeyPress={(e) => {
                        let ch = String.fromCharCode(e.which)
                        if (!/[0-9]/.test(ch)) {
                          e.preventDefault()
                        }
                      }}
                      className="text-end"
                      defaultValue={isSetting.reset_attendance_quest}
                    />
                    <span className="ms-2">일</span>
                  </CInputGroup>
                </div>
                {/*Input2*/}
                <div className="mt-4 d-flex flex-column">
                  <div className="my-2">출석퀘스트 보상 리셋 (매달 지정일 보상 리셋)​</div>
                  <CInputGroup
                    style={{ width: '300px' }}
                    className="d-flex flex-row align-items-center"
                  >
                    <CFormInput
                      onChange={(e) => {
                        setSetting({
                          ...isSetting,
                          reset_visit_reward: e.target.value,
                        })
                      }}
                      type="number"
                      onKeyPress={(e) => {
                        let ch = String.fromCharCode(e.which)
                        if (!/[0-9]/.test(ch)) {
                          e.preventDefault()
                        }
                      }}
                      className="text-end"
                      defaultValue={isSetting.reset_visit_reward}
                    />
                    <span className="ms-2">일​</span>
                  </CInputGroup>
                </div>
                {/*Input3*/}
                <CCol sm={12} className="mt-4 d-flex flex-column align-items-start">
                  <div className="mb-4">출석 파트별 보상​​</div>
                  <div className="d-flex flex-row">
                    <CCol sm={9} className="d-flex flex-column align-items-center">
                      <div className="mb-2">구분​​</div>
                      <div className="d-flex mb-2 w-100">
                        <CFormSelect style={{ marginRight: '10px' }}>
                          <option>포인트종류</option>
                          <option>하트1포인트</option>
                          <option>하트2포인트</option>
                          <option>스타포인트</option>
                          <option>팬픽포인트</option>
                        </CFormSelect>
                        <CFormInput
                          placeholder={
                            'PART 1 (' +
                            isSetting.awards[0].minday +
                            '~' +
                            isSetting.awards[0].maxday +
                            ')'
                          }
                          className="text-center"
                          disabled
                        />
                      </div>
                      <div className="d-flex mb-2 w-100">
                        <CFormSelect style={{ marginRight: '10px' }}>
                          <option>포인트종류</option>
                          <option>하트1포인트</option>
                          <option>하트2포인트</option>
                          <option>스타포인트</option>
                          <option>팬픽포인트</option>
                        </CFormSelect>
                        <CFormInput
                          placeholder={
                            'PART 1 (' +
                            isSetting.awards[1].minday +
                            '~' +
                            isSetting.awards[1].maxday +
                            ')'
                          }
                          className="text-center"
                          disabled
                        />
                      </div>
                      <div className="d-flex mb-2 w-100">
                        <CFormSelect style={{ marginRight: '10px' }}>
                          <option>포인트종류</option>
                          <option>하트1포인트</option>
                          <option>하트2포인트</option>
                          <option>스타포인트</option>
                          <option>팬픽포인트</option>
                        </CFormSelect>
                        <CFormInput
                          placeholder={
                            'PART 1 (' +
                            isSetting.awards[2].minday +
                            '~' +
                            isSetting.awards[2].maxday +
                            ')'
                          }
                          className="text-center"
                          disabled
                        />
                      </div>
                      <div className="d-flex mb-2 w-100">
                        <CFormSelect style={{ marginRight: '10px' }}>
                          <option>포인트종류</option>
                          <option>하트1포인트</option>
                          <option>하트2포인트</option>
                          <option>스타포인트</option>
                          <option>팬픽포인트</option>
                        </CFormSelect>
                        <CFormInput
                          placeholder={
                            'PART 1 (' +
                            isSetting.awards[3].minday +
                            '~' +
                            isSetting.awards[3].maxday +
                            ')'
                          }
                          className="text-center"
                          disabled
                        />
                      </div>
                      <div className="d-flex mb-2 w-100">
                        <CFormSelect style={{ marginRight: '10px' }}>
                          <option>포인트종류</option>
                          <option>하트1포인트</option>
                          <option>하트2포인트</option>
                          <option>스타포인트</option>
                          <option>팬픽포인트</option>
                        </CFormSelect>
                        <CFormInput
                          placeholder={
                            'PART 1 (' +
                            isSetting.awards[4].minday +
                            '~' +
                            isSetting.awards[4].maxday +
                            ')'
                          }
                          className="text-center"
                          disabled
                        />
                      </div>
                    </CCol>
                    <CCol sm={1} />
                    <CCol sm={4} className="d-flex flex-column align-items-center ms-2">
                      <div className="mb-2">보상수​</div>
                      {isSetting.awards.map((value, index) => {
                        return (
                          <div key={index} className="d-flex flex-row align-items-center mb-2">
                            <CFormInput
                              onChange={(e) => {
                                value.val = parseInt(
                                  e.target.value.replace(/[^0-9]/g, '').replace(/^(\d)?/g, '$1'),
                                  // .substr(0, 2),
                                )
                                console.log(value.val)
                              }}
                              type="number"
                              onKeyPress={(e) => {
                                let ch = String.fromCharCode(e.which)
                                if (!/[0-9]/.test(ch)) {
                                  e.preventDefault()
                                }
                              }}
                              defaultValue={value.val}
                              placeholder={value.minday + '-' + value.maxday}
                              className="text-center"
                            />
                            <span className="ms-2">P</span>
                          </div>
                        )
                      })}
                    </CCol>
                  </div>
                </CCol>
              </CCol>
              <CCol sm={2} />
              <CCol sm={5} className="d-flex flex-column">
                <CCol>
                  <div>출석 퀘스트 정책​</div>
                  <div className="d-flex flex-column justify-content-between">
                    <div className="d-flex flex-row mt-2">
                      <span style={{ width: '100px' }}>한국어​</span>
                      <CFormTextarea
                        defaultValue={policy.ko}
                        onChange={(e) => {
                          setPolicy({ ...policy, ko: e.target.value })
                        }}
                        placeholder="내용을 입력하세요"
                      />
                    </div>
                    <div className="d-flex flex-row mt-2">
                      <span style={{ width: '100px' }}>영어​</span>
                      <CFormTextarea
                        defaultValue={policy.en}
                        onChange={(e) => {
                          setPolicy({ ...policy, en: e.target.value })
                        }}
                        placeholder="내용을 입력하세요"
                      />
                    </div>
                    <div className="d-flex flex-row mt-2">
                      <span style={{ width: '100px' }}>중국어​</span>
                      <CFormTextarea
                        defaultValue={policy.ch}
                        onChange={(e) => {
                          setPolicy({ ...policy, ch: e.target.value })
                        }}
                        placeholder="내용을 입력하세요"
                      />
                    </div>
                    <div className="d-flex flex-row mt-2">
                      <span style={{ width: '100px' }}>일본어​</span>
                      <CFormTextarea
                        defaultValue={policy.jp}
                        onChange={(e) => {
                          setPolicy({ ...policy, jp: e.target.value })
                        }}
                        placeholder="내용을 입력하세요"
                      />
                    </div>
                    <div className="d-flex flex-row mt-2">
                      <span style={{ width: '100px' }}>스페인어​</span>
                      <CFormTextarea
                        defaultValue={policy.es}
                        onChange={(e) => {
                          setPolicy({ ...policy, es: e.target.value })
                        }}
                        placeholder="내용을 입력하세요"
                      />
                    </div>
                  </div>
                </CCol>
                <CCol className="mt-4">
                  <div className="mb-2">출석 퀘스트 상태</div>
                  <CCol sm={4}>
                    <CFormSelect
                      size="lg"
                      aria-label="Large select example"
                      className="search-bar__select"
                      style={{ width: '130px' }}
                      value={isSetting.status}
                      onChange={(e) => {
                        setSetting({ ...isSetting, status: e.target.value })
                      }}
                    >
                      <option value={1}>활성​</option>
                      <option value={-1}>비활성​</option>
                    </CFormSelect>
                  </CCol>
                </CCol>
              </CCol>
            </CRow>
            {role !== 1 && (
              <CCol className="me-4">
                <CButton
                  onClick={() => setIsModal(true)}
                  color="info"
                  style={{ color: 'white' }}
                  className="button-group__btn float-end px-5"
                >
                  저장​
                </CButton>
              </CCol>
            )}
          </CCardBody>
        </CCard>
      </CCol>
      {isModal && (
        <CheckPopup
          onClickClose={() => setIsModal(false)}
          bodyContent={'출석퀘스트 내용을 수정하시겠습니까?'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'수정이 완료 되었습니다.'}
        />
      )}
    </CRow>
  )
}
ServiceAttendance.propTypes = {
  history: PropTypes.object,
}
export default ServiceAttendance
