import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
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
  CFormCheck,
  CImage,
} from '@coreui/react'
import { CheckPopup } from 'src/components/publicPopup/CheckPopup'
import { NormalPopup } from 'src/components/publicPopup/NormalPopup'
import { ArtistReportDetail } from './popup/ArtistReportDetail'
import { UserDetail } from '../member/popup/UserDetail'
import PropTypes from 'prop-types'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'
import moment from 'moment'
import { ImgBig } from '../../components/publicPopup/ImgBig'

const ArtistCommentReport = (props) => {
  const one = 1
  const [role, setRole] = useState('')
  const [isReportModal, setIsReportModal] = useState({
    use: false,
    id: '',
  }) // Detail Popup
  const [isModal, setIsModal] = useState(false) // delete check Modal
  const [isModal2, setIsModal2] = useState(false) // delete check Modal
  const [userInfo, setUserInfo] = useState({
    use: false,
    id: '',
  })
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  })
  const [deleteId, setDeleteId] = useState('') // delete ids
  let tableTitle
  {
    role !== one
      ? (tableTitle = [
          { label: '선택' },
          { label: '타입' },
          { label: '아티스트 코드' },
          { label: '신고대상자' },
          { label: '내용' },
          { label: '신고수' },
          { label: '게시일자' },
          { label: '처리' },
        ])
      : (tableTitle = [
          { label: '선택' },
          { label: '타입' },
          { label: '아티스트 코드' },
          { label: '신고대상자' },
          { label: '내용' },
          { label: '신고수' },
          { label: '게시일자' },
        ])
  }
  const [isOkCheck, setIsOkCheck] = useState(false)
  const [isOkCheck2, setIsOkCheck2] = useState(false)
  const [list, setList] = useState(null)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [reportCount, setReportCount] = useState(null)
  const [allCheckedList, setAllCheckedList] = useState(false)

  useEffect(() => {
    getList()
  }, [])

  // getList
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
    queries.push(`status=1`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios
      .get(`/api/artist/reply/report${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setReportCount(res.data.value.count)
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    const data = []
    // eslint-disable-next-line array-callback-return
    res.data.value.items.map((value) => {
      data.push({
        ...value,
        checked: false,
      })
    })
    if (params.page > 1) {
      res.data.value.items.map((value) =>
        list.push({
          ...value,
          checked: false,
        }),
      )
      setList([...list])
      return
    }
    setList(data)
  }

  // All checked button event
  const allChecked = (bool) => {
    if (bool) {
      list.map((value) => (value.checked = true))
      setList([...list])
    } else {
      list.map((value) => (value.checked = false))
      setList([...list])
    }
  }

  // All checked delete event
  const allDelete = async () => {
    const data = []
    list.map((value) => {
      if (value.checked) {
        data.push(value.reply_id)
      }
    })
    if (data.length === 0) {
      setIsModal(false)
      alert('삭제할 항목이 선택되지 않았습니다.')
    }
    const deleteData = {
      reply_id_arr: data,
      status: -1,
    }

    const res = await axios
      .put(`/api/artist/reply`, deleteData, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) {
      alert('삭제에 실패했습니다.')
    } else {
      setIsOkCheck(true)
    }
  }

  // delete one event
  const deleteList = async () => {
    const data = {
      reply_id_arr: deleteId.reply_id,
      status: -1,
    }

    const res = await axios
      .put(`/api/artist/reply`, data, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) {
      alert('삭제에 실패했습니다.')
    } else {
      setIsOkCheck(true)
    }
  }

  // process Button event
  const processEvent = async (value) => {
    const data = {
      reply_id_arr: value,
      status: 1,
    }

    const res = await axios
      .put(`/api/artist/reply/report`, data, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) {
      alert('삭제에 실패했습니다.')
    } else {
      setIsOkCheck2(true)
    }
  }
  // delete checked
  const modalOkEvent = (value) => {
    if (value) {
      setIsModal(false)
      deleteList()
    } else {
      setIsModal(false)
    }
  }

  const modalOkAllEvent = (value) => {
    if (value) {
      setIsModal2(false)
      allDelete()
    } else {
      setIsModal2(false)
    }
  }

  const closeModalEvent = () => {
    setIsOkCheck(false)
    setIsOkCheck2(false)
    getList({ page: 1 })
    setPage(1)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CNav variant="tabs" className="mt-2 nav-custom">
            <CNavItem className="nav-custom__column">
              <CNavLink
                className="cursor custom-tab-color"
                onClick={() => props.history.push('/artist/comment')}
              >
                아티스트 댓글 관리
              </CNavLink>
            </CNavItem>
            <CNavItem className="nav-custom__column ">
              <div className="relative-dom">
                <span>{reportCount}</span>
                <CNavLink
                  active
                  className="cursor custom-tab-color-main"
                  onClick={() => props.history.push('/artist/comment/report')}
                >
                  아티스트 댓글 신고
                </CNavLink>
              </div>
            </CNavItem>
          </CNav>
          <CCardBody>
            <div>
              <CCol sm={12} className="mb-3">
                <CButton
                  type="button"
                  color="info"
                  variant="outline"
                  id="basic-addon1"
                  onClick={() => {
                    getList({
                      page: 1,
                    })
                    setPage(1)
                  }}
                >
                  새로고침
                </CButton>
              </CCol>
              {role !== one && (
                <div style={{ display: 'flex', alignItems: 'flexStart' }}>
                  <CButton
                    type="button"
                    color="success"
                    variant="outline"
                    id="basic-addon1"
                    style={{ marginRight: '10px' }}
                    onClick={() => {
                      let isValue = ''
                      let isTrue = 0
                      let isFalse = 0
                      list.map((val) => {
                        if (val.checked === true) {
                          isTrue = isTrue + 1
                          isFalse = isFalse - 1
                        } else if (val.checked === false) {
                          isTrue = isTrue - 1
                          isFalse = isFalse + 1
                        }
                        if (isTrue >= isFalse || isTrue * -1 == isFalse) {
                          val.checked = true
                          setList([...list])
                        }
                        if (isTrue < isFalse || isFalse < 0) {
                          val.checked = false
                          setList([...list])
                        }
                        if (isTrue < 0 || isTrue === 0) {
                          val.checked = true
                          setList([...list])
                        }
                      })
                    }}
                  >
                    전체선택 ( 취소 )
                  </CButton>
                  <CButton
                    type="button"
                    color="danger"
                    variant="outline"
                    id="basic-addon1"
                    onClick={() => {
                      setIsModal2(true)
                    }}
                  >
                    삭제
                  </CButton>
                </div>
              )}
            </div>
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
                {list !== null ? (
                  list.map((value, index) => {
                    const writerAvatar = value.avatar
                    let img1 = ''
                    if (img1 !== null) img1 = process.env.REACT_APP_IMG + writerAvatar
                    const createdDay = {
                      day:
                        value.created_at !== null
                          ? moment(value.created_at).format('YYYY-MM-DD')
                          : '',
                      time:
                        value.created_at !== null
                          ? moment(value.created_at).format('HH:mm:ss')
                          : '',
                    }
                    return (
                      <CTableRow key={index}>
                        <CTableDataCell scope="row">
                          <CFormCheck
                            id="flexCheckDefault"
                            checked={value.checked}
                            onChange={(e) => {
                              value.checked = e.target.checked
                              setList([...list])
                            }}
                          />
                        </CTableDataCell>
                        <CTableDataCell scope="row" onClick={() => console.log(value)}>
                          {value.type && value.type === 1
                            ? '가수'
                            : value.type && value.type === 2
                            ? '배우'
                            : '기타'}
                        </CTableDataCell>
                        <CTableDataCell scope="row">{value.code_artist}</CTableDataCell>
                        <CTableDataCell
                          className="text-center"
                          // className="d-flex"
                          style={{ width: '16%' }}
                        >
                          <div>
                            <CImage
                              onClick={() =>
                                setIsImg({
                                  use: true,
                                  img: img1,
                                })
                              }
                              className="cursor"
                              style={{ width: '40px', height: '40px', marginRight: '10px' }}
                              src={img1}
                              alt=""
                              onError={(e) => (e.target.src = '/icon.png')}
                            />
                          </div>
                          <span
                            className="cursor text-info"
                            onClick={() => {
                              setUserInfo({
                                use: true,
                                id: value.user_id,
                              })
                            }}
                          >
                            {value.nickname && value.nickname.length > 9
                              ? value.nickname.substr(0, 9) + '...'
                              : value.nickname}
                          </span>
                        </CTableDataCell>
                        <CTableDataCell scope="row" style={{ width: '30%' }}>
                          {value.mess}
                        </CTableDataCell>
                        <CTableDataCell
                          scope="row"
                          onClick={() =>
                            setIsReportModal({
                              use: true,
                              id: value.reply_id,
                            })
                          }
                        >
                          <span className="style-color-blue cursor">{value.report_cnt}</span>
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          <div className="d-flex flex-column justify-content-center">
                            <span>{createdDay.day}</span>
                            <br />
                            <span>{createdDay.time}</span>
                          </div>
                        </CTableDataCell>
                        {role !== one && (
                          <CTableDataCell scope="row">
                            <div className="d-flex flex-row align-items-center justify-content-center">
                              <CButton
                                size="sm"
                                type="button"
                                color="danger"
                                id="basic-addon1"
                                style={{ marginRight: '10px', color: 'white' }}
                                onClick={() => {
                                  setIsModal(true)
                                  setDeleteId({
                                    reply_id: value.reply_id,
                                  })
                                }}
                              >
                                댓글 삭제
                              </CButton>
                              <CButton
                                size="sm"
                                type="button"
                                color="primary"
                                id="basic-addon2"
                                onClick={() => processEvent(value.reply_id)}
                              >
                                처리 완료
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
      {isModal && (
        <CheckPopup
          onClickClose={() => setIsModal(false)}
          bodyContent={'선택하신 댓글을 삭제 하시겠습니까?'}
          title={'삭제'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isModal2 && (
        <CheckPopup
          onClickClose={() => setIsModal2(false)}
          bodyContent={'선택하신 댓글을 삭제 하시겠습니까?'}
          title={'삭제'}
          onCheked={(value) => modalOkAllEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'댓글 삭제가 완료되었습니다.'}
        />
      )}
      {isOkCheck2 && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'댓글 처리가 완료되었습니다.'}
        />
      )}
      {isReportModal.use && (
        <ArtistReportDetail
          onClickClose={() => setIsReportModal({ use: false, id: '' })}
          onId={isReportModal.id}
        />
      )}
      {userInfo.use && (
        <UserDetail
          onClickClose={() =>
            setUserInfo({
              ...userInfo,
              use: false,
            })
          }
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
          onImg={isImg.img}
        />
      )}
    </CRow>
  )
}

ArtistCommentReport.propTypes = {
  history: PropTypes.object,
}

export default ArtistCommentReport
