import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CFormSelect,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { CalenderPopup } from 'src/components/publicPopup/CalenderPopup'
import moment from 'moment'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

const UserStat = (props) => {
  const [isCalen, setIsCalen] = useState(false) // calender Modal
  const [isCalen2, setIsCalen2] = useState(false) // calender Modal
  const [listTab1, setListTab1] = useState(null) // tab1 list
  const [listTab2, setListTab2] = useState(null) // tab2 list
  const [count1, setCount1] = useState(0)
  const [page1, setPage1] = useState(1)
  const [pages1, setPages1] = useState(1)
  const [count2, setCount2] = useState(0)
  const [page2, setPage2] = useState(1)
  const [pages2, setPages2] = useState(1)
  // Calender
  const [startDay, setStartDay] = useState(moment().subtract(6, 'days'))
  const [endDay, setEndDay] = useState(moment())
  const [startDay2, setStartDay2] = useState(moment().subtract(6, 'days'))
  const [endDay2, setEndDay2] = useState(moment())
  const [activeKey, setActiveKey] = useState(1)

  useEffect(() => {
    getLoginlist()
  }, [])

  const getLoginlist = async (params) => {
    if (!params) {
      params = {}
    }
    if (params.period_fd === undefined) {
      params.period_fd = startDay.format('YYYY-MM-DD')
    }
    if (params.period_td === undefined) {
      params.period_td = endDay.format('YYYY-MM-DD')
    }
    if (params.period_fd2 === undefined) {
      params.period_fd2 = startDay2.format('YYYY-MM-DD')
    }
    if (params.period_td2 === undefined) {
      params.period_td2 = endDay2.format('YYYY-MM-DD')
    }
    const queries = []
    let uri = ''

    if (params.activeKey === undefined) {
      params.activeKey = activeKey
    }

    if (params.activeKey === 1) {
      uri = `/api/user/stat/login`
      queries.push(`period_fd=${params.period_fd}`)
      queries.push(`period_td=${params.period_td}`)
    } else if (params.activeKey === 2) {
      uri = `/api/user/stat/join`
      queries.push(`period_fd=${params.period_fd2}`)
      queries.push(`period_td=${params.period_td2}`)
    }
    if (params.page === undefined) {
      if (params.activeKey === 1) {
        params.page = page1
      } else if (params.activeKey === 2) {
        params.page = page2
      }
    }

    queries.push(`limit=31`)
    queries.push(`page=${params.page}`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios.get(`${uri}${queryStr}`, headerConfig).catch((err) => statusCatch(err))
    if (!res.data.success) return
    var data = res.data.value
    if (params.activeKey === 1) {
      setCount1(data.count)
      setPage1(data.page)
      setPages1(data.pages ? data.pages : 1)
      if (data.page === 1) {
        setListTab1(data.items)
        return
      }
      setListTab1([...listTab1, ...data.items])
    } else {
      setCount2(data.count)
      setPage2(data.page)
      setPages2(data.pages ? data.pages : 1)
      if (data.page === 1) {
        setListTab2(data.items)
        return
      }
      setListTab2([...listTab2, ...data.items])
    }
  }

  // Calender Modal value
  const calenderData = (start, end) => {
    if (activeKey === 1) {
      setIsCalen(false)
      setStartDay(moment(start))
      setEndDay(moment(end))
    } else if (activeKey === 2) {
      setIsCalen2(false)
      setStartDay2(moment(start))
      setEndDay2(moment(end))
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CNav variant="tabs" className="mt-2 nav-custom">
            <CNavItem className="nav-custom__column">
              <CNavLink
                className="cursor custom-tab-color-main"
                active={activeKey === 1}
                onClick={() => {
                  setActiveKey(1)
                  getLoginlist({ activeKey: 1, page: 1 })
                  setPage1(1)
                }}
              >
                이용자 현황
              </CNavLink>
            </CNavItem>
            <CNavItem className="nav-custom__column">
              <CNavLink
                className="cursor custom-tab-color-main"
                active={activeKey === 2}
                onClick={() => {
                  setActiveKey(2)
                  getLoginlist({ activeKey: 2, page: 1 })
                  setPage2(1)
                }}
              >
                가입자 현황
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CTabContent>
              <CTabPane role="tabpanel" aria-labelledby="user_login" visible={activeKey === 1}>
                <CCol className="d-flex flex-row align-items-center">
                  <CFormSelect
                    size="lg"
                    aria-label="Large select example"
                    className="me-2 select-group__select"
                    style={{ width: '290px' }}
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
                    color="primary"
                    variant="outline"
                    id="basic-addon1"
                    onClick={() => {
                      getLoginlist({ page: 1 })
                      setPage1(1)
                    }}
                  >
                    <CIcon icon={cilSearch} size="lg" /> 조회
                  </CButton>
                </CCol>
                <CTable bordered className="mt-3 table-text-center">
                  <CTableHead>
                    <CTableRow align="middle" className="text-center" color="info">
                      <CTableHeaderCell scope="col" rowSpan="2">
                        날짜
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" colSpan="2">
                        로그인
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" colSpan="3">
                        성별
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" colSpan="5">
                        연령
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" colSpan="5">
                        언어
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" colSpan="2">
                        플랫폼
                      </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow className="text-center" color="info">
                      <CTableHeaderCell scope="col">접속자</CTableHeaderCell>
                      <CTableHeaderCell scope="col">로그인횟수</CTableHeaderCell>
                      <CTableHeaderCell scope="col">남성</CTableHeaderCell>
                      <CTableHeaderCell scope="col">여성</CTableHeaderCell>
                      <CTableHeaderCell scope="col">비공개</CTableHeaderCell>
                      <CTableHeaderCell scope="col">10 대</CTableHeaderCell>
                      <CTableHeaderCell scope="col">20 대</CTableHeaderCell>
                      <CTableHeaderCell scope="col">30 대</CTableHeaderCell>
                      <CTableHeaderCell scope="col">40 대</CTableHeaderCell>
                      <CTableHeaderCell scope="col">50 대+</CTableHeaderCell>
                      <CTableHeaderCell scope="col">한국어</CTableHeaderCell>
                      <CTableHeaderCell scope="col">영어</CTableHeaderCell>
                      <CTableHeaderCell scope="col">중국어</CTableHeaderCell>
                      <CTableHeaderCell scope="col">일본어</CTableHeaderCell>
                      <CTableHeaderCell scope="col">스페인어</CTableHeaderCell>
                      <CTableHeaderCell scope="col">AOS</CTableHeaderCell>
                      <CTableHeaderCell scope="col">IOS</CTableHeaderCell>
                    </CTableRow>
                    {listTab1 !== null && listTab1 !== undefined ? (
                      listTab1.map((value, index) => {
                        if (value.gen_date === 'total' && index === 0) {
                          return (
                            <CTableRow color="secondary" key={index}>
                              <CTableDataCell>전체</CTableDataCell>
                              <CTableDataCell>{value.created_at_cnt}</CTableDataCell>
                              <CTableDataCell>{value.last_seen_cnt}</CTableDataCell>
                              <CTableDataCell>{value.gender_male}</CTableDataCell>
                              <CTableDataCell>{value.gender_female}</CTableDataCell>
                              <CTableDataCell>{value.gender_undef}</CTableDataCell>
                              <CTableDataCell>{value.birth_10}</CTableDataCell>
                              <CTableDataCell>{value.birth_20}</CTableDataCell>
                              <CTableDataCell>{value.birth_30}</CTableDataCell>
                              <CTableDataCell>{value.birth_40}</CTableDataCell>
                              <CTableDataCell>{value.birth_50}</CTableDataCell>
                              <CTableDataCell>{value.lang_ko}</CTableDataCell>
                              <CTableDataCell>{value.lang_en}</CTableDataCell>
                              <CTableDataCell>{value.lang_ch}</CTableDataCell>
                              <CTableDataCell>{value.lang_jp}</CTableDataCell>
                              <CTableDataCell>{value.lang_es}</CTableDataCell>
                              <CTableDataCell>{value.platform_android}</CTableDataCell>
                              <CTableDataCell>{value.platform_ios}</CTableDataCell>
                            </CTableRow>
                          )
                        }
                      })
                    ) : (
                      <CTableRow />
                    )}
                  </CTableHead>
                  <CTableBody>
                    {listTab1 !== null && listTab1 !== undefined ? (
                      listTab1.map((value, index) => {
                        if (value.gen_date !== 'total') {
                          return (
                            <CTableRow key={index}>
                              <CTableDataCell>{value.gen_date}</CTableDataCell>
                              <CTableDataCell>{value.created_at_cnt}</CTableDataCell>
                              <CTableDataCell>{value.last_seen_cnt}</CTableDataCell>
                              <CTableDataCell>{value.gender_male}</CTableDataCell>
                              <CTableDataCell>{value.gender_female}</CTableDataCell>
                              <CTableDataCell>{value.gender_undef}</CTableDataCell>
                              <CTableDataCell>{value.birth_10}</CTableDataCell>
                              <CTableDataCell>{value.birth_20}</CTableDataCell>
                              <CTableDataCell>{value.birth_30}</CTableDataCell>
                              <CTableDataCell>{value.birth_40}</CTableDataCell>
                              <CTableDataCell>{value.birth_50}</CTableDataCell>
                              <CTableDataCell>{value.lang_ko}</CTableDataCell>
                              <CTableDataCell>{value.lang_en}</CTableDataCell>
                              <CTableDataCell>{value.lang_ch}</CTableDataCell>
                              <CTableDataCell>{value.lang_jp}</CTableDataCell>
                              <CTableDataCell>{value.lang_es}</CTableDataCell>
                              <CTableDataCell>{value.platform_android}</CTableDataCell>
                              <CTableDataCell>{value.platform_ios}</CTableDataCell>
                            </CTableRow>
                          )
                        }
                      })
                    ) : (
                      <CTableRow />
                    )}
                  </CTableBody>
                </CTable>
                {pages1 !== page1 && (
                  <CButton
                    color="dark"
                    size="sm"
                    className="moreBt"
                    onClick={() => {
                      getLoginlist({ page: page1 + 1 })
                      setPage1(page1 + 1)
                    }}
                  >
                    더보기
                  </CButton>
                )}
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="user_join" visible={activeKey === 2}>
                <CCol className="d-flex flex-row align-items-center">
                  <CFormSelect
                    size="lg"
                    aria-label="Large select example"
                    className="me-2 select-group__select"
                    style={{ width: '290px' }}
                    value={'new'}
                    onChange={(e) => {
                      if (e.target.value === '7day') {
                        setStartDay2(moment().subtract(6, 'days'))
                        setEndDay2(moment())
                      } else if (e.target.value === '30day') {
                        setStartDay2(moment().subtract(29, 'days'))
                        setEndDay2(moment())
                      } else if (e.target.value === 'nowMonth') {
                        setStartDay2(moment().startOf('month'))
                        setEndDay2(moment().endOf('month'))
                      } else if (e.target.value === 'preMonth') {
                        let nowDate = new Date()
                        nowDate = new Date(
                          nowDate.getFullYear(),
                          nowDate.getMonth() - 1,
                          nowDate.getDate(),
                        )
                        setStartDay2(moment(nowDate).startOf('month'))
                        setEndDay2(moment(nowDate).endOf('month'))
                      } else if (e.target.value === 'selectDay') {
                        setIsCalen2(true)
                      }
                    }}
                  >
                    <option value="new">
                      {startDay2.format('YYYY-MM-DD')} ~ {endDay2.format('YYYY-MM-DD')}
                    </option>
                    <option value="7day">최근 7일</option>
                    <option value="30day">최근 30일</option>
                    <option value="nowMonth">현재 월</option>
                    <option value="preMonth">전월</option>
                    <option value="selectDay">기간 지정</option>
                  </CFormSelect>
                  <CButton
                    type="button"
                    color="primary"
                    variant="outline"
                    id="basic-addon1"
                    onClick={() => {
                      getLoginlist({ page: 1 })
                      setPage1(1)
                    }}
                  >
                    <CIcon icon={cilSearch} size="lg" /> 조회
                  </CButton>
                  <CCol md={1} />
                </CCol>
                <CTable bordered className="mt-3 table-text-center">
                  <CTableHead>
                    <CTableRow align="middle" className="text-center" color="info">
                      <CTableHeaderCell scope="col" rowSpan="2">
                        날짜
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" rowSpan="2">
                        가입자
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" colSpan="3">
                        성별
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" colSpan="5">
                        연령
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" colSpan="5">
                        언어
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" colSpan="2">
                        플랫폼
                      </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow className="text-center" color="info">
                      <CTableHeaderCell scope="col">남성</CTableHeaderCell>
                      <CTableHeaderCell scope="col">여성</CTableHeaderCell>
                      <CTableHeaderCell scope="col">비공개</CTableHeaderCell>
                      <CTableHeaderCell scope="col">10 대</CTableHeaderCell>
                      <CTableHeaderCell scope="col">20 대</CTableHeaderCell>
                      <CTableHeaderCell scope="col">30 대</CTableHeaderCell>
                      <CTableHeaderCell scope="col">40 대</CTableHeaderCell>
                      <CTableHeaderCell scope="col">50 대+</CTableHeaderCell>
                      <CTableHeaderCell scope="col">한국어</CTableHeaderCell>
                      <CTableHeaderCell scope="col">영어</CTableHeaderCell>
                      <CTableHeaderCell scope="col">중국어</CTableHeaderCell>
                      <CTableHeaderCell scope="col">일본어</CTableHeaderCell>
                      <CTableHeaderCell scope="col">스페인어</CTableHeaderCell>
                      <CTableHeaderCell scope="col">AOS</CTableHeaderCell>
                      <CTableHeaderCell scope="col">IOS</CTableHeaderCell>
                    </CTableRow>
                    {listTab2 !== null && listTab2 !== undefined ? (
                      listTab2.map((value, index) => {
                        if (value.gen_date === 'total' && index === 0) {
                          return (
                            <CTableRow color="secondary" key={index}>
                              <CTableDataCell>전체</CTableDataCell>
                              <CTableDataCell>{value.created_at_cnt}</CTableDataCell>
                              <CTableDataCell>{value.gender_male}</CTableDataCell>
                              <CTableDataCell>{value.gender_female}</CTableDataCell>
                              <CTableDataCell>{value.gender_undef}</CTableDataCell>
                              <CTableDataCell>{value.birth_10}</CTableDataCell>
                              <CTableDataCell>{value.birth_20}</CTableDataCell>
                              <CTableDataCell>{value.birth_30}</CTableDataCell>
                              <CTableDataCell>{value.birth_40}</CTableDataCell>
                              <CTableDataCell>{value.birth_50}</CTableDataCell>
                              <CTableDataCell>{value.lang_ko}</CTableDataCell>
                              <CTableDataCell>{value.lang_en}</CTableDataCell>
                              <CTableDataCell>{value.lang_ch}</CTableDataCell>
                              <CTableDataCell>{value.lang_jp}</CTableDataCell>
                              <CTableDataCell>{value.lang_es}</CTableDataCell>
                              <CTableDataCell>{value.platform_android}</CTableDataCell>
                              <CTableDataCell>{value.platform_ios}</CTableDataCell>
                            </CTableRow>
                          )
                        }
                      })
                    ) : (
                      <CTableRow />
                    )}
                  </CTableHead>
                  <CTableBody>
                    {listTab2 !== null && listTab2 !== undefined ? (
                      listTab2.map((value, index) => {
                        if (value.gen_date !== 'total') {
                          return (
                            <CTableRow key={index}>
                              <CTableDataCell>{value.gen_date}</CTableDataCell>
                              <CTableDataCell>{value.created_at_cnt}</CTableDataCell>
                              <CTableDataCell>{value.gender_male}</CTableDataCell>
                              <CTableDataCell>{value.gender_female}</CTableDataCell>
                              <CTableDataCell>{value.gender_undef}</CTableDataCell>
                              <CTableDataCell>{value.birth_10}</CTableDataCell>
                              <CTableDataCell>{value.birth_20}</CTableDataCell>
                              <CTableDataCell>{value.birth_30}</CTableDataCell>
                              <CTableDataCell>{value.birth_40}</CTableDataCell>
                              <CTableDataCell>{value.birth_50}</CTableDataCell>
                              <CTableDataCell>{value.lang_ko}</CTableDataCell>
                              <CTableDataCell>{value.lang_en}</CTableDataCell>
                              <CTableDataCell>{value.lang_ch}</CTableDataCell>
                              <CTableDataCell>{value.lang_jp}</CTableDataCell>
                              <CTableDataCell>{value.lang_es}</CTableDataCell>
                              <CTableDataCell>{value.platform_android}</CTableDataCell>
                              <CTableDataCell>{value.platform_ios}</CTableDataCell>
                            </CTableRow>
                          )
                        }
                      })
                    ) : (
                      <CTableRow />
                    )}
                  </CTableBody>
                </CTable>
                {pages2 !== page2 && (
                  <CButton
                    color="dark"
                    size="sm"
                    className="moreBt"
                    onClick={() => {
                      getLoginlist({ page: page2 + 1 })
                      setPage2(page2 + 1)
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
      {isCalen && (
        <CalenderPopup
          onClickClose={() => setIsCalen(false)}
          onStart={startDay}
          onEnd={endDay}
          onChecked={(start, end) => calenderData(start, end)}
        />
      )}
      {isCalen2 && (
        <CalenderPopup
          onClickClose={() => setIsCalen2(false)}
          onStart={startDay2}
          onEnd={endDay2}
          onChecked={(start, end) => calenderData(start, end)}
        />
      )}
    </CRow>
  )
}

UserStat.propTypes = {
  history: PropTypes.object,
}

export default UserStat
