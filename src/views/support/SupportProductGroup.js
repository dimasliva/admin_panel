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
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from '@coreui/react'
import { GroupAdd } from './popup/GroupAdd'
import PropTypes from 'prop-types'
import axios from 'axios'
import { statusCatch } from 'src/static/axiosCatch'
import { headerConfig } from 'src/static/axiosConfig'
import { GroupDetail } from './popup/GroupDetail'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

const SupportProductGroup = (props) => {
  const [isAddPopup, setIsAddPopup] = useState(false) // Add Popup
  const [isDetailPopup, setIsDetailPopup] = useState({
    use: false,
    id: '',
  }) // Detail Popup
  const tableTitle = [
    { label: '정렬' },
    { label: '구분' },
    { label: '기부 코드' },
    { label: '내용' },
    { label: '상품 아이디' },
    { label: '그룹 아이디' },
  ]
  const [list, setList] = useState(null)
  const [page, setPage] = useState(1)
  const [type, setType] = useState('all')
  const [statusType, setStatusType] = useState('1')
  const [pages, setPages] = useState(1)
  const one = 1
  const [role, setRole] = useState('')

  useEffect(() => {
    getList({ page: 1 })
    setPage(1)
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
      params.status = statusType
    }
    if (params.type === undefined) {
      params.type = type
    }
    const queries = []

    if (type !== 'all') {
      queries.push(`type=${params.type}`)
    }
    queries.push(`status=${params.status}`)

    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)

    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios
      .get(`/api/fan/support/group/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => list.push(value))
      setList([...list])
    } else {
      setList(res.data.value.items)
    }
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CNav variant="tabs" className="mt-2 nav-custom">
            <CNavItem className="nav-custom__column">
              <CNavLink
                className="cursor custom-tab-color"
                onClick={() => props.history.push('/support/product')}
              >
                전체 상품관리
              </CNavLink>
            </CNavItem>
            <CNavItem className="nav-custom__column">
              <CNavLink
                active
                className="cursor custom-tab-color-main"
                onClick={() => props.history.push('/support/product/group')}
              >
                전체 그룹 관리
              </CNavLink>
            </CNavItem>
            <CNavItem className="nav-custom__column">
              <CNavLink
                className="cursor custom-tab-color"
                onClick={() => props.history.push('/support/product/ad')}
              >
                광고 상품 관리
              </CNavLink>
            </CNavItem>
            <CNavItem className="nav-custom__column">
              <CNavLink
                className="cursor custom-tab-color"
                onClick={() => props.history.push('/support/product/donation')}
              >
                기부 상품 관리
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CCol className="d-flex flex-row align-items-center">
              <CFormSelect
                size="lg"
                style={{ width: '130px' }}
                aria-label="Large select example"
                className="select-group__select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="all">전체</option>
                <option value="1">광고</option>
                <option value="2">기부</option>
              </CFormSelect>
              <CFormSelect
                size="lg"
                style={{ width: '130px' }}
                aria-label="Large select example"
                className="mx-2 select-group__select"
                value={statusType}
                onChange={(e) => setStatusType(e.target.value)}
              >
                <option value="1">정상</option>
                <option value="0">비활성</option>
                <option value="-1">삭제</option>
              </CFormSelect>
              <CButton
                onClick={() => {
                  getList({ page: 1 })
                  setPage(1)
                }}
                type="button"
                color="primary"
                variant="outline"
                id="basic-addon1"
              >
                <CIcon icon={cilSearch} size="lg" /> 조회
              </CButton>
            </CCol>
            {role !== one && (
              <div className="button-group mt-5">
                <CButton
                  color="success"
                  size="sm"
                  className="button-group__bt"
                  onClick={() => setIsAddPopup(true)}
                >
                  그룹등록
                </CButton>
              </div>
            )}
            <CTable bordered className="mt-3 table-text-center">
              <CTableHead>
                <CTableRow>
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
                    let content = ''
                    if (value.type === 1) {
                      if (value.place_id === 1) {
                        content = '지하철'
                      } else if (value.place_id === 2) {
                        content = '옥외광고'
                      } else if (value.place_id === 3) {
                        content = '기타광고'
                      }
                    } else if (value.type === 2) {
                      if (value.place_id === 1) {
                        content = '기부물품A'
                      } else if (value.place_id === 2) {
                        content = '기부물품B'
                      } else if (value.place_id === 3) {
                        content = '기부물품C'
                      }
                    }
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell>
                          {value.status === 1 ? '정상' : value.status === 0 ? '비활성' : '삭제'}
                        </CTableHeaderCell>
                        <CTableDataCell>{value.type === 1 ? '광고' : '기부'}</CTableDataCell>
                        <CTableDataCell>{value.type === 1 ? '' : value.code_group}</CTableDataCell>
                        <CTableDataCell
                          onClick={() =>
                            setIsDetailPopup({
                              use: true,
                              id: value.id,
                            })
                          }
                        >
                          <span className="style-color-blue cursor">{content}</span>
                        </CTableDataCell>
                        <CTableDataCell>
                          {value.product
                            .slice(0)
                            .reverse()
                            .map((e, i) => {
                              return <span key={i}>{e.id} </span>
                            })}
                        </CTableDataCell>
                        <CTableDataCell>{value.id}</CTableDataCell>
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
      {isAddPopup && <GroupAdd onClickClose={() => setIsAddPopup(false)} />}
      {isDetailPopup.use && (
        <GroupDetail
          onClickClose={() =>
            setIsDetailPopup({
              use: false,
              id: '',
            })
          }
          onId={isDetailPopup.id}
        />
      )}
    </CRow>
  )
}

SupportProductGroup.propTypes = {
  history: PropTypes.object,
}

export default SupportProductGroup
