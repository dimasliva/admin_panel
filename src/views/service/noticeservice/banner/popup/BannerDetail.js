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
  CTable,
  CTableDataCell,
  CTableRow,
} from '@coreui/react'
import axios from 'axios'
import { headerConfig } from '../../../../../static/axiosConfig'
import { statusCatch } from '../../../../../static/axiosCatch'
import moment from 'moment'

import { FileBtn } from 'src/components/FileBtn'
import FileApi from 'src/util/FileApi'

import { CheckPopup } from '../../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../../components/publicPopup/NormalPopup'

const BannerDetail = ({ onClickClose, onEndEvent, onId }) => {
  const [isBannerContent, setIsBannerContent] = useState(false) // Detail Popup
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isStatus, setStatus] = useState()
  const [isType, setType] = useState()
  const [isPriority, setPriority] = useState()
  const [isPlaceBanner, setPlaceBanner] = useState()
  const [isTypeBanner, setTypeBanner] = useState()
  const [isGoal, setGoal] = useState('')
  const [isLink, setLink] = useState('')
  const [isStartYear, setStartYear] = useState('')
  const [isStartHour, setStartHour] = useState('')
  const [isEndYear, setEndYear] = useState('')
  const [isEndHour, setEndHour] = useState('')
  const [isTitleBanner, setTitleBanner] = useState({
    ch: '',
    en: '',
    es: '',
    jp: '',
    ko: '',
  })
  //Date
  const [imgs, setImgs] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const one = 1
  const [role, setRole] = useState('')
  useEffect(() => {
    getList()
  }, [])

  // Talk Data communication
  const getList = async () => {
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
    const res = await axios
      .get(`/api/link?id=${onId}`, headerConfig)
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
    if (res.data.value.title_banner !== null) {
      setTitleBanner({
        ko: res.data.value.title_banner.ko,
        en: res.data.value.title_banner.en,
        ch: res.data.value.title_banner.ch,
        jp: res.data.value.title_banner.jp,
        es: res.data.value.title_banner.es,
      })
    }
    setPlaceBanner(res.data.value.place_banner)
    setTypeBanner(res.data.value.type_banner)
    setType(res.data.value.type)
    setPriority(res.data.value.priority)
    setGoal(res.data.value.goal)
    setLink(res.data.value.link === null ? '' : res.data.value.link)
    setImgs({
      ko: res.data.value.img_banner.ko,
      en: res.data.value.img_banner.en,
      ch: res.data.value.img_banner.ch,
      jp: res.data.value.img_banner.jp,
      es: res.data.value.img_banner.es,
    })
    setStatus(res.data.value.status)
    setType(res.data.value.type)
  }
  const modify = async () => {
    if (imgs.ko instanceof File) {
      imgs.ko = await FileApi('banner', imgs.ko)
    }
    if (imgs.en instanceof File) {
      imgs.en = await FileApi('banner', imgs.en)
    }
    if (imgs.ch instanceof File) {
      imgs.ch = await FileApi('banner', imgs.ch)
    }
    if (imgs.jp instanceof File) {
      imgs.jp = await FileApi('banner', imgs.jp)
    }
    if (imgs.es instanceof File) {
      imgs.es = await FileApi('banner', imgs.es)
    }
    const data = {
      id: onId,
      type: isType,
      type_banner: isTypeBanner,
      place_banner: isPlaceBanner,
      priority: isPriority,
      title_banner: isTitleBanner,
      img_banner: {
        ko:
          imgs.ko.data === undefined || imgs.ko.data.value[0] === undefined
            ? imgs.ko
            : imgs.ko.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        en:
          imgs.en.data === undefined || imgs.en.data.value[0] === undefined
            ? imgs.en
            : imgs.en.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        ch:
          imgs.ch.data === undefined || imgs.ch.data.value[0] === undefined
            ? imgs.ch
            : imgs.ch.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        jp:
          imgs.jp.data === undefined || imgs.jp.data.value[0] === undefined
            ? imgs.jp
            : imgs.jp.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        es:
          imgs.es.data === undefined || imgs.es.data.value[0] === undefined
            ? imgs.es
            : imgs.es.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
      },
      goal: isGoal,
      link: isLink,
      status: isStatus,
      started_at: moment(isStartYear + ' ' + isStartHour)
        .subtract(11, 'hours')
        .format(),
      ended_at: moment(isEndYear + ' ' + isEndHour)
        .subtract(11, 'hours')
        .format(),
    }
    const res = await axios.post(`/api/link`, data, headerConfig).catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }
  const closeModalEvent = () => {
    setIsOkCheck(false)
    onEndEvent()
  }
  const modalOkEvent = (value) => {
    if (value) {
      setIsBannerContent(false)
      modify()
    } else {
      setIsBannerContent(false)
    }
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol sm={5}>
            <CTable>
              <CTableRow>
                <CTableDataCell>
                  <span>배너위치​</span>
                </CTableDataCell>
                <CTableDataCell>
                  <CFormSelect
                    size="lg"
                    aria-label="Large select example"
                    className="search-bar__select"
                    style={{ width: '130px' }}
                    value={isPlaceBanner}
                    onChange={(e) => {
                      setPlaceBanner(e.target.value)
                    }}
                  >
                    <option value={1}>메인 홈</option>
                    <option value={2}>충전소​</option>
                  </CFormSelect>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell className="my-5" />
              </CTableRow>
              {/*Second row*/}
              <CTableRow>
                <CTableDataCell>
                  <span>배너타입​</span>
                </CTableDataCell>
                <CTableDataCell>
                  <CFormSelect
                    size="lg"
                    aria-label="Large select example"
                    className="search-bar__select"
                    style={{ width: '230px' }}
                    value={isTypeBanner}
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
                </CTableDataCell>
              </CTableRow>
            </CTable>
            <CCol className="d-flex flex-column mt-4">
              <span className="me-4">배너우선순위​</span>
              <span className="mb-4 text-danger">
                ※ 높을수록 우선순위가 높다 ex_0이 가장 마지막에 노출됨​
              </span>
              <CCol sm={12}>
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="text-center search-bar__select"
                  style={{ width: '130px' }}
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
                <label style={{ width: '90px' }}>구분용</label>
                <CFormTextarea
                  style={{ resize: 'none' }}
                  value={isTitleBanner.ko}
                  onChange={(e) => {
                    setTitleBanner({ ...isTitleBanner, ko: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                ></CFormTextarea>
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '90px' }}>메모용</label>
                <CFormTextarea
                  style={{ resize: 'none' }}
                  value={isTitleBanner.en}
                  onChange={(e) => {
                    setTitleBanner({ ...isTitleBanner, en: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                ></CFormTextarea>
              </div>
              {/* <div className="mb-2">이벤트 팬톡 주제​</div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '90px' }}>한국어​</label>
                <CFormInput
                  defaultValue={isTitleBanner.ko}
                  onChange={(e) => {
                    setTitleBanner({ ...isTitleBanner, ko: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '90px' }}>영어​</label>
                <CFormInput
                  defaultValue={isTitleBanner.en}
                  onChange={(e) => {
                    setTitleBanner({ ...isTitleBanner, en: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '90px' }}>중국어​</label>
                <CFormInput
                  defaultValue={isTitleBanner.ch}
                  onChange={(e) => {
                    setTitleBanner({ ...isTitleBanner, ch: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '90px' }}>일본어​</label>
                <CFormInput
                  defaultValue={isTitleBanner.jp}
                  onChange={(e) => {
                    setTitleBanner({ ...isTitleBanner, jp: e.target.value })
                  }}
                  placeholder="내용을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row my-1">
                <label style={{ width: '90px' }}>스페인어​</label>
                <CFormInput
                  defaultValue={isTitleBanner.es}
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
                defaultValue={isGoal}
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
                defaultValue={isLink}
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
              <div className="my-2">게시기간​</div>
              <CCol className="d-flex flex-row my-4">
                <label className="me-1" style={{ width: '150px' }}>
                  시작일​
                </label>
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
                  placeholder="YYYY-MM-DD​​"
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
                    setEndYear(
                      moment(e.target.value, 'YYYY-MM-DD')
                        .format('YYYY-MM-DD')
                        .replace(/[^0-9]/g, '')
                        .replace(/^(\d{4})?(\d{2})?(\d{2})?/g, '$1-$2-$3')
                        .substr(0, e.target.placeholder.length - 1),
                    )
                  }}
                  placeholder="YYYY-MM-DD​​"
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
                  placeholder="HH:MM:SS​"
                />
              </CCol>
            </CCol>
            {/*2*/}
            <CCol>
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
            {/*10*/}
            <CCol>
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
            {/*11*/}
            <CCol>
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
            {/*  12  */}
            <CCol>
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
            <CCol>
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
            <CCol sm={5} className="d-flex flex-column align-items-center">
              <div>등록상태​</div>
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="text-center search-bar__select"
                value={isStatus}
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
        {role !== one && (
          <CButton
            color="info"
            style={{ color: 'white' }}
            className="px-4 form-footer__btn__ml form-footer__btn"
            onClick={() => setIsBannerContent(true)}
          >
            저장​
          </CButton>
        )}
        <CButton
          onClick={() => onClickClose()}
          style={{ color: 'black' }}
          color="light"
          className="form-footer__btn"
        >
          닫기
        </CButton>
      </CModalFooter>
      {isBannerContent && role !== one && (
        <CheckPopup
          onClickClose={() => setIsBannerContent(false)}
          bodyContent={'배너을 수정하시겠습니까?'}
          title={'등록'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'수정이 완료되었습니다.'}
        />
      )}
    </CModal>
  )
}
BannerDetail.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.number.isRequired,
  onEndEvent: PropTypes.func,
}
export default BannerDetail
