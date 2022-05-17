import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CFormInput,
  CFormSelect,
  CModalFooter,
  CButton,
  CInputGroup,
  CInputGroupText,
  CFormCheck,
  CCol,
  CRow,
  CTable,
  CTableRow,
  CTableDataCell,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { FileBtn } from 'src/components/FileBtn'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { CheckPopup } from 'src/components/publicPopup/CheckPopup'
import { statusCatch } from 'src/static/axiosCatch'
import { NormalPopup } from '../../../components/publicPopup/NormalPopup'
import FileApi from '../../../util/FileApi'

export const ArtistDetail = ({ onClickClose, onId, onChecked }) => {
  const one = 1
  // Modal
  const [isModal, setIsModal] = useState(false)
  // Select value
  const [artistType, setArtistType] = useState(0)
  const [eventType, setEventType] = useState(0)
  const [unitType, setUnitType] = useState(0)
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

  const [isOkCheck, setIsOkCheck] = useState(false)
  const [isErrorMessage, setIsErrorMessage] = useState('') // artist Code errormessage
  const [role, setRole] = useState('')
  useEffect(() => {
    getList()
  }, [])

  // artist data
  const getList = async () => {
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
    const res = await axios
      .get(`/api/artist?id=${onId}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (res.data.success) {
      const groupCode =
        res.data.value.group_code === null ? '' : res.data.value.group_code.split(',')
      const date =
        res.data.value.birth === null ? '' : res.data.value.birth.substring(0, 10).split('-')
      const social = res.data.value.social_link
      if (res.data.value.type === 1) {
        const date2 =
          res.data.value.debut === null ? '' : res.data.value.debut.substring(0, 10).split('-')
        setArtistType(res.data.value.type)
        setEventType(res.data.value.event_type)
        setUnitType(res.data.value.is_group)
        setArtistCode(res.data.value.code_artist)
        if (groupCode !== '') {
          setGroupCode1(groupCode[0] !== undefined ? { code: groupCode[0] } : { code: '' })
          setGroupCode2(groupCode[1] !== undefined ? { code: groupCode[1] } : { code: '' })
          setGroupCode3(groupCode[2] !== undefined ? { code: groupCode[2] } : { code: '' })
          setGroupCode4(groupCode[3] !== undefined ? { code: groupCode[3] } : { code: '' })
        }

        setArtistName(res.data.value.name_artist)
        if (date !== '') {
          setBirth({
            year: date[0],
            month: date[1],
            day: date[2],
          })
        } else {
          setBirth({
            year: '',
            month: '',
            day: '',
          })
        }
        if (date2 !== '') {
          setDebut({
            year: date2[0],
            month: date2[1],
            day: date2[2],
          })
        } else {
          setDebut({
            year: '',
            month: '',
            day: '',
          })
        }
        setAgency(res.data.value.about_artist)
        setFanClub(res.data.value.fanclub)
        setAgency(res.data.value.about_artist)
        setTwitter({
          twitter: social[0] === undefined ? '' : social[0].twitter,
          use: social[0] === undefined ? '' : social[0].use,
        })
        setInstagram({
          instagram: social[1] === undefined ? '' : social[1].instagram,
          use: social[1] === undefined ? '' : social[1].use,
        })
        setYoutube({
          youtube: social[2] === undefined ? '' : social[2].youtube,
          use: social[2] === undefined ? '' : social[2].use,
        })
        setWeb({
          web: social[3] === undefined ? '' : social[3].web,
          use: social[3] === undefined ? '' : social[3].use,
        })
        setImg({
          main: res.data.value.img_artist.main,
          sup: res.data.value.img_artist.sup,
        })
      } else {
        setArtistType(res.data.value.type)
        setEventType(res.data.value.event_type)
        setUnitType(res.data.value.is_group)
        setArtistCode(res.data.value.code_artist)
        if (groupCode !== '') {
          setGroupCode1(groupCode[0] !== undefined ? { code: groupCode[0] } : { code: '' })
          setGroupCode2(groupCode[1] !== undefined ? { code: groupCode[1] } : { code: '' })
          setGroupCode3(groupCode[2] !== undefined ? { code: groupCode[2] } : { code: '' })
          setGroupCode4(groupCode[3] !== undefined ? { code: groupCode[3] } : { code: '' })
        }
        setArtistName(res.data.value.name_artist)
        setArtistJob(res.data.value.work_artist)
        setBirth({
          year: date[0],
          month: date[1],
          day: date[2],
        })
        setAgency(res.data.value.about_artist)
        setImg({
          main: res.data.value.img_artist.main,
          sup: res.data.value.img_artist.sup,
        })
        setTwitter({
          twitter: social[0].twitter,
          use: social[0].use,
        })
        setInstagram({
          instagram: social[1].instagram,
          use: social[1].use,
        })
        setYoutube({
          youtube: social[2].youtube,
          use: social[2].use,
        })
        setWeb({
          web: social[1].web,
          use: social[1].use,
        })
      }
    }
  }

  // artist Modify
  const artistModify = async () => {
    if (role !== 1) {
      if (img.main instanceof File) {
        img.main = await FileApi('artist', img.main)
      }
      if (img.sup instanceof File) {
        img.sup = await FileApi('artist', img.sup)
      }
      let data = ''
      setIsErrorMessage('')
      if (artistCode === '') {
        setIsErrorMessage('개인코드를 입력해 주세요.')
        return
      }

      if (artistType === 1) {
        data = {
          id: onId,
          type: artistType,
          event_type: eventType,
          is_group: unitType,
          code_artist: artistCode,
          group_code: [groupCode1, groupCode2, groupCode3, groupCode4],
          name_artist: artistName,
          work_artist: { ko: '', etc: '' },
          birth: birth.year + '-' + birth.month + '-' + birth.day,
          debut: debut.year + '-' + debut.month + '-' + debut.day,
          about_artist: agency,
          fanclub: fanClub,
          social_link: [twitter, instagram, youtube, web],
          img_artist: {
            main:
              img.main === undefined || img.main.data === undefined
                ? img.main
                : img.main.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
            sup:
              img.sup === undefined || img.sup.data === undefined
                ? img.sup
                : img.sup.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
          },
        }
      } else {
        data = {
          id: onId,
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
      const res = await axios
        .post(`/api/artist`, data, headerConfig)
        .catch((err) => statusCatch(err))

      if (res.data.success) {
        setIsOkCheck(true)
      } else {
        setIsErrorMessage('중복된 코드입니다. 다시입력해주세요.')
      }
    }
  }
  const closeModalEvent = () => {
    setIsOkCheck(false)
    onClickClose()
  }
  // Modify true & false
  const modalOkCheck = (value) => {
    if (value) {
      setIsModal(false)
      artistModify()
    } else {
      setIsModal(false)
    }
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalHeader>
        <CModalTitle>아티스트 수정</CModalTitle>
      </CModalHeader>
      <CModalBody className="form-body">
        <CRow className="row">
          <CCol sm={12} className="d-flex flex-row">
            <CCol sm={5}>
              <div className="form-product-add__select">
                <span className="form-body-title">아티스트 타입</span>
                <CFormSelect
                  aria-label="Large select example"
                  className="mt-2 mb-3 text-center"
                  style={{ width: '100px' }}
                  disabled
                  value={artistType}
                  onChange={(e) => {
                    setArtistType(parseInt(e.target.value))
                    // setUnitType('0')
                  }}
                >
                  <option value="1">가수</option>
                  <option value="2">배우</option>
                  <option value="3">기타</option>
                </CFormSelect>
              </div>
              <div className="form-product-add__description">
                <CRow className="row">
                  <CCol sm={6}>
                    <div className="mb-2 mt-2 form-body-title">
                      <span>유닛 타입</span>
                    </div>
                    <CFormSelect
                      aria-label="Large select example"
                      className="text-center"
                      disabled
                      value={unitType}
                      onChange={(e) => setUnitType(parseInt(e.target.value))}
                    >
                      {artistType === 1 ? (
                        <>
                          <option value="0">개인</option>
                          <option value="1">그룹</option>
                        </>
                      ) : (
                        <>
                          <option value="0">개인</option>
                        </>
                      )}
                    </CFormSelect>
                  </CCol>
                  <CCol sm={6}>
                    <div className="mb-3 form-body-title">
                      <span>이벤트 아티스트</span>
                    </div>
                    <CFormSelect
                      aria-label="Large select example"
                      className="mr-3 text-center"
                      value={eventType}
                      onChange={(e) => setEventType(parseInt(e.target.value))}
                    >
                      <option value="0"></option>
                      <option value="1">팬피드</option>
                      <option value="2">팬DIY</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
              </div>
              <div className="form-product-add__description">
                <div className="my-3 form-body-title">
                  <span>아티스트 코드</span>
                </div>
                <div className="form-product-add__description__column">
                  {unitType === 1 || unitType === '1' ? (
                    <CCol className="d-flex flex-row">
                      <div className="col-sm-2">그룹코드</div>
                      <div style={{ width: '100%' }}>
                        <CFormInput
                          placeholder="그룹코드를 입력하세요 ex) BTS001"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          value={artistCode}
                          onChange={(e) => setArtistCode(e.target.value)}
                          // disabled={unitType === 0}
                        />
                        {isErrorMessage && (
                          <div className="mb-3 mt-1" style={{ width: '100%' }}>
                            <span style={{ color: 'red' }}>{isErrorMessage}</span>
                          </div>
                        )}
                      </div>
                    </CCol>
                  ) : (
                    <CCol className="d-flex flex-row">
                      <span style={{ width: '90px' }}>개인코드</span>
                      <div style={{ width: '100%' }}>
                        <CFormInput
                          disabled={unitType === 0}
                          placeholder="개인코드를 입력하세요 ex)BTS001"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          value={artistCode}
                          onChange={(e) => setArtistCode(e.target.value)}
                        />
                        {isErrorMessage && (
                          <div className="mb-3 mt-1" style={{ width: '100%' }}>
                            <span style={{ color: 'red' }}>{isErrorMessage}</span>
                          </div>
                        )}
                      </div>
                    </CCol>
                  )}
                </div>
                {unitType === 0 && artistType === 1 ? (
                  <CCol className="d-flex flex-column my-2">
                    <CCol className="d-flex flex-row">
                      <span style={{ width: '90px' }}>그룹코드</span>
                      <CFormInput
                        disabled={unitType === 0}
                        placeholder="그룹코드를 입력하세요 ex)BTS"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={groupCode1.code}
                        onChange={(e) => setGroupCode1({ code: e.target.value })}
                      />
                    </CCol>
                    <CCol className="d-flex flex-row my-2">
                      <span style={{ width: '90px' }} />
                      <CFormInput
                        // disabled={unitType === 0}
                        placeholder="추가그룹코드를 입력하세요 ex)BTS"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={groupCode2.code}
                        onChange={(e) => setGroupCode2({ code: e.target.value })}
                      />
                    </CCol>
                    <CCol className="d-flex flex-row">
                      <span style={{ width: '90px' }} />
                      <CFormInput
                        // disabled={unitType === 0}
                        placeholder="추가그룹코드를 입력하세요 ex)BTS"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={groupCode3.code}
                        onChange={(e) => setGroupCode3({ code: e.target.value })}
                      />
                    </CCol>
                    <CCol className="d-flex flex-row my-2">
                      <span style={{ width: '90px' }} />
                      <CFormInput
                        // disabled={unitType === 0}
                        placeholder="추가그룹코드를 입력하세요 ex)BTS"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={groupCode4.code}
                        onChange={(e) => setGroupCode4({ code: e.target.value })}
                      />
                    </CCol>
                  </CCol>
                ) : (
                  <div />
                )}
              </div>
              <div className="mb-3 form-body-title">
                <span>아티스트 이름</span>
              </div>
              <CCol className="d-flex flex-row mb-2">
                <span style={{ width: '60px' }}>한국어</span>
                <CFormInput
                  placeholder="한국어 내용을 입력하세요"
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
                <span style={{ width: '60px' }}>기타</span>
                <CFormInput
                  placeholder="영어 내용을 입력하세요"
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
              <div className="mt-3">*기타 : 영어, 중국어, 일어, 스페인어 선택 사용자에게 노출</div>
              {artistType === 1 ? (
                <div />
              ) : (
                <div className="form-product-add__description">
                  <div className="mb-3 form-body-title">
                    <span>아티스트 직업</span>
                  </div>
                  <CCol className="d-flex flex-row mb-2">
                    <span style={{ width: '60px' }}>한국어</span>
                    <CFormInput
                      placeholder="한국어 내용을 입력하세요"
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
                    <span style={{ width: '60px' }}>기타</span>
                    <CFormInput
                      placeholder="영어 내용을 입력하세요"
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
                  <div>*기타 : 영어, 중국어, 일어, 스페인어 선택 사용자에게 노출</div>
                </div>
              )}
            </CCol>
            <CCol sm={1} />
            <CCol sm={6}>
              <CCol>
                <div className="mb-3 form-body-title">
                  <span>아티스트 정보</span>
                </div>
              </CCol>
              <CTable>
                {unitType === '0' || unitType === 0 ? (
                  <CTableRow>
                    <CTableDataCell style={{ width: '70px' }}>
                      <span>생일</span>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        disabled
                        className="w-100 p-1 text-center"
                        placeholder="YYYY"
                        aria-label="year"
                        value={birth.year}
                        onChange={(e) => setBirth({ ...birth, year: e.target.value })}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <span className="mx-2">년</span>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        disabled
                        className="w-100 p-1 text-center"
                        placeholder="MM"
                        aria-label="month"
                        value={birth.month}
                        onChange={(e) => setBirth({ ...birth, month: e.target.value })}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <span className="mx-2">월</span>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        disabled
                        className="w-100 p-1 text-center"
                        placeholder="DD"
                        aria-label="day"
                        value={birth.day}
                        onChange={(e) => setBirth({ ...birth, day: e.target.value })}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <span className="mx-2">일</span>
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  <div />
                )}
                <CTableRow>
                  <CTableDataCell style={{ marginTop: '10px' }} />
                </CTableRow>
                {artistType === 1 ? (
                  <CTableRow>
                    <CTableDataCell>
                      <span className="text-nowrap">데뷔일자</span>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        className="text-center"
                        placeholder="YYYY"
                        aria-label="year"
                        value={debut.year}
                        onChange={(e) => setDebut({ ...debut, year: e.target.value })}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <span className="mx-2">년</span>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        className="text-center"
                        placeholder="MM"
                        aria-label="month"
                        value={debut.month}
                        onChange={(e) => setDebut({ ...debut, month: e.target.value })}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <span className="mx-2">월</span>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        className="text-center"
                        placeholder="DD"
                        aria-label="day"
                        value={debut.day}
                        onChange={(e) => setDebut({ ...debut, day: e.target.value })}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <span className="mx-2">일</span>
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  <div />
                )}
              </CTable>
              <CCol className="d-flex flex-row my-2 mt-4">
                <span style={{ width: '200px' }}>소속사(한국어)</span>
                <CFormInput
                  placeholder="한국어 내용을 입력하세요"
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
              <CCol className="d-flex flex-row">
                <span style={{ width: '200px' }}>소속사(기타)</span>
                <CFormInput
                  placeholder="영어 내용을 입력하세요"
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
              {artistType === 1 ? (
                <CCol>
                  <CCol className="d-flex flex-row my-2">
                    <span style={{ width: '200px' }}>팬클럽명(한국어)</span>
                    <CFormInput
                      placeholder="한국어 내용을 입력하세요"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={fanClub.ko}
                      onChange={(e) => setFanClub({ ...fanClub, ko: e.target.value })}
                    />
                  </CCol>
                  <CCol className="d-flex flex-row">
                    <span style={{ width: '200px' }}>팬클럽명(기타)</span>
                    <CFormInput
                      placeholder="영어 내용을 입력하세요"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={fanClub.etc}
                      onChange={(e) => setFanClub({ ...fanClub, etc: e.target.value })}
                    />
                  </CCol>
                  <CCol className="d-flex flex-row justify-content-end my-3">
                    <div>*기타 : 영어, 중국어, 일어, 스페인어 선택 사용자에게 노출</div>
                  </CCol>
                </CCol>
              ) : (
                <>
                  <div />
                  <div />
                </>
              )}
              <div className="mb-3 form-body-title">
                <span>아티스트 공식채널</span>
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
                  <CInputGroupText className="col-sm-3">트위터</CInputGroupText>
                  <CFormInput
                    aria-label="Text input with checkbox"
                    placeholder="URL을 입력하세요"
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
                  <CInputGroupText className="col-sm-3">인스타</CInputGroupText>
                  <CFormInput
                    aria-label="Text input with checkbox"
                    placeholder="URL을 입력하세요"
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
                  <CInputGroupText className="col-sm-3">유튜브</CInputGroupText>
                  <CFormInput
                    aria-label="Text input with checkbox"
                    placeholder="URL을 입력하세요"
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
                  <CInputGroupText className="col-sm-3">브이로그</CInputGroupText>
                  <CFormInput
                    aria-label="Text input with checkbox"
                    placeholder="URL을 입력하세요"
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
              <div className="form-product-add-aside__description mt-4">
                <div className="mb-3 form-body-title">
                  <span>아티스트 이미지 ( 권장 : 375*245 JPEG )</span>
                </div>
                <FileBtn
                  name="메인"
                  title="artist"
                  fileData={(data) => {
                    setImg({ ...img, main: data })
                  }}
                  accept="image/*"
                  id="main"
                  imageUrl={img.main}
                />
                <div className="mb-3 form-body-title">
                  <span>아티스트 이미지 ( 권장 : 335*150 JPEG )</span>
                </div>
                <FileBtn
                  name="서브"
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
        {role !== one && (
          <CButton
            color="info"
            className="form-footer__btn__ml form-footer__btn text-white px-5"
            onClick={() => {
              setIsModal(true)
            }}
          >
            저장
          </CButton>
        )}
        <CButton color="light" className="form-footer__btn" onClick={onClickClose}>
          닫기
        </CButton>
      </CModalFooter>
      {isModal && (
        <CheckPopup
          onClickClose={() => setIsModal(false)}
          bodyContent={'아티스트 내용을 수정하시겠습니까?'}
          onCheked={(value) => modalOkCheck(value)}
          title={'수정'}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => {
            setIsOkCheck(false)
            onChecked()
          }}
          bodyContent={'수정이 완료되었습니다.'}
        />
      )}
    </CModal>
  )
}

ArtistDetail.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.number.isRequired,
  onChecked: PropTypes.func.isRequired,
}
