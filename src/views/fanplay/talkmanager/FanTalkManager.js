import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
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
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import EditEventTalkDetail from './popup/EditEventTalkDetail'
import EditCreateEventTalk from './popup/EditCreateEventTalk'
import { CalenderPopup } from 'src/components/publicPopup/CalenderPopup'
import { UserDetail } from 'src/views/member/popup/UserDetail'
import { LikePopup } from '../feedmanager/popup/LikePopup'
import { ReplayPopup } from '../feedmanager/popup/ReplayPopup'
import { CheckPopup } from 'src/components/publicPopup/CheckPopup'
import { NormalPopup } from 'src/components/publicPopup/NormalPopup'
import { ImgBig } from 'src/components/publicPopup/ImgBig'
import moment from 'moment'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'

const FanTalkManager = () => {
  const [activeKey, setActiveKey] = useState(1)
  //Event
  const [isEventTalkDetail, setIsEventTalkDetail] = useState({
    use: false,
    id: '',
  }) // Detail Popup
  const [isCreateEventTalk, setIsCreateEventTalk] = useState(false) // Detail Popup
  // Popup
  const [userInfo, setUserInfo] = useState({
    use: false,
    id: '',
  }) // User Information Popup
  const [isLikePopup, setIsLikePopup] = useState({
    use: false,
    id: '',
    id2: '',
  }) // like Popup
  const [isReplyPopup, setIsReplyPopup] = useState({
    use: false,
    id: '',
  }) // reply Popup
  const [isDeletePopup, setIsDeletePopup] = useState({
    use: false,
    id: '',
  }) // delete Popup
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  }) // img detail
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isCalen, setIsCalen] = useState(false) // calender Popup
  // Calender
  const [startDay, setStartDay] = useState(moment().subtract(6, 'days'))
  const [endDay, setEndDay] = useState(moment())

  // Tab1
  const [listTab1, setListTab1] = useState(null)
  const [page, setPage] = useState(1)
  const [pages1, setPages1] = useState(1)
  const [keyWord, setKeyWord] = useState('')
  const [searchTarget, setSearchTarget] = useState('nickname')
  const [orderBy, setOrderBy] = useState('new')

  // Tab2
  const [listTab2, setListTab2] = useState(null)
  const [page2, setPage2] = useState(1)
  const [status2, setStatus2] = useState('all')
  const [type2, setType2] = useState('5')
  const [pages2, setPages2] = useState(1)

  // Tab3
  const [listTab3, setListTab3] = useState(null)
  const [page3, setPage3] = useState(1)
  const [orderBy3, setOrderBy3] = useState('new')
  const [keyWord3, setKeyWord3] = useState('')
  const [searchTarget3, setSearchTarget3] = useState('nickname')
  const [pages3, setPages3] = useState(1)
  const one = 1
  const [role, setRole] = useState('')
  //Event Reply
  let tableTitle
  {
    role !== one
      ? (tableTitle = [
          { label: '번호' },
          { label: '​게시자 정보' },
          { label: '게시물 내용' },
          { label: '좋아요수​' },
          { label: '댓글수​' },
          { label: '업로드​ 일시​' },
          { label: '처리​' },
        ])
      : (tableTitle = [
          { label: '번호' },
          { label: '​게시자 정보' },
          { label: '게시물 내용' },
          { label: '좋아요수​' },
          { label: '댓글수​' },
          { label: '업로드​ 일시​' },
        ])
  }

  const tableTitleEvent = [
    { label: '상태' },
    { label: '​타입' },
    { label: '이벤트 팬톡 주제​' },
    { label: '배너이미지​' },
    { label: '댓글수​' },
    { label: '이벤트 아이디​​' },
    { label: '시작일​' },
    { label: '종료일​' },
  ]
  let tableEventReply
  {
    role !== one
      ? (tableEventReply = [
          { label: '작성자' },
          { label: '이벤트 주제​' },
          { label: '댓글 내용​' },
          { label: '하트수' },
          { label: '작성일​' },
          { label: '처리​' },
        ])
      : (tableEventReply = [
          { label: '작성자' },
          { label: '이벤트 주제​' },
          { label: '댓글 내용​' },
          { label: '하트수' },
          { label: '작성일​' },
        ])
  }

  useEffect(() => {
    if (activeKey === 1) {
      getList({ page: 1 })
      setPage(1)
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

    if (params.isSort) {
      params.page = 1
      setPage(1)
    }

    if (params.orderBy === undefined) {
      params.orderBy = orderBy
    }

    const queries = []
    if (keyWord !== '') {
      queries.push(`search=${keyWord}`)
      queries.push(`search_type=${searchTarget}`)
    }
    queries.push(`between_start_at=${startDay.format('YYYY-MM-DD')}`)
    queries.push(`between_end_at=${endDay.format('YYYY-MM-DD')} 23:59:59`)

    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)

    queries.push(`order_by=${params.orderBy}`)
    queries.push(`type=4`)
    queries.push(`status=1`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/fan/play/query${queryStr}`, headerConfig)
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

  // delete list
  const deleteTak = async (id) => {
    const res = await axios
      .delete(`/api/fan/play?id=${id}&isAdmin=1`)
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

  // Calender Modal value
  const calenderData = (start, end) => {
    setIsCalen(false)
    setStartDay(moment(start))
    setEndDay(moment(end))
  }

  // delete checked
  const modalOkEvent = (value) => {
    if (value) {
      if (activeKey === 1) {
        deleteTak(isDeletePopup.id)
      } else if (activeKey === 3) {
        deleteEventReply(isDeletePopup.id)
      }
    } else {
      setIsDeletePopup({
        use: false,
        id: '',
      })
    }
  }

  const closeModalEvent = () => {
    setIsOkCheck(false)
    if (activeKey === 1) {
      getList({ page: 1 })
      setPage(1)
    } else if (activeKey === 2) {
      getList2({ page: 1 })
      setPage2(1)
    } else if (activeKey === 3) {
      getList3({ page: 1 })
      setPage3(1)
    }
  }

  // delete list
  const deleteEventReply = async (id) => {
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
    queries.push(`order_by=new`)
    queries.push(`type=${type2}`)
    queries.push(`status=${status2}`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/fan/play/query${queryStr}`, headerConfig)
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

  // create success event
  const endEvent = () => {
    setIsCreateEventTalk(false)
    setIsEventTalkDetail({
      use: false,
      id: '',
    })
    if (activeKey === 2) {
      getList2({ page: 1 })
      setPage2(1)
    } else if (activeKey === 3) {
      getList3({ page: 1 })
      setPage3(1)
    }
  }

  // Tab3
  const getList3 = async (params) => {
    if (!params) {
      params = {}
    }

    if (params.page === undefined) {
      params.page = page3
    }

    if (params.orderBy === undefined) {
      params.orderBy = orderBy3
    }

    const queries = []
    if (keyWord3 !== '') {
      queries.push(`search=${keyWord3}`)
      queries.push(`search_type=${searchTarget3}`)
    }
    if (params.isSort) {
      if (params.page > 1) {
        queries.push(`page=1`)
        queries.push(`limit=${30 * params.page}`)
      } else {
        queries.push(`page=${params.page}`)
        queries.push(`limit=30`)
      }
    } else {
      queries.push(`page=${params.page}`)
      queries.push(`limit=30`)
    }
    queries.push(`order_by=${params.orderBy}`)
    queries.push(`status=1`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios
      .get(`/api/fan/talk/event/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) return
    setPages3(res.data.value.pages ? res.data.value.pages : 1)
    if (params.isSort !== undefined) {
      if (params.isSort) {
        setListTab3(res.data.value.items)
      }
    } else {
      if (params.page > 1) {
        res.data.value.items.map((value) => listTab3.push(value))
        setListTab3([...listTab3])
      } else {
        setListTab3(res.data.value.items)
      }
    }
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
                팬톡 관리자​
              </CNavLink>
            </CNavItem>
            <CNavItem>
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
                이벤트 팬톡​​
              </CNavLink>
            </CNavItem>
            <CNavItem>
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
                이벤트 팬톡 댓글​
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CTabContent>
              {/* Manager */}
              <CTabPane role="tabpanel" visible={activeKey === 1}>
                <CCol sm={12} className="d-flex flex-row align-items-center">
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
                    style={{ width: '130px' }}
                    aria-label="Large select example"
                    className="mx-2 select-group__select"
                    value={searchTarget}
                    onChange={(e) => setSearchTarget(e.target.value)}
                  >
                    <option value="nickname">닉네임</option>
                    <option value="cid">CID</option>
                    {/* <option value="artist">아티스트 코드</option> */}
                  </CFormSelect>
                  <CInputGroup style={{ width: '35%' }}>
                    <CFormInput
                      size="lg"
                      placeholder="검색할 키워드를 입력하세요."
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={keyWord}
                      onChange={(e) => setKeyWord(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          getList({ page: 1 })
                          setPage(1)
                        }
                      }}
                    />
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
                <div className="select-group" style={{ borderTop: 'none' }}>
                  <CFormSelect
                    size="lg"
                    aria-label="Large select example"
                    className="mr-3 select-group__select"
                    value={orderBy}
                    onChange={(e) => {
                      getList({
                        orderBy: e.target.value,
                        isSort: true,
                      })
                      setOrderBy(e.target.value)
                    }}
                  >
                    <option value="new">최신순</option>
                    {/* <option value="artist">아티스트 수</option> */}
                    <option value="reply">댓글수</option>
                    <option value="like">좋아요순</option>
                    {/* <option value="share">공유순</option> */}
                  </CFormSelect>
                </div>
                <CTable bordered className="mt-3 table-text-center">
                  <CTableHead>
                    <CTableRow>
                      {tableTitle.map((title, index) => {
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
                        const writerAvatar = value.avatar
                        let img1 = ''
                        if (writerAvatar !== null) img1 = process.env.REACT_APP_IMG + writerAvatar
                        return (
                          <CTableRow key={index}>
                            <CTableDataCell onClick={() => console.log(value)}>
                              {index + 1}
                            </CTableDataCell>
                            <CTableDataCell scope="row" className="artist-img-dom cursor">
                              <div className="d-flex flex-column align-items-center">
                                <div className="artist-img-dom__img-border2">
                                  <CImage
                                    className="artist-img-dom__img-border__profile"
                                    style={{ borderRadius: '50%' }}
                                    onClick={() => {
                                      setIsImg({
                                        use: true,
                                        img: img1,
                                      })
                                    }}
                                    src={img1}
                                    alt=""
                                    onError={(e) => (e.target.src = '/icon.png')}
                                  />
                                </div>
                                <span
                                  className="cursor"
                                  onClick={() => {
                                    setUserInfo({
                                      use: true,
                                      id: value.user_id,
                                    })
                                  }}
                                  style={{ color: 'blue' }}
                                >
                                  {value.nickname && value.nickname.length > 9
                                    ? value.nickname.substr(0, 9) + '...'
                                    : value.nickname}
                                </span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell style={{ width: '45%' }}>
                              {value.hashtag}
                              {value.hashtag !== '' ? <br /> : ''}
                              {value.body_play}
                            </CTableDataCell>
                            <CTableDataCell
                              className="cursor"
                              onClick={() => {
                                setIsLikePopup({
                                  use: true,
                                  id: value.id,
                                  id2: '',
                                })
                              }}
                            >
                              <span className="style-color-blue">{value.likecnt}</span>
                            </CTableDataCell>
                            <CTableDataCell
                              className="cursor"
                              onClick={() => {
                                setIsReplyPopup({
                                  use: true,
                                  id: value.id,
                                })
                              }}
                            >
                              <span className="style-color-blue">{value.replycnt}</span>
                            </CTableDataCell>
                            <CTableDataCell>
                              {moment(value.created_at).format('YYYY-MM-DD')}
                              <br />
                              {moment(value.created_at).format('HH:mm:ss')}
                            </CTableDataCell>
                            {role !== one && (
                              <CTableDataCell>
                                <CButton
                                  color="danger"
                                  className="text-nowrap"
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
                {page !== pages1 && (
                  <CButton
                    color="dark"
                    size="sm"
                    className="moreBt"
                    onClick={() => {
                      getList({
                        page: page + 1,
                        orderBy,
                      })
                      setPage(page + 1)
                    }}
                  >
                    더보기
                  </CButton>
                )}
              </CTabPane>
              {/* Event */}
              <CTabPane role="tabpanel" visible={activeKey === 2}>
                <CRow>
                  <CCol xs={12}>
                    <CRow className="g-3">
                      <CCol sm={12} className="d-flex flex-row align-items-center">
                        <CFormSelect
                          size="lg"
                          aria-label="Large select example"
                          className="search-bar__select"
                          style={{ width: '140px' }}
                          value={status2}
                          onChange={(e) => setStatus2(e.target.value)}
                        >
                          <option value="all">전체​</option>
                          <option value="1">정상</option>
                          <option value="0">비활성​</option>
                          <option value="2">종료​</option>
                          <option value="-1">삭제​</option>
                        </CFormSelect>
                        <CFormSelect
                          size="lg"
                          aria-label="Large select example"
                          className="mx-2 search-bar__select"
                          style={{ width: '140px' }}
                          value={type2}
                          onChange={(e) => setType2(e.target.value)}
                        >
                          <option value="5">전체​</option>
                          <option value="6">이벤트형​</option>
                          <option value="7">배너형​</option>
                        </CFormSelect>
                        <CInputGroup>
                          <CButton
                            type="button"
                            color="primary"
                            variant="outline"
                            id="basic-addon1"
                            onClick={() => {
                              getList2({
                                page: 1,
                              })
                              setPage2(1)
                            }}
                          >
                            <CIcon icon={cilSearch} size="lg" /> 조회
                          </CButton>
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      {role !== one && (
                        <div className="button-group mt-5">
                          <CButton
                            onClick={() => {
                              setIsCreateEventTalk(true)
                            }}
                            color="info"
                            style={{ color: 'white' }}
                            size="sm"
                            className="button-group__btn p-2"
                          >
                            이벤트 팬톡 등록
                          </CButton>
                        </div>
                      )}
                    </CRow>
                    <CRow>
                      <CTable bordered className="mt-3 table-text-center">
                        <CTableHead>
                          <CTableRow>
                            {tableTitleEvent.map((title, index) => {
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
                              // img
                              const imgText = value.img_play
                              let imgMain = ''
                              if (imgText !== null) {
                                imgMain = process.env.REACT_APP_IMG + imgText.ko
                              } else {
                                imgMain = ''
                              }

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
                                  <CTableDataCell>
                                    {value.status === 1
                                      ? '진행중'
                                      : value.status === 0
                                      ? '비활성화'
                                      : value.status === -1
                                      ? '삭제'
                                      : '종료'}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {value.type === 6 ? '이벤트형' : '배너형'}
                                  </CTableDataCell>
                                  <CTableDataCell
                                    className="cursor"
                                    onClick={() => {
                                      setIsEventTalkDetail({
                                        use: true,
                                        id: value.id,
                                      })
                                    }}
                                    style={{ width: '30%' }}
                                  >
                                    <span className="style-color-blue">
                                      {value.title_play_lng === null ? '' : value.title_play_lng.ko}
                                    </span>
                                  </CTableDataCell>
                                  <CTableDataCell
                                    className="cursor"
                                    onClick={() => {
                                      setIsImg({
                                        use: true,
                                        img: imgMain,
                                      })
                                    }}
                                  >
                                    <CImage
                                      className="recImg"
                                      src={imgMain}
                                      alt=""
                                      onError={(e) => (e.target.src = '/icon.png')}
                                    />
                                  </CTableDataCell>
                                  <CTableDataCell
                                    className="cursor"
                                    onClick={() => {
                                      setIsReplyPopup({
                                        use: true,
                                        id: value.id,
                                      })
                                    }}
                                  >
                                    <span className="style-color-blue">{value.replycnt}</span>
                                  </CTableDataCell>
                                  <CTableDataCell>{value.id}</CTableDataCell>
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
                  </CCol>
                </CRow>
              </CTabPane>
              {/*Event Reply*/}
              <CTabPane role="tabpanel" visible={activeKey === 3}>
                <CRow>
                  <CCol xs={12}>
                    <CRow className="g-3">
                      <CCol sm={12} className="d-flex flex-row align-items-center">
                        <CFormSelect
                          size="lg"
                          style={{ width: '190px' }}
                          aria-label="Large select example"
                          className="search-bar__select me-2"
                          value={searchTarget3}
                          onChange={(e) => setSearchTarget3(e.target.value)}
                        >
                          <option value="nickname">닉네임</option>
                          <option value="cid">CID​</option>
                          <option value="event_id">이벤트 아이디​</option>
                        </CFormSelect>
                        <CInputGroup style={{ width: '40%' }}>
                          <CFormInput
                            size="lg"
                            placeholder="검색어를 입력하세요​"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={keyWord3}
                            onChange={(e) => setKeyWord3(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                getList3({ page: 1 })
                                setPage3(1)
                              }
                            }}
                          />
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
                            <CIcon icon={cilSearch} size="lg" /> 조회
                          </CButton>
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <div className="select-group" style={{ borderTop: 'none' }}>
                      <CFormSelect
                        size="lg"
                        aria-label="Large select example"
                        className="mr-3 select-group__select"
                        value={orderBy3}
                        onChange={(e) => {
                          getList3({
                            orderBy: e.target.value,
                            isSort: true,
                          })
                          setOrderBy3(e.target.value)
                        }}
                      >
                        <option value="new">최신순</option>
                        <option value="like">하트순</option>
                      </CFormSelect>
                    </div>
                    <CRow>
                      <CTable bordered className="mt-3 table-text-center">
                        <CTableHead>
                          <CTableRow>
                            {tableEventReply.map((title, index) => {
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
                              if (writerAvatar !== null)
                                img1 = process.env.REACT_APP_IMG + writerAvatar

                              // created
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
                                  <CTableDataCell scope="row" className="artist-img-dom cursor">
                                    <div className="d-flex flex-column align-items-center">
                                      <div className="artist-img-dom__img-border2">
                                        <CImage
                                          onClick={() => {
                                            setIsImg({
                                              use: true,
                                              img: img1,
                                            })
                                          }}
                                          className="artist-img-dom__img-border__profile cursor"
                                          src={img1}
                                          alt=""
                                          onError={(e) => (e.target.src = '/icon.png')}
                                        />
                                      </div>
                                      <span
                                        onClick={() => {
                                          setUserInfo({
                                            use: true,
                                            id: value.user_id,
                                          })
                                        }}
                                        className="cursor"
                                        style={{ color: 'blue' }}
                                      >
                                        {value.nickname && value.nickname.length > 9
                                          ? value.nickname.substr(0, 9) + '...'
                                          : value.nickname}
                                      </span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell
                                    // className="cursor"
                                    // onClick={() => {
                                    //   setIsEventTalkDetail({
                                    //     use: true,
                                    //     id: value.play_id,
                                    //   })
                                    // }}
                                    style={{ width: '30%' }}
                                  >
                                    <span>
                                      {value.title_play_lng === null ? '' : value.title_play_lng.ko}
                                    </span>
                                  </CTableDataCell>
                                  <CTableDataCell style={{ width: '30%' }}>
                                    {value.mess}
                                  </CTableDataCell>
                                  <CTableDataCell
                                    className="cursor"
                                    onClick={() => {
                                      setIsLikePopup({
                                        use: true,
                                        id: value.play_id,
                                        id2: value.id,
                                      })
                                    }}
                                  >
                                    <span className="style-color-blue">{value.like_cnt}</span>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                      <span>{created.date}</span>
                                      <span>{created.time}​</span>
                                    </div>
                                  </CTableDataCell>
                                  {role !== one && (
                                    <CTableDataCell>
                                      <CButton
                                        onClick={() => {
                                          setIsDeletePopup({
                                            use: true,
                                            id: value.id,
                                          })
                                        }}
                                        color="danger"
                                        style={{ color: 'white' }}
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
                    {page3 !== pages3 && (
                      <CButton
                        color="dark"
                        size="sm"
                        className="moreBt"
                        onClick={() => {
                          getList3({
                            page: page3 + 1,
                            orderBy3,
                          })
                          setPage3(page3 + 1)
                        }}
                      >
                        더보기
                      </CButton>
                    )}
                  </CCol>
                </CRow>
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
      {/*Manage*/}
      {/*Event*/}
      {isEventTalkDetail.use && (
        <EditEventTalkDetail
          onClickClose={() =>
            setIsEventTalkDetail({
              use: false,
              id: '',
            })
          }
          onId={isEventTalkDetail.id}
          onEndEvent={() => endEvent()}
        />
      )}
      {isCreateEventTalk && (
        <EditCreateEventTalk
          onClickClose={() => setIsCreateEventTalk(false)}
          onEndEvent={() => endEvent()}
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
      {/* Like & Replay Popup*/}
      {isLikePopup.use && (
        <LikePopup
          onClickClose={() =>
            setIsLikePopup({
              use: false,
              id: '',
              id2: '',
            })
          }
          onId={isLikePopup.id}
          onId2={isLikePopup.id2}
        />
      )}
      {isReplyPopup.use && (
        <ReplayPopup
          onClickClose={() =>
            setIsReplyPopup({
              use: false,
              id: '',
            })
          }
          onId={isReplyPopup.id}
        />
      )}
      {/* Delete Checked popup*/}
      {isDeletePopup.use && (
        <CheckPopup
          onClickClose={() =>
            setIsDeletePopup({
              use: false,
              id: '',
            })
          }
          bodyContent={
            activeKey === 1
              ? '선택하신 게시물을 삭제하시겠습니까?'
              : '선택하신 댓글을 삭제하시겠습니까?'
          }
          title={'삭제'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'삭제가 완료되었습니다.'}
        />
      )}
      {/* image detail */}
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

export default FanTalkManager
