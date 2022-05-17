import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CCol,
  CFormInput,
  CFormTextarea,
  CImage,
  CInputGroup,
  CModal,
  CModalBody,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'
import { UserDetail } from 'src/views/member/popup/UserDetail'
import EditImageDetail from '../../EditImageDetail'
import moment from 'moment'
const ContentsPage = ({ onClickClose, onId }) => {
  const imgStyleRectangle = {
    width: '40px',
    height: '60px',
    objectFit: 'contain',
    marginRight: '10px',
  }
  const imgStyleBigRectangle = {
    width: '110px',
    height: '150px',
    objectFit: 'contain',
    marginRight: '10px',
  }
  // data
  const [list, setList] = useState({
    avatar: null,
    nickname: null,
    created_at: null,
    img_artist: {
      main: '',
    },
    name_artist: {
      ko: null,
    },
    title_play: null,
    body_play: null,
    img_play: [
      {
        url: '',
      },
    ],
    link_play: null,
    type: 0,
  })
  const [imgCount, setImgCount] = useState(0)
  const [userInfo, setUserInfo] = useState({
    use: false,
    id: '',
  }) // User Information Popup
  const [isImageDetail2, setIsImageDetail2] = useState({
    use: false,
    imgs: [],
  }) // img detail Popup
  useEffect(() => {
    getList()
  }, [])

  // Content data
  const getList = async () => {
    const res = await axios
      .get(`/api/fan/play?id=${onId}`, headerConfig)
      .catch((err) => statusCatch(err))
    console.log(res.data.value)
    if (!res.data.success) return

    if (res.data.value.img_play === '') {
      const url = [
        {
          url: '',
        },
      ]
      res.data.value.img_play = url
    } else {
      if (res.data.value.img_play.ko) {
        const url = []
        url.push({ url: res.data.value.img_play.ko })
        url.push({ url: res.data.value.img_play.ch })
        url.push({ url: res.data.value.img_play.es })
        url.push({ url: res.data.value.img_play.en })
        url.push({ url: res.data.value.img_play.jp })
        res.data.value.img_play = url
      }
    }
    if (res.data.value.img_artist === '' || res.data.value.img_artist === null) {
      const url = {
        main: '',
      }
      res.data.value.img_artist = url
    }
    if (res.data.value.img_play[0].url === '') {
      setImgCount(0)
    } else {
      setImgCount(res.data.value.img_play.length)
    }
    setList(res.data.value)
  }

  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol sm={10} className="ps-4 py-4">
            {/*Circle img*/}
            <CCol>
              <span className="my-2">콘텐츠 형태</span>
              <div
                className="artist-img-dom mt-3"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <div className="artist-img-dom__img-border">
                  <CImage
                    className="artist-img-dom__img-border__profile"
                    src={process.env.REACT_APP_IMG + list.avatar}
                    alt=""
                    onError={(e) => (e.target.src = '/icon.png')}
                  />
                </div>
                <span
                  className="cursor"
                  onClick={() => {
                    setUserInfo({
                      use: true,
                      id: list.user_id,
                    })
                  }}
                  style={{ color: 'blue' }}
                >
                  {list.nickname === null ? '' : list.nickname}
                </span>
              </div>
            </CCol>
            {/*Date*/}
            <CCol>
              <CCol className="d-flex flex-column mt-2 text-black fw-bold mt-3" sm={4}>
                <span>
                  {list.created_at !== null
                    ? moment(list.created_at).format('YYYY-MM-DD HH:mm:ss')
                    : ''}
                </span>
              </CCol>
            </CCol>
            {/*Square img*/}
            <CCol className="my-4">
              <span className="my-2">게시물 내용</span>
              <div className="d-flex flex-row align-items-center mt-3 ms-4">
                <CImage
                  style={imgStyleRectangle}
                  src={process.env.REACT_APP_IMG + list.img_artist.main}
                  onError={(e) => (e.target.src = '/icon.png')}
                />
                <span className="fw-bold">
                  {list.name_artist === null ? '' : list.name_artist.ko}​
                </span>
              </div>
            </CCol>
            {/*Input form*/}
            <CCol className="d-flex flex-row my-4">
              <label className="me-1" style={{ width: '7%' }}>
                제목​​
              </label>
              {list.title_play !== null ? (
                <CFormInput defaultValue={list.title_play} />
              ) : (
                <CFormInput placeholder="내용이 없습니다." readOnly={true} />
              )}
            </CCol>
            {/*TextArea form*/}
            <CCol className="d-flex flex-row my-4">
              <label className="me-1" style={{ width: '7%' }}>
                내용​​
              </label>
              {list.body_play !== null ? (
                <CFormTextarea
                  style={{ resize: 'none', height: '200px' }}
                  defaultValue={list.body_play}
                />
              ) : (
                <CFormTextarea
                  style={{ resize: 'none', height: '200px' }}
                  placeholder="내용이 없습니다."
                  readOnly={true}
                />
              )}
            </CCol>
            {/*Image form*/}
            <CCol className="d-flex flex-row my-4">
              <label className="me-1" style={{ width: '7%' }}>
                콘텐츠​
              </label>
              <div className="border border-1 py-2 px-5 d-flex flex-column align-items-center justify-content-center">
                <CImage
                  className="cursor"
                  style={imgStyleBigRectangle}
                  src={process.env.REACT_APP_IMG + list.img_play[0].url}
                  onClick={() => {
                    if (imgCount !== 0) {
                      setIsImageDetail2({ use: true, imgs: list.img_play })
                    }
                  }}
                  onError={(e) => (e.target.src = '/icon.png')}
                />
                <div style={{ color: 'blue', cursor: 'pointer' }}>
                  ({imgCount === 0 ? 0 : 1}/{imgCount})​
                </div>
              </div>
            </CCol>
            {/*Input ref*/}
            {list.type === 1 || list.type === 2 ? (
              <CCol>
                <CInputGroup>
                  <label className="me-2" style={{ width: '7%' }}>
                    링크​
                  </label>
                  {list.link_play === null ? (
                    <span style={{ color: 'red' }}>등록된 링크가 없습니다.</span>
                  ) : (
                    <a href={list.link_play} target="_blank" rel="noreferrer">
                      {list.link_play}
                    </a>
                  )}
                </CInputGroup>
              </CCol>
            ) : (
              <div />
            )}
          </CCol>
        </CRow>
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
      {isImageDetail2.use && (
        <EditImageDetail
          onClickClose={() =>
            setIsImageDetail2({
              use: false,
              imgs: [],
            })
          }
          onImgs={isImageDetail2.imgs}
        />
      )}
    </CModal>
  )
}
ContentsPage.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.number.isRequired,
}

export default ContentsPage
