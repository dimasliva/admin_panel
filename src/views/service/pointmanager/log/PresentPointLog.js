import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
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
import GiveSmallPoint from './popup/GiveSmallPoint'
import { UserDetail } from '../../../member/popup/UserDetail'
import axios from 'axios'
import { headerConfig, headerFileConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import moment from 'moment'
import { CheckPopup } from '../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../components/publicPopup/NormalPopup'
import { PresentUserDetail } from './popup/PresentUserDetail'

const PresentPointLog = () => {
  // useState
  const [activeKey, setActiveKey] = useState(1)
  const [isCreate, setIsCreate] = useState(false)
  const [isOkCheck, setIsOkCheck] = useState(false)
  const [excelFile, setExcelFile] = useState({})
  const [isGiveSmallPoint, setIsGiveSmallPoint] = useState(false)
  const [isPresentUserDetail, setIsPresentUserDetail] = useState({
    use: false,
    id: '',
  })
  //Table title
  const tableLog = [
    { label: '지급자' },
    { label: '지급사유​' },
    { label: '지급내용​' },
    { label: '사용자 정보​' },
    { label: '지급일​' },
  ]
  const tableExel = [
    { label: '캐시포인트 수' },
    { label: '하트1포인트 수' },
    { label: '하트2포인트 수' },
    { label: '스타포인트 수​' },
    { label: '팬픽포인트 수' },
    { label: '경험치 수' },
    { label: '무료랜덤박스 이용권 수' },
    { label: '유료랜덤박스 이용횟수' },
  ]
  // list Tab1 pagrams
  const [listTab1, setListTab1] = useState(null)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [isUserDetail, setIsUserDetail] = useState({
    use: false,
    id: '',
  })
  const one = 1
  const [role, setRole] = useState('')
  useEffect(() => {
    if (activeKey === 1) {
      getList()
    }
  }, [])

  const closeModalEvent = () => {
    setIsOkCheck(false)
  }
  const modalOkEvent = (value) => {
    if (value) {
      setIsCreate(false)
      // create()
    } else {
      setIsCreate(false)
    }
  }
  // active key === 1
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
    const queries = []
    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)

    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/point/operation/grid${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => listTab1.push(value))
      setListTab1([...listTab1])
    } else {
      setListTab1(res.data.value.items)
    }
  }
  // active key === 2
  const importExcel = async () => {
    const formData = new FormData()
    formData.set('file', excelFile)
    const res = await axios
      .post(`/upload/csv`, formData, headerFileConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) {
      alert('등록에 실패했습니다.')
    } else {
      setIsOkCheck(true)
    }
  }
  const onCloseEvent = () => {
    setIsGiveSmallPoint(false)
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
                포인트지급
              </CNavLink>
            </CNavItem>
            {role !== one && (
              <CNavItem>
                <CNavLink
                  className="cursor custom-tab-color-main"
                  active={activeKey === 2}
                  onClick={() => setActiveKey(2)}
                >
                  대량지급 (엑셀)
                </CNavLink>
              </CNavItem>
            )}
          </CNav>
          <CCardBody>
            <CTabContent>
              <CTabPane role="tabpanel" visible={activeKey === 1}>
                <CRow className="g-3">
                  <CCol>
                    {role !== one && (
                      <CCol className="float-end mb-2">
                        <div className="d-flex flex-row">
                          <CButton
                            onClick={() => {
                              setIsGiveSmallPoint(true)
                            }}
                            style={{ color: 'white' }}
                            type="button"
                            color="info"
                            id="basic-addon1"
                          >
                            포인트 지급​
                          </CButton>
                        </div>
                      </CCol>
                    )}
                    {/*Table*/}
                    <CCol>
                      <CTable bordered>
                        <CTableHead>
                          <CTableRow>
                            {tableLog.map((title, index) => {
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
                              let pointType
                              switch (value.type) {
                                case 1:
                                  pointType = '하트포인트 1'
                                  break
                                case 2:
                                  pointType = '하트포인트 2'
                                  break
                                case 3:
                                  pointType = '스타포인트'
                                  break
                                case 4:
                                  pointType = '팬픽포인트'
                                  break
                                case 5:
                                  pointType = '캐시포인트'
                                  break
                                case 6:
                                  pointType = '경험치'
                                  break
                                case 7:
                                  pointType = '무료랜덤박스 이용권'
                                  break
                                case 8:
                                  pointType = '유료랜덤박스 이용권'
                                  break
                                default:
                                  pointType = '포인트 소량 지급'
                              }
                              return (
                                <CTableRow key={index}>
                                  <CTableDataCell
                                    scope="row"
                                    className="text-break"
                                    onClick={() => console.log(value)}
                                  >
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <span>{value.manager_login}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-break">
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <span>{value.description}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-break">
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <span>
                                        {pointType} ({value.count})
                                      </span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-break">
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <span
                                        onClick={() => {
                                          setIsPresentUserDetail({
                                            use: true,
                                            id: value.id,
                                          })
                                        }}
                                        style={{ color: 'blue', cursor: 'pointer' }}
                                      >
                                        {value.count_success} 명
                                      </span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-break">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                      <span>{created.date}</span>
                                      <span>{created.time}​</span>
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
                      {page !== pages && (
                        <CButton
                          color="dark"
                          size="sm"
                          className="moreBt"
                          onClick={() => {
                            setPage(page + 1)
                            getList({
                              page: page + 1,
                            })
                          }}
                        >
                          더보기​
                        </CButton>
                      )}
                    </CCol>
                  </CCol>
                </CRow>
              </CTabPane>
              <CTabPane role="tabpanel" visible={activeKey === 2}>
                <CCol className="mb-2">
                  <div className="d-flex flex-row">
                    <CInputGroup style={{ width: '400px' }}>
                      <CFormInput
                        type="file"
                        onChange={(e) => {
                          setExcelFile(e.target.files[0])
                        }}
                      />
                      <CButton
                        onClick={() => importExcel()}
                        style={{ color: 'white' }}
                        type="button"
                        color="info"
                        id="basic-addon1"
                      >
                        지급하기
                      </CButton>
                    </CInputGroup>
                  </div>
                  {/*<CTable bordered className="mt-4">*/}
                  {/*  <CTableHead>*/}
                  {/*    <CTableRow>*/}
                  {/*      {tableExel.map((title, index) => {*/}
                  {/*        return (*/}
                  {/*          <CTableHeaderCell*/}
                  {/*            className="text-center border-1"*/}
                  {/*            scope="col"*/}
                  {/*            key={index}*/}
                  {/*          >*/}
                  {/*            {title.label}*/}
                  {/*          </CTableHeaderCell>*/}
                  {/*        )*/}
                  {/*      })}*/}
                  {/*    </CTableRow>*/}
                  {/*  </CTableHead>*/}
                  {/*  <CTableBody>*/}
                  {/*    <CTableRow>*/}
                  {/*      <CTableDataCell className="text-break">test</CTableDataCell>*/}
                  {/*      <CTableDataCell className="text-break">test</CTableDataCell>*/}
                  {/*      <CTableDataCell className="text-break">test</CTableDataCell>*/}
                  {/*      <CTableDataCell className="text-break">test</CTableDataCell>*/}
                  {/*      <CTableDataCell className="text-break">test</CTableDataCell>*/}
                  {/*      <CTableDataCell className="text-break">test</CTableDataCell>*/}
                  {/*      <CTableDataCell className="text-break">test</CTableDataCell>*/}
                  {/*      <CTableDataCell className="text-break">test</CTableDataCell>*/}
                  {/*    </CTableRow>*/}
                  {/*  </CTableBody>*/}
                  {/*</CTable>*/}
                </CCol>
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
      {isCreate && role !== one && (
        <CheckPopup
          onClickClose={() => setIsCreate(false)}
          bodyContent={'포인트를 지급하시겠습니까?'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'등록이 완료되었습니다.'}
        />
      )}
      {isGiveSmallPoint && role !== one && (
        <GiveSmallPoint
          onClickClose={() => setIsGiveSmallPoint(false)}
          onCloseOkEvent={() => onCloseEvent()}
        />
      )}
      {isUserDetail.use && (
        <UserDetail
          onClickClose={() => setIsUserDetail({ use: false, id: '' })}
          onId={isUserDetail.id}
        />
      )}
      {/* unused */}
      {isPresentUserDetail.use && (
        <PresentUserDetail
          onId={isPresentUserDetail.id}
          onClickClose={() => setIsPresentUserDetail({ use: false, id: '' })}
        />
      )}
    </CRow>
  )
}
PresentPointLog.propTypes = {
  history: PropTypes.object,
}

export default PresentPointLog
