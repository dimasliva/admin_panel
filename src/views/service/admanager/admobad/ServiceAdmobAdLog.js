import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormSelect,
  CImage,
  CInputGroup,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTabPane,
} from '@coreui/react'
import { UserDetail } from '../../../member/popup/UserDetail'
import moment from 'moment'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import { CheckPopup } from '../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../components/publicPopup/NormalPopup'
import { ImgBig } from 'src/components/publicPopup/ImgBig'
import heart from './assets/new_heart.png'
import star from './assets/new_star.png'
import fanpick from './assets/fanpick.png'
const ServiceAdmobAdLog = () => {
  // useState
  const [activeKey, setActiveKey] = useState(1)
  const [isUserInfo, setIsUserInfo] = useState({ use: false, id: '' }) // Detail Popup
  const [isImg, setIsImg] = useState({ use: false, img: '' }) // img detail
  //Table title
  const tableEtcAd = [
    { label: '지급일​' },
    { label: '타입​' },
    { label: '보상​' },
    { label: '개수' },
    { label: '사용자 정보​' },
    { label: '​​플랫폼' },
    { label: '광고 ID' },
  ]
  const [listTab1, setListTab1] = useState(null)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [isCid, setCid] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [isOkCheck, setIsOkCheck] = useState(false)
  //Create
  const [isAdVersion, setAdVersion] = useState({
    service_id: '',
    sign: '',
    version: '',
    setting: {
      policy: { ch: '', en: '', es: '', jp: '', ko: '' },
      type_point: '',
      award_point: '',
      max_use_hour: '',
    },
    action: {
      login: '',
      last_name: '',
      first_name: '',
    },
    created_at: '',
    updated_at: '',
  })
  const [isSettings, setSettings] = useState({
    max_use_hour: '',
    award_point: '',
    type_point: '',
    policy: {
      ch: '',
      en: '',
      es: '',
      jp: '',
      ko: '',
    },
  })
  const [policy, setPolicy] = useState({
    ch: isSettings.policy.ch,
    en: isSettings.policy.en,
    es: isSettings.policy.es,
    jp: isSettings.policy.jp,
    ko: isSettings.policy.ko,
  })
  const [typePoint, setTypePoint] = useState(isSettings.type_point)
  useEffect(() => {
    if (activeKey === 1) {
      getList({ page: 1 })
    } else if (activeKey === 2) {
      getAdMob()
    }
  }, [activeKey])
  const getList = async (params) => {
    if (!params) {
      params = {}
    }

    if (params.page === undefined) {
      params.page = page
    }
    if (params.cid === undefined) {
      params.cid = isCid
    }

    const queries = []
    if (params.page) {
      if (params.page > 1) {
        queries.push(`page=1`)
        queries.push(`limit=${30 * params.page}`)
      } else {
        queries.push(`page=${params.page}`)
        queries.push(`limit=30`)
      }
    } else {
      queries.push(`page=${params.page}`)
      queries.push(`limit=30`)
    }
    queries.push(`cid=${params.cid}`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''

    const res = await axios
      .get(`/api/user/ad/stat${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (params.isSort !== undefined) {
      if (params.isSort) {
        setListTab1(res.data.value.items)
      }
    } else {
      if (params.page > 1) {
        res.data.value.items.map((value) => listTab1.push(value))
        setListTab1([...listTab1])
      } else {
        setListTab1(res.data.value.items)
      }
    }
  }
  const getAdMob = async () => {
    const res = await axios.get(`/api/setting/admob`, headerConfig).catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    setSettings(res.data.value.setting)
    setTypePoint(res.data.value.setting.type_point)
    setAdVersion(res.data.value)
  }
  //Create
  const create = async () => {
    const data = {
      setting: {
        max_use_hour: isSettings.max_use_hour,
        award_point: isSettings.award_point,
        type_point: typePoint,
        policy: {
          ch: policy.ch,
          en: policy.en,
          es: policy.es,
          jp: policy.jp,
          ko: policy.ko,
        },
      },
    }
    const res = await axios
      .post(`/api/setting/admob`, data, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) {
      alert('등록에 실패했습니다.')
    } else {
      setIsOkCheck(true)
    }
  }
  const closeModalEvent = () => {
    setIsOkCheck(false)
    getAdMob()
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
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CNav variant="tabs" className="mt-2 nav-custom">
            <CNavItem>
              <CNavLink
                className="cursor custom-tab-color-main"
                active={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                애드몹 광고로그​
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                className="cursor custom-tab-color-main"
                active={activeKey === 2}
                onClick={() => setActiveKey(2)}
              >
                애드몹 광고 관리​
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CTabContent>
              <CTabPane role="tabpanel" visible={activeKey === 1}>
                <CCol sm={5}>
                  <CInputGroup className="mb-3">
                    <CFormInput className="text-center" placeholder="CID를 입력하세요​" />
                    <CButton
                      type="button"
                      style={{ color: 'white' }}
                      color="info"
                      id="basic-addon1"
                      onChange={(e) => {
                        setCid(e.target.value)
                      }}
                    >
                      조회​
                    </CButton>
                  </CInputGroup>
                </CCol>
                <CRow className="g-3">
                  <CCol>
                    {/*Table*/}
                    <CCol>
                      <CTable bordered>
                        <CTableHead>
                          <CTableRow>
                            {tableEtcAd.map((title, index) => {
                              return (
                                <CTableHeaderCell className="text-center" scope="col" key={index}>
                                  {title.label}
                                </CTableHeaderCell>
                              )
                            })}
                          </CTableRow>
                        </CTableHead>
                        {/*Table body*/}
                        <CTableBody>
                          {listTab1 !== null && listTab1 !== undefined ? (
                            listTab1.map((value, index) => {
                              const craetedDay = {
                                day:
                                  value.created_at !== null
                                    ? moment(value.created_at).format('YYYY-MM-DD')
                                    : '',
                                time:
                                  value.created_at !== null
                                    ? moment(value.created_at).format('HH:mm:ss')
                                    : '',
                              }
                              return (
                                <CTableRow key={index}>
                                  <CTableDataCell scope="row" className="text-break">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                      <span>{craetedDay.day}</span>
                                      <span>{craetedDay.time}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-break">
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <span>
                                        {value.type === 1
                                          ? '오퍼월'
                                          : value.type === 2
                                          ? 'tnk'
                                          : '오퍼월'}
                                      </span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-break" style={{ width: '150px' }}>
                                    <div className="d-flex flex-row align-items-center justify-content-start">
                                      <CImage
                                        style={{
                                          borderRadius: '50%',
                                          width: '50px',
                                          height: '50px',
                                          marginRight: '10px',
                                        }}
                                        src={
                                          value.type_point === 1
                                            ? heart
                                            : value.type_point === 2
                                            ? heart
                                            : value.type_point === 3
                                            ? star
                                            : fanpick
                                        }
                                      />
                                      <span>
                                        {value.type_point === 1
                                          ? '하트1'
                                          : value.type_point === 2
                                          ? '하트2'
                                          : value.type_point === 3
                                          ? '스타포인트​'
                                          : '팬픽포인트​'}
                                      </span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell scope="row" className="text-break">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                      <span>{value.award_point}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-break" style={{ width: '150px' }}>
                                    <div className="d-flex flex-row align-items-center justify-content-start">
                                      <CImage
                                        className="cursor"
                                        style={{
                                          borderRadius: '50%',
                                          width: '50px',
                                          height: '50px',
                                          marginRight: '10px',
                                        }}
                                        src={process.env.REACT_APP_IMG + value.avatar}
                                        onClick={() =>
                                          setIsImg({
                                            use: true,
                                            img:
                                              value.avatar !== '' || value.avatar !== null
                                                ? process.env.REACT_APP_IMG + value.avatar
                                                : '',
                                          })
                                        }
                                      />
                                      <span
                                        onClick={() => {
                                          setIsUserInfo({ use: true, id: value.user_id })
                                        }}
                                        style={{ color: 'blue', cursor: 'pointer' }}
                                      >
                                        {value.nickname && value.nickname.length > 9
                                          ? value.nickname.substr(0, 9) + '...'
                                          : value.nickname}
                                      </span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell scope="row" className="text-break">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                      <span>{value.device.platform}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell scope="row" className="text-break">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                      <span>
                                        <span key={index}>{value.ad_token.admob}</span>​
                                      </span>
                                    </div>
                                  </CTableDataCell>
                                </CTableRow>
                              )
                            })
                          ) : (
                            <CTableRow />
                          )}
                        </CTableBody>
                      </CTable>
                      {page !== pages && (
                        <CButton
                          color="dark"
                          size="sm"
                          className="moreBt"
                          onClick={() => {
                            getList({ page: page + 1 })
                            setPage(page + 1)
                          }}
                        >
                          더보기
                        </CButton>
                      )}
                    </CCol>
                  </CCol>
                </CRow>
              </CTabPane>
              <CTabPane role="tabpanel" visible={activeKey === 2}>
                <CRow>
                  <CCol>
                    <CCol className="d-flex flex-column">
                      <span>version.{isAdVersion.version}</span>
                      <div>
                        <span>
                          {moment(isAdVersion.updated_at).format('YYYY-MM-DD HH:mm:ss')}에{' '}
                        </span>
                        <span style={{ color: 'blue' }}>
                          {isAdVersion.action.first_name} {isAdVersion.action.last_name}{' '}
                        </span>
                        <span>이 마지막 정책 수정 </span>
                      </div>
                    </CCol>
                    <CCol sm={6} className="d-flex flex-column my-4">
                      <CCol className="d-flex flex-column">
                        <span>시간당 동영상 재생횟수</span>
                        <div className="d-flex flex-row align-items-center mt-2">
                          <CFormInput
                            type="number"
                            onKeyPress={(e) => {
                              let ch = String.fromCharCode(e.which)
                              if (!/[0-9]/.test(ch)) {
                                e.preventDefault()
                              }
                            }}
                            onChange={(e) => {
                              setSettings({ ...isSettings, max_use_hour: e.target.value })
                            }}
                            defaultValue={isSettings.max_use_hour}
                            className="text-end me-2"
                            style={{ width: '200px' }}
                          />
                          <span style={{ width: '40px' }}>횟수​</span>
                        </div>
                      </CCol>
                    </CCol>
                    <CCol sm={6} className="d-flex flex-column my-4">
                      <CCol className="d-flex flex-column">
                        <span>광고 1회 지급 포인트 수​</span>
                        <div className="d-flex flex-row align-items-center mt-2">
                          <CFormInput
                            type="number"
                            onKeyPress={(e) => {
                              let ch = String.fromCharCode(e.which)
                              if (!/[0-9]/.test(ch)) {
                                e.preventDefault()
                              }
                            }}
                            onChange={(e) => {
                              setSettings({ ...isSettings, award_point: e.target.value })
                            }}
                            defaultValue={isSettings.award_point}
                            style={{ width: '200px' }}
                            className="text-end me-2"
                          />
                          <span style={{ width: '40px' }}>p</span>
                        </div>
                      </CCol>
                    </CCol>
                    <CCol className="my-4">
                      <span>포인트종류 선택박스</span>
                      <CFormSelect
                        size="lg"
                        aria-label="Large select example"
                        style={{ width: '170px' }}
                        className="mt-2 search-bar__select text-center"
                        value={typePoint}
                        type="number"
                        onChange={(e) => setTypePoint(e.target.value)}
                      >
                        <option value={1}>포인트종류</option>
                        <option value={2}>하트1포인트​</option>
                        <option value={3}>하트2포인트​</option>
                        <option value={4}>스타포인트​</option>
                        <option value={5}>팬픽포인트​</option>
                      </CFormSelect>
                    </CCol>
                    <CCol sm={7} className="my-4">
                      <div className="my-2">광고 타이틀​</div>
                      <CCol className="d-flex flex-column">
                        <div className="d-flex flex-row ">
                          <span style={{ width: '100px' }}>한국어​</span>
                          <CFormInput
                            defaultValue={isSettings.policy.ko}
                            onChange={(e) => {
                              setPolicy({ ...policy, ko: e.target.value })
                            }}
                            placeholder="내용을 입력하세요​"
                          />
                        </div>
                        <div className="d-flex flex-row my-2">
                          <span style={{ width: '100px' }}>영어​</span>
                          <CFormInput
                            defaultValue={isSettings.policy.en}
                            onChange={(e) => {
                              setPolicy({ ...policy, en: e.target.value })
                            }}
                            placeholder="내용을 입력하세요​"
                          />
                        </div>
                        <div className="d-flex flex-row">
                          <span style={{ width: '100px' }}>중국어​</span>
                          <CFormInput
                            defaultValue={isSettings.policy.ch}
                            onChange={(e) => {
                              setPolicy({ ...policy, ch: e.target.value })
                            }}
                            placeholder="내용을 입력하세요​"
                          />
                        </div>
                        <div className="d-flex flex-row my-2">
                          <span style={{ width: '100px' }}>일본어​</span>
                          <CFormInput
                            defaultValue={isSettings.policy.jp}
                            onChange={(e) => {
                              setPolicy({ ...policy, jp: e.target.value })
                            }}
                            placeholder="내용을 입력하세요​"
                          />
                        </div>
                        <div className="d-flex flex-row">
                          <span style={{ width: '100px' }}>스페인어​</span>
                          <CFormInput
                            defaultValue={isSettings.policy.es}
                            onChange={(e) => {
                              setPolicy({ ...policy, es: e.target.value })
                            }}
                            placeholder="내용을 입력하세요​"
                          />
                        </div>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CButton
                        style={{ color: 'white' }}
                        color="info"
                        className="float-end form-footer__btn__ml form-footer__btn px-5"
                        onClick={() => setIsModal(true)}
                      >
                        저장​
                      </CButton>
                    </CCol>
                  </CCol>
                </CRow>
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
      {isUserInfo.use && (
        <UserDetail
          onClickClose={() => setIsUserInfo({ use: false, id: '' })}
          onId={isUserInfo.id}
        />
      )}
      {isImg.use && (
        <ImgBig
          onClickClose={() =>
            setIsImg({
              use: false,
              img: '',
            })
          }
          onImg={isImg.img}
        />
      )}
      {isModal && (
        <CheckPopup
          onClickClose={() => setIsModal(false)}
          bodyContent={'애드몹 광고 내용을 수정하시겠습니까?'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'성공적으로 수정되었습니다.'}
        />
      )}
    </CRow>
  )
}
ServiceAdmobAdLog.propTypes = {
  history: PropTypes.object,
}

export default ServiceAdmobAdLog
