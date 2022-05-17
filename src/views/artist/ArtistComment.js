import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CFormSelect,
  CFormInput,
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
  CInputGroup,
} from '@coreui/react'
import { cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CheckPopup } from 'src/components/publicPopup/CheckPopup'
import { NormalPopup } from 'src/components/publicPopup/NormalPopup'
import { UserDetail } from '../member/popup/UserDetail'
import { CalenderPopup } from 'src/components/publicPopup/CalenderPopup'
import PropTypes from 'prop-types'
import moment from 'moment'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'
import { ImgBig } from '../../components/publicPopup/ImgBig'

const ArtistComment = (props) => {
  const one = 1
  const [role, setRole] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [isOkCheck, setIsOkCheck] = useState(false)
  const [isCalen, setIsCalen] = useState(false)

  const [userInfo, setUserInfo] = useState({
    use: false,
    id: '',
  })

  const [deleteId, setDeleteId] = useState({
    artist_id: '',
    user_id: '',
    parent_id: '',
    mess: '',
    id: '',
  }) // delete Id
  let tableTitle
  {
    role !== one
      ? (tableTitle = [
          { label: '작성자' },
          { label: '댓글내용' },
          { label: '아티스트 대상' },
          { label: '작성일' },
          { label: '처리' },
        ])
      : (tableTitle = [
          { label: '작성자' },
          { label: '댓글내용' },
          { label: '아티스트 대상' },
          { label: '작성일' },
        ])
  }
  // search
  const [artistId, setArtistId] = useState('') // CID
  const [artistCode, setArtistCode] = useState('') // artist Code
  const [page, setPage] = useState(1) // page filter
  //reply List data
  const [list, setList] = useState(null)
  const [reportCount, setReportCount] = useState(null)

  // Calender
  const [startDay, setStartDay] = useState(moment().subtract(6, 'days'))
  const [endDay, setEndDay] = useState(moment())

  // count
  const [pages, setPages] = useState(1)
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  })

  useEffect(() => {
    getReportList()
    getList({ page: 1 })
    setPage(1)
  }, [])

  // search List
  const getList = async (event, params) => {
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
    if (artistCode !== '') {
      queries.push(`search_code=${artistCode}`)
    }
    if (artistId !== '') {
      queries.push(`search_cid=${artistId}`)
    }
    queries.push(`between_start_at=${startDay.format('YYYY-MM-DD')}`)
    queries.push(`between_end_at=${endDay.format('YYYY-MM-DD')} 23:59:59`)
    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)
    queries.push(`status=1`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/artist/reply${queryStr}`, headerConfig)
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

  // report count
  const getReportList = async () => {
    const res = await axios
      .get(`/api/artist/reply/report?status=1`, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) return
    setReportCount(res.data.value.count)
  }

  // Reply delete api
  const deleteReply = async () => {
    const data = {
      artist_id: deleteId.artist_id,
      user_id: deleteId.user_id,
      parent_id: deleteId.parent_id,
      mess: deleteId.mess,
      id: deleteId.id,
      status: -1,
    }
    const res = await axios
      .post(`/api/artist/reply`, data, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) {
      alert('삭제에 실패했습니다.')
    } else {
      setIsOkCheck(true)
    }
  }

  // delete checked
  const modalOkEvent = (value) => {
    if (value) {
      setIsModal(false)
      deleteReply()
    } else {
      setIsModal(false)
    }
  }

  const closeModalEvent = () => {
    setIsOkCheck(false)
    getList()
  }

  // Calender Modal value
  const calenderData = (start, end) => {
    setIsCalen(false)
    setStartDay(moment(start))
    setEndDay(moment(end))
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
                onClick={() => props.history.push('/artist/comment')}
              >
                아티스트 댓글 관리
              </CNavLink>
            </CNavItem>
            <CNavItem className="nav-custom__column ">
              <div className="relative-dom">
                <span>{reportCount}</span>
                <CNavLink
                  className="cursor custom-tab-color"
                  onClick={() => props.history.push('/artist/comment/report')}
                >
                  아티스트 댓글 신고
                </CNavLink>
              </div>
            </CNavItem>
          </CNav>
          <CCardBody>
            <div className="d-flex flex-row">
              <CCol sm={12} className="d-flex flex-row align-items-center">
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="mr-3 select-group__select"
                  style={{ width: '20%' }}
                  value={'new'}
                  onChange={(e) => {
                    if (e.target.value === '7day') {
                      setStartDay(moment().subtract(6, 'days'))
                      setEndDay(moment())
                    } else if (e.target.value === '30day') {
                      setStartDay(moment().subtract(29, 'days'))
                      setEndDay(moment())
                    } else if (e.target.value === 'nowMonth') {
                      setStartDay(moment().startOf('month'))
                      setEndDay(moment().endOf('month'))
                    } else if (e.target.value === 'preMonth') {
                      let nowDate = new Date()
                      nowDate = new Date(
                        nowDate.getFullYear(),
                        nowDate.getMonth() - 1,
                        nowDate.getDate(),
                      )
                      setStartDay(moment(nowDate).startOf('month'))
                      setEndDay(moment(nowDate).endOf('month'))
                    } else if (e.target.value === 'selectDay') {
                      setIsCalen(true)
                    }
                  }}
                >
                  <option value="new">
                    {startDay.format('YYYY-MM-DD')} ~ {endDay.format('YYYY-MM-DD')}
                  </option>
                  <option value="7day">최근 7일</option>
                  <option value="30day">최근 30일</option>
                  <option value="nowMonth">현재 월</option>
                  <option value="preMonth">전월</option>
                  <option value="selectDay">기간 지정</option>
                </CFormSelect>
                <CFormInput
                  size="lg"
                  className="mx-2"
                  style={{ width: '25%' }}
                  placeholder="작성자 CID를 입력하세요."
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={artistId}
                  // required
                  onChange={(e) => setArtistId(e.target.value)}
                />
                <CInputGroup style={{ width: '30%' }}>
                  <CFormInput
                    size="lg"
                    placeholder="아티스트 코드를 입력하세요."
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={artistCode}
                    onChange={(e) => setArtistCode(e.target.value)}
                  />
                  <CButton
                    size="lg"
                    type="submit"
                    color="primary"
                    variant="outline"
                    id="basic-addon1"
                    onClick={() => {
                      getList({ page: 1 })
                      setPage(1)
                    }}
                  >
                    <CIcon icon={cilSearch} size="lg" /> 조회
                  </CButton>
                </CInputGroup>
              </CCol>
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
                    if (writerAvatar !== null) img1 = process.env.REACT_APP_IMG + writerAvatar

                    const imgArtist = value.img_artist === null ? '' : value.img_artist.main
                    let img2 = ''
                    if (imgArtist !== null) img2 = process.env.REACT_APP_IMG + imgArtist
                    // day
                    const craetedDay = {
                      day: moment(value.created_at).format('YYYY-MM-DD'),
                      time: moment(value.created_at).format('HH:mm:ss'),
                    }
                    return (
                      <CTableRow key={index}>
                        <CTableDataCell style={{ width: '16%' }}>
                          <div className="d-flex flex-column align-items-center">
                            <CImage
                              onClick={() =>
                                setIsImg({
                                  use: true,
                                  img: img1,
                                })
                              }
                              style={{ width: '40px', height: '40px' }}
                              src={img1}
                              alt=""
                              className="cursor"
                              onError={(e) => (e.target.src = '/icon.png')}
                            />
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
                          </div>
                        </CTableDataCell>
                        <CTableDataCell scope="row" style={{ width: '30%' }}>
                          {value.mess}
                        </CTableDataCell>
                        <CTableDataCell scope="row" className="artist-img-dom">
                          <div className="d-flex align-items-center justify-content-center">
                            <div
                              className="artist-img-dom__img-border d-flex align-items-center"
                              style={{ borderRadius: 'inherit' }}
                            >
                              <CImage
                                className="artist-img-dom__img-border__profile cursor"
                                src={img2}
                                onClick={() =>
                                  setIsImg({
                                    use: true,
                                    img: img2,
                                  })
                                }
                                alt=""
                                onError={(e) => (e.target.src = '/icon.png')}
                              />
                            </div>
                            <div>
                              <span>{value.name_artist === null ? '' : value.name_artist.ko}</span>
                              <br />
                              <span>{value.code_artist}</span>
                            </div>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          <div className="d-flex flex-column align-items-center">
                            <span>{craetedDay.day}</span>
                            <span>{craetedDay.time}</span>
                          </div>
                        </CTableDataCell>
                        {role !== one && (
                          <CTableDataCell scope="row">
                            <CButton
                              type="button"
                              color="danger"
                              style={{ color: 'white' }}
                              className="text-nowrap"
                              id="basic-addon1"
                              onClick={() => {
                                setIsModal(true)
                                setDeleteId({
                                  artist_id: value.artist_id,
                                  user_id: value.user_id,
                                  parent_id: value.parent_id,
                                  mess: value.mess,
                                  id: value.id,
                                })
                              }}
                            >
                              삭제
                            </CButton>
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
                onClick={(e) => {
                  getList(e, {
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
      {isModal && (
        <CheckPopup
          onClickClose={() => setIsModal(false)}
          bodyContent={'선택하신 댓글을 삭제 하시겠습니까?'}
          title={'삭제'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}

      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'댓글 삭제가 완료되었습니다.'}
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
      {isCalen && (
        <CalenderPopup
          onClickClose={() => setIsCalen(false)}
          onStart={startDay}
          onEnd={endDay}
          onChecked={(start, end) => calenderData(start, end)}
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
ArtistComment.propTypes = {
  history: PropTypes.object,
}

export default ArtistComment
