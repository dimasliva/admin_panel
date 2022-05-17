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
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTabPane,
} from '@coreui/react'
import { ConfirmEditFreeBox } from './popup/ConfirmEditFreeBox'
import { ConfirmEditPaidBox } from './popup/ConfirmEditPaidBox'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import moment from 'moment'

const ServiceBoxFree = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [isConfirmEditFreeBox, setIsConfirmEditFreeBox] = useState(false) // Detail Popup
  const [isConfirmEditPaidBox, setIsConfirmEditPaidBox] = useState(false) // Detail Popup
  const tableBox = [
    { label: '구분​' },
    { label: '포인트종류' },
    { label: '보상수​​' },
    { label: '확률​ (100% 기준)​ ​' },
  ]
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
      free_point: '',
      max_use_day: '',
    },
    created_at: '',
    updated_at: '',
    action: {
      manager_id: '',
      login: '',
      last_name: '',
      first_name: '',
    },
  })
  const [isVersionPaid, setVersionPaid] = useState({
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
  })
  const [policy, setPolicy] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [policyPaid, setPolicyPaid] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [isSettingPaid, setSettingPaid] = useState({
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
    free_point: '',
  })

  // 총 확률 퍼센트 ( percentage of total probability )
  const [totalChance, setTotalChance] = useState(0)
  const [totalChanceTab2, setTotalChanceTab2] = useState(0)
  const one = 1
  const [role, setRole] = useState('')
  useEffect(() => {
    if (activeKey === 1) {
      getList()
    } else if (activeKey === 2) {
      getListPaid()
    }
  }, [activeKey])
  //Free
  const getList = async () => {
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
    const res = await axios
      .get(`/api/setting/boxfree`, headerConfig)
      .catch((err) => statusCatch(err))

    totalCnt(res.data.value.setting.awards)

    setSetting(res.data.value.setting)
    setVersion(res.data.value)
    setPolicy(res.data.value.setting.policy)
  }
  const create = async () => {
    const data = {
      setting: {
        max_use_day: isSetting.max_use_day,
        policy: {
          ch: policy.ch,
          en: policy.en,
          es: policy.es,
          jp: policy.jp,
          ko: policy.ko,
        },
        awards: [
          {
            item: 'part1',
            type_point: isSetting.awards[0].type_point,
            award_point: isSetting.awards[0].award_point,
            chance: isSetting.awards[0].chance,
          },
          {
            item: 'part2',
            type_point: isSetting.awards[1].type_point,
            award_point: isSetting.awards[1].award_point,
            chance: isSetting.awards[1].chance,
          },
          {
            item: 'part3',
            type_point: isSetting.awards[2].type_point,
            award_point: isSetting.awards[2].award_point,
            chance: isSetting.awards[2].chance,
          },
          {
            item: 'part4',
            type_point: isSetting.awards[3].type_point,
            award_point: isSetting.awards[3].award_point,
            chance: isSetting.awards[3].chance,
          },
          {
            item: 'part5',
            type_point: isSetting.awards[4].type_point,
            award_point: isSetting.awards[4].award_point,
            chance: isSetting.awards[4].chance,
          },
          {
            item: 'part6',
            type_point: isSetting.awards[5].type_point,
            award_point: isSetting.awards[5].award_point,
            chance: isSetting.awards[5].chance,
          },
          {
            item: 'part7',
            type_point: isSetting.awards[6].type_point,
            award_point: isSetting.awards[6].award_point,
            chance: isSetting.awards[6].chance,
          },
          {
            item: 'part8',
            type_point: isSetting.awards[7].type_point,
            award_point: isSetting.awards[7].award_point,
            chance: isSetting.awards[7].chance,
          },
          {
            item: 'part9',
            type_point: isSetting.awards[8].type_point,
            award_point: isSetting.awards[8].award_point,
            chance: isSetting.awards[8].chance,
          },
          {
            item: 'part10',
            type_point: isSetting.awards[9].type_point,
            award_point: isSetting.awards[9].award_point,
            chance: isSetting.awards[9].chance,
          },
        ],
        status: isSetting.status,
      },
    }
    const res = await axios
      .post(`/api/setting/boxfree`, data, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) {
      alert('등록에 실패했습니다.')
    }
  }
  //Paid
  const getListPaid = async () => {
    const res = await axios
      .get(`/api/setting/boxcharge`, headerConfig)
      .catch((err) => statusCatch(err))

    totalCnt(res.data.value.setting.awards)

    setSettingPaid(res.data.value.setting)
    setVersionPaid(res.data.value)
    setPolicyPaid(res.data.value.setting.policy)
  }
  const createPaid = async () => {
    const data = {
      setting: {
        max_use_day: isSettingPaid.max_use_day,
        free_point: isSettingPaid.free_point,
        policy: {
          ch: policyPaid.ch,
          en: policyPaid.en,
          es: policyPaid.es,
          jp: policyPaid.jp,
          ko: policyPaid.ko,
        },
        awards: [
          {
            item: 'part1',
            type_point: isSettingPaid.awards[0].type_point,
            award_point: isSettingPaid.awards[0].award_point,
            chance: isSettingPaid.awards[0].chance,
          },
          {
            item: 'part2',
            type_point: isSettingPaid.awards[1].type_point,
            award_point: isSettingPaid.awards[1].award_point,
            chance: isSettingPaid.awards[1].chance,
          },
          {
            item: 'part3',
            type_point: isSettingPaid.awards[2].type_point,
            award_point: isSettingPaid.awards[2].award_point,
            chance: isSettingPaid.awards[2].chance,
          },
          {
            item: 'part4',
            type_point: isSettingPaid.awards[3].type_point,
            award_point: isSettingPaid.awards[3].award_point,
            chance: isSettingPaid.awards[3].chance,
          },
          {
            item: 'part5',
            type_point: isSettingPaid.awards[4].type_point,
            award_point: isSettingPaid.awards[4].award_point,
            chance: isSettingPaid.awards[4].chance,
          },
          {
            item: 'part6',
            type_point: isSettingPaid.awards[5].type_point,
            award_point: isSettingPaid.awards[5].award_point,
            chance: isSettingPaid.awards[5].chance,
          },
          {
            item: 'part7',
            type_point: isSettingPaid.awards[6].type_point,
            award_point: isSettingPaid.awards[6].award_point,
            chance: isSettingPaid.awards[6].chance,
          },
          {
            item: 'part8',
            type_point: isSettingPaid.awards[7].type_point,
            award_point: isSettingPaid.awards[7].award_point,
            chance: isSettingPaid.awards[7].chance,
          },
          {
            item: 'part9',
            type_point: isSettingPaid.awards[8].type_point,
            award_point: isSettingPaid.awards[8].award_point,
            chance: isSettingPaid.awards[8].chance,
          },
          {
            item: 'part10',
            type_point: isSettingPaid.awards[9].type_point,
            award_point: isSettingPaid.awards[9].award_point,
            chance: isSettingPaid.awards[9].chance,
          },
        ],
        status: isSettingPaid.status,
      },
    }
    const res = await axios
      .post(`/api/setting/boxcharge`, data, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) {
      alert('등록에 실패했습니다.')
    }
  }
  const onCloseEvent = () => {
    setIsConfirmEditFreeBox(false)
    setIsConfirmEditPaidBox(false)
    if (activeKey === 1) {
      getList({ page: 1 })
    } else {
      getListPaid()
    }
  }

  // 총 계산 ( 임시로 만들어둠. 나중에 최적화 진행 해야함 )
  // Total calculation (temporarily made. I need to optimize it later)
  const totalCnt = (value) => {
    let total = 0
    value.map((cnt) => {
      total += parseFloat(cnt.chance)
    })
    if (activeKey === 1) {
      setTotalChance(total)
    } else {
      setTotalChanceTab2(total)
    }
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
                무료 랜덤박스​
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                className="cursor custom-tab-color-main"
                active={activeKey === 2}
                onClick={() => setActiveKey(2)}
              >
                유료랜덤박스​
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CTabContent>
              <CTabPane role="tabpanel" visible={activeKey === 1}>
                <CCol className="mb-4" sm={12}>
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
                <CRow className="g-3">
                  <CCol sm={6}>
                    <CCol sm={9}>
                      <div className="d-flex flex-column">
                        <span style={{ color: 'red' }}>매일 KST 00:00:00~23:59:59 리셋 자동​</span>
                        <span className="mb-2 mt-3">무료 랜덤박스 이용 횟수 (1일 기준)​​</span>
                        <div className="d-flex flex-row align-items-center">
                          <CFormInput
                            style={{ width: '260px' }}
                            onChange={(e) => {
                              setSetting({ ...isSetting, max_use_day: e.target.value })
                            }}
                            type="number"
                            onKeyPress={(e) => {
                              let ch = String.fromCharCode(e.which)
                              if (!/[0-9]/.test(ch)) {
                                e.preventDefault()
                              }
                            }}
                            defaultValue={isSetting.max_use_day}
                            className="text-end"
                          />
                          <span className="ms-2">회​</span>
                        </div>
                      </div>
                    </CCol>
                    {/*Table*/}
                    <CCol className="mt-4">
                      <div>무료 랜덤박스 확률​</div>
                      <CTable className="mt-3">
                        <CTableHead>
                          <CTableRow>
                            {tableBox.map((title, index) => {
                              return (
                                <CTableHeaderCell
                                  className="text-center border-1"
                                  scope="col"
                                  key={index}
                                >
                                  {title.label}
                                </CTableHeaderCell>
                              )
                            })}
                          </CTableRow>
                        </CTableHead>
                        {/*Table body*/}
                        <CTableBody>
                          {isSetting.awards.map((value) => {
                            return (
                              <CTableRow key={value.item}>
                                <CTableDataCell className="border-1" style={{ width: '5%' }}>
                                  <div className="d-flex flex-row align-items-center justify-content-center">
                                    <span>{value.item.toUpperCase()}</span>
                                  </div>
                                </CTableDataCell>
                                <CTableDataCell className="border-1" style={{ width: '35%' }}>
                                  <div className="d-flex flex-column align-items-center justify-content-center">
                                    <CFormSelect
                                      size="lg"
                                      aria-label="Large select example"
                                      className="mr-3 search-bar__select"
                                      defaultValue={value.type_point}
                                      onChange={(e) => {
                                        value.type_point = e.target.value
                                      }}
                                    >
                                      <option value={1}>하트1포인트​</option>
                                      <option value={2}>하트2포인트​</option>
                                      <option value={3}>스타포인트​</option>
                                      <option value={4}>팬픽포인트​</option>
                                      <option value={5}>경험치​</option>
                                    </CFormSelect>
                                  </div>
                                </CTableDataCell>
                                <CTableDataCell className="border-1" style={{ width: '20%' }}>
                                  <div className="d-flex flex-row align-items-center justify-content-center">
                                    <CFormInput
                                      type="number"
                                      onKeyPress={(e) => {
                                        let ch = String.fromCharCode(e.which)
                                        if (!/[0-9]/.test(ch)) {
                                          e.preventDefault()
                                        }
                                      }}
                                      defaultValue={value.award_point}
                                      onChange={(e) => {
                                        value.award_point = e.target.value
                                      }}
                                    />
                                  </div>
                                </CTableDataCell>
                                <CTableDataCell className="border-1" style={{ width: '20%' }}>
                                  <div className="d-flex flex-row align-items-center justify-content-center">
                                    <CFormInput
                                      type="number"
                                      step="0.01"
                                      onKeyPress={(e) => {
                                        const _pattern1 = /^\d*[.]\d{4}$/
                                        if (_pattern1.test(e.target.value)) {
                                          e.preventDefault()
                                        }
                                      }}
                                      defaultValue={value.chance}
                                      onChange={(e) => {
                                        if (e.target.value === '') {
                                          value.chance = 0
                                        } else {
                                          value.chance = parseFloat(e.target.value)
                                        }
                                        totalCnt(isSetting.awards)
                                      }}
                                    />
                                  </div>
                                </CTableDataCell>
                                <CTableDataCell
                                  className="border-0 text-end"
                                  style={{ width: '1%' }}
                                >
                                  <div className="d-flex flex-row align-items-end justify-content-end py-3">
                                    <span>%</span>
                                  </div>
                                </CTableDataCell>
                              </CTableRow>
                            )
                          })}
                          <CTableRow>
                            <CTableDataCell scope="row" className="border-0 text-break" />
                            <CTableDataCell className="border-0 text-break" />
                            <CTableDataCell className="border-0 text-break" />
                            <CTableDataCell scope="row" className="border-1 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-center">
                                <span className="text-bold ">{totalChance}</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell scope="row" className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-center">
                                <span>%</span>
                              </div>
                            </CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CCol>
                  <CCol sm={1} />
                  {/*Second column*/}
                  <CCol sm={5}>
                    <CCol>
                      <div>무료 랜덤박스정책​</div>
                      <div className="d-flex flex-column justify-content-between">
                        <div className="d-flex flex-row mt-2">
                          <span style={{ width: '100px' }}>한국어​</span>
                          <CFormTextarea
                            onChange={(e) => {
                              setPolicy({ ...policy, ko: e.target.value })
                            }}
                            defaultValue={isSetting.policy.ko}
                            placeholder="내용을 입력하세요"
                          />
                        </div>
                        <div className="d-flex flex-row mt-2">
                          <span style={{ width: '100px' }}>영어​</span>
                          <CFormTextarea
                            onChange={(e) => {
                              setPolicy({ ...policy, en: e.target.value })
                            }}
                            placeholder="내용을 입력하세요"
                            defaultValue={isSetting.policy.en}
                          />
                        </div>
                        <div className="d-flex flex-row mt-2">
                          <span style={{ width: '100px' }}>중국어​</span>
                          <CFormTextarea
                            onChange={(e) => {
                              setPolicy({ ...policy, ch: e.target.value })
                            }}
                            defaultValue={isSetting.policy.ch}
                            placeholder="내용을 입력하세요"
                          />
                        </div>
                        <div className="d-flex flex-row mt-2">
                          <span style={{ width: '100px' }}>일본어​</span>
                          <CFormTextarea
                            onChange={(e) => {
                              setPolicy({ ...policy, jp: e.target.value })
                            }}
                            defaultValue={isSetting.policy.jp}
                            placeholder="내용을 입력하세요"
                          />
                        </div>
                        <div className="d-flex flex-row mt-2">
                          <span style={{ width: '100px' }}>스페인어​</span>
                          <CFormTextarea
                            onChange={(e) => {
                              setPolicy({ ...policy, es: e.target.value })
                            }}
                            defaultValue={isSetting.policy.es}
                            placeholder="내용을 입력하세요"
                          />
                        </div>
                      </div>
                    </CCol>
                    <CCol className="mt-4">
                      <div>출석 퀘스트 상태</div>
                      <CFormSelect
                        size="lg"
                        aria-label="Large select example"
                        className="search-bar__select mt-2"
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
                    {role !== one && (
                      <CCol className="mt-4">
                        <CButton
                          onClick={() => {
                            setIsConfirmEditFreeBox(true)
                          }}
                          color="info"
                          style={{ color: 'white' }}
                          className="button-group__btn float-end px-5"
                        >
                          저장​
                        </CButton>
                      </CCol>
                    )}
                  </CCol>
                </CRow>
              </CTabPane>
              {/*Box charge*/}
              <CTabPane role="tabpanel" visible={activeKey === 2}>
                <CCol className="mb-4">
                  <div>
                    <span>version.{isVersionPaid.version}</span>
                    <div>
                      <span>
                        {moment(isVersionPaid.updated_at).format('YYYY-MM-DD HH:mm:ss')}에{' '}
                      </span>
                      <span style={{ color: 'blue' }}>
                        {isVersionPaid.action.first_name} {isVersionPaid.action.last_name}
                      </span>
                      <span>이 마지막 정책 수정</span>
                    </div>
                  </div>
                </CCol>
                <CRow className="g-3">
                  <CCol sm={6}>
                    <CCol sm={8}>
                      <div className="d-flex flex-column">
                        <div className="d-flex flex-column">
                          <span style={{ color: 'red' }}>
                            매일 KST 00:00:00~23:59:59 리셋 자동​
                          </span>
                          <span className="d-flex flex-column mb-2">
                            무료 랜덤박스 이용 횟수 (1일 기준)​​
                          </span>
                          <div className="d-flex flex-row align-items-center">
                            <CFormInput
                              style={{ width: '300px' }}
                              onChange={(e) => {
                                setSettingPaid({ ...isSettingPaid, max_use_day: e.target.value })
                              }}
                              defaultValue={isSettingPaid.max_use_day}
                              type="number"
                              onKeyPress={(e) => {
                                let ch = String.fromCharCode(e.which)
                                if (!/[0-9]/.test(ch)) {
                                  e.preventDefault()
                                }
                              }}
                              className="text-end"
                            />
                            <span className="ms-2">회​</span>
                          </div>
                        </div>
                        <div className="d-flex flex-column mt-4">
                          <span className="d-flex flex-column mb-2">
                            유료 랜덤박스 이용 포인트 (스타포인트)​​
                          </span>
                          <div className="d-flex flex-row align-items-center">
                            <CFormInput
                              style={{ width: '300px' }}
                              onChange={(e) => {
                                setSettingPaid({ ...isSettingPaid, free_point: e.target.value })
                              }}
                              defaultValue={isSettingPaid.free_point}
                              type="number"
                              onKeyPress={(e) => {
                                let ch = String.fromCharCode(e.which)
                                if (!/[0-9]/.test(ch)) {
                                  e.preventDefault()
                                }
                              }}
                              className="text-end"
                            />
                            <span className="ms-2">p​</span>
                          </div>
                        </div>
                      </div>
                    </CCol>
                    {/*Table*/}
                    <CCol className="mt-4">
                      <div>유료 랜덤박스 확률​</div>
                      <CTable className="mt-3">
                        <CTableHead>
                          <CTableRow>
                            {tableBox.map((title, index) => {
                              return (
                                <CTableHeaderCell
                                  className="text-center border-1"
                                  scope="col"
                                  key={index}
                                >
                                  {title.label}
                                </CTableHeaderCell>
                              )
                            })}
                          </CTableRow>
                        </CTableHead>
                        {/*Table body*/}
                        <CTableBody>
                          {isSettingPaid.awards.map((value) => {
                            return (
                              <CTableRow key={value.item}>
                                <CTableDataCell scope="row" className="border-1">
                                  <div className="d-flex flex-row align-items-center justify-content-center">
                                    <span>{value.item.toUpperCase()}</span>
                                  </div>
                                </CTableDataCell>
                                <CTableDataCell className="text-break">
                                  <div className="d-flex flex-column align-items-center justify-content-center">
                                    <CFormSelect
                                      size="lg"
                                      aria-label="Large select example"
                                      className="search-bar__select"
                                      defaultValue={value.type_point}
                                      onChange={(e) => {
                                        value.type_point = parseInt(e.target.value)
                                      }}
                                    >
                                      <option value={1}>하트1포인트​</option>
                                      <option value={2}>하트2포인트​</option>
                                      <option value={3}>스타포인트​</option>
                                      <option value={4}>팬픽포인트​</option>
                                      <option value={5}>경험치​</option>
                                    </CFormSelect>
                                  </div>
                                </CTableDataCell>
                                <CTableDataCell className="border-1 text-break">
                                  <div className="d-flex flex-row align-items-center justify-content-center">
                                    <CFormInput
                                      defaultValue={value.award_point}
                                      onChange={(e) => {
                                        value.award_point = parseInt(e.target.value)
                                      }}
                                    />
                                  </div>
                                </CTableDataCell>
                                <CTableDataCell scope="row" className="border-1 text-break">
                                  <div className="d-flex flex-row align-items-center justify-content-center">
                                    <CFormInput
                                      type="number"
                                      step="0.01"
                                      onKeyPress={(e) => {
                                        const _pattern1 = /^\d*[.]\d{4}$/
                                        if (_pattern1.test(e.target.value)) {
                                          e.preventDefault()
                                        }
                                      }}
                                      defaultValue={value.chance}
                                      onChange={(e) => {
                                        if (e.target.value === '') {
                                          value.chance = 0
                                        } else {
                                          value.chance = parseFloat(e.target.value)
                                        }
                                        totalCnt(isSettingPaid.awards)
                                      }}
                                    />
                                  </div>
                                </CTableDataCell>
                                <CTableDataCell scope="row" className="border-0 text-break">
                                  <div className="d-flex flex-row align-items-center justify-content-center">
                                    <span>%</span>
                                  </div>
                                </CTableDataCell>
                              </CTableRow>
                            )
                          })}
                          <CTableRow>
                            <CTableDataCell scope="row" className="border-0 text-break" />
                            <CTableDataCell className="border-0 text-break" />
                            <CTableDataCell className="border-0 text-break" />
                            <CTableDataCell scope="row" className="border-1 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-center">
                                <span className="text-bold">{totalChanceTab2}</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell scope="row" className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-center">
                                <span>%</span>
                              </div>
                            </CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CCol>
                  {/*Second column*/}
                  <CCol sm={1} />
                  <CCol sm={5}>
                    <CCol>
                      <div>유료 랜덤박스정책​</div>
                      <div className="d-flex flex-column justify-content-between">
                        <div className="d-flex flex-row mt-2">
                          <span style={{ width: '100px' }}>한국어​</span>
                          <CFormTextarea
                            onChange={(e) => {
                              setPolicyPaid({ ...policyPaid, ko: e.target.value })
                            }}
                            defaultValue={policyPaid.ko}
                            placeholder="내용을 입력하세요"
                          />
                        </div>
                        <div className="d-flex flex-row mt-2">
                          <span style={{ width: '100px' }}>영어​</span>
                          <CFormTextarea
                            onChange={(e) => {
                              setPolicyPaid({ ...policyPaid, en: e.target.value })
                            }}
                            placeholder="내용을 입력하세요"
                            defaultValue={policyPaid.en}
                          />
                        </div>
                        <div className="d-flex flex-row mt-2">
                          <span style={{ width: '100px' }}>중국어​</span>
                          <CFormTextarea
                            onChange={(e) => {
                              setPolicyPaid({ ...policyPaid, ch: e.target.value })
                            }}
                            defaultValue={policyPaid.ch}
                            placeholder="내용을 입력하세요"
                          />
                        </div>
                        <div className="d-flex flex-row mt-2">
                          <span style={{ width: '100px' }}>일본어​</span>
                          <CFormTextarea
                            onChange={(e) => {
                              setPolicyPaid({ ...policyPaid, jp: e.target.value })
                            }}
                            defaultValue={policyPaid.jp}
                            placeholder="내용을 입력하세요"
                          />
                        </div>
                        <div className="d-flex flex-row mt-2">
                          <span style={{ width: '100px' }}>스페인어​</span>
                          <CFormTextarea
                            onChange={(e) => {
                              setPolicyPaid({ ...policyPaid, es: e.target.value })
                            }}
                            defaultValue={policyPaid.es}
                            placeholder="내용을 입력하세요"
                          />
                        </div>
                      </div>
                    </CCol>
                    <CCol className="mt-4">
                      <div>출석 퀘스트 상태</div>
                      <CCol>
                        <CFormSelect
                          size="lg"
                          aria-label="Large select example"
                          className="search-bar__select mt-2"
                          style={{ width: '130px' }}
                          value={isSettingPaid.status}
                          onChange={(e) => {
                            setSettingPaid({ ...isSettingPaid, status: e.target.value })
                          }}
                        >
                          <option value={1}>활성​</option>
                          <option value={-1}>비활성​</option>
                        </CFormSelect>
                      </CCol>
                    </CCol>
                    {role !== one && (
                      <CCol className="mt-4">
                        <CButton
                          onClick={() => {
                            setIsConfirmEditPaidBox(true)
                          }}
                          color="info"
                          style={{ color: 'white' }}
                          className="button-group__btn float-end px-5"
                        >
                          저장​
                        </CButton>
                      </CCol>
                    )}
                  </CCol>
                </CRow>
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
      {isConfirmEditFreeBox && (
        <ConfirmEditFreeBox
          onClickClose={() => setIsConfirmEditFreeBox(false)}
          onCloseOkEvent={() => onCloseEvent()}
          create={() => create()}
          onTotal={totalChance}
        />
      )}
      {isConfirmEditPaidBox && (
        <ConfirmEditPaidBox
          onClickClose={() => setIsConfirmEditPaidBox(false)}
          onCloseOkEvent={() => onCloseEvent()}
          create={() => createPaid()}
          onTotal={totalChanceTab2}
        />
      )}
    </CRow>
  )
}
ServiceBoxFree.propTypes = {
  history: PropTypes.object,
}

export default ServiceBoxFree
