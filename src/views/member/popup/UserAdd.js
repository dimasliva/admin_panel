import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CCol,
  CRow,
  CFormSelect,
  CButton,
  CFormInput,
  CFormLabel,
} from '@coreui/react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'
import { NormalPopup } from 'src/components/publicPopup/NormalPopup'
import { CheckPopup } from '../../../components/publicPopup/CheckPopup'

export const UserAdd = ({ onClickClose, onCreated }) => {
  const [userNickname, setUserNickname] = useState('')
  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [gender, setGender] = useState('0')
  const [age, setAge] = useState('10')
  const [isErrmessage, setIsErrmessage] = useState('')
  const [isErrNickname, setIsErrNick] = useState('')
  const [isErrPassword, setIsErrPassword] = useState('')
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isCreate, setIsCreate] = useState(false) // Create checked

  // create user
  const create = async () => {
    setIsErrmessage('')
    setIsErrPassword('')
    const checked = await axios
      .get(`/api/user/exist?email=${userId}&nickname=${userNickname}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!checked.data.success) {
      if (checked.data.error === 'Email is incorrect') setIsErrmessage('잘못된 이메일 형식입니다.')
      else setIsErrmessage('중복된 이메일입니다.')
      return
    }
    if (userPassword === '') {
      setIsErrPassword('비밀번호를 입력해 주세요.')
      return
    } else if (userPassword.length < 6) {
      setIsErrPassword('비밀번호 6자리 이상 입력해주세요.')
      return
    }

    const pattern = /\s/g
    if (userPassword.match(pattern)) {
      setIsErrPassword('공백은 입력할 수 없습니다.')
      return
    }

    const data = {
      nickname: userNickname,
      email: userId,
      password: userPassword,
      gender,
      birth: age,
    }

    let isValidate = true
    Object.values(data).some((value) => {
      if (!value) {
        isValidate = false
        alert('모든 항목을 입력해주세요')
        return true
      }
    })

    if (!isValidate) return

    const res = await axios.post(`/api/user`, data, headerConfig).catch((err) => statusCatch(err))

    if (!res.data.success) return

    setIsOkCheck(true)
  }

  const closeModalEvent = () => {
    setIsOkCheck(false)
    onCreated()
  }
  const modalOkEvent = (value) => {
    if (value) {
      setIsCreate(false)
      create()
    } else {
      setIsCreate(false)
    }
  }
  return (
    <CModal visible={true} onClose={onClickClose}>
      <CModalHeader>
        <CModalTitle>신규 사용자계정 생성</CModalTitle>
      </CModalHeader>
      <CModalBody className="form-body">
        <CRow>
          <CCol xs={{ span: 12 }}>
            <div className="form-user-add form-user-add1" style={{ borderTop: 'none' }}>
              <div className="form-user-add__select">
                <span>&gt; 사용자 정보</span>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="nickname" className="col-sm-2 col-form-label">
                    닉네임
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      id="nickname"
                      placeholder="닉네임를 입력하세요"
                      maxLength={30}
                      value={userNickname}
                      onChange={(e) => setUserNickname(e.target.value)}
                    />
                    {isErrNickname && (
                      <div className="mt-1">
                        <span style={{ color: 'red' }}>{isErrNickname}</span>
                      </div>
                    )}
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">
                    이메일
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      id="email"
                      placeholder="이메일를 입력하세요"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="password" className="col-sm-2 col-form-label">
                    패스워드
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="password"
                      id="password"
                      placeholder="패스워드를 입력하세요"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                    />
                  </CCol>
                  {isErrPassword && (
                    <span style={{ color: 'red', marginLeft: '90px', marginTop: '10px' }}>
                      {isErrPassword}
                    </span>
                  )}
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="gender" className="col-sm-2 col-form-label">
                    성별
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect
                      aria-label="성별"
                      id="gender"
                      className="w100"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="0">남성</option>
                      <option value="1">여성</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="birth" className="col-sm-2 col-form-label">
                    연령대
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect
                      aria-label="연령대"
                      id="gender"
                      className="w100"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    >
                      <option value="10">10 대</option>
                      <option value="20">20 대</option>
                      <option value="30">30 대</option>
                      <option value="40">40 대</option>
                      <option value="50+">50 대+</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
                {isErrmessage && (
                  <span style={{ color: 'red', marginLeft: '90px', marginTop: '10px' }}>
                    {isErrmessage}
                  </span>
                )}
              </div>
            </div>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="form-footer d-flex flex-row justify-content-center">
        <CButton
          color="success"
          className="form-footer__btn__ml form-footer__btn text-white px-4"
          onClick={() => {
            userNickname.length <= 3
              ? setIsErrNick('닉네임은 3자 이내 30자 이하로 입력해 주세요')
              : setIsCreate(true)
          }}
        >
          저장
        </CButton>
        <CButton color="light" className="form-footer__btn" onClick={() => onClickClose()}>
          닫기
        </CButton>
      </CModalFooter>
      {isCreate && (
        <CheckPopup
          onClickClose={() => setIsCreate(false)}
          bodyContent={'신규계정을 등록하시겠습니까?'}
          title={'등록'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'계정등록을 완료했습니다.'}
        />
      )}
    </CModal>
  )
}

UserAdd.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onCreated: PropTypes.func,
}
