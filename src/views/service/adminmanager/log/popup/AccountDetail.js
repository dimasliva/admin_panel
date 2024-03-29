import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCol,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import { headerConfig } from '../../../../../static/axiosConfig'
import { statusCatch } from '../../../../../static/axiosCatch'
import { CheckPopup } from '../../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../../components/publicPopup/NormalPopup'

const AccountDetail = ({ onClickClose, onId, onCloseOkEvent }) => {
  const [isAccountDetail, setIsAccountDetail] = useState(false) // Detail Popup
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isStatus, setStatus] = useState(1)
  const [isLogin, setLogin] = useState('')
  const [isEmail, setEmail] = useState('')
  const [isFirstName, setFirstName] = useState('')
  const [isLastName, setLastName] = useState('')
  const [isPass, setPass] = useState('')
  const [isRole, setRole] = useState('')
  const [roleUser, setRoleUser] = useState('')
  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRoleUser(role.data.value.role)
    const res = await axios
      .get(`/api/manager?id=${onId}&status=all`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setLogin(res.data.value.login)
    setEmail(res.data.value.email)
    setFirstName(res.data.value.first_name)
    setLastName(res.data.value.last_name)
    setRole(res.data.value.role)
    setStatus(res.data.value.status)
    console.log(role.data.value.role)
    console.log(res.data.value.role)
  }
  const modify = async () => {
    const data = {
      id: onId,
      login: isLogin,
      email: isEmail,
      first_name: isFirstName,
      last_name: isLastName,
      role: isRole,
      password: isPass,
      status: isStatus,
    }
    const res = await axios
      .post(`/api/manager`, data, headerConfig)
      .catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }
  const closeModalEvent = () => {
    setIsOkCheck(false)
    onCloseOkEvent()
  }
  const modalOkEvent = (value) => {
    if (value) {
      setIsAccountDetail(false)
      modify()
    } else {
      setIsAccountDetail(false)
    }
  }

  return (
    <CModal visible={true} onClose={onClickClose}>
      <CModalHeader>
        <CModalTitle>계정 생성</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol sm={12}>
            <CCol className="d-flex flex-row">
              <span className="mb-3 mt-4">사용자 정보​</span>
            </CCol>
            <CCol className="d-flex flex-column">
              <CCol className="d-flex flex-row">
                <span style={{ width: '150px' }}>아이디​</span>
                <CFormInput
                  type="login"
                  placeholder="아이디를 입력하세요"
                  onChange={(e) => setLogin(e.target.value)}
                  defaultValue={isLogin}
                />
              </CCol>
              <CCol className="d-flex flex-row my-2">
                <span style={{ width: '150px' }}>이름​</span>
                <CFormInput
                  type="name"
                  placeholder="이름을 정확히 입력하세요"
                  defaultValue={isFirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </CCol>
              <CCol className="d-flex flex-row">
                <span style={{ width: '150px' }}>패스워드​</span>
                <CFormInput
                  placeholder="패스워드를 입력하세요"
                  defaultValue={isPass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </CCol>
              <CCol className="d-flex flex-row mt-2">
                <span style={{ width: '150px' }}>사용자 등급​</span>
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="text-center search-bar__select"
                  value={isRole}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="1">일반</option>
                  <option value="2">운영자​</option>
                  {roleUser === 3 && <option value="3">관리자</option>}
                </CFormSelect>
              </CCol>
            </CCol>
            {/*3*/}
            <CCol sm={3} className="d-flex flex-column align-items-center my-4">
              <div className="mb-2">등록상태​</div>
              <CFormSelect
                size="lg"
                aria-label="Large select example"
                className="text-center search-bar__select"
                value={isStatus}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value={1}>일반</option>
                <option value={0}>비활성</option>
                <option value={-1}>삭제</option>
              </CFormSelect>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="d-flex flex-row justify-content-center form-footer">
        {roleUser === 3 && (
          <CButton
            color="info"
            style={{ color: 'white' }}
            className="px-5 form-footer__btn__ml form-footer__btn"
            onClick={() => setIsAccountDetail(true)}
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
      {isAccountDetail && (
        <CheckPopup
          onClickClose={() => setIsAccountDetail(false)}
          bodyContent={'가입 내용을 수정하시겠습니까?'}
          title={'등록'}
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
AccountDetail.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.number.isRequired,
  onCloseOkEvent: PropTypes.func,
}
export default AccountDetail
