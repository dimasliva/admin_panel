import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableHeaderCell,
  CTableHead,
  CTableBody,
  CRow,
  CImage,
  CTableDataCell,
  CButton,
  CModalBody,
  CModal,
  CTableRow,
} from '@coreui/react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import { UserDetail } from '../../../member/popup/UserDetail'
import { ImgBig } from '../../../../components/publicPopup/ImgBig'
const EditThekFollower = ({ onClickClose }) => {
  const [listTab, setListTab] = useState(null)
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
    getList({ page: 1 })
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
    queries.push(`status=1`)
    queries.push(`type=2`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/fan/play/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (!res.data.success) return
    if (params.page > 1) {
      res.data.value.items.map((value) => listTab.push(value))
      setListTab([...listTab])
      return
    }
    setListTab(res.data.value.items)
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CTable className="m-auto">
            <CTableHead>
              <CTableHeaderCell>
                <CTableHeaderCell className="border-1 text-center p-3 w-25 bg-light">
                  덕킹 팔로워 정보
                </CTableHeaderCell>
              </CTableHeaderCell>
            </CTableHead>
            <CTableBody>
              {listTab !== null && listTab !== undefined ? (
                listTab.map((value, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell className="py-4 w-100 border-1 text-center d-flex flex-row justify-content-center align-items-center">
                        <div>
                          <CImage
                            onClick={() => {
                              setIsImg({
                                use: true,
                                img:
                                  value.img_artist === null
                                    ? ''
                                    : value.img_artist.main === ''
                                    ? process.env.REACT_APP_IMG + value.img_artist.sup
                                    : process.env.REACT_APP_IMG + value.img_artist.main,
                              })
                            }}
                            style={{
                              width: '45px',
                              borderRadius: '50%',
                              cursor: 'pointer',
                            }}
                            src={
                              value.img_artist === null
                                ? ''
                                : value.img_artist.main === ''
                                ? process.env.REACT_APP_IMG + value.img_artist.sup
                                : process.env.REACT_APP_IMG + value.img_artist.main
                            }
                            onError={(e) => (e.target.src = '/icon.png')}
                          />
                          <span
                            className="text-info cursor"
                            onClick={() => {
                              setUserInfo({
                                use: true,
                                id: value.user_id,
                              })
                            }}
                            style={{ marginLeft: '20px' }}
                          >
                            {value.name_artist === null
                              ? ''
                              : value.name_artist.ko === ''
                              ? value.name_artist.etc
                              : value.name_artist.ko}
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
        </CRow>
        <CRow>
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
        </CRow>
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
EditThekFollower.propTypes = {
  onClickClose: PropTypes.func.isRequired,
}

export default EditThekFollower
