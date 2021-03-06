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
      alert('?????? ????????? ?????????.')
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
              <span className="me-4">????????????</span>
              <CCol>
                <CFormSelect
                  onChange={(e) => {
                    setType(e.target.value)
                  }}
                  className="search-bar__select"
                >
                  <option value={1}>????????? ??????</option>
                  <option value={2}>????????? ??????</option>
                  <option value={3}>????????????</option>
                  <option value={4}>?????? ??????</option>
                </CFormSelect>
              </CCol>
            </CCol>
            {isType == 4 && (
              <CCol className="d-flex flex-column my-4">
                <div className="d-flex flex-row my-1">
                  <label style={{ width: '90px' }}>????????????</label>
                  <CFormInput
                    defaultValue={isTitleBanner.ko}
                    onChange={(e) => {
                      setTitleBanner({ ...isTitleBanner, ko: e.target.value })
                    }}
                    placeholder="????????? ??????????????????"
                  />
                </div>
                <div className="d-flex flex-row my-1">
                  <label style={{ width: '90px' }}>?????????</label>
                  <CFormInput
                    defaultValue={isTitleBanner.en}
                    onChange={(e) => {
                      setTitleBanner({ ...isTitleBanner, en: e.target.value })
                    }}
                    placeholder="????????? ??????????????????"
                  />
                </div>
                <div className="d-flex flex-row my-1">
                  <label style={{ width: '90px' }}>????????????</label>
                  <CFormInput
                    defaultValue={isTitleBanner.ch}
                    onChange={(e) => {
                      setTitleBanner({ ...isTitleBanner, ch: e.target.value })
                    }}
                    placeholder="????????? ??????????????????"
                  />
                </div>
                <div className="d-flex flex-row my-1">
                  <label style={{ width: '90px' }}>????????????</label>
                  <CFormInput
                    defaultValue={isTitleBanner.jp}
                    onChange={(e) => {
                      setTitleBanner({ ...isTitleBanner, jp: e.target.value })
                    }}
                    placeholder="????????? ??????????????????"
                  />
                </div>
                <div className="d-flex flex-row my-1">
                  <label style={{ width: '90px' }}>???????????????</label>
                  <CFormInput
                    defaultValue={isTitleBanner.es}
                    onChange={(e) => {
                      setTitleBanner({ ...isTitleBanner, es: e.target.value })
                    }}
                    placeholder="????????? ??????????????????"
                  />
                </div>
              </CCol>
            )}
            <CCol className="d-flex flex-row mt-4">
              <span className="me-4">????????????</span>
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
                          <option value={1}>??????1????????????</option>
                          <option value={2}>??????2????????????</option>
                          <option value={3}>??????????????????</option>
                          <option value={4}>???????????????</option>
                          <option value={5}>??????????????????</option>
                          <option value={6}>?????????</option>
                          <option value={7}>?????????????????? ?????????</option>
                          <option value={8}>?????????????????? ????????????</option>
                        </CFormSelect>
                      </CTableHeaderCell>
                      <CTableHeaderCell className="text-center border-1" scope="col">
                        <span>?????????</span>
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
                            placeholder="ex)000???"
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
                <span>???????????????</span>
                <br></br>
                <span>*?????????????????? ?????????</span>
              </span>

              <CCol>
                <CFormInput
                  onChange={(e) => {
                    setDescr(e.target.value.trim())
                  }}
                  placeholder="????????? ??????????????????"
                />
              </CCol>
            </CCol>
            <CCol className="d-flex flex-row mt-4">
              <span style={{ width: '100px' }}>???????????????</span>
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
                  placeholder="ex) CID, 1??? ???????????? ????????? (??????)??? ????????????"
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
                ?????????
              </CButton>
              <CButton
                onClick={() => {
                  setIsCreate(true)
                }}
                style={{ color: 'white' }}
                color="info"
                className="form-footer__btn__ml form-footer__btn px-5"
              >
                ???????????????
              </CButton>
            </CCol>
          </CCol>
        </CRow>
        {isCreate && (
          <CheckPopup
            onClickClose={() => setIsCreate(false)}
            bodyContent={'???????????? ?????????????????????????'}
            onCheked={(value) => modalOkEvent(value)}
          />
        )}
        {isOkCheck && (
          <NormalPopup
            onClickClose={() => closeModalEvent()}
            bodyContent={'????????? ?????????????????????.'}
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
