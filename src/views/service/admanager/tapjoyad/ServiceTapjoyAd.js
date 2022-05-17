import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
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
import { ImgBig } from 'src/components/publicPopup/ImgBig'
import heart from './assets/new_heart.png'
const ServiceTapjoyAd = () => {
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  }) // img detail
  // useState
  const [activeKey, setActiveKey] = useState(1)
  //Table title
  const [isUserInfo, setIsUserInfo] = useState(false) // Detail Popup
  const tableTapjoy = [
    { label: '지급일​' },
    { label: '타입​' },
    { label: '보상' },
    { label: '개수' },
    { label: '사용자 정보​' },
    { label: '​​플랫폼' },
    { label: '광고 ID' },
  ]
  const [listTab1, setListTab1] = useState(null)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [isCid, setCid] = useState('')
  useEffect(() => {
    if (activeKey === 1) getList()
  }, [])
  const getList = async (params) => {
    if (!params) {
      params = {}
    }

    if (params.page === undefined) {
      params.page = page
    }
    if (params.cid === undefined) {
      params.cid = isCid
    }

    const queries = []
    if (params.page) {
      if (params.page > 1) {
        queries.push(`page=1`)
        queries.push(`limit=${30 * params.page}`)
      } else {
        queries.push(`page=${params.page}`)
        queries.push(`limit=30`)
      }
    } else {
      queries.push(`page=${params.page}`)
      queries.push(`limit=30`)
    }
    queries.push(`type=1`)
    queries.push(`cid=${params.cid}`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios
      .get(`/api/user/ad/stat${queryStr}`, headerConfig)
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
      <CCol xs={12}>
        <CCard className="mb-4">
          <CNav variant="tabs" className="mt-2 nav-custom">
            <CNavItem>
              <CNavLink
                className="cursor custom-tab-color-main"
                active={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                탭조이 광고로그​
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CTabContent>
              <CTabPane role="tabpanel" visible={activeKey === 1}>
                <CCol sm={5}>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      onChange={(e) => {
                        setCid(e.target.value)
                      }}
                      className="text-center"
                      placeholder="CID를 입력하세요​"
                    />
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
                  </CInputGroup>
                </CCol>
                <CRow className="g-3">
                  <CCol>
                    {/*Table*/}
                    <CCol>
                      <CTable bordered>
                        <CTableHead>
                          <CTableRow>
                            {tableTapjoy.map((title, index) => {
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
                                  <CTableDataCell className="text-break" style={{ width: '100px' }}>
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                      <span> {created.date}</span>
                                      <span> {created.time}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-break">
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <span>오퍼월</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell
                                    className="border-1 text-break"
                                    style={{ width: '150px' }}
                                  >
                                    <div className="d-flex flex-row align-items-center justify-content-start">
                                      <CImage
                                        style={{
                                          borderRadius: '50%',
                                          width: '50px',
                                          height: '50px',
                                          marginRight: '10px',
                                        }}
                                        src={heart}
                                      />
                                      <span>하트2</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell scope="row" className="text-break">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                      <span>{value.award_point}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell
                                    className="text-break cursor"
                                    style={{ width: '150px' }}
                                  >
                                    <div className="d-flex flex-row align-items-center justify-content-start">
                                      <CImage
                                        style={{
                                          borderRadius: '50%',
                                          width: '50px',
                                          height: '50px',
                                          marginRight: '10px',
                                        }}
                                        src={process.env.REACT_APP_IMG + value.avatar}
                                        onClick={() =>
                                          setIsImg({
                                            use: true,
                                            img:
                                              value.avatar !== '' || value.avatar !== null
                                                ? process.env.REACT_APP_IMG + value.avatar
                                                : '',
                                          })
                                        }
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
                                  </CTableDataCell>
                                  <CTableDataCell scope="row" className="text-break">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                      <span>{value.device.platform}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell scope="row" className="text-break">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                      <span>
                                        <span key={index}>{value.ad_token.tapjoy}</span>​
                                      </span>
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
      {isUserInfo.use && (
        <UserDetail
          onClickClose={() => setIsUserInfo({ use: false, id: '' })}
          onId={isUserInfo.id}
          onCloseOkEvent={() => {
            setIsUserInfo({ use: false, id: '' })
            getList({ page: 1 })
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
ServiceTapjoyAd.propTypes = {
  history: PropTypes.object,
}

export default ServiceTapjoyAd
