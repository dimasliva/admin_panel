import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormSelect,
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
import CreateManager from './popup/CreateManager'
import AccountDetail from './popup/AccountDetail'
import moment from 'moment'
import { CalenderPopup } from '../../../../components/publicPopup/CalenderPopup'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
const ManagerLog = () => {
  //Table title
  const tableLog = [{ label: '관리자​' }, { label: '내용​' }, { label: '날짜​' }]
  const tableAccount = [
    { label: '아이디​' },
    { label: '이름​' },
    { label: '등급​' },
    { label: '상태​' },
    { label: '최근접속일시​' },
    { label: '가입일시​' },
  ]
  // useState
  const [activeKey, setActiveKey] = useState(1)
  const [isCreateManager, setIsCreateManager] = useState(false)
  const [isAccDetail, setIsAccDetail] = useState({ use: false, id: '' })
  const [isCalen, setIsCalen] = useState(false)
  const [startDay, setStartDay] = useState(moment().subtract(6, 'days'))
  const [endDay, setEndDay] = useState(moment())
  const [list, setList] = useState(null)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const [listAccount, setListAccount] = useState(null)
  const [page2, setPage2] = useState(1)
  const [pages2, setPagesAccount] = useState(1)
  const [isStatus, setStatus] = useState(1)
  const [isSort, setSort] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const one = 3
  const [role, setRole] = useState('')
  useEffect(() => {
    if (activeKey === 1) {
      getList()
    } else if (activeKey === 2) {
      getAccount()
    }
  }, [activeKey])

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
    if (params.activeKey === undefined) {
      params.activeKey = activeKey
    }
    if (params.period_fd === undefined) {
      params.period_fd = startDay.format('YYYY-MM-DD')
    }
    if (params.period_td === undefined) {
      params.period_td = endDay.format('YYYY-MM-DD')
    }
    const queries = []

    queries.push(`period_fd=${params.period_fd}`)
    queries.push(`period_td=${params.period_td}`)
    queries.push(`page=${params.page}`)

    queries.push(`limit=30`)

    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios
      .get(`/api/manager/action/grid${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => list.push(value))
      setList([...list])
      return
    } else {
      setList(res.data.value.items)
    }
  }
  const getAccount = async (params) => {
    if (!params) {
      params = {}
    }

    if (params.page2 === undefined) {
      params.page2 = page2
    }
    if (params.status === undefined) {
      params.status = isStatus
    }
    if (params.sort === undefined) {
      params.sort = isSort
    }
    if (params.search_word === undefined) {
      params.search_word = searchWord
    }
    if (params.activeKey === undefined) {
      params.activeKey = activeKey
    }
    const queries = []

    queries.push(`page=${params.page2}`)

    queries.push(`limit=30`)
    queries.push(`status=${params.status}`)
    queries.push(`search=${params.search_word}`)
    // if (params.sort !== '') {
    //   queries.push(`sort=${params.sort}`)
    // }

    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios
      .get(`/api/manager/grid${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPagesAccount(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => listAccount.push(value))
      setListAccount([...listAccount])
      return
    }
    setListAccount(res.data.value.items)
  }
  const calenderData = (start, end) => {
    setIsCalen(false)
    setStartDay(moment(start))
    setEndDay(moment(end))
  }
  const onCloseEvent = () => {
    setIsAccDetail({
      use: false,
      id: '',
    })
    setIsCreateManager(false)
    getAccount({ page: 1 })
    setPage2(1)
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
                관리자 운영활동​
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                className="cursor custom-tab-color-main"
                active={activeKey === 2}
                onClick={() => setActiveKey(2)}
              >
                관리자 계정​
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CTabContent>
              <CTabPane role="tabpanel" visible={activeKey === 1}>
                <CCol sm={12} className="d-flex flex-row align-items-center mb-4">
                  <CFormSelect
                    size="lg"
                    aria-label="Large select example"
                    className="me-2 select-group__select"
                    style={{ width: '300px' }}
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
                    {/*Table*/}
                    <CCol>
                      <CTable bordered>
                        <CTableHead>
                          <CTableRow>
                            {tableLog.map((title, index) => {
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
                          {list !== null && list !== undefined ? (
                            list
                              .map((value, index) => {
                                const created = {
                                  date:
                                    value.dt === null ? '' : moment(value.dt).format('YYYY-MM-DD'),
                                  time:
                                    value.dt === null ? '' : moment(value.dt).format('HH:mm:ss'),
                                }
                                return (
                                  <CTableRow key={index}>
                                    <CTableDataCell scope="row" className="text-break">
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <span>{value.login}</span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-break">
                                      <div className="d-flex flex-row align-items-center justify-content-start">
                                        <span>{value.action}</span>
                                      </div>
                                      <div className="text-small text-secondary">
                                        {value.description}
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell scope="row" className="text-break">
                                      <div className="d-flex flex-column align-items-center justify-content-center text-center">
                                        {created.date} <br />
                                        {created.time}
                                      </div>
                                    </CTableDataCell>
                                  </CTableRow>
                                )
                              })
                              .reverse()
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
                          onClick={(e) => {
                            getList(e, {
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
              <CTabPane role="tabpanel" visible={activeKey === 2}>
                <CCol sm={12} className="d-flex flex-row align-items-center">
                  <CFormSelect
                    style={{ width: '150px' }}
                    size="lg"
                    aria-label="Large select example"
                    className="search-bar__select me-2"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value={1}>정상​</option>
                    <option value={0}>비활성​</option>
                    <option value={-1}>삭제​</option>
                  </CFormSelect>
                  <CFormInput
                    type="fsdfdsfsdf"
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                    placeholder="관리자 이름을 입력하세요​"
                    className="me-2"
                    style={{ width: '30%' }}
                  />
                  <CButton
                    type="button"
                    style={{ color: 'white', width: '120px' }}
                    color="info"
                    id="basic-addon1"
                    onClick={() => {
                      getAccount({ page: 1 })
                      setPage2(1)
                    }}
                  >
                    검색
                  </CButton>
                </CCol>
                <CRow className="g-3">
                  <CCol>
                    {role === one && (
                      <CCol>
                        <CButton
                          type="button"
                          style={{ color: 'white' }}
                          color="info"
                          id="basic-addon1"
                          className="float-end my-3"
                          onClick={() => {
                            setIsCreateManager(true)
                          }}
                        >
                          어드민 계정 생성​
                        </CButton>
                      </CCol>
                    )}
                    <CCol>
                      <CTable bordered>
                        <CTableHead>
                          <CTableRow>
                            {tableAccount.map((title, index) => {
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
                          {listAccount !== null && listAccount !== undefined ? (
                            listAccount
                              .map((value, index) => {
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
                                const last_seen = {
                                  date:
                                    value.last_seen === null
                                      ? ''
                                      : moment(value.last_seen).format('YYYY-MM-DD'),
                                  time:
                                    value.last_seen === null
                                      ? ''
                                      : moment(value.last_seen).format('HH:mm:ss'),
                                }
                                return (
                                  <CTableRow key={index}>
                                    <CTableDataCell scope="row" className="text-break text-center">
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <span>{value.login}</span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-break">
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <span
                                          onClick={() => {
                                            setIsAccDetail({ use: true, id: value.id })
                                          }}
                                          className="text-info cursor"
                                        >
                                          {value.first_name}
                                        </span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell scope="row" className="text-break">
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <span>
                                          {value.role === 1
                                            ? '일반'
                                            : value.role === 2
                                            ? '운영자​'
                                            : '관리자'}
                                        </span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell scope="row" className="text-break">
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <span>
                                          {value.status === 1
                                            ? '정상​'
                                            : value.status === 0
                                            ? '비활성​'
                                            : '삭제​'}
                                        </span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell scope="row" className="text-break">
                                      <div className="d-flex flex-column align-items-center justify-content-center text-center">
                                        <span>{last_seen.date}</span>
                                        <span>{last_seen.time}</span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell scope="row" className="text-break">
                                      <div className="d-flex flex-column align-items-center justify-content-center text-center">
                                        <span>{created.date}</span>
                                        <span>{created.time}</span>
                                      </div>
                                    </CTableDataCell>
                                  </CTableRow>
                                )
                              })
                              .reverse()
                          ) : (
                            <CTableRow />
                          )}
                        </CTableBody>
                      </CTable>
                      {page !== pages2 && (
                        <CButton
                          color="dark"
                          size="sm"
                          className="moreBt"
                          onClick={(e) => {
                            getAccount(e, {
                              page: page2 + 1,
                            })
                            setPage2(page2 + 1)
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
        {isCalen && (
          <CalenderPopup
            onClickClose={() => setIsCalen(false)}
            onStart={startDay}
            onEnd={endDay}
            onChecked={(start, end) => calenderData(start, end)}
          />
        )}
        {isCreateManager && role === one && (
          <CreateManager
            onClickClose={() => setIsCreateManager(false)}
            onCloseOkEvent={() => onCloseEvent()}
          />
        )}
        {isAccDetail.use && (
          <AccountDetail
            onClickClose={() => setIsAccDetail({ use: false, id: '' })}
            onId={isAccDetail.id}
            onCloseOkEvent={() => onCloseEvent()}
          />
        )}
      </CCol>
    </CRow>
  )
}
ManagerLog.propTypes = {
  history: PropTypes.object,
}

export default ManagerLog
