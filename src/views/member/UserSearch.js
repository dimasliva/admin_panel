import React, { useEffect, useState } from 'react'
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
} from '@coreui/react'
import { UserDetail } from './popup/UserDetail'
import { UserAdd } from './popup/UserAdd'
import { cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'
import xlsx from 'xlsx'
import moment from 'moment'
const UserSearch = () => {
  const [isDetailPopup, setIsDetailPopup] = useState({ use: false, id: '' }) // Detail Popup
  const [isAddPopup, setIsAddPopup] = useState(false) // Add Popup
  const tableTitle = [
    { label: '번호' },
    { label: '사용자 정보' },
    { label: '성별' },
    { label: '상태' },
    { label: '가입형태' },
    { label: '언어' },
    { label: '레벨' },
    { label: '경험치' },
    { label: '추천수' },
    { label: '캐시' },
    { label: '하트' },
    { label: '스타' },
    { label: '팬픽' },
    // { label: '추천수' },
    { label: '팔로잉' },
    { label: '팔로워' },
    { label: '푸쉬' },
    { label: '플랫폼' },
    { label: '앱 버전' },
    { label: '가입일' },
    { label: '최근접속' },
  ]
  const [list, setList] = useState(null)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [searchType, setSearchType] = useState('nickname')
  const [keyword, setKeyWord] = useState('')
  const [totalSort, setTotalSort] = useState('created_at')
  const [statusType, setStatusType] = useState('')
  const [genderType, setGenderType] = useState('')
  const [platformType, setPlatformType] = useState('')
  const [langType, setLangType] = useState('')
  const [oauth, setOauth] = useState('')
  const one = 1
  const [role, setRole] = useState('')
  function paramsPrepare(params) {
    params = params || {}

    var queries = []
    if (!params.page) {
      params.page = page
    }
    if (params.statusType === undefined) {
      params.statusType = statusType
    }
    if (params.totalSort === undefined) {
      params.totalSort = totalSort
    }
    if (params.genderType === undefined) {
      params.genderType = genderType
    }
    if (params.platformType === undefined) {
      params.platformType = platformType
    }
    if (params.oauth === undefined) {
      params.oauth = oauth
    }
    if (params.langType === undefined) {
      params.langType = langType
    }
    if (params.statusType && params.statusType !== 'all' && params.statusType !== 'select') {
      queries.push(`filter_status=${params.statusType}`)
    }
    if (params.genderType && params.genderType !== 'all' && params.genderType !== 'select') {
      queries.push(`filter_gender=${params.genderType}`)
    }
    if (params.platformType && params.platformType !== 'all' && params.platformType !== 'select') {
      queries.push(`filter_platform=${params.platformType}`)
    }
    if (params.oauth && params.oauth !== 'all' && params.oauth !== 'select') {
      queries.push(`filter_oauth=${params.oauth}`)
    }
    if (params.langType && params.langType !== 'all' && params.langType !== 'select') {
      queries.push(`filter_language	=${params.langType}`)
    }
    if (keyword !== '') {
      queries.push(`search_word=${keyword}`)
      queries.push(`search_type=${searchType}`)
    }
    if (params.totalSort !== 'null') {
      queries.push(`sort=${params.totalSort}`)
    }
    params.limit = params.limit || 30
    if (params.isSort) {
      if (params.page > 1) {
        queries.push(`page=1`)
        queries.push(`limit=${params.limit * params.page}`)
      } else {
        queries.push(`page=${params.page}`)
        queries.push(`limit=${params.limit}`)
      }
    } else {
      queries.push(`page=${params.page}`)
      queries.push(`limit=${params.limit}`)
    }
    return [queries, params]
  }
  const getList = async (params) => {
    if (!params) {
      params = {}
    }
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
    const queries = []
    if (!params.page) {
      params.page = page
    }
    if (params.statusType === undefined) {
      params.statusType = statusType
    }
    if (params.totalSort === undefined) {
      params.totalSort = totalSort
    }
    if (params.genderType === undefined) {
      params.genderType = genderType
    }
    if (params.platformType === undefined) {
      params.platformType = platformType
    }
    if (params.oauth === undefined) {
      params.oauth = oauth
    }
    if (params.langType === undefined) {
      params.langType = langType
    }
    if (params.statusType && params.statusType !== 'all' && params.statusType !== 'select') {
      queries.push(`filter_status=${params.statusType}`)
    }
    if (params.genderType && params.genderType !== 'all' && params.genderType !== 'select') {
      queries.push(`filter_gender=${params.genderType}`)
    }
    if (params.platformType && params.platformType !== 'all' && params.platformType !== 'select') {
      queries.push(`filter_platform=${params.platformType}`)
    }
    if (params.oauth && params.oauth !== 'all' && params.oauth !== 'select') {
      queries.push(`filter_oauth=${params.oauth}`)
    }
    if (params.langType && params.langType !== 'all' && params.langType !== 'select') {
      queries.push(`filter_language	=${params.langType}`)
    }
    if (keyword !== '') {
      queries.push(`search_word=${keyword}`)
      queries.push(`search_type=${searchType}`)
    }
    if (params.totalSort !== 'null') {
      queries.push(`sort=${params.totalSort}`)
    }
    params.limit = params.limit || 30
    if (params.isSort) {
      if (params.page === 1) {
        queries.push(`page=1`)
        queries.push(`limit=${30 * params.page}`)
      } else {
        queries.push(`page=${params.page}`)
        queries.push(`limit=30`)
      }
    } else {
      queries.push(`page=${params.page}`)
      queries.push(`limit=${params.limit}`)
    }
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/user/grid${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (params.isSort !== undefined) {
      if (params.isSort) {
        setList(res.data.value.items)
      }
    } else {
      if (params.page > 1) {
        res.data.value.items.map((value) => list.push(value))
        setList([...list])
      } else {
        setList(res.data.value.items)
      }
    }
  }
  // table excel conversion
  const tableToxlsx = async (filters) => {
    const [queries, params] = paramsPrepare(filters)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/user/grid${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    var data = res.data.value.items.map((item) => {
      var obj = {}
      obj.id = item.id
      obj.nickname = item.nickname
      obj.gender = item.gender === 0 ? '남성' : item.gender === 1 ? '여성' : '기타'
      obj.status = item.status === 1 ? '정상' : item.status === 2 ? '차단' : '탈퇴'
      obj.oauth = item.oauth
      obj.language = item.language
      obj.level = item.level
      obj.exp = item.exp
      obj.subscriber_cnt = item.subscriber_cnt
      obj.cash_point = item.cash_point
      obj.heart = item.heart_2 + '/' + item.heart_1
      obj.star = item.star_point
      obj.gold = item.gold_point
      obj.unknown = ''
      obj.follow_cnt = item.follow_cnt
      obj.push = item.push
      obj.platform = item.device.platform
      obj.model = item.device.model
      obj.created_at = item.created_at ? moment(item.created_at).format('YYYY-MM-DD hh:mm:ss') : ''
      obj.last_seen = item.last_seen ? moment(item.last_seen).format('YYYY-MM-DD hh:mm:ss') : ''
      return obj
    })
    var heading = [tableTitle.map((item) => item.label)]
    const wb = xlsx.utils.book_new()
    const ws = xlsx.utils.json_to_sheet([])
    ws['!cols'] = [
      { wch: 5 },
      { wch: 25 },
      { wch: 3 },
      { wch: 3 },
      { wch: 6 },
      { wch: 3 },
      { wch: 3 },
      { wch: 4 },
    ]
    xlsx.utils.sheet_add_aoa(ws, heading, { skipHeader: true })
    xlsx.utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true })
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1')
    xlsx.writeFile(wb, 'members_' + moment().format('YYYY_MM_DD_hh_mm').toString() + '.xlsx')
  }
  const modalOkEvent = () => {
    setIsAddPopup(false)
    getList({ page: 1 })
    setPage(1)
  }
  useEffect(() => {
    getList()
  }, [])
  const onCloseEvent = () => {
    setIsDetailPopup({
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
              <CNavLink active className="custom-tab-color-main">
                사용자 조회
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CRow className="g-3">
              <CCol sm={12} className="d-flex flex-row align-items-center">
                <CFormSelect
                  size="lg"
                  style={{ width: '130px' }}
                  aria-label="Large select example"
                  className="search-bar__select me-2"
                  value={searchType}
                  onChange={(e) => {
                    setSearchType(e.target.value)
                  }}
                >
                  <option value="nickname">닉네임</option>
                  <option value="cid">CID</option>
                  <option value="email">이메일</option>
                  <option value="ad_token">광고ID</option>
                </CFormSelect>
                <CInputGroup style={{ width: '35%' }}>
                  <CFormInput
                    size="lg"
                    placeholder="검색할 키워드를 입력하세요."
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={keyword}
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
            </CRow>
            <CCol sm={9} className="mt-5 d-flex flex-row">
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="select-group__select"
                value={totalSort}
                onChange={(e) => {
                  getList({
                    isSort: true,
                    totalSort:
                      e.target.value === 'null'
                        ? (e.target.value = 'subscriber_cnt')
                        : e.target.value,
                    statusType,
                    genderType,
                    platformType,
                    langType,
                    oauth,
                  })
                  setTotalSort(e.target.value)
                  setPage(1)
                }}
              >
                <option value="created_at">최근가입</option>
                <option value="last_seen">최신접속</option>
                <option value="level">레벨</option>
                <option value="exp">경험치</option>
                <option value="cash_point">캐시</option>
                <option value="heart_1">하트1(Daily)</option>
                <option value="heart_2">하트2</option>
                <option value="star_point">스타</option>
                <option value="gold_point">팬픽</option>
                <option value="u.follow_cnt">팔로잉</option>
                <option value="u.subscriber_cnt">팔로우</option>
                <option value="subscriber_cnt">친구추천</option>
              </CFormSelect>
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="mx-2 select-group__select"
                value={statusType}
                onChange={(e) => {
                  getList({
                    isSort: true,
                    totalSort,
                    statusType: e.target.value,
                    genderType,
                    platformType,
                    langType,
                    oauth,
                  })
                  setStatusType(e.target.value)
                  setPage(1)
                }}
              >
                <option value="select">회원상태</option>
                <option value="all">전체</option>
                <option value="1">정상</option>
                <option value="-1">탈퇴</option>
                <option value="2">차단</option>
              </CFormSelect>
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="select-group__select"
                value={genderType}
                onChange={(e) => {
                  getList({
                    isSort: true,
                    totalSort,
                    statusType,
                    genderType: e.target.value,
                    platformType,
                    langType,
                    oauth,
                  })
                  setGenderType(e.target.value)
                  setPage(1)
                }}
              >
                <option value="select">성별</option>
                <option value="all">전체</option>
                <option value="0">남성</option>
                <option value="1">여성</option>
                <option value="2">미지정</option>
              </CFormSelect>
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="select-group__select mx-2"
                value={platformType}
                onChange={(e) => {
                  getList({
                    isSort: true,
                    totalSort,
                    statusType,
                    genderType,
                    platformType: e.target.value,
                    langType,
                    oauth,
                  })
                  setPlatformType(e.target.value)
                  setPage(1)
                }}
              >
                <option value="select">플랫폼</option>
                <option value="all">전체</option>
                <option value="android">Android</option>
                <option value="ios">IOS</option>
              </CFormSelect>
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="select-group__select me-2"
                value={oauth}
                onChange={(e) => {
                  getList({
                    isSort: true,
                    totalSort,
                    statusType,
                    genderType,
                    platformType,
                    langType,
                    oauth: e.target.value,
                  })
                  setOauth(e.target.value)
                  setPage(1)
                }}
              >
                <option value="select">가입형태</option>
                <option value="all">전체</option>
                <option value="google">구글</option>
                <option value="apple">애플</option>
                <option value="kakao">카카오</option>
                <option value="facebook">페이스북</option>
                <option value="email">이메일</option>
              </CFormSelect>
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="select-group__select"
                value={langType}
                onChange={(e) => {
                  getList({
                    isSort: true,
                    totalSort,
                    statusType,
                    genderType,
                    platformType,
                    langType: e.target.value,
                    oauth,
                  })
                  setLangType(e.target.value)
                  setPage(1)
                }}
              >
                <option value="select">사용자 언어</option>
                <option value="all">전체</option>
                <option value="ko">한국어</option>
                <option value="en">영어</option>
                <option value="ch">중국어</option>
                <option value="jp">일본어</option>
                <option value="es">스페인어</option>
              </CFormSelect>
            </CCol>
            {role !== one && (
              <div className="button-group mt-5">
                <CButton
                  color="info"
                  size="sm"
                  className="button-group__bt"
                  onClick={() => {
                    setIsAddPopup(true)
                  }}
                >
                  신규 계정 등록
                </CButton>
                <CButton
                  color="success"
                  size="sm"
                  className="button-group__bt"
                  onClick={() => {
                    tableToxlsx({
                      limit: 'all',
                      totalSort,
                      statusType,
                      genderType,
                      platformType,
                      langType,
                      oauth,
                    })
                  }}
                >
                  엑셀 다운
                </CButton>
              </div>
            )}
            <CTable
              bordered
              className="mt-3 table-text-center"
              id="tableChange"
              style={{ fontSize: '12px' }}
            >
              <CTableHead>
                <CTableRow>
                  {tableTitle.map((title, index) => {
                    return (
                      <CTableHeaderCell className="text-center" scope="col" key={index}>
                        {title.label}
                      </CTableHeaderCell>
                    )
                  })}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {list !== null && list !== undefined ? (
                  list.map((value, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{value.id}</CTableHeaderCell>
                        <CTableDataCell
                          className="cursor"
                          style={{ width: '8%' }}
                          onClick={() => {
                            setIsDetailPopup({
                              use: true,
                              id: value.id,
                            })
                          }}
                        >
                          <span className="text-info">
                            {value.nickname && value.nickname.length > 9
                              ? value.nickname.substr(0, 9) + '...'
                              : value.nickname}
                          </span>
                        </CTableDataCell>
                        <CTableDataCell>
                          {value.gender === 0 ? '남성' : value.gender === 1 ? '여성' : '기타'}
                        </CTableDataCell>
                        <CTableDataCell>
                          {value.status === 1 ? '정상' : value.status === 2 ? '차단' : '탈퇴'}
                        </CTableDataCell>
                        <CTableDataCell>{value.oauth}</CTableDataCell>
                        <CTableDataCell>{value.language}</CTableDataCell>
                        <CTableDataCell>{value.level}</CTableDataCell>
                        <CTableDataCell>{value.exp}</CTableDataCell>
                        <CTableDataCell>{value.subscriber_cnt}</CTableDataCell>
                        <CTableDataCell>{value.cash_point}</CTableDataCell>
                        <CTableDataCell>
                          {value.heart_2}({value.heart_1})
                        </CTableDataCell>
                        <CTableDataCell>{value.star_point}</CTableDataCell>
                        <CTableDataCell>{value.gold_point}</CTableDataCell>
                        <CTableDataCell>{value.follow_cnt}</CTableDataCell>
                        <CTableDataCell>{value.subscriber_cnt}</CTableDataCell>
                        <CTableDataCell>{value.push}</CTableDataCell>
                        <CTableDataCell>{value.device.platform}</CTableDataCell>
                        <CTableDataCell>{value.device.ver_app}</CTableDataCell>
                        <CTableDataCell>
                          {value.created_at ? moment(value.created_at).format('YYYY-MM-DD') : ''}
                          <br />
                          {value.created_at ? moment(value.created_at).format('hh:mm:ss') : ''}
                        </CTableDataCell>
                        <CTableDataCell>
                          {value.last_seen ? moment(value.last_seen).format('YYYY-MM-DD') : ''}
                          <br />
                          {value.last_seen ? moment(value.last_seen).format('hh:mm:ss') : ''}
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
                    totalSort,
                    statusType,
                    genderType,
                    platformType,
                    langType,
                    oauth,
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
      {isDetailPopup.use && (
        <UserDetail
          onClickClose={() =>
            setIsDetailPopup({
              use: false,
              id: '',
            })
          }
          onId={isDetailPopup.id}
          onCloseOkEvent={() => onCloseEvent()}
        />
      )}
      {isAddPopup && role !== one && (
        <UserAdd onClickClose={() => setIsAddPopup(false)} onCreated={() => modalOkEvent()} />
      )}
    </CRow>
  )
}

export default UserSearch
