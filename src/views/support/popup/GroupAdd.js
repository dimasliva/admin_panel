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
  CFormTextarea,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { NormalPopup } from 'src/components/publicPopup/NormalPopup'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'

export const GroupAdd = ({ onClickClose }) => {
  const one = 1
  const [role, setRole] = useState('')
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [equalCode, setEqualCode] = useState(false) // ok Modal
  const [type, setType] = useState('1')
  const [code, setCode] = useState('')
  const [groupType, setGroupType] = useState('1')
  const [productList, setProductList] = useState('')
  const [status, setStatus] = useState(1)
  const [isErrorMessage, setIsErrorMessage] = useState('') // code error message
  const [isErrorProduct, setIsErrorProduct] = useState('') // product code error message
  useEffect(() => {
    getRole()
  }, [])
  const getRole = async () => {
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
  }

  const create = async () => {
    setIsErrorMessage('')
    if (type === 2 || type === '2') {
      if (code === '') {
        setIsErrorMessage('코드를 입력해주세요.')
        return
      }
    }
    if (productList === '') {
      setIsErrorProduct('상품 목록을 입려해주세요.')
      return
    }
    const data = {
      type: parseInt(type),
      code_group: code === '' ? productList : code,
      place_id: parseInt(groupType),
      product_id: productList,
      status: status,
    }
    const res = await axios
      .post(`/api/fan/support/group`, data, headerConfig)
      .catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      if (res.data.error === "It's an overlapping group.") {
        alert('중복된 코드입니다.')
      } else {
        alert('잘못된 코드입니다.')
      }
    }
  }

  const closeModalEvent = () => {
    setIsOkCheck(false)
    window.location.reload(`/support/product/group/list`)
  }

  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalHeader>
        <CModalTitle>제품 내용 등록</CModalTitle>
      </CModalHeader>
      <CModalBody className="form-body">
        <div className="form-product-add form-product-add1" style={{ borderTop: 'none' }}>
          <div className="form-product-add__select">
            <div className="mb-3 form-body-title">
              <span>상품구분</span>
            </div>
            <CFormSelect
              size="lg"
              aria-label="Large select example"
              className="select-group__select"
              style={{ width: '110px' }}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="1">광고</option>
              <option value="2">기부</option>
            </CFormSelect>
          </div>
          {type === '2' && (
            <div className="form-product-add__description">
              <div className="mb-3 form-body-title">
                <span>기부분야 코드</span>
              </div>
              {isErrorMessage && (
                <div>
                  <span style={{ color: 'red' }}>{isErrorMessage}</span>
                </div>
              )}
              <div className="form-product-add__description__column">
                <CFormInput
                  placeholder="연결 기부코드를 입력하세요. ( ex_COV )"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            </div>
          )}

          {type === '1' ? (
            <div className="form-product-add__description">
              <div className="mb-3 form-body-title">
                <span>광고 그룹 구분</span>
              </div>
              <div className="form-product-add__description__column">
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="select-group__select"
                  style={{ width: '140px' }}
                  value={groupType}
                  onChange={(e) => setGroupType(e.target.value)}
                >
                  <option value="1">지하철</option>
                  <option value="2">옥외광고</option>
                  <option value="3">기타광고</option>
                </CFormSelect>
              </div>
            </div>
          ) : (
            <div className="form-product-add__description">
              <div className="mb-3 form-body-title">
                <span>기부 그룹 구분</span>
              </div>
              <div className="form-product-add__description__column">
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="select-group__select"
                  value={groupType}
                  onChange={(e) => setGroupType(e.target.value)}
                >
                  <option value="1">기부물품A</option>
                  <option value="2">기부물품B</option>
                  <option value="3">기부물품C</option>
                </CFormSelect>
              </div>
            </div>
          )}
          <div className="form-product-add__description">
            <div className="mb-3 form-body-title">
              <span>상품 목록</span>
            </div>
            {isErrorProduct && (
              <div>
                <span style={{ color: 'red' }}>{isErrorProduct}</span>
              </div>
            )}
            <div className="form-product-add__description__column">
              <CFormTextarea
                rows="3"
                style={{ height: '190px', resize: 'none' }}
                placeholder="연결 상품아이디를 입력하세요.   Ex) 1개 이상 시 줄바꿈(엔터)로 구분"
                value={productList}
                onChange={(e) => setProductList(e.target.value)}
              />
            </div>
          </div>
          <div className="form-product-add__select">
            <div className="mb-3 form-body-title">
              <span>그룹 상태</span>
            </div>
            <CFormSelect
              size="lg"
              aria-label="Large select example"
              className="select-group__select"
              style={{ width: '130px' }}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value={1}>정상</option>
              <option value={0}>비활성</option>
              <option value={-1}>삭제</option>
            </CFormSelect>
          </div>
        </div>
      </CModalBody>
      <CModalFooter className="form-footer">
        {role !== one && (
          <CButton
            color="success"
            style={{ color: 'white' }}
            className="form-footer__bt__ml form-footer__bt"
            onClick={() => create()}
          >
            저장
          </CButton>
        )}
        <CButton color="light" className="form-footer__bt" onClick={() => onClickClose()}>
          닫기
        </CButton>
      </CModalFooter>
      {isOkCheck && (
        <NormalPopup onClickClose={() => closeModalEvent()} bodyContent={'등록을 완료했습니다.'} />
      )}
      {equalCode && (
        <NormalPopup
          onClickClose={() => setEqualCode(false)}
          bodyContent={'그룹은 이미 오픈 소스로만 생성해야 합니다.'}
        />
      )}
    </CModal>
  )
}

GroupAdd.propTypes = {
  onClickClose: PropTypes.func.isRequired,
}
