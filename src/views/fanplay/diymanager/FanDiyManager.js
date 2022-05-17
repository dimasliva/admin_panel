import React, { useState, useEffect } from 'react'
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
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import EditCreateDiyContents from './popup/EditCreateDiyContnents'
import EditDiyContentsDetail from './popup/EditDiyContentsDetail'
import EditImageDetail from '../EditImageDetail'
import { CheckPopup } from 'src/components/publicPopup/CheckPopup'
import { NormalPopup } from 'src/components/publicPopup/NormalPopup'
import { CalenderPopup } from 'src/components/publicPopup/CalenderPopup'
import { LikePopup } from '../feedmanager/popup/LikePopup'
import { ReplayPopup } from '../feedmanager/popup/ReplayPopup'
import { SharePopup } from '../feedmanager/popup/SharePopup'
import { UserDetail } from 'src/views/member/popup/UserDetail'
import { ImgBig } from 'src/components/publicPopup/ImgBig'
import moment from 'moment'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'
import PostsFanDiy from './PostFanDiy'
import Pagination from '../../service/policymanager/basic/Pagination'

const FanDiyManager = () => {
  //Contents
  const [isAddPopup, setIsAddPopup] = useState(false) // Add Popup
  const [isContentDetail, setIsContentDetail] = useState({
    use: false,
    id: '',
  }) // detail Popup
  const tableTitleContents = [
    { label: '타입' },
    { label: '형태​' },
    { label: '노출​​' },
    { label: '메인 콘텐츠​' },
    { label: '서브 콘텐츠' },
    { label: '콘텐츠 내용' },
    { label: '결제금액' },
    { label: '등록일' },
    { label: '상품아이디' },
  ]
  const [isCalen, setIsCalen] = useState(false) // calender Popup
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  }) // img detail
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
  const [userInfo, setUserInfo] = useState({
    use: false,
    id: '',
  }) // User Information Popup
  const [isModal, setIsModal] = useState({
    use: false,
    id: '',
  }) // modify check Popup
  const [isImageDetail2, setIsImageDetail2] = useState({
    use: false,
    imgs: [],
  }) // img detail Popup
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Popup
  const [activeKey, setActiveKey] = useState(1)
  // list Tab1 pagrams
  const [listTab1, setListTab1] = useState(null)
  const [page, setPage] = useState(1)
  const [keyWord, setKeyWord] = useState('')
  const [searchTarget, setSearchTarget] = useState('nickname')
  const [orderBy, setOrderBy] = useState('new')
  const [pages1, setPages1] = useState(1)
  // list Tab2 params
  const [listTab2, setListTab2] = useState([])
  const [page2, setPage2] = useState(1)
  const [isSort, setSort] = useState('new')
  const [isType, setType] = useState('all')
  const [isFrom, setFrom] = useState('all')
  const [isStatus, setStatus] = useState('all')
  const [pages2, setPages2] = useState('')
  // Calender
  const [startDay, setStartDay] = useState(moment().subtract(6, 'days'))
  const [endDay, setEndDay] = useState(moment())
  const one = 1
  const [role, setRole] = useState('')
  let tableTitle
  {
    role !== one
      ? (tableTitle = [
          { label: '번호' },
          { label: '아티스트​' },
          { label: '게시자 정보​​' },
          { label: '콘텐츠​' },
          { label: '좋아요수​' },
          { label: '댓글수' },
          // { label: '공유수​' },
          { label: '업로드​ 일시​' },
          { label: '처리​​' },
        ])
      : (tableTitle = [
          { label: '번호' },
          { label: '아티스트​' },
          { label: '게시자 정보​​' },
          { label: '콘텐츠​' },
          { label: '좋아요수​' },
          { label: '댓글수' },
          // { label: '공유수​' },
          { label: '업로드​ 일시​' },
        ])
  }
  useEffect(() => {
    if (activeKey === 1) {
      getList()
    } else if (activeKey === 2) {
      getList2()
    }
  }, [activeKey])

  // Calender Modal value
  const calenderData = (start, end) => {
    setIsCalen(false)
    setStartDay(moment(start))
    setEndDay(moment(end))
  }

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
    queries.push(`type=3`)

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

  // Tab2
  const getList2 = async (params) => {
    if (!params) {
      params = {}
    }

    if (params.page === undefined) {
      params.page = page2
    }
    if (params.sort === undefined) {
      params.sort = isSort
    }
    if (params.type === undefined) {
      params.type = isType
    }
    if (params.from === undefined) {
      params.from = isFrom
    }
    if (params.status === undefined) {
      params.status = isStatus
    }
    const queries = []
    if (params.page > 1) {
      queries.push(`page=1`)
      queries.push(`limit=${30 * params.page}`)
    } else {
      queries.push(`page=${params.page}`)
      queries.push(`limit=30`)
    }
    queries.push(`sort=${params.sort}`)
    queries.push(`type=${params.type}`)
    queries.push(`from=${params.from}`)
    queries.push(`status=${params.status}`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios.get(`/api/fan/diy/query${queryStr}`).catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPages2(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => listTab2.push(value))
      setListTab2([...listTab2])
    } else {
      setListTab2(res.data.value.items)
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
  const onCloseEvent = () => {
    setIsAddPopup(false)
    setIsContentDetail({
      use: false,
      id: '',
    })
    getList2({ page: 1 })
    setPage2(1)
  }
  // PaginationUser
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(30)

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = listTab2.slice(indexOfFirstPost, indexOfLastPost)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
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
                팬DIY 관리자
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
                  setPage2(2)
                }}
              >
                유료 콘텐츠 관리
              </CNavLink>
            </CNavItem>
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
                        className="mr-3 select-group__select"
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
                        style={{ width: '190px' }}
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
                          })
                          setOrderBy(e.target.value)
                        }}
                      >
                        <option value="new">최신순</option>
                        <option value="artist">아티스트 수</option>
                        <option value="reply">댓글순</option>
                        <option value="like">좋아요순</option>
                        {/*<option value="share">공유순</option>*/}
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
                        listTab1
                          .map((value, index) => {
                            // artist img
                            const imgArtist = value.img_artist === null ? '' : value.img_artist.main
                            const artistImg = process.env.REACT_APP_IMG + imgArtist

                            // user
                            const writerAvatar = value.avatar === null ? '' : value.avatar
                            const userImg = process.env.REACT_APP_IMG + writerAvatar

                            // contents
                            const contents = value.img_play === null ? '' : value.img_play[0].url
                            const conImg = process.env.REACT_APP_IMG + contents
                            return (
                              <CTableRow key={index}>
                                <CTableDataCell onClick={() => console.log(value)}>
                                  {index + 1}
                                </CTableDataCell>
                                <CTableDataCell
                                  scope="row"
                                  className="artist-img-dom"
                                  style={{ width: '10%' }}
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
                                <CTableDataCell scope="row" className="artist-img-dom">
                                  <div className="d-flex flex-column align-items-center">
                                    <div className="artist-img-dom__img-border2">
                                      <CImage
                                        className="artist-img-dom__img-border__profile cursor"
                                        onClick={() => {
                                          setIsImg({
                                            use: true,
                                            img: userImg,
                                          })
                                        }}
                                        style={{ borderRadius: '50%' }}
                                        src={userImg}
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
                                <CTableDataCell
                                  scope="row"
                                  className="artist-img-dom"
                                  onClick={() =>
                                    setIsImg({
                                      use: true,
                                      img: process.env.REACT_APP_IMG + value.img_play[0].url,
                                    })
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
                                  </div>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <span
                                    onClick={() => {
                                      setIsLikePopup({
                                        use: true,
                                        id: value.id,
                                      })
                                    }}
                                    className="cursor style-color-blue"
                                  >
                                    {value.likecnt}
                                  </span>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <span
                                    onClick={() => {
                                      setIsReplyPopup({
                                        use: true,
                                        id: value.id,
                                      })
                                    }}
                                    className="cursor style-color-blue"
                                  >
                                    {value.replycnt}
                                  </span>
                                </CTableDataCell>
                                {/*<CTableDataCell>*/}
                                {/*  <span*/}
                                {/*    onClick={() => {*/}
                                {/*      setIsSharePopup({*/}
                                {/*        use: true,*/}
                                {/*        id: value.id,*/}
                                {/*      })*/}
                                {/*    }}*/}
                                {/*    className="cursor style-color-blue"*/}
                                {/*  >*/}
                                {/*    {value.sharecnt}*/}
                                {/*  </span>*/}
                                {/*</CTableDataCell>*/}
                                <CTableDataCell>
                                  {value.created_at === null
                                    ? ''
                                    : moment(value.created_at).format('YYYY-MM-DD HH:mm:ss')}
                                </CTableDataCell>
                                {role !== one && (
                                  <CTableDataCell scope="row">
                                    <CButton
                                      type="button"
                                      className="text-nowrap"
                                      style={{ color: 'white' }}
                                      color="danger"
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
                          .reverse()
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
                </CRow>
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="fan_feed" visible={activeKey === 2}>
                <CRow>
                  <CCol xs={12}>
                    <CRow className="g-3 d-flex flex-row align-items-center">
                      <CCol sm={12} className="d-flex flex-row align-items-center">
                        <CFormSelect
                          size="lg"
                          aria-label="Large select example"
                          className="search-bar__select"
                          value={isSort}
                          style={{ width: '25%' }}
                          onChange={(e) => setSort(e.target.value)}
                        >
                          {/*<option value="priority">우선순위</option>*/}
                          <option value="new">최신순</option>
                          <option value="price">금액순</option>
                          <option value="priority">우선 순위</option>
                        </CFormSelect>
                        <CFormSelect
                          size="lg"
                          aria-label="Large select example"
                          className="mx-2 search-bar__select"
                          style={{ width: '25%' }}
                          value={isType}
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option value="all">타입전체​</option>
                          <option value="free">무료​</option>
                          <option value="charge">유료</option>
                        </CFormSelect>
                        <CFormSelect
                          size="lg"
                          aria-label="Large select example"
                          className="mr-3 search-bar__select"
                          style={{ width: '25%' }}
                          value={isFrom}
                          onChange={(e) => setFrom(e.target.value)}
                        >
                          <option value="all">형태전체​</option>
                          <option value="stickers">스티커​</option>
                          <option value="frames">프레임</option>
                        </CFormSelect>
                        <CFormSelect
                          size="lg"
                          aria-label="Large select example"
                          className="mx-2 search-bar__select"
                          style={{ width: '25%' }}
                          value={isStatus}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="all">상태전체​</option>
                          <option value="normal">정상</option>
                          <option value="abnormal">비활성​</option>
                          <option value="delete">삭제</option>
                        </CFormSelect>
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
                    </CRow>
                    {role !== one && (
                      <div className="button-group mt-5">
                        <CButton
                          color="info"
                          size="sm"
                          style={{ color: 'white' }}
                          className="button-group__btn p-2"
                          onClick={() => {
                            setIsAddPopup(true)
                          }}
                        >
                          팬DIY 콘텐츠 등록
                        </CButton>
                      </div>
                    )}
                    <CTable bordered className="mt-3 table-text-center">
                      <CTableHead>
                        <CTableRow>
                          {tableTitleContents.map((title, index) => {
                            return (
                              <CTableHeaderCell scope="col" key={index}>
                                {title.label}
                              </CTableHeaderCell>
                            )
                          })}
                        </CTableRow>
                      </CTableHead>
                      <PostsFanDiy posts={currentPosts} loading={loading} isSort={isSort} />
                    </CTable>
                    <Pagination
                      postsPerPage={postsPerPage}
                      totalPosts={listTab2.length}
                      paginate={paginate}
                    />
                    {/* {page2 < pages2 ? (
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
                    ) : (
                      <></>
                    )}*/}
                  </CCol>
                </CRow>
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
      {isAddPopup && (
        <EditCreateDiyContents
          onClickClose={() => setIsAddPopup(false)}
          onCloseOkEvent={() => onCloseEvent()}
        />
      )}
      {isContentDetail.use && (
        <EditDiyContentsDetail
          onClickClose={() =>
            setIsContentDetail({
              use: false,
              id: '',
            })
          }
          onCloseOkEvent={() => onCloseEvent()}
          onId={isContentDetail.id}
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
      {isOkCheck && (
        <NormalPopup onClickClose={() => closeModalEvent()} bodyContent={'삭제를 완료했습니다.'} />
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
      {isImageDetail2.use && (
        <EditImageDetail
          onClickClose={() =>
            setIsImageDetail2({
              use: false,
              imgs: [],
            })
          }
          onImgs={isImageDetail2.imgs}
        />
      )}
    </CRow>
  )
}
FanDiyManager.propTypes = {
  history: PropTypes.object,
}

export default FanDiyManager
