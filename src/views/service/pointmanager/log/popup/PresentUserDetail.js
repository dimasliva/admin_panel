import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalBody,
  CCol,
  CRow,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CImage,
  CButton,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { UserDetail } from '../../../../member/popup/UserDetail'
import axios from 'axios'
import { headerConfig } from '../../../../../static/axiosConfig'
import { statusCatch } from '../../../../../static/axiosCatch'
import { ImgBig } from '../../../../../components/publicPopup/ImgBig'

export const PresentUserDetail = ({ onClickClose, onId }) => {
  const [isUserInfo, setIsUserInfo] = useState({ use: false, id: '' }) // Detail Popup
  const [list, setList] = useState([]) // Detail Popup
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  })
  const tableLog = [{ label: 'CID​' }, { label: '사용자 정보​' }, { label: '포인트수​' }]
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
    queries.push(`id=${onId}`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios
      .get(`/api/point/operation/detail${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => list.push(value))
      setList([...list])
    } else {
      setList(res.data.value.items)
    }
    setList(res.data.value.items)
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalHeader>
        <CModalTitle>사용자 정보</CModalTitle>
      </CModalHeader>
      <CModalBody className="form-body">
        <CRow className="mb-3">
          <CCol sm={12}>
            <CTable bordered>
              <CTableHead>
                <CTableRow>
                  {tableLog.map((title, index) => {
                    return (
                      <CTableHeaderCell className="text-center" scope="col" key={index}>
                        {title.label}
                      </CTableHeaderCell>
                    )
                  })}
                </CTableRow>
              </CTableHead>
              {/*Table body*/}
              <CTableBody>
                {list !== null && list !== undefined ? (
                  list.map((value, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableDataCell scope="row" className="text-break">
                          <div className="d-flex flex-row align-items-center">
                            <span>{value.cid}</span>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell className="text-break">
                          <div className="d-flex flex-row align-items-center justify-content-start">
                            <div className="d-flex flex-row align-items-center">
                              <CImage
                                onClick={() => {
                                  setIsImg({
                                    use: true,
                                    img: process.env.REACT_APP_IMG + value.avatar,
                                  })
                                }}
                                className="cursor"
                                style={{
                                  borderRadius: '50%',
                                  width: '50px',
                                  height: '50px',
                                  marginRight: '10px',
                                }}
                                onError={(e) => (e.target.src = '/icon.png')}
                                src={process.env.REACT_APP_IMG + value.avatar}
                              />
                              <span
                                onClick={() => {
                                  setIsUserInfo({ use: true, id: value.user_id })
                                }}
                                style={{ color: 'blue', cursor: 'pointer' }}
                              >
                                {value.nickname}
                              </span>
                            </div>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell className="text-break">
                          <div className="d-flex flex-row align-items-center justify-content-center">
                            <span>
                              {value.type === 1
                                ? '하트포인트_1'
                                : value.type === 2
                                ? '하트포인트_2'
                                : value.type === 3
                                ? '스타포인트'
                                : value.type === 4
                                ? 'gold_point'
                                : '캐시포인트'}{' '}
                              ({value.count})​
                            </span>
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
                  getList({ page: page + 1 })
                  setPage(page + 1)
                }}
              >
                더보기
              </CButton>
            )}
          </CCol>
        </CRow>
      </CModalBody>
      {isUserInfo.use && (
        <UserDetail
          onClickClose={() => setIsUserInfo({ use: false, id: '' })}
          onId={isUserInfo.id}
          onCloseOkEvent={() => {
            setIsUserInfo({ use: false, id: '' })
            getList({ page: 1 })
          }}
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
    </CModal>
  )
}

PresentUserDetail.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.number.isRequired,
}
