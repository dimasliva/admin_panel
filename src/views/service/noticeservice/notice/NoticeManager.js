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
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import moment from 'moment'
import NoticeDetail from './popup/NoticeDetail'
import CreateNotice from './popup/CreateNotice'
import { ImgBig } from '../../../../components/publicPopup/ImgBig'

const NoticeManager = () => {
  // useState
  const [activeKey, setActiveKey] = useState(1)
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  })
  const [isBannerDetail, setIsBannerDetail] = useState({ use: false, id: '' }) // Detail Popup
  const [isCreateBanner, setIsCreateBanner] = useState({ use: false }) // Detail Popup
  //Table title
  const tableManager = [
    { label: '상태' },
    { label: '타입' },
    { label: '이미지' },
    { label: '공지사항 제목' },
    { label: '공지 아이디' },
    { label: '등록일시' },
    { label: '게시일시' },
  ]
  const [isStatus, setStatus] = useState('all')
  // list Tab1 pagrams
  const [listTab1, setListTab1] = useState(null)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const one = 1
  const [role, setRole] = useState('')
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
    if (params.status === undefined) {
      params.status = isStatus
    }

    const queries = []

    if (params.page === 1) {
      queries.push(`page=1`)
      queries.push(`limit=${30 * params.page}`)
    } else {
      queries.push(`page=${params.page}`)
      queries.push(`limit=30`)
    }
    if (params.status !== 'all') {
      queries.push(`status=${params.status}`)
    }
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/notice/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    console.log(res.data.value)
    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => listTab1.push(value))
      setListTab1([...listTab1])
    } else {
      setListTab1(res.data.value.items)
    }
  }
  // create success event
  const endEvent = () => {
    setIsCreateBanner({
      use: false,
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
                공지사항 관리
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CTabContent>
              <CTabPane role="tabpanel" visible={activeKey === 1}>
                <CCol sm={12} className="d-flex flex-row align-items-center mb-2">
                  <CFormSelect
                    size="lg"
                    aria-label="Large select example"
                    style={{ width: '150px' }}
                    className="search-bar__select me-2 text-center"
                    onChange={(e) => {
                      setStatus(e.target.value)
                    }}
                  >
                    <option value="all">전체</option>
                    <option value="1">진행중</option>
                    <option value="0">비활성</option>
                    <option value="-1">삭제</option>
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
                    {role !== one && (
                      <CCol className="float-end mb-2">
                        <div className="d-flex flex-row">
                          <CButton
                            onClick={() => {
                              setIsCreateBanner({ use: true })
                            }}
                            style={{ color: 'white' }}
                            type="button"
                            color="info"
                            id="basic-addon1"
                          >
                            공지사항 등록​
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
                              return (
                                <CTableRow key={index}>
                                  <CTableDataCell>
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <span>
                                        {value.status === 1
                                          ? '진행중'
                                          : value.status === 0
                                          ? '비활성'
                                          : '삭제'}
                                      </span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <span>
                                        {value.type === 1
                                          ? '일반'
                                          : value.type === 2
                                          ? '이벤트'
                                          : '기타'}
                                      </span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell
                                    style={{ width: '10%' }}
                                    onClick={() => {
                                      setIsImg({
                                        use: true,
                                        img:
                                          value.img_totice !== '' && value.img_totice !== null
                                            ? process.env.REACT_APP_IMG + value.img_totice.ko
                                            : '',
                                      })
                                    }}
                                  >
                                    <div className="d-flex flex-row justify-content-center">
                                      <CImage
                                        style={{
                                          width: '70px',
                                          objectFit: 'cover',
                                          cursor: 'pointer',
                                        }}
                                        src={
                                          value.img_totice.ko !== ''
                                            ? process.env.REACT_APP_IMG + value.img_totice.ko
                                            : value.img_totice.en !== ''
                                            ? process.env.REACT_APP_IMG + value.img_totice.en
                                            : value.img_totice.ch !== ''
                                            ? process.env.REACT_APP_IMG + value.img_totice.ch
                                            : value.img_totice.jp !== ''
                                            ? process.env.REACT_APP_IMG + value.img_totice.es
                                            : value.img_totice.es !== ''
                                            ? typeof value.img_totice === 'string'
                                            : process.env.REACT_APP_IMG + value.img_totice
                                        }
                                        alt=""
                                        onError={(e) => (e.target.src = '/icon.png')}
                                      />
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <span
                                        onClick={() => {
                                          setIsBannerDetail({ use: true, id: value.id })
                                        }}
                                        style={{ color: 'blue', cursor: 'pointer' }}
                                      >
                                        {value.title_notice.ko !== ''
                                          ? value.title_notice.ko
                                          : value.title_notice.en !== ''
                                          ? value.title_notice.en
                                          : value.title_notice.ch !== ''
                                          ? value.title_notice.ch
                                          : value.title_notice.jp !== ''
                                          ? value.title_notice.es
                                          : value.title_notice.es !== ''}
                                      </span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <span>{value.id}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell scope="row">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                      <span>{created.date}</span>
                                      <span>{created.time}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell scope="row">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                      <span>{moment(value.started_at).format('YYYY-MM-DD')}</span>
                                      <span>{moment(value.started_at).format('HH:mm:ss')}</span>
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
      {isCreateBanner.use && role !== one && (
        <CreateNotice
          onClickClose={() => setIsCreateBanner({ use: false })}
          onEndEvent={() => endEvent()}
        />
      )}
      {isBannerDetail.use && (
        <NoticeDetail
          onClickClose={() => setIsBannerDetail({ use: false, id: '' })}
          onId={isBannerDetail.id}
          onCloseOkEvent={() => {
            setIsBannerDetail({ use: false, id: '' })
            getList({ page: 1 })
            setPage(1)
          }}
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
NoticeManager.propTypes = {
  history: PropTypes.object,
}

export default NoticeManager
