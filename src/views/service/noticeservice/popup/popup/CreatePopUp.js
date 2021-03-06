import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCol,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
} from '@coreui/react'
import moment from 'moment'
import { FileBtn } from '../../../../../components/FileBtn'
import { CheckPopup } from '../../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../../components/publicPopup/NormalPopup'
import FileApi from '../../../../../util/FileApi'
import axios from 'axios'
import { headerConfig } from '../../../../../static/axiosConfig'
import { statusCatch } from '../../../../../static/axiosCatch'

const CreatePopUp = ({ onClickClose, onEndEvent }) => {
  const [status, setStatus] = useState(1)
  const [isPriority, setPriority] = useState(0)
  const [isTypeBanner, setTypeBanner] = useState(1)
  const [isPlaceBanner, setPlaceBanner] = useState(1)
  const [isTitleBanner, setTitleBanner] = useState({ ko: '' })
  const [isLink, setLink] = useState('')
  //Date
  const [isStartYear, setStartYear] = useState('')
  const [isStartHour, setStartHour] = useState('')
  const [isEndYear, setEndYear] = useState('')
  const [isEndHour, setEndHour] = useState('')
  const [imgs, setImgs] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [isPlatform, setPlatform] = useState('')
  const [isCreate, setIsCreate] = useState(false) // Create checked
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const create = async () => {
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
      type: 2,
      type_banner: isTypeBanner,
      place_banner: isPlaceBanner,
      started_at: moment(isStartYear + ' ' + isStartHour + ':00'),
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
      platform: isPlatform,
      status: status,
    }
    const res = await axios.post(`/api/link`, data, headerConfig).catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('?????? ????????? ?????????.')
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
              <span style={{ width: '100px' }}>?????? ?????????</span>
              <CFormSelect
                value={isPlaceBanner}
                size="lg"
                aria-label="Large select example"
                className="search-bar__select"
                style={{ width: '140px' }}
                onChange={(e) => {
                  setPlaceBanner(e.target.value)
                }}
              >
                <option value={0}>??????</option>
                <option value={1}>Android</option>
                <option value={2}>IOS</option>
              </CFormSelect>
            </CCol>
            <CCol className="d-flex flex-column mt-4">
              <span className="me-4">?????????????????????</span>
              <span className="mb-4 text-danger">
                ??? ???????????? ??????????????? ?????? ex_0??? ?????? ???????????? ????????????
              </span>
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="text-center search-bar__select"
                style={{ width: '100px' }}
                value={isPriority}
                onChange={(e) => {
                  setPriority(e.target.value)
                }}
              >
                <option value={1}>0???</option>
                <option value={2}>1</option>
                <option value={3}>2</option>
                <option value={4}>3</option>
                <option value={5}>4</option>
                <option value={6}>5</option>
                <option value={7}>6</option>
                <option value={8}>7</option>
                <option value={9}>8</option>
                <option value={10}>9</option>
              </CFormSelect>
            </CCol>
            {/*3*/}
            <CCol className="d-flex flex-column my-4">
              <div className="mb-2">?????????/?????? (????????? ?????? X)</div>
              <CFormInput
                value={isTitleBanner.ko}
                onChange={(e) => {
                  setTitleBanner({ ko: e.target.value })
                }}
                placeholder="????????? ??????????????????"
              />
            </CCol>
            {/*Input P*/}
            <CCol className="d-flex flex-column my-4">
              <div className="mb-2">?????? ?????? (????????? ID??? ?????? ??? ????????????)?????????</div>
              <div className="mb-2">??? ?????? ???????????? ????????? ?????? ?????? ????????????</div>
              <CFormInput
                value={isPlatform}
                onChange={(e) => {
                  setPlatform(e.target.value)
                }}
                placeholder="ex ) 5de6785221587a5587252d???"
              />
            </CCol>
            <CCol className="d-flex flex-column">
              <div className="mb-2">?????? ?????? (??????URL/ ????????????)</div>
              <CFormInput
                value={isLink}
                onChange={(e) => {
                  setLink(e.target.value)
                }}
                placeholder="ex ) https://youtu.be/7Rb22n8X87M or BTS ??????"
              />
            </CCol>
          </CCol>
          {/*Second col*/}
          <CCol sm={1} />
          {/*1*/}
          <CCol sm={6}>
            <CCol>
              <div className="my-2">???????????????</div>
              <CCol className="d-flex flex-row my-4">
                <label className="me-1" style={{ width: '150px' }}>
                  ????????????
                </label>
                <CFormInput
                  type="date"
                  defaultValue={isStartYear}
                  onChange={(e) => {
                    setStartYear(e.target.value)
                  }}
                  placeholder="YYYY-MM-DD??????"
                  className="mx-2"
                />
                <CFormInput
                  type="time"
                  defaultValue={isStartHour}
                  onChange={(e) => {
                    setStartHour(e.target.value)
                  }}
                  placeholder="HH:MM:SS???"
                />
              </CCol>
              <CCol className="d-flex flex-row my-4">
                <label className="me-1" style={{ width: '150px' }}>
                  ?????????
                </label>
                <CFormInput
                  type="date"
                  value={isEndYear}
                  onChange={(e) => {
                    setEndYear(e.target.value)
                  }}
                  placeholder="YYYY-MM-DD??????"
                  className="mx-2"
                />
                <CFormInput
                  type="time"
                  defaultValue={isEndHour}
                  onChange={(e) => {
                    setEndHour(e.target.value)
                  }}
                  placeholder="HH:MM:SS???"
                />
              </CCol>
            </CCol>
            {/*2*/}
            <CCol>
              <div>?????? ????????? (?????? : 0000 X 000 JPEG)</div>
              <CCol className="d-flex flex-column mt-2">
                <FileBtn
                  name="?????????"
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
                  name="??????"
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
                  name="?????????"
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
                  name="?????????"
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
                  name="????????????"
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
              <div>???????????????</div>
              <CFormSelect
                value={status}
                size="lg"
                aria-label="Large select example"
                className="text-center search-bar__select mt-2"
                style={{ width: '130px' }}
                onChange={(e) => {
                  setStatus(e.target.value)
                }}
              >
                <option value={1}>????????????</option>
                <option value={0}>????????????</option>
                <option value={-1}>?????????</option>
              </CFormSelect>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="form-footer">
        <CButton
          color="info"
          style={{ color: 'white' }}
          className="px-4 form-footer__btn__ml form-footer__btn px-5"
          onClick={() => create()}
        >
          ?????????
        </CButton>
        <CButton
          onClick={() => onClickClose()}
          style={{ color: 'black' }}
          color="light"
          className="form-footer__btn"
        >
          ??????
        </CButton>
      </CModalFooter>
      {isCreate && (
        <CheckPopup
          onClickClose={() => setIsCreate(false)}
          bodyContent={'???????????? ?????????????????????????'}
          title={'??????'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'????????? ?????????????????????.'}
        />
      )}
    </CModal>
  )
}
CreatePopUp.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onEndEvent: PropTypes.func,
}
export default CreatePopUp
