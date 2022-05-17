import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormCheck,
  CFormInput,
  CFormTextarea,
  CImage,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
  CTabPane,
} from '@coreui/react'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import { CheckPopup } from '../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../components/publicPopup/NormalPopup'
import moment from 'moment'
import coin from './assets/new_coin.png'
import heart from './assets/new_heart.png'
import star from './assets/new_star_m.png'
import fanpick from './assets/fanpick.png'
const PointPolicy = () => {
  // useState
  const [activeKey, setActiveKey] = useState(1)
  const one = 1
  const [role, setRole] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [isOkCheck, setIsOkCheck] = useState(false)
  const [isSetting, setSetting] = useState({
    min_vote_fanfick: '',
    min_member_fanshim: '',
    policy: {
      ch: '',
      en: '',
      es: '',
      jp: '',
      ko: '',
    },
    reset_point_month: {
      1: { 1: 0, 2: 1, 3: 0, 4: 1, 5: 0, 6: 1, 7: 0, 8: 1, 9: 0, 10: 1, 11: 0, 12: 1 },
      2: { 1: 0, 2: 1, 3: 0, 4: 1, 5: 0, 6: 1, 7: 0, 8: 1, 9: 0, 10: 1, 11: 0, 12: 1 },
      3: { 1: 0, 2: 1, 3: 0, 4: 1, 5: 0, 6: 1, 7: 0, 8: 1, 9: 0, 10: 1, 11: 0, 12: 1 },
      4: { 1: 0, 2: 1, 3: 0, 4: 1, 5: 0, 6: 1, 7: 0, 8: 1, 9: 0, 10: 1, 11: 0, 12: 1 },
      5: { 1: 0, 2: 1, 3: 0, 4: 1, 5: 0, 6: 1, 7: 0, 8: 1, 9: 0, 10: 1, 11: 0, 12: 1 },
    },
    gold_point: 0,
  }) // ok Modal
  const [pointVersion, setPointVersion] = useState({
    service_id: '',
    sign: '',
    version: '',
    setting: {
      policy: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
      gold_point: '',
      min_vote_fanfick: '',
      reset_point_month: {},
      min_member_fanshim: '',
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
  const [policy, setPolicy] = useState({
    ko: isSetting.policy.ko,
    en: isSetting.policy.en,
    ch: isSetting.policy.ch,
    jp: isSetting.policy.jp,
    es: isSetting.policy.es,
  })
  const [resetPointMonthOne, setResetPointMonthOne] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
    10: '',
    11: '',
    12: '',
  })
  const [resetPointMonthTwo, setResetPointMonthTwo] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
    10: '',
    11: '',
    12: '',
  })
  const [resetPointMonthThree, setResetPointMonthThree] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
    10: '',
    11: '',
    12: '',
  })
  const [resetPointMonthFour, setResetPointMonthFour] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
    10: '',
    11: '',
    12: '',
  })
  // create
  useEffect(() => {
    getPoint()
  }, [])
  const getPoint = async () => {
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
    const res = await axios
      .get(`/api/setting/pointpolicy`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPointVersion(res.data.value)
    setSetting(res.data.value.setting)
    setResetPointMonthOne(res.data.value.setting.reset_point_month[1])
    setResetPointMonthTwo(res.data.value.setting.reset_point_month[2])
    setResetPointMonthThree(res.data.value.setting.reset_point_month[3])
    setResetPointMonthFour(res.data.value.setting.reset_point_month[4])
  }
  const create = async () => {
    const data = {
      setting: {
        min_vote_fanfick: isSetting.min_vote_fanfick,
        min_member_fanshim: isSetting.min_member_fanshim,
        policy: {
          ch: policy.ch,
          en: policy.en,
          es: policy.es,
          jp: policy.jp,
          ko: policy.ko,
        },
        reset_point_month: {
          1: {
            1: resetPointMonthOne[1],
            2: resetPointMonthOne[2],
            3: resetPointMonthOne[3],
            4: resetPointMonthOne[4],
            5: resetPointMonthOne[5],
            6: resetPointMonthOne[6],
            7: resetPointMonthOne[7],
            8: resetPointMonthOne[8],
            9: resetPointMonthOne[9],
            10: resetPointMonthOne[10],
            11: resetPointMonthOne[11],
            12: resetPointMonthOne[12],
          },
          2: {
            1: resetPointMonthTwo[1],
            2: resetPointMonthTwo[2],
            3: resetPointMonthTwo[3],
            4: resetPointMonthTwo[4],
            5: resetPointMonthTwo[5],
            6: resetPointMonthTwo[6],
            7: resetPointMonthTwo[7],
            8: resetPointMonthTwo[8],
            9: resetPointMonthTwo[9],
            10: resetPointMonthTwo[10],
            11: resetPointMonthTwo[11],
            12: resetPointMonthTwo[12],
          },
          3: {
            1: resetPointMonthThree[1],
            2: resetPointMonthThree[2],
            3: resetPointMonthThree[3],
            4: resetPointMonthThree[4],
            5: resetPointMonthThree[5],
            6: resetPointMonthThree[6],
            7: resetPointMonthThree[7],
            8: resetPointMonthThree[8],
            9: resetPointMonthThree[9],
            10: resetPointMonthThree[10],
            11: resetPointMonthThree[11],
            12: resetPointMonthThree[12],
          },
          4: {
            1: resetPointMonthFour[1],
            2: resetPointMonthFour[2],
            3: resetPointMonthFour[3],
            4: resetPointMonthFour[4],
            5: resetPointMonthFour[5],
            6: resetPointMonthFour[6],
            7: resetPointMonthFour[7],
            8: resetPointMonthFour[8],
            9: resetPointMonthFour[9],
            10: resetPointMonthFour[10],
            11: resetPointMonthFour[11],
            12: resetPointMonthFour[12],
          },
        },
        gold_point: isSetting.gold_point,
      },
    }
    const res = await axios
      .post(`/api/setting/pointpolicy`, data, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) {
      alert('등록에 실패했습니다.')
    } else {
      setIsOkCheck(true)
    }
  }

  // create checked
  const modalOkEvent = (value) => {
    if (value) {
      setIsModal(false)
      create()
    } else {
      setIsModal(false)
    }
  }

  const closeModalEvent = () => {
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
                포인트 정책 관리​
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CTabContent>
              <CTabPane role="tabpanel" visible={activeKey === 1}>
                <CRow>
                  <CCol>
                    <CCol className="d-flex flex-column">
                      <span>version.{pointVersion.version}</span>
                      <div>
                        <span>
                          {moment(pointVersion.updated_at).format('YYYY-MM-DD HH:mm:ss')}에{' '}
                        </span>
                        <span style={{ color: 'blue' }}>
                          {pointVersion.action.first_name} {pointVersion.action.last_name}
                        </span>
                        <span>이 마지막 정책 수정​</span>
                      </div>
                    </CCol>
                    <CCol sm={12} className="my-4">
                      <div className="my-3">포인트 정책 (충전소 인앱결제 페이지 하단 노출)​</div>
                      <div className="d-flex flex-row">
                        <CCol sm={5} className="d-flex flex-column">
                          <div className="d-flex flex-row ">
                            <span style={{ width: '100px' }}>한국어​</span>
                            <CFormTextarea
                              defaultValue={isSetting.policy.ko}
                              onChange={(e) => {
                                setPolicy({ ...policy, ko: e.target.value })
                              }}
                              placeholder="내용을 입력하세요​"
                            />
                          </div>
                          <div className="d-flex flex-row my-2">
                            <span style={{ width: '100px' }}>영어​</span>
                            <CFormTextarea
                              defaultValue={isSetting.policy.en}
                              onChange={(e) => {
                                setPolicy({ ...policy, en: e.target.value })
                              }}
                              placeholder="내용을 입력하세요​"
                            />
                          </div>
                          <div className="d-flex flex-row">
                            <span style={{ width: '100px' }}>중국어​</span>
                            <CFormTextarea
                              defaultValue={isSetting.policy.ch}
                              onChange={(e) => {
                                setPolicy({ ...policy, ch: e.target.value })
                              }}
                              placeholder="내용을 입력하세요​"
                            />
                          </div>
                          <div className="d-flex flex-row my-2">
                            <span style={{ width: '100px' }}>일본어​</span>
                            <CFormTextarea
                              defaultValue={isSetting.policy.jp}
                              onChange={(e) => {
                                setPolicy({ ...policy, jp: e.target.value })
                              }}
                              placeholder="내용을 입력하세요​"
                            />
                          </div>
                          <div className="d-flex flex-row">
                            <span style={{ width: '100px' }}>스페인어​</span>
                            <CFormTextarea
                              defaultValue={isSetting.policy.es}
                              onChange={(e) => {
                                setPolicy({ ...policy, es: e.target.value })
                              }}
                              placeholder="내용을 입력하세요​"
                            />
                          </div>
                        </CCol>
                        <CCol sm={1} />
                        <CCol sm={6} className="d-flex flex-column">
                          <span className="mb-2">팬픽 랭킹 투표 (최소포인트수)</span>
                          <div className="d-flex flex-row align-items-center">
                            <CFormTextarea
                              defaultValue={isSetting.min_vote_fanfick}
                              onChange={(e) => {
                                setSetting({ ...isSetting, min_vote_fanfick: e.target.value })
                              }}
                              className="text-end me-2"
                              style={{ width: '250px' }}
                              placeholder="10"
                              type="number"
                            />
                            <span>p</span>
                          </div>
                          <div className="d-flex flex-column mt-4">
                            <span className="mb-2">팬심서포트 (최소포인트수)</span>
                            <div className="d-flex flex-row align-items-center">
                              <CFormTextarea
                                defaultValue={isSetting.min_member_fanshim}
                                onChange={(e) => {
                                  setSetting({ ...isSetting, min_member_fanshim: e.target.value })
                                }}
                                className="text-end me-2"
                                style={{ width: '250px' }}
                                placeholder="10"
                                type="number"
                              />
                              <span>p</span>
                            </div>
                          </div>
                        </CCol>
                      </div>
                    </CCol>
                    <CCol className="d-flex flex-column my-4">
                      <div className="mb-4">포인트 초기화 주기 (매달1일)</div>
                      <CTable>
                        <CTableBody>
                          <CTableRow>
                            <CTableDataCell
                              scope="row"
                              className="border-0 text-break"
                              style={{ width: '10%' }}
                            >
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CImage
                                  style={{
                                    borderRadius: '50%',
                                    width: '30px',
                                    height: '30px',
                                    marginRight: '10px',
                                  }}
                                  src={coin}
                                />
                                <span>캐시포인트​</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthOne['1'] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthOne({
                                      ...resetPointMonthOne,
                                      1: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">1월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthOne['2'] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthOne({
                                      ...resetPointMonthOne,
                                      2: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">2월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthOne['3'] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthOne({
                                      ...resetPointMonthOne,
                                      3: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">3월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthOne['4'] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthOne({
                                      ...resetPointMonthOne,
                                      4: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">4월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthOne['5'] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthOne({
                                      ...resetPointMonthOne,
                                      5: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">5월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthOne['6'] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthOne({
                                      ...resetPointMonthOne,
                                      6: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">6월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthOne['7'] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthOne({
                                      ...resetPointMonthOne,
                                      7: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">7월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthOne['8'] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthOne({
                                      ...resetPointMonthOne,
                                      8: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">8월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthOne['9'] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthOne({
                                      ...resetPointMonthOne,
                                      9: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">9월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthOne['10'] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthOne({
                                      ...resetPointMonthOne,
                                      10: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">10월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthOne['11'] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthOne({
                                      ...resetPointMonthOne,
                                      11: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">11월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthOne['12'] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthOne({
                                      ...resetPointMonthOne,
                                      12: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">12월</span>
                              </div>
                            </CTableDataCell>
                          </CTableRow>
                          <CTableRow>
                            <CTableDataCell scope="row" className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <div className="d-flex flex-row align-items-center">
                                  <CImage
                                    style={{
                                      borderRadius: '50%',
                                      width: '30px',
                                      height: '30px',
                                      marginRight: '10px',
                                    }}
                                    src={heart}
                                  />
                                  <span>하트2포인트</span>
                                </div>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthTwo[1] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthTwo({
                                      ...resetPointMonthTwo,
                                      1: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">1월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthTwo[2] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthTwo({
                                      ...resetPointMonthTwo,
                                      2: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">2월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthTwo[3] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthTwo({
                                      ...resetPointMonthTwo,
                                      3: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">3월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthTwo[4] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthTwo({
                                      ...resetPointMonthTwo,
                                      4: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">4월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthTwo[5] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthTwo({
                                      ...resetPointMonthTwo,
                                      5: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">5월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthTwo[6] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthTwo({
                                      ...resetPointMonthTwo,
                                      6: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">6월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthTwo[7] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthTwo({
                                      ...resetPointMonthTwo,
                                      7: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">7월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthTwo[8] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthTwo({
                                      ...resetPointMonthTwo,
                                      8: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">8월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthTwo[9] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthTwo({
                                      ...resetPointMonthTwo,
                                      9: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">9월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthTwo[10] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthTwo({
                                      ...resetPointMonthTwo,
                                      10: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">10월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthTwo[11] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthTwo({
                                      ...resetPointMonthTwo,
                                      11: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">11월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthTwo[12] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthTwo({
                                      ...resetPointMonthTwo,
                                      12: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">12월</span>
                              </div>
                            </CTableDataCell>
                          </CTableRow>
                          <CTableRow>
                            <CTableDataCell scope="row" className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <div className="d-flex flex-row align-items-center">
                                  <CImage
                                    style={{
                                      borderRadius: '50%',
                                      width: '30px',
                                      height: '30px',
                                      marginRight: '10px',
                                    }}
                                    src={star}
                                  />
                                  <span>스타포인트</span>
                                </div>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthThree[1] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthThree({
                                      ...resetPointMonthThree,
                                      1: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">1월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthThree[2] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthThree({
                                      ...resetPointMonthThree,
                                      2: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">2월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthThree[3] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthThree({
                                      ...resetPointMonthThree,
                                      3: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">3월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthThree[4] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthThree({
                                      ...resetPointMonthThree,
                                      4: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">4월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthThree[5] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthThree({
                                      ...resetPointMonthThree,
                                      5: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">5월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthThree[6] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthThree({
                                      ...resetPointMonthThree,
                                      6: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">6월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthThree[7] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthThree({
                                      ...resetPointMonthThree,
                                      7: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">7월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthThree[8] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthThree({
                                      ...resetPointMonthThree,
                                      8: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">8월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthThree[9] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthThree({
                                      ...resetPointMonthThree,
                                      9: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">9월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthThree[10] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthThree({
                                      ...resetPointMonthThree,
                                      10: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">10월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthThree[11] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthThree({
                                      ...resetPointMonthThree,
                                      11: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">11월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthThree[12] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthThree({
                                      ...resetPointMonthThree,
                                      12: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">12월</span>
                              </div>
                            </CTableDataCell>
                          </CTableRow>
                          <CTableRow>
                            <CTableDataCell scope="row" className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <div className="d-flex flex-row align-items-center">
                                  <CImage
                                    style={{
                                      borderRadius: '50%',
                                      width: '30px',
                                      height: '30px',
                                      marginRight: '10px',
                                    }}
                                    src={fanpick}
                                  />
                                  <span>팬픽포인트</span>
                                </div>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthFour[1] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthFour({
                                      ...resetPointMonthFour,
                                      1: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">1월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthFour[2] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthFour({
                                      ...resetPointMonthFour,
                                      2: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">2월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthFour[3] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthFour({
                                      ...resetPointMonthFour,
                                      3: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">3월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthFour[4] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthFour({
                                      ...resetPointMonthFour,
                                      4: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">4월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthFour[5] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthFour({
                                      ...resetPointMonthFour,
                                      5: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">5월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthFour[6] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthFour({
                                      ...resetPointMonthFour,
                                      6: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">6월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthFour[7] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthFour({
                                      ...resetPointMonthFour,
                                      7: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">7월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthFour[8] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthFour({
                                      ...resetPointMonthFour,
                                      8: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">8월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthFour[9] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthFour({
                                      ...resetPointMonthFour,
                                      9: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">9월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthFour[10] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthFour({
                                      ...resetPointMonthFour,
                                      10: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">10월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthFour[11] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthFour({
                                      ...resetPointMonthFour,
                                      11: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">11월</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="border-0 text-break">
                              <div className="d-flex flex-row align-items-center justify-content-start">
                                <CFormCheck
                                  checked={resetPointMonthFour[12] === 1}
                                  onChange={(e) => {
                                    setResetPointMonthFour({
                                      ...resetPointMonthFour,
                                      12: e.target.checked === false ? 0 : 1,
                                    })
                                  }}
                                />
                                <span className="ms-1">12월</span>
                              </div>
                            </CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                    <CCol className="my-4">
                      <CCol sm={12} className="d-flex flex-row align-items-center">
                        <CButton className="me-3" color="light">
                          팬픽포인트 설정​
                        </CButton>
                        <CFormCheck
                          checked={isSetting.gold_point === 1}
                          onChange={(e) => {
                            setSetting({
                              ...isSetting,
                              gold_point: e.target.checked === false ? 0 : 1,
                            })
                          }}
                        />
                      </CCol>
                    </CCol>
                    {role !== one && (
                      <CCol>
                        <CButton
                          style={{ color: 'white' }}
                          color="info"
                          className="float-end form-footer__btn__ml form-footer__btn px-5"
                          onClick={() => setIsModal(true)}
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
      {isModal && role !== one && (
        <CheckPopup
          onClickClose={() => setIsModal(false)}
          bodyContent={'포인트 정책 내용을 수정하시겠습니까?'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'수정이 완료되었습니다.'}
        />
      )}
    </CRow>
  )
}
PointPolicy.propTypes = {
  history: PropTypes.object,
}

export default PointPolicy
