import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CFormInput,
  CFormSelect,
  CModalFooter,
  CButton,
  CCol,
  CFormTextarea,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { FileBtn } from 'src/components/FileBtn'
import { NormalPopup } from 'src/components/publicPopup/NormalPopup'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import FileApi from 'src/util/FileApi'
import { CheckPopup } from '../../../components/publicPopup/CheckPopup'

export const ProductAdd = ({ onClickClose, onChekced }) => {
  const [isModal, setIsModal] = useState(false)
  const [type, setType] = useState('1')
  const [title, setTitle] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [description, setDescription] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [productGuide, setProductGuide] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [pageGuide, setPageGuide] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [targetPoint, setTargetPoint] = useState(1)
  const [img, setImg] = useState('')
  const [status, setStatus] = useState(1)
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const modalOkEvent = (value) => {
    if (value) {
      setIsModal(false)
      create()
    } else {
      setIsModal(false)
    }
  }
  const create = async () => {
    if (
      title.ko === '' &&
      title.en === '' &&
      title.ch === '' &&
      title.jp === '' &&
      title.es === ''
    ) {
      alert('상품 타이틀 입력')
    } else {
      let mainImage = ''

      if (img !== '') {
        mainImage = await FileApi('fanSupport', img)
      }

      const data = {
        type,
        name_product: {
          ko: title.ko,
          en: title.en,
          ch: title.ch,
          jp: title.jp,
          es: title.es,
        },
        about_product: {
          ko: description.ko,
          en: description.en,
          ch: description.ch,
          jp: description.jp,
          es: description.es,
        },
        guide_product: {
          ko: productGuide.ko,
          en: productGuide.en,
          ch: productGuide.ch,
          jp: productGuide.jp,
          es: productGuide.es,
        },
        guide_page: {
          ko: pageGuide.ko,
          en: pageGuide.en,
          ch: pageGuide.ch,
          jp: pageGuide.jp,
          es: pageGuide.es,
        },
        target_point: parseInt(targetPoint),
        img_product:
          img === '' ? '' : mainImage.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        status,
      }

      const res = await axios.post(`/api/fan/support/product`, data, headerConfig)
      if (res.data.success) {
        setIsOkCheck(true)
      } else {
        alert('다시 시도해 주세요.')
      }
    }
  }

  const closeModalEvent = () => {
    setIsOkCheck(false)
    onChekced()
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
            <CCol sm={7}>
              <CFormSelect
                aria-label="Large select example"
                className="select-group__select text-center"
                style={{ width: '100px' }}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value={1}>광고</option>
                <option value={2}>기부</option>
              </CFormSelect>
            </CCol>
          </div>
          <div className="form-product-add__description">
            <div className="mb-3 form-body-title">
              <span>상품 타이틀</span>
            </div>
            <CCol className="d-flex flex-row align-items-center my-2">
              <span style={{ width: '100px' }}>한국어</span>
              <CFormInput
                placeholder="내용을 입력하세요"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={title.ko}
                onChange={(e) => {
                  setTitle({
                    ...title,
                    ko: e.target.value,
                  })
                }}
              />
            </CCol>
            <CCol className="d-flex flex-row align-items-center my-2">
              <span style={{ width: '100px' }}>영어</span>
              <CFormInput
                placeholder="내용을 입력하세요"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={title.en}
                onChange={(e) => {
                  setTitle({
                    ...title,
                    en: e.target.value,
                  })
                }}
              />
            </CCol>
            <CCol className="d-flex flex-row align-items-center my-2">
              <span style={{ width: '100px' }}>중국어</span>
              <CFormInput
                placeholder="내용을 입력하세요"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={title.ch}
                onChange={(e) => {
                  setTitle({
                    ...title,
                    ch: e.target.value,
                  })
                }}
              />
            </CCol>
            <CCol className="d-flex flex-row align-items-center my-2">
              <span style={{ width: '100px' }}>일본어</span>
              <CFormInput
                placeholder="내용을 입력하세요"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={title.jp}
                onChange={(e) => {
                  setTitle({
                    ...title,
                    jp: e.target.value,
                  })
                }}
              />
            </CCol>
            <CCol className="d-flex flex-row align-items-center my-2">
              <span style={{ width: '100px' }}>스페인어</span>
              <CFormInput
                style={{ resize: 'none' }}
                placeholder="내용을 입력하세요"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={title.es}
                onChange={(e) => {
                  setTitle({
                    ...title,
                    es: e.target.value,
                  })
                }}
              />
            </CCol>
          </div>
          <div className="form-product-add__description">
            <div className="mb-3 form-body-title">
              <span>상품 세부내용 (광고_광고위치/기부_기부처기입)</span>
            </div>
            <CCol className="d-flex flex-row align-items-center my-2">
              <span style={{ width: '100px' }}>한국어</span>
              <CFormTextarea
                style={{ resize: 'none' }}
                placeholder="내용을 입력하세요"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={description.ko}
                onChange={(e) => {
                  setDescription({
                    ...description,
                    ko: e.target.value,
                  })
                }}
              />
            </CCol>
            <CCol className="d-flex flex-row align-items-center my-2">
              <span style={{ width: '100px' }}>영어</span>
              <CFormTextarea
                style={{ resize: 'none' }}
                placeholder="내용을 입력하세요"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={description.en}
                onChange={(e) => {
                  setDescription({
                    ...description,
                    en: e.target.value,
                  })
                }}
              />
            </CCol>
            <CCol className="d-flex flex-row align-items-center my-2">
              <span style={{ width: '100px' }}>중국어</span>
              <CFormTextarea
                style={{ resize: 'none' }}
                placeholder="내용을 입력하세요"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={description.ch}
                onChange={(e) => {
                  setDescription({
                    ...description,
                    ch: e.target.value,
                  })
                }}
              />
            </CCol>
            <CCol className="d-flex flex-row align-items-center my-2">
              <span style={{ width: '100px' }}>일본어</span>
              <CFormTextarea
                style={{ resize: 'none' }}
                placeholder="내용을 입력하세요"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={description.jp}
                onChange={(e) => {
                  setDescription({
                    ...description,
                    jp: e.target.value,
                  })
                }}
              />
            </CCol>
            <CCol className="d-flex flex-row align-items-center my-2">
              <span style={{ width: '100px' }}>스페인어</span>
              <CFormTextarea
                style={{ resize: 'none' }}
                placeholder="내용을 입력하세요"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={description.es}
                onChange={(e) => {
                  setDescription({
                    ...description,
                    es: e.target.value,
                  })
                }}
              />
            </CCol>
          </div>
          <div className="form-product-add__description">
            <div className="mb-3 form-body-title">
              <span>상품 가이드 (개설상품에 따라 참여 가이드/개설2된 서포트 하단)</span>
            </div>
            <CCol className="d-flex flex-row align-items-center my-2">
              <span style={{ width: '100px' }}>한국어</span>
              <CFormTextarea
                style={{ resize: 'none' }}
                placeholder="내용을 입력하세요"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={productGuide.ko}
                onChange={(e) => {
                  setProductGuide({
                    ...productGuide,
                    ko: e.target.value,
                  })
                }}
              />
            </CCol>
            <CCol className="d-flex flex-row align-items-center my-2">
              <span style={{ width: '100px' }}>영어</span>
              <CFormTextarea
                style={{ resize: 'none' }}
                placeholder="내용을 입력하세요"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={productGuide.en}
                onChange={(e) => {
                  setProductGuide({
                    ...productGuide,
                    en: e.target.value,
                  })
                }}
              />
            </CCol>
            <CCol className="d-flex flex-row align-items-center my-2">
              <span style={{ width: '100px' }}>중국어</span>
              <CFormTextarea
                style={{ resize: 'none' }}
                placeholder="내용을 입력하세요"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={productGuide.ch}
                onChange={(e) => {
                  setProductGuide({
                    ...productGuide,
                    ch: e.target.value,
                  })
                }}
              />
            </CCol>
            <CCol className="d-flex flex-row align-items-center my-2">
              <span style={{ width: '100px' }}>일본어</span>
              <CFormTextarea
                placeholder="내용을 입력하세요"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ resize: 'none' }}
                value={productGuide.jp}
                onChange={(e) => {
                  setProductGuide({
                    ...productGuide,
                    jp: e.target.value,
                  })
                }}
              />
            </CCol>
            <CCol className="d-flex flex-row align-items-center my-2">
              <span style={{ width: '100px' }}>스페인어</span>
              <CFormTextarea
                placeholder="내용을 입력하세요"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ resize: 'none' }}
                value={productGuide.es}
                onChange={(e) => {
                  setProductGuide({
                    ...productGuide,
                    es: e.target.value,
                  })
                }}
              />
            </CCol>
          </div>
        </div>
        <div className="form-product-add-aside">
          <div className="form-product-add-aside__description">
            <div className="mb-3 form-body-title">
              <span>개설 페이지 가이드 ( 서포트 개설 페이지 하단 )</span>
            </div>
            <CCol className="d-flex flex-row align-items-center">
              <span style={{ width: '100px' }}>한국어</span>
              <CFormTextarea
                style={{ resize: 'none' }}
                placeholder="내용을 입력하세요"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={pageGuide.ko}
                onChange={(e) => {
                  setPageGuide({
                    ...pageGuide,
                    ko: e.target.value,
                  })
                }}
              />
            </CCol>
            <CCol className="d-flex flex-row align-items-center my-2">
              <span style={{ width: '100px' }}>영어</span>
              <CFormTextarea
                style={{ resize: 'none' }}
                placeholder="내용을 입력하세요"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={pageGuide.en}
                onChange={(e) => {
                  setPageGuide({
                    ...pageGuide,
                    en: e.target.value,
                  })
                }}
              />
            </CCol>
            <CCol className="d-flex flex-row align-items-center">
              <span style={{ width: '100px' }}>중국어</span>
              <CFormTextarea
                style={{ resize: 'none' }}
                placeholder="내용을 입력하세요"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={pageGuide.ch}
                onChange={(e) => {
                  setPageGuide({
                    ...pageGuide,
                    ch: e.target.value,
                  })
                }}
              />
            </CCol>
            <CCol className="d-flex flex-row align-items-center">
              <span style={{ width: '100px' }}>일본어</span>
              <CFormTextarea
                style={{ resize: 'none' }}
                placeholder="내용을 입력하세요"
                className="my-2"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={pageGuide.jp}
                onChange={(e) => {
                  setPageGuide({
                    ...pageGuide,
                    jp: e.target.value,
                  })
                }}
              />
            </CCol>
            <CCol className="d-flex flex-row  align-items-center">
              <span style={{ width: '100px' }}>스페인어</span>
              <CFormTextarea
                style={{ resize: 'none' }}
                placeholder="내용을 입력하세요"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={pageGuide.es}
                onChange={(e) => {
                  setPageGuide({
                    ...pageGuide,
                    es: e.target.value,
                  })
                }}
              />
            </CCol>
          </div>
          <div className="form-product-add-aside__description">
            <div className="mb-3 form-body-title">
              <span>목표 포인트 ( ex_84000 )</span>
            </div>
            <div className="form-product-add-aside__description__column2">
              <span style={{ width: '90px' }}>스타포인트</span>
              <CFormInput
                placeholder="내용을 입력하세요"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={targetPoint}
                onChange={(e) => setTargetPoint(e.target.value)}
              />
              <span style={{ marginLeft: '10px' }}>P</span>
            </div>
          </div>
          <div className="form-product-add-aside__description">
            <div className="mb-3 form-body-title">
              <span>상품 이미지 ( 권장 64 x 64 JPEG )</span>
            </div>
            <div className="form-product-add__description__column2">
              <div style={{ width: '70%' }}>
                <FileBtn
                  name="메인"
                  title="fanSupport"
                  fileData={(data) => {
                    setImg(data)
                  }}
                  accept="image/*"
                  id="main"
                  imageUrl={img}
                />
              </div>
            </div>
          </div>
          <div className="form-product-add-aside__select">
            <div className="mb-3 form-body-title mt-5">
              <span>상품구분</span>
            </div>
            <CCol sm={8}>
              <CFormSelect
                aria-label="Large select example"
                className="select-group__select text-center"
                style={{ width: '130px' }}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value={1}>정상</option>
                <option value={0}>비활성</option>
                <option value={-1}>삭제</option>
              </CFormSelect>
            </CCol>
          </div>
        </div>
      </CModalBody>
      <CModalFooter className="form-footer">
        <CButton
          color="success"
          className="form-footer__btn__ml form-footer__btn text-white px-5"
          onClick={() => setIsModal(true)}
        >
          저장
        </CButton>
        <CButton color="light" className="form-footer__btn" onClick={() => onClickClose()}>
          닫기
        </CButton>
      </CModalFooter>
      {isModal && (
        <CheckPopup
          onClickClose={() => setIsModal(false)}
          bodyContent={'상품을 등록 하시겠습니까?'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup onClickClose={() => closeModalEvent()} bodyContent={'등록을 완료했습니다.'} />
      )}
    </CModal>
  )
}

ProductAdd.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onChekced: PropTypes.func,
}
