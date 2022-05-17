import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTabPane,
} from '@coreui/react'
import CreateBasicPolicy from './popup/CreateBasicPolicy'
import BasicPolicyDetail from './popup/BasicPolicyDetail'
import moment from 'moment'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'
import { CheckPopup } from '../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../components/publicPopup/NormalPopup'
import { FileBtn } from '../../../../components/FileBtn'
import FileApi from '../../../../util/FileApi'
import uuid from 'react-uuid'
import Posts from './Posts'
import Pagination from './Pagination'

const BasicPolicyRule = () => {
  // useState
  const [isOkCheck, setIsOkCheck] = useState(false)
  const [isOkCheckClause, setIsOkCheckClause] = useState(false)
  const [activeKey, setActiveKey] = useState(1)
  const [isEditPolicy, setIsEditPolicy] = useState(false)
  const [isCreateNotice, setIsCreateNotice] = useState(false)
  const [isPopUpDetail, setIsPopUpDetail] = useState(false)
  const [isCreateBP, setIsCreateBP] = useState(false)
  const [isPolicyDetail, setIsPolicyDetail] = useState({ use: false, id: '' })
  const [isEditClause, setIsEditClause] = useState(false)
  const [newImgDiv, setNewImgDiv] = useState([])

  const tableInfo = [
    { label: '순서​' },
    { label: '상태​' },
    { label: '기본정책 제목​' },
    { label: '등록일시​' },
  ]
  const [policyClause, setPolicyClause] = useState({
    service_id: '',
    sign: '',
    version: '',
    setting: {
      policy: {},
      terms_use: {},
      open_source_license: {},
    },
    action: {
      last_name: '',
      first_name: '',
    },
    updated_at: new Date('2021-01-01'),
  })
  const [policyRule, setPolicyRule] = useState({
    service_id: null,
    sign: '',
    version: '',
    setting: {
      policy: {},
      terms_use: {},
      open_source_license: {},
    },
    action: {
      last_name: '',
      first_name: '',
    },
    updated_at: new Date('2021-01-01'),
  })
  const [ruleSetting, setRuleSetting] = useState({
    point_for_subscribe: { 1: '', 2: '', 3: '', 4: '' },
    point_for_share: { 1: '', 2: '', 3: '', 4: '' },
    point_change_nickname: '',
    max_change_free_nickname: '',
    tips: {
      ko: [{ url: '' }, { url: '' }],
      en: [{ url: '' }, { url: '' }],
      jp: [{ url: '' }, { url: '' }],
      ch: [{ url: '' }, { url: '' }],
      es: [{ url: '' }, { url: '' }],
    },
  })
  const [pointForSubscribe, setPointForSubscribe] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
  })
  const [pointForShare, setPointForShare] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
  })
  const [pointChangeNickname, setPointChangeNickname] = useState()
  const [maxChangeFreeNickname, setMaxChangeFreeNickname] = useState()
  const [imgs, setImgs] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [tips, setTips] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [infoSetting, setInfoSetting] = useState({
    id: '',
    info: { ch: '', en: '', es: '', jp: '', ko: '' },
    name: { ch: '', en: '', es: '', jp: '', ko: '' },
    status: '',
    action: {
      last_name: '',
      first_name: '',
    },
    priority: '',
    created_at: '',
  })
  // Tab1
  const [isStatus, setStatus] = useState(1)
  const [listTab, setListTab] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [isDate, setDate] = useState('')
  const [clauseSetting, setClauseSetting] = useState({
    policy: { ch: '', en: '', es: '', jp: '', ko: '' },
    terms_use: { ch: '', en: '', es: '', jp: '', ko: '' },
    open_source_license: { ch: '', en: '', es: '', jp: '', ko: '' },
  })
  // fan diy
  const [imgKo, setImgKo] = useState([])
  const [imgEn, setImgEn] = useState([])
  const [imgCh, setImgCh] = useState([])
  const [imgEs, setImgEs] = useState([])
  const [imgJp, setImgJp] = useState([])
  // billboard
  const [imgKo2, setImgKo2] = useState([])
  const [imgEn2, setImgEn2] = useState([])
  const [imgCh2, setImgCh2] = useState([])
  const [imgEs2, setImgEs2] = useState([])
  const [imgJp2, setImgJp2] = useState([])
  const [delPolicy, setDelPolicy] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [profilePolicy, setProfilePolicy] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(30)
  const one = 3
  const [role, setRole] = useState('')
  useEffect(() => {
    if (activeKey === 1) {
      getPolicyRule()
    } else if (activeKey === 2) {
      getPolicyInfo()
    } else if (activeKey === 3) {
      getPolicyClause()
    }
  }, [activeKey])
  // active key === 1
  const getPolicyRule = async () => {
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
    const res = await axios
      .get(`/api/setting/basicpolicy/tips`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPolicyRule(res.data.value)
    setRuleSetting(res.data.value.setting)
    setPointForSubscribe(res.data.value.setting.point_for_subscribe)
    setPointForShare(res.data.value.setting.point_for_share)
    setPointChangeNickname(res.data.value.setting.point_change_nickname)
    setMaxChangeFreeNickname(res.data.value.setting.max_change_free_nickname)
    setDelPolicy(res.data.value.setting.account_del_tips)
    setProfilePolicy(res.data.value.setting.profile_edit_tips)
    setImgs({
      ko:
        res.data.value.setting.fandiy_tips.ko[0] === undefined
          ? ''
          : res.data.value.setting.fandiy_tips.ko[0].url,
      en:
        res.data.value.setting.fandiy_tips.en[0] === undefined
          ? ''
          : res.data.value.setting.fandiy_tips.en[0].url,
      ch:
        res.data.value.setting.fandiy_tips.ch[0] === undefined
          ? ''
          : res.data.value.setting.fandiy_tips.ch[0].url,
      jp:
        res.data.value.setting.fandiy_tips.jp[0] === undefined
          ? ''
          : res.data.value.setting.fandiy_tips.jp[0].url,
      es:
        res.data.value.setting.fandiy_tips.es[0] === undefined
          ? ''
          : res.data.value.setting.fandiy_tips.es[0].url,
    })
    setTips({
      ko:
        res.data.value.setting.billboard_tips.ko[0] === undefined
          ? ''
          : res.data.value.setting.billboard_tips.ko[0].url,
      en:
        res.data.value.setting.billboard_tips.en[0] === undefined
          ? ''
          : res.data.value.setting.billboard_tips.en[0].url,
      ch:
        res.data.value.setting.billboard_tips.ch[0] === undefined
          ? ''
          : res.data.value.setting.billboard_tips.ch[0].url,
      jp:
        res.data.value.setting.billboard_tips.jp[0] === undefined
          ? ''
          : res.data.value.setting.billboard_tips.jp[0].url,
      es:
        res.data.value.setting.billboard_tips.es[0] === undefined
          ? ''
          : res.data.value.setting.billboard_tips.es[0].url,
    })
    res.data.value.setting.billboard_tips.ch.map((value) => {
      value.id = uuid()
    })
    res.data.value.setting.billboard_tips.jp.map((value) => {
      value.id = uuid()
    })
    res.data.value.setting.billboard_tips.es.map((value) => {
      value.id = uuid()
    })
    setImgKo(res.data.value.setting.fandiy_tips.ko)
    setImgEn(res.data.value.setting.fandiy_tips.en)
    setImgCh(res.data.value.setting.fandiy_tips.ch)
    setImgEs(res.data.value.setting.fandiy_tips.es)
    setImgJp(res.data.value.setting.fandiy_tips.jp)

    setImgKo2(res.data.value.setting.billboard_tips.ko)
    setImgEn2(res.data.value.setting.billboard_tips.en)
    setImgCh2(res.data.value.setting.billboard_tips.ch)
    setImgEs2(res.data.value.setting.billboard_tips.es)
    setImgJp2(res.data.value.setting.billboard_tips.jp)
  }
  const savePolicyRule = async () => {
    // Provisional modification required.
    if (newImgDiv.length > 0) {
      for (let i = 0; i < newImgDiv.length; i++) {
        newImgDiv[i].remove()
      }
    }

    for (let i = 0; i < imgKo.length; i++) {
      if (imgKo[i].id) {
        delete imgKo[i].id
      }
      if (imgKo[i] instanceof File) {
        const item = await FileApi('policy', imgKo[i])
        const temp = { url: '/' + item.data.value[0].key }
        imgKo[i] = temp
      }
    }

    for (let i = 0; i < imgEn.length; i++) {
      if (imgEn[i].id) {
        delete imgEn[i].id
      }
      if (imgEn[i] instanceof File) {
        const item = await FileApi('policy', imgEn[i])
        const temp = { url: '/' + item.data.value[0].key }
        imgEn[i] = temp
      }
    }

    for (let i = 0; i < imgCh.length; i++) {
      if (imgCh[i].id) {
        delete imgCh[i].id
      }
      if (imgCh[i] instanceof File) {
        const item = await FileApi('policy', imgCh[i])
        const temp = { url: '/' + item.data.value[0].key }
        imgCh[i] = temp
      }
    }

    for (let i = 0; i < imgEs.length; i++) {
      if (imgEs[i].id) {
        delete imgEs[i].id
      }
      if (imgEs[i] instanceof File) {
        const item = await FileApi('policy', imgEs[i])
        const temp = { url: '/' + item.data.value[0].key }
        imgEs[i] = temp
      }
    }

    for (let i = 0; i < imgJp.length; i++) {
      if (imgJp[i].id) {
        delete imgJp[i].id
      }
      if (imgJp[i] instanceof File) {
        const item = await FileApi('policy', imgJp[i])
        const temp = { url: '/' + item.data.value[0].key }
        imgJp[i] = temp
      }
    }

    //=======================================================
    for (let i = 0; i < imgKo2.length; i++) {
      if (imgKo2[i].id) {
        delete imgKo2[i].id
      }
      if (imgKo2[i] instanceof File) {
        const item = await FileApi('policy', imgKo2[i])
        const temp = { url: '/' + item.data.value[0].key }
        imgKo2[i] = temp
      }
    }

    for (let i = 0; i < imgEn2.length; i++) {
      if (imgEn2[i].id) {
        delete imgEn2[i].id
      }
      if (imgEn2[i] instanceof File) {
        const item = await FileApi('policy', imgEn2[i])
        const temp = { url: '/' + item.data.value[0].key }
        imgEn2[i] = temp
      }
    }

    for (let i = 0; i < imgCh2.length; i++) {
      if (imgCh2[i].id) {
        delete imgCh2[i].id
      }
      if (imgCh2[i] instanceof File) {
        const item = await FileApi('policy', imgCh2[i])
        const temp = { url: '/' + item.data.value[0].key }
        imgCh2[i] = temp
      }
    }

    for (let i = 0; i < imgEs2.length; i++) {
      if (imgEs2[i].id) {
        delete imgEs2[i].id
      }
      if (imgEs2[i] instanceof File) {
        const item = await FileApi('policy', imgEs2[i])
        const temp = { url: '/' + item.data.value[0].key }
        imgEs2[i] = temp
      }
    }

    for (let i = 0; i < imgJp2.length; i++) {
      if (imgJp2[i].id) {
        delete imgJp2[i].id
      }
      if (imgJp2[i] instanceof File) {
        const item = await FileApi('policy', imgJp2[i])
        const temp = { url: '/' + item.data.value[0].key }
        imgJp2[i] = temp
      }
    }
    const data = {
      setting: {
        point_for_subscribe: {
          1: pointForSubscribe[1],
          2: pointForSubscribe[2],
          3: pointForSubscribe[3],
          4: pointForSubscribe[4],
        },
        point_for_share: {
          1: pointForShare[1],
          2: pointForShare[2],
          3: pointForShare[3],
          4: pointForShare[4],
        },
        point_change_nickname: pointChangeNickname,
        max_change_free_nickname: maxChangeFreeNickname,
        fandiy_tips: {
          ko: imgKo,
          en: imgEn,
          ch: imgCh,
          jp: imgJp,
          es: imgEs,
        },
        billboard_tips: {
          ko: imgKo2,
          en: imgEn2,
          ch: imgCh2,
          jp: imgJp2,
          es: imgEs2,
        },
        account_del_tips: delPolicy,
        profile_edit_tips: profilePolicy,
      },
    }

    const res = await axios
      .post(`/api/setting/basicpolicy/tips`, data, headerConfig)
      .catch((err) => {
        statusCatch(err)
        if (err.response.status === 400) {
          alert('등록에 실패했습니다.')
        }
      })

    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('등록에 실패했습니다.')
    }
  }

  // const modifyImg = async (img) => {
  //   for (let i = 0; i < img.length; i++) {

  //     if (img[i] instanceof File) {
  //       const item = await FileApi('policy', img[i])
  //       const temp = { url: '/' + item.data.value[0].key }
  //       img[i] = temp
  //     }
  //   }
  //   return img
  // }
  // active key === 3
  const getPolicyClause = async () => {
    const res = await axios
      .get(`/api/setting/basicpolicy/clause`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPolicyClause(res.data.value)
    setClauseSetting(res.data.value.setting)
  }
  const savePolicyClause = async () => {
    const data = {
      setting: clauseSetting,
    }
    const res = await axios
      .post(`/api/setting/basicpolicy/clause`, data, headerConfig)
      .catch((err) => statusCatch(err))

    if (res.data.success) {
      setIsOkCheckClause(true)
    } else {
      alert('등록에 실패했습니다.')
    }
  }
  // Modal popup
  const modalOkEvent = (value) => {
    if (value) {
      setIsEditPolicy(false)
      savePolicyRule()
    } else {
      setIsEditPolicy(false)
    }
  }
  const modalOkEventClause = (value) => {
    if (value) {
      setIsEditClause(false)
      savePolicyClause()
    } else {
      setIsEditClause(false)
    }
  }
  // active key === 2
  const getPolicyInfo = async (params) => {
    if (!params) {
      params = {}
    }

    if (params.page === undefined) {
      params.page = page
    }
    if (params.status === undefined) {
      params.status = isStatus
    }
    const queries = []
    if (params.page === 1) {
      queries.push(`page=1`)
      queries.push(`limit=30`)
    } else {
      queries.push(`page=${params.page}`)
      queries.push(`limit=${30 * params.page}`)
    }
    queries.push(`status=${params.status}`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios
      .get(`/api/setting/basicpolicy${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    console.log(res.data.value)
    setLoading(false)
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    setInfoSetting(res.data.value)
    /*    if (params.page > 1) {
      res.data.value.setting.map((value) => listTab.push(value))
      setListTab([...listTab])
    } else {*/
    setListTab(res.data.value.setting)
    // setDate(res.data.value.created_at)
  }
  // PaginationUser

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = listTab.slice(indexOfFirstPost, indexOfLastPost)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
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
                기본정책 관리(TIP)​
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                className="cursor custom-tab-color-main"
                active={activeKey === 2}
                onClick={() => setActiveKey(2)}
              >
                기본정책 안내​
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                className="cursor custom-tab-color-main"
                active={activeKey === 3}
                onClick={() => setActiveKey(3)}
              >
                약관 안내​
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CTabContent>
              {/* BasicPolicy Rule */}
              <CTabPane role="tabpanel" visible={activeKey === 1}>
                <CCol sm={12} className="d-flex flex-column">
                  {/*Version*/}
                  <CCol className="d-flex flex-column mb-3">
                    <span className="mb-2">version.{policyRule.version}</span>
                    <CCol className="d-flex flex-row">
                      <span>{moment(policyRule.updated_at).format('YYYY-MM-DD HH:mm:ss')}에 </span>
                      <span className="text-info">
                        {policyRule.action.first_name} {policyRule.action.last_name}
                      </span>
                      <span>마지막 정책 수정</span>
                    </CCol>
                  </CCol>
                  <CRow className="d-flex flex-row align-items-center">
                    {/*Top*/}
                    <CCol sm={8} className="d-flex flex-column">
                      {/*Point*/}
                      <CCol sm={12} className="d-flex flex-row">
                        <CCol
                          sm={4}
                          className="d-flex flex-column justify-content-end align-items-start me-3"
                        >
                          <div className="mb-2">신규가입 보상​</div>
                          <CCol sm={12} className="d-flex flex-row align-items-center">
                            <CFormLabel className="text-nowrap" style={{ marginRight: '15px' }}>
                              하트1​
                            </CFormLabel>
                            <CFormInput
                              defaultValue={pointForSubscribe[1]}
                              onChange={(e) =>
                                setPointForSubscribe({
                                  ...pointForSubscribe,
                                  1: e.target.value,
                                })
                              }
                              type="number"
                              onKeyPress={(e) => {
                                let ch = String.fromCharCode(e.which)
                                if (!/[0-9]/.test(ch)) {
                                  e.preventDefault()
                                }
                              }}
                              className="text-end w-100"
                              placeholder="100​"
                            />
                            <span className="ms-2">P​</span>
                          </CCol>
                          <CCol sm={12} className="d-flex flex-row my-2 align-items-center">
                            <CFormLabel className="text-nowrap" style={{ marginRight: '15px' }}>
                              하트2​
                            </CFormLabel>
                            <CFormInput
                              defaultValue={ruleSetting.point_for_subscribe[2]}
                              onChange={(e) =>
                                setPointForSubscribe({
                                  ...pointForSubscribe,
                                  2: e.target.value,
                                })
                              }
                              type="number"
                              onKeyPress={(e) => {
                                let ch = String.fromCharCode(e.which)
                                if (!/[0-9]/.test(ch)) {
                                  e.preventDefault()
                                }
                              }}
                              className="text-end"
                              placeholder="0"
                            />
                            <span className="ms-2">P​</span>
                          </CCol>
                          <CCol sm={12} className="d-flex flex-row align-items-center">
                            <CFormLabel className="text-nowrap" style={{ marginRight: '22px' }}>
                              스타​
                            </CFormLabel>
                            <CFormInput
                              defaultValue={ruleSetting.point_for_subscribe[3]}
                              onChange={(e) =>
                                setPointForSubscribe({
                                  ...pointForSubscribe,
                                  3: e.target.value,
                                })
                              }
                              type="number"
                              onKeyPress={(e) => {
                                let ch = String.fromCharCode(e.which)
                                if (!/[0-9]/.test(ch)) {
                                  e.preventDefault()
                                }
                              }}
                              className="text-end"
                              placeholder="0"
                            />
                            <span className="ms-2">P​</span>
                          </CCol>
                          <CCol sm={12} className="d-flex flex-row mt-2 align-items-center">
                            <CFormLabel className="text-nowrap" style={{ marginRight: '22px' }}>
                              팬픽​
                            </CFormLabel>
                            <CFormInput
                              defaultValue={ruleSetting.point_for_subscribe[4]}
                              onChange={(e) =>
                                setPointForSubscribe({
                                  ...pointForSubscribe,
                                  4: e.target.value,
                                })
                              }
                              type="number"
                              onKeyPress={(e) => {
                                let ch = String.fromCharCode(e.which)
                                if (!/[0-9]/.test(ch)) {
                                  e.preventDefault()
                                }
                              }}
                              className="text-end"
                              placeholder="0"
                            />
                            <span className="ms-2">P​</span>
                          </CCol>
                        </CCol>
                        <CCol sm={3} className="d-flex flex-column justify-content-start">
                          <div className="mb-2" style={{ width: '120px' }}>
                            친구추천 보상​​
                          </div>
                          <CCol sm={12} className="d-flex flex-row align-items-center">
                            <CFormInput
                              defaultValue={pointForShare[1]}
                              onChange={(e) =>
                                setPointForShare({
                                  ...pointForShare,
                                  1: e.target.value,
                                })
                              }
                              type="number"
                              onKeyPress={(e) => {
                                let ch = String.fromCharCode(e.which)
                                if (!/[0-9]/.test(ch)) {
                                  e.preventDefault()
                                }
                              }}
                              className="text-end w-100"
                              placeholder="100​"
                            />
                            <span className="ms-2">P​</span>
                          </CCol>
                          <CCol sm={12} className="d-flex flex-row my-2 align-items-center">
                            <CFormInput
                              defaultValue={pointForShare[2]}
                              onChange={(e) =>
                                setPointForShare({
                                  ...pointForShare,
                                  2: e.target.value,
                                })
                              }
                              type="number"
                              onKeyPress={(e) => {
                                let ch = String.fromCharCode(e.which)
                                if (!/[0-9]/.test(ch)) {
                                  e.preventDefault()
                                }
                              }}
                              className="text-end"
                              placeholder="100​"
                            />
                            <span className="ms-2">P​</span>
                          </CCol>
                          <CCol sm={12} className="d-flex flex-row align-items-center">
                            <CFormInput
                              defaultValue={pointForShare[3]}
                              onChange={(e) =>
                                setPointForShare({
                                  ...pointForShare,
                                  3: e.target.value,
                                })
                              }
                              type="number"
                              onKeyPress={(e) => {
                                let ch = String.fromCharCode(e.which)
                                if (!/[0-9]/.test(ch)) {
                                  e.preventDefault()
                                }
                              }}
                              className="text-end"
                              placeholder="0"
                            />
                            <span className="ms-2">P​</span>
                          </CCol>
                          <CCol sm={12} className="d-flex flex-row mt-2 align-items-center">
                            <CFormInput
                              defaultValue={pointForShare[4]}
                              onChange={(e) =>
                                setPointForShare({
                                  ...pointForShare,
                                  4: e.target.value,
                                })
                              }
                              type="number"
                              onKeyPress={(e) => {
                                let ch = String.fromCharCode(e.which)
                                if (!/[0-9]/.test(ch)) {
                                  e.preventDefault()
                                }
                              }}
                              className="text-end"
                              placeholder="0"
                            />
                            <span className="ms-2">P​</span>
                          </CCol>
                        </CCol>
                      </CCol>
                    </CCol>
                    {/*Second Column*/}
                    <CCol sm={4} className="mb-4 d-flex flex-column">
                      <div className="mb-4 d-flex flex-column">
                        <span>닉네임 수정 포인트​​</span>
                        <div className="d-flex flex-row align-items-center mt-2">
                          <CFormInput
                            defaultValue={pointChangeNickname}
                            onChange={(e) => setPointChangeNickname(e.target.value)}
                            placeholder="5"
                            className="text-end me-2"
                            type="number"
                            onKeyPress={(e) => {
                              let ch = String.fromCharCode(e.which)
                              if (!/[0-9]/.test(ch)) {
                                e.preventDefault()
                              }
                            }}
                          />
                          <span style={{ width: '50px' }}>P​</span>
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <span>닉네임 무료수정 횟수​​​</span>
                        <div className="d-flex flex-row align-items-center mt-2">
                          <CFormInput
                            defaultValue={maxChangeFreeNickname}
                            onChange={(e) => setMaxChangeFreeNickname(e.target.value)}
                            placeholder="1"
                            className="text-end me-2"
                            type="number"
                            onKeyPress={(e) => {
                              let ch = String.fromCharCode(e.which)
                              if (!/[0-9]/.test(ch)) {
                                e.preventDefault()
                              }
                            }}
                          />
                          <span style={{ width: '50px' }}>횟수​</span>
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow className="mt-4">
                    {/*Tip 1*/}
                    <CCol sm={5} className="d-flex flex-column">
                      <span>기본정책 TIP 이미지 (권장 : 0000 X 000 JPEG)​​</span>
                      <span className="my-2 ms-4 mb-4">
                        ▷팬DIY TIP 업로드 (팬DIY 글쓰기 페이지 내 팁 페이지)​​​
                      </span>
                      {/*1*/}
                      <div className="d-flex flex-column">
                        <div className="d-flex flex-row align-items-start">
                          <span style={{ width: '80px' }}>한국어​</span>
                          <CCol>
                            <FileBtn
                              name="사진"
                              title="policy"
                              fileData={(data) => {
                                imgKo.push(data)
                              }}
                              deleteData={(data) => {
                                const arrIndex = imgKo.findIndex((i) => i === data)
                                imgKo.splice(arrIndex, 1)
                              }}
                              newImg={(data) => {
                                newImgDiv.push(data)
                              }}
                              accept="image/*"
                              id="main"
                              imageUrl="multi"
                              multiImg={imgKo}
                              multiple={true}
                              count={5}
                            />
                          </CCol>
                        </div>
                      </div>
                      <div className="d-flex flex-column my-4">
                        <div className="d-flex flex-row align-items-start">
                          <span style={{ width: '80px' }}>영어​</span>
                          <CCol>
                            <FileBtn
                              name="사진"
                              title="policy"
                              fileData={(data) => {
                                imgEn.push(data)
                              }}
                              deleteData={(data) => {
                                const arrIndex = imgEn.findIndex((i) => i === data)
                                imgEn.splice(arrIndex, 1)
                              }}
                              newImg={(data) => {
                                newImgDiv.push(data)
                              }}
                              accept="image/*"
                              id="main2"
                              imageUrl="multi"
                              multiImg={imgEn}
                              multiple={true}
                              count={5}
                            />
                          </CCol>
                        </div>
                      </div>
                      <div className="d-flex flex-column my-4">
                        <div className="d-flex flex-row align-items-start">
                          <span style={{ width: '80px' }}>중국어​</span>
                          <CCol>
                            <FileBtn
                              name="사진"
                              title="policy"
                              fileData={(data) => {
                                imgCh.push(data)
                              }}
                              deleteData={(data) => {
                                const arrIndex = imgCh.findIndex((i) => i === data)
                                imgCh.splice(arrIndex, 1)
                              }}
                              newImg={(data) => {
                                newImgDiv.push(data)
                              }}
                              accept="image/*"
                              id="main3"
                              imageUrl="multi"
                              multiImg={imgCh}
                              multiple={true}
                              count={5}
                            />
                          </CCol>
                        </div>
                      </div>
                      <div className="d-flex flex-column my-4">
                        <div className="d-flex flex-row align-items-start">
                          <span style={{ width: '80px' }}>일본어​</span>
                          <CCol>
                            <FileBtn
                              name="사진"
                              title="policy"
                              fileData={(data) => {
                                imgJp.push(data)
                              }}
                              deleteData={(data) => {
                                const arrIndex = imgJp.findIndex((i) => i === data)
                                imgJp.splice(arrIndex, 1)
                              }}
                              newImg={(data) => {
                                newImgDiv.push(data)
                              }}
                              accept="image/*"
                              id="main4"
                              imageUrl="multi"
                              multiImg={imgJp}
                              multiple={true}
                              count={5}
                            />
                          </CCol>
                        </div>
                      </div>
                      <div className="d-flex flex-column my-4">
                        <div className="d-flex flex-row align-items-start">
                          <span style={{ width: '80px' }}>스페인어​</span>
                          <CCol>
                            <FileBtn
                              name="사진"
                              title="policy"
                              fileData={(data) => {
                                imgEs.push(data)
                              }}
                              deleteData={(data) => {
                                const arrIndex = imgEs.findIndex((i) => i === data)
                                imgEs.splice(arrIndex, 1)
                              }}
                              newImg={(data) => {
                                newImgDiv.push(data)
                              }}
                              accept="image/*"
                              id="main5"
                              imageUrl="multi"
                              multiImg={imgEs}
                              multiple={true}
                              count={5}
                            />
                          </CCol>
                        </div>
                      </div>
                    </CCol>
                    <CCol sm={2} />
                    {/*Tip 2*/}
                    <CCol sm={5}>
                      {/*Tip2*/}
                      <CCol>
                        <CCol className="d-flex flex-column mt-4">
                          <div>▷전광판 TIP 업로드 (전광판 상단 배너 클릭시 팁 페이지)​</div>
                          <div className="d-flex flex-row align-items-start mt-3">
                            <span style={{ width: '80px' }}>한국어​</span>
                            <CCol>
                              <FileBtn
                                name="사진"
                                title="policy"
                                fileData={(data) => {
                                  imgKo2.push(data)
                                }}
                                deleteData={(data) => {
                                  const arrIndex = imgKo2.findIndex((i) => i === data)
                                  imgKo2.splice(arrIndex, 1)
                                }}
                                newImg={(data) => {
                                  newImgDiv.push(data)
                                }}
                                accept="image/*"
                                id="board1"
                                imageUrl="multi"
                                multiImg={imgKo2}
                                multiple={true}
                                count={5}
                              />
                            </CCol>
                          </div>
                        </CCol>
                        <CCol className="d-flex flex-column mt-4">
                          <div className="d-flex flex-row align-items-start">
                            <span style={{ width: '80px' }}>영어​</span>
                            <CCol>
                              <FileBtn
                                name="사진"
                                title="policy"
                                fileData={(data) => {
                                  imgEn2.push(data)
                                }}
                                deleteData={(data) => {
                                  const arrIndex = imgEn2.findIndex((i) => i === data)
                                  imgEn2.splice(arrIndex, 1)
                                }}
                                newImg={(data) => {
                                  newImgDiv.push(data)
                                }}
                                accept="image/*"
                                id="board2"
                                imageUrl="multi"
                                multiImg={imgEn2}
                                multiple={true}
                                count={5}
                              />
                            </CCol>
                          </div>
                        </CCol>
                        <CCol className="d-flex flex-column mt-4">
                          <div className="d-flex flex-row align-items-start">
                            <span style={{ width: '80px' }}>중국어​</span>
                            <CCol>
                              <FileBtn
                                name="사진"
                                title="policy"
                                fileData={(data) => {
                                  imgCh2.push(data)
                                }}
                                deleteData={(data) => {
                                  const arrIndex = imgCh2.findIndex((i) => i === data)
                                  imgCh2.splice(arrIndex, 1)
                                }}
                                newImg={(data) => {
                                  newImgDiv.push(data)
                                }}
                                accept="image/*"
                                id="board3"
                                imageUrl="multi"
                                multiImg={imgCh2}
                                multiple={true}
                                count={5}
                              />
                            </CCol>
                          </div>
                        </CCol>
                        <CCol className="d-flex flex-column mt-4">
                          <div className="d-flex flex-row align-items-start">
                            <span style={{ width: '80px' }}>일본어​</span>
                            <CCol>
                              <FileBtn
                                name="사진"
                                title="policy"
                                fileData={(data) => {
                                  imgJp2.push(data)
                                }}
                                deleteData={(data) => {
                                  const arrIndex = imgJp2.findIndex((i) => i === data)
                                  imgJp2.splice(arrIndex, 1)
                                }}
                                newImg={(data) => {
                                  newImgDiv.push(data)
                                }}
                                accept="image/*"
                                id="board4"
                                imageUrl="multi"
                                multiImg={imgJp2}
                                multiple={true}
                                count={5}
                              />
                            </CCol>
                          </div>
                        </CCol>
                        <CCol className="d-flex flex-column mt-4">
                          <div className="d-flex flex-row align-items-center">
                            <span style={{ width: '80px' }}>스페인어​</span>
                            <CCol>
                              <FileBtn
                                name="사진"
                                title="policy"
                                fileData={(data) => {
                                  imgEs2.push(data)
                                }}
                                deleteData={(data) => {
                                  const arrIndex = imgEs2.findIndex((i) => i === data)
                                  imgEs2.splice(arrIndex, 1)
                                }}
                                newImg={(data) => {
                                  newImgDiv.push(data)
                                }}
                                accept="image/*"
                                id="board5"
                                imageUrl="multi"
                                multiImg={imgEs2}
                                multiple={true}
                                count={5}
                              />
                            </CCol>
                          </div>
                        </CCol>
                      </CCol>
                    </CCol>
                  </CRow>
                </CCol>
                <CRow className="d-flex align-items-start">
                  <CCol>
                    <div className="d-flex flex-column justify-content-between">
                      <div className="mb-2 ms-4 text-bold">계정탈퇴정책</div>
                      <div className="d-flex flex-row mt-2">
                        <span style={{ width: '100px' }}>한국어​</span>
                        <CFormTextarea
                          defaultValue={delPolicy.ko}
                          onChange={(e) => {
                            setDelPolicy({ ...delPolicy, ko: e.target.value })
                          }}
                          placeholder="내용을 입력하세요"
                        />
                      </div>
                      <div className="d-flex flex-row mt-2">
                        <span style={{ width: '100px' }}>영어​</span>
                        <CFormTextarea
                          defaultValue={delPolicy.en}
                          onChange={(e) => {
                            setDelPolicy({ ...delPolicy, en: e.target.value })
                          }}
                          placeholder="내용을 입력하세요"
                        />
                      </div>
                      <div className="d-flex flex-row mt-2">
                        <span style={{ width: '100px' }}>중국어​</span>
                        <CFormTextarea
                          defaultValue={delPolicy.ch}
                          onChange={(e) => {
                            setDelPolicy({ ...delPolicy, ch: e.target.value })
                          }}
                          placeholder="내용을 입력하세요"
                        />
                      </div>
                      <div className="d-flex flex-row mt-2">
                        <span style={{ width: '100px' }}>일본어​</span>
                        <CFormTextarea
                          defaultValue={delPolicy.jp}
                          onChange={(e) => {
                            setDelPolicy({ ...delPolicy, jp: e.target.value })
                          }}
                          placeholder="내용을 입력하세요"
                        />
                      </div>
                      <div className="d-flex flex-row mt-2">
                        <span style={{ width: '100px' }}>스페인어​</span>
                        <CFormTextarea
                          defaultValue={delPolicy.es}
                          onChange={(e) => {
                            setDelPolicy({ ...delPolicy, es: e.target.value })
                          }}
                          placeholder="내용을 입력하세요"
                        />
                      </div>
                    </div>
                  </CCol>
                  <CCol sm={1} />
                  <CCol>
                    <div className="d-flex flex-column justify-content-between mb-4">
                      <div className="mb-2 ms-4 text-bold">프로필 수정 정책</div>
                      <div className="d-flex flex-row mt-2">
                        <span style={{ width: '100px' }}>한국어​</span>
                        <CFormTextarea
                          defaultValue={profilePolicy.ko}
                          onChange={(e) => {
                            setProfilePolicy({ ...profilePolicy, ko: e.target.value })
                          }}
                          placeholder="내용을 입력하세요"
                        />
                      </div>
                      <div className="d-flex flex-row mt-2">
                        <span style={{ width: '100px' }}>영어​</span>
                        <CFormTextarea
                          defaultValue={profilePolicy.en}
                          onChange={(e) => {
                            setProfilePolicy({ ...profilePolicy, en: e.target.value })
                          }}
                          placeholder="내용을 입력하세요"
                        />
                      </div>
                      <div className="d-flex flex-row mt-2">
                        <span style={{ width: '100px' }}>중국어​</span>
                        <CFormTextarea
                          defaultValue={profilePolicy.ch}
                          onChange={(e) => {
                            setProfilePolicy({ ...profilePolicy, ch: e.target.value })
                          }}
                          placeholder="내용을 입력하세요"
                        />
                      </div>
                      <div className="d-flex flex-row mt-2">
                        <span style={{ width: '100px' }}>일본어​</span>
                        <CFormTextarea
                          defaultValue={profilePolicy.jp}
                          onChange={(e) => {
                            setProfilePolicy({ ...profilePolicy, jp: e.target.value })
                          }}
                          placeholder="내용을 입력하세요"
                        />
                      </div>
                      <div className="d-flex flex-row mt-2">
                        <span style={{ width: '100px' }}>스페인어​</span>
                        <CFormTextarea
                          defaultValue={profilePolicy.es}
                          onChange={(e) => {
                            setProfilePolicy({ ...profilePolicy, es: e.target.value })
                          }}
                          placeholder="내용을 입력하세요"
                        />
                      </div>
                    </div>
                  </CCol>
                </CRow>
                {role === one && (
                  <CButton
                    color="dark"
                    style={{ color: 'white' }}
                    size="sm"
                    className="float-end px-5"
                    onClick={() => setIsEditPolicy(true)}
                  >
                    저장
                  </CButton>
                )}
              </CTabPane>
              {/* BasicPolicy Info */}
              <CTabPane role="tabpanel" visible={activeKey === 2}>
                <CCol className="d-flex flex-column">
                  <CCol className="d-flex flex-column mb-3">
                    <span className="mb-2">version.{infoSetting.version}</span>
                    <CCol className="d-flex flex-row">
                      <span>
                        {moment(policyClause.updated_at).format('YYYY-MM-DD HH:mm:ss')}에{' '}
                      </span>
                      <span className="text-info">
                        {infoSetting.action.first_name} {infoSetting.action.last_name}
                      </span>
                      <span>마지막 정책 수정</span>
                    </CCol>
                  </CCol>
                </CCol>
                <CCol sm={4} className="d-flex flex-row align-items-center mb-2">
                  <CFormSelect
                    style={{ width: '130px' }}
                    size="lg"
                    aria-label="Large select example"
                    className="search-bar__select me-2"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="1">정상​</option>
                    <option value="0">비활성​</option>
                    <option value="-1">삭제​</option>
                  </CFormSelect>
                  <CButton
                    type="button"
                    style={{ color: 'white' }}
                    color="info"
                    id="basic-addon1"
                    onClick={() => {
                      getPolicyInfo({ page: 1 })
                      setPage(1)
                    }}
                  >
                    조회​
                  </CButton>
                </CCol>
                <CRow className="g-3">
                  <CCol>
                    {role === one && (
                      <CCol className="float-end mb-2">
                        <div className="d-flex flex-row">
                          <CButton
                            onClick={() => {
                              setIsCreateBP(true)
                            }}
                            style={{ color: 'white' }}
                            type="button"
                            color="info"
                            id="basic-addon1"
                          >
                            기본정책 등록
                          </CButton>
                        </div>
                      </CCol>
                    )}
                    {/*Table*/}
                    <CCol>
                      <CTable bordered>
                        <CTableHead>
                          <CTableRow>
                            {tableInfo.map((title, index) => {
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
                        <Posts posts={currentPosts} loading={loading} infoSetting={infoSetting} />
                      </CTable>
                      <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={listTab.length}
                        paginate={paginate}
                      />
                      {page !== pages && (
                        <CButton
                          color="dark"
                          size="sm"
                          className="moreBt"
                          onClick={() => {
                            getPolicyInfo({
                              page: page + 1,
                            })
                            setPage(page + 1)
                          }}
                        >
                          더보기
                        </CButton>
                      )}
                    </CCol>
                  </CCol>
                </CRow>
              </CTabPane>
              {/* BasicPolicy Clause */}
              <CTabPane role="tabpanel" visible={activeKey === 3}>
                <CCol className="d-flex flex-column mb-4">
                  <div>version.{policyClause.version}​</div>
                  <div className="d-flex flex-row">
                    <span>{moment(policyClause.updated_at).format('YYYY-MM-DD HH:mm:ss')}</span>
                    &nbsp;에&nbsp;
                    <span className="text-info">
                      {policyClause.action.last_name}&nbsp;
                      {policyClause.action.first_name}
                    </span>
                    &nbsp;
                    <span>이 마지막 정책 수정​</span>
                  </div>
                </CCol>
                <CRow>
                  <CCol sm={5}>
                    <div className="mb-2">
                      서비스 약관내용
                      <div className="small text-muted">※ 마이페이지 - 설정 - 서비스 약관 노출</div>
                    </div>
                    <div className="d-flex flex-row">
                      <span style={{ width: '100px' }}>한국어​</span>
                      <CFormTextarea
                        placeholder="제목을 입력하세요​​"
                        value={clauseSetting.terms_use.ko}
                        onChange={(e) =>
                          setClauseSetting({
                            ...clauseSetting,
                            terms_use: { ...clauseSetting.terms_use, ko: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="d-flex flex-row my-2">
                      <span style={{ width: '100px' }}>영어​</span>
                      <CFormTextarea
                        placeholder="제목을 입력하세요​"
                        value={clauseSetting.terms_use.en}
                        onChange={(e) =>
                          setClauseSetting({
                            ...clauseSetting,
                            terms_use: { ...clauseSetting.terms_use, en: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="d-flex flex-row">
                      <span style={{ width: '100px' }}>중국어​</span>
                      <CFormTextarea
                        placeholder="제목을 입력하세요​"
                        value={clauseSetting.terms_use.ch}
                        onChange={(e) =>
                          setClauseSetting({
                            ...clauseSetting,
                            terms_use: { ...clauseSetting.terms_use, ch: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="d-flex flex-row my-2">
                      <span style={{ width: '100px' }}>일본어​</span>
                      <CFormTextarea
                        placeholder="제목을 입력하세요​"
                        value={clauseSetting.terms_use.jp}
                        onChange={(e) =>
                          setClauseSetting({
                            ...clauseSetting,
                            terms_use: { ...clauseSetting.terms_use, jp: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="d-flex flex-row">
                      <span style={{ width: '100px' }}>스페인어​</span>
                      <CFormTextarea
                        placeholder="제목을 입력하세요​"
                        value={clauseSetting.terms_use.es}
                        onChange={(e) =>
                          setClauseSetting({
                            ...clauseSetting,
                            terms_use: { ...clauseSetting.terms_use, es: e.target.value },
                          })
                        }
                      />
                    </div>
                  </CCol>
                  <CCol sm={2} />
                  <CCol sm={5}>
                    <div className="mb-2">
                      마케팅 및 광고 동의
                      <div className="small text-muted">
                        ※ 마이페이지 - 설정 - 마케팅 및 광고 동의
                      </div>
                    </div>
                    <div className="d-flex flex-row">
                      <span style={{ width: '100px' }}>한국어​</span>
                      <CFormTextarea
                        placeholder="상세내용을 입력하세요​"
                        value={clauseSetting.open_source_license.ko}
                        onChange={(e) =>
                          setClauseSetting({
                            ...clauseSetting,
                            open_source_license: {
                              ...clauseSetting.open_source_license,
                              ko: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="d-flex flex-row my-2">
                      <span style={{ width: '100px' }}>영어​</span>
                      <CFormTextarea
                        placeholder="상세내용을 입력하세요​"
                        value={clauseSetting.open_source_license.en}
                        onChange={(e) =>
                          setClauseSetting({
                            ...clauseSetting,
                            open_source_license: {
                              ...clauseSetting.open_source_license,
                              en: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="d-flex flex-row">
                      <span style={{ width: '100px' }}>중국어​</span>
                      <CFormTextarea
                        placeholder="상세내용을 입력하세요​"
                        value={clauseSetting.open_source_license.ch}
                        onChange={(e) =>
                          setClauseSetting({
                            ...clauseSetting,
                            open_source_license: {
                              ...clauseSetting.open_source_license,
                              ch: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="d-flex flex-row my-2">
                      <span style={{ width: '100px' }}>일본어​</span>
                      <CFormTextarea
                        placeholder="상세내용을 입력하세요​"
                        value={clauseSetting.open_source_license.jp}
                        onChange={(e) =>
                          setClauseSetting({
                            ...clauseSetting,
                            open_source_license: {
                              ...clauseSetting.open_source_license,
                              jp: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="d-flex flex-row">
                      <span style={{ width: '100px' }}>스페인어​</span>
                      <CFormTextarea
                        placeholder="상세내용을 입력하세요​"
                        value={clauseSetting.open_source_license.es}
                        onChange={(e) =>
                          setClauseSetting({
                            ...clauseSetting,
                            open_source_license: {
                              ...clauseSetting.open_source_license,
                              es: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={5} className="d-flex flex-column mt-5">
                    <div className="mb-2">
                      개인정보 처리 방침
                      <div className="small text-muted">
                        ※ 마이페이지 - 설정 - 개인정보 처리 방침 노출
                      </div>
                    </div>
                    <div className="d-flex flex-row">
                      <span style={{ width: '100px' }}>한국어​</span>
                      <CFormTextarea
                        placeholder="상세내용을 입력하세요​​​"
                        value={clauseSetting.policy.ko}
                        onChange={(e) =>
                          setClauseSetting({
                            ...clauseSetting,
                            policy: { ...clauseSetting.policy, ko: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="d-flex flex-row my-2">
                      <span style={{ width: '100px' }}>영어​</span>
                      <CFormTextarea
                        placeholder="상세내용을 입력하세요​​​"
                        value={clauseSetting.policy.en}
                        onChange={(e) =>
                          setClauseSetting({
                            ...clauseSetting,
                            policy: { ...clauseSetting.policy, en: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="d-flex flex-row">
                      <span style={{ width: '100px' }}>중국어​</span>
                      <CFormTextarea
                        placeholder="상세내용을 입력하세요​​​"
                        value={clauseSetting.policy.ch}
                        onChange={(e) =>
                          setClauseSetting({
                            ...clauseSetting,
                            policy: { ...clauseSetting.policy, ch: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="d-flex flex-row my-2">
                      <span style={{ width: '100px' }}>일본어​</span>
                      <CFormTextarea
                        placeholder="상세내용을 입력하세요​​​"
                        value={clauseSetting.policy.jp}
                        onChange={(e) =>
                          setClauseSetting({
                            ...clauseSetting,
                            policy: { ...clauseSetting.policy, jp: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="d-flex flex-row">
                      <span style={{ width: '100px' }}>스페인어​</span>
                      <CFormTextarea
                        placeholder="상세내용을 입력하세요​​​"
                        value={clauseSetting.policy.es}
                        onChange={(e) =>
                          setClauseSetting({
                            ...clauseSetting,
                            policy: { ...clauseSetting.policy, es: e.target.value },
                          })
                        }
                      />
                    </div>
                  </CCol>
                </CRow>
                {role === one && (
                  <CRow>
                    <CCol>
                      <CButton
                        onClick={() => setIsEditClause(true)}
                        color="dark"
                        style={{ color: 'white' }}
                        size="sm"
                        className="float-end px-5 fs-6"
                      >
                        저장
                      </CButton>
                    </CCol>
                  </CRow>
                )}
                {isEditClause && role === one && (
                  <CheckPopup
                    onClickClose={() => setIsEditClause(false)}
                    bodyContent={'약관 안내 내용을 수정 하시겠습니까?'}
                    onCheked={(value) => modalOkEventClause(value)}
                  />
                )}
                {isOkCheckClause && (
                  <NormalPopup
                    onClickClose={() => {
                      getPolicyClause()
                      setIsOkCheckClause(false)
                    }}
                    bodyContent={'수정이 완료되었습니다.'}
                  />
                )}
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
      {isEditPolicy && role === one && (
        <CheckPopup
          onClickClose={() => setIsEditPolicy(false)}
          bodyContent={'기본 정책을 변경하시겠습니까?'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => {
            setIsOkCheck(false)
            getPolicyRule()
          }}
          bodyContent={'수정이 완료되었습니다.'}
        />
      )}
      {isCreateBP && role === one && (
        <CreateBasicPolicy
          onClickClose={() => setIsCreateBP(false)}
          onCloseOkEvent={() => {
            getPolicyInfo()
            setIsCreateBP(false)
          }}
        />
      )}
      {isPolicyDetail.use && (
        <BasicPolicyDetail
          onClickClose={() => setIsPolicyDetail({ use: false, id: '' })}
          onId={isPolicyDetail.id}
          onCloseOkEvent={() => {
            getPolicyInfo()
            setIsPolicyDetail({ use: false, id: '' })
          }}
        />
      )}
      {isCreateNotice && <CreateBasicPolicy onClickClose={() => setIsCreateNotice(false)} />}
      {isPopUpDetail && <BasicPolicyDetail onClickClose={() => setIsPopUpDetail(false)} />}
    </CRow>
  )
}
BasicPolicyRule.propTypes = {
  history: PropTypes.object,
}

export default BasicPolicyRule
