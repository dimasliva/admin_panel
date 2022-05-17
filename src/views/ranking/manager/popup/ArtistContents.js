import React, { useEffect, useState } from 'react'
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

const ArtistContents = ({ onClickClose, artistId, rankId }) => {
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isDelArtist, setIsDelArtist] = useState(false) // delete check Modal
  const [isCodeArtist, setCodeArtist] = useState('')
  const [groupCode, setGroupCode] = useState('')
  const [isStatus, setStatus] = useState('')
  const [nameArtist, setNameArtist] = useState({
    ko: '',
    etc: '',
  })
  const [imgs, setImgs] = useState({
    sup: '',
    main: '',
  })
  useEffect(() => {
    getList()
  }, [])
  const getList = async () => {
    const res = await axios
      .get(`/api/rank/artist?rank_id=${rankId}&artist_id=${artistId}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setCodeArtist(res.data.value.code_artist)
    setNameArtist({
      ko: res.data.value.name_artist.ko,
      etc: res.data.value.name_artist.etc,
    })
    setImgs({
      sup: res.data.value.img_artist.sup,
      main: res.data.value.img_artist.main,
    })
    if (res.data.value.group_code !== null) {
      setGroupCode(res.data.value.group_code)
    }
    setStatus(res.data.value.status)
  }
  const modify = async () => {
    const data = {
      rank_id: rankId,
      artist_id: artistId,
      status: -1,
    }
    const res = await axios
      .post(`/api/rank/artist?rank_id=${rankId}&artist_id=${artistId}`, data, headerConfig)
      .catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }
  const modalOkEvent = (value) => {
    if (value) {
      setIsDelArtist(false)
      modify()
    } else {
      setIsDelArtist(false)
    }
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol sm={9}>
            <CCol className="mb-5">
              <span className="my-2">아티스트 콘텐츠​</span>
              <CCol className="d-flex flex-column mt-3">
                <div className="d-flex flex-row align-items-center">
                  <label style={{ width: '100px' }}>코드</label>
                  <CFormInput defaultValue={isCodeArtist} disabled />
                </div>
                <div className="d-flex flex-row my-2 align-items-center">
                  <label style={{ width: '100px' }}>그룹코드​</label>
                  <CFormInput defaultValue={groupCode === null ? '' : groupCode} disabled />
                </div>
                <div className="d-flex flex-row align-items-center">
                  <label style={{ width: '100px' }}>아티스트명</label>
                  <CFormInput
                    defaultValue={nameArtist.ko === '' ? nameArtist.etc : nameArtist.ko}
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
                  src={process.env.REACT_APP_IMG + imgs.main}
                />
                <CImage
                  style={{ width: '150px', height: '150px', marginLeft: '50px' }}
                  className="me-4"
                  src={process.env.REACT_APP_IMG + imgs.sup}
                />
              </CCol>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="pe-5">
        <CButton
          className="form-footer__btn px-5"
          style={{ color: 'white' }}
          color="danger"
          onClick={() => setIsDelArtist(true)}
        >
          삭제​
        </CButton>
        <CButton
          onClick={() => onClickClose()}
          style={{ color: 'black' }}
          color="light"
          className="form-footer__btn"
        >
          닫기
        </CButton>
      </CModalFooter>
      {isDelArtist && (
        <CheckPopup
          onClickClose={() => setIsDelArtist(false)}
          bodyContent={'이 아티스트를 삭제하시겠습니까?'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && <NormalPopup onClickClose={() => onClickClose()} bodyContent={'성공적으로.'} />}
    </CModal>
  )
}

ArtistContents.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  artistId: PropTypes.number.isRequired,
  rankId: PropTypes.number.isRequired,
}

export default ArtistContents
