import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CButton, CCol, CFormInput, CFormSelect, CModal, CModalBody, CRow } from '@coreui/react'
import axios from 'axios'
import { headerConfig } from '../../../../../static/axiosConfig'
import { statusCatch } from '../../../../../static/axiosCatch'
import { CheckPopup } from '../../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../../components/publicPopup/NormalPopup'

const CreateCash = ({ onClickClose, onCloseOkEvent }) => {
  const [isCreate, setIsCreate] = useState(false) // delete check Modal
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isPlatform, setPlatform] = useState()
  const [isPid, setPid] = useState('')
  const [isCost, setCost] = useState()
  const [isTitleProduct, setTitleProduct] = useState('')
  const [isTemplate, setTemplate] = useState('')
  const [isPayView, setPayView] = useState()
  const [isHeart1, setHeart1] = useState()
  const [isHeart2, setHeart2] = useState()
  const [isStarPoint, setStarPoint] = useState()
  const [isCashPoint, setCashPoint] = useState()
  const [isGoldPoint, setGoldPoint] = useState()
  const [isStatus, setStatus] = useState(1)

  const create = async () => {
    const data = {
      pid: isPid,
      platform: isPlatform,
      cost: isCost,
      title_product: isTitleProduct,
      pay_view: isPayView,
      template: isTemplate,
      heart_1: isHeart1,
      heart_2: isHeart2,
      star_point: isStarPoint,
      status: isStatus,
    }

    const res = await axios.post(`/api/cash`, data, headerConfig).catch((err) => statusCatch(err))

    if (!res.data.success) {
      alert('등록에 실패했습니다.')
      return
    } else {
      setIsOkCheck(true)
      return
    }
  }

  // modify checked
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
    <CModal visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol>
            <CCol className="d-flex flex-row">
              <span className="me-4" style={{ width: '160px' }}>
                플랫폼
              </span>
              <CCol>
                <CFormSelect
                  value={isPlatform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="search-bar__select"
                >
                  <option value={1}>Android</option>
                  <option value={2}>IOS​</option>
                </CFormSelect>
              </CCol>
            </CCol>
            <CCol className="my-4">
              <div className="my-2 mb-4">캐시 포인트 프로덕트​</div>
              <CCol className="d-flex flex-column">
                <div className="d-flex flex-row ">
                  <span style={{ width: '250px' }}>PID​</span>
                  <CFormInput
                    onChange={(e) => setPid(e.target.value)}
                    defaultValue={isPid}
                    placeholder="Ex) item_cash_000​"
                  />
                </div>
                <div className="d-flex flex-row my-2">
                  <span style={{ width: '250px' }}>가격​</span>
                  <CFormInput
                    onChange={(e) => setCost(e.target.value)}
                    defaultValue={isCost}
                    placeholder="Ex) 0000​"
                  />
                </div>
                <div className="d-flex flex-row">
                  <span style={{ width: '250px' }}>노출이름​</span>
                  <CFormInput
                    onChange={(e) => setTitleProduct(e.target.value)}
                    defaultValue={isTitleProduct}
                    placeholder="Ex) 000 PF"
                  />
                </div>
                <div className="d-flex flex-row my-2">
                  <span style={{ width: '250px' }}>노출 지급수​</span>
                  <CFormInput
                    onChange={(e) => setPayView(e.target.value)}
                    defaultValue={isPayView}
                    placeholder="Ex) 000 F
​"
                  />
                </div>
                <div className="d-flex flex-row">
                  <span style={{ width: '250px' }}>노출 보너스​</span>
                  <CFormInput
                    onChange={(e) => setTemplate(e.target.value)}
                    defaultValue={isTemplate}
                    placeholder="Ex) {C} 00 F {H1} 00 F
​"
                  />
                </div>
                <div className="d-flex flex-row my-2">
                  <span style={{ width: '250px' }}>실지급 메인 캐시​</span>
                  <CFormInput
                    onChange={(e) => setGoldPoint(e.target.value)}
                    defaultValue={isGoldPoint}
                    placeholder="Ex) {C} 0 F"
                  />
                </div>
                <div className="d-flex flex-row">
                  <span style={{ width: '250px' }}>실지급 보너스 캐시​</span>
                  <CFormInput
                    onChange={(e) => setCashPoint(e.target.value)}
                    defaultValue={isCashPoint}
                    placeholder="Ex) {C} 0 F"
                  />
                </div>
                <div className="d-flex flex-row my-2">
                  <span style={{ width: '250px' }}>실지급 보너스 하트1​</span>
                  <CFormInput
                    onChange={(e) => setHeart1(e.target.value)}
                    defaultValue={isHeart1}
                    placeholder="Ex) {H1} 0 F"
                  />
                </div>
                <div className="d-flex flex-row">
                  <span style={{ width: '250px' }}>실지급 보너스 하트2​​</span>
                  <CFormInput
                    onChange={(e) => setHeart2(e.target.value)}
                    defaultValue={isHeart2}
                    placeholder="Ex) {H2} 0 F"
                  />
                </div>
                <div className="d-flex flex-row mt-2">
                  <span style={{ width: '250px' }}>실지급 보너스 스타​​</span>
                  <CFormInput
                    onChange={(e) => setStarPoint(e.target.value)}
                    defaultValue={isStarPoint}
                    placeholder="Ex) {S} 0 F"
                  />
                </div>
              </CCol>
            </CCol>
            <CCol sm={4} className="d-flex flex-column justify-content-center align-items-start">
              <span>등록상태​</span>
              <CCol sm={12}>
                <CFormSelect
                  size="lg"
                  value={isStatus}
                  onChange={(e) => setStatus(e.target.value)}
                  className="search-bar__select text-center w-100"
                >
                  <option value={1}>정상​</option>
                  <option value={0}>비활성</option>
                  <option value={-1}>삭제​</option>
                </CFormSelect>
              </CCol>
            </CCol>
            <CCol className="float-end">
              <CButton
                style={{ color: 'white' }}
                color="info"
                className="form-footer__btn__ml form-footer__btn px-5"
                onClick={() => setIsCreate(true)}
              >
                저장​
              </CButton>
              <CButton
                onClick={() => onClickClose()}
                style={{ color: 'black' }}
                color="light"
                className="form-footer__btn px-3"
              >
                닫기​
              </CButton>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      {isCreate && (
        <CheckPopup
          onClickClose={() => setIsCreate(false)}
          bodyContent={'해당 내용으로 등록하시겠습니까?'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'정보가 성공적으로 수정되었습니다!'}
        />
      )}
    </CModal>
  )
}
CreateCash.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onCloseOkEvent: PropTypes.func,
}
export default CreateCash
