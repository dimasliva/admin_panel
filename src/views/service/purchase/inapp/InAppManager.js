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
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import moment from 'moment'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import { ImgBig } from 'src/components/publicPopup/ImgBig'

const InAppManager = () => {
  const [isImg, setIsImg] = useState({
    use: '',
    img: '',
  })
  // useState
  const [activeKey, setActiveKey] = useState(1)
  // list Tab1 pagrams
  const [listTab1, setListTab1] = useState(null)
  const [page, setPage] = useState(1)
  const [isPlatform, setPlatform] = useState('all')
  const [isSearchWord, setSearchWord] = useState('')
  const [pages, setPages] = useState(0)
  const [isUserDetail, setIsUserDetail] = useState({
    use: false,
    id: '',
  })
  //Table title
  const tableManager = [
    { label: '구매일​' },
    { label: '구매자' },
    { label: '아이템' },
    { label: '플랫폼​' },
    { label: '결제 ID​' },
  ]
  const [role, setRole] = useState('')
  const one = 1
  useEffect(() => {
    if (activeKey === 1) getList()
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
    if (params.page === undefined) {
      params.page = page
    }
    if (params.platform === undefined) {
      params.platform = isPlatform
    }
    if (params.search_word === undefined) {
      params.search_word = isSearchWord
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
      queries.push(`filter_platform=${isPlatform}`)
    }
    if (params.search_word !== '') {
      queries.push(`search_type=cid`)
      queries.push(`search_word=${isSearchWord}`)
    }
    console.log(queries)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/purchase/cash/grid${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    console.log(res.data.value)
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
  const onCloseEvent = () => {
    setIsUserDetail({
      use: false,
      id: '',
    })
    getList({ page: 1 })
    setPage(1)
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
                  인앱 결제현황​
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
                      className="search-bar__select me-2 text-center"
                      style={{ width: '150px' }}
                      onChange={(e) => setPlatform(e.target.value)}
                    >
                      <option value="all">전체</option>
                      <option value="android">Android</option>
                      <option value="ios">IOS</option>
                    </CFormSelect>
                    <CInputGroup style={{ width: '35%' }}>
                      <CFormInput
                        size="lg"
                        onChange={(e) => setSearchWord(e.target.value)}
                        className="text-center"
                        placeholder="CID를 입력하세요"
                      />
                      <CButton
                        size="lg"
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
                        <CTable bordered className="text-break">
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
                                // created
                                const payed = {
                                  date:
                                    value.payed_at === null
                                      ? ''
                                      : moment(value.payed_at).format('YYYY-MM-DD'),
                                  time:
                                    value.payed === null
                                      ? ''
                                      : moment(value.payed_at).format('HH:mm:ss'),
                                }
                                return (
                                  <CTableRow key={index}>
                                    <CTableDataCell scope="row">
                                      <div className="d-flex flex-column align-items-center justify-content-center">
                                        <span>{payed.date}</span>
                                        <span>{payed.time}</span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      <div className="d-flex flex-row align-items-center justify-content-start">
                                        <div className="d-flex flex-row align-items-center">
                                          <CImage
                                            className="cursor"
                                            style={{
                                              borderRadius: '50%',
                                              width: '50px',
                                              height: '50px',
                                              marginRight: '10px',
                                            }}
                                            src={process.env.REACT_APP_IMG + value.avatar}
                                            onClick={() => {
                                              setIsImg({
                                                use: true,
                                                img:
                                                  value.avatar !== null || value.avatar !== ''
                                                    ? process.env.REACT_APP_IMG + value.avatar
                                                    : '',
                                              })
                                            }}
                                          />
                                          <span
                                            onClick={() => {
                                              setIsUserDetail({ use: true, id: value.user_id })
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
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <span>{value.pid_product}​</span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <span>{value.platform === 0 ? 'Android' : 'iOS'}</span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <span>{value.pay_token}​</span>
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
      {isUserDetail.use && (
        <UserDetail
          onClickClose={() =>
            setIsUserDetail({
              use: false,
              id: '',
            })
          }
          onCloseOkEvent={() => onCloseEvent()}
          onId={isUserDetail.id}
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
InAppManager.propTypes = {
  history: PropTypes.object,
}

export default InAppManager
