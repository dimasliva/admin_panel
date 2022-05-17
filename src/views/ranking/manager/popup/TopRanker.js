import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalBody,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CImage,
  CInputGroup,
  CCol,
  CFormInput,
} from '@coreui/react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import { CheckPopup } from '../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../components/publicPopup/NormalPopup'
import { ImgBig } from '../../../../components/publicPopup/ImgBig'
import TotalVote from './TotalVote'

const tableTitle = [
  { label: '순위' },
  { label: '아티스트 이름' },
  { label: '아티스트 그룹​' },
  { label: '투표수​​' },
  { label: '상태​​​' },
]

export const TopRanker = ({ onClickClose, onId }) => {
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isDelete, setIsDelete] = useState({ use: false, artist: '', rank: '' }) // ok Modal
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  })
  const [isTotalVote, setIsTotalVote] = useState({
    use: false,
    artist: '',
    rank: '',
  })
  const [isSearch, setIsSearch] = useState(false)
  const [search, setSearch] = useState('')
  const [pages, setPages] = useState(1)
  const [listTab, setListTab] = useState(null)
  const [page, setPage] = useState(1)
  useEffect(() => {
    getList({ page: 1 })
    setPage(1)
  }, [])
  const getList = async (params) => {
    if (!params) {
      params = {}
    }

    if (params.page === undefined) {
      params.page = page
    }
    const queries = []
    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)
    if (search !== '') {
      queries.push(`except=${search}`)
    }
    queries.push(`rank_id=${onId}`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/rank/artist/top${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return

    if (res.data.value.items.length === undefined) {
      const arr = []
      arr.push(res.data.value.items)
      res.data.value.items = arr
    }

    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => listTab.push(value))
      setListTab([...listTab])
    } else {
      setListTab(res.data.value.items)
    }
  }
  const modify = async () => {
    const data = {
      rank_id: isDelete.rank,
      artist_id: isDelete.artist,
      status: -1,
    }
    const res = await axios
      .post(`/api/rank/artist`, data, headerConfig)
      .catch((err) => statusCatch(err))

    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }
  const del = async () => {
    const res = await axios
      .delete(`/api/rank/artist/top?rank_id=${onId}&exclude=${search}`)
      .catch((err) => statusCatch(err))

    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }
  const modalOkEvent = (value) => {
    if (value) {
      setIsDelete(false)
      modify()
    } else {
      setIsDelete(false)
    }
  }

  const searchEventHandler = (bool) => {
    if (bool) {
      del()
      setIsSearch(false)
    } else {
      setIsSearch(false)
    }
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody className="form-body">
        <CCol className="d-flex flex-row align-items-center">
          <label className="me-3">순위 제외​</label>
          <CInputGroup style={{ width: '80%' }}>
            <CFormInput
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
              onKeyPress={(e) => {
                let ch = String.fromCharCode(e.which)
                if (!/[0-9]/.test(ch)) {
                  e.preventDefault()
                }
              }}
              placeholder="내용을 입력하세요 "
            />
            <CButton
              onClick={() => {
                setIsSearch(true)
              }}
              type="button"
              color="primary"
              id="basic-addon1"
            >
              미만제외​
            </CButton>
          </CInputGroup>
        </CCol>

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
            {listTab !== null && listTab !== undefined ? (
              listTab.map((value, index) => {
                return (
                  <CTableRow key={index} className="text-center">
                    <CTableDataCell
                      scope="row"
                      className="artist-img-dom"
                      onClick={() => console.log(value)}
                    >
                      <span>{index + 1}위</span>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex flex-row align-items-center justify-content-center">
                        <CImage
                          onClick={() =>
                            setIsImg({
                              use: true,
                              img: process.env.REACT_APP_IMG + value.img_artist.main,
                            })
                          }
                          style={{
                            borderRadius: '55%',
                            width: '40px',
                            height: '40px',
                            objectFit: 'cover',
                          }}
                          src={
                            value.img_artist !== null
                              ? process.env.REACT_APP_IMG + value.img_artist.main
                              : ''
                          }
                          onError={(e) => (e.target.src = '/icon.png')}
                        />
                        <span className="ms-2">
                          {value.name_artist !== null ? value.name_artist.ko : '정보가 없습니다.'}
                        </span>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell scope="row" className="artist-img-dom">
                      <span>{value.group_code === null ? '' : value.group_code}</span>
                    </CTableDataCell>
                    <CTableDataCell
                      scope="row"
                      className="text-info cursor"
                      onClick={() =>
                        setIsTotalVote({
                          use: true,
                          artist: value.artist_id,
                          rank: value.rank_id,
                        })
                      }
                    >
                      <span>{value.total_point}표</span>
                    </CTableDataCell>
                    <CTableDataCell scope="row" className="text-info cursor">
                      <CButton
                        onClick={() => {
                          setIsDelete({ use: true, artist: value.artist_id, rank: value.rank_id })
                        }}
                        color="danger"
                        className="text-white"
                      >
                        제외​
                      </CButton>
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
              getList({
                page: page + 1,
              })
              setPage(page + 1)
            }}
          >
            더보기
          </CButton>
        )}
      </CModalBody>
      {isDelete.use && (
        <CheckPopup
          onClickClose={() => setIsDelete({ use: false, artist: '', rank: '' })}
          bodyContent={'순위에서 제외 하시겠습니까?'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isSearch && (
        <CheckPopup
          onClickClose={() => setIsSearch(false)}
          bodyContent={`${search} 순위 미만을 제외 하시겠습니까?`}
          onCheked={(value) => searchEventHandler(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => onClickClose()}
          bodyContent={'해당 순위가 제외되었습니다.'}
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
      {isTotalVote.use && (
        <TotalVote
          onClickClose={() =>
            setIsTotalVote({
              use: false,
              artist: '',
              rank: '',
            })
          }
          artistId={isTotalVote.artist}
          rankId={isTotalVote.rank}
        />
      )}
    </CModal>
  )
}

TopRanker.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.number.isRequired,
}
