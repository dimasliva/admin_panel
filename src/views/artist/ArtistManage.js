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
import { ArtistAdd } from './create/ArtistAdd'
import { ArtistDetail } from './popup/ArtistDetail'
import { ArtistLikeDetail } from './ArtistLikeDetail'
import { ImgBig } from 'src/components/publicPopup/ImgBig'
import axios from 'axios'
import { headerConfig } from '../../static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'
import { ArtistVotingDetail } from './popup/ArtistVotingDetail'
import { ArtistVotingTotal } from './popup/ArtistVotingTotal'

const ArtistManage = () => {
  // Popup
  const [isDetailPopup, setIsDetailPopup] = useState({ use: false, id: '', status: '' })
  const [isAddPopup, setIsAddPopup] = useState(false)
  const [role, setRole] = useState('')
  const [isLikePopup, setIsLikePopup] = useState({
    use: false,
    artistId: '',
  }) // Detail Popup
  const [isVoteDetail, setIsVoteDetail] = useState({
    use: false,
    artistId: '',
  })
  const [isVoteTotal, setIsVoteTotal] = useState({
    use: false,
    artistId: '',
  }) // Detail Popup
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  }) // img detail
  const [list, setList] = useState([]) // Table data list
  // Sort
  const [page, setPage] = useState(1)
  const [type, setType] = useState('all')
  const [unit, setUnit] = useState('all')
  const [orderBy, setOrderBy] = useState('new')
  // Search bar
  const [keyword, setKeyword] = useState('')
  const [searchTarget, setSearchTarget] = useState('name')
  // count
  const [pages, setPages] = useState(1)
  const tableTitle = [
    { label: '메인사진' },
    { label: '서브사진' },
    { label: '아티스트 명' },
    { label: '그룹 명' },
    { label: '최애등록수' },
    { label: '시즌투표수' },
    { label: '총 투표수' },
    { label: '타입' },
    { label: '유닛' },
    { label: '개인코드' },
    { label: '그룹코드' },
  ]

  // Artist List
  const getList = async (params) => {
    if (!params) {
      params = {}
    }
    const queries = []

    if (params.limit === undefined) {
      params.limit = 30
    }
    if (params.page === undefined) {
      params.page = page
    }

    if (params.type === undefined) {
      params.type = type
    }

    if (params.unit === undefined) {
      params.unit = unit
    }

    if (params.orderBy === undefined) {
      params.orderBy = orderBy
    }

    if (keyword !== '') queries.push(`search_word=${keyword}`)
    queries.push(`search_type=${searchTarget}`)
    queries.push(`order_by=${params.orderBy}`)
    if (params.type !== 'all') {
      queries.push(`type=${params.type}`)
    }

    if (params.unit !== 'all') {
      queries.push(`unit_type=${params.unit}`)
    }

    queries.push(`page=${params.page}`)
    queries.push(`limit=${params.limit}`)
    queries.push(`limit=${params.limit}`)
    queries.push(`event_type=all`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)

    const res = await axios
      .get(`/api/artist/query${queryStr}`, headerConfig)
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

  // add close popup
  const closeAdd = () => {
    getList({ limit: 30 * page, page: 1, new: true })
    setIsAddPopup(false)
  }

  useEffect(() => {
    getList({ page: 1 })
    setPage(1)
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CNav variant="tabs" className="mt-2 nav-custom">
            <CNavItem>
              <CNavLink active className="custom-tab-color-main">
                아티스트 관리
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CRow className="g-3">
              <CCol sm={12} className="d-flex flex-row align-items-center">
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="select-group__select"
                  style={{ width: '10%' }}
                  value={searchTarget}
                  onChange={(e) => setSearchTarget(e.target.value)}
                >
                  <option value="name">이름</option>
                  <option value="code_artist">개인코드</option>
                  <option value="group_code">그룹코드</option>
                </CFormSelect>
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="select-group__select mx-2"
                  style={{ width: '10%' }}
                  value={orderBy}
                  onChange={(e) => {
                    getList({
                      orderBy: e.target.value,
                      isSort: true,
                      type,
                      unit,
                      page: 1,
                    })
                    setPage(1)
                    setOrderBy(e.target.value)
                  }}
                >
                  <option value="new">최신순</option>
                  <option value="favorite">최애등록수</option>
                  <option value="name">이름순</option>
                  <option value="season_vote">시즌 투표수</option>
                  <option value="total_vote">총 투표수</option>
                </CFormSelect>
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  style={{ width: '10%' }}
                  className="select-group__select"
                  value={type}
                  onChange={(e) => {
                    getList({
                      type: e.target.value,
                      isSort: true,
                      unit,
                      orderBy,
                      page: 1,
                    })
                    setPage(1)
                    setType(e.target.value)
                  }}
                >
                  <option value="all">타입전체</option>
                  <option value="1">가수</option>
                  <option value="2">배우</option>
                  <option value="3">기타</option>
                </CFormSelect>
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="mx-2 select-group__select"
                  style={{ width: '10%' }}
                  value={unit}
                  onChange={(e) => {
                    getList({
                      unit: e.target.value,
                      isSort: true,
                      type,
                      orderBy,
                      page: 1,
                    })
                    setPage(1)
                    setUnit(e.target.value)
                  }}
                >
                  <option value="all">유닛전체</option>
                  <option value="0">개인</option>
                  <option value="1">그룹</option>
                </CFormSelect>
                <CInputGroup style={{ width: '30%' }}>
                  <CFormInput
                    size="lg"
                    placeholder="검색할 키워드를 입력하세요."
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        getList({ page: 1 })
                        setPage(1)
                      }
                    }}
                  />
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
                    <CIcon icon={cilSearch} size="lg" /> 조회
                  </CButton>
                </CInputGroup>
              </CCol>
            </CRow>
            <div className="button-group mt-5">
              {role === 1 ? null : (
                <CButton
                  color="info"
                  size="sm"
                  className="button-group__btn px-4 fs-6"
                  style={{ color: 'white' }}
                  onClick={() => {
                    setIsAddPopup(true)
                  }}
                >
                  신규 등록
                </CButton>
              )}
            </div>
            <CTable bordered className="mt-3 table-text-center" style={{ fontSize: '13px' }}>
              <CTableHead>
                <CTableRow>
                  {tableTitle.map((title, index) => {
                    return (
                      <CTableHeaderCell className="text-center" scope="col" key={index}>
                        {title.label}
                      </CTableHeaderCell>
                    )
                  })}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {list !== null ? (
                  list.map((value, index) => {
                    // Image Quarterly null
                    const imgText = value.img_artist
                    let imgMain = ''
                    let imgSup = ''
                    if (imgText !== null) {
                      imgMain = process.env.REACT_APP_IMG + imgText.main
                      imgSup = process.env.REACT_APP_IMG + imgText.sup
                    } else {
                      imgMain = ''
                      imgSup = ''
                    }

                    // type
                    let typeName = ''
                    if (value.type === 1) {
                      typeName = '가수'
                    } else if (value.type === 2) {
                      typeName = '배우'
                    } else if (value.type === 3) {
                      typeName = '기타'
                    }

                    const artistName = value.name_artist
                    let groupName
                    if (Array.isArray(value.group_name)) {
                      let nameStr
                      value.group_name.forEach((val) => {
                        nameStr = nameStr ? nameStr + ',' + val.ko : val.ko
                      })
                      groupName = nameStr
                    } else {
                      groupName = value.group_name
                    }

                    return (
                      <CTableRow key={index}>
                        <CTableDataCell scope="row" className="cursor">
                          <CImage
                            onClick={() =>
                              setIsImg({
                                use: true,
                                img: imgMain,
                              })
                            }
                            style={{ width: '40px', height: '40px' }}
                            src={imgMain}
                            alt=""
                            onError={(e) => (e.target.src = '/icon.png')}
                          />
                        </CTableDataCell>
                        <CTableDataCell scope="row" className="cursor">
                          <CImage
                            onClick={() =>
                              setIsImg({
                                use: true,
                                img: imgSup,
                              })
                            }
                            style={{ width: '40px', height: '40px' }}
                            src={imgSup}
                            alt=""
                            onError={(e) => (e.target.src = '/icon.png')}
                          />
                        </CTableDataCell>
                        <CTableDataCell
                          scope="row"
                          className="text-center cursor"
                          style={{ width: '10%' }}
                          onClick={() => {
                            setIsDetailPopup({ use: true, id: value.id, status: '' })
                          }}
                        >
                          <span className="text-info cursor">
                            {artistName !== null ? artistName.ko : ''}
                          </span>
                        </CTableDataCell>
                        <CTableDataCell
                          scope="row"
                          className="text-center"
                          style={{ width: '10%' }}
                        >
                          <span>{groupName}</span>
                        </CTableDataCell>
                        <CTableDataCell scope="row" className="text-center">
                          <span
                            className="text-info cursor"
                            onClick={() =>
                              setIsLikePopup({
                                use: true,
                                artistId: value.id,
                              })
                            }
                          >
                            {value.favorite_cnt}명
                          </span>
                        </CTableDataCell>
                        <CTableDataCell className="text-center" scope="row">
                          <span
                            onClick={() =>
                              setIsVoteDetail({
                                use: true,
                                artistId: value.id,
                              })
                            }
                            className="text-info cursor"
                          >
                            {/*Not correct*/}
                            {value.season_vote}표
                          </span>
                        </CTableDataCell>
                        <CTableDataCell className="text-center" scope="row">
                          <span
                            onClick={() =>
                              setIsVoteTotal({
                                use: true,
                                artistId: value.id,
                              })
                            }
                            className="text-info cursor"
                          >
                            {/*Not correct*/}
                            {value.total_vote}표
                          </span>
                        </CTableDataCell>
                        <CTableDataCell className="text-center" scope="row">
                          {typeName}
                        </CTableDataCell>
                        <CTableDataCell className="text-center" scope="row">
                          {value.is_group === 0 ? '개인' : '그룹'}
                        </CTableDataCell>
                        {value.is_group === 1 ? (
                          <CTableDataCell
                            className="text-center"
                            scope="row"
                            style={{ width: '10%' }}
                          />
                        ) : (
                          <CTableDataCell
                            className="text-center"
                            scope="row"
                            style={{ width: '10%' }}
                          >
                            {value.code_artist}
                          </CTableDataCell>
                        )}
                        {value.is_group === 1 ? (
                          <CTableDataCell
                            className="text-center"
                            scope="row"
                            style={{ width: '10%' }}
                          >
                            {value.code_artist}
                          </CTableDataCell>
                        ) : (
                          <CTableDataCell className="text-center" scope="row">
                            {value.group_code}
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
                  getList({
                    page: page + 1,
                    type,
                    unit,
                    orderBy,
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
      {isAddPopup && role !== 1 && <ArtistAdd onClickClose={() => closeAdd()} />}
      {isDetailPopup.use && (
        <ArtistDetail
          onClickClose={() => setIsDetailPopup({ use: false, id: '', status: '' })}
          onId={isDetailPopup.id}
          onChecked={() => {
            getList({ limit: 30 * page, page: 1, new: true })
            setIsDetailPopup({ use: false, id: '', status: '' })
          }}
        />
      )}
      {isLikePopup.use && (
        <ArtistLikeDetail
          onClickClose={() =>
            setIsLikePopup({
              ...isLikePopup,
              use: false,
            })
          }
          onId={isLikePopup.artistId}
        />
      )}
      {isVoteDetail.use && (
        <ArtistVotingDetail
          onClickClose={() =>
            setIsVoteDetail({
              ...isVoteDetail,
              use: false,
            })
          }
          onId={isVoteDetail.artistId}
        />
      )}
      {isVoteTotal.use && (
        <ArtistVotingTotal
          onClickClose={() =>
            setIsVoteTotal({
              ...isVoteTotal,
              use: false,
            })
          }
          onId={isVoteTotal.artistId}
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

export default ArtistManage
