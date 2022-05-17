import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CImage,
  CInputGroup,
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
import SignPolicy from './popup/SignPolicy'
import CreateSign from './popup/CreateSign'
import CIcon from '@coreui/icons-react'
import { cilReload, cilSearch } from '@coreui/icons'
import { UserDetail } from '../../../member/popup/UserDetail'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import moment from 'moment'
import { CheckPopup } from '../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../components/publicPopup/NormalPopup'
import SignDetail from './popup/SignDetail'
import { ImgBig } from 'src/components/publicPopup/ImgBig'

const SignManager = () => {
  // useState
  const [activeKey, setActiveKey] = useState(1)
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  }) // img detail
  const one = 1
  const [role, setRole] = useState('')
  const [isUserInfo, setIsUserInfo] = useState({ use: false, id: '' })
  const [proseedId, setProseedId] = useState('')
  const [isSignPolicy, setIsSignPolicy] = useState(false)
  const [isCreateSign, setIsCreateSign] = useState(false)
  const [isSignDetail, setIsSignDetail] = useState({ use: false, id: '' })
  const [isDelMessage, setIsDelMessage] = useState({ use: false, id: '' })
  const [isDelMessage2, setIsDelMessage2] = useState({ use: false, id: [] })
  const [delCheck3, setDelCheck3] = useState([])
  const [isComplaintSent, setIsComplaintSent] = useState(false)
  const [isOkCheck, setIsOkCheck] = useState(false)
  const [allCheckedList, setAllCheckedList] = useState(false)
  //Table title
  const tableManager = [
    { label: '번호' },
    { label: '구분​' },
    { label: '내용​' },
    { label: '시작일​​' },
    { label: '종료일​' },
  ]
  let tableMessage

  let tableReport
  {
    role !== one
      ? (tableMessage = [
          { label: '작성자​' },
          { label: '메시지 내용 확인' },
          { label: '등록일​' },
          { label: '종료일​' },
          { label: '처리​' },
        ])
      : (tableMessage = [
          { label: '작성자​' },
          { label: '메시지 내용 확인' },
          { label: '등록일​' },
          { label: '종료일​' },
        ])
  }
  {
    role !== one
      ? (tableReport = [
          { label: '선택​' },
          { label: '신고자​' },
          { label: '신고대상자​' },
          { label: '내용​' },
          { label: '신고날짜​' },
          { label: '종료날짜​' },
          { label: '처리​' },
        ])
      : (tableReport = [
          { label: '선택​' },
          { label: '신고자​' },
          { label: '신고대상자​' },
          { label: '내용​' },
          { label: '신고날짜​' },
          { label: '종료날짜​' },
        ])
  }

  // Tab1
  const [listTab, setListTab] = useState(null)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [status, setStatus] = useState('all')
  // Tab2
  const [listTab2, setListTab2] = useState(null)
  const [page2, setPage2] = useState(1)
  const [pages2, setPages2] = useState(1)
  const [status2, setStatus2] = useState('1')
  const [searchType, setSearchType] = useState('nickname')
  const [searchWord, setSearchWord] = useState('')
  // Tab3
  const [listTab3, setListTab3] = useState(null)
  const [page3, setPage3] = useState(1)
  const [pages3, setPages3] = useState(1)
  const [signReportCount, setSignReportCount] = useState(0)
  // All checked button event
  useEffect(() => {
    if (activeKey === 1) {
      getList({ page: 1 })
      getList3({ page: 1 })
      setPage(1)
    }
    if (activeKey === 2) {
      getList2({ page: 1 })
      setPage2(1)
    }
    if (activeKey === 3) {
      getList3({ page: 1 })
      setPage3(1)
    }
  }, [])

  // Tab1
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
    if (params.status === undefined) {
      params.status = status
    }
    const queries = []
    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)
    if (params.status !== 'all') {
      queries.push(`status=${params.status}`)
    }
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/sign/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => listTab.push(value))
      setListTab([...listTab])
    } else {
      setListTab(res.data.value.items)
    }
  }
  // Tab2
  const getList2 = async (params) => {
    if (!params) {
      params = {}
    }

    if (params.page === undefined) {
      params.page = page2
    }

    const queries = []
    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)
    queries.push(`search=${searchWord}`)
    queries.push(`search_type=${searchType}`)
    queries.push(`status=${status2}`)

    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/sign/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPages2(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => listTab2.push(value))
      setListTab2([...listTab2])
    } else {
      setListTab2(res.data.value.items)
    }
  }
  // Tab 3
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
      .get(`/api/sign/report/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPages3(res.data.value.pages ? res.data.value.pages : 1)
    setSignReportCount(res.data.value.count ? res.data.value.count : 0)
    if (params.page > 1) {
      res.data.value.items.map((value) => listTab3.push(value))
      setListTab3([...listTab3])
      return
    } else {
      setListTab3(res.data.value.items)
    }
    const data = []
    res.data.value.items.map((value) =>
      data.push({
        ...value,
        checked: false,
      }),
    )
    if (params.page > 1) {
      res.data.value.items.map((value) =>
        listTab3.push({
          ...value,
          checked: false,
        }),
      )
      setListTab3([...listTab3])
      return
    }
    setListTab3(data)
  }
  // Close Event
  const onCloseEvent = () => {
    setIsSignPolicy(false)
    getList({ page: 1 })
    setPage(1)
  }
  // create success event
  const endEvent = () => {
    setIsCreateSign(false)
    setIsSignDetail({
      use: false,
      id: '',
    })
    if (activeKey === 1) {
      getList()
    }
    if (activeKey === 2) {
      getList2()
    }
    setPage(1)
  }
  const delMess = async () => {
    const data = {
      sign_id_arr: isDelMessage.id,
      status: -1,
    }
    const res = await axios.put(`/api/sign`, data, headerConfig).catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsDelMessage({
        use: false,
        id: '',
      })
      getList2()
      setIsOkCheck(true)
    }
    if (!res.data.success) {
      alert('등록에 실패했습니다.')
    } else {
      setIsOkCheck(true)
    }
  }
  const delMess2 = async () => {
    const data = {
      sign_id_arr: isDelMessage2.id,
      status: -1,
    }
    const res = await axios.put(`/api/sign`, data, headerConfig).catch((err) => statusCatch(err))
    console.log(res.data)
    if (res.data.success) {
      setIsDelMessage2({
        use: false,
        id: [],
      })
      setDelCheck3([])
      setIsOkCheck(true)
    }
    if (!res.data.success) {
      alert('등록에 실패했습니다.')
    } else {
      getList3()
      setIsOkCheck(true)
    }
  }
  const prossedComment3 = async (id) => {
    const data = {
      sign_id_arr: id,
      status: 2, // or 0 or 1?
    }
    const res = await axios
      .put(`/api/sign/report`, data, headerConfig)
      .catch((err) => statusCatch(err))
    console.log(res.data)
    console.log(data)
    if (res.data.success) {
      setIsComplaintSent(true)
    }
    if (!res.data.success) {
      alert('등록에 실패했습니다.')
    } else {
      getList3()
      setIsOkCheck(true)
    }
  }
  // create checked
  const modalOkEvent = (value) => {
    if (value) {
      setIsDelMessage({
        use: false,
        id: '',
      })
      delMess()
      getList2()
    } else {
      setIsDelMessage({
        use: false,
        id: '',
      })
    }
  }
  const modalOkEvent2 = (value) => {
    if (value) {
      setIsDelMessage2({
        use: false,
        id: [],
      })
      delMess2()
    } else {
      setIsDelMessage2({
        use: false,
        id: [],
      })
    }
  }
  const allChecked = (bool) => {
    if (bool) {
      listTab3.map((value) => (value.checked = true))
      setListTab3([...listTab3])
    } else {
      listTab3.map((value) => (value.checked = false))
      setListTab3([...listTab3])
    }
  }
  const closeModalEvent = () => {
    setIsOkCheck(false)
    setIsComplaintSent(false)
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
                덕킹 전광판​
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                className="cursor custom-tab-color-main"
                active={activeKey === 2}
                onClick={() => setActiveKey(2)}
              >
                전광판 메시지 관리​
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <div className="relative-dom">
                <span>{signReportCount}</span>
                <CNavLink
                  className="cursor custom-tab-color-main"
                  active={activeKey === 3}
                  onClick={() => setActiveKey(3)}
                >
                  전광판 신고​
                </CNavLink>
              </div>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CTabContent>
              <CTabPane role="tabpanel" visible={activeKey === 1}>
                <CCol sm={4}>
                  <CInputGroup className="mb-3" style={{ width: '210px' }}>
                    <CFormSelect
                      size="lg"
                      aria-label="Large select example"
                      className="search-bar__select"
                      onChange={(e) => {
                        setStatus(e.target.value)
                      }}
                    >
                      <option value="all">전체​</option>
                      <option value="1">진행중​</option>
                      <option value="0">비활성​</option>
                      <option value="2">종료​</option>
                      <option value="-1">삭제​</option>
                    </CFormSelect>
                    <CButton
                      type="button"
                      color="primary"
                      variant="outline"
                      id="basic-addon1"
                      onClick={() => {
                        getList({ page: 1 })
                        setPage(1)
                      }}
                    >
                      <CIcon icon={cilSearch} size="lg" /> 조회
                    </CButton>
                  </CInputGroup>
                </CCol>
                <CRow className="g-3">
                  <CCol>
                    {/*Table*/}
                    <CCol>
                      <CCol className="float-end mb-2">
                        {role !== one && (
                          <div className="d-flex flex-row">
                            <CButton
                              onClick={() => {
                                setIsSignPolicy(true)
                              }}
                              type="button"
                              color="info"
                              id="basic-addon1"
                              className="text-white"
                            >
                              전광판 관리​
                            </CButton>
                            <CButton
                              className="ms-1"
                              style={{ color: 'white' }}
                              type="button"
                              color="success"
                              id="basic-addon1"
                              onClick={() => {
                                setIsCreateSign(true)
                              }}
                            >
                              덕킹 전광판 등록​
                            </CButton>
                          </div>
                        )}
                      </CCol>
                      <CTable bordered>
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
                          {listTab !== null && listTab !== undefined ? (
                            listTab.map((value, index) => {
                              // date
                              const startedDay = {
                                day:
                                  value.started_at !== null
                                    ? moment(value.started_at).format('YYYY-MM-DD')
                                    : '',
                                time:
                                  value.started_at !== null
                                    ? moment(value.started_at).format('HH:mm:ss')
                                    : '',
                              }
                              const endedDay = {
                                day:
                                  value.ended_at !== null
                                    ? moment(value.ended_at).format('YYYY-MM-DD')
                                    : '',
                                time:
                                  value.ended_at !== null
                                    ? moment(value.ended_at).format('HH:mm:ss')
                                    : '',
                              }
                              return (
                                <CTableRow key={index}>
                                  <CTableDataCell scope="row" className="text-break">
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <span>{value.id}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-break">
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <span>
                                        {value.status === 1
                                          ? '진행중​'
                                          : value.status === 2
                                          ? '종료​'
                                          : value.status === -1
                                          ? '삭제​'
                                          : '비활성​'}
                                      </span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell
                                    onClick={() => {
                                      setIsSignDetail({ use: true, id: value.id })
                                    }}
                                    className="text-break cursor"
                                  >
                                    <div className="d-flex flex-row align-items-center justify-content-start">
                                      <span style={{ color: 'blue' }}>{value.message}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                      <span> {startedDay.day}</span>
                                      <span> {startedDay.time}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                      <span> {endedDay.day}</span>
                                      <span> {endedDay.time}</span>
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
                    </CCol>
                  </CCol>
                </CRow>
              </CTabPane>
              {/*Message*/}
              <CTabPane role="tabpanel" visible={activeKey === 2}>
                <CCol sm={12} className="d-flex flex-row align-items-center mb-4">
                  <CFormSelect
                    size="lg"
                    aria-label="Large select example"
                    style={{ width: '130px' }}
                    className="search-bar__select"
                    onChange={(e) => {
                      setStatus2(e.target.value)
                    }}
                  >
                    <option value="1">진행중</option>
                    <option value="2">종료​</option>
                  </CFormSelect>
                  <CFormSelect
                    size="lg"
                    aria-label="Large select example"
                    style={{ width: '130px' }}
                    className="search-bar__select mx-2"
                    onChange={(e) => {
                      setSearchType(e.target.value)
                    }}
                  >
                    <option value="nickname">닉네임</option>
                    <option value="cid">CID​</option>
                  </CFormSelect>
                  <CInputGroup style={{ width: '30%' }}>
                    <CFormInput
                      size="lg"
                      onChange={(e) => {
                        setSearchWord(e.target.value)
                      }}
                      placeholder="검색어를 입력하세요​"
                    />
                    <CButton
                      size="lg"
                      type="button"
                      color="primary"
                      variant="outline"
                      id="basic-addon1"
                      onClick={() => {
                        getList2({ page: 1 })
                        setPage2(1)
                      }}
                    >
                      <CIcon icon={cilSearch} size="lg" /> 조회
                    </CButton>
                  </CInputGroup>
                </CCol>
                <CRow className="g-3">
                  <CCol>
                    {/*Table*/}
                    <CCol>
                      <CTable bordered>
                        <CTableHead>
                          <CTableRow>
                            {tableMessage.map((title, index) => {
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
                          {listTab2 !== null && listTab2 !== undefined ? (
                            listTab2.map((value, index) => {
                              // date
                              const startedDay = {
                                day:
                                  value.started_at !== null
                                    ? moment(value.started_at).format('YYYY-MM-DD')
                                    : '',
                                time:
                                  value.started_at !== null
                                    ? moment(value.started_at).format('HH:mm:ss')
                                    : '',
                              }
                              const endedDay = {
                                day:
                                  value.ended_at !== null
                                    ? moment(value.ended_at).format('YYYY-MM-DD')
                                    : '',
                                time:
                                  value.ended_at !== null
                                    ? moment(value.ended_at).format('HH:mm:ss')
                                    : '',
                              }
                              return (
                                <CTableRow key={index}>
                                  <CTableDataCell scope="row" className="text-break">
                                    <div className="d-flex flex-row align-items-center">
                                      <CImage
                                        className="cursor"
                                        onClick={() =>
                                          setIsImg({
                                            use: true,
                                            img: process.env.REACT_APP_IMG + value.avatar,
                                          })
                                        }
                                        style={{
                                          borderRadius: '50%',
                                          width: '50px',
                                          height: '50px',
                                          marginRight: '10px',
                                        }}
                                        src={process.env.REACT_APP_IMG + value.avatar}
                                      />
                                      <span
                                        onClick={() => {
                                          setIsUserInfo({
                                            use: true,
                                            id: value.user_id,
                                          })
                                        }}
                                        style={{ color: 'blue', cursor: 'pointer' }}
                                      >
                                        {value.nickname && value.nickname.length > 9
                                          ? value.nickname.substr(0, 9) + '...'
                                          : value.nickname}
                                      </span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-break">
                                    <div className="d-flex flex-row align-items-center">
                                      <span>{value.message}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div className="d-flex flex-column align-items-center">
                                      <span>{startedDay.day}</span>
                                      <br />
                                      <span>{startedDay.time}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div className="d-flex flex-column align-items-center">
                                      <span>{endedDay.day}</span>
                                      <br />
                                      <span>{endedDay.time}</span>
                                    </div>
                                  </CTableDataCell>
                                  {role !== one && (
                                    <CTableDataCell scope="row" className="text-break">
                                      <div className="d-flex flex-column align-items-center justify-content-center">
                                        <CButton
                                          onClick={() => {
                                            setIsDelMessage({
                                              use: true,
                                              id: value.id,
                                            })
                                          }}
                                          color="danger"
                                          className="text-nowrap"
                                          style={{ color: 'white' }}
                                        >
                                          삭제​
                                        </CButton>
                                      </div>
                                    </CTableDataCell>
                                  )}
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
                            setPage(page2 + 1)
                          }}
                        >
                          더보기
                        </CButton>
                      )}
                    </CCol>
                  </CCol>
                </CRow>
              </CTabPane>
              {/*Report*/}
              <CTabPane role="tabpanel" visible={activeKey === 3}>
                <CCol sm={12}>
                  <CInputGroup className="mb-3">
                    <CButton
                      onClick={() => {
                        getList3({ page: 1 })
                      }}
                      type="button"
                      color="info"
                      className="text-white"
                      id="basic-addon1"
                    >
                      새로고침​ <CIcon icon={cilReload} size="lg" />
                    </CButton>
                  </CInputGroup>
                </CCol>
                {role !== one && (
                  <CCol sm={12}>
                    <CInputGroup className="mb-3">
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
                        type="button"
                        color="success"
                        className="text-white"
                        id="basic-addon1"
                      >
                        전체선택(취소)
                      </CButton>
                      <CButton
                        onClick={() => {
                          listTab3.forEach((value) => {
                            if (value.checked === true) {
                              console.log(isDelMessage2)
                              delCheck3.push(value.sign_id)
                              setIsDelMessage2({ use: true, id: delCheck3 })
                            }
                          })
                        }}
                        type="button"
                        color="danger"
                        className="text-white"
                        id="basic-addon1"
                      >
                        삭제​
                      </CButton>
                    </CInputGroup>
                  </CCol>
                )}
                <CRow className="g-3">
                  <CCol>
                    {/*Table*/}
                    <CCol>
                      <CTable bordered>
                        <CTableHead>
                          <CTableRow>
                            {tableReport.map((title, index) => {
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
                          {listTab3 !== null ? (
                            listTab3.map((value, index) => {
                              // date
                              const startedDay = {
                                day:
                                  value.created_at !== null
                                    ? moment(value.created_at).format('YYYY-MM-DD')
                                    : '',
                                time:
                                  value.started_at !== null
                                    ? moment(value.created_at).format('HH:mm:ss')
                                    : '',
                              }
                              const endedDay = {
                                day:
                                  value.ended_at !== null
                                    ? moment(value.ended_at).format('YYYY-MM-DD')
                                    : '',
                                time:
                                  value.ended_at !== null
                                    ? moment(value.ended_at).format('HH:mm:ss')
                                    : '',
                              }
                              return (
                                <CTableRow key={index}>
                                  <CTableDataCell
                                    scope="row"
                                    className="text-break"
                                    onClick={() => console.log(value)}
                                  >
                                    <div className="d-flex flex-row align-items-center justify-content-center">
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
                                  <CTableDataCell scope="row" className="text-break">
                                    <div className="d-flex flex-row align-items-center">
                                      <CImage
                                        className="cursor"
                                        onClick={() =>
                                          setIsImg({
                                            use: true,
                                            img: process.env.REACT_APP_IMG + value.report_avatar,
                                          })
                                        }
                                        style={{
                                          borderRadius: '50%',
                                          width: '50px',
                                          height: '50px',
                                          marginRight: '10px',
                                        }}
                                        src={process.env.REACT_APP_IMG + value.report_avatar}
                                      />
                                      <span
                                        onClick={() => {
                                          setIsUserInfo({
                                            use: true,
                                            id: value.user_id,
                                          })
                                        }}
                                        style={{ color: 'blue', cursor: 'pointer' }}
                                      >
                                        {value.report_nickname}
                                      </span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell scope="row" className="text-break">
                                    <div className="d-flex flex-row align-items-center">
                                      <CImage
                                        className="cursor"
                                        onClick={() =>
                                          setIsImg({
                                            use: true,
                                            img: process.env.REACT_APP_IMG + value.reported_avatar,
                                          })
                                        }
                                        style={{
                                          borderRadius: '50%',
                                          width: '50px',
                                          height: '50px',
                                          marginRight: '10px',
                                        }}
                                        src={process.env.REACT_APP_IMG + value.reported_avatar}
                                      />
                                      <span
                                        onClick={() => {
                                          setIsUserInfo({
                                            use: true,
                                            id: value.reported_id,
                                          })
                                        }}
                                        style={{ color: 'blue', cursor: 'pointer' }}
                                      >
                                        {value.reported_nickname}
                                      </span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-break">
                                    <div className="d-flex flex-row align-items-center">
                                      <span>{value.message}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div className="d-flex flex-column align-items-center">
                                      <span>{startedDay.day}</span>
                                      <br />
                                      <span>{startedDay.time}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div className="d-flex flex-column align-items-center">
                                      <span>{endedDay.day}</span>
                                      <br />
                                      <span>{endedDay.time}</span>
                                    </div>
                                  </CTableDataCell>
                                  {role !== one && (
                                    <CTableDataCell scope="row" className="text-break">
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <CButton
                                          onClick={() => {
                                            console.log('value', value)
                                            setIsDelMessage2({
                                              use: true,
                                              id: [value.sign_id],
                                            })
                                          }}
                                          color="danger"
                                          className="me-2"
                                          style={{ color: 'white' }}
                                        >
                                          삭제​
                                        </CButton>
                                        <CButton
                                          onClick={() => {
                                            prossedComment3(value.id)
                                          }}
                                          color="info"
                                          style={{ color: 'white' }}
                                        >
                                          처리 완료
                                        </CButton>
                                      </div>
                                    </CTableDataCell>
                                  )}
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
                    </CCol>
                  </CCol>
                </CRow>
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
      {isUserInfo.use && (
        <UserDetail
          onClickClose={() => setIsUserInfo({ use: false, id: '' })}
          onId={isUserInfo.id}
          onCloseOkEvent={() => onCloseEvent()}
        />
      )}
      {isSignPolicy && role !== one && (
        <SignPolicy
          onCloseOkEvent={() => onCloseEvent()}
          onClickClose={() => setIsSignPolicy(false)}
        />
      )}
      {isCreateSign && role !== one && (
        <CreateSign onEndEvent={() => endEvent()} onClickClose={() => setIsCreateSign(false)} />
      )}
      {isSignDetail.use && (
        <SignDetail
          onClickClose={() => setIsSignDetail({ use: false, id: '' })}
          onEndEvent={() => endEvent()}
          onId={isSignDetail.id}
        />
      )}
      {isDelMessage.use && (
        <CheckPopup
          onClickClose={() =>
            setIsDelMessage({
              use: false,
              id: '',
            })
          }
          bodyContent="선택한 메시지를 삭제하시겠습니까?"
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isDelMessage2.use && (
        <CheckPopup
          onClickClose={() =>
            setIsDelMessage2({
              use: false,
              id: '',
            })
          }
          bodyContent="선택한 메시지를 삭제하시겠습니까?"
          onCheked={(value) => modalOkEvent2(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup onClickClose={() => closeModalEvent()} bodyContent={'처리 되었습니다.'} />
      )}
      {isComplaintSent && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'댓글 신고 처리가 완료 되었습니다.'}
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
    </CRow>
  )
}
SignManager.propTypes = {
  history: PropTypes.object,
}

export default SignManager
