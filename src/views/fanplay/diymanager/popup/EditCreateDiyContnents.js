import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCol,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
} from '@coreui/react'
import uuid from 'react-uuid'
import { FileBtn } from 'src/components/FileBtn'
import { CheckPopup } from 'src/components/publicPopup/CheckPopup'
import { NormalPopup } from 'src/components/publicPopup/NormalPopup'
import FileApi from 'src/util/FileApi'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'
import axios from 'axios'

const EditCreateDiyContents = ({ onClickClose, onCloseOkEvent }) => {
  const [isModal, setIsModal] = useState(false) // delete check Modal
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [type, setType] = useState(1)
  const [contentType, setContentType] = useState(1)
  const [priority, setPriority] = useState(0)
  const [description, setDescription] = useState('')
  const [starPoint, setStarPoint] = useState('')
  const [useDay, setUseDay] = useState('')
  const [status, setStatus] = useState('1')
  const [mainImg, setMainImg] = useState('')
  const [subImg, setsubImg] = useState([
    {
      img: '',
      id: uuid(),
    },
    {
      img: '',
      id: uuid(),
    },
    {
      img: '',
      id: uuid(),
    },
    {
      img: '',
      id: uuid(),
    },
  ])
  const [imgErrorMessage1, setImgErrorMessage1] = useState('')
  const [imgErrorMessage2, setImgErrorMessage2] = useState('')
  const [imgErrorMessage3, setImgErrorMessage3] = useState('')

  // sub img add bt event
  const addsubImg = () => {
    if (subImg.length < 32) {
      if (subImg.length + 4 > 32) {
        const count = 32 - subImg.length
        for (let i = 0; i < count; i++) {
          subImg.push({
            img: '',
            id: uuid(),
          })
        }
        setsubImg([...subImg])
      } else {
        setsubImg([
          ...subImg,
          {
            img: '',
            id: uuid(),
          },
          {
            img: '',
            id: uuid(),
          },
          {
            img: '',
            id: uuid(),
          },
          {
            img: '',
            id: uuid(),
          },
        ])
      }
    }
  }
  const warningImg = async () => {
    if (
      subImg[0].img === '' &&
      subImg[1].img === '' &&
      subImg[2].img === '' &&
      subImg[3].img === ''
    ) {
      setImgErrorMessage3('???????????? ????????? ?????????.')
      return
    } else {
      setIsModal(true)
    }
  }
  // create
  const create = async () => {
    setImgErrorMessage1('')
    setImgErrorMessage2('')
    if (mainImg === '') {
      setImgErrorMessage1('???????????? ????????? ?????????.')
      return
    }

    if (subImg[0].img === '') {
      setImgErrorMessage2('???????????? ????????? ?????????.')
      return
    }

    let mainImage = ''
    if (mainImg !== '') {
      mainImage = await FileApi('fanDiy', mainImg)
    }
    let subImage = []
    for (let i = 0; i < subImg.length; i++) {
      if (subImg[i].img !== '') {
        subImage.push(await FileApi('fanDiy', subImg[i].img))
      }
    }

    const imgData = []
    if (mainImage !== '') {
      imgData.push({
        url: mainImage.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
      })
    } else {
      imgData.push({ url: '' })
    }
    if (subImage.length > 0) {
      subImage.map((value) => {
        imgData.push({
          url: value.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        })
      })
    }

    const data = {
      type,
      priority,
      body_content: description,
      period_use_day: parseInt(useDay),
      status,
      img_content: imgData,
      cost_content: starPoint === '' ? null : parseInt(starPoint),
    }

    const res = await axios
      .post(`/api/fan/diy`, data, headerConfig)
      .catch((err) => statusCatch(err))

    if (!res.data.success) {
      alert('????????? ??????????????????.')
    } else {
      setIsOkCheck(true)
    }
  }

  // create checked
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
    onCloseOkEvent()
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody>
        <CRow>
          <CCol sm={6}>
            <CCol className="mb-5">
              <span className="my-2">????????? ??????</span>
              <CCol sm={4} className="mt-3">
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="mr-3 search-bar__select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value={1}>?????????</option>
                  <option value={2}>????????????</option>
                </CFormSelect>
              </CCol>
            </CCol>
            <CCol className="mb-5">
              <div className="my-2">????????? ?????????</div>
              <CCol sm={4} className="mt-3">
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="mr-3 search-bar__select"
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                >
                  <option value={1}>?????????</option>
                  <option value={2}>?????????</option>
                </CFormSelect>
              </CCol>
            </CCol>
            <CCol className="my-4 mb-5">
              <div className="my-2">
                ????????????{' '}
                <span className="text-danger" style={{ fontSize: '13px' }}>
                  ??? ???????????? ??????????????? ?????? ex_0??? ?????? ???????????? ?????????
                </span>
              </div>

              <CCol sm={4} className="mt-3">
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="search-bar__select mt-3"
                  style={{ width: '80px' }}
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                </CFormSelect>
              </CCol>
            </CCol>
            <CCol className="d-flex flex-row my-4 mb-5">
              <label style={{ width: '140px' }}>????????? ??????</label>
              <CFormTextarea
                placeholder="????????? ?????????????????? (ex_?????? ????????? ????????? ??????1)"
                style={{ resize: 'none' }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </CCol>
            {/*Input P*/}
            {contentType === 2 ||
              (contentType === '2' && (
                <>
                  <CCol className="mb-5">
                    <div className="mb-3">?????? ?????????</div>
                    <CInputGroup>
                      <label className="me-2">?????????????????????</label>
                      <CFormInput
                        type="input"
                        value={starPoint}
                        onChange={(e) => setStarPoint(e.target.value)}
                      />
                      <span className="ms-2">P??????</span>
                    </CInputGroup>
                  </CCol>
                  {/*Input ???*/}
                  <CCol className="my-4">
                    <span>???????????? (?????? ??? ?????? ?????? ??????)??????</span>
                    <CInputGroup className="mt-3">
                      <CFormInput
                        type="input"
                        className="ms-4"
                        value={useDay}
                        onChange={(e) => setUseDay(e.target.value)}
                      />
                      <span className="ms-2">???</span>
                    </CInputGroup>
                  </CCol>
                </>
              ))}
          </CCol>
          {/*Second col*/}
          <CCol sm={6}>
            <CCol>
              <div className="me-4 mb-3">????????? ????????? (?????? : 30 X 36 JPEG)???</div>
              <div className="mb-3">
                <FileBtn
                  name="??????"
                  title="fanDiy"
                  fileData={(data) => {
                    setMainImg(data)
                  }}
                  accept="image/*"
                  id="mainImage"
                  imageUrl=""
                />
              </div>
              <span style={{ color: 'red' }}>{imgErrorMessage1}</span>
            </CCol>
            {/*9*/}
            <CCol className="d-flex flex-column w-100 my-4">
              <span className="border border-bottom-1" />
            </CCol>
            <CCol>
              <div className="d-flex flex-row mb-3">
                <div className="me-4 mb-3">?????? ????????? (?????? : 346 X 468 JPEG)???</div>
                <button className="btn btn-warning" onClick={() => addsubImg()}>
                  +
                </button>
              </div>
              <span style={{ color: 'red' }}>{imgErrorMessage2}</span>
              <div>
                {subImg.map((value, index) => {
                  return (
                    <div key={value.id} id={index}>
                      <button
                        style={{
                          border: 'none',
                          backgroundColor: 'white',
                          color: 'red',
                          marginTop: '3px',
                        }}
                        onClick={() => {
                          setsubImg(subImg.filter((img, i) => img.id !== value.id))
                        }}
                      >
                        x
                      </button>
                      <FileBtn
                        name="??????"
                        title="fanDiy"
                        fileData={(data) => {
                          subImg[index].img = data
                          setsubImg([...subImg])
                        }}
                        accept="image/*"
                        id={'sub' + index}
                        imageUrl=""
                      />
                    </div>
                  )
                })}
              </div>
            </CCol>
            {/*13*/}
            <CCol>
              <div className="my-2">????????? ?????????</div>
              <CCol sm={4}>
                <CFormSelect
                  size="lg"
                  aria-label="Large select example"
                  className="mr-3 search-bar__select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="1">?????????</option>
                  <option value="0">????????????</option>
                  <option value="-1">?????????</option>
                </CFormSelect>
              </CCol>
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="form-footer">
        <CButton
          style={{ color: 'white' }}
          color="primary"
          className="form-footer__bt__ml form-footer__bt"
          onClick={() => warningImg()}
        >
          ?????????
        </CButton>
        <CButton
          onClick={() => onClickClose()}
          style={{ color: 'black' }}
          color="light"
          className="form-footer__bt"
        >
          ??????
        </CButton>
      </CModalFooter>
      {isModal && (
        <CheckPopup
          onClickClose={() => setIsModal(false)}
          bodyContent={'???????????? ?????? ???????????????????'}
          title={'??????'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup
          onClickClose={() => closeModalEvent()}
          bodyContent={'????????? ?????????????????????.'}
        />
      )}
      {imgErrorMessage3 && (
        <NormalPopup
          onClickClose={() => setImgErrorMessage3(false)}
          bodyContent={'???????????? ????????? ??? ????????????.'}
        />
      )}
    </CModal>
  )
}
EditCreateDiyContents.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onCloseOkEvent: PropTypes.func,
}

export default EditCreateDiyContents
