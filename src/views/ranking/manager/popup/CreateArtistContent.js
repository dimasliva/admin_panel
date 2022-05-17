import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCol,
  CFormInput,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
} from '@coreui/react'
import { CheckPopup } from '../../../../components/publicPopup/CheckPopup'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import { NormalPopup } from '../../../../components/publicPopup/NormalPopup'

const CreateArtistContents = ({ onClickClose, onClickSaveClose, rankId }) => {
  // MoDal
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isCreateArtist, setIsCreateArtist] = useState(false) // Create Modal
  // Artist search
  const [keyword, setKeyword] = useState('')
  // Artist Info
  const [artistInfo, setArtistInfo] = useState({
    isSave: false,
    groupCode: '',
    artistName: '',
    img: {
      main: '',
      sup: '',
    },
  })

  /**
   * artist Information
   * code_artist Search
   */
  const getArtist = async () => {
    if (keyword === '') {
      alert('코드를 입력해주세요.')
      return
    }
    const res = await axios
      .get(`/api/artist/query?search_type=code_artist&search_word=${keyword}&status=1`)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return

    // If you can't find the artist, block.
    if (res.data.value.items.length === 0) {
      alert('존재하지 않는 코드입니다.')
      return
    }

    setArtistInfo({
      artistId: res.data.value.items[0].id,
      groupCode: res.data.value.items[0].group_code,
      artistName:
        res.data.value.items[0].name_artist.ko !== ''
          ? res.data.value.items[0].name_artist.ko
          : res.data.value.items[0].name_artist.etc,
      img: {
        main: res.data.value.items[0].img_artist.main,
        sup: res.data.value.items[0].img_artist.sup,
      },
      isSave: true,
    })
  }

  // ============================== Create =======================
  /**
   * Add Artist
   */
  const addArtist = async () => {
    // If there is no search, stop.
    if (!artistInfo.isSave) {
      alert('아티스트를 검색해 주세요.')
      return
    }

    const data = {
      rank_id: rankId,
      artist_id: artistInfo.artistId,
      status: 1,
    }

    const res = await axios
      .post(`/api/rank/artist`, data, headerConfig)
      .catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }

  /**
   * @param {*} bool = boolean
   * true = create artist
   * false = block
   */
  const modalCreateEvent = (bool) => {
    if (bool) {
      setIsCreateArtist(false)
      addArtist()
    } else {
      setIsCreateArtist(false)
    }
  }

  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol sm={12}>
            <CCol className="mb-5">
              <span className="my-2">아티스트 콘텐츠​</span>
              <CCol className="d-flex flex-column mt-3">
                <div className="d-flex flex-row align-items-center search-artist-content">
                  <label style={{ width: '100px' }}>코드</label>
                  <CFormInput
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{ width: '50%' }}
                  />
                  <CButton
                    className="text-nowrap"
                    style={{ width: '98px' }}
                    onClick={() => getArtist()}
                  >
                    불러오기
                  </CButton>
                </div>
                <div className="d-flex flex-row my-2 align-items-center">
                  <label style={{ width: '100px' }}>그룹코드​</label>
                  <CFormInput
                    style={{ width: '64%' }}
                    defaultValue={artistInfo.groupCode}
                    disabled
                  />
                </div>
                <div className="d-flex flex-row align-items-center">
                  <label style={{ width: '100px' }}>아티스트명</label>
                  <CFormInput
                    style={{ width: '64%' }}
                    defaultValue={artistInfo.artistName}
                    disabled
                  />
                </div>
              </CCol>
            </CCol>
            <CCol className="mb-5 d-flex flex-column">
              <div className="mb-4">아티스트 이미지​</div>
              <CCol>
                <CImage
                  style={{ width: '150px', height: '150px' }}
                  src={
                    artistInfo.img.main !== ''
                      ? process.env.REACT_APP_IMG + artistInfo.img.main
                      : ''
                  }
                  onError={(e) => (e.target.src = '/icon.png')}
                />
                <CImage
                  style={{ width: '150px', height: '150px', marginLeft: '50px' }}
                  className="me-4"
                  src={
                    artistInfo.img.sup !== '' ? process.env.REACT_APP_IMG + artistInfo.img.sup : ''
                  }
                  onError={(e) => (e.target.src = '/icon.png')}
                />
              </CCol>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="pe-5">
        <div>
          <CButton
            onClick={() => onClickClose()}
            style={{ color: 'black', marginRight: '10px' }}
            color="light"
            className="form-footer__btn"
          >
            닫기
          </CButton>
          <CButton
            className="form-footer__btn px-5"
            style={{ color: 'white' }}
            onClick={() => setIsCreateArtist(true)}
          >
            저장하기
          </CButton>
        </div>
      </CModalFooter>
      {/*  Add Artist  */}
      {isCreateArtist && (
        <CheckPopup
          onClickClose={() => setIsCreateArtist(false)}
          bodyContent={'아티스트를 등록 하시겠습니까?'}
          onCheked={(value) => modalCreateEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => {
            onClickSaveClose()
            setIsOkCheck(false)
          }}
          bodyContent={'등록이 완료되었습니다.'}
        />
      )}
    </CModal>
  )
}

CreateArtistContents.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onClickSaveClose: PropTypes.func.isRequired,
  artistId: PropTypes.string || PropTypes.number,
  rankId: PropTypes.string.isRequired || PropTypes.number.isRequired,
}

export default CreateArtistContents
