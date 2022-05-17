import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormSelect,
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
import { CreateMissionDay } from './popup/CreateMissionDay'
import { CreateMissionWeek } from './popup/CreateMissionWeek'
import { CreateMissionMonth } from './popup/CreateMissionMonth'
import { MissionDetail } from './popup/MissionDetail'
import moment from 'moment'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

const ServiceMission = () => {
  const [isMissionDetail, setIsMissionDetail] = useState({
    use: false,
    id: '',
  })
  const [isCreateMissionDay, setIsCreateMissionDay] = useState(false)
  const [isCreateMissionWeek, setIsCreateMissionWeek] = useState(false) // Detail Popup
  const [isCreateMissionMonth, setIsCreateMissionMonth] = useState(false) // Detail Popup
  const [activeKey, setActiveKey] = useState(1)
  const tableClass = 'd-flex flex-row align-items-center justify-content-center'
  const tableTitle = [
    { label: '구분' },
    { label: '타입​' },
    { label: '퀘스트 내용​​' },
    { label: '등록일​' },
    { label: '시작일​' },
    { label: '종료일​' },
  ]
  const [pages, setPages] = useState(1)
  const [listTab1, setListTab1] = useState(null)
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('')
  const [feedType, setFeedType] = useState('')
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
      params.status = status
    }

    if (params.type === undefined) {
      params.type = feedType
    }
    const queries = []

    if (params.type !== 'all') {
      queries.push(`type=${params.type}`)
    }
    if (params.status !== 'all') {
      queries.push(`status=${params.status}`)
    }
    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)

    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/mission/grid${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)

    if (params.page > 1) {
      res.data.value.items.map((value) => listTab1.push(value))
      setListTab1([...listTab1])
    } else {
      setListTab1(res.data.value.items)
    }
  }
  const onCloseEvent = () => {
    setIsCreateMissionDay(false)
    setIsCreateMissionWeek(false)
    setIsCreateMissionMonth(false)
    setIsMissionDetail({
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
                퀘스트 미션
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CTabContent>
              <CTabPane role="tabpanel" aria-labelledby="fan_feed" visible={activeKey === 1}>
                <CRow className="g-3">
                  <CCol sm={12} className="d-flex flex-row align-items-center mb-2">
                    <CFormSelect
                      size="lg"
                      aria-label="Large select example"
                      style={{ width: '140px' }}
                      className="search-bar__select"
                      value={status}
                      onChange={(e) => {
                        setStatus(e.target.value)
                      }}
                    >
                      <option value="all">전체​</option>
                      <option value="1">진행중​</option>
                      <option value="0">비활성 ​</option>
                      <option value="-1">삭제​</option>
                    </CFormSelect>
                    <CFormSelect
                      size="lg"
                      aria-label="Large select example"
                      className="search-bar__select mx-2"
                      style={{ width: '170px' }}
                      value={feedType}
                      onChange={(e) => {
                        setFeedType(e.target.value)
                      }}
                    >
                      <option value="all">전체</option>
                      <option value="1">일일퀘스트​</option>
                      <option value="2">주간퀘스트​</option>
                      <option value="3">월간퀘스트</option>
                    </CFormSelect>
                    <CInputGroup>
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
                        <CIcon icon={cilSearch} size="lg" /> 조회​
                      </CButton>
                    </CInputGroup>
                  </CCol>
                  {role !== one && (
                    <CCol>
                      <div className="mt-3 d-flex flex-row align-items-end justify-content-end">
                        <CButton
                          onClick={() => {
                            setIsCreateMissionDay(true)
                          }}
                          color="info"
                          className="button-group__btn text-white"
                        >
                          일일퀘스트 등록​
                        </CButton>
                        <CButton
                          onClick={() => {
                            setIsCreateMissionWeek(true)
                          }}
                          color="info"
                          className="button-group__btn text-white mx-2"
                        >
                          주간퀘스트 등록​
                        </CButton>
                        <CButton
                          onClick={() => {
                            setIsCreateMissionMonth(true)
                          }}
                          color="info"
                          className="button-group__btn text-white"
                        >
                          월간퀘스트 등록​
                        </CButton>
                      </div>
                    </CCol>
                  )}
                  <CTable bordered className="mt-3">
                    <CTableHead>
                      <CTableRow>
                        {tableTitle.map((title, index) => {
                          return (
                            <CTableHeaderCell scope="col" key={index} className="text-center">
                              {title.label}
                            </CTableHeaderCell>
                          )
                        })}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {listTab1 !== null && listTab1 !== undefined ? (
                        listTab1.map((value, index) => {
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
                          const createdCreate = {
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
                              <CTableDataCell scope="row" className="p-4 text-break">
                                <div className={tableClass}>
                                  <span>
                                    {value.status === 1
                                      ? '진행중'
                                      : value.status === -1
                                      ? '삭제'
                                      : '비활성'}
                                  </span>
                                </div>
                              </CTableDataCell>
                              <CTableDataCell>
                                <div className={tableClass}>
                                  <span className="text-break">
                                    {value.type === 1
                                      ? '일일퀘스트'
                                      : value.type === 2
                                      ? '주간퀘스트'
                                      : '월간퀘스트'}
                                  </span>
                                </div>
                              </CTableDataCell>
                              <CTableDataCell
                                scope="row"
                                className="artist-img-dom cursor"
                                onClick={() => {
                                  setIsMissionDetail({
                                    use: true,
                                    id: value.id,
                                  })
                                }}
                              >
                                <div className={tableClass}>
                                  <span style={{ color: 'blue', cursor: 'pointer' }}>
                                    {value.title}
                                  </span>
                                </div>
                              </CTableDataCell>
                              <CTableDataCell>
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                  <span>{createdCreate.date}</span>
                                  <span>{createdCreate.time}</span>
                                </div>
                              </CTableDataCell>
                              <CTableDataCell>
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                  <span>{createdStart.date}</span>
                                  <span>{createdStart.time}</span>
                                </div>
                              </CTableDataCell>
                              <CTableDataCell>
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
                        getList({ page: page + 1 })
                        setPage(page + 1)
                      }}
                    >
                      더보기
                    </CButton>
                  )}
                </CRow>
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
      {isMissionDetail.use && (
        <MissionDetail
          onClickClose={() =>
            setIsMissionDetail({
              use: false,
              id: '',
            })
          }
          onId={isMissionDetail.id}
          onCloseOkEvent={() => onCloseEvent()}
        />
      )}
      {isCreateMissionDay && (
        <CreateMissionDay
          onClickClose={() => setIsCreateMissionDay(false)}
          onCloseOkEvent={() => onCloseEvent()}
        />
      )}
      {isCreateMissionWeek && (
        <CreateMissionWeek
          onClickClose={() => setIsCreateMissionWeek(false)}
          onCloseOkEvent={() => onCloseEvent()}
        />
      )}
      {isCreateMissionMonth && (
        <CreateMissionMonth
          onClickClose={() => setIsCreateMissionMonth(false)}
          onCloseOkEvent={() => onCloseEvent()}
        />
      )}
    </CRow>
  )
}
ServiceMission.propTypes = {
  history: PropTypes.object,
}

export default ServiceMission
