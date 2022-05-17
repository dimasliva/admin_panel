import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCol,
  CFormSelect,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
} from '@coreui/react'
import { FileBtn } from 'src/components/FileBtn'
import { CheckPopup } from 'src/components/publicPopup/CheckPopup'
import { NormalPopup } from 'src/components/publicPopup/NormalPopup'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'

const EditThekFeed = ({ onClickClose, onCreate, onId }) => {
  const [isModal, setIsModal] = useState({
    use: false,
    id: '',
  }) // modify check Popup
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Popup

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imgs, setImgs] = useState([])
  const [imgIndex, setImgIndex] = useState([])
  const [imgs2, setImgs2] = useState([])
  const [link, setLink] = useState('')
  const [status, setStatus] = useState('1')

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    const res = await axios
      .get(`/api/fan/play?id=${onId}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setTitle(res.data.value.title_play)
    setDescription(res.data.value.body_play)
    setImgs(res.data.value.img_play)
    setLink(res.data.value.link_play)
    setStatus(res.data.value.status)
  }
  const create = async () => {
    const img_play = []
    // const key = []

    if (imgs.length > 0) {
      imgs.map((value, index) => {
        if (imgIndex.length > 0) {
          imgIndex.map((key) => {
            if (key !== index) {
              img_play.push({
                url: value.url,
              })
            }
          })
        } else {
          img_play.push({
            url: value.url,
          })
        }
      })
    }
    if (imgs2.length > 0) {
      imgs2.map((value) =>
        img_play.push({
          url: value.url,
        }),
      )
    }
    const data = {
      id: onId,
      type: 2,
      img_play,
      title_play: title,
      body_play: description,
      link_play: link,
      status,
    }

    const res = await axios
      .post(`/api/fan/play`, data, headerConfig)
      .catch((err) => statusCatch(err))

    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }

  // delete checked
  const modalOkEvent = (value) => {
    if (value) {
      setIsModal(false)
      create()
    } else {
      setIsModal(false)
    }
  }

  const closeModalEvent = () => {
    setIsOkCheck(false)
    onCreate(true)
  }

  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody className="m-2">
        <CRow>
          <label>덕킹 피드 제목​</label>
          <CFormTextarea
            placeholder="내용을 입력하세요"
            style={{ resize: 'none' }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </CRow>
        <CRow className="my-4">
          <label>덕킹 피드 내용​</label>
          <CFormTextarea
            placeholder="내용을 입력하세요​"
            rows="8"
            style={{ resize: 'none' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </CRow>
        <CRow className="my-4">
          <label>콘텐츠 이미지 (권장 : 0000 X 000 JPEG)​</label>
        </CRow>
        <CRow className="my-4">
          <FileBtn
            name="사진"
            title="fanPlay"
            fileData={(data) => {
              imgs2.push(data)
            }}
            deleteData={(data) => {
              const arrIndex = imgs2.findIndex((i) => i.url === data)
              imgs2.splice(arrIndex, 1)
            }}
            deleteData2={(index) => {
              imgIndex.push(index)
            }}
            accept="image/*"
            id="main"
            imageUrl="s"
            multiImg={imgs}
            multiple={true}
          />
        </CRow>
        <CRow>
          <label className="my-3">콘텐츠 링크​</label>
          <CFormTextarea
            placeholder="링크를 입력하세요"
            style={{ resize: 'none' }}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </CRow>
        <CRow>
          <CCol sm={4}>
            <label className="mt-4">콘텐츠 링크​</label>
            <CFormSelect
              size="lg"
              aria-label="Large select example"
              className="my-3 search-bar__select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="1">정상</option>
              <option value="0">비활성​</option>
              <option value="-1">삭제</option>
            </CFormSelect>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="form-footer">
        <CButton
          color="info"
          style={{ color: 'white' }}
          size="sm"
          className="form-footer__bt"
          onClick={() => {
            setIsModal({
              use: true,
              id: '',
            })
          }}
        >
          저장​
        </CButton>
        <CButton
          onClick={() => onClickClose()}
          color="light"
          style={{ color: 'black' }}
          size="sm"
          className="form-footer__bt"
        >
          닫기​
        </CButton>
      </CModalFooter>
      {isModal.use && (
        <CheckPopup
          onClickClose={() =>
            setIsModal({
              use: false,
              id: '',
            })
          }
          bodyContent={'게시물을 수정하겠습니까?'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup onClickClose={() => closeModalEvent()} bodyContent={'수정을 완료했습니다.'} />
      )}
    </CModal>
  )
}
EditThekFeed.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func,
  onId: PropTypes.number.isRequired,
}

export default EditThekFeed
