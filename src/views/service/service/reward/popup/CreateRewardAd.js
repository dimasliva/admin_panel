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
import { CheckPopup } from '../../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../../components/publicPopup/NormalPopup'
import moment from 'moment'

import { FileBtn } from 'src/components/FileBtn'
import FileApi from 'src/util/FileApi'

const CreateRewardAd = ({ onClickClose, onCloseOkEvent }) => {
  const [isModal, setIsModal] = useState(false) // delete check Modal
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  //Date
  const [isPriority, setPriority] = useState(1) // ok Modal
  const [isStartYear, setStartYear] = useState('')
  const [isStartHour, setStartHour] = useState('')
  const [isEndYear, setEndYear] = useState('')
  const [isEndHour, setEndHour] = useState('')
  const [isAdTitle, setAdTitle] = useState({
    ch: '',
    en: '',
    es: '',
    jp: '',
    ko: '',
  })
  const [imgs, setImgs] = useState({ ko: '' })
  const [isAdLink, setAdLink] = useState('')
  const [status, setStatus] = useState(1)
  const one = 1
  const [role, setRole] = useState('')
  // let isAdLink
  useEffect(() => {
    getRole()
  }, [])
  const getRole = async () => {
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
  }
  const create = async () => {
    if (role !== one) {
      if (isAdTitle.ko === '') {
        alert('광고 아이틀을 입력해 주세요.')
        return
      }
      if (isStartYear === '') {
        alert('게시기간을 선택해 주세요.')
        return
      }
      if (isStartHour === '') {
        alert('게시기간을 선택해 주세요.')
        return
      }
      if (isEndYear === '') {
        alert('게시기간을 선택해 주세요.')
        return
      }
      if (isEndHour === '') {
        alert('게시기간을 선택해 주세요.')
        return
      }
      if (imgs.ko instanceof File) {
        imgs.ko = await FileApi('artist', imgs.ko)
      }
      const data = {
        priority: isPriority,
        ad_link: [
          {
            url: encodeURI(isAdLink),
          },
        ],
        ad_title: isAdTitle,
        status,
        ad_img:
          imgs.ko.data === undefined || imgs.ko.data.value[0] === undefined
            ? imgs.ko
            : imgs.ko.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),

        started_at: moment(isStartYear + ' ' + isStartHour + ':00'),
        ended_at: moment(isEndYear + ' ' + isEndHour + ':00'),
      }

      const res = await axios.post(`/api/reward_ad`, data, headerConfig).catch((err) => {
        if (err.response.status === 400) {
          alert('해당 입력란을 정확히 입력해 주세요.')
          return
        }
        statusCatch(err)
      })
      if (!res) {
        return
      } else {
        if (!res.data.success) {
          alert('등록에 실패했습니다.')
        } else {
          setIsOkCheck(true)
        }
      }
    }
  }
  const closeModalEvent = () => {
    setIsOkCheck(false)
    onCloseOkEvent()
  }
  const modalOkEvent = (value) => {
    if (value) {
      setIsModal(false)
      create()
    } else {
      setIsModal(false)
    }
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol sm={6}>
            <CCol className="d-flex flex-column">
              <span>광고우선순위</span>
              <span className="text-danger">
                ※ 높을수록 우선순위가 높다 ex_0이 가장 마지막에 노출됨
              </span>
              <CCol sm={3}>
                <CFormSelect
                  onChange={(e) => {
                    setPriority(e.target.value)
                  }}
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
              <div className="my-2">광고 타이틀</div>
              <CCol className="d-flex flex-column">
                <div className="d-flex flex-row ">
                  <span style={{ width: '100px' }}>한국어</span>
                  <CFormInput
                    onChange={(e) => {
                      setAdTitle({ ...isAdTitle, ko: e.target.value })
                    }}
                    defaultValue={isAdTitle.ko}
                    placeholder="내용을 입력하세요"
                  />
                </div>
                <div className="d-flex flex-row my-2">
                  <span style={{ width: '100px' }}>영어</span>
                  <CFormInput
                    onChange={(e) => {
                      setAdTitle({ ...isAdTitle, en: e.target.value })
                    }}
                    defaultValue={isAdTitle.en}
                    placeholder="내용을 입력하세요"
                  />
                </div>
                <div className="d-flex flex-row">
                  <span style={{ width: '100px' }}>중국어</span>
                  <CFormInput
                    onChange={(e) => {
                      setAdTitle({ ...isAdTitle, ch: e.target.value })
                    }}
                    defaultValue={isAdTitle.ch}
                    placeholder="내용을 입력하세요"
                  />
                </div>
                <div className="d-flex flex-row my-2">
                  <span style={{ width: '100px' }}>일본어</span>
                  <CFormInput
                    onChange={(e) => {
                      setAdTitle({ ...isAdTitle, jp: e.target.value })
                    }}
                    defaultValue={isAdTitle.jp}
                    placeholder="내용을 입력하세요"
                  />
                </div>
                <div className="d-flex flex-row">
                  <span style={{ width: '100px' }}>스페인어</span>
                  <CFormInput
                    onChange={(e) => {
                      setAdTitle({ ...isAdTitle, es: e.target.value })
                    }}
                    defaultValue={isAdTitle.es}
                    placeholder="내용을 입력하세요"
                  />
                </div>
              </CCol>
            </CCol>
            <CCol className="my-4">
              <div className="my-2">광고 연결 링크</div>
              <CCol className="d-flex flex-column">
                <CFormTextarea
                  style={{ resize: 'none' }}
                  onChange={(e) => {
                    setAdLink(e.target.value)
                    // if (e.nativeEvent.data === ',') {
                    //   if (isAdLink.length > 11 && !isAdLinks.includes(isAdLink)) {
                    //     isAdLink.split(',').forEach((link) => {
                    //       if (link !== '') {
                    //         isAdLinks.push(link)
                    //       }
                    //     })
                    //   }
                    // e.target.value = ''
                    // }
                  }}
                  placeholder="https://www.youtube.com/watch?v=RGG"
                />
              </CCol>
            </CCol>
          </CCol>
          {/*Second column*/}
          <CCol sm={6}>
            <CCol sm={12}>
              <div className="my-2">게시기간​</div>
              <CCol sm={12} className="d-flex flex-row justify-content-between mt-4">
                <span className="text-nowrap" style={{ marginRight: '10px' }}>
                  시작일​
                </span>
                <CFormInput
                  type="date"
                  className="mx-2"
                  onChange={(e) => {
                    setStartYear(e.target.value)
                  }}
                  placeholder="YYYY-MM-DD​"
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
              <CCol sm={12} className="d-flex flex-row justify-content-between mt-2">
                <span className="text-nowrap" style={{ marginRight: '10px' }}>
                  종료일​
                </span>
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
            <CCol>
              <div className="mb-2 mt-4">썸네일 이미지 (권장 : 0000 X 000 JPEG)​​​</div>
              <div className="d-flex flex-row">
                <CCol>
                  <FileBtn
                    name="한국어"
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
              <div className="my-2">등록상태​​​</div>
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="mr-3 search-bar__select text-ce"
                onChange={(e) => setStatus(e.target.value)}
                style={{ width: '130px' }}
              >
                <option value={1}>진행중</option>
                <option value={0}>비활성​</option>
                <option value={-1}>삭제​</option>
              </CFormSelect>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="form-footer">
        <CButton
          style={{ color: 'white' }}
          color="info"
          className="form-footer__btn__ml form-footer__btn px-5"
          onClick={() => setIsModal(true)}
        >
          저장​
        </CButton>
        <CButton
          onClick={() => onClickClose()}
          style={{ color: 'black' }}
          color="light"
          className="form-footer__btn px-3"
        >
          닫기​
        </CButton>
      </CModalFooter>
      {isModal && (
        <CheckPopup
          onClickClose={() => setIsModal(false)}
          bodyContent={'해당 내용으로 등록하시겠습니까?'}
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
CreateRewardAd.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onCloseOkEvent: PropTypes.func,
}
export default CreateRewardAd
