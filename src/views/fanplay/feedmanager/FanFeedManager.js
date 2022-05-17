import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
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
import moment from 'moment'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import { CalenderPopup } from 'src/components/publicPopup/CalenderPopup'
import { UserDetail } from 'src/views/member/popup/UserDetail'
import { CheckPopup } from 'src/components/publicPopup/CheckPopup'
import { NormalPopup } from 'src/components/publicPopup/NormalPopup'
import { LikePopup } from './popup/LikePopup'
import { ReplayPopup } from './popup/ReplayPopup'
import { SharePopup } from './popup/SharePopup'
import EditImageDetail from '../EditImageDetail'
import EditThekFollower from './popup/EditThekFollower'
import EditCreateThekFeed from './popup/EditCreateThekFeed'
import EditThekFeed from './popup/EditThekFeed'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'
import { ImgBig } from '../../../components/publicPopup/ImgBig'
import { ArtistDetail } from '../../artist/popup/ArtistDetail'

const FanFeedManager = () => {
  // activeKey 2 End of use....
  const [activeKey, setActiveKey] = useState(1)
  const [isThekFollow, setIsThekFollow] = useState(false) // Detail Popup
  const [isCreateThekFeed, setIsCreateThekFeed] = useState(false) // Detail Popup
  const [isDetailThekFeed, setIsDetailThekFeed] = useState({
    use: false,
    id: '',
  }) // thekFeed detail popup
  const [isCalen, setIsCalen] = useState(false) // calender Popup
  const [userInfo, setUserInfo] = useState({
    use: false,
    id: '',
  }) // User Information Popup
  const [isImageDetail, setIsImageDetail] = useState({
    use: false,
    imgs: [],
  })
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  })
  // img detail Popup
  const [isModal, setIsModal] = useState({
    use: false,
    id: '',
  }) // modify check Popup
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Popup
  const [isLikePopup, setIsLikePopup] = useState({
    use: false,
    id: '',
  }) // like popup
  const [isReplyPopup, setIsReplyPopup] = useState({
    use: false,
    id: '',
  }) // reply popup
  const [isSharePopup, setIsSharePopup] = useState({
    use: false,
    id: '',
  }) // share popup
  const [isDetailPopup, setIsDetailPopup] = useState({ use: false, id: '', status: '' })
  // Calender
  const [startDay, setStartDay] = useState(moment().subtract(6, 'days'))
  const [endDay, setEndDay] = useState(moment())
  // list Tab1 pagrams
  const [listTab1, setListTab1] = useState(null)
  const [page, setPage] = useState(1)
  const [keyWord, setKeyWord] = useState('')
  const [searchTarget, setSearchTarget] = useState('nickname')
  const [feedType, setFeedType] = useState('fanfeed')
  const [orderBy, setOrderBy] = useState('new')
  const [pages1, setPages1] = useState(1)
  // list Tab2 params
  const [listTab2, setListTab2] = useState(null)
  const [page2, setPage2] = useState(1)
  const [pages2, setPages2] = useState(1)
  const [target, setTarget] = useState('new')
  const one = 1
  const [role, setRole] = useState('')

  let tableTitle
  {
    role !== one
      ? (tableTitle = [
          { label: '번호' },
          { label: '아티스트​' },
          { label: '게시자 정보​' },
          { label: '제목​​' },
          { label: '내용​' },
          { label: '콘텐츠(이미지)' },
          { label: '콘텐츠(링크)' },
          { label: '좋아요수​' },
          { label: '댓글수​' },
          // { label: '공유수​' },
          { label: '업로드​ 일시' },
          { label: '처리​​' },
        ])
      : (tableTitle = [
          { label: '번호' },
          { label: '아티스트​' },
          { label: '게시자 정보​' },
          { label: '제목​​' },
          { label: '내용​' },
          { label: '콘텐츠(이미지)' },
          { label: '콘텐츠(링크)' },
          { label: '좋아요수​' },
          { label: '댓글수​' },
          // { label: '공유수​' },
          { label: '업로드​ 일시' },
        ])
  }

  const tableTitleThek = [
    { label: '번호' },
    { label: '제목' },
    { label: '내용' },
    { label: '콘텐츠(이미지)​' },
    { label: '콘텐츠(링크)​' },
    { label: '좋아요수' },
    { label: '댓글수​' },
    { label: '공유수' },
    { label: '업로드​ 일시​' },
  ]

  useEffect(() => {
    if (activeKey === 1) {
      getList({ page: 1 })
    } else if (activeKey === 2) {
      getList2({ page: 1 })
    }
  }, [activeKey])

  // Calender Modal value
  const calenderData = (start, end) => {
    setIsCalen(false)
    setStartDay(moment(start))
    setEndDay(moment(end))
  }

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

    if (params.type === undefined) {
      params.type = feedType
    }

    const queries = []

    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)

    if (keyWord !== '') {
      queries.push(`search=${keyWord}`)
      queries.push(`search_type=${searchTarget}`)
    }
    queries.push(`between_start_at=${startDay.format('YYYY-MM-DD')}`)
    queries.push(`between_end_at=${endDay.format('YYYY-MM-DD')} 23:59:59`)
    queries.push(`order_by=${params.orderBy}`)
    queries.push(`status=1`)
    queries.push(`type=${params.type}`)

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

  const getList2 = async (params) => {
    if (!params) {
      params = {}
    }

    if (params.page === undefined) {
      params.page = page2
    }

    const queries = []
    queries.push(`order_by=${target}`)
    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)
    queries.push(`status=1`)
    queries.push(`type=2`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/fan/play/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    setPages2(res.data.value.pages ? res.data.value.pages : 1)
    if (!res.data.success) return
    if (params.page > 1) {
      res.data.value.items.map((value) => listTab2.push(value))
      setListTab2([...listTab2])
      return
    }
    setListTab2(res.data.value.items)
  }

  const createOk = (value) => {
    if (value) {
      setIsCreateThekFeed(false)
      setIsDetailThekFeed({
        use: false,
        id: '',
      })
      getList2({ page: 1 })
      setPage2(1)
    }
  }
  // delete Fanfeed manager
  const deleteFan = async (id) => {
    const res = await axios
      .delete(`/api/fan/play?id=${id}&isAdmin=1`)
      .catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }

  // delete checked
  const modalOkEvent = (value) => {
    if (value) {
      setIsModal(false)
      deleteFan(isModal.id)
    } else {
      setIsModal(false)
    }
  }

  const closeModalEvent = () => {
    setIsOkCheck(false)
    getList({ page: 1 })
    setPage(1)
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
                팬피드 관리자​
              </CNavLink>
            </CNavItem>
            {/* Don't use it. */}
            {/* <CNavItem>
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
                덕킹 피드​
              </CNavLink>
            </CNavItem> */}
          </CNav>
          <CCardBody>
            <CTabContent>
              <CTabPane role="tabpanel" aria-labelledby="fan_feed" visible={activeKey === 1}>
                <CRow className="g-3">
                  <CRow className="g-3 ">
                    <CCol sm={12} className="d-flex flex-row align-items-center">
                      <CFormSelect
                        size="lg"
                        aria-label="Large select example"
                        className="select-group__select"
                        style={{ width: '20%' }}
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
                        aria-label="Large select example"
                        className="mx-2 select-group__select"
                        style={{ width: '180px' }}
                        value={searchTarget}
                        onChange={(e) => setSearchTarget(e.target.value)}
                      >
                        <option value="nickname">닉네임</option>
                        <option value="cid">CID</option>
                        <option value="artist_code">아티스트 코드</option>
                      </CFormSelect>
                      <CInputGroup style={{ width: '40%' }}>
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
                            type: feedType,
                          })
                          setOrderBy(e.target.value)
                        }}
                      >
                        <option value="new">최신순</option>
                        <option value="reply">댓글순</option>
                        <option value="like">좋아요순</option>
                      </CFormSelect>
                      <CFormSelect
                        size="lg"
                        aria-label="Large select example"
                        className="mr-3 select-group__select"
                        value={feedType}
                        onChange={(e) => {
                          getList({
                            type: e.target.value,
                            isSort: true,
                            orderBy,
                          })
                          setFeedType(e.target.value)
                        }}
                      >
                        <option value="fanfeed">타입전체</option>
                        <option value="1">이미지</option>
                        <option value="2">링크</option>
                      </CFormSelect>
                    </div>
                  </CRow>
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
                          // artist img
                          const imgArtist = value.img_artist === null ? '' : value.img_artist.main
                          const artistImg = process.env.REACT_APP_IMG + imgArtist

                          // user
                          const writerAvatar = value.avatar === null ? '' : value.avatar
                          const userImg = process.env.REACT_APP_IMG + writerAvatar
                          // contents
                          const contents =
                            value.img_play[0] === undefined ? '' : value.img_play[0].url
                          const conImg = process.env.REACT_APP_IMG + contents

                          // updated
                          const updated = {
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
                              <CTableDataCell onClick={() => console.log(value)}>
                                {index + 1}
                              </CTableDataCell>
                              <CTableDataCell
                                scope="row"
                                className="artist-img-dom cursor"
                                style={{ width: '10%' }}
                                onClick={() => {
                                  setIsDetailPopup({ id: value.artist_id, use: true })
                                }}
                              >
                                <div className="d-flex flex-column align-items-center">
                                  <div
                                    className="artist-img-dom__img-border2"
                                    style={{ borderRadius: 'inherit' }}
                                  >
                                    <CImage
                                      className="artist-img-dom__img-border__profile"
                                      src={artistImg}
                                      alt=""
                                      onError={(e) => (e.target.src = '/icon.png')}
                                    />
                                  </div>
                                  <div>
                                    <span>
                                      {value.name_artist === null
                                        ? ''
                                        : value.name_artist.ko.length < 10
                                        ? value.name_artist.ko
                                        : value.name_artist.ko.substr(0, 9) + '...'}
                                    </span>
                                  </div>
                                  <div>
                                    <span>({value.code_artist})</span>
                                  </div>
                                </div>
                              </CTableDataCell>
                              <CTableDataCell scope="row" className="artist-img-dom cursor">
                                <div className="d-flex flex-column align-items-center">
                                  <div className="artist-img-dom__img-border2">
                                    <CImage
                                      onClick={() =>
                                        setIsImg({
                                          use: true,
                                          img: userImg,
                                        })
                                      }
                                      className="artist-img-dom__img-border__profile"
                                      style={{ borderRadius: '50%' }}
                                      src={userImg}
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
                              <CTableDataCell style={{ width: '10%' }}>
                                {value.title_play}
                              </CTableDataCell>
                              <CTableDataCell style={{ width: '20%' }}>
                                {value.hashtag}
                                {value.hashtag !== '' ? <br /> : ''}
                                {value.body_play}
                              </CTableDataCell>
                              <CTableDataCell
                                scope="row"
                                className="artist-img-dom"
                                onClick={() =>
                                  setIsImageDetail({ use: true, imgs: value.img_play })
                                }
                              >
                                <div className="d-flex flex-column align-items-center">
                                  <div
                                    className="artist-img-dom__img-border"
                                    style={{ borderRadius: 'inherit', marginRight: '0px' }}
                                  >
                                    <CImage
                                      className="artist-img-dom__img-border__profile cursor"
                                      src={conImg}
                                      alt=""
                                      onError={(e) => (e.target.src = '/icon.png')}
                                    />
                                  </div>
                                  <div>
                                    <span className="style-color-blue cursor">
                                      {value.img_play === ''
                                        ? '0 / 0'
                                        : `1 / ${value.img_play.length}`}
                                    </span>
                                  </div>
                                </div>
                              </CTableDataCell>
                              <CTableDataCell style={{ width: '10%' }}>
                                <a
                                  href={value.link_play}
                                  className="text-decoration-none"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {value.link_play}
                                </a>
                              </CTableDataCell>
                              <CTableDataCell
                                onClick={() => {
                                  setIsLikePopup({
                                    use: true,
                                    id: value.id,
                                  })
                                }}
                              >
                                <span className="cursor style-color-blue">{value.likecnt}</span>
                              </CTableDataCell>
                              <CTableDataCell
                                onClick={() => {
                                  setIsReplyPopup({
                                    use: true,
                                    id: value.id,
                                  })
                                }}
                              >
                                <span className="cursor style-color-blue">{value.replycnt}</span>
                              </CTableDataCell>
                              {/* <CTableDataCell
                                onClick={() => {
                                  setIsSharePopup({
                                    use: true,
                                    id: value.id,
                                  })
                                }}
                              >
                                <span className="cursor style-color-blue">{value.sharecnt}</span>
                              </CTableDataCell> */}
                              <CTableDataCell>
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                  <span>{updated.date}</span>
                                  <br />
                                  <span>{updated.time}</span>
                                </div>
                              </CTableDataCell>
                              {role !== one && (
                                <CTableDataCell scope="row">
                                  <CButton
                                    type="button"
                                    className="text-nowrap"
                                    color="danger"
                                    style={{ color: 'white' }}
                                    id="basic-addon1"
                                    onClick={() => {
                                      setIsModal({
                                        use: true,
                                        id: value.id,
                                      })
                                    }}
                                  >
                                    삭제
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
                          feedType,
                          orderBy,
                        })
                        setPage(page + 1)
                      }}
                    >
                      더보기
                    </CButton>
                  )}
                </CRow>
              </CTabPane>
              {/*Fan feed thek*/}
              <CTabPane role="tabpanel" aria-labelledby="fan_feed" visible={activeKey === 2}>
                <CRow>
                  <CCol xs={12}>
                    <CRow className="g-3">
                      <CCol className="d-flex flex-row align-items-center">
                        <CCol sm={1} className="me-2" style={{ width: '150px' }}>
                          <CFormSelect
                            size="lg"
                            aria-label="Large select example"
                            className="mr-3 select-group__select"
                            value={target}
                            onChange={(e) => {
                              setTarget(e.target.value)
                            }}
                          >
                            <option value="new">최신순</option>
                            <option value="reply">댓글순</option>
                            <option value="like">좋아요순</option>
                            {/*<option value="share">공유순</option>*/}
                          </CFormSelect>
                        </CCol>
                        <CCol sm={6}>
                          <CInputGroup>
                            <CButton
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
                      </CCol>
                    </CRow>
                    <CRow>
                      <div className="button-group mt-5">
                        <CButton
                          onClick={() => {
                            setIsThekFollow(true)
                          }}
                          color="info"
                          size="sm"
                          className="button-group__bt"
                        >
                          팔로워
                        </CButton>
                        <CButton
                          onClick={() => {
                            setIsCreateThekFeed(true)
                          }}
                          color="success"
                          size="sm"
                          className="button-group__bt"
                        >
                          덕피드 등록
                        </CButton>
                      </div>
                    </CRow>
                    <CRow>
                      <CTable bordered className="mt-3 table-text-center">
                        <CTableHead>
                          <CTableRow>
                            {tableTitleThek.map((title, index) => {
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
                              // contents
                              const contents =
                                value.img_play.length === 0 ? '' : value.img_play[0].url
                              const conImg = process.env.REACT_APP_IMG + contents
                              return (
                                <CTableRow key={index}>
                                  <CTableDataCell>{value.id}</CTableDataCell>
                                  <CTableDataCell
                                    onClick={() =>
                                      setIsDetailThekFeed({
                                        use: true,
                                        id: value.id,
                                      })
                                    }
                                    className="cursor"
                                  >
                                    <span className="style-color-blue">{value.title_play}</span>
                                  </CTableDataCell>
                                  <CTableDataCell>{value.body_play}</CTableDataCell>
                                  <CTableDataCell
                                    scope="row"
                                    className="artist-img-dom"
                                    onClick={() =>
                                      setIsImageDetail({ use: true, imgs: value.img_play })
                                    }
                                  >
                                    <div className="d-flex flex-column align-items-center">
                                      <div
                                        className="artist-img-dom__img-border"
                                        style={{ borderRadius: 'inherit', marginRight: '0px' }}
                                      >
                                        <CImage
                                          className="artist-img-dom__img-border__profile cursor"
                                          src={conImg}
                                          alt=""
                                          onError={(e) => (e.target.src = '/icon.png')}
                                        />
                                      </div>
                                      <div>
                                        <span className="style-color-blue cursor">
                                          {value.img_play === null
                                            ? '0 / 0'
                                            : `1 / ${value.img_play.length}`}
                                        </span>
                                      </div>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <a
                                      className="text-decoration-none"
                                      href={value.link_play}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {value.link_play}
                                    </a>
                                  </CTableDataCell>
                                  <CTableDataCell
                                    onClick={() => {
                                      setIsLikePopup({
                                        use: true,
                                        id: value.id,
                                      })
                                    }}
                                  >
                                    <span className="cursor style-color-blue">{value.isLike}</span>
                                  </CTableDataCell>
                                  <CTableDataCell
                                    onClick={() => {
                                      setIsReplyPopup({
                                        use: true,
                                        id: value.id,
                                      })
                                    }}
                                  >
                                    <span className="cursor style-color-blue">
                                      {value.replycnt}
                                    </span>
                                  </CTableDataCell>
                                  <CTableDataCell
                                    onClick={() => {
                                      setIsSharePopup({
                                        use: true,
                                        id: value.id,
                                      })
                                    }}
                                  >
                                    <span className="cursor style-color-blue">
                                      {value.sharecnt}
                                    </span>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {value.updated_at === null
                                      ? ''
                                      : moment(value.updated_at).format('YYYY-MM-DD HH:mm:ss')}
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
                          getList2({ page: page2 + 1 })
                          setPage2(page2 + 1)
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
      {isDetailPopup.use && (
        <ArtistDetail
          onClickClose={() => setIsDetailPopup({ use: false, id: '', status: '' })}
          onId={isDetailPopup.id}
          onChecked={() => {
            getList({ limit: 30 * page, page: 1, new: true })
            setIsDetailPopup({ use: false, id: '', status: '' })
          }}
        />
      )}
      {isThekFollow && <EditThekFollower onClickClose={() => setIsThekFollow(false)} />}
      {isCreateThekFeed && (
        <EditCreateThekFeed
          onClickClose={() => setIsCreateThekFeed(false)}
          onCreate={(value) => createOk(value)}
        />
      )}
      {isDetailThekFeed.use && (
        <EditThekFeed
          onClickClose={() =>
            setIsDetailThekFeed({
              use: false,
              id: '',
            })
          }
          onId={isDetailThekFeed.id}
          onCreate={(value) => createOk(value)}
        />
      )}
      {isCalen && (
        <CalenderPopup
          onClickClose={() => setIsCalen(false)}
          onStart={startDay}
          onEnd={endDay}
          onChecked={(start, end) => calenderData(start, end)}
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
      {isImageDetail.use && (
        <EditImageDetail
          onClickClose={() =>
            setIsImageDetail({
              use: false,
              imgs: [],
            })
          }
          onImgs={isImageDetail.imgs}
        />
      )}
      {isModal.use && (
        <CheckPopup
          onClickClose={() =>
            setIsModal({
              use: false,
              id: '',
            })
          }
          bodyContent={'선택하신 게시물을 삭제하시겠습니까?'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup onClickClose={() => closeModalEvent()} bodyContent={'삭제를 완료했습니다.'} />
      )}
      {isLikePopup.use && (
        <LikePopup
          onClickClose={() =>
            setIsLikePopup({
              use: false,
              id: '',
            })
          }
          onId={isLikePopup.id}
          onId2={''}
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
      {isSharePopup.use && (
        <SharePopup
          onClickClose={() =>
            setIsSharePopup({
              use: false,
              id: '',
            })
          }
          onId={isSharePopup.id}
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
FanFeedManager.propTypes = {
  history: PropTypes.object,
}

export default FanFeedManager
