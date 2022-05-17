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
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CImage,
} from '@coreui/react'
import { ProductDetail } from './popup/ProductDetail'
import { ProductAdd } from './popup/ProductAdd'
import { ImgBig } from 'src/components/publicPopup/ImgBig'
import PropTypes from 'prop-types'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'
import moment from 'moment'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

const SupportProduct = (props) => {
  const [isAddPopup, setIsAddPopup] = useState(false) // Add Popup
  const [isDetailPopup, setIsDetailPopup] = useState({
    use: false,
    id: '',
  }) // Detail Popup
  const [imgPopup, setImgPopup] = useState({
    use: false,
    img: '',
  }) // img Popup
  const tableTitle = [
    { label: '정렬' },
    { label: '구분' },
    { label: '이미지' },
    { label: '상품내용' },
    { label: '목표' },
    { label: '등록일' },
    { label: '상품아이디' },
  ]
  const [list, setList] = useState(null)
  const [page, setPage] = useState(1)
  const [type, setType] = useState('3')
  const [statusType, setStatusType] = useState('1')
  const [pages, setPages] = useState(1)
  const [role, setRole] = useState('')
  const one = 1
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
    const queries = []

    if (params.page === undefined) {
      params.page = page
    }

    if (params.limit === undefined) {
      params.limit = 30
    }

    if (type !== '3') {
      queries.push(`type=${type}`)
    }
    queries.push(`status=${statusType}`)

    queries.push(`page=${params.page}`)
    queries.push(`limit=${params.limit}`)

    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios
      .get(`/api/fan/support/product/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return

    if (params.new) {
      setPages(page)
    } else {
      setPages(res.data.value.pages ? res.data.value.pages : 1)
    }

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
                active
                className="cursor custom-tab-color-main"
                onClick={() => props.history.push('/support/product')}
              >
                전체 상품관리
              </CNavLink>
            </CNavItem>
            <CNavItem className="nav-custom__column">
              <CNavLink
                className="cursor custom-tab-color"
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
            <CCol sm={12} className="d-flex flex-row align-items-center">
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="select-group__select"
                style={{ width: '130px' }}
                value={type}
                onChange={(e) => {
                  setType(e.target.value)
                }}
              >
                <option value="3">전체</option>
                <option value="1">광고</option>
                <option value="2">기부</option>
              </CFormSelect>
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="mx-2 select-group__select"
                style={{ width: '130px' }}
                value={statusType}
                onChange={(e) => {
                  setStatusType(e.target.value)
                }}
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
                  상품등록
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
                    console.log(value)
                    return (
                      <CTableRow key={index}>
                        <CTableDataCell>
                          {value.status === 1 ? '정상' : value.status === 0 ? '비활성' : '삭제'}
                        </CTableDataCell>
                        <CTableDataCell>{value.type === 1 ? '광고' : '기부'}</CTableDataCell>
                        <CTableDataCell className="recImg">
                          <CImage
                            src={process.env.REACT_APP_IMG + value.img_product}
                            alt=""
                            style={{ width: '40px', height: '40px' }}
                            className="cursor"
                            onClick={() =>
                              setImgPopup({
                                use: true,
                                img: process.env.REACT_APP_IMG + value.img_product,
                              })
                            }
                            onError={(e) => (e.target.src = '/icon.png')}
                          />
                        </CTableDataCell>
                        <CTableDataCell style={{ width: '30%' }}>
                          <div className="d-flex flex-column align-items-start">
                            <span
                              onClick={() =>
                                setIsDetailPopup({
                                  use: true,
                                  id: value.id,
                                })
                              }
                              className="style-color-blue cursor"
                            >
                              {value.name_product.ko}
                            </span>
                            <span>{value.about_product.ko}</span>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>{value.target_point}</CTableDataCell>
                        <CTableDataCell>
                          {moment(value.updated_at).format('YYYY-MM-DD')}
                          <br />
                          {moment(value.updated_at).format('HH:mm:ss')}
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
      {isDetailPopup.use && (
        <ProductDetail
          onClickClose={() =>
            setIsDetailPopup({
              use: false,
            })
          }
          onId={isDetailPopup.id}
          onChekced={() => {
            getList({ page: 1, limit: 30 * page, new: true })
            setIsDetailPopup({
              use: false,
            })
          }}
        />
      )}
      {isAddPopup && (
        <ProductAdd
          onClickClose={() => setIsAddPopup(false)}
          onChekced={() => {
            getList({ page: 1, limit: 30 * page, new: true })
            setIsAddPopup(false)
          }}
        />
      )}
      {imgPopup.use && (
        <ImgBig
          onClickClose={() =>
            setImgPopup({
              use: false,
              img: '',
            })
          }
          onImg={imgPopup.img}
        />
      )}
    </CRow>
  )
}

SupportProduct.propTypes = {
  history: PropTypes.object,
}

export default SupportProduct
