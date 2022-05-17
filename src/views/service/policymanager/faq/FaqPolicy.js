import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormSelect,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTabPane,
} from '@coreui/react'
import CreateFaqPolicy from './popup/CreateFaqPolicy'
import FaqPolicyDetail from './popup/FaqPolicyDetail'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import moment from 'moment'
import PaginationFaq from './Pagination/PaginationFaq'
import PostsFaq from './Pagination/PostsFaq'

const FaqPolicy = () => {
  // useState
  const [activeKey, setActiveKey] = useState(1)
  const [isCreateFaqPolicy, setIsCreateFaqPolicy] = useState(false) // Detail Popup
  const [faqVersion, setFaqVersion] = useState({
    service_id: '',
    sign: '',
    version: '',
    setting: [
      {
        id: '',
        answer: {
          ch: '',
          en: '',
          es: '',
          jp: '',
          ko: '',
        },
        status: '',
        priority: '',
        question: {
          ch: '',
          en: '',
          es: '',
          jp: '',
          ko: '',
        },
      },
    ],
    created_at: '',
    updated_at: '',
    action: {
      manager_id: '',
      login: '',
      last_name: '',
      first_name: '',
    },
  })
  //Table title
  const tablePolicy = [
    { label: '순서' },
    { label: '상태​' },
    { label: '질문(FAQ)​​​' },
    { label: '등록일시​​' },
  ]
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('1')
  const [pages, setPages] = useState(1)
  const one = 3
  const [role, setRole] = useState('')
  useEffect(() => {
    getFaq()
  }, [])
  // List
  const getFaq = async (params) => {
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
    if (params.status === undefined) {
      params.status = status
    }
    if (params.page === 1) {
      queries.push(`page=1`)
      queries.push(`limit=${30 * params.page}`)
    } else {
      queries.push(`page=${params.page}`)
      queries.push(`limit=30`)
    }
    queries.push(`status=${params.status}`)
    queries.push(`priority=1`)
    console.log(queries)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/setting/faq${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    console.log(res.data.value)
    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.setting.map((value) => list.push(value))
      setList([...list])
      return
    }
    setList(res.data.value.setting)
    setFaqVersion(res.data.value)
  }
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(30)

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
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
                자주묻는 질문 관리​
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CCol className="mb-4">
              <div>version.{faqVersion.version}</div>
              <div className="d-flex flex-row">
                <span> {moment(faqVersion.updated_at).format('YYYY-MM-DD HH:mm:ss')}에</span>
                <span className="text-info">
                  {faqVersion.action.first_name} {faqVersion.action.last_name}
                </span>
                <span>이 마지막 정책 수정​</span>
              </div>
            </CCol>
            <CTabContent>
              <CTabPane role="tabpanel" visible={activeKey === 1}>
                <CCol sm={4} className="d-flex flex-row align-items-center mb-2">
                  <CFormSelect
                    size="lg"
                    style={{ width: '130px' }}
                    aria-label="Large select example"
                    className="search-bar__select me-2"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="1">정상​</option>
                    <option value="0">비활성​</option>
                    <option value="-1">삭제​</option>
                  </CFormSelect>
                  <CButton
                    type="button"
                    style={{ color: 'white' }}
                    color="info"
                    id="basic-addon1"
                    onClick={() => {
                      getFaq({ page: 1 })
                      setPage(1)
                    }}
                  >
                    조회​
                  </CButton>
                </CCol>
                <CRow className="g-3">
                  <CCol>
                    {role === one && (
                      <CCol className="float-end mb-2">
                        <div className="d-flex flex-row">
                          <CButton
                            onClick={() => {
                              setIsCreateFaqPolicy(true)
                            }}
                            style={{ color: 'white' }}
                            type="button"
                            color="info"
                            id="basic-addon1"
                          >
                            새로운 질문 등록​
                          </CButton>
                        </div>
                      </CCol>
                    )}
                    {/*Table*/}
                    <CCol>
                      <CTable bordered>
                        <CTableHead>
                          <CTableRow>
                            {tablePolicy.map((title, index) => {
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
                        <PostsFaq posts={currentPosts} loading={loading} getFaq={() => getFaq()} />
                      </CTable>
                      <PaginationFaq
                        postsPerPage={postsPerPage}
                        totalPosts={list.length}
                        paginate={paginate}
                      />
                      {page !== pages && (
                        <CButton
                          color="dark"
                          size="sm"
                          className="moreBt"
                          onClick={() => {
                            getFaq({
                              page: page + 1,
                            })
                            setPage(page + 1)
                          }}
                        >
                          더보기
                        </CButton>
                      )}
                    </CCol>
                  </CCol>
                </CRow>
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
      {isCreateFaqPolicy && role === one && (
        <CreateFaqPolicy
          onCloseOkEvent={() => {
            getFaq()
            setIsCreateFaqPolicy(false)
          }}
          onClickClose={() => setIsCreateFaqPolicy(false)}
        />
      )}
    </CRow>
  )
}
FaqPolicy.propTypes = {
  history: PropTypes.object,
}

export default FaqPolicy
