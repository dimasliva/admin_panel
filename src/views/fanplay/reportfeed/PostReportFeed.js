import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormCheck,
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
  CImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilReload } from '@coreui/icons'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'
import axios from 'axios'
import moment from 'moment'
import EditImageDetail from '../EditImageDetail'
import { CheckPopup } from '../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../components/publicPopup/NormalPopup'
import { UserDetail } from '../../member/popup/UserDetail'
import { ReportTakPopup } from '../replymanager/popup/ReportTakPopup'
import { ImgBig } from '../../../components/publicPopup/ImgBig'

const PostReportFeed = () => {
  const [activeKey, setActiveKey] = useState(1)
  const one = 1
  const [role, setRole] = useState('')
  let tableTitle
  let tableManage
  let tableTalk
  {
    role !== one
      ? (tableTitle = [
          { label: '선택​' },
          // { label: '타입​​' },
          { label: '아티스트 코드​​' },
          { label: '신고대상자​' },
          { label: '콘텐츠​' },
          { label: '제목​' },
          { label: '내용​' },
          { label: '신고수​' },
          { label: '게시일자​' },
          { label: '처리​' },
        ])
      : (tableTitle = [
          { label: '선택​' },
          // { label: '타입​​' },
          { label: '아티스트 코드​​' },
          { label: '신고대상자​' },
          { label: '콘텐츠​' },
          { label: '제목​' },
          { label: '내용​' },
          { label: '신고수​' },
          { label: '게시일자​' },
        ])
  }
  {
    role !== one
      ? (tableManage = [
          { label: '선택​' },
          // { label: '타입​​' },
          { label: '아티스트 코드​​' },
          { label: '신고대상자​' },
          { label: '콘텐츠​' },
          { label: '신고수​' },
          { label: '게시일자​' },
          { label: '처리​' },
        ])
      : (tableManage = [
          { label: '선택​' },
          // { label: '타입​​' },
          { label: '아티스트 코드​​' },
          { label: '신고대상자​' },
          { label: '콘텐츠​' },
          { label: '신고수​' },
          { label: '게시일자​' },
        ])
  }
  {
    role !== one
      ? (tableTalk = [
          { label: '선택' },
          // { label: '타입​' },
          { label: '신고대상자​' },
          { label: '콘텐츠' },
          { label: '신고수' },
          { label: '게시일자' },
          { label: '처리​' },
        ])
      : (tableTalk = [
          { label: '선택' },
          // { label: '타입​' },
          { label: '신고대상자​' },
          { label: '콘텐츠' },
          { label: '신고수' },
          { label: '게시일자' },
        ])
  }

  const [isImageDetail, setIsImageDetail] = useState({
    use: false,
    imgs: [],
  }) // img detail Popup
  const [userInfo, setUserInfo] = useState({
    use: false,
    id: '',
  }) // User Information Popup
  // Checked
  const [isDeletePopup, setIsDeletePopup] = useState({
    use: false,
    id: '',
  })
  const [isDeletePopupRep, setIsDeletePopupRep] = useState({
    use: false,
    id: '',
  }) // delete Popup
  const [isReportModal, setIsReportModal] = useState({
    use: false,
    id: '',
    id2: '',
  }) // Detail Popup
  const [allCheckedList, setAllCheckedList] = useState(false) // all Checked
  const [isModal, setIsModal] = useState(false) // delete check Modal
  const [isModal2, setIsModal2] = useState(false) // delete check Modal
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isOkCheck2, setIsOkCheck2] = useState(false)
  const [listTab1, setListTab1] = useState(null)
  const [page1, setPage1] = useState(1)
  const [pages1, setPages1] = useState(1)
  const [count1, setCount1] = useState(0)
  const [listTab2, setListTab2] = useState(null)
  const [page2, setPage2] = useState(1)
  const [pages2, setPages2] = useState(1)
  const [count2, setCount2] = useState(0)
  const [listTab3, setListTab3] = useState(null)
  const [page3, setPage3] = useState(1)
  const [pages3, setPages3] = useState(1)
  const [count3, setCount3] = useState(0)
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  })
  useEffect(() => {
    getList({ page: 1 })
    setPage1(1)
    getList2({ page: 1 })
    setPage2(1)
    getList3({ page: 1 })
    setPage3(1)
  }, [])
  // ======================= Tab 1 ===================== //1,3,4
  const getList = async (params) => {
    if (!params) {
      params = {}
    }
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
    if (params.page === undefined) {
      params.page = page1
    }

    const queries = []
    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)
    queries.push(`type=2`)
    queries.push(`status=1`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios
      .get(`/api/fan/play/report/all/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) return

    setPages1(res.data.value.pages ? res.data.value.pages : 1)
    setCount1(res.data.value.count === undefined ? 0 : res.data.value.count)
    const data = []
    res.data.value.items.map((value) =>
      data.push({
        ...value,
        checked: false,
      }),
    )
    if (params.page > 1) {
      res.data.value.items.map((value) =>
        listTab1.push({
          ...value,
          checked: false,
        }),
      )
      setListTab1([...listTab1])
    } else {
      setListTab1(data)
    }
  }
  // ======================= Tab 2 ===================== //
  const getList2 = async (params) => {
    if (!params) {
      params = {}
    }

    if (params.page === undefined) {
      params.page = page2
    }

    const queries = []
    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)
    queries.push(`type=3`)
    queries.push(`status=1`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios
      .get(`/api/fan/play/report/all/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) return
    setPages2(res.data.value.pages ? res.data.value.pages : 1)
    setCount2(res.data.value.count === undefined ? 0 : res.data.value.count)
    const data = []
    res.data.value.items.map((value) =>
      data.push({
        ...value,
        checked: false,
      }),
    )

    if (params.page > 1) {
      res.data.value.items.map((value) =>
        listTab2.push({
          ...value,
          checked: false,
        }),
      )
      setListTab2([...listTab2])
    } else {
      setListTab2(data)
    }
  }
  // ======================= Tab 3 ===================== //
  const getList3 = async (params) => {
    if (!params) {
      params = {}
    }

    if (params.page === undefined) {
      params.page = page3
    }

    const queries = []
    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)
    queries.push(`type=4`)
    queries.push(`status=1`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios
      .get(`/api/fan/play/report/all/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) return
    setPages3(res.data.value.pages ? res.data.value.pages : 1)
    setCount3(res.data.value.count === undefined ? 0 : res.data.value.count)
    const data = []
    res.data.value.items.map((value) =>
      data.push({
        ...value,
        checked: false,
      }),
    )
    if (params.page > 1) {
      res.data.value.items.map((value) =>
        listTab3.push({
          ...value,
          checked: false,
        }),
      )
      setListTab3([...listTab3])
    } else {
      setListTab3(data)
    }
  }
  // All checked button event
  const allChecked = (bool) => {
    if (activeKey === 1) {
      if (bool) {
        listTab1.map((value) => (value.checked = true))
        setListTab1([...listTab1])
      } else {
        listTab1.map((value) => (value.checked = false))
        setListTab1([...listTab1])
      }
    } else if (activeKey === 2) {
      if (bool) {
        listTab2.map((value) => (value.checked = true))
        setListTab2([...listTab2])
      } else {
        listTab2.map((value) => (value.checked = false))
        setListTab2([...listTab2])
      }
    } else if (activeKey === 3) {
      if (bool) {
        listTab3.map((value) => (value.checked = true))
        setListTab3([...listTab3])
      } else {
        listTab3.map((value) => (value.checked = false))
        setListTab2([...listTab3])
      }
    }
  }

  // All checked delete event
  const allDelete = async () => {
    const data = []
    if (activeKey === 1) {
      listTab1.map((value) => {
        if (value.checked) {
          data.push(value.play_id)
        }
      })
    } else if (activeKey === 2) {
      listTab2.map((value) => {
        if (value.checked) {
          data.push(value.play_id)
        }
      })
    } else if (activeKey === 3) {
      listTab3.map((value) => {
        if (value.checked) {
          data.push(value.play_id)
        }
      })
    }

    if (data.length === 0) {
      setIsModal(false)
      alert('삭제할 항목이 선택되지 않았습니다.')
    }
    const deleteData = {
      play_id_arr: data,
      status: -1,
    }

    const res = await axios
      .put(`/api/fan/play`, deleteData, headerConfig)
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
      play_id_arr: [value],
      status: -1,
    }

    const res = await axios
      .put(`/api/fan/play/report`, data, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) {
      alert('처리완료가 실패했습니다.')
    } else {
      setIsOkCheck2(true)
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

  // delete list
  const deleteTak = async (id) => {
    const deleteData = {
      play_id_arr: [id],
      status: -1,
    }
    const res = await axios
      .put(`/api/fan/play`, deleteData, headerConfig)
      .catch((err) => statusCatch(err))

    if (res.data.success) {
      setIsDeletePopup({
        use: false,
        id: '',
      })
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }
  const deleteTakRep = async (id) => {
    const deleteData = {
      play_id_arr: [id],
      status: -1,
    }
    const res = await axios
      .put(`/api/fan/play`, deleteData, headerConfig)
      .catch((err) => statusCatch(err))

    if (res.data.success) {
      setIsDeletePopupRep({
        use: false,
        id: '',
      })
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }
  // delete checked
  const modalOkEvent = (value) => {
    if (value) {
      deleteTak(isDeletePopup.id)
    } else {
      setIsDeletePopup({
        use: false,
        id: '',
      })
    }
  }
  const modalOkEventRep = (value) => {
    if (value) {
      deleteTakRep(isDeletePopupRep.id)
    } else {
      setIsDeletePopupRep({
        use: false,
        id: '',
      })
    }
  }

  const closeModalEvent = () => {
    if (activeKey === 1) {
      getList({ page: 1 })
      setPage1(1)
    } else if (activeKey === 2) {
      getList2({ page: 1 })
      setPage2(1)
    } else if (activeKey === 3) {
      getList3({ page: 1 })
      setPage3(1)
    }
    setIsOkCheck(false)
    setIsOkCheck2(false)
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CNav variant="tabs" className="mt-2 nav-custom">
            <CNavItem>
              <div className="relative-dom">
                <span>{count1}</span>
                <CNavLink
                  className={
                    activeKey === 1 ? 'cursor custom-tab-color-main' : 'cursor custom-tab-color'
                  }
                  active={activeKey === 1}
                  onClick={() => {
                    setActiveKey(1)
                    getList({ page: 1 })
                    setPage1(1)
                  }}
                >
                  팬피드 신고
                </CNavLink>
              </div>
            </CNavItem>
            <CNavItem>
              <div className="relative-dom">
                <span>{count2}</span>
                <CNavLink
                  className={
                    activeKey === 2 ? 'cursor custom-tab-color-main' : 'cursor custom-tab-color'
                  }
                  active={activeKey === 2}
                  onClick={() => {
                    setActiveKey(2)
                    getList2({ page: 1 })
                    setPage2(1)
                  }}
                >
                  팬DIY 신고
                </CNavLink>
              </div>
            </CNavItem>
            <CNavItem>
              <div className="relative-dom">
                <span>{count3}</span>
                <CNavLink
                  className={
                    activeKey === 3 ? 'cursor custom-tab-color-main' : 'cursor custom-tab-color'
                  }
                  active={activeKey === 3}
                  onClick={() => {
                    setActiveKey(3)
                    getList3({ page: 1 })
                    setPage3(1)
                  }}
                >
                  팬톡 신고
                </CNavLink>
              </div>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CTabContent>
              {/*Feed*/}
              <CTabPane role="tabpanel" aria-labelledby="user_login" visible={activeKey === 1}>
                <CRow className="g-3">
                  <CCol sm={12}>
                    <CInputGroup className="mb-3">
                      <CButton
                        type="button"
                        color="primary"
                        variant="outline"
                        id="basic-addon1"
                        onClick={() => {
                          getList({ page: 1 })
                          setPage1(1)
                        }}
                      >
                        새로고침​
                        <CIcon
                          icon={cilReload}
                          size="lg"
                          onClick={() => {
                            getList({ page: 1 })
                            setPage1(1)
                          }}
                        />
                      </CButton>
                    </CInputGroup>
                  </CCol>
                </CRow>
                {role !== one && (
                  <CRow className="g-3">
                    <CCol sm={12} className="d-flex flex-row align-items-center">
                      <CButton
                        type="button"
                        color="primary"
                        variant="outline"
                        className="me-2"
                        id="basic-addon1"
                        onClick={() => {
                          let isValue = ''
                          if (allCheckedList) {
                            setAllCheckedList(false)
                            isValue = false
                          } else {
                            setAllCheckedList(true)
                            isValue = true
                          }
                          allChecked(isValue)
                        }}
                      >
                        전체선택 ( 취소 )​
                      </CButton>
                      <CButton
                        type="button"
                        color="primary"
                        variant="outline"
                        id="basic-addon1"
                        onClick={() => {
                          setIsModal2(true)
                        }}
                      >
                        삭제​
                      </CButton>
                    </CCol>
                  </CRow>
                )}
                <CRow>
                  <CTable bordered className="mt-3 table-text-center" style={{ fontSize: '12px' }}>
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
                      {listTab1 !== null && listTab1 !== undefined ? (
                        listTab1.map((value, index) => {
                          const writerAvatar = value.avatar
                          let img1 = ''
                          if (writerAvatar !== null) img1 = process.env.REACT_APP_IMG + writerAvatar
                          const createdDay = {
                            day: moment(value.created_at).format('YYYY-MM-DD'),
                            time: moment(value.created_at).format('HH:mm:ss'),
                          }
                          // contents
                          const contents =
                            value.img_play === null || value.img_play === ''
                              ? ''
                              : value.img_play[0].url
                          const conImg = process.env.REACT_APP_IMG + contents
                          return (
                            <CTableRow key={index}>
                              <CTableDataCell>
                                <div className="d-flex flex-row align-items-center py-4 justify-content-center">
                                  <CFormCheck
                                    id="flexCheckDefault"
                                    checked={value.checked}
                                    onChange={(e) => {
                                      value.checked = e.target.checked
                                      setListTab1([...listTab1])
                                    }}
                                  />
                                </div>
                              </CTableDataCell>
                              <CTableDataCell onClick={() => console.log(value)}>
                                {value.code_artist}
                              </CTableDataCell>
                              <CTableDataCell
                                style={{ width: '8%' }}
                                scope="row"
                                className="artist-img-dom"
                              >
                                <div className="d-flex flex-column align-items-center">
                                  <div className="artist-img-dom__img-border2">
                                    <CImage
                                      onClick={() => {
                                        setIsImg({
                                          use: true,
                                          img: img1,
                                        })
                                      }}
                                      className="artist-img-dom__img-border__profile cursor"
                                      style={{ borderRadius: '50%' }}
                                      src={img1}
                                      alt=""
                                      onError={(e) => (e.target.src = '/icon.png')}
                                    />
                                  </div>
                                  <span
                                    onClick={() => {
                                      setUserInfo({
                                        use: true,
                                        id: value.user_id,
                                      })
                                    }}
                                    className="cursor"
                                    style={{ color: 'blue' }}
                                  >
                                    {value.nickname && value.nickname.length > 9
                                      ? value.nickname.substr(0, 9) + '...'
                                      : value.nickname}
                                  </span>
                                </div>
                              </CTableDataCell>
                              {/*{value.link_play === null ? (*/}
                              <CTableDataCell className="artist-img-dom">
                                <div className="d-flex flex-column align-items-center">
                                  <div
                                    onClick={() =>
                                      setIsImageDetail({ use: true, imgs: value.img_play })
                                    }
                                  >
                                    <div
                                      className="artist-img-dom__img-border"
                                      style={{ borderRadius: 'inherit', marginRight: '0px' }}
                                    >
                                      <CImage
                                        className="artist-img-dom__img-border__profile cursor"
                                        src={conImg}
                                        alt=""
                                        onError={(e) => (e.target.src = '/icon.png')}
                                      />
                                    </div>
                                    {/*<span className="style-color-blue cursor">*/}
                                    {/*  {value.img_play === null*/}
                                    {/*    ? '0 / 0'*/}
                                    {/*    : `1 / ${value.img_play.length}`}*/}
                                    {/*</span>*/}
                                  </div>
                                  <a
                                    href={value.body_play}
                                    target="_blank"
                                    className="style-color-blue cursor"
                                    rel="noreferrer"
                                  >
                                    {value.body_play.length > 21 &&
                                      value.body_play.length < 70 &&
                                      value.body_play}
                                  </a>
                                </div>
                              </CTableDataCell>
                              {/*// ) : (*/}
                              {/*//   <CTableDataCell style={{ width: '10%' }}>*/}
                              {/*//     <a*/}
                              {/*//       href={value.link_play}*/}
                              {/*//       target="_blank"*/}
                              {/*//       rel="noreferrer"*/}
                              {/*//       style={{ textDecoration: 'none' }}*/}
                              {/*//     >*/}
                              {/*//       {value.link_play}*/}
                              {/*//     </a>*/}
                              {/*//   </CTableDataCell>*/}
                              {/*// )}*/}
                              <CTableDataCell style={{ width: '15%' }}>
                                {value.title_play}
                              </CTableDataCell>
                              <CTableDataCell scope="row" style={{ width: '20%' }}>
                                {value.body_play.length < 21
                                  ? value.body_play
                                  : value.body_play.length > 70 && value.body_play}
                              </CTableDataCell>
                              <CTableDataCell
                                className="cursor"
                                onClick={() => {
                                  setIsReportModal({
                                    use: true,
                                    id: '',
                                    id2: value.play_id,
                                  })
                                }}
                              >
                                <span className="style-color-blue">{value.report_cnt}</span>
                              </CTableDataCell>
                              <CTableDataCell>
                                <div className="d-flex flex-column justify-content-center">
                                  <span>{createdDay.day}</span>
                                  <br />
                                  <span>{createdDay.time}</span>
                                </div>
                              </CTableDataCell>
                              {role !== one && (
                                <CTableDataCell>
                                  <div className="d-flex flex-row justify-content-center">
                                    <CButton
                                      onClick={() => {
                                        setIsDeletePopupRep({
                                          use: true,
                                          id: value.play_id,
                                        })
                                      }}
                                      color="danger"
                                      style={{ color: 'white', marginRight: '2px' }}
                                      size="sm"
                                    >
                                      게시물​ 삭제​
                                    </CButton>
                                    <CButton
                                      color="primary"
                                      style={{ color: 'white' }}
                                      onClick={() => {
                                        processEvent(value.play_id)
                                      }}
                                      size="sm"
                                    >
                                      처리​ 완료​
                                    </CButton>
                                  </div>
                                </CTableDataCell>
                              )}{' '}
                            </CTableRow>
                          )
                        })
                      ) : (
                        <CTableRow />
                      )}
                    </CTableBody>
                  </CTable>
                </CRow>
                {page1 !== pages1 && (
                  <CButton
                    color="dark"
                    size="sm"
                    className="moreBt"
                    onClick={() => {
                      getList({
                        page: page1 + 1,
                      })
                      setPage1(page1 + 1)
                    }}
                  >
                    더보기
                  </CButton>
                )}
              </CTabPane>
              {/*Diy*/}
              <CTabPane role="tabpanel" visible={activeKey === 2}>
                <CRow className="g-3 mb-3">
                  <CCol sm={12}>
                    <CButton
                      type="button"
                      color="primary"
                      variant="outline"
                      id="basic-addon1"
                      onClick={() => {
                        getList2({ page: 1 })
                        setPage2(1)
                      }}
                    >
                      새로고침​{' '}
                      <CIcon
                        icon={cilReload}
                        size="lg"
                        onClick={() => {
                          getList2({ page: 1 })
                          setPage2(1)
                        }}
                      />
                    </CButton>
                  </CCol>
                </CRow>
                {role !== one && (
                  <CRow className="g-3">
                    <CCol sm={12} className="d-flex flex-row align-items-center">
                      <CButton
                        type="button"
                        color="primary"
                        variant="outline"
                        className="me-2"
                        id="basic-addon1"
                        onClick={() => {
                          let isValue = ''
                          if (allCheckedList) {
                            setAllCheckedList(false)
                            isValue = false
                          } else {
                            setAllCheckedList(true)
                            isValue = true
                          }
                          allChecked(isValue)
                        }}
                      >
                        전체선택 ( 취소 )​
                      </CButton>
                      <CButton
                        type="button"
                        color="primary"
                        variant="outline"
                        id="basic-addon1"
                        onClick={() => {
                          setIsModal2(true)
                        }}
                      >
                        삭제​
                      </CButton>
                    </CCol>
                  </CRow>
                )}
                <CTable bordered className="mt-3 table-text-center">
                  <CTableHead>
                    <CTableRow>
                      {tableManage.map((title, index) => {
                        return (
                          <CTableHeaderCell scope="col" key={index}>
                            {title.label}
                          </CTableHeaderCell>
                        )
                      })}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {listTab2 !== null && listTab2 !== undefined ? (
                      listTab2.map((value, index) => {
                        const writerAvatar = value.avatar
                        let img1 = ''
                        if (writerAvatar !== null) img1 = process.env.REACT_APP_IMG + writerAvatar

                        const createdDay = {
                          day: moment(value.created_at).format('YYYY-MM-DD'),
                          time: moment(value.created_at).format('HH:mm:ss'),
                        }
                        // contents
                        const contents =
                          value.img_play === null || value.img_play === ''
                            ? ''
                            : value.img_play[0].url
                        const conImg = process.env.REACT_APP_IMG + contents
                        return (
                          <CTableRow key={index}>
                            <CTableDataCell>
                              <div className="d-flex flex-row align-items-center py-4 justify-content-center">
                                <CFormCheck
                                  id="flexCheckDefault"
                                  checked={value.checked}
                                  onChange={(e) => {
                                    value.checked = e.target.checked
                                    setListTab1([...listTab1])
                                  }}
                                />
                              </div>
                            </CTableDataCell>
                            {/* <CTableDataCell>팬DIY</CTableDataCell> */}
                            <CTableDataCell>{value.code_artist}</CTableDataCell>
                            <CTableDataCell
                              style={{ width: '8%' }}
                              scope="row"
                              className="artist-img-dom"
                            >
                              <div className="d-flex flex-column align-items-center">
                                <div className="artist-img-dom__img-border2">
                                  <CImage
                                    className="artist-img-dom__img-border__profile cursor"
                                    style={{ borderRadius: '50%' }}
                                    onClick={() =>
                                      setIsImg({
                                        use: true,
                                        img: img1,
                                      })
                                    }
                                    src={img1}
                                    alt=""
                                    onError={(e) => (e.target.src = '/icon.png')}
                                  />
                                </div>
                                <span
                                  onClick={() => {
                                    setUserInfo({
                                      use: true,
                                      id: value.user_id,
                                    })
                                  }}
                                  className="cursor"
                                  style={{ color: 'blue' }}
                                >
                                  {value.nickname && value.nickname.length > 9
                                    ? value.nickname.substr(0, 9) + '...'
                                    : value.nickname}
                                </span>
                              </div>
                            </CTableDataCell>
                            {value.link_play === null ? (
                              <CTableDataCell
                                scope="row"
                                className="artist-img-dom"
                                onClick={() =>
                                  setIsImageDetail({ use: true, imgs: value.img_play })
                                }
                              >
                                <div className="d-flex flex-column align-items-center">
                                  <div
                                    className="artist-img-dom__img-border"
                                    style={{ borderRadius: 'inherit', marginRight: '0px' }}
                                  >
                                    <CImage
                                      className="artist-img-dom__img-border__profile cursor"
                                      src={conImg}
                                      alt=""
                                      onError={(e) => (e.target.src = '/icon.png')}
                                    />
                                  </div>
                                  <div>
                                    <span className="style-color-blue cursor">
                                      {value.img_play === null
                                        ? '0 / 0'
                                        : `1 / ${value.img_play.length}`}
                                    </span>
                                  </div>
                                </div>
                              </CTableDataCell>
                            ) : (
                              <CTableDataCell>
                                <a href={value.link_play} target="_blank" rel="noreferrer">
                                  {value.link_play}
                                </a>
                              </CTableDataCell>
                            )}
                            <CTableDataCell
                              className="cursor"
                              onClick={() => {
                                setIsReportModal({
                                  use: true,
                                  id: '',
                                  id2: value.play_id,
                                })
                              }}
                            >
                              <span className="style-color-blue">{value.report_cnt}</span>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div className="d-flex flex-column justify-content-center">
                                <span>{createdDay.day}</span>
                                <br />
                                <span>{createdDay.time}</span>
                              </div>
                            </CTableDataCell>
                            {role !== one && (
                              <CTableDataCell>
                                <CButton
                                  onClick={() => {
                                    setIsDeletePopup({
                                      use: true,
                                      id: value.play_id,
                                    })
                                  }}
                                  color="danger"
                                  style={{ color: 'white', marginRight: '2px' }}
                                >
                                  게시물​ 삭제​
                                </CButton>
                                <CButton
                                  color="primary"
                                  style={{ color: 'white' }}
                                  onClick={() => {
                                    processEvent(value.play_id)
                                  }}
                                >
                                  처리​ 완료​
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
                {page2 !== pages2 && (
                  <CButton
                    color="dark"
                    size="sm"
                    className="moreBt"
                    onClick={() => {
                      getList2({
                        page: page2 + 1,
                      })
                      setPage2(page2 + 1)
                    }}
                  >
                    더보기
                  </CButton>
                )}
              </CTabPane>
              {/* Talk */}
              <CTabPane role="tabpanel" visible={activeKey === 3}>
                <CRow className="g-3 mb-3">
                  <CCol sm={12}>
                    <CButton
                      type="button"
                      color="primary"
                      variant="outline"
                      id="basic-addon1"
                      onClick={() => {
                        getList3({ page: 1 })
                        setPage3(1)
                      }}
                    >
                      새로고침​{' '}
                      <CIcon
                        icon={cilReload}
                        size="lg"
                        onClick={() => {
                          getList3({ page: 1 })
                          setPage3(1)
                        }}
                      />
                    </CButton>
                  </CCol>
                </CRow>
                {role !== one && (
                  <CRow className="g-3">
                    <CCol sm={12} className="d-flex flex-row align-items-center">
                      <CButton
                        type="button"
                        color="primary"
                        className="me-2"
                        variant="outline"
                        id="basic-addon1"
                        onClick={() => {
                          let isValue = ''
                          if (allCheckedList) {
                            setAllCheckedList(false)
                            isValue = false
                          } else {
                            setAllCheckedList(true)
                            isValue = true
                          }
                          allChecked(isValue)
                        }}
                      >
                        전체선택 ( 취소 )​
                      </CButton>
                      <CButton
                        type="button"
                        color="primary"
                        variant="outline"
                        id="basic-addon1"
                        onClick={() => {
                          setIsModal2(true)
                        }}
                      >
                        삭제​
                      </CButton>
                    </CCol>
                  </CRow>
                )}
                <CTable bordered className="mt-3 table-text-center">
                  <CTableHead>
                    <CTableRow>
                      {tableTalk.map((title, index) => {
                        return (
                          <CTableHeaderCell scope="col" key={index}>
                            {title.label}
                          </CTableHeaderCell>
                        )
                      })}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {listTab3 !== null && listTab3 !== undefined ? (
                      listTab3.map((value, index) => {
                        const writerAvatar = value.avatar
                        let img1 = ''
                        if (writerAvatar !== null) img1 = process.env.REACT_APP_IMG + writerAvatar

                        const createdDay = {
                          day: moment(value.created_at).format('YYYY-MM-DD'),
                          time: moment(value.created_at).format('HH:mm:ss'),
                        }
                        return (
                          <CTableRow key={index}>
                            <CTableDataCell>
                              <div className="d-flex flex-row align-items-center py-4 justify-content-center">
                                <CFormCheck
                                  id="flexCheckDefault"
                                  checked={value.checked}
                                  onChange={(e) => {
                                    value.checked = e.target.checked
                                    setListTab1([...listTab1])
                                  }}
                                />
                              </div>
                            </CTableDataCell>
                            {/* <CTableDataCell>팬톡</CTableDataCell> */}
                            <CTableDataCell
                              style={{ width: '8%' }}
                              scope="row"
                              className="artist-img-dom cursor"
                            >
                              <div className="d-flex flex-column align-items-center">
                                <div className="artist-img-dom__img-border2">
                                  <CImage
                                    className="artist-img-dom__img-border__profile"
                                    style={{ borderRadius: '50%' }}
                                    src={img1}
                                    onClick={() =>
                                      setIsImg({
                                        use: true,
                                        img: img1,
                                      })
                                    }
                                    alt=""
                                    onError={(e) => (e.target.src = '/icon.png')}
                                  />
                                </div>
                                <span
                                  onClick={() => {
                                    setUserInfo({
                                      use: true,
                                      id: value.user_id,
                                    })
                                  }}
                                  className="cursor"
                                  style={{ color: 'blue' }}
                                >
                                  {value.nickname && value.nickname.length > 9
                                    ? value.nickname.substr(0, 9) + '...'
                                    : value.nickname}
                                </span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell style={{ width: '30%' }}>
                              {value.body_play}
                            </CTableDataCell>
                            <CTableDataCell
                              className="cursor"
                              onClick={() => {
                                setIsReportModal({
                                  use: true,
                                  id: '',
                                  id2: value.play_id,
                                })
                              }}
                            >
                              <span className="style-color-blue">{value.report_cnt}</span>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div className="d-flex flex-column justify-content-center">
                                <span>{createdDay.day}</span>
                                <br />
                                <span>{createdDay.time}</span>
                              </div>
                            </CTableDataCell>
                            {role !== one && (
                              <CTableDataCell>
                                <CButton
                                  onClick={() => {
                                    setIsDeletePopup({
                                      use: true,
                                      id: value.play_id,
                                    })
                                  }}
                                  color="danger"
                                  style={{ color: 'white', marginRight: '2px' }}
                                >
                                  게시물​ 삭제​
                                </CButton>
                                <CButton
                                  color="primary"
                                  style={{ color: 'white' }}
                                  onClick={() => {
                                    processEvent(value.play_id)
                                  }}
                                >
                                  처리​ 완료​
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
                {page3 !== pages3 && (
                  <CButton
                    color="dark"
                    size="sm"
                    className="moreBt"
                    onClick={() => {
                      getList({
                        page: page3 + 1,
                      })
                      setPage3(page3 + 1)
                    }}
                  >
                    더보기
                  </CButton>
                )}
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
      {isImageDetail.use && (
        <EditImageDetail
          onClickClose={() =>
            setIsImageDetail({
              use: false,
              imgs: [],
            })
          }
          onImgs={isImageDetail.imgs}
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
      {isModal && (
        <CheckPopup
          onClickClose={() => setIsModal(false)}
          bodyContent={'선택하신 댓글을 삭제하시겠습니까?'}
          title={'삭제'}
          onCheked={(value) => modalOkAllEvent(value)}
        />
      )}
      {isModal2 && (
        <CheckPopup
          onClickClose={() => setIsModal2(false)}
          bodyContent={'선택하신 댓글을 삭제하시겠습니까?'}
          title={'삭제'}
          onCheked={(value) => modalOkAllEvent(value)}
        />
      )}
      {isDeletePopup.use && (
        <CheckPopup
          onClickClose={() =>
            setIsDeletePopup({
              use: false,
              id: '',
            })
          }
          bodyContent={'선택하신 댓글을 삭제하시겠습니까?'}
          title={'삭제'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isDeletePopupRep.use && (
        <CheckPopup
          onClickClose={() =>
            setIsDeletePopupRep({
              use: false,
              id: '',
            })
          }
          bodyContent={'선택하신 게시물을 삭제하시겠습니까?'}
          title={'삭제'}
          onCheked={(value) => modalOkEventRep(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'삭제가 완료되었습니다.'}
        />
      )}
      {isOkCheck2 && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'처리가 완료되었습니다.'}
        />
      )}
      {/* User Detail */}
      {userInfo.use && (
        <UserDetail
          onClickClose={() =>
            setUserInfo({
              ...userInfo,
              use: false,
            })
          }
          onCloseOkEvent={() => {
            setUserInfo({
              ...userInfo,
              use: false,
            })
            getList()
          }}
          onId={userInfo.id}
        />
      )}
      {/* Report Popup*/}
      {isReportModal.use && (
        <ReportTakPopup
          onClickClose={() => setIsReportModal({ use: false, id: '', id2: '' })}
          onId={isReportModal.id}
          onId2={isReportModal.id2}
        />
      )}
    </CRow>
  )
}
export default PostReportFeed
