import React, { useEffect, useState } from 'react'
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
import { CheckPopup } from '../../../../components/publicPopup/CheckPopup'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import moment from 'moment'
import { NormalPopup } from '../../../../components/publicPopup/NormalPopup'
import FileApi from '../../../../util/FileApi'

const DetailEventVote = ({ onClickClose, onCloseOkEvent, onId }) => {
  const [isModal, setIsModal] = useState(false) // delete check Modal
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isStartYear, setStartYear] = useState('')
  const [isStartHour, setStartHour] = useState('')
  const [isEndYear, setEndYear] = useState('')
  const [isEndHour, setEndHour] = useState('')
  const [isType, setType] = useState()
  const [eventUid, setEventUid] = useState()
  const [isStatus, setStatus] = useState()
  const [isPriority, setPriority] = useState()
  const [imgs, setImgs] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [nameVote, setNameVote] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  useEffect(() => {
    getList()
  }, [])

  // Talk Data communication
  const getList = async () => {
    const res = await axios
      .get(`/api/rank?id=${onId}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    // Start Day
    const start = moment(res.data.value.started_at).format('YYYY-MM-DD').split('-')
    const startTime = moment(res.data.value.started_at).format('HH:mm:ss').split(':')
    // end Day
    const end = moment(res.data.value.ended_at).format('YYYY-MM-DD').split('-')
    const endTime = moment(res.data.value.ended_at).format('HH:mm:ss').split(':')
    setStartYear(start.join('-'))
    setStartHour(startTime.join(':'))
    setEndYear(end.join('-'))
    setEndHour(endTime.join(':'))
    if (res.data.value.name_vote !== null) {
      setNameVote({
        ko: res.data.value.name_vote.ko,
        en: res.data.value.name_vote.en,
        ch: res.data.value.name_vote.ch,
        jp: res.data.value.name_vote.jp,
        es: res.data.value.name_vote.es,
      })
    }
    setPriority(res.data.value.priority)
    setImgs({
      ko: res.data.value.event_banner.ko,
      en: res.data.value.event_banner.en,
      ch: res.data.value.event_banner.ch,
      jp: res.data.value.event_banner.jp,
      es: res.data.value.event_banner.es,
    })
    setEventUid(res.data.value.event_uid)
    setStatus(res.data.value.status)
    setType(res.data.value.type)
    console.log(res.data.value)
  }
  const modify = async () => {
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
    const data = {
      id: onId,
      type: isType,
      event_uid: eventUid,
      priority: isPriority,
      name_vote: nameVote,
      started_at: isStartYear + ' ' + isStartHour,
      ended_at: isEndYear + ' ' + isEndHour,
      event_banner: {
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
      status: isStatus,
    }
    const res = await axios.post(`/api/rank`, data, headerConfig).catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('?????? ????????? ?????????.')
    }
  }
  const modalOkEvent = (value) => {
    if (value) {
      setIsModal(false)
      modify()
    } else {
      setIsModal(false)
    }
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol sm={6}>
            <CCol className="mb-5">
              <span className="my-2">????????? ?????????</span>
              <CCol sm={6} className="mt-3">
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="search-bar__select text-center"
                  style={{ width: '210px' }}
                  value={isType}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value={1}>?????? ?????????</option>
                  <option value={2}>?????? ??????</option>
                  <option value={3}>????????? ????????????</option>
                  <option value={4}>????????? ?????? ?????????</option>
                </CFormSelect>
              </CCol>
            </CCol>
            <CCol className="mb-5 d-flex flex-column">
              <div className="my-2">?????????????????????</div>
              <div className="text-danger">
                ??? ???????????? ??????????????? ?????? ex_0??? ?????? ???????????? ????????????
              </div>
              <CCol sm={4} className="mt-3">
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="mr-3 search-bar__select mt-3 text-center"
                  onChange={(e) => setPriority(e.target.value)}
                  value={isPriority}
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
            </CCol>
            <CCol className="my-4 mb-5">
              <span>???????????????</span>
              <CCol sm={4} className="mt-3">
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="mr-3 search-bar__select mt-3 text-center"
                  onChange={(e) => setStatus(e.target.value)}
                  value={isStatus}
                >
                  <option value={1}>????????????</option>
                  <option value={0}>????????????</option>
                  <option value={2}>?????????</option>
                  <option value={-1}>??????</option>
                </CFormSelect>
              </CCol>
            </CCol>
            <CCol className="d-flex flex-column my-4 mb-5">
              <span className="mb-2">????????? ?????? (??????ID??????)???</span>
              <CFormInput
                defaultValue={eventUid}
                onChange={(e) => setEventUid(e.target.value)}
                placeholder="ex) 60efefccc82e568707cdafb2???"
              />
            </CCol>
            {/*Input P*/}
            <CCol className="mb-5 d-flex flex-column">
              <div className="mb-3">???????????????</div>
              <CInputGroup>
                <span style={{ width: '50px' }}>????????????</span>
                <CFormInput
                  type="date"
                  defaultValue={isStartYear}
                  onChange={(e) => {
                    setStartYear(
                      moment(e.target.value, 'YYYY-MM-DD')
                        .format('YYYY-MM-DD')
                        .replace(/[^0-9]/g, '')
                        .replace(/^(\d{4})?(\d{2})?(\d{2})?/g, '$1-$2-$3')
                        .substr(0, e.target.placeholder.length),
                    )
                    let num = e.target.value.replace(/\D/g, '')
                    e.target.value =
                      num.substring(0, 4) + '-' + num.substring(4, 6) + '-' + num.substring(6, 8)
                  }}
                  placeholder="YYYY-MM-DD??????"
                  className="mx-2"
                />
                <CFormInput
                  type="time"
                  defaultValue={isStartHour}
                  onChange={(e) => {
                    setStartHour(
                      e.target.value
                        .replace(/[^0-9]/g, '')
                        .replace(/^(\d{2})?(\d{2})?(\d{2})?/g, '$1:$2:$3')
                        .substr(0, e.target.placeholder.length),
                    )
                  }}
                  placeholder="HH:MM:SS???"
                />
              </CInputGroup>
              <CInputGroup className="mt-3">
                <span className="me-2" style={{ width: '50px' }}>
                  ????????????
                </span>
                <CFormInput
                  className="me-2"
                  type="date"
                  defaultValue={isEndYear}
                  onChange={(e) => {
                    setEndYear(
                      moment(e.target.value, 'YYYY-MM-DD')
                        .format('YYYY-MM-DD')
                        .replace(/[^0-9]/g, '')
                        .replace(/^(\d{4})?(\d{2})?(\d{2})?/g, '$1-$2-$3')
                        .substr(0, e.target.placeholder.length),
                    )
                  }}
                  placeholder="YYYY-MM-DD"
                />
                <CFormInput
                  type="time"
                  defaultValue={isEndHour}
                  onChange={(e) => {
                    setEndHour(
                      e.target.value
                        .replace(/[^0-9]/g, '')
                        .replace(/^(\d{2})?(\d{2})?(\d{2})?/g, '$1:$2:$3')
                        .substr(0, e.target.placeholder.length),
                    )
                  }}
                  placeholder="HH:MM:SS"
                />
              </CInputGroup>
            </CCol>
          </CCol>
          <CCol sm={1} />
          {/*Second col*/}
          <CCol sm={5}>
            <CCol className="mb-5 d-flex flex-column">
              <div className="mb-3">?????? ????????????</div>
              <CInputGroup>
                <label htmlFor="ko" className="me-2" style={{ width: '70px' }}>
                  ????????????
                </label>
                <CFormInput
                  id="ko"
                  placeholder="????????? ??????????????????"
                  defaultValue={nameVote.ko}
                  onChange={(e) => {
                    setNameVote({ ...nameVote, ko: e.target.value })
                  }}
                />
              </CInputGroup>
              <CInputGroup className="my-2">
                <label htmlFor="en" className="me-2" style={{ width: '70px' }}>
                  ?????????
                </label>
                <CFormInput
                  id="en"
                  placeholder="????????? ??????????????????"
                  defaultValue={nameVote.en}
                  onChange={(e) => {
                    setNameVote({ ...nameVote, en: e.target.value })
                  }}
                />
              </CInputGroup>
              <CInputGroup>
                <label htmlFor="ch" className="me-2" style={{ width: '70px' }}>
                  ????????????
                </label>
                <CFormInput
                  id="ch"
                  placeholder="????????? ??????????????????"
                  defaultValue={nameVote.ch}
                  onChange={(e) => {
                    setNameVote({ ...nameVote, ch: e.target.value })
                  }}
                />
              </CInputGroup>
              <CInputGroup className="my-2">
                <label htmlFor="jp" className="me-2" style={{ width: '70px' }}>
                  ????????????
                </label>
                <CFormInput
                  id="jp"
                  placeholder="????????? ??????????????????"
                  defaultValue={nameVote.jp}
                  onChange={(e) => {
                    setNameVote({ ...nameVote, jp: e.target.value })
                  }}
                />
              </CInputGroup>
              <CInputGroup>
                <label htmlFor="es" className="me-2" style={{ width: '70px' }}>
                  ???????????????
                </label>
                <CFormInput
                  id="es"
                  placeholder="????????? ??????????????????"
                  defaultValue={nameVote.es}
                  onChange={(e) => {
                    setNameVote({ ...nameVote, es: e.target.value })
                  }}
                />
              </CInputGroup>
            </CCol>
            <CCol>
              <div className="me-4 mb-3">?????? ????????? (?????? : 0000 X 000 JPEG)??????</div>
              <div className="mb-3">
                <FileBtn
                  name="????????????"
                  title="vote"
                  fileData={(data) => {
                    setImgs({ ...imgs, ko: data })
                  }}
                  accept="image/*"
                  id="img"
                  imageUrl={imgs.ko}
                />
              </div>
              <div className="mb-3">
                <FileBtn
                  name="?????????"
                  title="vote"
                  fileData={(data) => {
                    setImgs({ ...imgs, en: data })
                  }}
                  accept="image/*"
                  id="img2"
                  imageUrl={imgs.en}
                />
              </div>
              <div className="mb-3">
                <FileBtn
                  name="????????????"
                  title="vote"
                  fileData={(data) => {
                    setImgs({ ...imgs, ch: data })
                  }}
                  accept="image/*"
                  id="img3"
                  imageUrl={imgs.ch}
                />
              </div>
              <div className="mb-3">
                <FileBtn
                  name="????????????"
                  title="vote"
                  fileData={(data) => {
                    setImgs({ ...imgs, jp: data })
                  }}
                  accept="image/*"
                  id="img4"
                  imageUrl={imgs.jp}
                />
              </div>
              <div className="mb-3">
                <FileBtn
                  name="???????????????"
                  title="vote"
                  fileData={(data) => {
                    setImgs({ ...imgs, es: data })
                  }}
                  accept="image/*"
                  id="img5"
                  imageUrl={imgs.es}
                />
              </div>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="form-footer">
        <CButton
          onClick={() => setIsModal(true)}
          className="form-footer__btn px-5"
          style={{ color: 'white' }}
          color="info"
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
      {isModal && (
        <CheckPopup
          onClickClose={() => setIsModal(false)}
          bodyContent={'??????????????? ?????????????????????????'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => onCloseOkEvent()}
          bodyContent={'????????? ?????? ???????????????.'}
        />
      )}
    </CModal>
  )
}

DetailEventVote.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onCloseOkEvent: PropTypes.func,
  onId: PropTypes.number.isRequired,
}

export default DetailEventVote
