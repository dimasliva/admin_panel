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

const SupportProductAd = (props) => {
  const one = 1
  const [role, setRole] = useState('')
  const [isModal, setIsModal] = useState(false) // modify check Modal
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [version, setVersion] = useState(0)
  const [date, setDate] = useState('')
  const [lastName, setLastName] = useState('')
  const [birth, setBirth] = useState([
    {
      ko: '',
      etc: '',
    },
  ])
  const [debut, setDebut] = useState([
    {
      ko: '',
      etc: '',
    },
  ])
  const [etc, setEtc] = useState([
    {
      ko: '',
      etc: '',
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
      setBirth([
        ...birth,
        {
          ko: '',
          etc: '',
        },
      ])
    } else if (value === 2) {
      setDebut([
        ...debut,
        {
          ko: '',
          etc: '',
        },
      ])
    } else if (value === 3) {
      setEtc([
        ...etc,
        {
          ko: '',
          etc: '',
        },
      ])
    }
  }

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
    const res = await axios
      .get(`/api/fan/support/setting?service_id=1`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return

    const type1 = []
    const type2 = []
    const type3 = []
    res.data.value.items[0] === undefined
      ? (res.data.value.items[0] = birth)
      : res.data.value.items[0].donate_title.map((value) => type1.push(value))
    res.data.value.items[1] === undefined
      ? (res.data.value.items[1] = debut)
      : res.data.value.items[1].donate_title.map((value) => type2.push(value))
    res.data.value.items[2] === undefined
      ? (res.data.value.items[2] = etc)
      : res.data.value.items[2].donate_title.map((value) => type3.push(value))
    setLastName(res.data.value.action ? res.data.value.action.last_name : 'none')
    setVersion(res.data.value.version)
    setDate(moment(res.data.value.updated_at).format('YYYY-MM-DD HH:mm:ss'))
    setBirth(type1)
    setDebut(type2)
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
      service_id: 1,
      donate_title: [birth, debut, etc] /*{
        1: birth,
        2: debut,
        3: etc,
      }*/,
      version: parseInt(version) + 1,
      setting: {
        policy,
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
      alert('???????????? ?????? ??? ?????? ????????? ?????????.')
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
                ?????? ????????????
              </CNavLink>
            </CNavItem>
            <CNavItem className="nav-custom__column">
              <CNavLink
                className="cursor custom-tab-color"
                onClick={() => props.history.push('/support/product/group')}
              >
                ?????? ?????? ??????
              </CNavLink>
            </CNavItem>
            <CNavItem className="nav-custom__column">
              <CNavLink
                active
                className="cursor custom-tab-color-main"
                onClick={() => props.history.push('/support/product/ad')}
              >
                ?????? ?????? ??????
              </CNavLink>
            </CNavItem>
            <CNavItem className="nav-custom__column">
              <CNavLink
                className="cursor custom-tab-color"
                onClick={() => props.history.push('/support/product/donation')}
              >
                ?????? ?????? ??????
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CCol>
              <div>
                <div className="header-version">
                  <div className="header-version__title">version. {version}</div>
                  <span className="header-version__description">
                    {date}??? <span className="style-color-blue">{lastName}</span>??? ????????? ?????? ??????
                  </span>
                </div>
                <div className="body-content d-flex flex-column">
                  <div className="body-content__header d-flex justify-content-between w-75 my-3">
                    <span className="body-content__header__title">????????? ??????</span>
                    <span className="body-content__header__len1" style={{ marginRight: '18%' }}>
                      ?????????
                    </span>
                    <span style={{ marginRight: '3%' }}>????????????</span>
                  </div>
                  <div className="body-content__body">
                    <div className="d-flex flex-row">
                      <div style={{ width: '6%' }}>
                        <span>??????</span>
                      </div>
                      <div style={{ width: '6%' }}>
                        <CButton
                          color="info"
                          className="form-footer__bt__ml form-footer__bt"
                          style={{ color: 'white', marginLeft: '15px' }}
                          onClick={() => addInput(1)}
                        >
                          +
                        </CButton>
                      </div>
                      <div style={{ width: '80%' }}>
                        {birth !== null && birth !== undefined ? (
                          birth.map((value, index) => {
                            return (
                              <div key={index} style={{ display: 'flex' }} className="mb-3">
                                <CFormTextarea
                                  placeholder="????????? ???????????????"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                  style={{ width: '50%', marginRight: '15px' }}
                                  value={value.ko}
                                  onChange={(e) => {
                                    birth[index].ko = e.target.value
                                    setBirth([...birth])
                                  }}
                                />

                                <CFormTextarea
                                  placeholder="????????? ???????????????"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                  style={{ width: '50%' }}
                                  value={value.etc}
                                  onChange={(e) => {
                                    birth[index].etc = e.target.value
                                    setBirth([...birth])
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
                                    birth.splice(index, 1)
                                    setBirth([...birth])
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
                    <div className="body-content__body__column my-2 d-flex flex-row">
                      <div style={{ width: '6%' }}>
                        <span>??????</span>
                      </div>
                      <div style={{ width: '6%' }}>
                        <CButton
                          color="info"
                          className="form-footer__bt__ml form-footer__bt"
                          style={{ color: 'white', marginLeft: '15px' }}
                          onClick={() => addInput(2)}
                        >
                          +
                        </CButton>
                      </div>
                      <div style={{ width: '80%' }}>
                        {debut !== null && debut !== undefined ? (
                          debut.map((value, index) => {
                            return (
                              <div key={index} style={{ display: 'flex' }} className="mb-3">
                                <CFormTextarea
                                  placeholder="????????? ???????????????"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                  style={{ width: '50%', marginRight: '15px' }}
                                  value={value.ko}
                                  onChange={(e) => {
                                    debut[index].ko = e.target.value
                                    setDebut([...debut])
                                  }}
                                />

                                <CFormTextarea
                                  placeholder="????????? ???????????????"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                  style={{ width: '50%' }}
                                  value={value.etc}
                                  onChange={(e) => {
                                    debut[index].etc = e.target.value
                                    setDebut([...debut])
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
                                    debut.splice(index, 1)
                                    setDebut([...debut])
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
                    <div className="d-flex flex-row">
                      <div style={{ width: '6%' }}>
                        <span>??????</span>
                      </div>
                      <div style={{ width: '6%' }}>
                        <CButton
                          color="info"
                          className="form-footer__bt__ml form-footer__bt"
                          style={{ color: 'white', marginLeft: '15px' }}
                          onClick={() => addInput(3)}
                        >
                          +
                        </CButton>
                      </div>
                      <div style={{ width: '81%' }}>
                        {etc !== null && etc !== undefined ? (
                          etc.map((value, index) => {
                            return (
                              <div key={index} style={{ display: 'flex' }} className="mb-3">
                                <CFormTextarea
                                  placeholder="????????? ???????????????"
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
                                  placeholder="????????? ???????????????"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                  style={{ width: '50%' }}
                                  value={value.etc}
                                  onChange={(e) => {
                                    etc[index].etc = e.target.value
                                    setEtc([...etc])
                                  }}
                                />

                                <CButton
                                  style={{
                                    marginLeft: '7px',
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
                                </CButton>
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
                        <span className="body-content__header__title">???????????? </span>
                        <span className="text-black-50">
                          *???????????? ?????? (ex 30??? ?????? ???????????? ??????)
                        </span>
                      </div>
                      <div className="d-flex align-items-center mt-2">
                        <span style={{ width: '80px' }}>?????????</span>
                        <CFormInput
                          placeholder="????????? ???????????????"
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
                        <span className="body-content__header__title">???????????? </span>
                        <span className="text-black-50">*????????? ????????????, ???????????????</span>
                      </div>
                      <div className="d-flex align-items-center mt-2">
                        <span style={{ width: '120px' }}>?????? ?????????</span>
                        <CFormInput
                          placeholder="????????? ???????????????"
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
                    <span className="body-content__header__title">??????????????? ?????? ???????????? </span>
                    <span className="body-content__header__sup text-black-50">
                      *??????????????? ?????? ?????? ?????????
                    </span>
                  </div>
                  <div style={{ width: '47%' }}>
                    <div className="d-flex align-items-center body-content_body__column mb-3">
                      <span style={{ width: '100px' }}>?????????</span>
                      <CFormTextarea
                        placeholder="????????? ???????????????"
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
                      <span style={{ width: '100px' }}>??????</span>
                      <CFormTextarea
                        placeholder="????????? ???????????????"
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
                      <span style={{ width: '100px' }}>?????????</span>
                      <CFormTextarea
                        placeholder="????????? ???????????????"
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
                      <span style={{ width: '100px' }}>?????????</span>
                      <CFormTextarea
                        placeholder="????????? ???????????????"
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
                      <span style={{ width: '100px' }}>????????????</span>
                      <CFormTextarea
                        placeholder="????????? ???????????????"
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
                color="success"
                style={{ color: 'white' }}
                className="form-footer__btn__ml form-footer__btn px-5"
                onClick={() => setIsModal(true)}
              >
                ??????
              </CButton>
            </CCardFooter>
          )}
        </CCard>
      </CCol>
      {isModal && (
        <CheckPopup
          onClickClose={() => setIsModal(false)}
          bodyContent={'?????? ????????? ?????????????????????????'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup onClickClose={() => closeModalEvent()} bodyContent={'????????? ??????????????????.'} />
      )}
    </CRow>
  )
}

SupportProductAd.propTypes = {
  history: PropTypes.object,
}

export default SupportProductAd
