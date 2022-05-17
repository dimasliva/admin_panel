import React, { useEffect, useState } from 'react'
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
import { UserDetail } from '../../../member/popup/UserDetail'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import { ImgBig } from '../../../../components/publicPopup/ImgBig'
import moment from 'moment'

const EtcPayManager = () => {
  // useState
  const [activeKey, setActiveKey] = useState(1)
  const [isUserInfo, setIsUserInfo] = useState({ use: false, id: '' }) // Detail Popup
  const [limit, setLimit] = useState(30)
  const [page, setPage] = useState(1)
  const [listTab1, setListTab1] = useState(null)
  const [isSearchWord, setSearchWord] = useState('')
  const [isSearchType, setSearchType] = useState('cid')
  const [isFilterSlug, setFilterSlug] = useState('full')
  const [isPlatform, setPlatform] = useState(2)
  const [isImg, setIsImg] = useState({ use: false, img: '' })
  const [sort, setSort] = useState('created_at')
  const [order, setOrder] = useState('asc')
  const [pages, setPages] = useState(1)
  const [role, setRole] = useState(1)
  const one = 1
  //Table title
  const tableEtc = [
    { label: '구매일​' },
    { label: '구매자​' },
    { label: '아이템​' },
    { label: '결제금액​' },
    { label: '플랫폼​' },
    { label: '고유 ID​​' },
  ]
  useEffect(() => {
    if (activeKey === 1) {
      getList()
    }
  }, [])
  // Tab1
  const getList = async (params) => {
    if (!params) {
      params = {}
    }
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
    if (!params.limit) {
      params.limit = limit
    }
    if (params.page === undefined) {
      params.page = page
    }
    if (params.platform === undefined) {
      params.platform = isPlatform
    }
    if (params.filter_slug === undefined) {
      params.filter_slug = isFilterSlug
    }
    if (params.search_word === undefined) {
      params.search_word = isSearchWord
    }
    if (params.search_type === undefined) {
      params.search_type = isSearchType
    }

    if (params.sort === undefined) {
      params.sort = sort
    }

    if (params.order === undefined) {
      params.order = order
    }

    const queries = []
    if (params.page === 1) {
      queries.push(`page=1`)
      queries.push(`limit=${30 * params.page}`)
    } else {
      queries.push(`page=${params.page}`)
      queries.push(`limit=30`)
    }

    if (params.platform !== 'all') {
      queries.push(`platform=${params.platform}`)
    }
    if (params.filter_slug !== 'full') {
      queries.push(`slug=${params.filter_slug}`)
    }
    if (params.search_word !== '') {
      queries.push(`search_type=${params.search_type}`)
      queries.push(`search_word=${params.search_word}`)
    }
    if (params.sort !== '') {
      queries.push(`sort=${params.sort}`)
    }

    if (params.order !== '') {
      queries.push(`order=${params.order}`)
    }
    queries.push(`buy=1`)
    console.log(queries)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/user/point/query${queryStr}`, headerConfig)
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
  return (
    <CRow>
      {role !== one && role !== 2 && (
        <CCol xs={12}>
          <CCard className="mb-4">
            <CNav variant="tabs" className="mt-2 nav-custom">
              <CNavItem>
                <CNavLink
                  className="cursor custom-tab-color-main"
                  active={activeKey === 1}
                  onClick={() => setActiveKey(1)}
                >
                  유료 결제현황
                </CNavLink>
              </CNavItem>
            </CNav>
            <CCardBody>
              <CTabContent>
                <CTabPane role="tabpanel" visible={activeKey === 1}>
                  <CCol sm={12} className="d-flex flex-row align-items-center mb-4">
                    <CFormSelect
                      size="lg"
                      style={{ width: '150px' }}
                      aria-label="Large select example"
                      className="search-bar__select me-2 text-center"
                      defaultValue={isPlatform}
                      onChange={(e) => setPlatform(e.target.value)}
                    >
                      <option value="all">전체</option>
                      <option value="0">Android</option>
                      <option value="1">IOS</option>
                    </CFormSelect>
                    <CFormSelect
                      size="lg"
                      style={{ width: '150px' }}
                      aria-label="Large select example"
                      className="search-bar__select me-2 text-center"
                      defaultValue={isFilterSlug}
                      onChange={(e) => setFilterSlug(e.target.value)}
                    >
                      <option value="full">전체</option>
                      <option value="fan-diy">팬DIY</option>
                      <option value="sign">전광판</option>
                      <option value="random-box">랜덤박스</option>
                      <option value="other">기타</option>
                    </CFormSelect>
                    <CInputGroup style={{ width: '30%' }}>
                      <CFormInput
                        size="lg"
                        onChange={(e) => setSearchWord(e.target.value)}
                        className="text-center"
                        placeholder="CID를 입력하세요"
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
                        <CIcon icon={cilSearch} size="lg" /> 조회​
                      </CButton>
                    </CInputGroup>
                  </CCol>
                  <CRow className="g-3">
                    <CCol>
                      {/*Table*/}
                      <CCol>
                        <CTable>
                          <CTableHead>
                            <CTableRow>
                              {tableEtc.map((title, index) => {
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
                              listTab1.map((value) => {
                                const payed = {
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
                                  <CTableRow key={value.id}>
                                    <CTableDataCell scope="row" className="border-1 text-break">
                                      <div className="d-flex flex-column align-items-center justify-content-center">
                                        <span>{payed.date}</span>
                                        <span>{payed.time}</span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell className="border-1 text-break">
                                      <div className="d-flex flex-row align-items-center justify-content-start">
                                        <div className="d-flex flex-row align-items-center">
                                          <CImage
                                            className="cursor"
                                            onClick={() =>
                                              setIsImg({
                                                use: true,
                                                img: process.env.REACT_APP_IMG + value.avatar,
                                              })
                                            }
                                            style={{
                                              borderRadius: '50%',
                                              width: '50px',
                                              height: '50px',
                                              marginRight: '10px',
                                            }}
                                            src={process.env.REACT_APP_IMG + value.avatar}
                                          />
                                          <span
                                            onClick={() => {
                                              setIsUserInfo({ use: true, id: value.user_id })
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
                                    <CTableDataCell className="border-1 text-break">
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <span>{value.action_title}​</span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell className="border-1 text-break">
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <span>{value.count_buy}p</span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell
                                      className="border-1 text-break"
                                      onClick={(e) => console.log(value)}
                                    >
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <span>{value.platform === 0 ? 'Android' : 'iOS'}</span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell className="border-1 text-break">
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <span>{value.uid}</span>
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
      )}
      {isUserInfo.use && (
        <UserDetail
          onClickClose={() => setIsUserInfo({ use: false, id: '' })}
          onId={isUserInfo.id}
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
EtcPayManager.propTypes = {
  history: PropTypes.object,
}
export default EtcPayManager
