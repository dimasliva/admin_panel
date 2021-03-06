import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalBody,
  CFormInput,
  CFormSelect,
  CModalFooter,
  CButton,
  CInputGroup,
  CInputGroupText,
  CFormCheck,
  CCol,
  CRow,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { FileBtn } from 'src/components/FileBtn'
import { NormalPopup } from 'src/components/publicPopup/NormalPopup'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'
import FileApi from '../../../util/FileApi'
import { CheckPopup } from 'src/components/publicPopup/CheckPopup'

export const ArtistAdd = ({ onClickClose }) => {
  // Select value
  const [isArtistExists, setArtistExists] = useState(false)
  const [artistType, setArtistType] = useState('1')
  const [eventType, setEventType] = useState('0')
  const [unitType, setUnitType] = useState('0')
  // Artist Code
  const [artistCode, setArtistCode] = useState('')
  const [groupCode1, setGroupCode1] = useState({
    code: '',
  })
  const [groupCode2, setGroupCode2] = useState({
    code: '',
  })
  const [groupCode3, setGroupCode3] = useState({
    code: '',
  })
  const [groupCode4, setGroupCode4] = useState({
    code: '',
  })
  // Artist Name
  const [artistName, setArtistName] = useState({
    ko: '',
    etc: '',
  })
  // Artist Job
  const [artistJob, setArtistJob] = useState({
    ko: '',
    etc: '',
  })
  // Artist Information
  const [birth, setBirth] = useState({
    year: '',
    month: '',
    day: '',
  })
  const [debut, setDebut] = useState({
    year: '',
    month: '',
    day: '',
  })
  // Agency
  const [agency, setAgency] = useState({
    ko: '',
    etc: '',
  })
  // FanClub
  const [fanClub, setFanClub] = useState({
    ko: '',
    etc: '',
  })
  // Channel
  const [twitter, setTwitter] = useState({
    twitter: '',
    use: false,
  })
  const [instagram, setInstagram] = useState({
    instagram: '',
    use: false,
  })
  const [youtube, setYoutube] = useState({
    youtube: '',
    use: false,
  })
  const [web, setWeb] = useState({
    web: '',
    use: false,
  })
  // Img
  const [img, setImg] = useState({
    main: '',
    sup: '',
  })
  const [isModal, setIsModal] = useState(false)
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [equalCode, setEqualCode] = useState(false) // ok Modal
  const [isErrorMessage, setIsErrorMessage] = useState('') // artist Code errormessage
  const [isErrorMessageImg, setIsErrorMessageImg] = useState('')
  const [isErrorMessageImgSub, setIsErrorMessagesub] = useState('')
  const [allCode, setAllCode] = useState([])
  const [allCodeGroup, setAllCodeGroup] = useState([])
  useEffect(() => {
    getDate()
  }, [])
  const getDate = async () => {
    const res = await axios.get(`/api/artist/query`, headerConfig).catch((err) => statusCatch(err))

    if (!res.data.success) return
    res.data.value.items.map((val) => {
      allCode.push(val.code_artist)
      allCodeGroup.push(val.group_code)
    })
  }
  const checkDate = async () => {
    allCode.map((val) => {
      if (val === artistCode || val === allCodeGroup) {
        setEqualCode(true)
        return
      } else {
        setIsModal(true)
      }
    })
  }

  const create = async () => {
    setIsErrorMessage('')
    setIsErrorMessageImg('')
    setIsErrorMessagesub('')

    if (img.main !== '') {
      img.main = await FileApi('artist', img.main)
    } else {
      setIsErrorMessageImg('?????? ???????????? ??????????????????.')
      return
    }
    if (img.sup !== '') {
      img.sup = await FileApi('artist', img.sup)
    } else {
      setIsErrorMessagesub('?????? ???????????? ??????????????????.')
      return
    }
    if (artistCode === '') {
      setIsErrorMessage('??????????????? ????????? ?????????.')
      return
    }

    let data = ''
    if (artistType === '1') {
      data = {
        type: artistType,
        event_type: eventType,
        is_group: unitType,
        code_artist: artistCode,
        group_code: [groupCode1, groupCode2, groupCode3, groupCode4],
        name_artist: artistName,
        birth: birth.year + '-' + birth.month + '-' + birth.day,
        debut: debut.year + '-' + debut.month + '-' + debut.day,
        about_artist: agency,
        fanclub: fanClub,
        social_link: [twitter, instagram, youtube, web],
        img_artist: {
          main:
            img.main === ''
              ? img.main
              : img.main.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
          sup:
            img.sup === ''
              ? img.sup
              : img.sup.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        },
        work_artist: {
          ko: '',
          etc: '',
        },
      }
    } else {
      data = {
        type: artistType,
        event_type: eventType,
        is_group: unitType,
        code_artist: artistCode,
        group_code: [groupCode1, groupCode2, groupCode3, groupCode4],
        name_artist: artistName,
        work_artist: artistJob,
        birth: birth.year + '-' + birth.month + '-' + birth.day,
        about_artist: agency,
        fanclub: {
          ko: '',
          etc: '',
        },
        social_link: [twitter, instagram, youtube, web],
        img_artist: {
          main:
            img.main === ''
              ? img.main
              : img.main.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
          sup:
            img.sup === ''
              ? img.sup
              : img.sup.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        },
      }
    }

    const res = await axios.post(`/api/artist`, data, headerConfig).catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck(true)
    } else if (!res.data.success && res.data.error == 'artist code exists') {
      setArtistExists(true)
    } else {
      setIsErrorMessage('????????? ???????????????. ????????????????????????.')
    }
  }

  const modalOkEvent = (bool) => {
    if (bool) {
      setIsModal(false)
      create()
    } else {
      setIsModal(false)
    }
  }
  const closeModalEvent = () => {
    setIsOkCheck(false)
    onClickClose()
  }

  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody className="form-body">
        <CRow className="row">
          <CCol sm={12} className="d-flex flex-row">
            <CCol sm={5}>
              <div className="form-product-add__select">
                <div className="mb-3 form-body-title">
                  <span className="mb-3 form-body-title">???????????? ??????</span>
                </div>
                <CCol sm={6}>
                  <CFormSelect
                    size="lg"
                    aria-label="Large select example"
                    className="mr-3 text-center"
                    value={artistType}
                    onChange={(e) => {
                      setArtistType(e.target.value)
                      // setUnitType('0')
                    }}
                  >
                    <option value="1">??????</option>
                    <option value="2">??????</option>
                    <option value="3">??????</option>
                  </CFormSelect>
                </CCol>
              </div>
              <div className="form-product-add__description">
                <CRow className="row">
                  <div className="mb-3 form-body-title">
                    <span>?????? ??????</span>
                  </div>
                  <CCol sm={6}>
                    <CFormSelect
                      size="lg"
                      aria-label="Large select example"
                      className="mr-3 text-center"
                      value={unitType}
                      onChange={(e) => setUnitType(e.target.value)}
                    >
                      {artistType === '1' ? (
                        <>
                          <option value="0">??????</option>
                          <option value="1">??????</option>
                        </>
                      ) : (
                        <>
                          <option value="0">??????</option>
                        </>
                      )}
                    </CFormSelect>
                  </CCol>
                  <CCol sm={6}>
                    <div className="mb-3 form-body-title">
                      <span>????????? ????????????</span>
                    </div>
                    <CFormSelect
                      aria-label="Large select example"
                      className="mr-3 text-center"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                    >
                      <option value={0}></option>
                      <option value={1}>?????????</option>
                      <option value={2}>???DIY</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
              </div>
              <div className="form-product-add__description">
                <div className="mb-3 form-body-title">
                  <span>???????????? ??????</span>
                </div>
                <div className="form-product-add__description__column">
                  {unitType === 1 || unitType === '1' ? (
                    <CCol className="d-flex flex-row">
                      <div className="col-sm-2">????????????</div>
                      <div style={{ width: '100%' }}>
                        <CFormInput
                          placeholder="??????????????? ??????????????? ex) BTS001"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          value={artistCode}
                          onChange={(e) => setArtistCode(e.target.value)}
                        />
                        {isErrorMessage && (
                          <div className="mb-3 mt-1" style={{ width: '100%' }}>
                            <span className="error-message">{isErrorMessage}</span>
                          </div>
                        )}
                      </div>
                    </CCol>
                  ) : (
                    <CCol className="d-flex flex-row">
                      <span style={{ width: '90px' }}>????????????</span>
                      <div style={{ width: '100%' }}>
                        <CFormInput
                          placeholder="??????????????? ??????????????? ex)BTS001"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          value={artistCode}
                          onChange={(e) => {
                            setIsErrorMessage(
                              e.target.value === allCode ? '????????? ???????????? ?????? ???????????????' : '',
                            )
                            setArtistCode(e.target.value)
                          }}
                        />
                        {isErrorMessage && (
                          <div className="mb-3 mt-1" style={{ width: '100%' }}>
                            <span className="error-message">{isErrorMessage}</span>
                          </div>
                        )}
                      </div>
                    </CCol>
                  )}
                </div>
                {unitType === 0 || (unitType === '0' && artistType === '1') || artistType === 1 ? (
                  <CCol className="d-flex flex-column my-2">
                    <CCol className="d-flex flex-row">
                      <span style={{ width: '90px' }}>????????????</span>
                      <CFormInput
                        placeholder="??????????????? ??????????????? ex)BTS"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={groupCode1.code}
                        onChange={(e) => {
                          setGroupCode1({ code: e.target.value })
                          setIsErrorMessage(
                            e.target.value === allCodeGroup
                              ? '????????? ???????????? ?????? ???????????????'
                              : '',
                          )
                        }}
                      />
                    </CCol>
                    <CCol className="d-flex flex-row my-2">
                      <span style={{ width: '90px' }} />
                      <CFormInput
                        placeholder="????????????????????? ??????????????? ex)BTS"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={groupCode2.code}
                        onChange={(e) => {
                          setGroupCode2({ code: e.target.value })
                          setIsErrorMessage(
                            e.target.value === allCodeGroup
                              ? '????????? ???????????? ?????? ???????????????'
                              : '',
                          )
                        }}
                      />
                    </CCol>
                    <CCol className="d-flex flex-row">
                      <span style={{ width: '90px' }} />
                      <CFormInput
                        placeholder="????????????????????? ??????????????? ex)BTS"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={groupCode3.code}
                        onChange={(e) => {
                          setGroupCode3({ code: e.target.value })
                          setIsErrorMessage(
                            e.target.value === allCodeGroup
                              ? '????????? ???????????? ?????? ???????????????'
                              : '',
                          )
                        }}
                      />
                    </CCol>
                    <CCol className="d-flex flex-row my-2">
                      <span style={{ width: '90px' }} />
                      <CFormInput
                        placeholder="????????????????????? ??????????????? ex)BTS"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={groupCode4.code}
                        onChange={(e) => {
                          setGroupCode4({ code: e.target.value })
                          setIsErrorMessage(
                            e.target.value === allCodeGroup
                              ? '????????? ???????????? ?????? ???????????????'
                              : '',
                          )
                        }}
                      />
                    </CCol>
                  </CCol>
                ) : (
                  <div />
                )}
              </div>
              <div className="mb-3 form-body-title">
                <span>???????????? ??????</span>
              </div>
              <CCol className="d-flex flex-row mb-2">
                <span style={{ width: '80px' }}>?????????</span>
                <CFormInput
                  placeholder="????????? ????????? ???????????????"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={artistName.ko}
                  onChange={(e) =>
                    setArtistName({
                      ...artistName,
                      ko: e.target.value,
                    })
                  }
                />
              </CCol>
              <CCol className="d-flex flex-row">
                <span style={{ width: '80px' }}>??????</span>
                <CFormInput
                  placeholder="?????? ????????? ???????????????"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={artistName.etc}
                  onChange={(e) =>
                    setArtistName({
                      ...artistName,
                      etc: e.target.value,
                    })
                  }
                />
              </CCol>
              <div className="mt-3">*?????? : ??????, ?????????, ??????, ???????????? ?????? ??????????????? ??????</div>
              {artistType === '1' ? (
                <div />
              ) : (
                <div className="form-product-add__description">
                  <div className="mb-3 form-body-title">
                    <span>???????????? ??????</span>
                  </div>
                  <CCol className="d-flex flex-row mb-2">
                    <span style={{ width: '60px' }}>?????????</span>
                    <CFormInput
                      placeholder="????????? ????????? ???????????????"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={artistJob.ko}
                      onChange={(e) =>
                        setArtistJob({
                          ...artistJob,
                          ko: e.target.value,
                        })
                      }
                    />
                  </CCol>
                  <CCol className="d-flex flex-row">
                    <span style={{ width: '60px' }}>??????</span>
                    <CFormInput
                      placeholder="?????? ????????? ???????????????"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={artistJob.etc}
                      onChange={(e) =>
                        setArtistJob({
                          ...artistJob,
                          etc: e.target.value,
                        })
                      }
                    />
                  </CCol>
                  <div>*?????? : ??????, ?????????, ??????, ???????????? ?????? ??????????????? ??????</div>
                </div>
              )}
            </CCol>
            <CCol sm={1} />
            <CCol sm={6}>
              {eventType == 0 && (
                <CCol>
                  <CCol>
                    <div className="mb-3 form-body-title">
                      <span>???????????? ??????</span>
                    </div>
                  </CCol>
                  {unitType === '0' || unitType === 0 ? (
                    <CCol className="d-flex flex-row align-items-center">
                      <span className="w-50">??????</span>
                      <CFormInput
                        className="w-100 p-1 text-center"
                        placeholder="YYYY"
                        aria-label="year"
                        value={birth.year}
                        onChange={(e) => setBirth({ ...birth, year: e.target.value })}
                        type="number"
                        onKeyPress={(e) => {
                          let ch = String.fromCharCode(e.which)
                          if (!/[0-9]/.test(ch)) {
                            e.preventDefault()
                          }
                        }}
                      />
                      <span className="mx-2">???</span>
                      <CFormInput
                        className="w-100 p-1 text-center"
                        placeholder="MM"
                        aria-label="month"
                        value={birth.month}
                        onChange={(e) => setBirth({ ...birth, month: e.target.value })}
                        type="number"
                        onKeyPress={(e) => {
                          let ch = String.fromCharCode(e.which)
                          if (!/[0-9]/.test(ch)) {
                            e.preventDefault()
                          }
                        }}
                      />
                      <span className="mx-2">???</span>
                      <CFormInput
                        className="w-100 p-1 text-center"
                        placeholder="DD"
                        aria-label="day"
                        value={birth.day}
                        onChange={(e) => setBirth({ ...birth, day: e.target.value })}
                        type="number"
                        onKeyPress={(e) => {
                          let ch = String.fromCharCode(e.which)
                          if (!/[0-9]/.test(ch)) {
                            e.preventDefault()
                          }
                        }}
                      />
                      <span className="mx-2">???</span>
                    </CCol>
                  ) : (
                    <div />
                  )}
                  {artistType === '1' ? (
                    <CCol className="d-flex flex-row my-2">
                      <span className="me-2">????????????</span>
                      <CCol className="d-flex flex-row align-items-center">
                        <CFormInput
                          className="text-center"
                          placeholder="YYYY"
                          aria-label="year"
                          value={debut.year}
                          onChange={(e) => setDebut({ ...debut, year: e.target.value })}
                          type="number"
                          onKeyPress={(e) => {
                            let ch = String.fromCharCode(e.which)
                            if (!/[0-9]/.test(ch)) {
                              e.preventDefault()
                            }
                          }}
                        />
                        <span className="mx-2">???</span>
                      </CCol>
                      <CCol className="d-flex flex-row align-items-center mx-2">
                        <CFormInput
                          className="text-center"
                          placeholder="MM"
                          aria-label="month"
                          value={debut.month}
                          onChange={(e) => setDebut({ ...debut, month: e.target.value })}
                          type="number"
                          onKeyPress={(e) => {
                            let ch = String.fromCharCode(e.which)
                            if (!/[0-9]/.test(ch)) {
                              e.preventDefault()
                            }
                          }}
                        />
                        <span className="mx-2">???</span>
                      </CCol>
                      <CCol className="d-flex flex-row align-items-center">
                        <CFormInput
                          className="text-center"
                          placeholder="DD"
                          aria-label="day"
                          value={debut.day}
                          onChange={(e) => setDebut({ ...debut, day: e.target.value })}
                          type="number"
                          onKeyPress={(e) => {
                            let ch = String.fromCharCode(e.which)
                            if (!/[0-9]/.test(ch)) {
                              e.preventDefault()
                            }
                          }}
                        />
                        <span className="mx-2">???</span>
                      </CCol>
                    </CCol>
                  ) : (
                    <div />
                  )}
                  <CCol className="d-flex flex-row mt-4">
                    <span style={{ width: '200px' }}>?????????(?????????)</span>
                    <CFormInput
                      placeholder="????????? ????????? ???????????????"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={agency.ko}
                      onChange={(e) =>
                        setAgency({
                          ...agency,
                          ko: e.target.value,
                        })
                      }
                    />
                  </CCol>
                  <CCol className="d-flex flex-row my-2">
                    <span style={{ width: '200px' }}>?????????(??????)</span>
                    <CFormInput
                      placeholder="?????? ????????? ???????????????"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={agency.etc}
                      onChange={(e) =>
                        setAgency({
                          ...agency,
                          etc: e.target.value,
                        })
                      }
                    />
                  </CCol>
                  {artistType === '1' ? (
                    <CCol>
                      <CCol className="d-flex flex-row">
                        <span style={{ width: '200px' }}>????????????(?????????)</span>
                        <CFormInput
                          placeholder="????????? ????????? ???????????????"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          value={fanClub.ko}
                          onChange={(e) => setFanClub({ ...fanClub, ko: e.target.value })}
                        />
                      </CCol>
                      <CCol className="d-flex flex-row my-2">
                        <span style={{ width: '200px' }}>????????????(??????)</span>
                        <CFormInput
                          placeholder="?????? ????????? ???????????????"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          value={fanClub.etc}
                          onChange={(e) => setFanClub({ ...fanClub, etc: e.target.value })}
                        />
                      </CCol>
                      <CCol className="d-flex flex-row justify-content-end">
                        <div>*?????? : ??????, ?????????, ??????, ???????????? ?????? ??????????????? ??????</div>
                      </CCol>
                    </CCol>
                  ) : (
                    <>
                      <div />
                      <div />
                    </>
                  )}
                  <div className="mb-3 form-body-title">
                    <span>???????????? ????????????</span>
                  </div>
                  <div>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CFormCheck
                          type="checkbox"
                          checked={twitter.use}
                          onChange={(e) => {
                            setTwitter({
                              ...twitter,
                              use: e.target.checked,
                            })
                          }}
                          aria-label="Checkbox for following text input"
                        />
                      </CInputGroupText>
                      <CInputGroupText className="col-sm-3">?????????</CInputGroupText>
                      <CFormInput
                        aria-label="Text input with checkbox"
                        placeholder="URL??? ???????????????"
                        value={twitter.twitter}
                        onChange={(e) =>
                          setTwitter({
                            ...twitter,
                            twitter: e.target.value,
                          })
                        }
                      />
                    </CInputGroup>
                  </div>
                  <div>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CFormCheck
                          type="checkbox"
                          checked={instagram.use}
                          onChange={(e) => {
                            setInstagram({
                              ...instagram,
                              use: e.target.checked,
                            })
                          }}
                          aria-label="Checkbox for following text input"
                        />
                      </CInputGroupText>
                      <CInputGroupText className="col-sm-3">?????????</CInputGroupText>
                      <CFormInput
                        aria-label="Text input with checkbox"
                        placeholder="URL??? ???????????????"
                        value={instagram.instagram}
                        onChange={(e) => {
                          setInstagram({
                            ...instagram,
                            instagram: e.target.value,
                          })
                        }}
                      />
                    </CInputGroup>
                  </div>
                  <div>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CFormCheck
                          type="checkbox"
                          checked={youtube.use}
                          onChange={(e) => {
                            setYoutube({
                              ...youtube,
                              use: e.target.checked,
                            })
                          }}
                          aria-label="Checkbox for following text input"
                        />
                      </CInputGroupText>
                      <CInputGroupText className="col-sm-3">?????????</CInputGroupText>
                      <CFormInput
                        aria-label="Text input with checkbox"
                        placeholder="URL??? ???????????????"
                        value={youtube.youtube}
                        onChange={(e) => {
                          setYoutube({
                            ...youtube,
                            youtube: e.target.value,
                          })
                        }}
                      />
                    </CInputGroup>
                  </div>
                  <div>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CFormCheck
                          type="checkbox"
                          checked={web.use}
                          onChange={(e) => {
                            setWeb({
                              ...web,
                              use: e.target.checked,
                            })
                          }}
                          aria-label="Checkbox for following text input"
                        />
                      </CInputGroupText>
                      <CInputGroupText className="col-sm-3">????????????</CInputGroupText>
                      <CFormInput
                        aria-label="Text input with checkbox"
                        placeholder="URL??? ???????????????"
                        value={web.web}
                        onChange={(e) => {
                          setWeb({
                            ...web,
                            web: e.target.value,
                          })
                        }}
                      />
                    </CInputGroup>
                  </div>
                </CCol>
              )}
              <div className="form-product-add-aside__description">
                <div className="mb-3 form-body-title">
                  <span>???????????? ????????? ( ?????? : 375*245 JPEG )</span>
                </div>
                {isErrorMessageImg && (
                  <div className="mb-3 mt-1" style={{ width: '100%' }}>
                    <span className="error-message">{isErrorMessageImg}</span>
                  </div>
                )}
                <FileBtn
                  name="??????"
                  title="artist"
                  fileData={(data) => {
                    setImg({ ...img, main: data })
                  }}
                  accept="image/*"
                  id="main"
                  imageUrl={img.main}
                />
                <div className="mb-3 form-body-title">
                  <span>???????????? ????????? ( ?????? : 335*150 JPEG )</span>
                </div>
                {isErrorMessageImgSub && (
                  <div className="mb-3 mt-1" style={{ width: '100%' }}>
                    <span className="error-message">{isErrorMessageImgSub}</span>
                  </div>
                )}
                <FileBtn
                  name="??????"
                  title="artist"
                  fileData={(data) => {
                    setImg({ ...img, sup: data })
                  }}
                  accept="image/*"
                  id="sup"
                  imageUrl={img.sup}
                />
              </div>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="form-footer">
        <CButton
          color="info"
          className="form-footer__btn__ml form-footer__btn text-white px-5"
          onClick={() => setIsModal(true)}
        >
          ??????
        </CButton>
        <CButton color="light" className="form-footer__btn" onClick={onClickClose}>
          ??????
        </CButton>
      </CModalFooter>
      {isModal && (
        <CheckPopup
          onClickClose={() => setIsModal(false)}
          bodyContent={'??????????????? ?????????????????????????'}
          title={'??????'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup onClickClose={() => onClickClose()} bodyContent={'????????? ??????????????????.'} />
      )}
      {equalCode && (
        <NormalPopup
          onClickClose={() => setEqualCode(false)}
          bodyContent={'????????? ???????????? ?????? ???????????????.'}
        />
      )}
      {isArtistExists && (
        <NormalPopup
          onClickClose={() => setArtistExists(false)}
          bodyContent={'????????? ?????? ???????????????.'}
        />
      )}
    </CModal>
  )
}

ArtistAdd.propTypes = {
  onClickClose: PropTypes.func.isRequired,
}
