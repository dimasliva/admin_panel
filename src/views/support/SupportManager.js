import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CInputGroup,
  CFormSelect,
  CFormInput,
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
  CImage,
} from '@coreui/react'
import { cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { SupportVote } from './popup/SupportVote'
import { UserDetail } from '../member/popup/UserDetail'
import axios from 'axios'
import { headerConfig } from '../../static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'
import moment from 'moment'
import { ImgBig } from '../../components/publicPopup/ImgBig'

const SupportManager = () => {
  const [isVoteModal, setIsVoteModal] = useState({ use: false, id: '' }) // Vote Modal
  const [userInfo, setUserInfo] = useState({
    use: false,
    id: '',
  }) // User Information Modal
  const [list, setList] = useState(null) // setting Table data List
  const [search, setSearch] = useState('') // Search title
  // Filter
  const [type, setType] = useState('0') // type filter
  const [status, setStatus] = useState('all') // Status filter
  const [filter, setFilter] = useState('created_at') // Filter
  const [page, setPage] = useState(1) // page filter
  const [pages, setPages] = useState(1)
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  })
  const tableTitle = [
    { label: '타입' },
    { label: '주제' },
    { label: '상품' },
    { label: '아티스트 대상' },
    { label: '진행상황' },
    { label: '달성률%' },
    { label: '참여인원' },
    { label: '생성자' },
    { label: '시작일' },
    { label: '마감일' },
    { label: '희망일' },
  ]

  // support manager List api
  const getList = async (params) => {
    if (!params) {
      params = {}
    }
    const queries = []

    if (params.page === undefined) {
      params.page = page
    }
    if (params.isSort) {
      params.page = 1
      setPage(1)
    }
    if (params.status === undefined) {
      params.status = status
    }
    if (params.type === undefined) {
      params.type = type
    }
    if (params.filter === undefined) {
      params.filter = filter
    }

    if (search !== '') {
      queries.push(`artist=${search}`)
    }

    if (params.type !== '0') queries.push(`type=${params.type}`)
    if (params.status !== 'all') queries.push(`status=${params.status}`)
    queries.push(`filter=${params.filter}`)

    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios
      .get(`/api/fan/support/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    if (res.data.value.items.length < 0) {
      params.page = 1
      setPage(1)
    }
    setPages(res.data.value.pages ? res.data.value.pages : 1)

    if (params.page > 1) {
      res.data.value.items.map((value) => list.push(value))
      setList([...list])
    } else {
      setList(res.data.value.items)
    }
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CNav variant="tabs" className="mt-2 nav-custom">
            <CNavItem>
              <CNavLink active className="custom-tab-color-main">
                팬심서포트 관리
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CRow className="g-3">
              {/* <CCol sm={2}>
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="mr-3 search-bar__select"
                >
                  <option>검색명</option>
                </CFormSelect>
              </CCol> */}
              <CCol sm={12}>
                <CInputGroup style={{ width: '50%' }}>
                  <CFormInput
                    size="lg"
                    placeholder="검색할 키워드를 입력하세요."
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
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
            </CRow>
            <div className="select-group mt-5">
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="mr-3 select-group__select"
                vlaue={status}
                onChange={(e) => {
                  setStatus(e.target.value)
                  getList({
                    status: e.target.value,
                    isSort: true,
                    type,
                    filter,
                  })
                }}
              >
                <option value="all">전체</option>
                <option value="1">진행중</option>
                <option value="2">종료</option>
              </CFormSelect>
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="mr-3 select-group__select"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value)
                  getList({
                    filter: e.target.value,
                    isSort: true,
                    status,
                    type,
                  })
                }}
              >
                <option value="created_at">최신등록</option>
                <option value="desired_at">희망일 순</option>
                <option value="ended_at">마감일 순</option>
                <option value="achievement_percentage">달성률 순</option>
                <option value="name_artist">이름 순</option>
              </CFormSelect>
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="mr-3 select-group__select"
                value={type}
                onChange={(e) => {
                  setType(e.target.value)
                  getList({
                    type: e.target.value,
                    isSort: true,
                    status,
                    filter,
                  })
                }}
              >
                <option value="0">타입전체</option>
                <option value="1">광고</option>
                <option value="2">기부</option>
              </CFormSelect>
            </div>
            <CTable bordered className="mt-5 table-text-center">
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
                {list !== null ? (
                  list.map((value, index) => {
                    // Image Quarterly null
                    const imgText = value.img_artist
                    let img
                    if (imgText !== null) {
                      img = process.env.REACT_APP_IMG + imgText.sup
                    } else {
                      img = ''
                    }
                    const productTitle = value.product
                    const artistName = value.name_artist

                    // day
                    const startDay = {
                      day: moment(value.created_at).format('YYYY-MM-DD'),
                      time: moment(value.created_at).format('hh:mm:ss'),
                    }
                    const votingUntil = {
                      day:
                        value.voting_until_at !== null
                          ? moment(value.voting_until_at).format('YYYY-MM-DD')
                          : '',
                      time:
                        value.voting_until_at !== null
                          ? moment(value.voting_until_at).format('hh:mm:ss')
                          : '',
                    }
                    const desirDay = {
                      day:
                        value.desired_at !== null
                          ? moment(value.desired_at).format('YYYY-MM-DD')
                          : '',
                      time:
                        value.desired_at !== null
                          ? moment(value.desired_at).format('HH:mm:ss')
                          : '',
                    }
                    console.log(value.id == 214 && value)
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">
                          {value.type === 1 ? '광고' : '기부'}
                        </CTableHeaderCell>
                        <CTableDataCell scope="row" style={{ width: '8%' }}>
                          {value.subject === null
                            ? ''
                            : value.subject.ko !== ''
                            ? value.subject.ko
                            : value.subject.etc}
                        </CTableDataCell>
                        <CTableDataCell scope="row" style={{ width: '10%' }}>
                          {productTitle !== null ? productTitle.ko : ''}
                        </CTableDataCell>
                        <CTableDataCell scope="row" className="artist-img-dom">
                          <div className="d-flex flex-row align-items-center">
                            <div className="artist-img-dom__img-border">
                              <CImage
                                className="artist-img-dom__img-border__profile cursor"
                                src={
                                  value.img_artist === null
                                    ? ''
                                    : value.img_artist.sup === ''
                                    ? process.env.REACT_APP_IMG + value.img_artist.main
                                    : process.env.REACT_APP_IMG + value.img_artist.sup
                                }
                                onClick={() => {
                                  setIsImg({
                                    use: true,
                                    img:
                                      value.img_artist === null
                                        ? ''
                                        : value.img_artist.sup === ''
                                        ? process.env.REACT_APP_IMG + value.img_artist.main
                                        : process.env.REACT_APP_IMG + value.img_artist.sup,
                                  })
                                }}
                                alt=""
                                onError={(e) => (e.target.src = '/icon.png')}
                              />
                            </div>
                            <span>{artistName !== null ? artistName.ko : ''}</span>{' '}
                            <span>
                              {value.group_name === null
                                ? ''
                                : value.group_name[0].ko !== ''
                                ? ' (' + value.group_name[0].ko + ')'
                                : ' (' + value.group_name[0].etc + ')'}
                            </span>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell
                          scope="row"
                          className="cursor"
                          onClick={() => {
                            setIsVoteModal({ use: true, id: value.id })
                            console.log(value.id)
                          }}
                          style={{ color: 'blue', width: '10%' }}
                        >
                          {value.vote_point}/
                          {value.target_point === null ? '0' : value.target_point}
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          {value.achievement_percentage.toFixed(2)}/100
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          {value.vote_user_count === undefined
                            ? value.vote_cnt
                            : value.vote_user_count}
                        </CTableDataCell>
                        <CTableDataCell className="text-center" style={{ width: '12%' }}>
                          <div className="d-flex flex-row align-items-center justify-content-center">
                            <CImage
                              onClick={() =>
                                setIsImg({
                                  use: true,
                                  img: process.env.REACT_APP_IMG + value.avatar,
                                })
                              }
                              className="cursor"
                              style={{ width: '40px', height: '40px', marginRight: '10px' }}
                              src={process.env.REACT_APP_IMG + value.avatar}
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
                              className="cursor text-info"
                            >
                              {value.nickname && value.nickname.length > 9
                                ? value.nickname.substr(0, 9) + '...'
                                : value.nickname}
                            </span>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          <div className="d-flex flex-column align-items-center text-nowrap">
                            <span>{startDay.day}</span>
                            <br />
                            <span>{startDay.time}</span>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          <div className="d-flex flex-column align-items-center text-nowrap">
                            <span>{votingUntil.day}</span>
                            <br />
                            <span>{votingUntil.time}</span>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          <div className="d-flex flex-column align-items-center text-nowrap">
                            <span>{desirDay.day}</span>
                            <br />
                            <span>{desirDay.time}</span>
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
                    status,
                    type,
                    filter,
                  })
                  setPage(page + 1)
                }}
              >
                더보기
              </CButton>
            )}
          </CCardBody>
        </CCard>
      </CCol>
      {isVoteModal.use && (
        <SupportVote
          onClickClose={() => setIsVoteModal({ use: false, id: '' })}
          onId={isVoteModal.id}
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
    </CRow>
  )
}

export default SupportManager
