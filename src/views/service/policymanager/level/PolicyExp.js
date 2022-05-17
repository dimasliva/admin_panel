import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormLabel,
  CImage,
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
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import moment from 'moment'
import { CheckPopup } from '../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../components/publicPopup/NormalPopup'
import LevelDetail from './popup/LevelDetail'
import level1 from './assets/level1.png'
import level2 from './assets/level2.png'
import level3 from './assets/level3.png'
import level4 from './assets/level4.png'
import level5 from './assets/level5.png'
import level6 from './assets/level6.png'
import level7 from './assets/level7.png'
import level8 from './assets/level8.png'
import level9 from './assets/level9.png'
import level10 from './assets/level10.png'

const PolicyExp = () => {
  // useState
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [activeKey, setActiveKey] = useState(1)
  // activekey === 1
  const [isLevelExp, setLevelExp] = useState(false) // Detail Popup
  const [expVersion, setExpVersion] = useState({
    service_id: '',
    sign: '',
    version: '',
    action: {
      first_name: '',
      last_name: '',
    },
    setting: {
      factor: {
        payment_app: '',
        fanplay_like: '',
        fanplay_post: '',
        share_member: '',
        sign_message: '',
        fanplay_reply: '',
        ranking_votes: '',
        fansupport_votes: '',
        fandiy_use_paid: '',
        randombox_use_paid: '',
        complete_daily_quest: '',
        fanshim_participants: '',
        fanshim_support_full: '',
        complete_monthly_quest: '',
        complete_weeekly_quest: '',
      },
      limits: {
        reg_sign: '',
        reg_fandiy: '',
        post_report: '',
        reg_fanfeed: '',
        reg_fantalk: '',
        complaint_report: '',
      },
      attendance_exp: {
        5: '',
        10: '',
        20: '',
        30: '',
      },
    },
    created_at: '',
    updated_at: '',
  }) // Detail Popup
  // activekey === 2
  const [managerVersion, setManagerVersion] = useState({
    service_id: '',
    sign: '',
    version: '',
    setting: {},
    action: {},
    created_at: '',
    updated_at: '',
  }) // Detail Popup
  const [lvlManager, setLvlManager] = useState({
    1: {
      gold: 0,
      icon: '',
      name: 0,
      star: 0,
      tips: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
      heart_1: 0,
      heart_2: 0,
      max_exp: 0,
      min_exp: 0,
      description: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
    },
    2: {
      gold: '',
      icon: '',
      name: '',
      star: '',
      tips: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
      heart_1: '',
      heart_2: '',
      max_exp: '',
      min_exp: '',
      description: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
    },
    3: {
      gold: '',
      icon: '',
      name: '',
      star: '',
      tips: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
      heart_1: '',
      heart_2: '',
      max_exp: '',
      min_exp: '',
      description: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
    },
    4: {
      gold: '',
      icon: '',
      name: '',
      star: '',
      tips: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
      heart_1: '',
      heart_2: '',
      max_exp: '',
      min_exp: '',
      description: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
    },
    5: {
      gold: '',
      icon: '',
      name: '',
      star: '',
      tips: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
      heart_1: '',
      heart_2: '',
      max_exp: '',
      min_exp: '',
      description: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
    },
    6: {
      gold: '',
      icon: '',
      name: '',
      star: '',
      tips: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
      heart_1: '',
      heart_2: '',
      max_exp: '',
      min_exp: '',
      description: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
    },
    7: {
      gold: '',
      icon: '',
      name: '',
      star: '',
      tips: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
      heart_1: '',
      heart_2: '',
      max_exp: '',
      min_exp: '',
      description: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
    },
    8: {
      gold: '',
      icon: '',
      name: '',
      star: '',
      tips: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
      heart_1: '',
      heart_2: '',
      max_exp: '',
      min_exp: '',
      description: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
    },
    9: {
      gold: '',
      icon: '',
      name: '',
      star: '',
      tips: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
      heart_1: '',
      heart_2: '',
      max_exp: '',
      min_exp: '',
      description: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
    },
    10: {
      gold: '',
      icon: '',
      name: '',
      star: '',
      tips: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
      heart_1: '',
      heart_2: '',
      max_exp: '',
      min_exp: '',
      description: {
        ch: '',
        en: '',
        es: '',
        jp: '',
        ko: '',
      },
    },
  }) // Detail Popup
  const [isLvlDetail, setIsLvlDetail] = useState({ use: false, id: '' }) // Detail Popup

  //Table title
  const tableManager = [
    { label: '레벨아이콘​' },
    { label: '레벨​' },
    { label: '최소 경험치​​' },
    { label: '최대 경험치​' },
    { label: '하트1 리워드' },
    { label: '하트2 리워드​' },
    { label: '스타 리워드​​' },
    { label: '팬픽 리워드​' },
  ]
  const [attendanceExp, setAttendanceExp] = useState({
    5: '',
    10: '',
    20: '',
    30: '',
  })
  const [factor, setFactor] = useState({
    ranking_votes: '',
    fanshim_participants: '',
    fanshim_support_full: '',
    fanplay_post: '',
    fanplay_like: '',
    fanplay_reply: '',
    share_member: '',
    payment_app: '',
    fandiy_use_paid: '',
    randombox_use_paid: '',
    sign_message: '',
    complete_daily_quest: '',
    complete_weeekly_quest: '',
    complete_monthly_quest: '',
    fansupport_votes: '',
  })
  const [limits, setLimits] = useState({
    complaint_report: '',
    post_report: '',
    reg_fanfeed: '',
    reg_fandiy: '',
    reg_fantalk: '',
    reg_sign: '',
  })
  const one = 3
  const [role, setRole] = useState('')
  useEffect(() => {
    if (activeKey === 1) {
      getExp()
    } else if (activeKey === 2) {
      getManager()
    }
  }, [])
  // active key === 1
  const getExp = async () => {
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
    const res = await axios
      .get(`/api/setting/level/exp`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setExpVersion(res.data.value)
    setFactor(res.data.value.setting.factor)
    setLimits(res.data.value.setting.limits)
    setAttendanceExp(res.data.value.setting.attendance_exp)
  }
  const modifyExp = async () => {
    const data = {
      setting: {
        attendance_exp: {
          5: attendanceExp['5'],
          10: attendanceExp['10'],
          20: attendanceExp['20'],
          30: attendanceExp['30'],
        },
        limits: {
          complaint_report: limits.complaint_report,
          post_report: limits.post_report,
          reg_fanfeed: limits.reg_fanfeed,
          reg_fandiy: limits.reg_fandiy,
          reg_fantalk: limits.reg_fantalk,
          reg_sign: limits.reg_sign,
        },
        factor: {
          ranking_votes: factor.ranking_votes,
          fanshim_participants: factor.fanshim_participants,
          fanplay_post: factor.fanplay_post,
          fansupport_end: factor.fansupport_end,
          share_member: factor.share_member,
          payment_app: factor.payment_app,
          fandiy_use_paid: factor.fandiy_use_paid,
          randombox_use_paid: factor.randombox_use_paid,
          sign_message: factor.sign_message,
          fansupport_votes: factor.fansupport_votes,
          // fanshim_support_full: factor.fanshim_support_full,
          // fanplay_like: factor.fanplay_like,
          // fanplay_reply: factor.fanplay_reply,
          // complete_daily_quest: factor.complete_daily_quest,
          // complete_weeekly_quest: factor.complete_weeekly_quest,
          // complete_monthly_quest: factor.complete_monthly_quest,
        },
      },
    }
    const res = await axios
      .post(`/api/setting/level/exp`, data, headerConfig)
      .catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }
  // active key === 2
  const getManager = async () => {
    const res = await axios
      .get(`/api/setting/level/policy`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return

    setManagerVersion(res.data.value)
    setLvlManager(res.data.value.setting)
  }
  const modalOkEvent = (value) => {
    if (value) {
      setLevelExp(false)
      modifyExp()
    } else {
      setLevelExp(false)
    }
  }
  const closeModalEvent = () => {
    setIsOkCheck(false)
    getExp()
  }
  const onCloseOkEvent = () => {
    getManager()
    setIsLvlDetail({ use: false, id: '' })
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
                경험치 관리​
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                className="cursor custom-tab-color-main"
                active={activeKey === 2}
                onClick={() => setActiveKey(2)}
              >
                레벨 관리​
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CTabContent>
              <CTabPane role="tabpanel" visible={activeKey === 1}>
                <CCol className="mb-4">
                  <div>version.{expVersion.version}​</div>
                  <div className="d-flex flex-row">
                    <span>{moment(expVersion.updated_at).format('YYYY-MM-DD HH:mm:ss')}에 </span>
                    <span className="text-info">
                      {expVersion.action.first_name} {expVersion.action.last_name}
                    </span>
                    <span>이 마지막 정책 수정​</span>
                  </div>
                </CCol>
                <CRow className="g-3">
                  <CCol sm={6}>
                    {/*3*/}
                    <CCol className="d-flex flex-column my-4">
                      <div>경험치 적용 배수​​​</div>
                      <div className="mb-2"> ex) 투표수 x 설정 수 = 경험치 제공</div>
                      {/*Table*/}
                      <CCol>
                        <CTable>
                          {/*Table body*/}
                          <CTableBody>
                            {/*1*/}
                            <CTableRow>
                              <CTableDataCell className="border-1">
                                {/* <div className="d-flex flex-column justify-content-center">
                                  랭킹투표수
                                </div> */}
                                <div className="d-flex flex-column justify-content-center">
                                  하트포인트 투표 수( 랭킹투표 / 이벤트 투표 )
                                </div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <div className="d-flex justify-content-center">X​</div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <CFormInput
                                  className="text-end"
                                  type="number"
                                  onKeyPress={(e) => {
                                    const _pattern1 = /^\d*[.]\d{4}$/
                                    if (_pattern1.test(e.target.value)) {
                                      e.preventDefault()
                                    }
                                  }}
                                  onChange={(e) => {
                                    setFactor({ ...factor, ranking_votes: e.target.value })
                                  }}
                                  defaultValue={factor.ranking_votes}
                                />
                              </CTableDataCell>
                              <CTableDataCell className="border-0">
                                <div className="d-flex flex-column">EXP</div>
                              </CTableDataCell>
                            </CTableRow>
                            {/*2*/}
                            <CTableRow>
                              <CTableDataCell className="border-1">
                                <div className="d-flex flex-column justify-content-center">
                                  팬심서포트 참여 수
                                </div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <div className="d-flex justify-content-center">X​</div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <CFormInput
                                  className="text-end"
                                  onKeyPress={(e) => {
                                    const _pattern1 = /^\d*[.]\d{4}$/
                                    if (_pattern1.test(e.target.value)) {
                                      e.preventDefault()
                                    }
                                  }}
                                  onChange={(e) => {
                                    setFactor({ ...factor, fansupport_votes: e.target.value })
                                  }}
                                  defaultValue={factor.fansupport_votes}
                                />
                              </CTableDataCell>
                              <CTableDataCell className="border-0">
                                <div className="d-flex flex-column">EXP</div>
                              </CTableDataCell>
                            </CTableRow>
                            {/*3*/}
                            {/* <CTableRow>
                              <CTableDataCell className="border-1">
                                <div className="d-flex flex-column justify-content-center">
                                  팬심서포트 100% 달성(개설자)
                                </div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <div className="d-flex justify-content-center">X​</div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <CFormInput
                                  className="text-end"
                                  onChange={(e) => {
                                    setFactor({ ...factor, fanshim_support_full: e.target.value })
                                  }}
                                  defaultValue={factor.fanshim_support_full}
                                />
                              </CTableDataCell>
                              <CTableDataCell className="border-0">
                                <div className="d-flex flex-column">EXP</div>
                              </CTableDataCell>
                            </CTableRow> */}
                            {/*4*/}
                            <CTableRow>
                              <CTableDataCell className="border-1">
                                <div className="d-flex flex-column justify-content-center">
                                  팬플레이 게시물 작성 수
                                </div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <div className="d-flex justify-content-center">X​</div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <CFormInput
                                  className="text-end"
                                  onKeyPress={(e) => {
                                    const _pattern1 = /^\d*[.]\d{4}$/
                                    if (_pattern1.test(e.target.value)) {
                                      e.preventDefault()
                                    }
                                  }}
                                  onChange={(e) => {
                                    setFactor({ ...factor, fanplay_post: e.target.value })
                                  }}
                                  defaultValue={factor.fanplay_post}
                                />
                              </CTableDataCell>
                              <CTableDataCell className="border-0">
                                <div className="d-flex flex-column">EXP</div>
                              </CTableDataCell>
                            </CTableRow>
                            {/*5*/}
                            {/* <CTableRow className="">
                              <CTableDataCell className="border-1">
                                <div className="d-flex flex-column justify-content-center">
                                  좋아요 누른 수 (팬플레이 모두)
                                </div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <div className="d-flex justify-content-center">X​</div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <CFormInput
                                  className="text-end"
                                  onChange={(e) => {
                                    setFactor({ ...factor, fanplay_like: e.target.value })
                                  }}
                                  defaultValue={factor.fanplay_like}
                                />
                              </CTableDataCell>
                              <CTableDataCell className="border-0">
                                <div className="d-flex flex-column">EXP</div>
                              </CTableDataCell>
                            </CTableRow> */}
                            {/*6*/}
                            {/* <CTableRow>
                              <CTableDataCell className="border-1">
                                <div className="d-flex flex-column justify-content-center">
                                  댓글 작성 수 (팬플레이 모두)
                                </div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <div className="d-flex justify-content-center">X​</div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <CFormInput
                                  className="text-end"
                                  onChange={(e) => {
                                    setFactor({ ...factor, fanplay_reply: e.target.value })
                                  }}
                                  defaultValue={factor.fanplay_reply}
                                />
                              </CTableDataCell>
                              <CTableDataCell className="border-0">
                                <div className="d-flex flex-column">EXP</div>
                              </CTableDataCell>
                            </CTableRow> */}
                            {/*7*/}
                            <CTableRow>
                              <CTableDataCell className="border-1">
                                <div className="d-flex flex-column justify-content-center">
                                  친구 추천 받기 수
                                </div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <div className="d-flex justify-content-center">X​</div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <CFormInput
                                  className="text-end"
                                  onKeyPress={(e) => {
                                    const _pattern1 = /^\d*[.]\d{4}$/
                                    if (_pattern1.test(e.target.value)) {
                                      e.preventDefault()
                                    }
                                  }}
                                  onChange={(e) => {
                                    setFactor({ ...factor, share_member: e.target.value })
                                  }}
                                  defaultValue={factor.share_member}
                                />
                              </CTableDataCell>
                              <CTableDataCell className="border-0">
                                <div className="d-flex flex-column">EXP</div>
                              </CTableDataCell>
                            </CTableRow>
                            {/*8*/}
                            <CTableRow>
                              <CTableDataCell className="border-1">
                                <div className="d-flex flex-column justify-content-center">
                                  인앱 결제 캐시포인트 수
                                </div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <div className="d-flex justify-content-center">X​</div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <CFormInput
                                  className="text-end"
                                  onKeyPress={(e) => {
                                    const _pattern1 = /^\d*[.]\d{4}$/
                                    if (_pattern1.test(e.target.value)) {
                                      e.preventDefault()
                                    }
                                  }}
                                  onChange={(e) => {
                                    setFactor({ ...factor, payment_app: e.target.value })
                                  }}
                                  defaultValue={factor.payment_app}
                                />
                              </CTableDataCell>
                              <CTableDataCell className="border-0">
                                <div className="d-flex flex-column">EXP</div>
                              </CTableDataCell>
                            </CTableRow>
                            {/*9*/}
                            <CTableRow>
                              <CTableDataCell className="border-1">
                                <div className="d-flex flex-column justify-content-center">
                                  팬 DIY 유료 이용 포인트 수
                                </div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <div className="d-flex justify-content-center">X​</div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <CFormInput
                                  className="text-end"
                                  onKeyPress={(e) => {
                                    const _pattern1 = /^\d*[.]\d{4}$/
                                    if (_pattern1.test(e.target.value)) {
                                      e.preventDefault()
                                    }
                                  }}
                                  onChange={(e) => {
                                    setFactor({ ...factor, fandiy_use_paid: e.target.value })
                                  }}
                                  defaultValue={factor.fandiy_use_paid}
                                />
                              </CTableDataCell>
                              <CTableDataCell className="border-0">
                                <div className="d-flex flex-column">EXP</div>
                              </CTableDataCell>
                            </CTableRow>
                            {/*10*/}
                            <CTableRow>
                              <CTableDataCell className="border-1">
                                <div className="d-flex flex-column justify-content-center">
                                  랜덤박스 유료 이용 횟 수
                                </div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <div className="d-flex justify-content-center">X​</div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <CFormInput
                                  className="text-end"
                                  onKeyPress={(e) => {
                                    const _pattern1 = /^\d*[.]\d{4}$/
                                    if (_pattern1.test(e.target.value)) {
                                      e.preventDefault()
                                    }
                                  }}
                                  onChange={(e) => {
                                    setFactor({ ...factor, randombox_use_paid: e.target.value })
                                  }}
                                  defaultValue={factor.randombox_use_paid}
                                />
                              </CTableDataCell>
                              <CTableDataCell className="border-0">
                                <div className="d-flex flex-column">EXP</div>
                              </CTableDataCell>
                            </CTableRow>
                            {/*11*/}
                            <CTableRow>
                              <CTableDataCell className="border-1">
                                <div className="d-flex flex-column justify-content-center">
                                  전광판 이용 횟수
                                </div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <div className="d-flex justify-content-center">X​</div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <CFormInput
                                  className="text-end"
                                  onKeyPress={(e) => {
                                    const _pattern1 = /^\d*[.]\d{4}$/
                                    if (_pattern1.test(e.target.value)) {
                                      e.preventDefault()
                                    }
                                  }}
                                  onChange={(e) => {
                                    setFactor({ ...factor, sign_message: e.target.value })
                                  }}
                                  defaultValue={factor.sign_message}
                                />
                              </CTableDataCell>
                              <CTableDataCell className="border-0">
                                <div className="d-flex flex-column">EXP</div>
                              </CTableDataCell>
                            </CTableRow>
                            {/*12*/}
                            <CTableRow>
                              <CTableDataCell className="border-1">
                                <div className="d-flex flex-column justify-content-center">
                                  팬심서포트 100% 달성횟수 *개설자에게 지급
                                </div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <div className="d-flex justify-content-center">X​</div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <CFormInput
                                  className="text-end"
                                  onKeyPress={(e) => {
                                    const _pattern1 = /^\d*[.]\d{4}$/
                                    if (_pattern1.test(e.target.value)) {
                                      e.preventDefault()
                                    }
                                  }}
                                  onChange={(e) => {
                                    setFactor({ ...factor, fansupport_end: e.target.value })
                                  }}
                                  defaultValue={factor.fansupport_end}
                                />
                              </CTableDataCell>
                              <CTableDataCell className="border-0">
                                <div className="d-flex flex-column">EXP</div>
                              </CTableDataCell>
                            </CTableRow>
                            {/* <CTableRow>
                              <CTableDataCell className="border-1">
                                <div className="d-flex flex-column justify-content-center">
                                  일일퀘스트 완료
                                </div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <div className="d-flex justify-content-center">X​</div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <CFormInput
                                  className="text-end"
                                  onChange={(e) => {
                                    setFactor({ ...factor, complete_daily_quest: e.target.value })
                                  }}
                                  defaultValue={factor.complete_daily_quest}
                                />
                              </CTableDataCell>
                              <CTableDataCell className="border-0">
                                <div className="d-flex flex-column">EXP</div>
                              </CTableDataCell>
                            </CTableRow> */}
                            {/*13*/}
                            {/* <CTableRow>
                              <CTableDataCell className="border-1">
                                <div className="d-flex flex-column justify-content-center">
                                  주간퀘스트 완료
                                </div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <div className="d-flex justify-content-center">X​</div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <CFormInput
                                  className="text-end"
                                  onChange={(e) => {
                                    setFactor({ ...factor, complete_weeekly_quest: e.target.value })
                                  }}
                                  defaultValue={factor.complete_weeekly_quest}
                                />
                              </CTableDataCell>
                              <CTableDataCell className="border-0">
                                <div className="d-flex flex-column">EXP</div>
                              </CTableDataCell>
                            </CTableRow> */}
                            {/*14*/}
                            {/* <CTableRow>
                              <CTableDataCell className="border-1">
                                <div className="d-flex flex-column justify-content-center">
                                  월간퀘스트 완료
                                </div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <div className="d-flex justify-content-center">X​</div>
                              </CTableDataCell>
                              <CTableDataCell className="border-1">
                                <CFormInput
                                  className="text-end"
                                  onChange={(e) => {
                                    setFactor({ ...factor, complete_monthly_quest: e.target.value })
                                  }}
                                  defaultValue={factor.complete_monthly_quest}
                                />
                              </CTableDataCell>
                              <CTableDataCell className="border-0">
                                <div className="d-flex flex-column">EXP</div>
                              </CTableDataCell>
                            </CTableRow> */}
                          </CTableBody>
                        </CTable>
                      </CCol>
                    </CCol>
                  </CCol>
                  {/*Second col*/}
                  <CCol sm={1} />
                  {/*1*/}
                  <CCol sm={5}>
                    <CCol>
                      <CCol className="d-flex flex-column my-4">
                        <div className="my-2">출석 경험치​</div>
                        <div className="d-flex flex-row align-items-center">
                          <CFormLabel style={{ width: '140px' }}>5일 연속​</CFormLabel>
                          <CFormInput
                            className="text-end me-2"
                            defaultValue={attendanceExp[5]}
                            onChange={(e) => {
                              setAttendanceExp({ ...attendanceExp, 5: e.target.value })
                            }}
                          />
                          <span>EXP</span>
                        </div>
                        <div className="d-flex flex-row align-items-center mt-2">
                          <CFormLabel style={{ width: '140px' }}>10일 연속​​</CFormLabel>
                          <CFormInput
                            className="text-end me-2"
                            defaultValue={attendanceExp[10]}
                            onChange={(e) => {
                              setAttendanceExp({ ...attendanceExp, 10: e.target.value })
                            }}
                          />
                          <span>EXP</span>
                        </div>
                        <div className="d-flex flex-row align-items-center mt-2">
                          <CFormLabel style={{ width: '140px' }}>20일 연속​</CFormLabel>
                          <CFormInput
                            className="text-end me-2"
                            defaultValue={attendanceExp[20]}
                            onChange={(e) => {
                              setAttendanceExp({ ...attendanceExp, 20: e.target.value })
                            }}
                          />
                          <span>EXP</span>
                        </div>
                        <div className="d-flex flex-row align-items-center mt-2">
                          <CFormLabel style={{ width: '140px' }}>30일 연속​​​​</CFormLabel>
                          <CFormInput
                            className="text-end me-2"
                            defaultValue={attendanceExp[30]}
                            onChange={(e) => {
                              setAttendanceExp({ ...attendanceExp, 30: e.target.value })
                            }}
                          />
                          <span>EXP</span>
                        </div>
                      </CCol>
                    </CCol>
                    {/*2*/}
                    <CCol className="d-flex flex-column my-4">
                      <div className="my-3">사용자 레벨제한​</div>
                      <div className="d-flex flex-row align-items-center">
                        <CFormLabel style={{ width: '350px' }}>댓글 신고 기능​</CFormLabel>
                        <CFormInput
                          className="text-end me-2"
                          onChange={(e) => {
                            setLimits({ ...limits, complaint_report: e.target.value })
                          }}
                          defaultValue={limits.complaint_report}
                        />
                        <span>Lv.​</span>
                      </div>
                      <div className="d-flex flex-row align-items-center mt-2">
                        <CFormLabel style={{ width: '350px' }}>게시물 신고 기능​​</CFormLabel>
                        <CFormInput
                          className="text-end me-2"
                          onChange={(e) => {
                            setLimits({ ...limits, post_report: e.target.value })
                          }}
                          defaultValue={limits.post_report}
                        />
                        <span>Lv.​</span>
                      </div>
                      <div className="d-flex flex-row align-items-center mt-2">
                        <CFormLabel style={{ width: '350px' }}>
                          팬피드 게시물 등록 기능​​​
                        </CFormLabel>
                        <CFormInput
                          className="text-end me-2"
                          onChange={(e) => {
                            setLimits({ ...limits, reg_fanfeed: e.target.value })
                          }}
                          defaultValue={limits.reg_fanfeed}
                        />
                        <span>Lv.​</span>
                      </div>
                      <div className="d-flex flex-row align-items-center mt-2">
                        <CFormLabel style={{ width: '350px' }}>팬 DIY 게시물 등록 기능​</CFormLabel>
                        <CFormInput
                          className="text-end me-2"
                          onChange={(e) => {
                            setLimits({ ...limits, reg_fandiy: e.target.value })
                          }}
                          defaultValue={limits.reg_fandiy}
                        />
                        <span>Lv.</span>
                      </div>
                      <div className="d-flex flex-row align-items-center mt-2">
                        <CFormLabel style={{ width: '350px' }}>팬톡 게시물 등록 기능​​</CFormLabel>
                        <CFormInput
                          className="text-end me-2"
                          onChange={(e) => {
                            setLimits({ ...limits, reg_fantalk: e.target.value })
                          }}
                          defaultValue={limits.reg_fantalk}
                        />
                        <span>Lv.</span>
                      </div>
                      <div className="d-flex flex-row align-items-center mt-2">
                        <CFormLabel style={{ width: '350px' }}>전광판 등록 기능​​​</CFormLabel>
                        <CFormInput
                          className="text-end me-2"
                          onChange={(e) => {
                            setLimits({ ...limits, reg_sign: e.target.value })
                          }}
                          defaultValue={limits.reg_sign}
                        />
                        <span>Lv.</span>
                      </div>
                    </CCol>
                    {/*3*/}
                  </CCol>
                  {role === one && (
                    <CCol>
                      <CButton
                        color="info"
                        style={{ color: 'white' }}
                        className="form-footer__btn float-end px-5"
                        onClick={() => setLevelExp(true)}
                      >
                        저장​
                      </CButton>
                    </CCol>
                  )}
                </CRow>
              </CTabPane>
              <CTabPane role="tabpanel" visible={activeKey === 2}>
                <CCol className="mb-4">
                  <div>version.{managerVersion.version}​</div>
                  <div className="d-flex flex-row">
                    <span>
                      {moment(managerVersion.updated_at).format('YYYY-MM-DD HH:mm:ss')}에{' '}
                    </span>
                    <span className="text-info">
                      {managerVersion.action.first_name} {managerVersion.action.last_name}
                    </span>
                    <span>이 마지막 정책 수정​</span>
                  </div>
                </CCol>
                <CTable bordered className="float-start">
                  <CTableHead>
                    <CTableRow>
                      {tableManager.map((title, index) => {
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
                    {/*Lvl 1*/}
                    <CTableRow>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <CImage
                            style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                            src={level1}
                            alt=""
                            onError={(e) => (e.target.src = '/icon.png')}
                          />
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span
                            onClick={() => setIsLvlDetail({ use: true, id: 1 })}
                            className="text-info"
                            style={{ cursor: 'pointer' }}
                          >
                            Lv.1
                          </span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span>{lvlManager[1].min_exp}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[1].max_exp}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[1].heart_1}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[1].heart_2}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[1].star}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[1].gold}​</span>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                    {/*Lvl 2*/}
                    <CTableRow>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <CImage
                            style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                            src={level2}
                            alt=""
                            onError={(e) => (e.target.src = '/icon.png')}
                          />
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span
                            onClick={() => setIsLvlDetail({ use: true, id: 2 })}
                            className="text-info"
                            style={{ cursor: 'pointer' }}
                          >
                            Lv.2
                          </span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span>{lvlManager[2].min_exp}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[2].max_exp}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[2].heart_1}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[2].heart_2}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[2].star}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[2].gold}​</span>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                    {/*Lvl 3*/}
                    <CTableRow>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <CImage
                            style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                            src={level3}
                            alt=""
                            onError={(e) => (e.target.src = '/icon.png')}
                          />
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span
                            onClick={() => setIsLvlDetail({ use: true, id: 3 })}
                            className="text-info"
                            style={{ cursor: 'pointer' }}
                          >
                            Lv.3
                          </span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span>{lvlManager[3].min_exp}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[3].max_exp}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[3].heart_1}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[3].heart_2}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[3].star}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[3].gold}​</span>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                    {/*Lvl 4*/}
                    <CTableRow>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <CImage
                            style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                            src={level4}
                            alt=""
                            onError={(e) => (e.target.src = '/icon.png')}
                          />
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span
                            onClick={() => setIsLvlDetail({ use: true, id: 4 })}
                            className="text-info"
                            style={{ cursor: 'pointer' }}
                          >
                            Lv.4
                          </span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span>{lvlManager[4].min_exp}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[4].max_exp}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[4].heart_1}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[4].heart_2}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[4].star}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[4].gold}​</span>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                    {/*Lvl 5*/}
                    <CTableRow>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <CImage
                            style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                            src={level5}
                            alt=""
                            onError={(e) => (e.target.src = '/icon.png')}
                          />
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span
                            onClick={() => setIsLvlDetail({ use: true, id: 5 })}
                            className="text-info"
                            style={{ cursor: 'pointer' }}
                          >
                            Lv.5
                          </span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span>{lvlManager[5].min_exp}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[5].max_exp}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[5].heart_1}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[5].heart_2}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[5].star}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[5].gold}​</span>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                    {/*Lvl 6*/}
                    <CTableRow>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <CImage
                            style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                            src={level6}
                            alt=""
                            onError={(e) => (e.target.src = '/icon.png')}
                          />
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span
                            onClick={() => setIsLvlDetail({ use: true, id: 6 })}
                            className="text-info"
                            style={{ cursor: 'pointer' }}
                          >
                            Lv.6
                          </span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span>{lvlManager[6].min_exp}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[6].max_exp}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[6].heart_1}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[6].heart_2}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[6].star}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[6].gold}​</span>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                    {/*Lvl 7*/}
                    <CTableRow>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <CImage
                            style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                            src={level7}
                            alt=""
                            onError={(e) => (e.target.src = '/icon.png')}
                          />
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span
                            onClick={() => setIsLvlDetail({ use: true, id: 7 })}
                            className="text-info"
                            style={{ cursor: 'pointer' }}
                          >
                            Lv.7
                          </span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span>{lvlManager[7].min_exp}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[7].max_exp}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[7].heart_1}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[7].heart_2}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[7].star}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[7].gold}​</span>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                    {/*Lvl 8*/}
                    <CTableRow>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <CImage
                            style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                            src={level8}
                            alt=""
                            onError={(e) => (e.target.src = '/icon.png')}
                          />
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span
                            onClick={() => setIsLvlDetail({ use: true, id: 8 })}
                            className="text-info"
                            style={{ cursor: 'pointer' }}
                          >
                            Lv.8
                          </span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span>{lvlManager[8].min_exp}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[8].max_exp}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[8].heart_1}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[8].heart_2}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[8].star}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[8].gold}​</span>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                    {/*Lvl 9*/}
                    <CTableRow>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <CImage
                            style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                            src={level9}
                            alt=""
                            onError={(e) => (e.target.src = '/icon.png')}
                          />
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span
                            onClick={() => setIsLvlDetail({ use: true, id: 9 })}
                            className="text-info"
                            style={{ cursor: 'pointer' }}
                          >
                            Lv.9
                          </span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span>{lvlManager[9].min_exp}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[9].max_exp}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[9].heart_1}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[9].heart_2}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[9].star}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[9].gold}​</span>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                    {/*Lvl 10*/}
                    <CTableRow>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <CImage
                            style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                            src={level10}
                            alt=""
                            onError={(e) => (e.target.src = '/icon.png')}
                          />
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span
                            onClick={() => setIsLvlDetail({ use: true, id: 10 })}
                            className="text-info"
                            style={{ cursor: 'pointer' }}
                          >
                            Lv.10
                          </span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span>{lvlManager[10].min_exp}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[10].max_exp}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[10].heart_1}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[10].heart_2}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[10].star}​</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <span>{lvlManager[10].gold}​</span>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
      {isLvlDetail.use && (
        <LevelDetail
          onClickClose={() => setIsLvlDetail({ use: false, id: '' })}
          onCloseOkEvent={onCloseOkEvent}
          onId={isLvlDetail.id}
        />
      )}
      {isLevelExp && role === one && (
        <CheckPopup
          onClickClose={() => setLevelExp(false)}
          bodyContent={'경험치 정책 내용을 수정하시겠습니까?'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'등록이 완료되었습니다.'}
        />
      )}
    </CRow>
  )
}
PolicyExp.propTypes = {
  history: PropTypes.object,
}

export default PolicyExp
