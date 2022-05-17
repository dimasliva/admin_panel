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
import { headerConfig } from '../../../static/axiosConfig'
import { statusCatch } from '../../../static/axiosCatch'
import { UserDetail } from '../../member/popup/UserDetail'
import { ImgBig } from '../../../components/publicPopup/ImgBig'

const tableTitle = [{ label: '사용자 정보' }, { label: '투표수' }]

export const ArtistVotingDetail = ({ onClickClose, onId }) => {
  const [listTab1, setListTab1] = useState(null)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [userInfo, setUserInfo] = useState({
    use: false,
    id: '',
  })
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  })
  useEffect(() => {
    getList()
  }, [])
  const getList = async (params) => {
    if (!params) {
      params = {}
    }

    if (params.page === undefined) {
      params.page = page
    }

    const queries = []
    if (params.page > 1) {
      queries.push(`page=1`)
      queries.push(`limit=${30 * params.page}`)
    } else {
      queries.push(`page=${params.page}`)
      queries.push(`limit=30`)
    }
    queries.push(`artist_id=${onId}`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios
      .get(`/api/artist/vote/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (params.isSort !== undefined) {
      if (params.isSort) {
        setListTab1(res.data.value.items)
      }
    } else {
      if (params.page > 1) {
        res.data.value.items.map((value) => listTab1.push(value))
        setListTab1([...listTab1])
      } else {
        setListTab1(res.data.value.items)
      }
    }
  }
  return (
    <CModal visible={true} onClose={onClickClose}>
      <CModalHeader>
        <CModalTitle>시즌 투표 사용자</CModalTitle>
      </CModalHeader>
      <CModalBody className="form-body">
        <CTable bordered className="mt-3">
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
            {listTab1 !== null && listTab1 !== undefined ? (
              listTab1.map((value, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">
                      <div>
                        <CImage
                          onClick={() =>
                            setIsImg({
                              use: true,
                              img: process.env.REACT_APP_IMG + value.user_profile_img,
                            })
                          }
                          className="cursor"
                          style={{ width: '40px', height: '40px', marginRight: '10px' }}
                          src={process.env.REACT_APP_IMG + value.user_profile_img}
                          alt=""
                          onError={(e) => (e.target.src = '/icon.png')}
                        />
                        <span
                          onClick={() => {
                            setUserInfo({
                              use: true,
                              id: value.user_id,
                            })
                          }}
                          className="cursor text-info"
                        >
                          {value.user_nickname === null ? '' : value.user_nickname}
                        </span>
                      </div>
                    </CTableHeaderCell>
                    <CTableDataCell>{value.total_point}표</CTableDataCell>
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

ArtistVotingDetail.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.number.isRequired,
}
