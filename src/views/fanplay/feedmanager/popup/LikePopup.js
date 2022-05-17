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
import { headerConfig } from 'src/static/axiosConfig'
import PropTypes from 'prop-types'
import { statusCatch } from 'src/static/axiosCatch'
import { UserDetail } from 'src/views/member/popup/UserDetail'

export const LikePopup = ({ onClickClose, onId, onId2 }) => {
  const [userInfo, setUserInfo] = useState({
    use: false,
    id: '',
  })
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  // List
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
    queries.push(`play_id=${onId}`)

    if (onId2 !== '') queries.push(`reply_id=${onId2}`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios
      .get(`/api/fan/play/like/query${queryStr}`, headerConfig)
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
                <CTableHeaderCell scope="col">사용자 정보</CTableHeaderCell>
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
                        onClick={() =>
                          setUserInfo({
                            use: true,
                            id: value.user_id,
                          })
                        }
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <div
                            className="artist-img-dom__img-border"
                            style={{ borderRadius: 'inherit' }}
                          >
                            <CImage
                              className="artist-img-dom__img-border__profile"
                              src={
                                value.avatar === null
                                  ? ''
                                  : process.env.REACT_APP_IMG + value.avatar
                              }
                              alt=""
                              onError={(e) => (e.target.src = '/icon.png')}
                            />
                          </div>
                          <div>
                            <span className="style-color-blue cursor">
                              {value.nickname && value.nickname.length > 9
                                ? value.nickname.substr(0, 9) + '...'
                                : value.nickname}
                            </span>
                          </div>
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

LikePopup.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.number.isRequired,
  onId2: PropTypes.number,
}
