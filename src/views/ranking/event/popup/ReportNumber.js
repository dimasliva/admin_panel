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
} from '@coreui/react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import moment from 'moment'
import { UserDetail } from 'src/views/member/popup/UserDetail'

const ReportNumber = ({ onClickClose, onId }) => {
  const tableTitle = [{ label: '사용자 정보​' }, { label: '신고날짜' }]
  const [userInfo, setUserInfo] = useState({
    use: false,
    id: '',
  })
  const [listTab, setListTab] = useState(null)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)
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
    queries.push(`reply_id=${onId}`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/artist/reply/report/user${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => listTab.push(value))
      setListTab([...listTab])
    } else {
      setListTab(res.data.value.items)
    }
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody className="form-body">
        <CTable bordered className="mt-3">
          <CTableHead>
            <CTableRow>
              {tableTitle.map((title, index) => {
                return (
                  <CTableHeaderCell scope="col" className="text-center" key={index}>
                    {title.label}
                  </CTableHeaderCell>
                )
              })}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {listTab !== null && listTab !== undefined ? (
              listTab.map((value, index) => {
                const created = {
                  date:
                    value.created_at === null ? '' : moment(value.created_at).format('YYYY-MM-DD'),
                  time:
                    value.created_at === null ? '' : moment(value.created_at).format('HH:mm:ss'),
                }
                return (
                  <CTableRow key={index}>
                    <CTableHeaderCell
                      onClick={() => {
                        setUserInfo({
                          use: true,
                          id: value.from_user_id,
                        })
                      }}
                    >
                      <div className="cursor d-flex flex-row justify-content-center align-items-center">
                        <CImage
                          style={{
                            borderRadius: '55%',
                            width: '40px',
                            height: '40px',
                            objectFit: 'cover',
                          }}
                          src={process.env.REACT_APP_IMG + value.avatar}
                        />
                        <span className="ms-2 text-info">{value.nickname}</span>
                      </div>
                    </CTableHeaderCell>
                    <CTableDataCell>
                      <div className="d-flex flex-column align-items-center justify-content-center">
                        <span>{created.date}</span>
                        <span>{created.time}​</span>
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
          onId={userInfo.id}
          onCloseOkEvent={() => {
            setUserInfo({
              ...userInfo,
              use: false,
            })
            getList({ page: 1 })
            setPage(1)
          }}
        />
      )}
    </CModal>
  )
}

ReportNumber.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.number.isRequired,
}

export default ReportNumber
