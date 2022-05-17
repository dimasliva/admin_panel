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
} from '@coreui/react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { headerConfig } from '../../../static/axiosConfig'
import { statusCatch } from '../../../static/axiosCatch'
import moment from 'moment'
const tableTitle = [{ label: '구분​' }, { label: '닉네임 변경 정보​' }, { label: '변경일​​' }]

export const NickNameLog = ({ onClickClose, onId }) => {
  const [listTabNickname, setListTabNickname] = useState([])
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  useEffect(() => {
    getNicknameLog()
  }, [])
  const getNicknameLog = async (params) => {
    if (!params) {
      params = {}
    }
    if (params.page === undefined) {
      params.page = page
    }
    const queries = []
    if (params.page > 1) {
      queries.push(`page=1`)
      queries.push(`limit=${20 * params.page}`)
    } else {
      queries.push(`page=${params.page}`)
      queries.push(`limit=20`)
    }
    queries.push(`user_id=${onId}`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/user/action/nickname${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => {
        listTabNickname.push(value)
      })
      setListTabNickname([...listTabNickname])
      return
    } else {
      setListTabNickname(res.data.value.items)
    }
  }

  return (
    <CModal visible={true} alignment="center" onClose={onClickClose}>
      <CModalBody className="form-body">
        <CTable bordered className="mt-3 text-center">
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
            {listTabNickname.length !== 0 && listTabNickname !== undefined ? (
              listTabNickname.map((value, index) => {
                // date
                const startedDay = {
                  day:
                    value.created_at !== null ? moment(value.created_at).format('YYYY-MM-DD') : '',
                  time:
                    value.created_at !== null ? moment(value.created_at).format('HH:mm:ss') : '',
                }
                if (value.action_title === '닉네임 변경' && value.paid === 0) {
                  value.action_title = '무료'
                } else if (value.action_title === '닉네임 변경' && value.paid > 0) {
                  value.action_title = '유료'
                }
                return (
                  <CTableRow key={index}>
                    <CTableDataCell scope="row" className="artist-img-dom">
                      <div className="d-flex align-items-center">
                        <span>{value.action_title}</span>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <span>{value.old_nickname}</span>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div className="d-flex flex-column align-items-center">
                        <span>{startedDay.day}</span>
                        <br />
                        <span>{startedDay.time}</span>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                )
              })
            ) : (
              <CTableRow className="border-1">
                <CTableDataCell className="border-0" />
                <CTableDataCell className="border-0 text-center">데이터가 없습니다</CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
        {page !== pages && (
          <CButton
            color="dark"
            size="sm"
            className="moreBt"
            onClick={() => {
              getNicknameLog({
                page: page + 1,
              })
              setPage(page + 1)
            }}
          >
            더보기
          </CButton>
        )}
      </CModalBody>
    </CModal>
  )
}

NickNameLog.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.number.isRequired,
}
