import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCol,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CModal,
  CModalBody,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import axios from 'axios'
import { headerConfig } from '../../../../../static/axiosConfig'
import { statusCatch } from '../../../../../static/axiosCatch'
import { CheckPopup } from '../../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../../components/publicPopup/NormalPopup'
import './styles/styles.css'

const GiveSmallPoint = ({ onClickClose, onCloseOkEvent }) => {
  const [isCreate, setIsCreate] = useState(false) // Create checked
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isType, setType] = useState(1)
  const [descr, setDescr] = useState('')
  const [typePoint, setTypePoint] = useState(1)
  const [userIdArray, setUserIdArray] = useState([])
  const [count, setCount] = useState(1)
  const [isTitleBanner, setTitleBanner] = useState({
    ch: '',
    en: '',
    es: '',
    jp: '',
    ko: '',
  })
  const [tags, setTags] = useState([])
  let findDuplicates = (arr) =>
    arr.filter((item, index) => item.length > 24 && arr.indexOf(item) == index)
  const addTag = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value.length > 23 && findDuplicates(tags)) {
        setTags([...tags, e.target.value])
        e.target.value = ''
      }
    } else if (e.target.value.length > 23 && findDuplicates(tags)) {
      setTags([...tags, e.target.value])
      e.target.value = ''
    }
  }
  const removeTag = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag)
    setTags(newTags)
  }
  const create = async () => {
    const data = {
      type: isType,
      type_point: typePoint,
      count: isType == 3 ? count * -1 : count,
      descr: descr,
      descr_admin: descr,
      // arr_user_cid: userIdArray,
      arr_user_cid: tags,
    }
    const res = await axios
      .post(`/api/point/give`, data, headerConfig)
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
      setIsCreate(false)
      create()
    } else {
      setIsCreate(false)
    }
  }
  let keyDown
  function handleKeyDown(e) {
    keyDown = e.key
  }
  return (
    <CModal visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol sm={12}>
            <CCol className="d-flex flex-row">
              <span className="me-4">지급타입</span>
              <CCol>
                <CFormSelect
                  onChange={(e) => {
                    setType(e.target.value)
                  }}
                  className="search-bar__select"
                >
                  <option value={1}>관리자 지급</option>
                  <option value={2}>이벤트 지급</option>
                  <option value={3}>환불회수</option>
                  <option value={4}>직접 입력</option>
                </CFormSelect>
              </CCol>
            </CCol>
            {isType == 4 && (
              <CCol className="d-flex flex-column my-4">
                <div className="d-flex flex-row my-1">
                  <label style={{ width: '90px' }}>한국어​</label>
                  <CFormInput
                    defaultValue={isTitleBanner.ko}
                    onChange={(e) => {
                      setTitleBanner({ ...isTitleBanner, ko: e.target.value })
                    }}
                    placeholder="내용을 입력하세요​"
                  />
                </div>
                <div className="d-flex flex-row my-1">
                  <label style={{ width: '90px' }}>영어​</label>
                  <CFormInput
                    defaultValue={isTitleBanner.en}
                    onChange={(e) => {
                      setTitleBanner({ ...isTitleBanner, en: e.target.value })
                    }}
                    placeholder="내용을 입력하세요​"
                  />
                </div>
                <div className="d-flex flex-row my-1">
                  <label style={{ width: '90px' }}>중국어​</label>
                  <CFormInput
                    defaultValue={isTitleBanner.ch}
                    onChange={(e) => {
                      setTitleBanner({ ...isTitleBanner, ch: e.target.value })
                    }}
                    placeholder="내용을 입력하세요​"
                  />
                </div>
                <div className="d-flex flex-row my-1">
                  <label style={{ width: '90px' }}>일본어​</label>
                  <CFormInput
                    defaultValue={isTitleBanner.jp}
                    onChange={(e) => {
                      setTitleBanner({ ...isTitleBanner, jp: e.target.value })
                    }}
                    placeholder="내용을 입력하세요​"
                  />
                </div>
                <div className="d-flex flex-row my-1">
                  <label style={{ width: '90px' }}>스페인어​</label>
                  <CFormInput
                    defaultValue={isTitleBanner.es}
                    onChange={(e) => {
                      setTitleBanner({ ...isTitleBanner, es: e.target.value })
                    }}
                    placeholder="내용을 입력하세요​"
                  />
                </div>
              </CCol>
            )}
            <CCol className="d-flex flex-row mt-4">
              <span className="me-4">지급내용</span>
              <CCol>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell className="text-center border-0" scope="col">
                        <CFormSelect
                          onChange={(e) => {
                            setTypePoint(e.target.value)
                          }}
                          className="search-bar__select text-center w-100"
                        >
                          <option value={1}>하트1포인트​</option>
                          <option value={2}>하트2포인트​</option>
                          <option value={3}>스타포인트​</option>
                          <option value={4}>팬픽포인트</option>
                          <option value={5}>캐시포인트​</option>
                          <option value={6}>경험치</option>
                          <option value={7}>무료랜덤박스 이용권</option>
                          <option value={8}>유료랜덤박스 이용횟수</option>
                        </CFormSelect>
                      </CTableHeaderCell>
                      <CTableHeaderCell className="text-center border-1" scope="col">
                        <span>지급수</span>
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  {/*Table body*/}
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell scope="row" className="text-break border-0">
                        <div />
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="border-0 text-break">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <CFormInput
                            onChange={(e) => {
                              setCount(parseInt(e.target.value.trim()))
                            }}
                            placeholder="ex)000​"
                            className="text-end"
                            type="number"
                          />
                        </div>
                      </CTableDataCell>
                      <CTableDataCell scope="row" className="text-break border-0">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                          <span>p</span>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CCol>
            </CCol>
            <CCol className="d-flex flex-row">
              <span style={{ width: '100px' }}>
                <span>지급사유​</span>
                <br></br>
                <span>*어드민페이지 확인용</span>
              </span>

              <CCol>
                <CFormInput
                  onChange={(e) => {
                    setDescr(e.target.value.trim())
                  }}
                  placeholder="내용을 입력하세요​"
                />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-row mt-4">
              <span style={{ width: '100px' }}>지급대상자</span>
              <CCol className="tag-container">
                {tags
                  // if the entered value is not less than 24 characters and does not match any other entered cid
                  .filter((item, index) => item.length > 23 && tags.indexOf(item) == index)
                  .map((tag, index) => {
                    console.log(tag.length)
                    return (
                      <div key={index} className="tag">
                        {tag} <span onClick={() => removeTag(tag)}>x</span>
                      </div>
                    )
                  })}
                <input
                  className="tag-container-input"
                  style={{ resize: 'none' }}
                  onKeyDown={(e) => addTag(e)}
                  placeholder="ex) CID, 1명 이상이면 줄바꿈 (엔터)로 구분​​"
                />
              </CCol>
            </CCol>
            <CCol className="float-end mt-4">
              <CButton
                onClick={() => onClickClose()}
                style={{ color: 'black' }}
                color="light"
                className="form-footer__btn px-3 me-1"
              >
                닫기​
              </CButton>
              <CButton
                onClick={() => {
                  setIsCreate(true)
                }}
                style={{ color: 'white' }}
                color="info"
                className="form-footer__btn__ml form-footer__btn px-5"
              >
                지급하기​
              </CButton>
            </CCol>
          </CCol>
        </CRow>
        {isCreate && (
          <CheckPopup
            onClickClose={() => setIsCreate(false)}
            bodyContent={'포인트를 지급하시겠습니까?'}
            onCheked={(value) => modalOkEvent(value)}
          />
        )}
        {isOkCheck && (
          <NormalPopup
            onClickClose={() => closeModalEvent()}
            bodyContent={'등록이 완료되었습니다.'}
          />
        )}
      </CModalBody>
    </CModal>
  )
}
GiveSmallPoint.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onCloseOkEvent: PropTypes.func,
}
export default GiveSmallPoint
