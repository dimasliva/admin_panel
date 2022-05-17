import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CNav,
  CNavItem,
  CNavLink,
  CButton,
  CFormInput,
  CCardFooter,
  CFormTextarea,
} from '@coreui/react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { statusCatch } from 'src/static/axiosCatch'
import { headerConfig } from 'src/static/axiosConfig'
import { CheckPopup } from 'src/components/publicPopup/CheckPopup'
import { NormalPopup } from 'src/components/publicPopup/NormalPopup'
import moment from 'moment'

const SupportProductDo = (props) => {
  const [isModal, setIsModal] = useState(false) // modify check Modal
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [version, setVersion] = useState(0)
  const [date, setDate] = useState('')
  const [lastName, setLastName] = useState('')
  const [covid, setCovid] = useState([
    {
      ko: '',
      etc: '',
      code: '',
    },
  ])
  const [weak, setWeak] = useState([
    {
      ko: '',
      etc: '',
      code: '',
    },
  ])
  const [etc, setEtc] = useState([
    {
      ko: '',
      etc: '',
      code: '',
    },
  ])
  const [maxVote, setMaxVote] = useState('')
  const [startPoint, setStartPoint] = useState('')
  const [policy, setPolicy] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  // button add event
  const addInput = (value) => {
    if (value === 1) {
      setCovid([
        ...covid,
        {
          ko: '',
          etc: '',
          code: '',
        },
      ])
    } else if (value === 2) {
      setWeak([
        ...weak,
        {
          ko: '',
          etc: '',
          code: '',
        },
      ])
    } else if (value === 3) {
      setEtc([
        ...etc,
        {
          ko: '',
          etc: '',
          code: '',
        },
      ])
    }
  }
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
      .get(`/api/fan/support/setting?service_id=2`, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) return
    const type1 = []
    const type2 = []
    const type3 = []
    res.data.value.items[0] === undefined
      ? (res.data.value.items[0] = covid)
      : res.data.value.items[0].donate_title.map((value) => type1.push(value))
    res.data.value.items[1] === undefined
      ? (res.data.value.items[1] = weak)
      : res.data.value.items[1].donate_title.map((value) => type2.push(value))
    res.data.value.items[2] === undefined
      ? (res.data.value.items[2] = etc)
      : res.data.value.items[2].donate_title.map((value) => type3.push(value))
    setLastName(res.data.value.action ? res.data.value.action.last_name : 'none')
    setVersion(res.data.value.version)
    setDate(moment(res.data.value.updated_at).format('YYYY-MM-DD HH:mm:ss'))
    setCovid(type1)
    setWeak(type2)
    setEtc(type3)
    setMaxVote(res.data.value.setting.max_day_vote)
    setStartPoint(res.data.value.setting.start_point)
    setPolicy({
      ko: res.data.value.setting.policy.ko,
      en: res.data.value.setting.policy.en,
      ch: res.data.value.setting.policy.ch,
      jp: res.data.value.setting.policy.jp,
      es: res.data.value.setting.policy.es,
    })
  }

  const create = async () => {
    const data = {
      service_id: 2,
      donate_title: [covid, weak, etc] /*{
        1: covid,
        2: weak,
        3: etc,
      }*/,
      version: parseInt(version) + 1,
      setting: {
        policy: {
          ko: policy.ko,
          en: policy.en,
          ch: policy.ch,
          jp: policy.jp,
          es: policy.es,
        },
        start_point: parseInt(startPoint),
        max_day_vote: parseInt(maxVote),
      },
    }
    const res = await axios
      .post(`/api/fan/support/setting`, data, headerConfig)
      .catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('올바르게 작성 후 다시 시도해 주세요.')
    }
  }

  // modify checked
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
    getList()
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CNav variant="tabs" className="mt-2 nav-custom">
            <CNavItem className="nav-custom__column">
              <CNavLink
                className="cursor custom-tab-color"
                onClick={() => props.history.push('/support/product')}
              >
                전체 상품관리
              </CNavLink>
            </CNavItem>
            <CNavItem className="nav-custom__column">
              <CNavLink
                className="cursor custom-tab-color"
                onClick={() => props.history.push('/support/product/group')}
              >
                전체 그룹 관리
              </CNavLink>
            </CNavItem>
            <CNavItem className="nav-custom__column">
              <CNavLink
                className="cursor custom-tab-color"
                onClick={() => props.history.push('/support/product/ad')}
              >
                광고 상품 관리
              </CNavLink>
            </CNavItem>
            <CNavItem className="nav-custom__column">
              <CNavLink
                active
                className="cursor custom-tab-color-main"
                onClick={() => props.history.push('/support/product/donation')}
              >
                기부 상품 관리
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CCol>
              <div>
                <div className="header-version">
                  <div className="header-version__title">version. {version}</div>
                  <span className="header-version__description">
                    {date}에 <span className="style-color-blue">{lastName}</span>이 마지막 정책 수정
                  </span>
                </div>
                <div className="body-content my-3">
                  <div style={{ width: '80%' }} className="d-flex justify-content-between my-3">
                    <span className="body-content__header__title">기부분야</span>
                    <span className="body-content__header__len1">한국어</span>
                    <span style={{ marginLeft: '3%' }}>기타언어</span>
                    <span style={{ marginLeft: '5%' }}>코드</span>
                  </div>
                  <div className="body-content__body">
                    <div className="d-flex flex-row">
                      <span style={{ width: '85px' }}>코로나</span>
                      <div style={{ width: '7%' }}>
                        <CButton
                          color="info"
                          className="form-footer__bt__ml form-footer__bt"
                          style={{ color: 'white' }}
                          onClick={() => addInput(1)}
                        >
                          +
                        </CButton>
                      </div>
                      <div style={{ width: '80%' }}>
                        {covid !== null && covid !== undefined ? (
                          covid.map((value, index) => {
                            return (
                              <div key={index} style={{ display: 'flex' }} className="mb-3">
                                <CFormTextarea
                                  placeholder="내용을 입력하세요"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                  style={{ width: '50%', marginRight: '15px' }}
                                  value={value.ko}
                                  onChange={(e) => {
                                    covid[index].ko = e.target.value
                                    setCovid([...covid])
                                  }}
                                />
                                <CFormTextarea
                                  placeholder="내용을 입력하세요"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                  style={{ width: '50%', marginRight: '15px' }}
                                  value={value.etc}
                                  onChange={(e) => {
                                    covid[index].etc = e.target.value
                                    setCovid([...covid])
                                  }}
                                />
                                <CFormTextarea
                                  placeholder="내용을 입력하세요"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                  style={{ width: '50%' }}
                                  value={value.code}
                                  onChange={(e) => {
                                    covid[index].code = e.target.value
                                    setCovid([...covid])
                                  }}
                                />
                                <button
                                  style={{
                                    marginLeft: '10px',
                                    backgroundColor: 'white',
                                    border: 'none',
                                    color: 'red',
                                  }}
                                  onClick={() => {
                                    covid.splice(index, 1)
                                    setCovid([...covid])
                                  }}
                                >
                                  x
                                </button>
                              </div>
                            )
                          })
                        ) : (
                          <div />
                        )}
                      </div>
                    </div>
                    <div className="body-content__body__column d-flex flex-row">
                      <span style={{ width: '85px' }}>취약계층</span>
                      <div style={{ width: '7%' }}>
                        <CButton
                          color="info"
                          className="form-footer__bt__ml form-footer__bt"
                          style={{ color: 'white' }}
                          onClick={() => addInput(2)}
                        >
                          +
                        </CButton>
                      </div>
                      <div style={{ width: '80%' }}>
                        {weak !== null && weak !== undefined ? (
                          weak.map((value, index) => {
                            return (
                              <div key={index} style={{ display: 'flex' }} className="mb-3">
                                <CFormTextarea
                                  placeholder="내용을 입력하세요"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                  style={{ width: '50%', marginRight: '15px' }}
                                  value={value.ko}
                                  onChange={(e) => {
                                    weak[index].ko = e.target.value
                                    setWeak([...weak])
                                  }}
                                />
                                <CFormTextarea
                                  placeholder="내용을 입력하세요"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                  style={{ width: '50%', marginRight: '15px' }}
                                  value={value.etc}
                                  onChange={(e) => {
                                    weak[index].etc = e.target.value
                                    setWeak([...weak])
                                  }}
                                />
                                <CFormTextarea
                                  placeholder="내용을 입력하세요"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                  style={{ width: '50%' }}
                                  value={value.code}
                                  onChange={(e) => {
                                    weak[index].code = e.target.value
                                    setWeak([...weak])
                                  }}
                                />
                                <button
                                  style={{
                                    marginLeft: '10px',
                                    backgroundColor: 'white',
                                    border: 'none',
                                    color: 'red',
                                  }}
                                  onClick={() => {
                                    weak.splice(index, 1)
                                    setWeak([...weak])
                                  }}
                                >
                                  x
                                </button>
                              </div>
                            )
                          })
                        ) : (
                          <div />
                        )}
                      </div>
                    </div>
                    <div className="body-content__body__column d-flex flex-row">
                      <span style={{ width: '85px' }}>기타</span>
                      <div style={{ width: '7%' }}>
                        <CButton
                          color="info"
                          className="form-footer__bt__ml form-footer__bt"
                          style={{ color: 'white' }}
                          onClick={() => addInput(3)}
                        >
                          +
                        </CButton>
                      </div>
                      <div style={{ width: '80%' }}>
                        {etc !== null && etc !== undefined ? (
                          etc.map((value, index) => {
                            return (
                              <div key={index} style={{ display: 'flex' }} className="mb-3">
                                <CFormTextarea
                                  placeholder="내용을 입력하세요"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                  style={{ width: '50%', marginRight: '15px' }}
                                  value={value.ko}
                                  onChange={(e) => {
                                    etc[index].ko = e.target.value
                                    setEtc([...etc])
                                  }}
                                />
                                <CFormTextarea
                                  placeholder="내용을 입력하세요"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                  style={{ width: '50%', marginRight: '15px' }}
                                  value={value.etc}
                                  onChange={(e) => {
                                    etc[index].etc = e.target.value
                                    setEtc([...etc])
                                  }}
                                />
                                <CFormTextarea
                                  placeholder="내용을 입력하세요"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                  style={{ width: '50%' }}
                                  value={value.code}
                                  onChange={(e) => {
                                    etc[index].code = e.target.value
                                    setEtc([...etc])
                                  }}
                                />
                                <button
                                  style={{
                                    marginLeft: '10px',
                                    backgroundColor: 'white',
                                    border: 'none',
                                    color: 'red',
                                  }}
                                  onClick={() => {
                                    etc.splice(index, 1)
                                    setEtc([...etc])
                                  }}
                                >
                                  x
                                </button>
                              </div>
                            )
                          })
                        ) : (
                          <div />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="body-content mt-3">
                  <div className="body-content__header d-flex align-items-center">
                    <div className="d-flex flex-column w-50">
                      <div>
                        <span className="body-content__header__title">희망일자 </span>
                        <span className="text-black-50">
                          *최소일정 설정 (ex 30일 이후 희망일자 선택)
                        </span>
                      </div>
                      <div className="d-flex align-items-center mt-2">
                        <span style={{ width: '80px' }}>희망일</span>
                        <CFormInput
                          placeholder="내용을 입력하세요"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          value={maxVote}
                          onChange={(e) => setMaxVote(e.target.value)}
                        />
                      </div>
                    </div>
                    <div style={{ width: '5%' }} />
                    <div className="d-flex flex-column w-50 mt-2">
                      <div>
                        <span className="body-content__header__title">개설금액 </span>
                        <span className="text-black-50">*서포트 개설비용, 스타포인트</span>
                      </div>
                      <div className="d-flex align-items-center mt-2">
                        <span style={{ width: '120px' }}>개설 포인트</span>
                        <CFormInput
                          placeholder="내용을 입력하세요"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          value={startPoint}
                          onChange={(e) => setStartPoint(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="body-content mt-3">
                  <div className="body-content__header mb-2">
                    <span className="body-content__header__title">팬심서포트 공통 기본정책 </span>
                    <span className="body-content__header__sup text-black-50">
                      *팬심서포트 등록 하단 페이지
                    </span>
                  </div>
                  <div style={{ width: '47%' }}>
                    <div className="d-flex align-items-center body-content_body__column mb-3">
                      <span style={{ width: '100px' }}>한국어</span>
                      <CFormTextarea
                        placeholder="내용을 입력하세요"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={policy.ko}
                        onChange={(e) =>
                          setPolicy({
                            ...policy,
                            ko: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="d-flex align-items-center body-content_body__column mb-3">
                      <span style={{ width: '100px' }}>영어</span>
                      <CFormTextarea
                        placeholder="내용을 입력하세요"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={policy.en}
                        onChange={(e) =>
                          setPolicy({
                            ...policy,
                            en: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="body-content_body__column mb-3 d-flex align-items-center">
                      <span style={{ width: '100px' }}>중국어</span>
                      <CFormTextarea
                        placeholder="내용을 입력하세요"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={policy.ch}
                        onChange={(e) =>
                          setPolicy({
                            ...policy,
                            ch: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="d-flex align-items-center body-content_body__column mb-3">
                      <span style={{ width: '100px' }}>일본어</span>
                      <CFormTextarea
                        placeholder="내용을 입력하세요"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={policy.jp}
                        onChange={(e) =>
                          setPolicy({
                            ...policy,
                            jp: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="d-flex align-items-center body-content_body__column mb-3">
                      <span style={{ width: '100px' }}>스페인어</span>
                      <CFormTextarea
                        placeholder="내용을 입력하세요"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={policy.es}
                        onChange={(e) =>
                          setPolicy({
                            ...policy,
                            es: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CCol>
          </CCardBody>
          {role !== one && (
            <CCardFooter className="form-footer">
              <CButton
                size="lg"
                color="success"
                className="px-5 form-footer__btn__ml form-footer__btn"
                style={{ color: 'white' }}
                onClick={() => setIsModal(true)}
              >
                저장
              </CButton>
            </CCardFooter>
          )}
        </CCard>
      </CCol>
      {isModal && (
        <CheckPopup
          onClickClose={() => setIsModal(false)}
          bodyContent={'기부 내용을 수정하시겠습니까?'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup onClickClose={() => closeModalEvent()} bodyContent={'수정을 완료했습니다.'} />
      )}
    </CRow>
  )
}

SupportProductDo.propTypes = {
  history: PropTypes.object,
}

export default SupportProductDo
