import React, { useEffect, useState } from 'react'
import { CButton, CCol, CFormInput, CFormTextarea, CModal, CModalBody, CRow } from '@coreui/react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { headerConfig } from '../../../../../static/axiosConfig'
import { statusCatch } from '../../../../../static/axiosCatch'
import { CheckPopup } from '../../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../../components/publicPopup/NormalPopup'

const LevelDetail = ({ onClickClose, onId, onCloseOkEvent }) => {
  const [isLvlDetail, setIsLvlDetail] = useState(false) // Detail Popup
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [icon, setIcon] = useState()
  const [isName, setName] = useState()
  const [tips, setTips] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [isDescription, setDescription] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [minExp, setMinExp] = useState()
  const [maxExp, setMaxExp] = useState()
  const [heart1, setHeart1] = useState()
  const [heart2, setHeart2] = useState()
  const [star, setStar] = useState()
  const [gold, setGold] = useState()
  const one = 3
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
      .get(`/api/setting/level/policy/${onId}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setIcon(res.data.value.icon)
    setName(res.data.value.name)
    setMinExp(res.data.value.min_exp)
    setMaxExp(res.data.value.max_exp)
    setHeart1(res.data.value.heart_1)
    setHeart2(res.data.value.heart_2)
    setStar(res.data.value.star)
    setGold(res.data.value.gold)
    setDescription({
      ko: res.data.value.description.ko,
      en: res.data.value.description.en,
      ch: res.data.value.description.ch,
      jp: res.data.value.description.jp,
      es: res.data.value.description.es,
    })
    setTips({
      ko: res.data.value.tips.ko,
      en: res.data.value.tips.en,
      ch: res.data.value.tips.ch,
      jp: res.data.value.tips.jp,
      es: res.data.value.tips.es,
    })
  }
  const modify = async () => {
    const data = {
      icon: icon,
      name: isName,
      tips: tips,
      description: isDescription,
      min_exp: minExp,
      max_exp: maxExp,
      heart_1: heart1,
      heart_2: heart2,
      star: star,
      gold: gold,
    }
    const res = await axios
      .put(`/api/setting/level/policy/${onId}`, data, headerConfig)
      .catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck(true)
      onCloseOkEvent()
    } else {
      alert('?????? ????????? ?????????.')
    }
  }
  const modalOkEvent = (value) => {
    if (value) {
      setIsLvlDetail(false)
      modify()
    } else {
      setIsLvlDetail(false)
    }
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol sm={5}>
            {/*3*/}
            <CCol className="d-flex flex-column mb-4">
              <div className="mb-4 d-flex flex-row justify-content-between w-25">
                <span>?????????</span>
                <span className="fw-bold">LV.{onId}???</span>
              </div>
              <div className="mb-2">?????? ????????????????????????</div>
              <div className="d-flex flex-row">
                <span style={{ width: '200px' }}>?????? ????????????</span>
                <CFormInput
                  className="text-end"
                  onChange={(e) => {
                    setMinExp(e.target.value)
                  }}
                  defaultValue={minExp}
                  placeholder="0"
                />
              </div>
              <div className="d-flex flex-row my-2">
                <span style={{ width: '200px' }}>?????? ????????????</span>
                <CFormInput
                  className="text-end"
                  onChange={(e) => {
                    setMaxExp(e.target.value)
                  }}
                  defaultValue={maxExp}
                  placeholder="0"
                />
              </div>
              <div className="d-flex flex-row">
                <span style={{ width: '200px' }}>??????1????????? ?????????</span>
                <CFormInput
                  className="text-end"
                  onChange={(e) => {
                    setHeart1(e.target.value)
                  }}
                  defaultValue={heart1}
                  placeholder="0"
                />
              </div>
              <div className="d-flex flex-row my-2">
                <span style={{ width: '200px' }}>??????2????????? ?????????</span>
                <CFormInput
                  className="text-end"
                  onChange={(e) => {
                    setHeart2(e.target.value)
                  }}
                  defaultValue={heart2}
                  placeholder="0"
                />
              </div>
              <div className="d-flex flex-row">
                <span style={{ width: '200px' }}>??????????????? ?????????</span>
                <CFormInput
                  className="text-end"
                  onChange={(e) => {
                    setStar(e.target.value)
                  }}
                  defaultValue={star}
                  placeholder="0"
                />
              </div>
              <div className="d-flex flex-row mt-2">
                <span style={{ width: '200px' }}>??????????????? ????????????</span>
                <CFormInput
                  className="text-end"
                  onChange={(e) => {
                    setGold(e.target.value)
                  }}
                  defaultValue={gold}
                  placeholder="0"
                />
              </div>
            </CCol>
          </CCol>
          {/*Second col*/}
          <CCol sm={1} />
          {/*1*/}
          <CCol sm={5}>
            <CCol>
              <div>?????? ??? ??????????????????</div>
              <div className="my-2">(??????????????? ????????? ????????? ?????? ???????)???</div>
              <CCol className="d-flex flex-column my-4">
                <div className="d-flex flex-row">
                  <span style={{ width: '100px' }}>????????????</span>
                  <CFormTextarea
                    onChange={(e) => {
                      setTips({ ...tips, ko: e.target.value })
                    }}
                    defaultValue={tips.ko}
                  />
                </div>
                <div className="d-flex flex-row my-2">
                  <span style={{ width: '100px' }}>?????????</span>
                  <CFormTextarea
                    onChange={(e) => {
                      setTips({ ...tips, en: e.target.value })
                    }}
                    defaultValue={tips.en}
                  />
                </div>
                <div className="d-flex flex-row">
                  <span style={{ width: '100px' }}>????????????</span>
                  <CFormTextarea
                    onChange={(e) => {
                      setTips({ ...tips, ch: e.target.value })
                    }}
                    defaultValue={tips.ch}
                  />
                </div>
                <div className="d-flex flex-row my-2">
                  <span style={{ width: '100px' }}>????????????</span>
                  <CFormTextarea
                    onChange={(e) => {
                      setTips({ ...tips, jp: e.target.value })
                    }}
                    defaultValue={tips.jp}
                  />
                </div>
                <div className="d-flex flex-row">
                  <span style={{ width: '100px' }}>???????????????</span>
                  <CFormTextarea
                    onChange={(e) => {
                      setTips({ ...tips, es: e.target.value })
                    }}
                    defaultValue={tips.es}
                  />
                </div>
              </CCol>
            </CCol>
            <CCol>
              <div>????????? ??????????????????</div>
              <div className="my-2">(??????????????? ????????? ????????? ?????? ???????)??????</div>
              <CCol className="d-flex flex-column my-4">
                <div className="d-flex flex-row">
                  <span style={{ width: '100px' }}>????????????</span>
                  <CFormTextarea
                    onChange={(e) => {
                      setDescription({ ...isDescription, ko: e.target.value })
                    }}
                    defaultValue={isDescription.ko}
                  />
                </div>
                <div className="d-flex flex-row my-2">
                  <span style={{ width: '100px' }}>?????????</span>
                  <CFormTextarea
                    onChange={(e) => {
                      setDescription({ ...isDescription, en: e.target.value })
                    }}
                    defaultValue={isDescription.en}
                  />
                </div>
                <div className="d-flex flex-row">
                  <span style={{ width: '100px' }}>????????????</span>
                  <CFormTextarea
                    onChange={(e) => {
                      setDescription({ ...isDescription, ch: e.target.value })
                    }}
                    defaultValue={isDescription.ch}
                  />
                </div>
                <div className="d-flex flex-row my-2">
                  <span style={{ width: '100px' }}>????????????</span>
                  <CFormTextarea
                    onChange={(e) => {
                      setDescription({ ...isDescription, jp: e.target.value })
                    }}
                    defaultValue={isDescription.jp}
                  />
                </div>
                <div className="d-flex flex-row">
                  <span style={{ width: '100px' }}>???????????????</span>
                  <CFormTextarea
                    onChange={(e) => {
                      setDescription({ ...isDescription, es: e.target.value })
                    }}
                    defaultValue={isDescription.es}
                  />
                </div>
              </CCol>
            </CCol>
          </CCol>
          <CCol>
            <CButton
              onClick={() => onClickClose()}
              color="light"
              size="sm"
              className="float-end px-3 ms-2 me-4"
            >
              ?????????
            </CButton>
            {role === one && (
              <CButton
                onClick={() => setIsLvlDetail(true)}
                color="info"
                style={{ color: 'white' }}
                size="sm"
                className="float-end px-5"
              >
                ??????
              </CButton>
            )}
          </CCol>
        </CRow>
      </CModalBody>
      {isLvlDetail && role === one && (
        <CheckPopup
          onClickClose={() => setIsLvlDetail(false)}
          bodyContent={'?????? ???????????? ?????????????????????????'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup onClickClose={() => onClickClose()} bodyContent={'??????????????? ????????? .'} />
      )}
    </CModal>
  )
}
LevelDetail.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.number.isRequired,
  onCloseOkEvent: PropTypes.func,
}
export default LevelDetail
