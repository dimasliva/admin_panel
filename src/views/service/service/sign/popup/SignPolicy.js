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

import { FileBtn } from 'src/components/FileBtn'

import { CheckPopup } from '../../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../../components/publicPopup/NormalPopup'
import FileApi from '../../../../../util/FileApi'

const SignPolicy = ({ onClickClose, onCloseOkEvent }) => {
  const [isStatus, setStatus] = useState(1)
  const [freePoint, setFreePoint] = useState('')
  const [policy, setPolicy] = useState({
    ch: '',
    en: '',
    es: '',
    jp: '',
    ko: '',
  })
  const [imgs, setImgs] = useState({
    ch: '',
    en: '',
    es: '',
    jp: '',
    ko: '',
  })
  const [isOkCheck, setIsOkCheck] = useState(false)
  const [isCreate, setIsCreate] = useState(false)
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
      .get(`/api/setting/signpolicy`, headerConfig)
      .catch((err) => statusCatch(err))

    setPolicy(res.data.value.setting.policy)
    setImgs(res.data.value.setting.img_billboard)
    setFreePoint(res.data.value.setting.free_point)
    setStatus(res.data.value.setting.status)
  }
  const create = async () => {
    if (imgs.ko instanceof File) {
      imgs.ko = await FileApi('signpolicy', imgs.ko)
    }
    if (imgs.en instanceof File) {
      imgs.en = await FileApi('signpolicy', imgs.en)
    }
    if (imgs.ch instanceof File) {
      imgs.ch = await FileApi('signpolicy', imgs.ch)
    }
    if (imgs.jp instanceof File) {
      imgs.jp = await FileApi('signpolicy', imgs.jp)
    }
    if (imgs.es instanceof File) {
      imgs.es = await FileApi('signpolicy', imgs.es)
    }
    const data = {
      setting: {
        policy: {
          ch: policy.ch,
          en: policy.en,
          es: policy.es,
          jp: policy.jp,
          ko: policy.ko,
        },
        status: isStatus,
        free_point: freePoint,
        img_billboard: {
          ch:
            imgs.ch.data === undefined || imgs.ch === ''
              ? imgs.ch
              : imgs.ch.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
          en:
            imgs.en.data === undefined || imgs.en === ''
              ? imgs.en
              : imgs.en.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
          es:
            imgs.es.data === undefined || imgs.jp === ''
              ? imgs.es
              : imgs.es.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
          jp:
            imgs.jp.data === undefined || imgs.jp === ''
              ? imgs.jp
              : imgs.jp.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
          ko:
            imgs.ko.data === undefined || imgs.ko === ''
              ? imgs.ko
              : imgs.ko.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        },
      },
    }
    const res = await axios
      .post(`/api/setting/signpolicy`, data, headerConfig)
      .catch((err) => statusCatch(err))

    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }
  // delete checked
  const modalOkEvent = (value) => {
    if (value) {
      setIsCreate(false)
      create()
    } else {
      setIsCreate(false)
    }
  }

  const closeModalEvent = () => {
    setIsOkCheck(false)
    onCloseOkEvent()
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol sm={6}>
            <CCol sm={8}>
              <span>전광판 이용 포인트 (스타포인트)​</span>
              <CCol className="d-flex flex-row align-items-center mt-2">
                <CFormInput
                  onChange={(e) => {
                    setFreePoint(e.target.value)
                  }}
                  value={freePoint}
                  type="number"
                  onKeyPress={(e) => {
                    let ch = String.fromCharCode(e.which)
                    if (!/[0-9]/.test(ch)) {
                      e.preventDefault()
                    }
                  }}
                  placeholder="1"
                  className="me-2 text-end"
                />
                <span>p</span>
              </CCol>
            </CCol>
            <CCol className="my-4">
              <div className="mb-3">전광판 이용 정책​</div>
              <CCol className="d-flex flex-column">
                <div className="d-flex flex-row ">
                  <span style={{ width: '100px' }}>한국어​</span>
                  <CFormTextarea
                    defaultValue={policy.ko}
                    onChange={(e) => {
                      setPolicy({ ...policy, ko: e.target.value })
                    }}
                    placeholder="내용을 입력하세요​"
                  />
                </div>
                <div className="d-flex flex-row my-2">
                  <span style={{ width: '100px' }}>영어​</span>
                  <CFormTextarea
                    defaultValue={policy.en}
                    onChange={(e) => {
                      setPolicy({ ...policy, en: e.target.value })
                    }}
                    placeholder="내용을 입력하세요​"
                  />
                </div>
                <div className="d-flex flex-row">
                  <span style={{ width: '100px' }}>중국어​</span>
                  <CFormTextarea
                    defaultValue={policy.ch}
                    onChange={(e) => {
                      setPolicy({ ...policy, ch: e.target.value })
                    }}
                    placeholder="내용을 입력하세요​"
                  />
                </div>
                <div className="d-flex flex-row my-2">
                  <span style={{ width: '100px' }}>일본어​</span>
                  <CFormTextarea
                    defaultValue={policy.jp}
                    onChange={(e) => {
                      setPolicy({ ...policy, jp: e.target.value })
                    }}
                    placeholder="내용을 입력하세요​"
                  />
                </div>
                <div className="d-flex flex-row">
                  <span style={{ width: '100px' }}>스페인어​</span>
                  <CFormTextarea
                    defaultValue={policy.es}
                    onChange={(e) => {
                      setPolicy({ ...policy, es: e.target.value })
                    }}
                    placeholder="내용을 입력하세요​"
                  />
                </div>
              </CCol>
            </CCol>
          </CCol>
          {/*Second column*/}
          <CCol sm={6}>
            <div className="mb-3">전광판 배너 이미지 (권장 : 295 x 180 JPEG)</div>
            <CCol>
              <FileBtn
                name="한국어"
                title="signpolicy"
                fileData={(data) => {
                  setImgs({ ...imgs, ko: data })
                }}
                accept="image/*"
                id="main"
                imageUrl={imgs.ko}
              />
            </CCol>
            <CCol>
              <FileBtn
                name="영어"
                title="signpolicy"
                fileData={(data) => {
                  setImgs({ ...imgs, en: data })
                }}
                accept="image/*"
                id="main2"
                imageUrl={imgs.en}
              />
            </CCol>
            <CCol>
              <FileBtn
                name="중국어"
                title="signpolicy"
                fileData={(data) => {
                  setImgs({ ...imgs, ch: data })
                }}
                accept="image/*"
                id="main3"
                imageUrl={imgs.ch}
              />
            </CCol>
            <CCol>
              <FileBtn
                name="일본어"
                title="signpolicy"
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
                title="signpolicy"
                fileData={(data) => {
                  setImgs({ ...imgs, es: data })
                }}
                accept="image/*"
                id="main5"
                imageUrl={imgs.es}
              />
            </CCol>
            {/*9*/}
            <CCol>
              <div className="my-2">전광판 상태​​</div>
              <CCol sm={4}>
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="search-bar__select"
                  style={{ width: '130px' }}
                  value={isStatus}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value={1}>진행 중</option>
                  <option value={0}>비활성</option>
                  <option value={2}>종료</option>
                  <option value={-1}>삭제</option>
                </CFormSelect>
              </CCol>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="form-footer">
        {role !== one && (
          <CButton
            style={{ color: 'white' }}
            color="info"
            className="form-footer__btn__ml form-footer__btn px-5"
            onClick={() => setIsCreate(true)}
          >
            저장​
          </CButton>
        )}
        <CButton
          onClick={() => onClickClose()}
          style={{ color: 'black' }}
          color="light"
          className="form-footer__btn px-3"
        >
          닫기
        </CButton>
      </CModalFooter>
      {/* Create Checked popup*/}
      {isCreate && (
        <CheckPopup
          onClickClose={() => setIsCreate(false)}
          bodyContent={'해당 내용으로 저장하시겠습니까?'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'전광판 등록을 완료되었습니다.'}
        />
      )}
    </CModal>
  )
}
SignPolicy.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onCloseOkEvent: PropTypes.func,
}
export default SignPolicy
