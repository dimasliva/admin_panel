import React, { useEffect, useState } from 'react'
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
import axios from 'axios'
import { headerConfig } from '../../../../../static/axiosConfig'
import { statusCatch } from '../../../../../static/axiosCatch'
import { NormalPopup } from '../../../../../components/publicPopup/NormalPopup'
import moment from 'moment'
import { CheckPopup } from '../../../../../components/publicPopup/CheckPopup'

import { FileBtn } from 'src/components/FileBtn'
import FileApi from 'src/util/FileApi'

const DetailRewardAd = ({ onClickClose, onCloseOkEvent, onId }) => {
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isCreate, setIsCreate] = useState(false) // Create checked
  //Date
  const [isPriority, setPriority] = useState(0) // ok Modal
  const [isStatus, setStatus] = useState(0) // ok Modal
  const [isStartYear, setStartYear] = useState('')
  const [isStartHour, setStartHour] = useState('')
  const [isEndYear, setEndYear] = useState('')
  const [isEndHour, setEndHour] = useState('')
  const [eventTitle, setEventTitle] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [imgs, setImgs] = useState({ ko: '' })
  const [isAdLinks, setAdLinks] = useState('')
  let isAdLink
  const one = 1
  const [role, setRole] = useState('')
  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
    const res = await axios
      .get(`/api/reward_ad?id=${onId}`, headerConfig)
      .catch((err) => statusCatch(err))
    // start Day
    const start = moment(res.data.value.started_at).format('YYYY-MM-DD').split('-')
    const startTime = moment(res.data.value.started_at).format('HH:mm:ss').split(':')
    // end Day
    const end = moment(res.data.value.ended_at).format('YYYY-MM-DD').split('-')
    const endTime = moment(res.data.value.ended_at).format('HH:mm:ss').split(':')
    setImgs({
      ko: res.data.value.ad_img,
    })
    setPriority(res.data.value.priority)
    setAdLinks(res.data.value.ad_link.length === 0 ? '' : res.data.value.ad_link[0].url)
    setEventTitle(res.data.value.ad_title)
    setStartYear(start.join('-'))
    setStartHour(startTime.join(':'))
    setEndYear(end.join('-'))
    setEndHour(endTime.join(':'))
    setStatus(res.data.value.status)
  }
  const modify = async () => {
    if (role !== one) {
      if (imgs.ko instanceof File) {
        imgs.ko = await FileApi('artist', imgs.ko)
      }
      const data = {
        id: onId,
        priority: isPriority,
        ad_link: isAdLinks,
        ad_title: eventTitle,

        ad_img:
          imgs.ko.data === undefined || imgs.ko.data.value[0] === undefined
            ? imgs.ko
            : imgs.ko.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),

        started_at: moment(isStartYear + ' ' + isStartHour),
        ended_at: moment(isEndYear + ' ' + isEndHour),
        status: isStatus,
      }

      const res = await axios
        .post(`/api/reward_ad`, data, headerConfig)
        .catch((err) => statusCatch(err))

      if (!res.data.success) {
        alert('????????? ??????????????????.')
      } else {
        setIsOkCheck(true)
      }
    }
  }
  const closeModalEvent = () => {
    setIsOkCheck(false)
    onCloseOkEvent()
  }
  // delete checked
  const modalOkEvent = (value) => {
    if (value) {
      setIsCreate(false)
      modify()
    } else {
      setIsCreate(false)
    }
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol sm={6}>
            <CCol className="d-flex flex-column">
              <span>????????????????????????</span>
              <span className="text-danger">
                ??? ???????????? ??????????????? ?????? ex_0??? ?????? ???????????? ????????????
              </span>
              <CCol sm={3}>
                <CFormSelect
                  value={isPriority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="search-bar__select text-center mt-3"
                >
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
            <CCol className="my-4">
              <div className="my-2">?????? ????????????</div>
              <CCol className="d-flex flex-column">
                <div className="d-flex flex-row ">
                  <span style={{ width: '100px' }}>????????????</span>
                  <CFormInput
                    value={eventTitle.ko}
                    onChange={(e) => {
                      setEventTitle({
                        ...eventTitle,
                        ko: e.target.value,
                      })
                    }}
                    placeholder="????????? ??????????????????"
                  />
                </div>
                <div className="d-flex flex-row my-2">
                  <span style={{ width: '100px' }}>?????????</span>
                  <CFormInput
                    value={eventTitle.en}
                    onChange={(e) =>
                      setEventTitle({
                        ...eventTitle,
                        en: e.target.value,
                      })
                    }
                    placeholder="????????? ??????????????????"
                  />
                </div>
                <div className="d-flex flex-row">
                  <span style={{ width: '100px' }}>????????????</span>
                  <CFormInput
                    value={eventTitle.ch}
                    onChange={(e) =>
                      setEventTitle({
                        ...eventTitle,
                        ch: e.target.value,
                      })
                    }
                    placeholder="????????? ??????????????????"
                  />
                </div>
                <div className="d-flex flex-row my-2">
                  <span style={{ width: '100px' }}>????????????</span>
                  <CFormInput
                    value={eventTitle.jp}
                    onChange={(e) =>
                      setEventTitle({
                        ...eventTitle,
                        jp: e.target.value,
                      })
                    }
                    placeholder="????????? ??????????????????"
                  />
                </div>
                <div className="d-flex flex-row">
                  <span style={{ width: '100px' }}>???????????????</span>
                  <CFormInput
                    value={eventTitle.es}
                    onChange={(e) => {
                      setEventTitle({
                        ...eventTitle,
                        es: e.target.value,
                      })
                    }}
                    placeholder="????????? ??????????????????"
                  />
                </div>
              </CCol>
            </CCol>
            <CCol className="my-4">
              <div className="my-2">?????? ?????? ?????????</div>
              <CCol className="d-flex flex-column">
                <CFormTextarea
                  style={{ resize: 'none' }}
                  value={isAdLinks}
                  onChange={(e) => {
                    setAdLinks(e.target.value)
                    // isAdLink = e.target.value.replace(/\s+/g, ' ')
                    // if (e.nativeEvent.data === ',') {
                    //   if (isAdLink.length > 11 && !isAdLinks.includes(e.target.value)) {
                    //     isAdLink.split(',').forEach((link) => {
                    //       if (link !== '' && !isAdLinks.includes(e.target.value)) {
                    //         isAdLinks.push(link)
                    //       }
                    //     })
                    //   }
                    //   isAdLinks.filter((link, pos, self) => {
                    //     return self.indexOf(link) == pos + '\n'
                    //   })
                    //   e.target.value = ''
                    // }
                  }}
                  placeholder="https://www.youtube.com/watch?v=RGG"
                />
              </CCol>
            </CCol>
          </CCol>
          {/*Second column*/}
          <CCol sm={6}>
            <CCol className="my-4">
              <div className="mb-3">???????????????</div>
              <CCol className="d-flex flex-column">
                <div className="d-flex flex-row ">
                  <span style={{ width: '180px' }}>????????????</span>
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
                    placeholder="HH:MM:SS??????"
                  />
                </div>
                <div className="d-flex flex-row mt-3">
                  <span style={{ width: '180px' }}>????????????</span>
                  <CFormInput
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
                    placeholder="YYYY-MM-DD??????"
                    className="mx-2"
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
                    placeholder="HH:MM:SS???"
                  />
                </div>
              </CCol>
            </CCol>
            <CCol>
              <div className="mb-2">????????? ????????? (?????? : 0000 X 000 JPEG)?????????</div>
              <div className="d-flex flex-row">
                <span style={{ width: '50px' }}>????????????</span>
                <CCol>
                  <FileBtn
                    name="?????????"
                    title="reward_ad"
                    fileData={(data) => {
                      setImgs({ ...imgs, ko: data })
                    }}
                    accept="image/*"
                    id="main"
                    imageUrl={imgs.ko}
                  />
                </CCol>
              </div>
            </CCol>
            {/*9*/}
            <CCol>
              <div className="my-2">?????????????????????</div>
              <CCol sm={5}>
                <CFormSelect
                  value={isStatus}
                  onChange={(e) => setStatus(e.target.value)}
                  size="lg"
                  aria-label="Large select example"
                  className="mr-3 search-bar__select text-ce"
                  style={{ width: '130px' }}
                >
                  <option value={1}>?????????</option>
                  <option value={0}>????????????</option>
                  <option value={-1}>?????????</option>
                </CFormSelect>
              </CCol>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="form-footer">
        {role !== one && (
          <CButton
            onClick={() => setIsCreate(true)}
            style={{ color: 'white' }}
            color="info"
            className="form-footer__btn__ml form-footer__btn px-5"
          >
            ?????????
          </CButton>
        )}
        <CButton
          onClick={() => onClickClose()}
          style={{ color: 'black' }}
          color="light"
          className="form-footer__btn px-3"
        >
          ?????????
        </CButton>
      </CModalFooter>
      {isCreate && (
        <CheckPopup
          onClickClose={() => setIsCreate(false)}
          bodyContent={'?????? ?????? ????????? ?????????????????????????'}
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
DetailRewardAd.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onCloseOkEvent: PropTypes.func,
  onId: PropTypes.number.isRequired,
}
export default DetailRewardAd
