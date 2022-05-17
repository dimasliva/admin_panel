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
import { UserDetail } from '../../../member/popup/UserDetail'
import { ImgBig } from '../../../../components/publicPopup/ImgBig'

const TotalVote = ({ onClickClose, artistId, rankId, onId }) => {
  const tableTitle = [{ label: '사용자 정보​' }, { label: '투표수​' }]
  const [pages, setPages] = useState(1)
  const [listTab, setListTab] = useState(null)
  const [page, setPage] = useState(1)
  const [userInfo, setUserInfo] = useState({
    use: false,
    id: '',
  })
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  }) // img detail
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
    if (rankId !== undefined && artistId !== undefined) {
      queries.push(`rank_id=${rankId}`)
      queries.push(`artist_id=${artistId}`)
    } else {
      queries.push(`rank_id=${onId}`)
    }
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/rank/vote/query${queryStr}`, headerConfig)
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
                console.log(value)
                return (
                  <CTableRow key={index}>
                    <CTableHeaderCell>
                      <div className="d-flex flex-row justify-content-center align-items-center">
                        <CImage
                          className="cursor"
                          onClick={() => {
                            setIsImg({
                              use: true,
                              img:
                                value.avatar !== ''
                                  ? process.env.REACT_APP_IMG + value.avatar
                                  : '/icon.png',
                            })
                          }}
                          style={{
                            borderRadius: '55%',
                            width: '40px',
                            height: '40px',
                            objectFit: 'cover',
                          }}
                          src={process.env.REACT_APP_IMG + value.avatar}
                          alt=""
                          onError={(e) => (e.target.src = '/icon.png')}
                        />
                        <span
                          className="ms-2 text-info cursor"
                          onClick={() => {
                            setUserInfo({
                              use: true,
                              id: value.user_id,
                            })
                          }}
                        >
                          {value.nickname}
                        </span>
                      </div>
                    </CTableHeaderCell>
                    <CTableDataCell>{value.vote_point}표</CTableDataCell>
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

TotalVote.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  artistId: PropTypes.number.isRequired || PropTypes.string.isRequired,
  rankId: PropTypes.number.isRequired || PropTypes.string.isRequired,
  onId: PropTypes.number.isRequired || PropTypes.string.isRequired,
}

export default TotalVote
