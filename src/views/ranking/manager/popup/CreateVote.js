import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCol,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
} from '@coreui/react'
import { FileBtn } from 'src/components/FileBtn'
import FileApi from '../../../../util/FileApi'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import moment from 'moment'
import { NormalPopup } from '../../../../components/publicPopup/NormalPopup'
import { CheckPopup } from 'src/components/publicPopup/CheckPopup'

const CreateVote = ({ onClickClose, onCloseOkEvent }) => {
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isCreateVote, setIsCreateVote] = useState(false)
  const [isType, setType] = useState(1)
  const [isPriority, setPriority] = useState(0)
  const [isStartYear, setStartYear] = useState('')
  const [isStartHour, setStartHour] = useState('')
  const [isResultYear, setResultYear] = useState('')
  const [isResultHour, setResultHour] = useState('')
  const [isEndYear, setEndYear] = useState('')
  const [isEndHour, setEndHour] = useState('')
  const [imgs, setImgs] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [isNameVote, setNameVote] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [newImgDiv, setNewImgDiv] = useState([])
  const [imgKo, setimgKo] = useState([])
  const [imgEn, setimgEn] = useState([])
  const [imgCh, setimgCh] = useState([])
  const [imgEs, setimgEs] = useState([])
  const [imgJp, setimgJp] = useState([])
  const [isStatus, setStatus] = useState(1)
  const create = async () => {
    if (
      isStartYear === '' ||
      isStartHour === '' ||
      isResultYear === '' ||
      isResultHour === '' ||
      isEndHour === '' ||
      isEndYear === ''
    ) {
      alert('투표기간을 선택해 주세요')
      return
    }

    if (imgs.ko instanceof File) {
      imgs.ko = await FileApi('ranking', imgs.ko)
    }
    if (imgs.en instanceof File) {
      imgs.en = await FileApi('ranking', imgs.en)
    }
    if (imgs.ch instanceof File) {
      imgs.ch = await FileApi('ranking', imgs.ch)
    }
    if (imgs.jp instanceof File) {
      imgs.jp = await FileApi('ranking', imgs.jp)
    }
    if (imgs.es instanceof File) {
      imgs.es = await FileApi('ranking', imgs.es)
    }
    // Tip
    if (newImgDiv.length > 0) {
      for (let i = 0; i < newImgDiv.length; i++) {
        newImgDiv[i].remove()
      }
    }

    for (let i = 0; i < imgKo.length; i++) {
      if (imgKo[i].id) {
        delete imgKo[i].id
      }
      if (imgKo[i] instanceof File) {
        const item = await FileApi('policy', imgKo[i])
        const temp = { url: '/' + item.data.value[0].key }
        imgKo[i] = temp
      }
    }

    for (let i = 0; i < imgEn.length; i++) {
      if (imgEn[i].id) {
        delete imgEn[i].id
      }
      if (imgEn[i] instanceof File) {
        const item = await FileApi('policy', imgEn[i])
        const temp = { url: '/' + item.data.value[0].key }
        imgEn[i] = temp
      }
    }

    for (let i = 0; i < imgCh.length; i++) {
      if (imgCh[i].id) {
        delete imgCh[i].id
      }
      if (imgCh[i] instanceof File) {
        const item = await FileApi('policy', imgCh[i])
        const temp = { url: '/' + item.data.value[0].key }
        imgCh[i] = temp
      }
    }

    for (let i = 0; i < imgEs.length; i++) {
      if (imgEs[i].id) {
        delete imgEs[i].id
      }
      if (imgEs[i] instanceof File) {
        const item = await FileApi('policy', imgEs[i])
        const temp = { url: '/' + item.data.value[0].key }
        imgEs[i] = temp
      }
    }

    for (let i = 0; i < imgJp.length; i++) {
      if (imgJp[i].id) {
        delete imgJp[i].id
      }
      if (imgJp[i] instanceof File) {
        const item = await FileApi('policy', imgJp[i])
        const temp = { url: '/' + item.data.value[0].key }
        imgJp[i] = temp
      }
    }

    const data = {
      type: isType,
      priority: isPriority,
      name_vote: isNameVote,
      started_at: moment(isStartYear + ' ' + isStartHour + ':00'),
      result_at: moment(isResultYear + ' ' + isResultHour + ':00'),
      ended_at: moment(isEndYear + ' ' + isEndHour + ':00'),
      img_banner: {
        ko:
          imgs.ko.data === undefined
            ? ''
            : imgs.ko.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        en:
          imgs.en.data === undefined
            ? ''
            : imgs.en.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        ch:
          imgs.ch.data === undefined
            ? ''
            : imgs.ch.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        jp:
          imgs.jp.data === undefined
            ? ''
            : imgs.jp.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        es:
          imgs.es.data === undefined
            ? ''
            : imgs.es.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
      },
      tip: {
        ko: imgKo,
        en: imgEn,
        ch: imgCh,
        jp: imgJp,
        es: imgEs,
      },
      status: isStatus,
    }
    const res = await axios.post(`/api/rank`, data, headerConfig).catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }

  const modalOkEvent = (bool) => {
    if (bool) {
      setIsCreateVote(false)
      create()
    } else {
      setIsCreateVote(false)
    }
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol sm={7}>
            <CCol className="mb-5">
              <span className="my-2">투표타입</span>
              <CCol sm={6} className="mt-3">
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="search-bar__select text-center"
                  style={{ width: '210px' }}
                  value={isType}
                  onChange={(e) => {
                    setType(e.target.value)
                  }}
                >
                  <option value={1}>랭킹 투표​</option>
                  <option value={2}>팬픽 투표</option>
                  <option value={3}>이벤트 투표​</option>
                  <option value={4}>이벤트 댓글 투표</option>
                </CFormSelect>
              </CCol>
            </CCol>
            <CCol className="mb-5 d-flex flex-column">
              <div className="my-2">투표우선순위​</div>
              <div className="text-danger">
                ※ 높을수록 우선순위가 높다 ex_0이 가장 마지막에 노출됨​
              </div>
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="search-bar__select mt-3 text-center"
                style={{ width: '80px' }}
                value={isPriority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
              </CFormSelect>
            </CCol>
            <CCol className="my-4 mb-5">
              <span>투표상태​</span>
              <CCol sm={4} className="mt-3">
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="mr-3 search-bar__select mt-3 text-center"
                  value={isStatus}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value={1}>진행중​</option>
                  <option value={0}>비활성​</option>
                  {/* <option value={2}>종료</option> */}
                  <option value={-1}>삭제</option>
                </CFormSelect>
              </CCol>
            </CCol>
            <CCol className="d-flex flex-column mb-4">
              <span className="me-1">투표기간</span>
              <CCol className="d-flex flex-row mt-4">
                <label style={{ width: '300px' }}>시작일​</label>
                <CFormInput
                  type="date"
                  defaultValue={isStartYear}
                  onChange={(e) => {
                    setStartYear(e.target.value)
                  }}
                  placeholder="YYYY-MM-DD​​"
                  className="mx-2"
                />
                <CFormInput
                  type="time"
                  defaultValue={isStartHour}
                  onChange={(e) => {
                    setStartHour(e.target.value)
                  }}
                  placeholder="HH:MM:SS​"
                />
              </CCol>
              <CCol className="d-flex flex-row align-items-center  my-3">
                <span style={{ width: '300px' }}>순위 발표일​</span>
                <CFormInput
                  type="date"
                  defaultValue={isResultYear}
                  onChange={(e) => {
                    setResultYear(e.target.value)
                  }}
                  placeholder="YYYY-MM-DD​​"
                  className="mx-2"
                />
                <CFormInput
                  type="time"
                  value={isResultHour}
                  onChange={(e) => {
                    setResultHour(e.target.value)
                  }}
                  placeholder="HH:MM:SS​"
                />
              </CCol>
              <CCol className="d-flex flex-row align-items-center">
                <span style={{ width: '300px' }}>종료일​</span>
                <CFormInput
                  type="date"
                  defaultValue={isEndYear}
                  onChange={(e) => {
                    setEndYear(e.target.value)
                    /*       console.log(
                      moment(isEndYear + ' ' + isEndHour + '00')
                        .subtract(11, 'hours')
                        .format(),
                    )*/
                  }}
                  placeholder="YYYY-MM-DD​​"
                  className="mx-2"
                />
                <CFormInput
                  type="time"
                  defaultValue={isEndHour}
                  onChange={(e) => {
                    setEndHour(e.target.value)
                  }}
                  placeholder="HH:MM:SS​"
                />
              </CCol>
            </CCol>
            {/*Input P*/}
            <CCol className="mb-5 d-flex flex-column">
              <div className="mb-3">투표이름​</div>
              <CInputGroup>
                <label htmlFor="ko" className="me-2" style={{ width: '70px' }}>
                  한국어​
                </label>
                <CFormInput
                  defaultValue={isNameVote.ko}
                  onChange={(e) => setNameVote({ ...isNameVote, ko: e.target.value })}
                  id="ko"
                  placeholder="내용을 입력하세요"
                />
              </CInputGroup>
              <CInputGroup className="my-2">
                <label htmlFor="en" className="me-2" style={{ width: '70px' }}>
                  영어​
                </label>
                <CFormInput
                  defaultValue={isNameVote.en}
                  onChange={(e) => setNameVote({ ...isNameVote, en: e.target.value })}
                  id="en"
                  placeholder="내용을 입력하세요"
                />
              </CInputGroup>
              <CInputGroup>
                <label htmlFor="ch" className="me-2" style={{ width: '70px' }}>
                  중국어​
                </label>
                <CFormInput
                  defaultValue={isNameVote.ch}
                  onChange={(e) => setNameVote({ ...isNameVote, ch: e.target.value })}
                  id="ch"
                  placeholder="내용을 입력하세요"
                />
              </CInputGroup>
              <CInputGroup className="my-2">
                <label htmlFor="jp" className="me-2" style={{ width: '70px' }}>
                  일본어​
                </label>
                <CFormInput
                  defaultValue={isNameVote.jp}
                  onChange={(e) => setNameVote({ ...isNameVote, jp: e.target.value })}
                  id="jp"
                  placeholder="내용을 입력하세요"
                />
              </CInputGroup>
              <CInputGroup>
                <label htmlFor="es" className="me-2" style={{ width: '70px' }}>
                  스페인어​
                </label>
                <CFormInput
                  defaultValue={isNameVote.es}
                  onChange={(e) => setNameVote({ ...isNameVote, es: e.target.value })}
                  id="es"
                  placeholder="내용을 입력하세요"
                />
              </CInputGroup>
            </CCol>
          </CCol>
          {/*Second col*/}
          <CCol sm={5}>
            <CCol>
              <div className="me-4 mb-3">랭킹배너 이미지 (권장 : 335*150 JPEG)​</div>
              <div className="mb-3">
                <FileBtn
                  name="한국어​"
                  title="ranking"
                  fileData={(data) => {
                    setImgs({ ...imgs, ko: data })
                  }}
                  accept="image/*"
                  id="mainImage"
                  imageUrl={imgs.ko}
                />
              </div>
              <div className="mb-3">
                <FileBtn
                  name="영어​"
                  title="ranking"
                  fileData={(data) => {
                    setImgs({ ...imgs, en: data })
                  }}
                  accept="image/*"
                  id="mainImage2"
                  imageUrl={imgs.en}
                />
              </div>
              <div className="mb-3">
                <FileBtn
                  name="중국어​"
                  title="ranking"
                  fileData={(data) => {
                    setImgs({ ...imgs, ch: data })
                  }}
                  accept="image/*"
                  id="mainImage3"
                  imageUrl={imgs.ch}
                />
              </div>
              <div className="mb-3">
                <FileBtn
                  name="일본어​"
                  title="ranking"
                  fileData={(data) => {
                    setImgs({ ...imgs, jp: data })
                  }}
                  accept="image/*"
                  id="mainImage4"
                  imageUrl={imgs.jp}
                />
              </div>
              <div className="mb-3">
                <FileBtn
                  name="스페인어​"
                  title="ranking"
                  fileData={(data) => {
                    setImgs({ ...imgs, es: data })
                  }}
                  accept="image/*"
                  id="mainImage5"
                  imageUrl={imgs.es}
                />
              </div>
            </CCol>
            <CCol>
              <div className="me-4 mb-3">TIP 이미지 (권장 : 295*180 JPEG)​​</div>
              <div className="mb-3">
                <FileBtn
                  name="한국어​"
                  title="ranking"
                  fileData={(data) => {
                    imgKo.push(data)
                  }}
                  deleteData={(data) => {
                    const arrIndex = imgKo.findIndex((i) => i === data)
                    imgKo.splice(arrIndex, 1)
                  }}
                  newImg={(data) => {
                    newImgDiv.push(data)
                  }}
                  accept="image/*"
                  id="board1"
                  imageUrl="multi"
                  multiImg={imgKo}
                  multiple={true}
                  count={5}
                />
              </div>
              <div className="mb-3">
                <FileBtn
                  name="영어​"
                  title="ranking"
                  fileData={(data) => {
                    imgEn.push(data)
                  }}
                  deleteData={(data) => {
                    const arrIndex = imgEn.findIndex((i) => i === data)
                    imgEn.splice(arrIndex, 1)
                  }}
                  newImg={(data) => {
                    newImgDiv.push(data)
                  }}
                  accept="image/*"
                  id="board2"
                  imageUrl="multi"
                  multiImg={imgEn}
                  multiple={true}
                  count={5}
                />
              </div>
              <div className="mb-3">
                <FileBtn
                  name="중국어​"
                  title="ranking"
                  fileData={(data) => {
                    imgCh.push(data)
                  }}
                  deleteData={(data) => {
                    const arrIndex = imgCh.findIndex((i) => i === data)
                    imgCh.splice(arrIndex, 1)
                  }}
                  newImg={(data) => {
                    newImgDiv.push(data)
                  }}
                  accept="image/*"
                  id="board3"
                  imageUrl="multi"
                  multiImg={imgCh}
                  multiple={true}
                  count={5}
                />
              </div>
              <div className="mb-3">
                <FileBtn
                  name="일본어​"
                  title="ranking"
                  fileData={(data) => {
                    imgJp.push(data)
                  }}
                  deleteData={(data) => {
                    const arrIndex = imgJp.findIndex((i) => i === data)
                    imgJp.splice(arrIndex, 1)
                  }}
                  newImg={(data) => {
                    newImgDiv.push(data)
                  }}
                  accept="image/*"
                  id="board4"
                  imageUrl="multi"
                  multiImg={imgJp}
                  multiple={true}
                  count={5}
                />
              </div>
              <div className="mb-3">
                <FileBtn
                  name="스페인어​"
                  title="ranking"
                  fileData={(data) => {
                    imgEs.push(data)
                  }}
                  deleteData={(data) => {
                    const arrIndex = imgEs.findIndex((i) => i === data)
                    imgEs.splice(arrIndex, 1)
                  }}
                  newImg={(data) => {
                    newImgDiv.push(data)
                  }}
                  accept="image/*"
                  id="board5"
                  imageUrl="multi"
                  multiImg={imgEs}
                  multiple={true}
                  count={5}
                />
              </div>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="form-footer">
        <CButton
          onClick={() => setIsCreateVote(true)}
          className="form-footer__btn px-5"
          style={{ color: 'white' }}
          color="info"
        >
          저장​
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
      {isCreateVote && (
        <CheckPopup
          onClickClose={() => setIsCreateVote(false)}
          bodyContent={'등록하시겠습니까?'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => onCloseOkEvent()}
          bodyContent={'정상적으로 등록 되었습니다.'}
        />
      )}
    </CModal>
  )
}

CreateVote.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onCloseOkEvent: PropTypes.func,
}

export default CreateVote
