import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalBody,
  CCol,
  CRow,
  CForm,
  CFormSelect,
  CImage,
  CModalFooter,
  CTabContent,
  CTabPane,
  CButton,
  CNav,
  CNavLink,
  CNavItem,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
} from '@coreui/react'
import { cilReload, cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'
import { ArtistDetail } from 'src/views/artist/popup/ArtistDetail'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'
import { ImgBig } from 'src/components/publicPopup/ImgBig'
import moment from 'moment'
import { CheckPopup } from '../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../components/publicPopup/NormalPopup'
import { NickNameLog } from './NicknameLog'

export const UserDetail = ({ onClickClose, onId, onCloseOkEvent, onStatus }) => {
  const one = 1
  const [isArtistDetailModal, setIsArtistDetailModal] = useState({
    use: false,
    id: '',
  })
  const [isNicknameLog, setNicknameLog] = useState({
    use: false,
    id: '',
  })
  const [isOkCheck, setIsOkCheck] = useState(false)
  const [isOkCheckPass, setIsOkCheckPass] = useState(false)
  const [isOkCheckReg, setIsOkCheckReg] = useState(false)
  const [isOkCheckBlock, setIsOkCheckBlock] = useState(false)
  const [isOkCheckUnBlock, setIsOkCheckUnBlock] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [isBlock, setIsBlock] = useState(false)
  const [isUnBlock, setIsUnBlock] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [isTempPass, setTempPass] = useState(false)
  const [isType, setType] = useState('')
  const [count, setCount] = useState('')
  const [role, setRole] = useState('')
  const [isOrder, setOrder] = useState('all')
  const [isOrderSearch, setOrderSearch] = useState('all')
  const [sort, setSort] = useState('')
  const [isPlatform, setPlatform] = useState('')
  const [activeKey, setActiveKey] = useState(1)
  const tableTitlePoint = [
    { label: '??????' },
    { label: '??????' },
    { label: '?????????' },
    { label: '??????' },
    { label: '??????' },
    { label: '??????' },
  ]
  const tableTitleExp = [{ label: '??????' }, { label: '????????? ??????' }, { label: '?????????' }]
  const tableTitlePay = [{ label: '??????' }, { label: '????????????' }, { label: '?????? ID' }]
  const tableTitleArtist = [{ label: '???????????? ??????' }, { label: '?????????' }]
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  }) // img detail
  const [listTab1, setListTab1] = useState({
    avatar: '',
    nickname: '',
    status: '',
    birth: '',
    language: '',
    tz: '',
    email: '',
    created_at: '',
    last_seen: '',
    gender: '',
    oauth: '',
    device: {
      model: '',
      platform: '',
      ver_app: '',
    },
    ad_token: 'none',
    ad_policy: 0,
    token: '',
    level: '',
    exp: '',
    follow_cnt: '',
    subscriber_cnt: '',
    cash_point: '',
    star_point: '',
    heart_1: '',
    heart_2: '',
    gold_point: '',
    cid: '',
    stat_attendance: {
      all: {
        total: 0,
        consistent: 0,
      },
      last_days: {
        total: 0,
        consistent: 0,
      },
    },
  })
  const [listTabPoint, setListTabPoint] = useState([])
  const [pages1, setPages1] = useState(1)
  const [pagePoint, setPagePoint] = useState(1)
  const [listTabExp, setListTabExp] = useState([])
  const [pages2, setPages2] = useState(1)
  const [pageExp, setPageExp] = useState(1)
  const [listTabPay, setListTabPay] = useState([])
  const [pages3, setPages3] = useState(1)
  const [pagePay, setPagePay] = useState(1)
  const [listTabArtist, setListTabArtist] = useState([])
  const [pageArtist, setPageArtist] = useState(1)
  const [pages4, setPages4] = useState(1)

  useEffect(() => {
    if (activeKey === 1) {
      getUserInfo()
    }
    if (activeKey === 2) {
      getUserPoint()
    }
    if (activeKey === 3) {
      getUserExp()
    }
    if (activeKey === 4) {
      getUserPay()
    }
    if (activeKey === 5) {
      getUserArtist()
    }
  }, [activeKey])
  // User Informagion Tap
  const getUserInfo = async () => {
    let status = onStatus ? onStatus : 'all'
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
    const res = await axios
      .get(`/api/user?id=${onId}&status=${status}&stat=1`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setListTab1(res.data.value)
  }
  // activeKey === 2
  const getUserPoint = async (params) => {
    if (!params) {
      params = {}
    }
    if (params.page === undefined) {
      params.page = pagePoint
    }
    if (params.type === undefined) {
      params.type = isType
    }
    if (params.count === undefined) {
      params.count = count
    }

    const queries = []
    if (params.page === 1) {
      queries.push(`page=1`)
      queries.push(`limit=${30 * params.page}`)
    } else {
      queries.push(`page=${params.page}`)
      queries.push(`limit=30`)
    }
    queries.push(`user_id=${onId}`)
    if (params.type !== 'all') queries.push(`type=${params.type}`)
    if (params.count) queries.push(`count=${params.count}`)
    // deddhhhggg
    // 2hwtj33cuh3352u53wt
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/user/point/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPages1(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => listTabPoint.push(value))
      setListTabPoint([...listTabPoint])
    } else {
      setListTabPoint(res.data.value.items)
    }
  }
  // activeKey === 3
  const getUserExp = async (params) => {
    if (!params) {
      params = {}
    }
    if (params.page === undefined) {
      params.page = pagePoint
    }
    const queries = []
    if (params.page === 1) {
      queries.push(`page=1`)
      queries.push(`limit=${30 * params.page}`)
    } else {
      queries.push(`page=${params.page}`)
      queries.push(`limit=30`)
    }
    queries.push(`user_id=${onId}`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/user/exp/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPages2(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => listTabExp.push(value))
      setListTabExp([...listTabExp])
    } else {
      setListTabExp(res.data.value.items)
    }
  }
  const getUserPay = async (params) => {
    if (!params) {
      params = {}
    }
    if (params.page === undefined) {
      params.page = pagePoint
    }
    if (params.filter_platform === undefined) {
      params.filter_platform = isPlatform
    }
    const queries = []
    if (params.page > 1) {
      queries.push(`page=1`)
      queries.push(`limit=${30 * params.page}`)
    } else {
      queries.push(`page=${params.page}`)
      queries.push(`limit=30`)
    }
    queries.push(`user_id=${onId}`)
    if (params.filter_platform !== 'all') {
      queries.push(`filter_platform=${params.filter_platform}`)
    }
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/purchase/cash/grid${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) return
    setPages3(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => listTabPay.push(value))
      setListTabPay([...listTabPay])
    } else {
      setListTabPay(res.data.value.items)
    }
  }
  const getUserArtist = async (params) => {
    if (!params) {
      params = {}
    }
    if (params.page === undefined) {
      params.page = pagePoint
    }
    const queries = []
    if (params.page === 1) {
      queries.push(`page=1`)
      queries.push(`limit=${30 * params.page}`)
    } else {
      queries.push(`page=${params.page}`)
      queries.push(`limit=30`)
    }
    queries.push(`user_id=${onId}`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/artist/favorite/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPages4(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => listTabArtist.push(value))
      setListTabArtist([...listTabArtist])
    } else {
      setListTabArtist(res.data.value.items)
    }
  }

  function isEmptyObj(obj) {
    if (obj.constructor === Object && Object.keys(obj).length === 0) {
      return true
    }

    return false
  }
  const modalOkEvent = (value) => {
    setIsArtistDetailModal({
      ...isArtistDetailModal,
      use: false,
    })
  }
  const deleteOkEvent = (value) => {
    if (value) {
      setIsDelete(false)
      userDelete()
    } else {
      setIsDelete(false)
    }
  }
  const blockOkEvent = (value) => {
    if (value) {
      setIsBlock(false)
      userBlock()
    } else {
      setIsBlock(false)
    }
  }
  const unBlockOkEvent = (value) => {
    if (value) {
      setIsUnBlock(false)
      userUnBlock()
    } else {
      setIsUnBlock(false)
    }
  }
  const registerOkEvent = (value) => {
    if (value) {
      setIsRegister(false)
      userRegister()
    } else {
      setIsRegister(false)
    }
  }
  const passOkEvent = (value) => {
    if (value) {
      setTempPass(false)
      userPass()
    } else {
      setTempPass(false)
    }
  }
  const userDelete = async () => {
    if (role !== 1) {
      const data = {
        id: onId,
        status: -1,
      }
      const res = await axios
        .put(`/api/user/status`, data, headerConfig)
        .catch((err) => statusCatch(err))
      if (res.data.success) {
        setIsOkCheck(true)
      } else {
        alert('?????? ????????? ?????????.')
      }
    }
  }
  const userBlock = async () => {
    if (role !== 1) {
      const data = {
        id: onId,
        status: 2,
      }
      const res = await axios
        .put(`/api/user/status`, data, headerConfig)
        .catch((err) => statusCatch(err))
      if (res.data.success) {
        setIsOkCheckBlock(true)
      } else {
        alert('?????? ????????? ?????????.')
      }
    }
  }
  const userUnBlock = async () => {
    if (role !== 1) {
      const data = {
        id: onId,
        status: 1,
      }
      const res = await axios
        .put(`/api/user/status`, data, headerConfig)
        .catch((err) => statusCatch(err))
      if (res.data.success) {
        setIsOkCheckUnBlock(true)
      } else {
        alert('?????? ????????? ?????????.')
      }
    }
  }
  const userRegister = async () => {
    if (role !== 1) {
      const data = {
        id: onId,
        status: 1,
      }
      const res = await axios
        .put(`api/user/status`, data, headerConfig)
        .catch((err) => statusCatch(err))
      if (res.data.success) {
        setIsOkCheckReg(true)
      } else {
        alert('?????? ????????? ?????????.')
      }
    }
  }
  const userPass = async () => {
    if (role !== 1) {
      const data = {
        id: onId,
        status: 0,
      }
      const res = await axios
        .put(`api/user/status`, data, headerConfig)
        .catch((err) => statusCatch(err))
      if (res.data.success) {
        setIsOkCheckPass(true)
      } else {
        alert('?????? ????????? ?????????.')
      }
    }
  }
  const closeModalEvent = () => {
    setIsOkCheck(false)
    setIsOkCheckBlock(false)
    setIsOkCheckUnBlock(false)
    setIsOkCheckPass(false)
    setIsOkCheckReg(false)
    onCloseOkEvent()
  }

  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody className="form-body">
        <CRow className="mb-3">
          <CCol sm={2}>
            <CNav variant="pills" className="flex-column">
              <CNavItem className="nav-custom__column">
                <CNavLink
                  className="cursor custom-tab-color-main"
                  active={activeKey === 1}
                  onClick={() => setActiveKey(1)}
                >
                  ????????????
                </CNavLink>
              </CNavItem>
              <CNavItem className="nav-custom__column">
                <CNavLink
                  className="cursor custom-tab-color-main"
                  active={activeKey === 2}
                  onClick={() => setActiveKey(2)}
                >
                  ????????? ??????
                </CNavLink>
              </CNavItem>
              <CNavItem className="nav-custom__column curso">
                <CNavLink
                  className="cursor custom-tab-color-main"
                  active={activeKey === 3}
                  onClick={() => setActiveKey(3)}
                >
                  ????????? ??????
                </CNavLink>
              </CNavItem>
              <CNavItem className="nav-custom__column">
                <CNavLink
                  className="cursor custom-tab-color-main"
                  active={activeKey === 4}
                  onClick={() => setActiveKey(4)}
                >
                  ????????????
                </CNavLink>
              </CNavItem>
              <CNavItem className="nav-custom__column">
                <CNavLink
                  className="cursor custom-tab-color-main"
                  active={activeKey === 5}
                  onClick={() => {
                    setActiveKey(5)
                  }}
                >
                  ????????????
                </CNavLink>
              </CNavItem>
            </CNav>
          </CCol>
          <CCol sm={10}>
            <CTabContent>
              <CTabPane role="tabpanel" aria-labelledby="user_info" visible={activeKey === 1}>
                <CRow>
                  <CCol md={8}>
                    {/*about user*/}
                    <CTable bordered small>
                      <CTableBody>
                        <CTableRow>
                          <CTableDataCell colSpan="2">&gt; ????????????</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell className="w-25" color="primary">
                            ????????? ?????????
                          </CTableDataCell>
                          <CTableDataCell>
                            <span
                              className="text-info cursor"
                              onClick={() => {
                                setNicknameLog({ use: true, id: onId })
                              }}
                            >
                              {listTab1.nickname}
                            </span>
                          </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary">??????</CTableDataCell>
                          <CTableDataCell>
                            {listTab1.status === 1
                              ? '??????'
                              : listTab1.status === 2
                              ? '??????'
                              : '??????'}
                          </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary">?????????</CTableDataCell>
                          <CTableDataCell>{listTab1.birth} ???</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary">??????</CTableDataCell>
                          <CTableDataCell>{listTab1.gender === 0 ? '??????' : '??????'}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary">?????? / ?????????</CTableDataCell>
                          <CTableDataCell>
                            {listTab1.language} / {listTab1.tz}
                          </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary">????????????</CTableDataCell>
                          <CTableDataCell>{listTab1.oauth}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary">?????????</CTableDataCell>
                          <CTableDataCell>{listTab1.email}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary">?????????</CTableDataCell>
                          <CTableDataCell>
                            {listTab1.created_at !== null
                              ? moment(listTab1.created_at).format('YYYY-MM-DD HH:mm:ss')
                              : ''}
                          </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary">????????????</CTableDataCell>
                          <CTableDataCell>
                            {listTab1.last_seen !== null
                              ? moment(listTab1.last_seen).format('YYYY-MM-DD HH:mm:ss')
                              : ''}
                          </CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                    {/* user device */}
                    <CTable bordered small>
                      <CTableBody>
                        <CTableRow>
                          <CTableDataCell colSpan="2">&gt; ??????????????????</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary" className="w-25">
                            OS
                          </CTableDataCell>
                          <CTableDataCell>
                            {listTab1.device.platform ? listTab1.device.platform : 'none'}
                          </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary">?????????</CTableDataCell>
                          <CTableDataCell>
                            {listTab1.device.model ? listTab1.device.model : 'none'}
                          </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary">?????????</CTableDataCell>
                          <CTableDataCell>
                            {listTab1.device.ver_app ? listTab1.device.ver_app : 'none'}
                          </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary">?????? ??????</CTableDataCell>
                          <CTableDataCell>
                            {listTab1.push === 1 ? 'Y' : 'N'}/
                            {listTab1.fanplay_push === 1 ? 'Y' : 'N'}
                          </CTableDataCell>
                        </CTableRow>
                        {/* ad token */}
                        <CTableRow>
                          <CTableDataCell color="primary">???????????????</CTableDataCell>
                          <CTableDataCell>
                            {/*{isEmptyObj(listTab1.ad_token) ? 'none' : listTab1.ad_token}*/}
                            {listTab1.ad_token.tnk === undefined
                              ? 'none'
                              : listTab1.ad_token.tnk !== ''
                              ? listTab1.ad_token.tnk
                              : listTab1.ad_token.ad_mob !== ''
                              ? listTab1.ad_token.ad_mob
                              : listTab1.ad_token.buzzvil}
                          </CTableDataCell>
                        </CTableRow>
                        {/* ad policy */}
                        <CTableRow>
                          <CTableDataCell color="primary">????????? ??? ?????? ??????</CTableDataCell>
                          <CTableDataCell>{listTab1.ad_policy === 0 ? 'no' : 'yes'}</CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                    {/* CID */}
                    <CTable bordered small>
                      <CTableBody>
                        <CTableRow>
                          <CTableDataCell>&gt; CID</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell>{listTab1.cid}</CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                    {/* token */}
                    <CTable bordered small>
                      <CTableBody>
                        <CTableRow>
                          <CTableDataCell>&gt; ???????????? ??????</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell>{listTab1.token}</CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                    {/* expirence */}
                    <CTable bordered small>
                      <CTableBody>
                        <CTableRow>
                          <CTableDataCell colSpan="2">&gt; ????????? ?????? ??????</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary" className="w-25">
                            ??????
                          </CTableDataCell>
                          <CTableDataCell>{listTab1.level}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary">?????????</CTableDataCell>
                          <CTableDataCell>{listTab1.exp}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary">?????????</CTableDataCell>
                          <CTableDataCell>{listTab1.follow_cnt}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary">?????????</CTableDataCell>
                          <CTableDataCell>{listTab1.subscriber_cnt}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary">???????????????</CTableDataCell>
                          <CTableDataCell>{listTab1.cash_point}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary">???????????????</CTableDataCell>
                          <CTableDataCell>{listTab1.star_point}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary">?????? 1 ?????????</CTableDataCell>
                          <CTableDataCell>{listTab1.heart_1}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary">?????? 2 ?????????</CTableDataCell>
                          <CTableDataCell>{listTab1.heart_2}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary">???????????????</CTableDataCell>
                          <CTableDataCell>{listTab1.gold_point}</CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                    {/* statistic */}
                    <CTable bordered small>
                      <CTableBody>
                        <CTableRow>
                          <CTableDataCell colSpan="2">&gt; ??????</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary" className="w-25">
                            ??????????????? ??????
                          </CTableDataCell>
                          <CTableDataCell>{listTab1.stat_attendance.all.total} ???</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary">????????????</CTableDataCell>
                          <CTableDataCell>
                            {listTab1.stat_attendance.all.consistent} ????????? ?????? ?????????
                          </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary" style={{ whiteSpace: 'nowrap' }}>
                            ???????????? (30???) ??????
                          </CTableDataCell>
                          <CTableDataCell>
                            {listTab1.stat_attendance.last_days.consistent} ???
                          </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell color="primary" onClick={() => console.log(listTab1)}>
                            ?????? ?????? ??????
                          </CTableDataCell>
                          <CTableDataCell>
                            {listTab1.stat_attendance.last_days.total} ???
                          </CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                  </CCol>
                  <CCol md={3} className="text-center">
                    ???????????????
                    <CImage
                      rounded
                      thumbnail
                      src={
                        listTab1.avatar !== null ? process.env.REACT_APP_IMG + listTab1.avatar : ''
                      }
                      onClick={() => {
                        setIsImg({
                          use: true,
                          img:
                            listTab1.avatar === null
                              ? ''
                              : process.env.REACT_APP_IMG + listTab1.avatar,
                        })
                      }}
                      onError={(e) => (e.target.src = '/icon.png')}
                      style={{ width: '150px', cursor: 'pointer' }}
                    />
                  </CCol>
                  {role !== one && (
                    <CModalFooter className="form-footer">
                      <CButton
                        color="light"
                        size="lg"
                        className="form-footer__btn"
                        onClick={() => setTempPass(true)}
                      >
                        ?????? ???????????? ??????
                      </CButton>
                      {/*{listTab1.status !== -1 && (*/}
                      <CButton
                        onClick={() => setIsRegister(true)}
                        color="info"
                        size="lg"
                        className="form-footer__btn"
                      >
                        ???????????????
                      </CButton>
                      {/*)}*/}
                      {listTab1.status !== '' && listTab1.status !== 2 ? (
                        <CButton
                          color="warning"
                          size="lg"
                          className="form-footer__btn text-white"
                          onClick={() => setIsBlock(true)}
                        >
                          ??????
                        </CButton>
                      ) : (
                        <CButton
                          color="warning"
                          size="lg"
                          className="form-footer__btn text-white"
                          onClick={() => setIsUnBlock(true)}
                        >
                          ????????????
                        </CButton>
                      )}
                      <CButton
                        color="danger"
                        size="lg"
                        className="form-footer__btn text-white"
                        onClick={() => setIsDelete(true)}
                      >
                        ??????
                      </CButton>
                    </CModalFooter>
                  )}
                </CRow>
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="user_point" visible={activeKey === 2}>
                <CForm className="row g-3">
                  <CCol md={10} className="d-flex flex-row align-items-center">
                    <CFormSelect
                      onChange={(e) => setType(e.target.value)}
                      size="lg"
                      aria-label="????????? ??????"
                      style={{ width: '170px' }}
                    >
                      <option value="all">????????? ??????</option>
                      <option value="1,2">?????? 1/2</option>
                      <option value="3">??????</option>
                      <option value="4">??????</option>
                      <option value="5">??????</option>
                    </CFormSelect>
                    <CFormSelect
                      onChange={(e) => setCount(e.target.value)}
                      size="lg"
                      aria-label="?????? ??????"
                      className="mx-2"
                      style={{ width: '150px' }}
                    >
                      <option value="all">?????? ??????</option>
                      <option value="negative">????????????</option>
                      <option value="positive">????????????</option>
                    </CFormSelect>
                    <CButton
                      type="button"
                      color="primary"
                      variant="outline"
                      id="basic-addon1"
                      onClick={() => {
                        setOrderSearch(isOrder)
                        getUserPoint({ page: 1 })
                        setPagePoint(1)
                      }}
                    >
                      <CIcon icon={cilSearch} size="lg" /> ??????
                    </CButton>
                  </CCol>
                </CForm>
                <CTable bordered className="mt-3">
                  <CTableHead>
                    <CTableRow>
                      {tableTitlePoint.map((title, index) => {
                        return (
                          <CTableHeaderCell className="text-center" scope="col" key={index}>
                            {title.label}
                          </CTableHeaderCell>
                        )
                      })}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {listTabPoint !== undefined &&
                    listTabPoint.length !== 0 &&
                    isOrderSearch === 'desc' ? (
                      listTabPoint
                        .sort((a, b) => (a.count > b.count ? 1 : -1))
                        .map((value, index) => {
                          const startedDay = {
                            day:
                              value.created_at !== null
                                ? moment(value.created_at).format('YYYY-MM-DD')
                                : '',
                            time:
                              value.created_at !== null
                                ? moment(value.created_at).format('HH:mm:ss')
                                : '',
                          }
                          return (
                            <CTableRow key={index}>
                              <CTableDataCell className="text-center">
                                <div className="d-flex flex-column align-items-center">
                                  <span>{startedDay.day}</span>
                                  <br />
                                  <span>{startedDay.time}</span>
                                </div>
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                {value.action_title}
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                {value.type === 1
                                  ? '??????1'
                                  : value.type === 2
                                  ? '??????2'
                                  : value.type === 3
                                  ? '??????'
                                  : value.type === 4
                                  ? '??????'
                                  : '??????'}
                              </CTableDataCell>
                              <CTableDataCell className="text-center">{value.count}</CTableDataCell>
                              <CTableDataCell className="text-center">
                                {value.description}
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                {value.action_title}
                                {/*      {value.action_title === 'Change nickname'
                                ? '????????? ??????'
                                : value.action_title === 'manager-give-small'
                                  ? '????????? ??????'
                                  : value.action_title === 'voiting-artist'
                                    ? '???????????? ??????'
                                    : '????????? ??????'}   */}
                              </CTableDataCell>
                            </CTableRow>
                          )
                        })
                    ) : listTabPoint !== undefined &&
                      listTabPoint.length !== 0 &&
                      isOrderSearch === 'asc' ? (
                      listTabPoint
                        .sort((a, b) => (b.count > a.count ? 1 : -1))
                        .map((value, index) => {
                          const startedDay = {
                            day:
                              value.created_at !== null
                                ? moment(value.created_at).format('YYYY-MM-DD')
                                : '',
                            time:
                              value.created_at !== null
                                ? moment(value.created_at).format('HH:mm:ss')
                                : '',
                          }
                          return (
                            <CTableRow key={index}>
                              <CTableDataCell className="text-center">
                                <div className="d-flex flex-column align-items-center">
                                  <span>{startedDay.day}</span>
                                  <br />
                                  <span>{startedDay.time}</span>
                                </div>
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                {value.action_title}
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                {value.type === 1
                                  ? '??????1'
                                  : value.type === 2
                                  ? '??????2'
                                  : value.type === 3
                                  ? '??????'
                                  : value.type === 4
                                  ? '??????'
                                  : '??????'}
                              </CTableDataCell>
                              <CTableDataCell className="text-center">{value.count}</CTableDataCell>
                              <CTableDataCell className="text-center">
                                {value.description}
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                {value.action_title}
                                {/*      {value.action_title === 'Change nickname'
                                ? '????????? ??????'
                                : value.action_title === 'manager-give-small'
                                  ? '????????? ??????'
                                  : value.action_title === 'voiting-artist'
                                    ? '???????????? ??????'
                                    : '????????? ??????'}   */}
                              </CTableDataCell>
                            </CTableRow>
                          )
                        })
                    ) : listTabPoint !== undefined &&
                      listTabPoint.length !== 0 &&
                      isOrderSearch === 'all' ? (
                      listTabPoint.map((value, index) => {
                        const startedDay = {
                          day:
                            value.created_at !== null
                              ? moment(value.created_at).format('YYYY-MM-DD')
                              : '',
                          time:
                            value.created_at !== null
                              ? moment(value.created_at).format('HH:mm:ss')
                              : '',
                        }
                        return (
                          <CTableRow key={index}>
                            <CTableDataCell
                              className="text-center"
                              onClick={() => console.log(value)}
                            >
                              <div className="d-flex flex-column align-items-center">
                                <span>{startedDay.day}</span>
                                <br />
                                <span>{startedDay.time}</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              {value.action_title}
                              {/*{value.action_slug === 'purchase-point'*/}
                              {/*  ? '????????? ??????'*/}
                              {/*  : value.action_slug === 'voiting-artist'*/}
                              {/*  ? '???????????? ??????'*/}
                              {/*  : value.action_slug === 'change-nickname'*/}
                              {/*  ? '????????? ??????'*/}
                              {/*  : '??????'}*/}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              {value.type === 1
                                ? '??????1'
                                : value.type === 2
                                ? '??????2'
                                : value.type === 3
                                ? '??????'
                                : value.type === 4
                                ? '??????'
                                : '??????'}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">{value.count}</CTableDataCell>
                            <CTableDataCell className="text-center">
                              {value.description}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              {value.action_title}
                              {/*      {value.action_title === 'Change nickname'
                                ? '????????? ??????'
                                : value.action_title === 'manager-give-small'
                                  ? '????????? ??????'
                                  : value.action_title === 'voiting-artist'
                                    ? '???????????? ??????'
                                    : '????????? ??????'}   */}
                            </CTableDataCell>
                          </CTableRow>
                        )
                      })
                    ) : (
                      <CTableRow className="border-1">
                        <CTableDataCell className="border-0" />
                        <CTableDataCell className="border-0" />
                        <CTableDataCell className="border-0 text-center">
                          ?????? ????????? ????????????.
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
                {pagePoint !== pages1 ? (
                  <CButton
                    color="dark"
                    size="sm"
                    className="moreBt"
                    onClick={() => {
                      getUserPoint({
                        page: pagePoint + 1,
                      })
                      setPagePoint(pagePoint + 1)
                    }}
                  >
                    ?????????
                  </CButton>
                ) : (
                  <></>
                )}
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="user_exp" visible={activeKey === 3}>
                <CForm className="row g-3">
                  <CCol md={12}>
                    <CButton
                      onClick={() => {
                        getUserExp({ page: 1 })
                        setPageExp(1)
                      }}
                      type="button"
                      size="sm"
                    >
                      ????????????&nbsp;
                      <CIcon icon={cilReload} />
                    </CButton>
                  </CCol>
                </CForm>
                <CTable bordered className="mt-3">
                  <CTableHead>
                    <CTableRow>
                      {tableTitleExp.map((title, index) => {
                        return (
                          <CTableHeaderCell className="text-center" scope="col" key={index}>
                            {title.label}
                          </CTableHeaderCell>
                        )
                      })}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {listTabExp !== undefined && listTabExp.length !== 0 ? (
                      listTabExp.map((value, index) => {
                        // date
                        const startedDay = {
                          day:
                            value.created_at !== null
                              ? moment(value.created_at).format('YYYY-MM-DD')
                              : '',
                          time:
                            value.created_at !== null
                              ? moment(value.created_at).format('HH:mm:ss')
                              : '',
                        }
                        return (
                          <CTableRow key={index}>
                            <CTableDataCell className="text-center">
                              <div className="d-flex flex-column align-items-center">
                                <span>{startedDay.day}</span>
                                <br />
                                <span>{startedDay.time}</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>{value.action_title}</CTableDataCell>
                            <CTableDataCell>{value.count}</CTableDataCell>
                          </CTableRow>
                        )
                      })
                    ) : (
                      <CTableRow className="border-1">
                        <CTableDataCell className="border-0" />
                        <CTableDataCell className="border-0 text-center">
                          ?????? ????????? ????????????.
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
                {pageExp !== pages2 && (
                  <CButton
                    color="dark"
                    size="sm"
                    className="moreBt"
                    onClick={() => {
                      getUserExp({
                        page: pageExp + 1,
                      })
                      setPageExp(pageExp + 1)
                    }}
                  >
                    ?????????
                  </CButton>
                )}
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="user_pay" visible={activeKey === 4}>
                <CForm className="row g-3">
                  <CCol md={12} className="d-flex flex-row align-items-center">
                    <CFormSelect
                      onChange={(e) => setPlatform(e.target.value)}
                      size="lg"
                      aria-label="??????"
                      className="me-2"
                      style={{ width: '130px' }}
                    >
                      <option value="all">??????</option>
                      <option value="android">Android</option>
                      <option value="ios">IOS</option>
                    </CFormSelect>
                    <CButton
                      type="button"
                      color="primary"
                      variant="outline"
                      id="basic-addon1"
                      onClick={() => {
                        getUserPay({ page: 1 })
                        setPagePay(1)
                      }}
                    >
                      <CIcon icon={cilSearch} size="lg" /> ??????
                    </CButton>
                  </CCol>
                </CForm>
                <CTable bordered className="mt-3">
                  <CTableHead>
                    <CTableRow>
                      {tableTitlePay.map((title, index) => {
                        return (
                          <CTableHeaderCell className="text-center" scope="col" key={index}>
                            {title.label}
                          </CTableHeaderCell>
                        )
                      })}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {listTabPay !== undefined && listTabPay.length !== 0 ? (
                      listTabPay.map((value, index) => {
                        // date
                        const startedDay = {
                          day:
                            value.created_at !== null
                              ? moment(value.created_at).format('YYYY-MM-DD')
                              : '',
                          time:
                            value.created_at !== null
                              ? moment(value.created_at).format('HH:mm:ss')
                              : '',
                        }
                        return (
                          <CTableRow key={index} className="text-center">
                            <CTableDataCell className="text-center">
                              <div className="d-flex flex-column align-items-center">
                                <span>{startedDay.day}</span>
                                <br />
                                <span>{startedDay.time}</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>{value.pid_product}</CTableDataCell>
                            <CTableDataCell>{value.pay_token}</CTableDataCell>
                          </CTableRow>
                        )
                      })
                    ) : (
                      <CTableRow className="border-1">
                        <CTableDataCell className="border-0" />
                        <CTableDataCell className="border-0 text-center">
                          ?????? ????????? ????????????.
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
                {pagePay !== pages3 && (
                  <CButton
                    color="dark"
                    size="sm"
                    className="moreBt"
                    onClick={() => {
                      getUserPay({
                        page: pagePay + 1,
                      })
                      setPagePay(pagePay + 1)
                    }}
                  >
                    ?????????
                  </CButton>
                )}
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="user_artist" visible={activeKey === 5}>
                <CTable bordered className="mt-3 table-text-center">
                  <CTableHead>
                    <CTableRow>
                      {tableTitleArtist.map((title, index) => {
                        return (
                          <CTableHeaderCell className="text-center" scope="col" key={index}>
                            {title.label}
                          </CTableHeaderCell>
                        )
                      })}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {listTabArtist !== undefined && listTabArtist.length !== 0 ? (
                      listTabArtist.map((value, index) => {
                        // date
                        const startedDay = {
                          day:
                            value.created_at !== null
                              ? moment(value.created_at).format('YYYY-MM-DD')
                              : '',
                          time:
                            value.created_at !== null
                              ? moment(value.created_at).format('HH:mm:ss')
                              : '',
                        }
                        return (
                          <CTableRow key={index}>
                            <CTableDataCell>
                              <div className="artist-img-dom d-flex flex-row align-items-center">
                                <CImage
                                  style={{ width: '60px', marginRight: '10px', cursor: 'pointer' }}
                                  src={
                                    !value.img_artist
                                      ? ''
                                      : process.env.REACT_APP_IMG + value.img_artist.main
                                  }
                                  alt=""
                                  onError={(e) => (e.target.src = '/icon.png')}
                                  onClick={() =>
                                    setIsImg({
                                      use: true,
                                      img: !value.img_artist
                                        ? ''
                                        : process.env.REACT_APP_IMG + value.img_artist.main,
                                    })
                                  }
                                />
                                <span
                                  className="cursor"
                                  onClick={() => {
                                    setIsArtistDetailModal({
                                      use: true,
                                      id: !value.artist_id ? '' : value.artist_id,
                                    })
                                  }}
                                  style={{ color: 'blue', cursor: 'pointer' }}
                                >
                                  {value.name_artist === undefined
                                    ? ''
                                    : value.name_artist.ko !== ''
                                    ? value.name_artist.ko
                                    : value.name_artist.etc}{' '}
                                  {value.group_name === null
                                    ? ''
                                    : value.group_name[0].ko !== ''
                                    ? '(' + value.group_name[0].ko + ')'
                                    : '(' + value.group_name[0].etc + ')'}
                                </span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              <div className="d-flex flex-column align-items-center">
                                <span>{startedDay.day}</span>
                                <br />
                                <span>{startedDay.time}</span>
                              </div>
                            </CTableDataCell>
                          </CTableRow>
                        )
                      })
                    ) : (
                      <CTableRow className="border-1">
                        <CTableDataCell className="border-0 text-center">
                          ???????????? ????????????
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
                {pageArtist !== pages4 && (
                  <CButton
                    color="dark"
                    size="sm"
                    className="moreBt"
                    onClick={() => {
                      getUserArtist({
                        page: pageArtist + 1,
                      })
                      setPageArtist(pageArtist + 1)
                    }}
                  >
                    ?????????
                  </CButton>
                )}
              </CTabPane>
            </CTabContent>
          </CCol>
        </CRow>
      </CModalBody>
      {isArtistDetailModal.use && (
        <ArtistDetail
          onClickClose={() =>
            setIsArtistDetailModal({
              ...isArtistDetailModal,
              use: false,
            })
          }
          onId={isArtistDetailModal.id}
          onStatus={1}
          onChecked={() => modalOkEvent()}
        />
      )}

      {isNicknameLog.use && (
        <NickNameLog
          onClickClose={() =>
            setIsArtistDetailModal({
              use: false,
              id: '',
            })
          }
          onId={isNicknameLog.id}
          onChecked={() => modalOkEvent()}
        />
      )}
      {isImg.use && (
        <ImgBig
          onClickClose={() =>
            setIsImg({
              use: false,
              img: '',
            })
          }
          onImg={isImg.img}
        />
      )}
      {isDelete && role !== 1 && (
        <CheckPopup
          onClickClose={() => setIsDelete(false)}
          bodyContent={'???????????? ?????? ??????????????????????'}
          onCheked={(value) => deleteOkEvent(value)}
        />
      )}
      {isBlock && role !== 1 && (
        <CheckPopup
          onClickClose={() => setIsBlock(false)}
          bodyContent={'?????? ???????????????????'}
          onCheked={(value) => blockOkEvent(value)}
        />
      )}
      {isUnBlock && role !== 1 && (
        <CheckPopup
          onClickClose={() => setIsUnBlock(false)}
          bodyContent={'?????? ?????? ???????????????????'}
          onCheked={(value) => unBlockOkEvent(value)}
        />
      )}
      {isRegister && role !== 1 && (
        <CheckPopup
          onClickClose={() => setIsRegister(false)}
          bodyContent={'???????????? ?????????????????????????'}
          onCheked={(value) => registerOkEvent(value)}
        />
      )}
      {isTempPass && role !== 1 && (
        <CheckPopup
          onClickClose={() => setTempPass(false)}
          bodyContent={'?????? ??????????????? ?????? ???????????????????'}
          onCheked={(value) => passOkEvent(value)}
        />
      )}
      {isNicknameLog.use && (
        <NickNameLog
          onClickClose={() => setNicknameLog({ use: false, id: '' })}
          onId={isNicknameLog.id}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'?????? ????????? ?????????????????????.'}
        />
      )}
      {isOkCheckBlock && (
        <NormalPopup onClickClose={() => closeModalEvent()} bodyContent={'?????????????????????.'} />
      )}
      {isOkCheckUnBlock && (
        <NormalPopup onClickClose={() => closeModalEvent()} bodyContent={'?????? ?????????????????????.'} />
      )}
      {isOkCheckReg && (
        <NormalPopup onClickClose={() => closeModalEvent()} bodyContent={'???????????? ??????????????????'} />
      )}
      {isOkCheckPass && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'?????? ??????????????? ?????????????????????.'}
        />
      )}
    </CModal>
  )
}

UserDetail.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.number.isRequired,
  onCloseOkEvent: PropTypes.func,
  onStatus: PropTypes.number,
}
