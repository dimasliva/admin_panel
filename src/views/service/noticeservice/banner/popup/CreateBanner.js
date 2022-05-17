import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCol,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
} from '@coreui/react'
import moment from 'moment'

import { FileBtn } from 'src/components/FileBtn'
import FileApi from 'src/util/FileApi'

import { CheckPopup } from '../../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../../components/publicPopup/NormalPopup'
import axios from 'axios'
import { headerConfig } from '../../../../../static/axiosConfig'
import { statusCatch } from '../../../../../static/axiosCatch'

const CreateBanner = ({ onClickClose, onEndEvent }) => {
  const [status, setStatus] = useState(1)
  const [isPriority, setPriority] = useState(0)
  const [isTypeBanner, setTypeBanner] = useState(1)
  const [isPlaceBanner, setPlaceBanner] = useState(1)
  const [isTitleBanner, setTitleBanner] = useState({
    ch: '',
    en: '',
    es: '',
    jp: '',
    ko: '',
  })
  const [isLink, setLink] = useState('')
  //Date
  const [startYear, setStartYear] = useState('')
  const [startHour, setStartHour] = useState('')
  const [isEndYear, setEndYear] = useState('')
  const [isEndHour, setEndHour] = useState('')
  const [imgs, setImgs] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [isGoal, setGoal] = useState('')
  const [isCreate, setIsCreate] = useState(false)
  const [isOkCheck, setIsOkCheck] = useState(false)
  const create = async () => {
    if (startYear === '') {
      alert('게시시간을 입력해 주세요.')
      return
    }
    if (startHour === '') {
      alert('게시시간을 입력해 주세요.')
      return
    }
    if (isEndYear === '') {
      alert('게시시간을 입력해 주세요.')
      return
    }
    if (isEndHour === '') {
      alert('게시시간을 입력해 주세요.')
      return
    }
    if (imgs.ko !== '') {
      imgs.ko = await FileApi('banner', imgs.ko)
    }
    if (imgs.en !== '') {
      imgs.en = await FileApi('banner', imgs.en)
    }
    if (imgs.ch !== '') {
      imgs.ch = await FileApi('banner', imgs.ch)
    }
    if (imgs.jp !== '') {
      imgs.jp = await FileApi('banner', imgs.jp)
    }
    if (imgs.es !== '') {
      imgs.es = await FileApi('banner', imgs.es)
    }
    const data = {
      type: 1,
      type_banner: isTypeBanner,
      place_banner: isPlaceBanner,
      started_at: moment(startYear + ' ' + startHour + ':00'),
      ended_at: moment(isEndYear + ' ' + isEndHour + ':00'),
      title_banner: isTitleBanner,
      img_banner: {
        ko:
          imgs.ko === ''
            ? imgs.ko
            : imgs.ko.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        en:
          imgs.en === ''
            ? imgs.en
            : imgs.en.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        ch:
          imgs.ch === ''
            ? imgs.ch
            : imgs.ch.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        jp:
          imgs.jp === ''
            ? imgs.jp
            : imgs.jp.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        es:
          imgs.es === ''
            ? imgs.es
            : imgs.es.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
      },
      link: isLink,
      priority: isPriority,
      goal: isGoal,
      status: status,
    }
    const res = await axios.post(`/api/link`, data, headerConfig).catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }
  const modalOkEvent = (value) => {
    if (value) {
      setIsCreate(false)
      create()
    } else {
      setIsCreate(false)
    }
  }

  const closeModalEvent = () => {
    setIsOkCheck(false)
    onEndEvent()
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol sm={5}>
            <CCol className="d-flex flex-row align-items-center">
              <span className="my-2 me-3">배너위치​</span>
              <CCol sm={6}>
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="search-bar__select"
                  style={{ width: '130px' }}
                  onChange={(e) => {
                    setPlaceBanner(e.target.value)
                  }}
                >
                  <option value={1}>메인 홈</option>
                  <option value={2}>충전소​</option>
                </CFormSelect>
              </CCol>
            </CCol>
            <CCol className="d-flex flex-row mt-4">
              <span className="me-4">배너타입​</span>
              <CCol>
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="search-bar__select"
                  style={{ width: '230px' }}
                  onChange={(e) => {
                    setTypeBanner(e.target.value)
                  }}
                >
                  <option value={1}>인앱 웹 링크 연결​</option>
                  <option value={2}>랭킹투표 연결​</option>
                  <option value={3}>동영상 연결​​</option>
                  <option value={4}>일반 공지사항 연결​​​</option>
                  <option value={5}>아티스트 연결​​​</option>
                  <option value={6}>외부 웹 링크 연결​​</option>
                </CFormSelect>
              </CCol>
            </CCol>
            <CCol className="d-flex flex-column mt-4">
              <span className="me-4">배너우선순위​</span>
              <span className="mb-4 text-danger">
                ※ 높을수록 우선순위가 높다 ex_0이 가장 마지막에 노출됨​
              </span>
              <CCol sm={5}>
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="text-center search-bar__select"
                  value={isPriority}
                  onChange={(e) => {
                    setPriority(e.target.value)
                  }}
                >
                  <option value={0}>0​</option>
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
            </CCol>
            {/*3*/}
            <CCol className="d-flex flex-column my-4">
              <div className="mb-2">구분용 / 메모용</div>
              <div className="d-flex flex-row my-1">
                {/*<label style={{ width: '90px' }}>구분용 / 메모용</label>*/}
                <CFormTextarea
                  style={{ resize: 'none' }}
                  onChange={(e) => {
                    setTitleBanner({ ...isTitleBanner, ko: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                />
              </div>
              {/*     <div className="d-flex flex-row my-1">
                <label style={{ width: '90px' }}>메모용</label>
                <CFormTextarea
                  style={{ resize: 'none' }}
                  onChange={(e) => {
                    setTitleBanner({ ...isTitleBanner, en: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                ></CFormTextarea>
              </div>*/}
              {/* <div className="mb-2">베너 타이틀​</div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '90px' }}>한국어​</label>
                <CFormInput
                  onChange={(e) => {
                    setTitleBanner({ ...isTitleBanner, ko: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '90px' }}>영어​</label>
                <CFormInput
                  onChange={(e) => {
                    setTitleBanner({ ...isTitleBanner, en: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '90px' }}>중국어​</label>
                <CFormInput
                  onChange={(e) => {
                    setTitleBanner({ ...isTitleBanner, ch: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '90px' }}>일본어​</label>
                <CFormInput
                  onChange={(e) => {
                    setTitleBanner({ ...isTitleBanner, jp: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '90px' }}>스페인어​</label>
                <CFormInput
                  onChange={(e) => {
                    setTitleBanner({ ...isTitleBanner, es: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                />
              </div> */}
            </CCol>
            {/*Input P*/}
            <CCol className="d-flex flex-column my-4">
              <div className="mb-2">대상 연결 (대상의 ID를 입력 – 선택사항)​​​</div>
              <div className="mb-2">※ 일반 공지사항 아이디 또는 투표 아이디​</div>
              <CFormInput
                onChange={(e) => {
                  setGoal(e.target.value)
                }}
                placeholder="ex ) 5de6785221587a5587252d​"
              />
            </CCol>
            <CCol className="d-flex flex-column">
              <div className="mb-2">링크 주소/ 아티스트 코드 (선택사항)​​​</div>
              <div className="mb-2">
                ※ 배너타입을 아티스트로 선택 했을 경우에만 코드를 넣으세요​
              </div>
              <CFormInput
                onChange={(e) => {
                  setLink(e.target.value)
                }}
                placeholder="ex ) https://youtu.be/7Rb22n8X87M or BTS ​​"
              />
            </CCol>
          </CCol>
          {/*Second col*/}
          <CCol sm={1} />
          {/*1*/}
          <CCol sm={6}>
            <CCol>
              <div className="my-2">게시시간​</div>
              <CCol className="d-flex flex-row my-4">
                <label className="me-1" style={{ width: '150px' }}>
                  시작일​
                </label>
                <CFormInput
                  type="date"
                  defaultValue={startYear}
                  onChange={(e) => {
                    setStartYear(e.target.value)
                  }}
                  placeholder="YYYY-MM-DD​​"
                  className="mx-2"
                />
                <CFormInput
                  type="time"
                  defaultValue={startHour}
                  onChange={(e) => {
                    setStartHour(e.target.value)
                  }}
                  placeholder="HH:MM:SS​"
                />
              </CCol>
              <CCol className="d-flex flex-row my-4">
                <label className="me-1" style={{ width: '150px' }}>
                  종료일
                </label>
                <CFormInput
                  type="date"
                  defaultValue={isEndYear}
                  onChange={(e) => {
                    setEndYear(e.target.value)
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
            {/*2*/}
            <CCol>
              <CCol className="mb-3">
                <span>메인 베너 이미지 (권장: 0000 X JPEG)</span>
              </CCol>
              <CCol className="d-flex flex-column">
                <FileBtn
                  name="한국어"
                  title="banner"
                  fileData={(data) => {
                    setImgs({ ...imgs, ko: data })
                  }}
                  accept="image/*"
                  id="main"
                  imageUrl={imgs.ko}
                />
              </CCol>
            </CCol>
            {/*10*/}
            <CCol>
              <CCol className="d-flex flex-column">
                <FileBtn
                  name="영어"
                  title="banner"
                  fileData={(data) => {
                    setImgs({ ...imgs, en: data })
                  }}
                  accept="image/*"
                  id="main2"
                  imageUrl={imgs.en}
                />
              </CCol>
            </CCol>
            {/*11*/}
            <CCol>
              <CCol className="d-flex flex-column">
                <FileBtn
                  name="중국어"
                  title="banner"
                  fileData={(data) => {
                    setImgs({ ...imgs, ch: data })
                  }}
                  accept="image/*"
                  id="main3"
                  imageUrl={imgs.ch}
                />
              </CCol>
            </CCol>
            {/*  12  */}
            <CCol>
              <CCol className="d-flex flex-column">
                <FileBtn
                  name="일본어"
                  title="banner"
                  fileData={(data) => {
                    setImgs({ ...imgs, jp: data })
                  }}
                  accept="image/*"
                  id="main4"
                  imageUrl={imgs.jp}
                />
              </CCol>
            </CCol>
            <CCol>
              <CCol className="d-flex flex-column">
                <FileBtn
                  name="스페인어"
                  title="banner"
                  fileData={(data) => {
                    setImgs({ ...imgs, es: data })
                  }}
                  accept="image/*"
                  id="main5"
                  imageUrl={imgs.es}
                />
              </CCol>
            </CCol>
            <CCol sm={5} className="d-flex flex-column align-items-center mt-3">
              <div>등록상태​</div>
              <CFormSelect
                size="lg"
                style={{ width: '130px' }}
                aria-label="Large select example"
                className="text-center search-bar__select mt-2"
                onChange={(e) => {
                  setStatus(e.target.value)
                }}
              >
                <option value={1}>진행중​</option>
                <option value={0}>비활성​</option>
                <option value={-1}>삭제​</option>
              </CFormSelect>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="form-footer">
        <CButton
          color="info"
          style={{ color: 'white' }}
          className="px-4 form-footer__btn__ml form-footer__btn"
          onClick={() => setIsCreate(true)}
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
      {isCreate && (
        <CheckPopup
          onClickClose={() => setIsCreate(false)}
          bodyContent={'배너를 등록하시겠습니까?'}
          title={'등록'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'등록이 완료되었습니다.'}
        />
      )}
    </CModal>
  )
}
CreateBanner.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onEndEvent: PropTypes.func,
}
export default CreateBanner
