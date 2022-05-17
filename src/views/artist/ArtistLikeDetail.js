import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CImage,
} from '@coreui/react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { UserDetail } from '../member/popup/UserDetail'
import { statusCatch } from 'src/static/axiosCatch'
import moment from 'moment'

const tableTitle = [{ label: '사용자 정보' }, { label: '등록일' }]

export const ArtistLikeDetail = ({ onClickClose, onId }) => {
  const [isUserInfoModal, setIsUserInfoModal] = useState({
    use: false,
    id: '',
  })
  const [list, setList] = useState(null)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  useEffect(() => {
    getList()
  }, [])

  const getList = async (params) => {
    if (!params) {
      params = {}
    }

    const queries = []
    if (params.page === undefined) {
      params.page = page
    }

    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)
    queries.push(`artist_id=${onId}`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios
      .get(`/api/artist/favorite/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => list.push(value))
      setList([...list])
      return
    }
    setList(res.data.value.items)
  }

  return (
    <CModal visible={true} onClose={onClickClose}>
      <CModalHeader>
        <CModalTitle>최애 등록 사용자</CModalTitle>
      </CModalHeader>
      <CModalBody className="form-body">
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
                const craetedDay = {
                  day: moment(value.created_at).format('YYYY-MM-DD'),
                  time: moment(value.created_at).format('HH:mm:ss'),
                }
                return (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">
                      <div
                        onClick={() =>
                          setIsUserInfoModal({
                            use: true,
                            id: value.user_id,
                          })
                        }
                      >
                        <CImage
                          style={{ width: '40px', height: '40px', marginRight: '10px' }}
                          src={process.env.REACT_APP_IMG + value.avatar}
                          alt=""
                          onError={(e) => (e.target.src = '/icon.png')}
                        />
                        <span className="cursor text-info">
                          {value.user_nickname === null ? '' : value.user_nickname}
                        </span>
                      </div>
                    </CTableHeaderCell>
                    <CTableDataCell>
                      {craetedDay.day}
                      <br /> {craetedDay.time}
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
              getList({ page: page + 1 })
              setPage(page + 1)
            }}
          >
            더보기
          </CButton>
        )}
      </CModalBody>
      {isUserInfoModal.use && (
        <UserDetail
          onClickClose={() =>
            setIsUserInfoModal({
              ...isUserInfoModal,
              use: false,
            })
          }
          onId={isUserInfoModal.id}
        />
      )}
    </CModal>
  )
}

ArtistLikeDetail.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.number.isRequired,
}
