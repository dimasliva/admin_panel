import React, { useEffect, useState } from 'react'
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
import ContentsPage from './popup/ContentsPage'
import { CalenderPopup } from 'src/components/publicPopup/CalenderPopup'
import { UserDetail } from 'src/views/member/popup/UserDetail'
import { CheckPopup } from 'src/components/publicPopup/CheckPopup'
import { ReportTakPopup } from './popup/ReportTakPopup'
import { NormalPopup } from 'src/components/publicPopup/NormalPopup'
import CIcon from '@coreui/icons-react'
import { cilReload, cilSearch } from '@coreui/icons'
import moment from 'moment'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'
import { ImgBig } from '../../../components/publicPopup/ImgBig'

const FanReplyManager = () => {
  const [activeKey, setActiveKey] = useState(1)
  const one = 1
  const [role, setRole] = useState('')
  let tableManage
  let tableReport
  let tableEvent
  {
    role !== one
      ? (tableManage = [
          { label: '구분' },
          { label: '게시콘텐츠​' },
          { label: '댓글 작성자​​​' },
          { label: '댓글 내용​​' },
          { label: '댓글 작성일​' },
          { label: '처리​' },
        ])
      : (tableManage = [
          { label: '구분' },
          { label: '게시콘텐츠​' },
          { label: '댓글 작성자​​​' },
          { label: '댓글 내용​​' },
          { label: '댓글 작성일​' },
        ])
  }
  {
    role !== one
      ? (tableReport = [
          { label: '선택' },
          { label: '구분​' },
          { label: '게시콘텐츠​​​​' },
          { label: '댓글 내용​​​' },
          { label: '신고수​​' },
          { label: '댓글 작성일​' },
          { label: '처리​' },
        ])
      : (tableReport = [
          { label: '선택' },
          { label: '구분​' },
          { label: '게시콘텐츠​​​​' },
          { label: '댓글 내용​​​' },
          { label: '신고수​​' },
          { label: '댓글 작성일​' },
        ])
  }
  {
    role !== one
      ? (tableEvent = [
          { label: '선택' },
          { label: '이벤트 내용​' },
          { label: '신고대상자​' },
          { label: '댓글 내용​' },
          { label: '신고수​' },
          { label: '댓글 작성일​​' },
          { label: '처리​' },
        ])
      : (tableEvent = [
          { label: '선택' },
          { label: '이벤트 내용​' },
          { label: '신고대상자​' },
          { label: '댓글 내용​' },
          { label: '신고수​' },
          { label: '댓글 작성일​​' },
        ])
  }

  const [allCheckedList, setAllCheckedList] = useState(false) // all Checked
  const [isReportModal, setIsReportModal] = useState({
    use: false,
    id: '',
    id2: '',
  }) // Detail Popup
  const [isContentPage, setIsContentPage] = useState({
    use: false,
    id: '',
  }) // Detail Popup
  const [userInfo, setUserInfo] = useState({
    use: false,
    id: '',
  }) // User Information Popup
  const [isDeletePopup, setIsDeletePopup] = useState({
    use: false,
    id: '',
  }) // delete Popup
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  // ============================ Tab 1 ============================ //
  // Data list
  const [listTab1, setListTab1] = useState(null)
  // Filter
  const [target1, setTarget1] = useState('nickname')
  const [keyWord1, setKeyWord1] = useState('')
  const [type1, setType1] = useState('all')
  const [page1, setPage1] = useState(1)
  const [pages1, setPages1] = useState(1)
  // ============================ Tab 2 ============================ //
  // Data list
  const [listTab2, setListTab2] = useState(null)
  // Filter
  const [type2, setType2] = useState('all')
  const [page2, setPage2] = useState(1)
  const [pages2, setPages2] = useState(1)
  // ============================ Tab 3 ============================ //
  // Data list
  const [listTab3, setListTab3] = useState(null)
  // Filter
  const [page3, setPage3] = useState(1)
  const [pages3, setPages3] = useState(1)
  // Calender
  const [isCalen, setIsCalen] = useState(false) // calender Popup
  const [startDay, setStartDay] = useState(moment().subtract(6, 'days'))
  const [endDay, setEndDay] = useState(moment())

  // checked event
  const [isModal, setIsModal] = useState(false) // delete check Modal
  const [isModal2, setIsModal2] = useState(false) // delete check Modal
  const [isOkCheck2, setIsOkCheck2] = useState(false)

  // Count
  const [countTab2, setCountTab2] = useState(0)
  const [countTab3, setCountTab3] = useState(0)
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  })
  useEffect(() => {
    if (activeKey === 1) {
      getList({ page: 1 })
      getList2({ page: 1 })
      getList3({ page: 1 })
      setPage1(1)
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

  // ============================ Tab 1 ============================ //
  const getList = async (params) => {
    if (!params) {
      params = {}
    }
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
    if (params.page === undefined) {
      params.page = page1
    }

    if (params.isSort) {
      params.page = 1
      setPage1(1)
    }

    if (params.type === undefined) {
      params.type = type1
    }

    const queries = []
    // Search Keyword and Type
    if (keyWord1 !== '') {
      queries.push(`search=${keyWord1}`)
      queries.push(`search_type=${target1}`)
    }
    // Filter
    queries.push(`between_start_at=${startDay.format('YYYY-MM-DD')}`)
    queries.push(`between_end_at=${endDay.format('YYYY-MM-DD')} 23:59:59`)
    queries.push(`status=1`)
    if (params.type !== 'all') queries.push(`type=${params.type}`)

    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)

    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    // api communication
    const res = await axios
      .get(`/api/fan/play/all/reply/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPages1(res.data.value.pages ? res.data.value.pages : 1)

    if (params.page > 1) {
      res.data.value.items.map((value) => listTab1.push(value))
      setListTab1([...listTab1])
    } else {
      setListTab1(res.data.value.items)
    }
  }

  // ============================ Tab 2 ============================ //
  const getList2 = async (params) => {
    if (!params) {
      params = {}
    }

    if (params.page === undefined) {
      params.page = page2
    }

    const queries = []

    // Filter
    queries.push(`status=1`)
    if (type2 !== 'all') queries.push(`type=${type2}`)
    if (params.page === 1) {
      queries.push(`page=1`)
      queries.push(`limit=${30 * params.page}`)
    } else {
      queries.push(`page=${params.page}`)
      queries.push(`limit=30`)
    }

    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    // api communication
    const res = await axios
      .get(`/api/fan/play/all/report/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) return
    setPages2(res.data.value.pages ? res.data.value.pages : 1)
    const data = []
    res.data.value.items.map((value) =>
      data.push({
        ...value,
        checked: false,
      }),
    )

    setCountTab2(res.data.value.count === undefined ? 0 : res.data.value.count)
    if (params.page > 1) {
      res.data.value.items.map((value) =>
        listTab2.push({
          ...value,
          checked: false,
        }),
      )
      setListTab2([...listTab2])
    } else {
      setListTab2(data)
    }
  }

  // ============================ Tab 3 ============================ //
  const getList3 = async (params) => {
    if (!params) {
      params = {}
    }

    if (params.page === undefined) {
      params.page = page3
    }

    const queries = []

    // Filter
    queries.push(`type=6`)
    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)

    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    // api communication
    const res = await axios
      .get(`/api/fan/play/all/report/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) return
    setPages3(res.data.value.pages ? res.data.value.pages : 1)
    const data = []
    res.data.value.items.map((value) =>
      data.push({
        ...value,
        checked: false,
      }),
    )
    setCountTab3(res.data.value.count === undefined ? 0 : res.data.value.count)
    if (params.page > 1) {
      res.data.value.items.map((value) =>
        listTab3.push({
          ...value,
          checked: false,
        }),
      )
      setListTab3([...listTab3])
    } else {
      setListTab3(data)
    }
  }
  // ============================ public =========================== //
  // Calender Modal value
  const calenderData = (start, end) => {
    setIsCalen(false)
    setStartDay(moment(start))
    setEndDay(moment(end))
  }

  // All checked button event
  const allChecked = (bool) => {
    if (activeKey === 2) {
      if (bool) {
        listTab2.map((value) => (value.checked = true))
        setListTab2([...listTab2])
      } else {
        listTab2.map((value) => (value.checked = false))
        setListTab2([...listTab2])
      }
    } else if (activeKey === 3) {
      if (bool === true) {
        listTab3.map((value) => (value.checked = true))
        setListTab3([...listTab3])
      } else if (bool === false) {
        listTab3.map((value) => (value.checked = false))
        setListTab2([...listTab3])
      }
    }
  }

  // All checked delete event
  const allDelete = async () => {
    const data = []
    if (activeKey === 2) {
      listTab2.map((value) => {
        if (value.checked) {
          data.push(value.reply_id)
        }
      })
    } else if (activeKey === 3) {
      listTab3.map((value) => {
        if (value.checked) {
          data.push(value.reply_id)
        }
      })
    }

    if (data.length === 0) {
      setIsModal(false)
      alert('삭제할 항목이 선택되지 않았습니다.')
    }
    const deleteData = {
      reply_id_arr: data,
      status: -1,
    }

    const res = await axios
      .put(`/api/fan/play/reply`, deleteData, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) {
      alert('삭제에 실패했습니다.')
    } else {
      setIsOkCheck(true)
    }
  }

  // process Button event
  const processEvent = async (value) => {
    const data = {
      reply_id_arr: [value],
      status: 1,
    }

    const res = await axios
      .put(`/api/fan/play/report`, data, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) {
      alert('처리완료가 실패했습니다.')
    } else {
      setIsOkCheck2(true)
    }
  }

  const modalOkAllEvent = (value) => {
    if (value) {
      setIsModal2(false)
      allDelete()
    } else {
      setIsModal2(false)
    }
  }

  // delete list
  const deleteTak = async (id) => {
    const deleteData = {
      reply_id_arr: id,
      status: -1,
    }
    const res = await axios
      .put(`/api/fan/play/reply`, deleteData, headerConfig)
      .catch((err) => statusCatch(err))

    if (res.data.success) {
      setIsDeletePopup({
        use: false,
        id: '',
      })
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }

  // delete checked
  const modalOkEvent = (value) => {
    if (value) {
      deleteTak(isDeletePopup.id)
    } else {
      setIsDeletePopup({
        use: false,
        id: '',
      })
    }
  }

  const closeModalEvent = () => {
    if (activeKey === 1) {
      getList({ page: 1 })
      setPage1(1)
    } else if (activeKey === 2) {
      getList2({ page: 1 })
      setPage2(1)
    } else if (activeKey === 3) {
      getList3({ page: 1 })
      setPage3(1)
    }
    setIsOkCheck(false)
    setIsOkCheck2(false)
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
                팬플레이 댓글관리​
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <div className="relative-dom">
                <span>{countTab2}</span>
                <CNavLink
                  className={
                    activeKey === 2 ? 'cursor custom-tab-color-main' : 'cursor custom-tab-color'
                  }
                  active={activeKey === 2}
                  onClick={() => {
                    setActiveKey(2)
                    getList2({ page: 1 })
                    setPage2(1)
                  }}
                >
                  팬플레이 댓글신고​
                </CNavLink>
              </div>
              {/* <CNavLink
                className={
                  activeKey === 2 ? 'cursor custom-tab-color-main' : 'cursor custom-tab-color'
                }
                active={activeKey === 2}
                onClick={() => {
                  setActiveKey(2)
                  getList2({ page: 1 })
                  setPage2(1)
                }}
              >
                팬플레이 댓글신고​
              </CNavLink> */}
            </CNavItem>
            <CNavItem>
              <div className="relative-dom">
                <span>{countTab3}</span>
                <CNavLink
                  className={
                    activeKey === 3 ? 'cursor custom-tab-color-main' : 'cursor custom-tab-color'
                  }
                  active={activeKey === 3}
                  onClick={() => {
                    setActiveKey(3)
                    getList3({ page: 1 })
                    setPage3(1)
                  }}
                >
                  팬톡 이벤트 댓글신고​
                </CNavLink>
              </div>
              {/* <CNavLink
                className={
                  activeKey === 3 ? 'cursor custom-tab-color-main' : 'cursor custom-tab-color'
                }
                active={activeKey === 3}
                onClick={() => {
                  setActiveKey(3)
                  getList3({ page: 1 })
                  setPage3(1)
                }}
              >
                팬톡 이벤트 댓글신고​
              </CNavLink> */}
            </CNavItem>
          </CNav>
          <CCardBody>
            <CTabContent>
              {/*Feed*/}
              <CTabPane role="tabpanel" visible={activeKey === 1}>
                <CCol md={12} className="d-flex flex-row align-items-center">
                  <CFormSelect
                    size="lg"
                    style={{ width: '20%' }}
                    aria-label="Large select example"
                    className="select-group__select"
                    value={'new'}
                    onChange={(e) => {
                      if (e.target.value === '7day') {
                        setStartDay(moment().subtract(6, 'days'))
                        setEndDay(moment())
                      } else if (e.target.value === '30day') {
                        setStartDay(moment().subtract(29, 'days'))
                        setEndDay(moment())
                      } else if (e.target.value === 'nowMonth') {
                        setStartDay(moment().startOf('month'))
                        setEndDay(moment().endOf('month'))
                      } else if (e.target.value === 'preMonth') {
                        let nowDate = new Date()
                        nowDate = new Date(
                          nowDate.getFullYear(),
                          nowDate.getMonth() - 1,
                          nowDate.getDate(),
                        )
                        setStartDay(moment(nowDate).startOf('month'))
                        setEndDay(moment(nowDate).endOf('month'))
                      } else if (e.target.value === 'selectDay') {
                        setIsCalen(true)
                      }
                    }}
                  >
                    <option value="new">
                      {startDay.format('YYYY-MM-DD')} ~ {endDay.format('YYYY-MM-DD')}
                    </option>
                    <option value="7day">최근 7일</option>
                    <option value="30day">최근 30일</option>
                    <option value="nowMonth">현재 월</option>
                    <option value="preMonth">전월</option>
                    <option value="selectDay">기간 지정</option>
                  </CFormSelect>
                  <CFormSelect
                    size="lg"
                    aria-label="포인트 전체"
                    style={{ width: '130px' }}
                    value={target1}
                    className="mx-2"
                    onChange={(e) => setTarget1(e.target.value)}
                  >
                    <option value="nickname">닉네임</option>
                    <option value="cid">CID</option>
                  </CFormSelect>
                  <CInputGroup style={{ width: '30%' }}>
                    <CFormInput
                      size="lg"
                      placeholder="검색어를 입력하세요"
                      value={keyWord1}
                      onChange={(e) => setKeyWord1(e.target.value)}
                    />
                    <CButton
                      type="button"
                      color="primary"
                      variant="outline"
                      id="basic-addon1"
                      onClick={() => {
                        getList({ page: 1 })
                        setPage1(1)
                      }}
                    >
                      <CIcon icon={cilSearch} size="lg" /> 조회
                    </CButton>
                  </CInputGroup>
                </CCol>
                <div className="select-group" style={{ borderTop: 'none' }}>
                  <CCol md={2}>
                    <CFormSelect
                      size="lg"
                      aria-label="포인트 전체"
                      className="w-100"
                      value={type1}
                      onChange={(e) => {
                        getList({
                          type: e.target.value,
                          isSort: true,
                        })
                        setType1(e.target.value)
                      }}
                    >
                      <option value="all">전체</option>
                      <option value="1">팬피드​</option>
                      <option value="3">팬DIY</option>
                      <option value="4">팬톡</option>
                    </CFormSelect>
                  </CCol>
                </div>
                <CRow>
                  <CTable bordered className="mt-3 table-text-center">
                    <CTableHead>
                      <CTableRow>
                        {tableManage.map((title, index) => {
                          return (
                            <CTableHeaderCell scope="col" key={index}>
                              {title.label}
                            </CTableHeaderCell>
                          )
                        })}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {listTab1 !== null && listTab1 !== undefined ? (
                        listTab1.map((value, index) => {
                          // Type checked

                          // User Img
                          const writerAvatar = value.avatar
                          let img1 = ''
                          if (writerAvatar !== null) img1 = process.env.REACT_APP_IMG + writerAvatar
                          return (
                            <CTableRow key={index}>
                              <CTableDataCell onClick={() => console.log(value)}>
                                {value.type === 1
                                  ? '팬피드'
                                  : value.type === 2
                                  ? '팬DIY'
                                  : value.type === 3
                                  ? '팬톡'
                                  : value.type === 4
                                  ? '게시물 신고'
                                  : '댓글관리'}
                              </CTableDataCell>
                              <CTableDataCell
                                className="cursor"
                                onClick={() => {
                                  setIsContentPage({
                                    use: true,
                                    id: value.play_id,
                                  })
                                }}
                              >
                                <span className="style-color-blue">{'등록 콘텐츠'}</span>
                              </CTableDataCell>
                              <CTableDataCell
                                className="text-center"
                                // className="d-flex"
                                style={{ width: '13%' }}
                              >
                                <div>
                                  <CImage
                                    onClick={() => {
                                      setIsImg({
                                        use: true,
                                        img: img1,
                                      })
                                    }}
                                    className="cursor"
                                    style={{ width: '40px', height: '40px', marginRight: '10px' }}
                                    src={img1}
                                    alt=""
                                    onError={(e) => (e.target.src = '/icon.png')}
                                  />
                                </div>
                                <span
                                  className="cursor text-info"
                                  onClick={() => {
                                    setUserInfo({
                                      use: true,
                                      id: value.user_id,
                                    })
                                  }}
                                >
                                  {value.nickname && value.nickname.length > 9
                                    ? value.nickname.substr(0, 9) + '...'
                                    : value.nickname}
                                </span>
                              </CTableDataCell>
                              <CTableDataCell style={{ width: '40%' }}>{value.mess}</CTableDataCell>
                              <CTableDataCell>
                                {moment(value.created_at).format('YYYY-MM-DD')}
                                <br />
                                {moment(value.created_at).format('HH:mm:ss')}
                              </CTableDataCell>
                              {role !== one && (
                                <CTableDataCell>
                                  <CButton
                                    color="danger"
                                    style={{ color: 'white' }}
                                    onClick={() => {
                                      setIsDeletePopup({
                                        use: true,
                                        id: value.id,
                                      })
                                    }}
                                  >
                                    삭제​
                                  </CButton>
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
                </CRow>
                {page1 !== pages1 && (
                  <CButton
                    color="dark"
                    size="sm"
                    className="moreBt"
                    onClick={() => {
                      getList({
                        page: page1 + 1,
                        type1,
                      })
                      setPage1(page1 + 1)
                    }}
                  >
                    더보기
                  </CButton>
                )}
              </CTabPane>
              {/* Report */}
              <CTabPane role="tabpanel" visible={activeKey === 2}>
                <CRow>
                  <CCol sm={12} className="d-flex flex-row align-items-center">
                    <CFormSelect
                      size="lg"
                      aria-label="포인트 전체"
                      className="me-2"
                      style={{ width: '130px' }}
                      value={type2}
                      onChange={(e) => setType2(e.target.value)}
                    >
                      <option value="all">전체</option>
                      <option value="1">팬피드​</option>
                      <option value="3">팬DIY</option>
                      <option value="4">팬톡</option>
                    </CFormSelect>
                    <CButton
                      type="button"
                      size="lg"
                      onClick={() => {
                        getList2({ page: 1 })
                        setPage2(1)
                      }}
                    >
                      조회​
                    </CButton>
                  </CCol>
                </CRow>
                {role !== one && (
                  <CRow className="g-3 mt-2">
                    <CCol sm={12} className="d-flex flex-row align-items-center">
                      <CButton
                        type="button"
                        color="primary"
                        variant="outline"
                        className="me-2"
                        id="basic-addon1"
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
                      >
                        전체선택 ( 취소 )​
                      </CButton>
                      <CButton
                        type="button"
                        color="primary"
                        variant="outline"
                        id="basic-addon1"
                        onClick={() => {
                          setIsModal2(true)
                        }}
                      >
                        삭제​
                      </CButton>
                    </CCol>
                  </CRow>
                )}
                <CRow>
                  <CTable bordered className="mt-3 table-text-center">
                    <CTableHead>
                      <CTableRow>
                        {tableReport.map((title, index) => {
                          return (
                            <CTableHeaderCell scope="col" key={index}>
                              {title.label}
                            </CTableHeaderCell>
                          )
                        })}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {listTab2 !== null && listTab2 !== undefined ? (
                        listTab2.map((value, index) => {
                          // Type checked
                          let typeName = ''
                          if (value.type === 1 || value.type === 2) {
                            typeName = '팬피드'
                          } else if (value.type === 3) {
                            typeName = '팬DIY'
                          } else if (value.type === 4 || value.type === 6) {
                            typeName = '팬톡'
                          }
                          return (
                            <CTableRow key={index}>
                              <CTableDataCell>
                                <div className="d-flex flex-row align-items-center py-4 justify-content-center">
                                  <CFormCheck
                                    id="flexCheckDefault"
                                    checked={value.checked}
                                    onChange={(e) => {
                                      value.checked = e.target.checked
                                      setListTab2([...listTab2])
                                    }}
                                  />
                                </div>
                              </CTableDataCell>
                              <CTableDataCell>
                                {value.type === 1
                                  ? '팬피드'
                                  : value.type === 2
                                  ? '팬DIY'
                                  : value.type === 3
                                  ? '팬톡'
                                  : value.type === 4
                                  ? '게시물 신고'
                                  : '댓글관리'}
                              </CTableDataCell>
                              <CTableDataCell
                                className="cursor"
                                onClick={() => {
                                  setIsContentPage({
                                    use: true,
                                    id: value.play_id,
                                  })
                                }}
                              >
                                <span className="style-color-blue">{'등록 콘텐츠'}</span>
                              </CTableDataCell>
                              <CTableDataCell style={{ width: '50%' }}>{value.mess}</CTableDataCell>
                              <CTableDataCell
                                className="cursor"
                                onClick={() => {
                                  setIsReportModal({
                                    use: true,
                                    id: value.reply_id,
                                    id2: value.play_id,
                                  })
                                }}
                              >
                                <span className="style-color-blue">{value.report_cnt}</span>
                              </CTableDataCell>
                              <CTableDataCell>
                                {moment(value.created_at).format('YYYY-MM-DD')}
                                <br />
                                {moment(value.created_at).format('HH:mm:ss')}
                              </CTableDataCell>
                              {role !== one && (
                                <CTableDataCell>
                                  <div className="d-flex flex-row align-items-center justify-content-center">
                                    <CButton
                                      className="text-nowrap"
                                      onClick={() => {
                                        setIsDeletePopup({
                                          use: true,
                                          id: value.reply_id,
                                        })
                                      }}
                                      color="danger"
                                      style={{ color: 'white', marginRight: '2px' }}
                                    >
                                      게시물​ 삭제​
                                    </CButton>
                                    <CButton
                                      className="text-nowrap"
                                      onClick={() => {
                                        processEvent(value.reply_id)
                                      }}
                                      color="primary"
                                      style={{ color: 'white' }}
                                    >
                                      처리​ 완료​
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
                </CRow>
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
              {/*Event*/}
              <CTabPane role="tabpanel" visible={activeKey === 3}>
                <CRow className="g-3 mb-3">
                  <CCol sm={12}>
                    <CButton
                      type="button"
                      color="primary"
                      variant="outline"
                      id="basic-addon1"
                      onClick={() => {
                        getList3({ page: 1 })
                        setPage3(1)
                      }}
                    >
                      새로고침​{' '}
                      <CIcon
                        icon={cilReload}
                        size="lg"
                        onClick={() => {
                          getList3({ page: 1 })
                          setPage3(1)
                        }}
                      />
                    </CButton>
                  </CCol>
                </CRow>
                {role !== one && (
                  <CRow className="g-3">
                    <CCol sm={12} className="d-flex flex-row align-items-center">
                      <CButton
                        type="button"
                        color="primary"
                        className="me-2"
                        variant="outline"
                        id="basic-addon1"
                        onClick={() => {
                          let isValue = ''
                          let isTrue = 0
                          let isFalse = 0
                          listTab3.map((val) => {
                            if (val.checked === true) {
                              isTrue = isTrue + 1
                              isFalse = isFalse - 1
                            } else if (val.checked === false) {
                              isTrue = isTrue - 1
                              isFalse = isFalse + 1
                            }
                            if (isTrue >= isFalse || isTrue * -1 == isFalse) {
                              val.checked = true
                              setListTab3([...listTab3])
                            }
                            if (isTrue < isFalse || isFalse < 0) {
                              val.checked = false
                              setListTab3([...listTab3])
                            }
                            if (isTrue < 0 || isTrue === 0) {
                              val.checked = true
                              setListTab3([...listTab3])
                            }
                          })
                        }}
                      >
                        전체선택 ( 취소 )​
                      </CButton>
                      <CButton
                        type="button"
                        color="primary"
                        variant="outline"
                        id="basic-addon1"
                        onClick={() => {
                          setIsModal2(true)
                        }}
                      >
                        삭제​
                      </CButton>
                    </CCol>
                  </CRow>
                )}
                <CRow>
                  <CTable bordered className="mt-3 table-text-center">
                    <CTableHead>
                      <CTableRow>
                        {tableEvent.map((title, index) => {
                          return (
                            <CTableHeaderCell scope="col" key={index}>
                              {title.label}
                            </CTableHeaderCell>
                          )
                        })}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {listTab3 !== null && listTab3 !== undefined ? (
                        listTab3.map((value, index) => {
                          const writerAvatar = value.avatar
                          let img1 = ''
                          if (writerAvatar !== null) img1 = process.env.REACT_APP_IMG + writerAvatar
                          console.log(value)
                          return (
                            <CTableRow key={index}>
                              <CTableDataCell>
                                <div className="d-flex flex-row align-items-center py-4 justify-content-center">
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
                              <CTableDataCell style={{ width: '20%' }}>
                                {value.title_play_lng === null || value.title_play_lng === undefined
                                  ? ''
                                  : value.title_play_lng.ko}
                              </CTableDataCell>
                              <CTableDataCell
                                className="text-center"
                                onClick={() => {
                                  setUserInfo({
                                    use: true,
                                    id: value.user_id,
                                  })
                                }}
                                // className="d-flex"
                                style={{ width: '13%' }}
                              >
                                <div>
                                  <CImage
                                    style={{ width: '40px', height: '40px', marginRight: '10px' }}
                                    src={img1}
                                    alt=""
                                    onError={(e) => (e.target.src = '/icon.png')}
                                  />
                                </div>
                                <span className="cursor text-info">
                                  {value.nickname && value.nickname.length > 9
                                    ? value.nickname.substr(0, 9) + '...'
                                    : value.nickname}
                                </span>
                              </CTableDataCell>
                              <CTableDataCell style={{ width: '35%' }}>{value.mess}</CTableDataCell>
                              <CTableDataCell>
                                <span
                                  onClick={() => {
                                    setIsReportModal({
                                      use: true,
                                      id: value.reply_id,
                                      id2: value.play_id,
                                    })
                                  }}
                                  className="style-color-blue cursor"
                                >
                                  {value.report_cnt}
                                </span>
                              </CTableDataCell>
                              <CTableDataCell>
                                {moment(value.created_at).format('YYYY-MM-DD')}
                                <br />
                                {moment(value.created_at).format('HH:mm:ss')}
                              </CTableDataCell>
                              {role !== one && (
                                <CTableDataCell>
                                  <div className="d-flex flex-row align-items-center justify-content-center">
                                    <CButton
                                      onClick={() => {
                                        setIsDeletePopup({
                                          use: true,
                                          id: value.reply_id,
                                        })
                                      }}
                                      color="danger"
                                      style={{ color: 'white', marginRight: '2px' }}
                                    >
                                      게시물​ 삭제​
                                    </CButton>
                                    <CButton
                                      onClick={() => {
                                        processEvent(value.reply_id)
                                      }}
                                      color="primary"
                                      style={{ color: 'white' }}
                                    >
                                      처리​ 완료​
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
                </CRow>
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
      {isContentPage.use && (
        <ContentsPage
          onClickClose={() =>
            setIsContentPage({
              use: false,
              id: '',
            })
          }
          onId={isContentPage.id}
        />
      )}
      {/* Calender */}
      {isCalen && (
        <CalenderPopup
          onClickClose={() => setIsCalen(false)}
          onStart={startDay}
          onEnd={endDay}
          onChecked={(start, end) => calenderData(start, end)}
        />
      )}
      {/* User Detail */}
      {userInfo.use && (
        <UserDetail
          onClickClose={() =>
            setUserInfo({
              ...userInfo,
              use: false,
            })
          }
          onCloseOkEvent={() => {
            setUserInfo({
              ...userInfo,
              use: false,
            })
            getList()
          }}
          onId={userInfo.id}
        />
      )}
      {/* Delete Checked popup*/}
      {isModal && (
        <CheckPopup
          onClickClose={() => setIsModal(false)}
          bodyContent={'선택하신 댓글을 삭제 하시겠습니까?'}
          title={'삭제'}
          onCheked={(value) => modalOkAllEvent(value)}
        />
      )}
      {isModal2 && (
        <CheckPopup
          onClickClose={() => setIsModal2(false)}
          bodyContent={'선택하신 댓글을 삭제 하시겠습니까?'}
          title={'삭제'}
          onCheked={(value) => modalOkAllEvent(value)}
        />
      )}
      {isDeletePopup.use && (
        <CheckPopup
          onClickClose={() =>
            setIsDeletePopup({
              use: false,
              id: '',
            })
          }
          bodyContent={'선택하신 댓글을 삭제하시겠습니까?'}
          title={'삭제'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'댓글 신고 처리가 완료 되었습니다.'}
        />
      )}
      {isOkCheck2 && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'처리가 완료되었습니다.'}
        />
      )}
      {/* Report Popup*/}
      {isReportModal.use && (
        <ReportTakPopup
          onClickClose={() => setIsReportModal({ use: false })}
          onId={isReportModal.id}
          onId2={isReportModal.id2}
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

export default FanReplyManager
