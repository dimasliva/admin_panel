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
import CreateRewardAd from './popup/CreateRewardAd'
import DetailRewardAd from './popup/DetailRewardAd'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import moment from 'moment'
import { ImgBig } from '../../../../components/publicPopup/ImgBig'

const ServiceRewardAd = () => {
  // useState
  const one = 1
  const [role, setRole] = useState('')
  const [activeKey, setActiveKey] = useState(1)
  const [isDetailRewardAd, setIsDetailRewardAd] = useState({ use: false, id: 0 }) // Detail Popup
  const [isCreateRewardAd, setIsCreateRewardAd] = useState(false) // Detail Popup
  const [listTab1, setListTab1] = useState(null)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [isStatus, setStatus] = useState('all')
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  })
  //Table title
  const tableManager = [
    { label: '구분' },
    { label: '순서​' },
    { label: '썸네일​' },
    { label: '타이틀​' },
    { label: '링크​' },
    { label: '등록일​' },
    { label: '게시일시​' },
    { label: '종료일시​' },
    { label: '클릭수​' },
  ]
  useEffect(() => {
    if (activeKey === 1) {
      getList({ page: 1 })
    }
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
    if (params.page === 1) {
      queries.push(`page=1`)
      queries.push(`limit=${30 * params.page}`)
    } else {
      queries.push(`page=${params.page}`)
      queries.push(`limit=30`)
    }
    if (params.status !== 'all') {
      queries.push(`status=${params.status}`)
    }
    queries.push(`order_by=created_at`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/reward_ad/grid${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => {
        listTab1.push(value)
      })
      setListTab1([...listTab1])
    } else {
      setListTab1(res.data.value.items)
    }
  }
  const onCloseEvent = () => {
    setIsDetailRewardAd({
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
          <CNav variant="tabs" className="mt-2 nav-custom">
            <CNavItem>
              <CNavLink
                className="cursor custom-tab-color-main"
                active={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                광고중 (홈화면)​
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CTabContent>
              <CTabPane role="tabpanel" visible={activeKey === 1}>
                <CCol sm={12} className="d-flex flex-row align-items-center mb-3">
                  <CFormSelect
                    aria-label="Large select example"
                    className="search-bar__select text-center me-2"
                    style={{ width: '130px' }}
                    onChange={(e) => {
                      setStatus(e.target.value)
                    }}
                  >
                    <option value="all">전체​</option>
                    <option value="1">진행중</option>
                    <option value="0">비활성​</option>
                    <option value="-1">삭제​</option>
                    <option value="2">종료</option>
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
                    <CCol className="float-end mb-2">
                      <div className="d-flex flex-row">
                        {role !== one && (
                          <CButton
                            onClick={() => {
                              setIsCreateRewardAd(true)
                            }}
                            style={{ color: 'white' }}
                            type="button"
                            color="info"
                            id="basic-addon1"
                          >
                            광고영상 등록​
                          </CButton>
                        )}
                      </div>
                    </CCol>
                    {/*Table*/}
                    <CCol>
                      <CTable>
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
                              // user
                              const links =
                                typeof value.ad_link != 'object'
                                  ? value.ad_link
                                  : value.ad_link.map((li, index) => {
                                      return (
                                        <span
                                          style={{ color: 'blue', cursor: 'pointer' }}
                                          key={index}
                                        >
                                          {li.url}
                                        </span>
                                      )
                                    })
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
                                  <CTableDataCell scope="row" className="border-1 text-break">
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <span>
                                        {value.status === 1
                                          ? '진행중'
                                          : value.status === 0
                                          ? '비활성​'
                                          : value.status === -1
                                          ? '삭제'
                                          : '종료'}
                                      </span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="border-1 text-break">
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <span>{value.priority}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="border-1 text-break">
                                    <div className="d-flex flex-row align-items-center justify-content-start">
                                      <CImage
                                        onClick={() =>
                                          setIsImg({
                                            use: true,
                                            img: process.env.REACT_APP_IMG + value.ad_img,
                                          })
                                        }
                                        style={{
                                          width: '80px',
                                          height: '80px',
                                          objectFit: 'cover',
                                        }}
                                        className="artist-img-dom__img-border__profile cursor"
                                        src={process.env.REACT_APP_IMG + value.ad_img}
                                        alt=""
                                        onError={(e) => (e.target.src = '/icon.png')}
                                      />
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell
                                    onClick={() =>
                                      setIsDetailRewardAd({
                                        use: true,
                                        id: value.id,
                                      })
                                    }
                                    className="border-1 text-break"
                                  >
                                    <div className="d-flex flex-row align-items-center justify-content-start">
                                      <span style={{ color: 'blue', cursor: 'pointer' }}>
                                        {value.ad_title.ko !== ''
                                          ? value.ad_title.ko
                                          : value.ad_title.en !== ''
                                          ? value.ad_title.en !== ''
                                          : value.ad_title.ch !== ''
                                          ? value.ad_title.ch
                                          : value.ad_title.jp !== ''
                                          ? value.ad_title.jp
                                          : value.ad_title.es}
                                      </span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="border-1 text-break">
                                    <div className="d-flex flex-column align-items-center justify-content-start">
                                      {typeof value.ad_link != 'object'
                                        ? value.ad_link
                                        : value.ad_link.map((name, index) => (
                                            <a
                                              href={name.url}
                                              target="_blank"
                                              rel="noreferrer"
                                              className="text-decoration-none"
                                              key={index}
                                            >
                                              {name.url}
                                            </a>
                                          ))}
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell scope="row" className="border-1 text-break">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                      <span>{createdStart.date}</span>
                                      <span>{createdStart.time}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell scope="row" className="border-1 text-break">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                      <span>{created.date}</span>
                                      <span>{created.time}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell scope="row" className="border-1 text-break">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                      <span>{createdEnd.date}</span>
                                      <span>{createdEnd.time}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell
                                    scope="row"
                                    className="border-1 text-break"
                                    onClick={() => console.log(value)}
                                  >
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                      {value.click === null ? 0 : value.click}
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
                  getList({ page: page + 1 })
                  setPage(page + 1)
                }}
              >
                더보기
              </CButton>
            )}
          </CCardBody>
        </CCard>
      </CCol>
      {isDetailRewardAd.use && (
        <DetailRewardAd
          onClickClose={() =>
            setIsDetailRewardAd({
              use: false,
              id: 0,
            })
          }
          onCloseOkEvent={() => onCloseEvent()}
          onId={isDetailRewardAd.id}
        />
      )}
      {isCreateRewardAd && (
        <CreateRewardAd
          onClickClose={() => setIsCreateRewardAd(false)}
          onCloseOkEvent={() => {
            setIsCreateRewardAd(false)
            getList({ page: 1 })
            setPage(1)
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
ServiceRewardAd.propTypes = {
  history: PropTypes.object,
}

export default ServiceRewardAd
