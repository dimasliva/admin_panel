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
import CreateCash from './popup/CreateCash'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import DetailCash from './popup/DetailCash'
import heart from './assets/heart.png'
import star from './assets/star.png'
import cash from './assets/cash.png'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
const CashPointManager = () => {
  // useState
  const [activeKey, setActiveKey] = useState(1)
  const one = 1
  const [role, setRole] = useState('')
  //Table title

  let tableManager
  {
    role !== one
      ? (tableManager = [
          { label: '상태​' },
          { label: 'PID' },
          { label: '가격' },
          { label: '노출이름​' },
          { label: '노출지급수​' },
          { label: '노출보너스 설명​' },
          { label: '실지급 ​캐시' },
          { label: '보너스 ​캐시' },
          { label: '보너스 ​하트1' },
          { label: '보너스 ​하트2' },
          { label: '보너스 ​스타' },
          { label: '관리' },
        ])
      : (tableManager = [
          { label: '상태​' },
          { label: 'PID' },
          { label: '가격' },
          { label: '노출이름​' },
          { label: '노출지급수​' },
          { label: '노출보너스 설명​' },
          { label: '실지급 ​캐시' },
          { label: '보너스 ​캐시' },
          { label: '보너스 ​하트1' },
          { label: '보너스 ​하트2' },
          { label: '보너스 ​스타' },
        ])
  }

  // list Tab1 pagrams
  const [listTab1, setListTab1] = useState(null)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [isStatus, setStatus] = useState('2')
  const [isPlatform, setPlatform] = useState(1)
  const [isCashDetail, setIsCashDetail] = useState({
    use: false,
    id: '',
  })
  const [isCreateCash, setIsCreateCash] = useState(false)

  useEffect(() => {
    if (activeKey === 1 && role !== one) getList()
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
    if (params.status === undefined) {
      params.status = isStatus
    }
    if (params.platform === undefined) {
      params.platform = isPlatform
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
      queries.push(`platform=${isPlatform}`)
    }
    if (params.status !== '2') {
      queries.push(`status=${isStatus}`)
    }
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/cash/grid${queryStr}`, headerConfig)
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
  const onCloseEvent = () => {
    setIsCreateCash(false)
    setIsCashDetail({
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
                  캐시 상품관리
                </CNavLink>
              </CNavItem>
            </CNav>
            <CCardBody>
              <CTabContent>
                <CTabPane role="tabpanel" visible={activeKey === 1}>
                  <CCol sm={12} className="d-flex flex-row align-items-center mb-3">
                    <CFormSelect
                      size="lg"
                      style={{ width: '150px' }}
                      aria-label="Large select example"
                      className="search-bar__select text-center"
                      value={isStatus}
                      onChange={(e) => {
                        setStatus(e.target.value)
                      }}
                    >
                      <option value="2">전체</option>
                      <option value="1">정상</option>
                      <option value="0">비활성</option>
                      <option value="-1">삭제</option>
                    </CFormSelect>
                    <CFormSelect
                      size="lg"
                      style={{ width: '150px' }}
                      aria-label="Large select example"
                      className="search-bar__select text-center mx-2"
                      value={isPlatform}
                      onChange={(e) => {
                        setPlatform(e.target.value)
                      }}
                    >
                      <option value="1">Android</option>
                      <option value="2">IOS</option>
                    </CFormSelect>
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
                  </CCol>
                  <CRow className="g-3">
                    <CCol>
                      {role !== one && (
                        <CCol className="float-end mb-2">
                          <div className="d-flex flex-row">
                            <CButton
                              onClick={() => {
                                setIsCreateCash(true)
                              }}
                              style={{ color: 'white' }}
                              type="button"
                              className="px-4"
                              color="info"
                              id="basic-addon1"
                            >
                              상품 등록
                            </CButton>
                          </div>
                        </CCol>
                      )}
                      {/*Table*/}
                      <CCol>
                        <CTable bordered className="text-break">
                          <CTableHead>
                            <CTableRow>
                              {tableManager.map((title, index) => {
                                return (
                                  <CTableHeaderCell className="text-center" scope="col" key={index}>
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
                                return (
                                  <CTableRow key={index}>
                                    <CTableDataCell scope="row" onClick={() => console.log(value)}>
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <span>
                                          {value.status === 1
                                            ? '정상'
                                            : value.status === 0
                                            ? '비활성'
                                            : '삭제'}
                                        </span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <span>{value.pid}​</span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <span>{value.cost}</span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <span>{value.title_product}</span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <span>{value.pay_view}</span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell style={{ width: '16%' }}>
                                      <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                          <CImage
                                            style={{
                                              width: '25%',
                                              objectFit: 'cover',
                                              marginRight: '5px',
                                            }}
                                            src={heart}
                                          />
                                          <span style={{ width: '50px' }}>{value.heart_1}</span>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                          <CImage
                                            style={{
                                              width: '25%',
                                              objectFit: 'cover',
                                              marginRight: '5px',
                                            }}
                                            src={heart}
                                          />
                                          <span style={{ width: '50px' }}>{value.heart_2}</span>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                          <CImage
                                            style={{
                                              width: '25%',
                                              objectFit: 'cover',
                                              marginRight: '5px',
                                            }}
                                            src={cash}
                                          />
                                          <span style={{ width: '50px' }}>{value.cash_point}</span>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                          <CImage
                                            style={{
                                              width: '25%',
                                              objectFit: 'cover',
                                              marginRight: '5px',
                                            }}
                                            src={star}
                                          />
                                          <span style={{ width: '50px' }}>{value.star_point}</span>
                                        </div>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell scope="row">
                                      <div className="d-flex flex-column align-items-center justify-content-center">
                                        <span>{value.cash_point}</span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell scope="row">
                                      <div className="d-flex flex-column align-items-center justify-content-center">
                                        <span>{value.gold_point}</span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell scope="row">
                                      <div className="d-flex flex-column align-items-center justify-content-center">
                                        <span>{value.heart_1}</span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell scope="row">
                                      <div className="d-flex flex-column align-items-center justify-content-center">
                                        <span>{value.heart_2}</span>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell scope="row">
                                      <div className="d-flex flex-column align-items-center justify-content-center">
                                        <span>{value.star_point}</span>
                                      </div>
                                    </CTableDataCell>
                                    {role !== one && (
                                      <CTableDataCell scope="row">
                                        <div className="d-flex flex-row align-items-center justify-content-center">
                                          <CButton
                                            onClick={() =>
                                              setIsCashDetail({
                                                use: true,
                                                id: value.id,
                                              })
                                            }
                                            className="text-nowrap"
                                            color="light"
                                          >
                                            수정​
                                          </CButton>
                                        </div>
                                      </CTableDataCell>
                                    )}
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
      {isCreateCash && role !== one && (
        <CreateCash
          onClickClose={() => setIsCreateCash(false)}
          onCloseOkEvent={() => onCloseEvent()}
        />
      )}
      {isCashDetail.use && (
        <DetailCash
          onClickClose={() =>
            setIsCashDetail({
              use: false,
              id: '',
            })
          }
          onCloseOkEvent={() => onCloseEvent()}
          onId={isCashDetail.id}
        />
      )}
    </CRow>
  )
}
CashPointManager.propTypes = {
  history: PropTypes.object,
}

export default CashPointManager
