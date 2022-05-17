import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
} from '@coreui/react'
import { CheckPopup } from '../../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../../components/publicPopup/NormalPopup'
import axios from 'axios'
import { headerConfig } from '../../../../../static/axiosConfig'
import { statusCatch } from '../../../../../static/axiosCatch'

const BasicPolicyDetail = ({ onClickClose, onId, onCloseOkEvent }) => {
  const [isEditPolicy, setIsEditPolicy] = useState(false) // Detail Popup
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isStatus, setStatus] = useState('') // ok Modal
  const [isPriority, setPriority] = useState('') // ok Modal
  const [isInfo, setInfo] = useState({
    ch: '',
    en: '',
    es: '',
    jp: '',
    ko: '',
  })
  const [isName, setName] = useState({
    ch: '',
    en: '',
    es: '',
    jp: '',
    ko: '',
  })
  const one = 3
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
      .get(`/api/setting/basicpolicy/${onId}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setStatus(res.data.value.status)
    setPriority(res.data.value.priority)
    setInfo({
      ko: res.data.value.info.ko,
      en: res.data.value.info.en,
      ch: res.data.value.info.ch,
      jp: res.data.value.info.jp,
      es: res.data.value.info.es,
    })
    setName({
      ko: res.data.value.name.ko,
      en: res.data.value.name.en,
      ch: res.data.value.name.ch,
      jp: res.data.value.name.jp,
      es: res.data.value.name.es,
    })
  }
  const modify = async () => {
    const data = {
      id: onId,
      info: isInfo,
      name: isName,
      priority: isPriority,
      status: isStatus,
    }
    const res = await axios
      .put(`/api/setting/basicpolicy`, data, headerConfig)
      .catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }
  const modalOkEvent = (value) => {
    if (value) {
      setIsEditPolicy(false)
      modify()
    } else {
      setIsEditPolicy(false)
    }
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol sm={5}>
            {/*3*/}
            <CCol className="d-flex flex-column mb-4">
              <div className="mb-3">기본정책 제목​​​​</div>
              <div className="d-flex flex-row">
                <span style={{ width: '100px' }}>한국어​</span>
                <CFormInput
                  onChange={(e) => setName({ ...isName, ko: e.target.value })}
                  defaultValue={isName.ko}
                  placeholder="제목을 입력하세요​​"
                />
              </div>
              <div className="d-flex flex-row my-2">
                <span style={{ width: '100px' }}>영어​</span>
                <CFormInput
                  onChange={(e) => setName({ ...isName, en: e.target.value })}
                  defaultValue={isName.en}
                  placeholder="제목을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row">
                <span style={{ width: '100px' }}>중국어​</span>
                <CFormInput
                  onChange={(e) => setName({ ...isName, ch: e.target.value })}
                  defaultValue={isName.ch}
                  placeholder="제목을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row my-2">
                <span style={{ width: '100px' }}>일본어​</span>
                <CFormInput
                  onChange={(e) => setName({ ...isName, jp: e.target.value })}
                  defaultValue={isName.jp}
                  placeholder="제목을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row">
                <span style={{ width: '100px' }}>스페인어​</span>
                <CFormInput
                  onChange={(e) => setName({ ...isName, es: e.target.value })}
                  defaultValue={isName.es}
                  placeholder="제목을 입력하세요​"
                />
              </div>
            </CCol>
            {/*Second Col1*/}
            <CCol className="d-flex flex-column my-4">
              <div className="mb-3 mt-3">기본정책 상세 내용​​</div>
              <div className="d-flex flex-row mb-2">
                <CFormLabel style={{ width: '100px' }}>한국어​</CFormLabel>
                <CFormTextarea
                  onChange={(e) => setInfo({ ...isInfo, ko: e.target.value })}
                  defaultValue={isInfo.ko}
                  style={{ resize: 'none' }}
                  placeholder="상세내용을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row mb-2">
                <CFormLabel style={{ width: '100px' }}>영어​</CFormLabel>
                <CFormTextarea
                  onChange={(e) => setInfo({ ...isInfo, en: e.target.value })}
                  defaultValue={isInfo.en}
                  style={{ resize: 'none' }}
                  placeholder="상세내용을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row mb-2">
                <CFormLabel style={{ width: '100px' }}>중국어​</CFormLabel>
                <CFormTextarea
                  onChange={(e) => setInfo({ ...isInfo, ch: e.target.value })}
                  defaultValue={isInfo.ch}
                  style={{ resize: 'none' }}
                  placeholder="상세내용을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row mb-2">
                <CFormLabel style={{ width: '100px' }}>일본어​</CFormLabel>
                <CFormTextarea
                  onChange={(e) => setInfo({ ...isInfo, jp: e.target.value })}
                  defaultValue={isInfo.jp}
                  style={{ resize: 'none' }}
                  placeholder="상세내용을 입력하세요​"
                />
              </div>
              <div className="d-flex flex-row mb-2">
                <CFormLabel style={{ width: '100px' }}>스페인어​</CFormLabel>
                <CFormTextarea
                  onChange={(e) => setInfo({ ...isInfo, es: e.target.value })}
                  defaultValue={isInfo.es}
                  style={{ resize: 'none' }}
                  placeholder="상세내용을 입력하세요​​"
                />
              </div>
            </CCol>
            <CCol className="d-flex flex-column" sm={6}>
              <div>등록상태​</div>
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="text-center search-bar__select mt-2"
                value={isStatus}
                style={{ width: '130px' }}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="1">정상​</option>
                <option value="0">비활성​</option>
                <option value="-1">삭제​</option>
              </CFormSelect>
            </CCol>
          </CCol>
          {/*Second col*/}
          <CCol sm={1} />
          {/*1*/}
          <CCol sm={5}>
            <CCol>
              <div>정책 우선순위​</div>
              <div className="my-2 text-danger">
                ※ 높을수록 우선순위가 높다 ex_0이 가장 마지막에 노출됨​
              </div>
              <CCol className="my-4 ms-4">
                <CFormInput
                  type="number"
                  onKeyPress={(e) => {
                    let ch = String.fromCharCode(e.which)
                    if (!/[0-9]/.test(ch)) {
                      e.preventDefault()
                    }
                  }}
                  defaultValue={isPriority}
                  onChange={(e) => setPriority(e.target.value)}
                  placeholder="순서를 숫자로 입력하세요"
                />
              </CCol>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="form-footer d-flex flex-row justify-content-center">
        {role === one && (
          <CButton
            onClick={() => setIsEditPolicy(true)}
            color="info"
            style={{ color: 'white' }}
            className="px-4 form-footer__btn__ml form-footer__btn"
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
      {isEditPolicy && role === one && (
        <CheckPopup
          onClickClose={() => setIsEditPolicy(false)}
          bodyContent={'기본정책 내용을 수정하시겠습니까?'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup onClickClose={() => onCloseOkEvent()} bodyContent={'변경이 완료되었습니다.'} />
      )}
    </CModal>
  )
}
BasicPolicyDetail.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.number.isRequired,
  onCloseOkEvent: PropTypes.func,
}
export default BasicPolicyDetail
