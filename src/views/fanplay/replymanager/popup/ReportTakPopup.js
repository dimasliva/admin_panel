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
import { UserDetail } from 'src/views/member/popup/UserDetail'
import PropTypes from 'prop-types'
import { statusCatch } from 'src/static/axiosCatch'
import moment from 'moment'

export const ReportTakPopup = ({ onClickClose, onId, onId2 }) => {
  const [list, setList] = useState(null)
  const [page, setPage] = useState(1)
  const [userInfo, setUserInfo] = useState({
    use: false,
    id: '',
  })
  const [pages, setPages] = useState(1)
  // Report List
  const getList = async (params) => {
    /*
     * If you click "Report More", the page count will increase.
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
    if (onId !== '') queries.push(`reply_id=${onId}`)
    queries.push(`play_id=${onId2}`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios
      .get(`/api/fan/play/report/query${queryStr}`, headerConfig)
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
                <CTableHeaderCell scope="col">신고날짜</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {list !== null && list !== undefined ? (
                list.map((value, index) => {
                  const writerAvatar = value.avatar
                  let img1 = ''
                  if (img1 !== null) img1 = process.env.REACT_APP_IMG + writerAvatar
                  const craetedDay = {
                    day:
                      value.created_at !== null
                        ? moment(value.created_at).format('YYYY-MM-DD')
                        : '',
                    time:
                      value.created_at !== null ? moment(value.created_at).format('HH:mm:ss') : '',
                  }
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell
                        scope="row"
                        className="artist-img-dom cursor"
                        onClick={() => {
                          setUserInfo({
                            id: value.user_id,
                            use: true,
                          })
                        }}
                      >
                        <div className="d-flex flex-row align-items-center">
                          <div className="artist-img-dom__img-border">
                            <CImage
                              className="artist-img-dom__img-border__profile"
                              src={img1}
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
                      <CTableDataCell scope="row">
                        <div className="d-flex flex-column align-items-center">
                          <span>{craetedDay.day}</span>
                          <br />
                          <span>{craetedDay.time}</span>
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
      </CModal>
    </>
  )
}

ReportTakPopup.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.number,
  onId2: PropTypes.number,
}
