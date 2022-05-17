import React, { useState, useEffect } from 'react'
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
import { CheckPopup } from 'src/components/publicPopup/CheckPopup'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'

export const GroupDetail = ({ onClickClose, onId }) => {
  const one = 1
  const [role, setRole] = useState('')
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isModal, setIsModal] = useState(false) // modify check Modal
  const [type, setType] = useState('1')
  const [code, setCode] = useState('')
  const [groupType, setGroupType] = useState('1')
  const [productList, setProductList] = useState('')
  const [status, setStatus] = useState(1)
  const [isErrorMessage, setIsErrorMessage] = useState('') // code error message
  const [isErrorProduct, setIsErrorProduct] = useState('') // product code error message

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
    const res = await axios
      .get(`/api/fan/support/group?id=${onId}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setType(res.data.value.type)
    setCode(res.data.value.code_group)
    setGroupType(res.data.value.place_id)
    setProductList(
      res.data.value.product_id !== null ? res.data.value.product_id.replace(/\,/g, '\n') : '',
    )
    setStatus(res.data.value.status)
  }

  const create = async () => {
    setIsErrorMessage('')
    setIsErrorProduct('')
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
      id: onId,
      type: parseInt(type),
      code_group: code === '' ? null : code,
      place_id: parseInt(groupType),
      product_id: productList,
      status: parseInt(status),
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
        alert('올바르게 작성 후 다시 시도해 주세요.')
      }
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
    window.location.reload(`/support/product/group/list`)
  }

  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalHeader>
        <CModalTitle>제품 내용 수정</CModalTitle>
      </CModalHeader>
      <CModalBody className="form-body">
        <div className="form-product-add form-product-add1" style={{ borderTop: 'none' }}>
          <div className="form-product-add__select">
            <div className="mb-3 form-body-title">
              <span>상품구분</span>
            </div>
            <CFormInput
              size="lg"
              aria-label="Large select example"
              className="select-group__select"
              value={type === 1 ? '광고' : '기부'}
              // onChange={(e) => setType(e.target.value)}
              readOnly
            >
              {/* <option value="1">광고</option>
                <option value="2">기부</option> */}
            </CFormInput>
          </div>
          {type === '2' || type === 2 ? (
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
                  readOnly
                />
              </div>
            </div>
          ) : (
            <div />
          )}

          {type === '1' || type === 1 ? (
            <div className="form-product-add__description">
              <div className="mb-3 form-body-title">
                <span>광고 그룹 구분</span>
              </div>
              <div className="form-product-add__description__column">
                <CFormInput
                  size="lg"
                  aria-label="Large select example"
                  className="mr-3 select-group__select"
                  value={groupType === 1 ? '지하철' : groupType === 2 ? '옥외광고' : '기타광고'}
                  onChange={(e) => setGroupType(e.target.value)}
                  readOnly
                >
                  {/* <option value="1">지하철</option>
                    <option value="2">옥외광고</option>
                    <option value="3">기타광고</option> */}
                </CFormInput>
              </div>
            </div>
          ) : (
            <div className="form-product-add__description">
              <div className="mb-3 form-body-title">
                <span>기부 그룹 구분</span>
              </div>
              <div className="form-product-add__description__column">
                <CFormInput
                  size="lg"
                  aria-label="Large select example"
                  className="mr-3 select-group__select"
                  value={
                    groupType === 1 ? '기부물품A' : groupType === 2 ? '기부물품B' : '기부물품C'
                  }
                  onChange={(e) => setGroupType(e.target.value)}
                  readOnly
                >
                  {/* <option value="1">기부물품A</option>
                    <option value="2">기부물품B</option>
                    <option value="3">기부물품C</option> */}
                </CFormInput>
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
              <option value="1">정상</option>
              <option value="0">비활성</option>
              <option value="-1">삭제</option>
            </CFormSelect>
          </div>
        </div>
      </CModalBody>
      <CModalFooter className="form-footer">
        {role !== one && (
          <CButton
            color="success"
            className="form-footer__bt__ml form-footer__bt"
            onClick={() => setIsModal(true)}
          >
            저장
          </CButton>
        )}
        <CButton color="light" className="form-footer__bt" onClick={() => onClickClose()}>
          닫기
        </CButton>
      </CModalFooter>
      {isModal && (
        <CheckPopup
          onClickClose={() => setIsModal(false)}
          bodyContent={'그룹 내용을 수정하시겠습니까?'}
          title={'삭제'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup onClickClose={() => closeModalEvent()} bodyContent={'수정을 완료했습니다.'} />
      )}
    </CModal>
  )
}

GroupDetail.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.number.isRequired,
}
