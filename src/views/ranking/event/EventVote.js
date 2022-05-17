import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CFormSelect,
  CNav,
  CNavItem,
  CNavLink,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CTabContent,
  CTabPane,
  CImage,
  CFormInput,
  CFormCheck,
} from '@coreui/react'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { cilReload, cilSearch } from '@coreui/icons'
import CreateEventVote from './popup/CreateEventVote'
import DetailEventVote from './popup/DetailEventVote'
import { CheckPopup } from '../../../components/publicPopup/CheckPopup'
import { UserDetail } from '../../member/popup/UserDetail'
import { NormalPopup } from '../../../components/publicPopup/NormalPopup'
import axios from 'axios'
import { headerConfig } from '../../../static/axiosConfig'
import { statusCatch } from '../../../static/axiosCatch'
import moment from 'moment'
import ReportNumber from './popup/ReportNumber'
import { ImgBig } from 'src/components/publicPopup/ImgBig'

const EventVote = () => {
  // Popup
  const [isCreateEventVote, setCreateEventVote] = useState(false) // Image Popup
  const [isDetailEventVote, setDetailEventVote] = useState({ use: false, id: '' }) // Image Popup
  const [isReplyDel, setIsReplyDel] = useState({
    use: false,
    id: '',
  })
  const [isReplyDelChecked, setIsReplyDelChecked] = useState(false)
  const [isReportDelChecked, setIsReportDelChecked] = useState(false)
  const [isReportComm, setIsReportComm] = useState({
    use: false,
    id: '',
  })
  const [isReportProceed, setIsReportProceed] = useState({ use: false, id: '' })
  // Table
  const tableTitle = [
    { label: '순서' },
    { label: '상태' },
    { label: '투표분류' },
    { label: '배너' },
    { label: '타이틀' },
    { label: '등록일​' },
    { label: '시작일​' },
    { label: '종료일​' },
  ]
  const tableReply = [
    { label: '작성자' },
    { label: '댓글 내용​' },
    { label: '아티스트 대상​' },
    { label: '작성일​' },
    { label: '처리​' },
  ]
  const tableReport = [
    { label: '선택​' },
    { label: '타입​' },
    { label: '아티스트​ 코드' },
    { label: '신고대상자​' },
    { label: '내용​' },
    { label: '신고수​' },
    { label: '게시일자​' },
    { label: '처리​' },
  ]
  const [allCheckedList, setAllCheckedList] = useState(false) // all Checked
  const [activeKey, setActiveKey] = useState(1)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)
  const [listTab, setListTab] = useState([])
  const [page2, setPage2] = useState(1)
  const [pages2, setPages2] = useState(0)
  const [listTab2, setListTab2] = useState([])
  const [page3, setPage3] = useState(1)
  const [pages3, setPages3] = useState(0)
  const [listTab3, setListTab3] = useState([])
  const [isType, setType] = useState('all')
  const [isStatus, setStatus] = useState('all')
  const [isCid, setCid] = useState('')
  const [isCode, setCode] = useState('')
  const [userInfo, setUserInfo] = useState({
    use: false,
    id: '',
  })
  const [isReportNumber, setIsReportNumber] = useState({
    use: false,
    id: '',
  })
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  })

  const [reportCount, setReportCount] = useState(0)
  const [reportCount2, setReportCount2] = useState(0)
  const [isDel3, setIsDel3] = useState(false)
  const [isOkCheck, setIsOkCheck] = useState(false)
  const [role, setRole] = useState('')

  useEffect(() => {
    if (activeKey === 1) {
      getList({ page: 1 })
      getList2({ page: 1 })
      getList3({ page: 1 })
      setPage(1)
      setPage3(1)
    } else if (activeKey === 2) {
      getList2({ page: 1 })
      setPage2(1)
    } else if (activeKey === 3) {
      getList3({ page: 1 })
      setPage3(1)
    }
  }, [activeKey])
  const getList = async (params) => {
    if (!params) {
      params = {}
    }
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
    if (params.page === undefined) {
      params.page = page
    }
    if (params.type === undefined) {
      params.type = isType
    }
    if (params.status === undefined) {
      params.status = isStatus
    }
    const queries = []
    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)
    if (params.type !== 'all') {
      queries.push(`type=${params.type}`)
    }
    if (params.status !== 'all') {
      queries.push(`status=${params.status}`)
    }
    console.log(queries)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/rank/event${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    console.log(res.data.value)
    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => {
        listTab.push(value)
      })
      setListTab([...listTab])
    } else {
      setListTab(res.data.value.items)
    }
  }
  const getList2 = async (params) => {
    if (!params) {
      params = {}
    }

    if (params.page === undefined) {
      params.page = page2
    }
    if (params.cid === undefined) {
      params.cid = isCid
    }
    if (params.code === undefined) {
      params.code = isCode
    }
    const queries = []
    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)
    queries.push(`status=1`)
    if (params.cid !== '') {
      queries.push(`cid=${params.cid}`)
    }
    if (params.code !== '') {
      queries.push(`search_code=${params.code}`)
    }
    console.log(queries)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/rank/reply/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setReportCount2(res.data.value.count === undefined ? 0 : res.data.value.count)
    setPages2(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => {
        listTab2.push(value)
      })
      setListTab2([...listTab2])
    } else {
      setListTab2(res.data.value.items)
    }
  }
  const getList3 = async (params) => {
    if (!params) {
      params = {}
    }

    if (params.page === undefined) {
      params.page = page3
    }

    const queries = []
    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)
    queries.push(`status=1`)

    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/rank/report/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setReportCount(res.data.value.count === undefined ? 0 : res.data.value.count)
    setPages3(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => {
        listTab3.push(value)
      })
      setListTab3([...listTab3])
    } else {
      setListTab3(res.data.value.items)
    }
  }
  const onCloseEvent = () => {
    setCreateEventVote(false)
    setDetailEventVote({
      use: false,
      id: '',
    })
    getList({ page: 1 })
    setPage(1)
  }
  const replyCom = async () => {
    const data = {
      reply_id_arr: [isReplyDel.id],
      status: -1,
    }
    const res = await axios
      .put(`/api/rank/reply`, data, headerConfig)
      .catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsReplyDelChecked(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }
  const reportCom = async () => {
    const data = {
      reply_id_arr: [isReportComm.id],
      status: -1,
    }
    const res = await axios
      .put(`/api/rank/report`, data, headerConfig)
      .catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsReportDelChecked(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }
  const reportComProseed = async (id) => {
    const data = {
      reply_id_arr: [id],
      status: -1,
    }
    const res = await axios
      .put(`/api/rank/report?id=${id}`, data, headerConfig)
      .catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsReportDelChecked(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }
  const replyModalEvent = (value) => {
    if (value) {
      replyCom()
      setIsReplyDel(false)
    } else {
      setIsReplyDel(false)
    }
    getList2({ page: 1 })
    setPage2(1)
  }
  const closeReportEvent = (value) => {
    if (value) {
      reportCom()
      setIsReportComm({ use: false, id: '' })
    } else {
      setIsReportComm({ use: false, id: '' })
    }
    getList3({ page: 1 })
    setPage3(1)
  }
  const allChecked = (bool) => {
    if (bool) {
      listTab3.map((value) => {
        value.checked = true
      })
      setListTab3([...listTab3])
    } else {
      listTab3.map((value) => {
        value.checked = false
      })
      setListTab3([...listTab3])
    }
  }
  const allDelete = async () => {
    const data = []
    listTab3.map((value) => {
      if (value.checked) {
        data.push(value.reply_id)
      }
    })

    const deleteData = {
      reply_id_arr: data,
      status: -1,
    }
    const res = await axios
      .put(`/api/rank/report`, deleteData, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) {
      alert('삭제에 실패했습니다.')
    } else {
      setIsOkCheck(true)
    }
  }
  const modalOkAllEvent = (value) => {
    if (value) {
      setIsDel3(false)
      allDelete()
    } else {
      setIsDel3(false)
    }
  }
  const closeModalEvent = () => {
    setIsOkCheck(false)
    getList3()
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CNav variant="tabs" className="mt-2 nav-custom">
            <CNavItem>
              <CNavLink
                className={
                  activeKey === 1 ? 'cursor custom-tab-color-main' : 'cursor custom-tab-color'
                }
                active={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                이벤트 투표 배너
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <div className="relative-dom">
                {/*<span>{reportCount2}</span>*/}
                <CNavLink
                  className={
                    activeKey === 2 ? 'cursor custom-tab-color-main' : 'cursor custom-tab-color'
                  }
                  active={activeKey === 2}
                  onClick={() => setActiveKey(2)}
                >
                  이벤트 댓글​
                </CNavLink>
              </div>
            </CNavItem>
            <CNavItem>
              <div className="relative-dom">
                <span>{reportCount}</span>
                <CNavLink
                  className={
                    activeKey === 3 ? 'cursor custom-tab-color-main' : 'cursor custom-tab-color'
                  }
                  active={activeKey === 3}
                  onClick={() => setActiveKey(3)}
                >
                  이벤트 댓글 신고
                </CNavLink>
              </div>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CTabContent>
              <CTabPane role="tabpanel" visible={activeKey === 1}>
                <CCol className="d-flex flex-row align-items-center" style={{ borderTop: 'none' }}>
                  <CFormSelect
                    size="lg"
                    aria-label="Large select example"
                    className="select-group__select text-center"
                    style={{ width: '130px' }}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="all">전체​</option>
                    <option value="3">준비​</option>
                    <option value="1">진행중</option>
                    <option value="0">비활성</option>
                    <option value="2">종료</option>
                    <option value="-1">삭제</option>
                  </CFormSelect>
                  <CFormSelect
                    size="lg"
                    aria-label="Large select example"
                    className="mx-2 select-group__select text-center"
                    style={{ width: '210px' }}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="all">전체​</option>
                    <option value={3}>이벤트 투표​</option>
                    <option value={4}>이벤트 댓글 투표​</option>
                    <option value={5}>누적 투표</option>
                  </CFormSelect>
                  <CButton
                    onClick={() => {
                      getList({ page: 1 })
                      setPage(1)
                    }}
                    type="button"
                    color="primary"
                    variant="outline"
                    id="basic-addon1"
                  >
                    <CIcon icon={cilSearch} size="lg" /> 조회
                  </CButton>
                </CCol>
                <div className="button-group mt-5">
                  {role !== 1 && (
                    <CButton
                      onClick={() => setCreateEventVote(true)}
                      color="info"
                      className="button-group__btn text-white px-5"
                    >
                      신규등록​
                    </CButton>
                  )}
                </div>
                {/*Table*/}
                <CTable bordered className="mt-3 text-break">
                  <CTableHead>
                    <CTableRow>
                      {tableTitle.map((title, index) => {
                        return (
                          <CTableHeaderCell className="text-center" key={index}>
                            {title.label}
                          </CTableHeaderCell>
                        )
                      })}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {listTab !== null && listTab !== undefined ? (
                      listTab.map((value, index) => {
                        const created = {
                          date:
                            value.updated_at === null
                              ? ''
                              : moment(value.updated_at).format('YYYY-MM-DD'),
                          time:
                            value.updated_at === null
                              ? ''
                              : moment(value.updated_at).format('HH:mm:ss'),
                        }
                        const createdStart = {
                          date:
                            value.started_at === null
                              ? ''
                              : moment(value.started_at).format('YYYY-MM-DD'),
                          time:
                            value.started_at === null
                              ? ''
                              : moment(value.started_at).format('HH:mm:ss'),
                        }
                        const createdEnd = {
                          date:
                            value.ended_at === null
                              ? ''
                              : moment(value.ended_at).format('YYYY-MM-DD'),
                          time:
                            value.ended_at === null
                              ? ''
                              : moment(value.ended_at).format('HH:mm:ss'),
                        }
                        return (
                          <CTableRow key={index}>
                            <CTableHeaderCell className="text-center">
                              {value.priority}
                            </CTableHeaderCell>
                            <CTableDataCell className="text-center">
                              {value.status === 1
                                ? '진행중'
                                : value.status === 0
                                ? '비활성'
                                : value.status === -1
                                ? '삭제'
                                : '준비'}
                            </CTableDataCell>
                            <CTableDataCell scope="row" className="text-center">
                              {value.type === 1
                                ? '노멀 랭크 '
                                : value.type === 2
                                ? '이벤트 투표'
                                : value.type === 3
                                ? '이벤트 배너'
                                : '이벤트 댓글 투표'}
                            </CTableDataCell>
                            <CTableDataCell>
                              <div className="d-flex flex-row justify-content-center">
                                <CImage
                                  onClick={() =>
                                    setIsImg({
                                      use: true,
                                      img: value.img_banner.ko,
                                    })
                                  }
                                  style={{ height: '100px', objectFit: 'cover' }}
                                  src={
                                    value.event_banner.ko !== ''
                                      ? process.env.REACT_APP_IMG + value.event_banner.ko
                                      : value.event_banner.en !== ''
                                      ? process.env.REACT_APP_IMG + value.event_banner.en
                                      : value.event_banner.ch !== ''
                                      ? process.env.REACT_APP_IMG + value.event_banner.ch
                                      : value.event_banner.jp !== ''
                                      ? process.env.REACT_APP_IMG + value.event_banner.es
                                      : value.event_banner.es !== ''
                                      ? typeof value.event_banner === 'string'
                                      : process.env.REACT_APP_IMG + value.event_banner
                                  }
                                  alt="banner"
                                  className="cursor"
                                  onError={(e) => (e.target.src = '/icon.png')}
                                />
                              </div>
                            </CTableDataCell>
                            <CTableDataCell
                              onClick={() => setDetailEventVote({ use: true, id: value.id })}
                              className="cursor text-info"
                            >
                              {value.name_vote === null
                                ? ''
                                : value.name_vote.ko !== ''
                                ? value.name_vote.ko
                                : value.name_vote.en !== ''
                                ? value.name_vote.en
                                : value.name_vote.ch !== ''
                                ? value.name_vote.ch
                                : value.name_vote.jp !== ''
                                ? value.name_vote.jp
                                : value.name_vote.es !== ''
                                ? value.name_vote.es
                                : ''}
                            </CTableDataCell>
                            <CTableDataCell scope="row">
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <span>{created.date}</span>
                                <br />
                                <span>{created.time}</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell scope="row">
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <span>{createdStart.date}</span>
                                <br />
                                <span>{createdStart.time}</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell scope="row">
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <span>{createdEnd.date}</span>
                                <br />
                                <span>{createdEnd.time}</span>
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
                {page !== pages && (
                  <CButton
                    color="dark"
                    size="sm"
                    className="moreBt"
                    onClick={() => {
                      getList({
                        page: page + 1,
                      })
                      setPage(page + 1)
                    }}
                  >
                    더보기
                  </CButton>
                )}
              </CTabPane>
              {/*Reply*/}
              <CTabPane role="tabpanel" visible={activeKey === 2}>
                <CCol className="d-flex flex-row" sm={12}>
                  <CCol sm={3}>
                    <CFormInput
                      onChange={(e) => setCid(e.target.value)}
                      placeholder="작성자 CID를 입력하세요​"
                    />
                  </CCol>
                  <CCol sm={3} className="mx-2">
                    <CFormInput
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="아티스트 코드 입력하세요​​"
                    />
                  </CCol>
                  <CCol sm={2}>
                    <CButton
                      onClick={() => {
                        getList2({ page: 1 })
                        setPage2(1)
                      }}
                      type="button"
                      color="primary"
                      variant="outline"
                      id="basic-addon1"
                    >
                      <CIcon icon={cilSearch} size="lg" /> 조회
                    </CButton>
                  </CCol>
                </CCol>
                {/*Table*/}
                <CTable bordered className="mt-3">
                  <CTableHead>
                    <CTableRow>
                      {tableReply.map((title, index) => {
                        return (
                          <CTableHeaderCell className="text-center" key={index}>
                            {title.label}
                          </CTableHeaderCell>
                        )
                      })}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {listTab2 !== null && listTab2 !== undefined ? (
                      listTab2.map((value, index) => {
                        const created = {
                          date:
                            value.created_at === null
                              ? ''
                              : moment(value.created_at).format('YYYY-MM-DD'),
                          time:
                            value.created_at === null
                              ? ''
                              : moment(value.created_at).format('HH:mm:ss'),
                        }
                        const writerAvatar = value.avatar
                        let img1 = ''
                        if (writerAvatar !== null) img1 = process.env.REACT_APP_IMG + writerAvatar
                        return (
                          <CTableRow key={index}>
                            <CTableDataCell className="cursor text-info">
                              <div className="d-flex flex-row justify-content-start align-items-center mt-2">
                                <CImage
                                  onClick={() => {
                                    setIsImg({
                                      use: true,
                                      img: writerAvatar,
                                    })
                                  }}
                                  style={{
                                    height: '40px',
                                    width: '40px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    marginRight: '10px',
                                  }}
                                  src={img1}
                                  alt=""
                                  onError={(e) => (e.target.src = '/icon.png')}
                                />
                                <span
                                  onClick={() => {
                                    setUserInfo({
                                      use: true,
                                      id: value.user_id,
                                    })
                                  }}
                                >
                                  {value.nickname}
                                </span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>{value.mess}</CTableDataCell>
                            <CTableDataCell>
                              <div className="d-flex flex-row">
                                <CImage
                                  style={{
                                    marginRight: '10px',
                                    height: '60px',
                                    width: '60px',
                                    objectFit: 'cover',
                                  }}
                                  src={
                                    value.img_artist.main !== ''
                                      ? process.env.REACT_APP_IMG + value.img_artist.main
                                      : process.env.REACT_APP_IMG + value.img_artist.sup
                                  }
                                  onError={(e) => (e.target.src = '/icon.png')}
                                />
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                  <span>
                                    {value.name_artist === null
                                      ? ''
                                      : value.name_artist.ko !== ''
                                      ? value.name_artist.ko
                                      : value.name_artist.etc}
                                  </span>
                                  <span>
                                    {value.code_artist === undefined || null
                                      ? ''
                                      : '(' + value.code_artist + ')'}
                                  </span>
                                </div>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div className="d-flex flex-row align-items-center justify-content-center">
                                <span className="me-2">{created.date}</span>{' '}
                                <span>{created.time}</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div className="d-flex flex-column justify-content-center align-items-center">
                                <CButton
                                  onClick={() => {
                                    setIsReplyDel({
                                      use: true,
                                      id: value.id,
                                    })
                                  }}
                                  style={{ color: 'white' }}
                                  color="danger"
                                >
                                  삭제​
                                </CButton>
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
                {page2 !== pages2 && (
                  <CButton
                    color="dark"
                    size="sm"
                    className="moreBt"
                    onClick={() => {
                      getList2({
                        page: page2 + 1,
                      })
                      setPage2(page2 + 1)
                    }}
                  >
                    더보기
                  </CButton>
                )}
              </CTabPane>
              {/*Report*/}
              <CTabPane role="tabpanel" visible={activeKey === 3}>
                <CCol className="d-flex flex-column" sm={12} style={{ borderTop: 'none' }}>
                  <CButton
                    onClick={() => {
                      getList3({ page: 1 })
                      setPage3(1)
                    }}
                    style={{ width: '200px' }}
                    type="button"
                    color="primary"
                    variant="outline"
                    id="basic-addon1"
                  >
                    새로고침 <CIcon icon={cilReload} size="lg" />
                  </CButton>
                  <CCol className="mt-3">
                    <CButton
                      onClick={() => {
                        let isValue = ''
                        if (allCheckedList) {
                          setAllCheckedList(false)
                          isValue = false
                        } else {
                          setAllCheckedList(true)
                          isValue = true
                        }
                        allChecked(isValue)
                      }}
                      color="info"
                      style={{ color: 'white', marginRight: '10px' }}
                    >
                      전체선택(취소)​
                    </CButton>
                    <CButton
                      color="danger"
                      style={{ color: 'white' }}
                      onClick={() => {
                        setIsDel3(true)
                      }}
                    >
                      삭제​​
                    </CButton>
                  </CCol>
                </CCol>
                {/*Table*/}
                <CTable bordered className="mt-3">
                  <CTableHead>
                    <CTableRow>
                      {tableReport.map((title, index) => {
                        return (
                          <CTableHeaderCell className="text-center" key={index}>
                            {title.label}
                          </CTableHeaderCell>
                        )
                      })}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {listTab3 !== null && listTab3 !== undefined ? (
                      listTab3.map((value, index) => {
                        const created = {
                          date:
                            value.created_at === null
                              ? ''
                              : moment(value.created_at).format('YYYY-MM-DD'),
                          time:
                            value.created_at === null
                              ? ''
                              : moment(value.created_at).format('HH:mm:ss'),
                        }
                        return (
                          <CTableRow key={index}>
                            <CTableDataCell>
                              <div className="d-flex flex-row justify-content-center align-items-center">
                                <CFormCheck
                                  id="flexCheckDefault"
                                  checked={value.checked}
                                  onChange={(e) => {
                                    value.checked = e.target.checked
                                    setListTab3([...listTab3])
                                  }}
                                />
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              {value.name_artist === null
                                ? ''
                                : value.name_artist.ko !== ''
                                ? value.name_artist.ko
                                : value.name_artist.etc}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              {value.code_artist}
                            </CTableDataCell>
                            <CTableDataCell>
                              <div className="d-flex flex-row align-items-center cursor text-info">
                                <CImage
                                  onClick={() =>
                                    setIsImg({
                                      use: true,
                                      img: value.avatar,
                                    })
                                  }
                                  style={{
                                    marginRight: '10px',
                                    borderRadius: '55%',
                                    height: '60px',
                                    width: '60px',
                                    objectFit: 'cover',
                                  }}
                                  src={
                                    value.avatar === '' || value.avatar === null
                                      ? ''
                                      : process.env.REACT_APP_IMG + value.avatar
                                  }
                                  onError={(e) => (e.target.src = '/icon.png')}
                                />
                                <span
                                  onClick={() => {
                                    setUserInfo({
                                      use: true,
                                      id: value.from_user_id,
                                    })
                                  }}
                                >
                                  {value.nickname}
                                </span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>{value.mess}</CTableDataCell>
                            <CTableDataCell
                              onClick={() => {
                                setIsReportNumber({
                                  use: true,
                                  id: value.from_user_id,
                                })
                              }}
                              className="text-info cursor text-center"
                            >
                              {value.report_cnt}
                            </CTableDataCell>
                            <CTableDataCell>
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <span>{created.date}</span>
                                <span> {created.time}</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div className="d-flex flex-row">
                                <CButton
                                  onClick={() => {
                                    setIsReportComm({
                                      use: true,
                                      id: value.reply_id,
                                    })
                                  }}
                                  style={{ color: 'white', marginRight: '10px' }}
                                  color="danger"
                                >
                                  댓글삭제
                                </CButton>
                                <CButton
                                  onClick={() => {
                                    reportComProseed(value.reply_id)
                                  }}
                                  style={{ color: 'white' }}
                                  color="info"
                                >
                                  처리완료​
                                </CButton>
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
                {page3 !== pages3 && (
                  <CButton
                    color="dark"
                    size="sm"
                    className="moreBt"
                    onClick={() => {
                      getList3({
                        page: page3 + 1,
                      })
                      setPage3(page3 + 1)
                    }}
                  >
                    더보기
                  </CButton>
                )}
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
      {isDel3 && (
        <CheckPopup
          onClickClose={() => setIsDel3(false)}
          bodyContent={'선택하신 댓글을 삭제하시겠습니까?'}
          title={'삭제'}
          onCheked={(value) => modalOkAllEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup onClickClose={() => closeModalEvent()} bodyContent={'선택한 댓글이 삭제됨.'} />
      )}
      {isCreateEventVote && (
        <CreateEventVote
          onClickClose={() => {
            setCreateEventVote(false)
            getList({ page: 1 })
            setPage(1)
          }}
          onCloseOkEvent={() => onCloseEvent()}
        />
      )}
      {isDetailEventVote.use && (
        <DetailEventVote
          onClickClose={() =>
            setDetailEventVote({
              use: false,
              id: '',
            })
          }
          onId={isDetailEventVote.id}
          onCloseOkEvent={() => onCloseEvent()}
        />
      )}
      {isReportNumber.use && (
        <ReportNumber
          onClickClose={() =>
            setIsReportNumber({
              use: false,
              id: '',
            })
          }
          onId={isReportNumber.id}
          onCloseOkEvent={() => {
            setIsReportNumber({
              use: false,
              id: '',
            })
            getList3()
          }}
        />
      )}
      {userInfo.use && (
        <UserDetail
          onClickClose={() =>
            setUserInfo({
              ...userInfo,
              use: false,
            })
          }
          onId={userInfo.id}
          onCloseOkEvent={() => onCloseEvent()}
        />
      )}
      {isReplyDel.use && (
        <CheckPopup
          onClickClose={() =>
            setIsReplyDel({
              use: false,
              id: '',
            })
          }
          onId={isReplyDel.id}
          bodyContent={'선택한 댓글을 삭제하시겠습니까?​'}
          onCheked={(value) => replyModalEvent(value)}
        />
      )}
      {isReplyDelChecked && (
        <NormalPopup
          onClickClose={() => setIsReplyDelChecked(false)}
          bodyContent={'댓글 보고서가 처리되었습니다.​'}
        />
      )}
      {isReportComm.use && (
        <CheckPopup
          onClickClose={() =>
            setIsReportComm({
              use: false,
              id: '',
            })
          }
          bodyContent={'선택하신 댓글을 삭제하시겠습니까?'}
          onCheked={(value) => closeReportEvent(value)}
        />
      )}
      {isReportDelChecked && (
        <NormalPopup
          onClickClose={() => {
            setIsReportDelChecked(false)
            getList3({ page: 1 })
            setPage3(1)
          }}
          bodyContent={'댓글 신고 처리가 완료 되었습니다.'}
        />
      )}
      {isReportProceed.use && (
        <NormalPopup
          onClickClose={() => setIsReportProceed({ use: false, id: '' })}
          bodyContent={'귀하의 댓글 보고서가 처리되었습니다.'}
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
          onImg={process.env.REACT_APP_IMG + isImg.img}
        />
      )}
    </CRow>
  )
}

EventVote.propTypes = {
  history: PropTypes.object,
}

export default EventVote
