import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import PropTypes from 'prop-types'
import axios from 'axios'

const Login = (props) => {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [isErrorMessage, setIsErrorMessage] = useState('')

  const login = async () => {
    setIsErrorMessage('')
    const pattern = /\s/g
    if (password.match(pattern)) {
      setIsErrorMessage('공백은 입력할 수 없습니다.')
      return
    }
    const body = {
      login: userId,
      password,
    }

    const res = await axios.post(`/api/manager/login`, body, {
      headers: {
        'Content-Type': `application/json; utf-8`,
      },
    })

    if (!res.data.success) {
      setIsErrorMessage('아이디 또는 비밀번호를 확인해 주세요.')
    } else {
      setIsErrorMessage('')
      localStorage.setItem('user', JSON.stringify(res.data.value.login))
      alert('로그인에 성공했습니다.')
      props.history.push('/user/search')
    }
  }

  if (localStorage.getItem('user')) {
    props.history.push('/user/search')
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <CImage
                        src="/loginLogo.png"
                        alt="없음"
                        style={{ width: '100%', height: '100%', marginBottom: '5%' }}
                      />
                    </div>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="아이디"
                        autoComplete="username"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            login()
                          }
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="비밀번호"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            login()
                          }
                        }}
                      />
                    </CInputGroup>
                    {isErrorMessage && (
                      <div className="mb-3" style={{ color: 'red' }}>
                        {isErrorMessage}
                      </div>
                    )}
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={() => login()}>
                          로그인
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
Login.propTypes = {
  history: PropTypes.object,
}

export default Login
