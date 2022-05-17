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
} from '@coreui/react'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import { TopRanker } from './popup/TopRanker'
import CreateVote from './popup/CreateVote'
import DetailVote from './popup/DetailVote'
import TotalVote from './popup/TotalVote'
import axios from 'axios'
import { headerConfig } from '../../../static/axiosConfig'
import { statusCatch } from '../../../static/axiosCatch'
import moment from 'moment'
import { ImgBig } from '../../../components/publicPopup/ImgBig'

const VoteManager = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [listTab, setListTab] = useState(null)
  const [page, setPage] = useState(1)
  const [isStatus, setStatus] = useState('')
  const [isTotalVote, setTotalVote] = useState({ use: false, id: '' }) // Image Popup
  const [isTopRanker, setTopRanker] = useState({ use: false, id: '' }) // Image Popup
  const [isCreateVote, setCreateVote] = useState(false) // Image Popup
  const [isDetailVote, setDetailVote] = useState({ use: false, id: '' }) // Image Popup
  const [pages, setPages] = useState(1)
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  })
  const tableTitle = [
    { label: '순서' },
    { label: '상태' },
    { label: '투표분류' },
    { label: '배너' },
    { label: '투표이름' },
    { label: '탑랭커' },
    { label: '총 투표수' },
    { label: '시작일' },
    { label: '결과발표' },
    { label: '​종료일' },
  ]
  const [role, setRole] = useState('')
  useEffect(() => {
    getList({ page: 1 })
    setPage(1)
  }, [])
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
      params.status = isStatus
    }
    const queries = []
    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)
    if (isStatus !== 'all') {
      queries.push(`status=${params.status}`)
    }
    console.log(queries)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/rank/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    console.log(res.data.value)
    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => listTab.push(value))
      setListTab([...listTab])
    } else {
      setListTab(res.data.value.items)
    }
  }

  const onCloseEvent = () => {
    setDetailVote({
      use: false,
      id: '',
    })
    getList({ page: 1 })
    setPage(1)
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CNav variant="tabs" className="nav-custom mt-2">
            <CNavItem>
              <CNavLink
                className="cursor custom-tab-color-main"
                active={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                투표 관리자
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CTabContent>
              <CTabPane role="tabpanel" aria-labelledby="fan_feed" visible={activeKey === 1}>
                <CCol className="d-flex flex-row align-items-center border-0">
                  <CFormSelect
                    size="lg"
                    aria-label="Large select example"
                    style={{ width: '120px' }}
                    className="me-2 select-group__select"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="all">전체</option>
                    <option value="3">준비</option>
                    <option value="1">진행중</option>
                    <option value="0">비활성</option>
                    <option value="2">종료</option>
                    <option value="-1">삭제​</option>
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
                {role !== 1 && (
                  <div className="button-group mt-2">
                    <CButton
                      onClick={() => setCreateVote(true)}
                      color="info"
                      className="button-group__btn text-white px-5"
                    >
                      신규등록
                    </CButton>
                  </div>
                )}
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
                        const resultDay = {
                          date:
                            value.result_at === null
                              ? ''
                              : moment(value.result_at).format('YYYY-MM-DD'),
                          time:
                            value.result_at === null
                              ? ''
                              : moment(value.result_at).format('HH:mm:ss'),
                        }
                        const startDay = {
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
                        let img_banner
                        if (typeof value.img_banner === 'object') {
                          img_banner =
                            value.img_banner.ko !== ''
                              ? process.env.REACT_APP_IMG + value.img_banner.ko
                              : value.img_banner.en !== ''
                              ? process.env.REACT_APP_IMG + value.img_banner.en
                              : value.img_banner.ch !== ''
                              ? process.env.REACT_APP_IMG + value.img_banner.ch
                              : value.img_banner.jp !== ''
                              ? process.env.REACT_APP_IMG + value.img_banner.jp
                              : value.img_banner.es !== ''
                              ? process.env.REACT_APP_IMG + value.img_banner.es
                              : ''
                        } else if (typeof value.event_banner === 'object') {
                          img_banner =
                            value.event_banner.ko !== ''
                              ? process.env.REACT_APP_IMG + value.event_banner.ko
                              : value.event_banner.en !== ''
                              ? process.env.REACT_APP_IMG + value.event_banner.en
                              : value.event_banner.ch !== ''
                              ? process.env.REACT_APP_IMG + value.event_banner.ch
                              : value.event_banner.jp !== ''
                              ? process.env.REACT_APP_IMG + value.event_banner.jp
                              : value.event_banner.es !== ''
                              ? process.env.REACT_APP_IMG + value.event_banner.es
                              : ''
                        }
                        return (
                          <CTableRow key={index}>
                            <CTableHeaderCell>
                              <span className="d-flex flex-row justify-content-center">
                                {value.priority}
                              </span>
                            </CTableHeaderCell>
                            <CTableDataCell>
                              <span
                                className="d-flex flex-row justify-content-center"
                                onClick={() => console.log(value)}
                              >
                                {/*moment(value.started_at) <= moment()
                                  ? '준비'
                                  : */}
                                {value.status === 0
                                  ? '비활성'
                                  : value.status === 1
                                  ? '진행중​'
                                  : value.status === 2
                                  ? '종료'
                                  : value.status === -1
                                  ? '준비'
                                  : value.status === 3 && '삭제'}
                              </span>
                            </CTableDataCell>
                            <CTableDataCell scope="row">
                              <span className="d-flex flex-row justify-content-center">
                                {value.type === 1
                                  ? '랭킹 투표'
                                  : value.type === 2
                                  ? '팬픽 투표'
                                  : value.type === 3
                                  ? '이벤트 투표'
                                  : '이벤트 댓글 투표'}
                              </span>
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
                                  style={{
                                    height: '100px',
                                    objectFit: 'cover',
                                    cursor: 'pointer',
                                  }}
                                  src={img_banner}
                                  alt="banner"
                                  onError={(e) => (e.target.src = '/icon.png')}
                                />
                              </div>
                            </CTableDataCell>
                            <CTableDataCell
                              onClick={() => setDetailVote({ use: true, id: value.id })}
                              className="cursor text-info"
                            >
                              <span className="d-flex flex-row justify-content-center">
                                {value.name_vote.ko !== ''
                                  ? value.name_vote.ko
                                  : value.name_vote.en !== ''
                                  ? value.name_vote.en
                                  : value.name_vote.ch !== ''
                                  ? value.name_vote.ch
                                  : value.name_vote.jp !== ''
                                  ? value.name_vote.jp
                                  : value.name_vote.es}
                              </span>
                            </CTableDataCell>
                            <CTableDataCell>
                              <CImage
                                onClick={() => {
                                  setIsImg({
                                    use: true,
                                    img:
                                      value.img_artist_top && value.img_artist_top.main
                                        ? value.img_artist_top.main
                                        : value.img_artist_top && value.img_artist_top.sup
                                        ? value.img_artist_top.sup
                                        : '/icon.png',
                                  })
                                }}
                                style={{
                                  borderRadius: '55%',
                                  width: '40px',
                                  height: '40px',
                                  objectFit: 'cover',
                                }}
                                className="cursor"
                                src={
                                  value.img_artist_top && value.img_artist_top.main
                                    ? process.env.REACT_APP_IMG + value.img_artist_top.main
                                    : value.img_artist_top && value.img_artist_top.sup
                                    ? process.env.REACT_APP_IMG + value.img_artist_top.sup
                                    : '/icon.png'
                                }
                                alt="banner"
                                onError={(e) => (e.target.src = '/icon.png')}
                              />
                              <span
                                className="cursor ms-2 text-info"
                                onClick={() => setTopRanker({ use: true, id: value.id })}
                              >
                                {value.name_artist_top && value.name_artist_top.ko
                                  ? value.name_artist_top.ko +
                                    ' (' +
                                    value.top_point
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                                    ' 표)'
                                  : ' '}
                              </span>
                            </CTableDataCell>
                            <CTableDataCell
                              onClick={() => setTotalVote({ use: true, id: value.id })}
                              className="cursor text-info"
                            >
                              <span className="d-flex flex-row justify-content-center">
                                {value.total_point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              </span>
                            </CTableDataCell>
                            <CTableDataCell scope="row">
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <span>{startDay.date}</span>
                                <span>{startDay.time}​</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell scope="row">
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <span>{resultDay.date}</span>
                                <span>{resultDay.time}​</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell scope="row">
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <span>{createdEnd.date}</span>
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
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
      {isTopRanker.use && (
        <TopRanker
          onClickClose={() =>
            setTopRanker({
              use: false,
              id: '',
            })
          }
          onId={isTopRanker.id}
        />
      )}
      {isCreateVote && (
        <CreateVote
          onClickClose={() => setCreateVote(false)}
          onCloseOkEvent={() => {
            getList()
            setCreateVote(false)
          }}
        />
      )}
      {isDetailVote.use && (
        <DetailVote
          onClickClose={() =>
            setDetailVote({
              use: false,
              id: '',
            })
          }
          onCloseOkEvent={() => onCloseEvent()}
          onId={isDetailVote.id}
        />
      )}
      {isTotalVote.use && (
        <TotalVote
          onClickClose={() =>
            setTotalVote({
              use: false,
              id: '',
            })
          }
          onId={isTotalVote.id}
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

VoteManager.propTypes = {
  history: PropTypes.object,
}

export default VoteManager
