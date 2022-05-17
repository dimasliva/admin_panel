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
  CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CImage,
  CInputGroup,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { cilSearch, cilReload } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { UserDetail } from './popup/UserDetail'
import { ImgBig } from 'src/components/publicPopup/ImgBig'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'
import moment from 'moment'

const UserWithdraw = (props) => {
  const [activeKey, setActiveKey] = useState(1)
  const tableTitle = [
    { label: '번호' },
    { label: '사용자 정보' },
    { label: '성별' },
    { label: '탈퇴사유' },
    { label: '레벨' },
    { label: '캐시' },
    { label: '하트 1' },
    { label: '하트 2' },
    { label: '스타' },
    { label: '팬픽' },
    { label: '플랫폼' },
    { label: '탈퇴 날짜' },
  ]

  const [list, setList] = useState(null)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [searchTarget, setSearchTarget] = useState('nickname')
  const [userInfo, setUserInfo] = useState({
    use: false,
    id: '',
    status: -1,
  }) // User Information Modal
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  }) // img detail

  const [total, setTotal] = useState(1)

  useEffect(() => {
    getList()
  }, [])

  const getList = async (params) => {
    if (!params) {
      params = {}
    }
    const queries = []

    if (params.page === undefined) {
      params.page = page
    }

    if (keyword !== '') {
      queries.push(`search_type=${searchTarget}`)
      queries.push(`search_word=${keyword}`)
    }
    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios
      .get(`/api/user/action/withdraw${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    console.log(queries)
    console.log(res.data.value)
    if (!res.data.success) return
    setTotal(res.data.value.count)
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => list.push(value))
      setList([...list])
      return
    }
    setList(res.data.value.items)
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
                onClick={() => setActiveKey(1)}
              >
                탈퇴 회원
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CRow className="g-3">
              <CCol md={12} className="d-flex flex-row align-items-center">
                <CFormSelect
                  size="lg"
                  aria-label="포인트 전체"
                  style={{ width: '130px' }}
                  className="me-2"
                  value={searchTarget}
                  onChange={(e) => setSearchTarget(e.target.value)}
                >
                  <option value="nickname">닉네임</option>
                  <option value="cid">CID</option>
                  <option value="email">이메일</option>
                  <option value="ad_token">광고 ID</option>
                </CFormSelect>
                <CInputGroup style={{ width: '40%' }}>
                  <CFormInput
                    placeholder="검색할 키워드를 입력하세요"
                    size="lg"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
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
                    size="lg"
                    variant="outline"
                    id="basic-addon1"
                    onClick={() => {
                      getList({ page: 1 })
                      setPage(1)
                    }}
                  >
                    <CIcon icon={cilSearch} />
                    &nbsp;조회
                  </CButton>
                </CInputGroup>
              </CCol>
            </CRow>
            <div className="button-group mt-3 text-left">
              <CButton
                color="info"
                size="sm"
                className="button-group__bt"
                onClick={() => {
                  getList({ page: 1 })
                  setPage(1)
                }}
              >
                새로고침&nbsp;
                <CIcon icon={cilReload} />
              </CButton>
            </div>
            <CTable bordered className="mt-3 table-text-center">
              <CTableHead>
                <CTableRow className="text-center" color="info">
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
                {list !== null && list !== undefined ? (
                  list.map((value, index) => {
                    // Image Quarterly null
                    const imgText = value.avatar
                    let imgStr = ''
                    if (imgText !== null) {
                      imgStr = process.env.REACT_APP_IMG + imgText
                    } else {
                      imgStr = ''
                    }
                    // day
                    const day = {
                      day: moment(value.created_at).format('YYYY-MM-DD'),
                      time: moment(value.created_at).format('HH:mm:ss'),
                    }
                    return (
                      <CTableRow key={index}>
                        <CTableDataCell className="text-center">{total - index}</CTableDataCell>
                        <CTableDataCell className="border-1 text-break">
                          <div className="d-flex flex-row align-items-center justify-content-start">
                            <div className="d-flex flex-row align-items-center">
                              <CImage
                                className="cursor"
                                onClick={() =>
                                  setIsImg({
                                    use: true,
                                    img: value.avatar,
                                  })
                                }
                                style={{
                                  borderRadius: '50%',
                                  width: '50px',
                                  height: '50px',
                                  marginRight: '10px',
                                }}
                                src={process.env.REACT_APP_IMG + value.avatar}
                                onError={(e) => (e.target.src = '/icon.png')}
                              />
                              <span
                                onClick={() => {
                                  setUserInfo({ use: true, id: value.user_id })
                                }}
                                style={{ color: 'blue', cursor: 'pointer' }}
                              >
                                {value.nickname && value.nickname.length > 9
                                  ? value.nickname.substr(0, 9) + '...'
                                  : value.nickname}
                              </span>
                            </div>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          {value.gender === 0 ? '남성' : value.gender === 1 ? '여성' : '기타'}
                        </CTableDataCell>
                        <CTableDataCell className="text-center" style={{ width: '15%' }}>
                          {value.description}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">{value.level}</CTableDataCell>
                        <CTableDataCell className="text-center">{value.cash_point}</CTableDataCell>
                        <CTableDataCell className="text-center">{value.heart_1}</CTableDataCell>
                        <CTableDataCell className="text-center">{value.heart_2}</CTableDataCell>
                        <CTableDataCell className="text-center">{value.star_point}</CTableDataCell>
                        <CTableDataCell className="text-center">{value.gold_point}</CTableDataCell>
                        <CTableDataCell className="text-center">
                          {value !== null ? value.device.platform : ''}
                        </CTableDataCell>
                        <CTableDataCell>
                          {day.day}
                          <br />
                          {day.time}
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
          </CCardBody>
        </CCard>
      </CCol>
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

UserWithdraw.propTypes = {
  history: PropTypes.object,
}

export default UserWithdraw
