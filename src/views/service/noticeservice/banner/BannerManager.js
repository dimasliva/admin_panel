import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormSelect,
  CImage,
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
import CreateBanner from './popup/CreateBanner'
import BannerDetail from './popup/BannerDetail'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import moment from 'moment'
import { ImgBig } from '../../../../components/publicPopup/ImgBig'

const BannerManager = () => {
  // useState
  const [activeKey, setActiveKey] = useState(1)
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  })
  const [pages, setPages] = useState(1)
  const [isBannerDetail, setIsBannerDetail] = useState({ use: false, id: '' }) // Detail Popup
  const [isCreateBanner, setIsCreateBanner] = useState(false) // Detail Popup
  //Table title
  const tableManager = [
    { label: '​위치' },
    { label: '타입' },
    { label: '순서' },
    { label: '상태' },
    { label: '이미지' },
    { label: '타이틀' },
    { label: '링크' },
    { label: '연결대상​' },
    { label: '등록일시​' },
    { label: '게시일시​' },
    { label: '종료일시​' },
    { label: '클릭​' },
  ]
  // list Tab1 pagrams
  const [listTab1, setListTab1] = useState(null)
  const [page, setPage] = useState(1)
  const [isStatus, setStatus] = useState(1)
  const [isType, setType] = useState(0)
  const one = 1
  const [role, setRole] = useState('')
  useEffect(() => {
    if (activeKey === 1) getList()
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
    if (params.type === undefined) {
      params.type = isType
    }

    const queries = []

    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)
    if (params.type != 0) {
      queries.push(`place_banner=${params.type}`)
    }
    queries.push(`status=${params.status}`)
    queries.push(`type_banner=1`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/link/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (params.isSort !== undefined) {
      if (params.isSort) {
        setListTab1(res.data.value.items)
      }
    } else {
      if (params.page > 1) {
        res.data.value.items.map((value) => listTab1.push(value))
        setListTab1([...listTab1])
      } else {
        setListTab1(res.data.value.items)
      }
    }
  }
  // create success event
  const endEvent = () => {
    setIsCreateBanner(false)
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
                className="cursor custom-tab-color-main"
                active={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                메인배너 관리​
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CTabContent>
              <CTabPane role="tabpanel" visible={activeKey === 1}>
                <CCol sm={12} className="d-flex flex-row align-items-center mb-2">
                  <CFormSelect
                    size="lg"
                    aria-label="Large select example"
                    className="search-bar__select text-center"
                    style={{ width: '130px' }}
                    value={isType}
                    onChange={(e) => {
                      setType(e.target.value)
                    }}
                  >
                    <option value="0">전체​</option>
                    <option value="1">메인홈​</option>
                    <option value="2">충전소​</option>
                  </CFormSelect>
                  <CFormSelect
                    size="lg"
                    aria-label="Large select example"
                    className="search-bar__select mx-2 text-center"
                    style={{ width: '130px' }}
                    onChange={(e) => {
                      setStatus(e.target.value)
                    }}
                  >
                    <option value={1}>진행중</option>
                    <option value={0}>비활성</option>
                    <option value={-1}>삭제</option>
                  </CFormSelect>
                  <CButton
                    type="button"
                    style={{ color: 'white' }}
                    color="info"
                    id="basic-addon1"
                    onClick={() => {
                      getList({ page: 1 })
                      setPage(1)
                    }}
                  >
                    조회​
                  </CButton>
                </CCol>
                <CRow className="g-3">
                  <CCol>
                    {role !== one && (
                      <CCol className="float-end mb-2">
                        <div className="d-flex flex-row">
                          <CButton
                            onClick={() => {
                              setIsCreateBanner(true)
                            }}
                            style={{ color: 'white' }}
                            type="button"
                            color="info"
                            id="basic-addon1"
                          >
                            배너 등록​
                          </CButton>
                        </div>
                      </CCol>
                    )}
                    {/*Table*/}
                    <CCol>
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
                          {listTab1 !== null && listTab1 !== undefined ? (
                            listTab1.map((value, index) => {
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
                                  <CTableDataCell scope="row" className="text-break">
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <span>{value.place_banner === 1 ? '메인 홈' : '충전소'}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-break">
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <span>
                                        {value.type_banner === 1
                                          ? '인앱 웹 링크 연결'
                                          : value.type_banner === 2
                                          ? '랭킹투표 연결'
                                          : value.type_banner === 3
                                          ? '동영상 연결'
                                          : value.type_banner === 4
                                          ? '일반 공지사항 연결'
                                          : value.type_banner === 5
                                          ? '아티스트 연결'
                                          : '외부 웹 링크 연결'}
                                      </span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-break">
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <span>{value.priority}​</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-break">
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <span>
                                        {value.status === 1
                                          ? '진행중'
                                          : value.status === 0
                                          ? '비활성'
                                          : '삭제'}
                                      </span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-break">
                                    <div className="d-flex flex-row align-items-center justify-content-start">
                                      <CImage
                                        style={{
                                          width: '80px',
                                          objectFit: 'cover',
                                          cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                          setIsImg({
                                            use: true,
                                            img: process.env.REACT_APP_IMG + value.img_banner.ko,
                                          })
                                        }}
                                        src={
                                          value.img_banner.ko !== ''
                                            ? process.env.REACT_APP_IMG + value.img_banner.ko
                                            : value.img_banner.en !== ''
                                            ? process.env.REACT_APP_IMG + value.img_banner.en
                                            : value.img_banner.ch !== ''
                                            ? process.env.REACT_APP_IMG + value.img_banner.ch
                                            : value.img_banner.jp !== ''
                                            ? process.env.REACT_APP_IMG + value.img_banner.es
                                            : value.img_banner.es !== ''
                                            ? typeof value.img_banner === 'string'
                                            : process.env.REACT_APP_IMG + value.img_banner
                                        }
                                        alt=""
                                        onError={(e) => (e.target.src = '/icon.png')}
                                      />
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell
                                    onClick={() => {
                                      setIsBannerDetail({ use: true, id: value.id })
                                    }}
                                    className="text-break"
                                  >
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <span style={{ color: 'blue', cursor: 'pointer' }}>
                                        {value.title_banner.ko !== ''
                                          ? value.title_banner.ko
                                          : value.title_banner.en !== ''
                                          ? value.title_banner.en
                                          : value.title_banner.ch !== ''
                                          ? value.title_banner.ch
                                          : value.title_banner.jp !== ''
                                          ? value.title_banner.jp
                                          : value.title_banner.es}
                                      </span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-break">
                                    <div className="d-flex flex-row align-items-center justify-content-start">
                                      <a
                                        style={{
                                          color: 'blue',
                                          cursor: 'pointer',
                                          textDecoration: 'none',
                                        }}
                                        href={value.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {value.link}
                                      </a>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell scope="row" className="text-break">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                      <span>{value.goal}​</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell scope="row" className="text-break">
                                    <div className="d-flex flex-column align-items-center justify-content-center text-center">
                                      {created.date} <br />
                                      {created.time}
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell scope="row" className="text-break">
                                    <div className="d-flex flex-column align-items-center justify-content-center text-center">
                                      {createdStart.date} <br />
                                      {createdStart.time}
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell scope="row" className="text-break">
                                    <div className="d-flex flex-column align-items-center justify-content-center text-center">
                                      {createdEnd.date} <br />
                                      {createdEnd.time}
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell scope="row" className="text-break">
                                    <div className="d-flex flex-column align-items-center justify-content-center text-center">
                                      <span>{value.cnt_click}​</span>
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
                    </CCol>
                  </CCol>
                </CRow>
              </CTabPane>
            </CTabContent>
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
          </CCardBody>
        </CCard>
      </CCol>
      {isCreateBanner && role !== one && (
        <CreateBanner onClickClose={() => setIsCreateBanner(false)} onEndEvent={() => endEvent()} />
      )}
      {isBannerDetail.use && (
        <BannerDetail
          onClickClose={() => {
            setIsBannerDetail({ use: false, id: '' })
            endEvent()
          }}
          onId={isBannerDetail.id}
          onEndEvent={() => {
            setIsBannerDetail({ use: false, id: '' })
            endEvent()
          }}
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
BannerManager.propTypes = {
  history: PropTypes.object,
}

export default BannerManager
