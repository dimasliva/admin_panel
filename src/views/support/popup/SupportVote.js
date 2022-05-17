import React, { useEffect, useState } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CTable,
  CTableRow,
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CImage,
} from '@coreui/react'
import axios from 'axios'
import { headerConfig } from '../../../static/axiosConfig'
import { UserDetail } from 'src/views/member/popup/UserDetail'
import PropTypes from 'prop-types'
import { statusCatch } from 'src/static/axiosCatch'

export const SupportVote = ({ onClickClose, onId }) => {
  const [userInfo, setUserInfo] = useState({
    use: false,
    id: '',
  }) // User Information Modal
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  // Vote List
  const getList = async (params) => {
    /*
     * If you click "View More", the page count will increase.
     * Import additional data and add it to the list.
     */
    if (!params) {
      params = {}
    }

    const queries = []
    if (params.page === undefined) {
      params.page = page
    }
    queries.push(`page=${params.page}`)
    queries.push(`limit=30`)
    queries.push(`support_id=${onId}`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios
      .get(`/api/fan/support/vote/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)

    if (params.page > 1) {
      res.data.value.items.map((value) => {
        list.push(value)
      })
      setList([...list])
      return
    }
    setList(res.data.value.items)
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <>
      <CModal visible={true} onClose={onClickClose}>
        <CModalBody>
          <CTable bordered className="table-text-center">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">참여자</CTableHeaderCell>
                <CTableHeaderCell scope="col">참여수</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {list !== null && list !== undefined ? (
                list.map((value, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell
                        scope="row"
                        className="artist-img-dom cursor"
                        onClick={() => {
                          setUserInfo({
                            use: true,
                            id: value.user_id,
                          })
                        }}
                      >
                        <div className="d-flex flex-row align-items-center">
                          <div className="artist-img-dom__img-border">
                            <CImage
                              className="artist-img-dom__img-border__profile"
                              src={process.env.REACT_APP_IMG + value.avatar}
                              alt=""
                              onError={(e) => (e.target.src = '/icon.png')}
                            />
                          </div>
                          <span className="cursor style-color-blue">
                            {value.nickname && value.nickname.length > 9
                              ? value.nickname.substr(0, 9) + '...'
                              : value.nickname}
                          </span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row">{value.use_point + ' p'}</CTableDataCell>
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
      </CModal>
    </>
  )
}

SupportVote.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.number.isRequired,
}
