import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCardBody,
  CCol,
  CFormInput,
  CFormSelect,
  CImage,
  CInputGroup,
  CModal,
  CModalBody,
  CModalFooter,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTabPane,
} from '@coreui/react'
import { FileBtn } from 'src/components/FileBtn'
import ArtistContents from './ArtistContents'
import CopyContents from './CopyContents'
import axios from 'axios'
import { headerConfig } from '../../../../static/axiosConfig'
import { statusCatch } from '../../../../static/axiosCatch'
import moment from 'moment'
import FileApi from '../../../../util/FileApi'
import { CheckPopup } from '../../../../components/publicPopup/CheckPopup'
import { NormalPopup } from '../../../../components/publicPopup/NormalPopup'
import CreateArtistContents from './CreateArtistContent'
import { ImgBig } from '../../../../components/publicPopup/ImgBig'

const DetailVote = ({ onClickClose, onCloseOkEvent, onId }) => {
  const [isDelArtist, setIsDelArtist] = useState({
    use: false,
    artistid: '',
    rankId: '',
  }) // delete check Modal
  const [isAddArtist, setAddArtist] = useState({
    use: false,
    rankId: '',
  })
  const [isArtistContent, setArtistContent] = useState({ use: '', artistid: '', rankId: '' })
  const [isCopyContents, setCopyContents] = useState(false)
  const [isOkCheck, setIsOkCheck] = useState(false) // ok Modal
  const [isOkCheck2, setIsOkCheck2] = useState(false) // ok Modal
  const [isDetailVote, setIsDetailVote] = useState(false) // ok Modal
  const [activeKey, setActiveKey] = useState(1)
  const [isType, setType] = useState()
  const [isPriority, setPriority] = useState()
  const [isImg, setIsImg] = useState({
    use: false,
    img: '',
  })
  const [startDay, setStartDay] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
  })
  const [resultDay, setResultDay] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
  })
  const [endDay, setEndDay] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
  })
  const [imgs, setImgs] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [isNameVote, setNameVote] = useState({
    ko: '',
    en: '',
    ch: '',
    jp: '',
    es: '',
  })
  const [isStatus, setStatus] = useState(1)
  // Detail Content
  const [page, setPage] = useState(1)
  const [listTab, setListTab] = useState()
  const [pages, setPages] = useState(1)
  const [newImgDiv, setNewImgDiv] = useState([])
  const [imgKo, setImgKo] = useState([])
  const [imgEn, setImgEn] = useState([])
  const [imgCh, setImgCh] = useState([])
  const [imgEs, setImgEs] = useState([])
  const [imgJp, setImgJp] = useState([])
  const [role, setRole] = useState('')
  const one = 1
  let tableTitle
  {
    role !== one
      ? (tableTitle = [
          { label: 'No' },
          { label: '사진' },
          { label: '이름​' },
          { label: '코드​' },
          { label: '그룹코드​' },
          { label: '수정​' },
        ])
      : (tableTitle = [
          { label: 'No' },
          { label: '사진' },
          { label: '이름​' },
          { label: '코드​' },
          { label: '그룹코드​' },
        ])
  }

  useEffect(() => {
    if (activeKey === 1) {
      getList()
    } else if (activeKey === 2) {
      getArtist()
    }
  }, [activeKey])

  // Talk Data communication
  const getList = async () => {
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
    const res = await axios
      .get(`/api/rank?id=${onId}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    // Start day
    setStartDay({
      year: moment(res.data.value.started_at).format('YYYY'),
      month: moment(res.data.value.started_at).format('MM'),
      day: moment(res.data.value.started_at).format('DD'),
      hour: moment(res.data.value.started_at).format('HH'),
      minute: moment(res.data.value.started_at).format('mm'),
    })
    // Result day
    setResultDay({
      year: moment(res.data.value.result_at).format('YYYY'),
      month: moment(res.data.value.result_at).format('MM'),
      day: moment(res.data.value.result_at).format('DD'),
      hour: moment(res.data.value.result_at).format('HH'),
      minute: moment(res.data.value.result_at).format('mm'),
    })
    // End day
    setEndDay({
      year: moment(res.data.value.ended_at).format('YYYY'),
      month: moment(res.data.value.ended_at).format('MM'),
      day: moment(res.data.value.ended_at).format('DD'),
      hour: moment(res.data.value.ended_at).format('HH'),
      minute: moment(res.data.value.ended_at).format('mm'),
    })
    if (res.data.value.name_vote !== null) {
      setNameVote({
        ko: res.data.value.name_vote.ko,
        en: res.data.value.name_vote.en,
        ch: res.data.value.name_vote.ch,
        jp: res.data.value.name_vote.jp,
        es: res.data.value.name_vote.es,
      })
    }
    setPriority(res.data.value.priority)

    setImgs({
      ko:
        res.data.value.event_banner !== ''
          ? res.data.value.event_banner.ko
          : res.data.value.img_banner.ko,
      en:
        res.data.value.event_banner !== ''
          ? res.data.value.event_banner.en
          : res.data.value.img_banner.en,
      ch:
        res.data.value.event_banner !== ''
          ? res.data.value.event_banner.ch
          : res.data.value.img_banner.ch,
      jp:
        res.data.value.event_banner !== ''
          ? res.data.value.event_banner.jp
          : res.data.value.img_banner.jp,
      es:
        res.data.value.event_banner !== ''
          ? res.data.value.event_banner.es
          : res.data.value.img_banner.es,
    })

    setImgKo(res.data.value.tip.ko === undefined ? [] : res.data.value.tip.ko)
    setImgEn(res.data.value.tip.en === undefined ? [] : res.data.value.tip.en)
    setImgCh(res.data.value.tip.ch === undefined ? [] : res.data.value.tip.ch)
    setImgEs(res.data.value.tip.es === undefined ? [] : res.data.value.tip.es)
    setImgJp(res.data.value.tip.jp === undefined ? [] : res.data.value.tip.jp)
    setStatus(res.data.value.status)
    setType(res.data.value.type)
    console.log(res.data.value)
  }
  const modify = async () => {
    console.log(imgs)
    if (
      startDay.year === '' ||
      startDay.month === '' ||
      startDay.day === '' ||
      startDay.hour === '' ||
      startDay.minute === '' ||
      endDay.year === '' ||
      endDay.month === '' ||
      endDay.day === '' ||
      endDay.hour === '' ||
      endDay.minute === '' ||
      resultDay.hour === '' ||
      resultDay.year === '' ||
      resultDay.month === '' ||
      resultDay.day === '' ||
      resultDay.minute === ''
    ) {
      alert('투표기간을 선택해 주세요')
      return
    }
    if (newImgDiv.length > 0) {
      for (let i = 0; i < newImgDiv.length; i++) {
        newImgDiv[i].remove()
      }
    }

    for (let i = 0; i < imgKo.length; i++) {
      if (imgKo[i].id) {
        delete imgKo[i].id
      }
      if (imgKo[i] instanceof File) {
        const item = await FileApi('policy', imgKo[i])
        const temp = { url: '/' + item.data.value[0].key }
        imgKo[i] = temp
      }
    }

    for (let i = 0; i < imgEn.length; i++) {
      if (imgEn[i].id) {
        delete imgEn[i].id
      }
      if (imgEn[i] instanceof File) {
        const item = await FileApi('policy', imgEn[i])
        const temp = { url: '/' + item.data.value[0].key }
        imgEn[i] = temp
      }
    }

    for (let i = 0; i < imgCh.length; i++) {
      if (imgCh[i].id) {
        delete imgCh[i].id
      }
      if (imgCh[i] instanceof File) {
        const item = await FileApi('policy', imgCh[i])
        const temp = { url: '/' + item.data.value[0].key }
        imgCh[i] = temp
      }
    }

    for (let i = 0; i < imgEs.length; i++) {
      if (imgEs[i].id) {
        delete imgEs[i].id
      }
      if (imgEs[i] instanceof File) {
        const item = await FileApi('policy', imgEs[i])
        const temp = { url: '/' + item.data.value[0].key }
        imgEs[i] = temp
      }
    }

    for (let i = 0; i < imgJp.length; i++) {
      if (imgJp[i].id) {
        delete imgJp[i].id
      }
      if (imgJp[i] instanceof File) {
        const item = await FileApi('policy', imgJp[i])
        const temp = { url: '/' + item.data.value[0].key }
        imgJp[i] = temp
      }
    }

    if (imgs.ko instanceof File) {
      imgs.ko = await FileApi('ranking', imgs.ko)
    }
    if (imgs.en instanceof File) {
      imgs.en = await FileApi('ranking', imgs.en)
    }
    if (imgs.ch instanceof File) {
      imgs.ch = await FileApi('ranking', imgs.ch)
    }
    if (imgs.jp instanceof File) {
      imgs.jp = await FileApi('ranking', imgs.jp)
    }
    if (imgs.es instanceof File) {
      imgs.es = await FileApi('ranking', imgs.es)
    }
    console.log(imgs)
    const data = {
      id: onId,
      type: isType,
      priority: isPriority,
      name_vote: isNameVote,
      started_at: moment(
        startDay.year +
          '-' +
          startDay.month +
          '-' +
          startDay.day +
          ' ' +
          startDay.hour +
          ':' +
          startDay.minute +
          ':00',
      ),
      result_at: moment(
        resultDay.year +
          '-' +
          resultDay.month +
          '-' +
          resultDay.day +
          ' ' +
          resultDay.hour +
          ':' +
          resultDay.minute +
          ':00',
      ),
      ended_at: moment(
        endDay.year +
          '-' +
          endDay.month +
          '-' +
          endDay.day +
          ' ' +
          endDay.hour +
          ':' +
          endDay.minute +
          ':00',
      ),
      img_banner: {
        ko:
          imgs.ko.data === undefined
            ? imgs.ko
            : imgs.ko.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        en:
          imgs.en.data === undefined
            ? imgs.en
            : imgs.en.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        ch:
          imgs.ch.data === undefined
            ? imgs.ch
            : imgs.ch.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        jp:
          imgs.jp.data === undefined
            ? imgs.jp
            : imgs.jp.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
        es:
          imgs.es.data === undefined
            ? imgs.es
            : imgs.es.data.value[0].location.replace(process.env.REACT_APP_IMG, ''),
      },
      tip: {
        ko: imgKo,
        en: imgEn,
        ch: imgCh,
        jp: imgJp,
        es: imgEs,
      },
      status: isStatus,
    }
    const res = await axios.post(`/api/rank`, data, headerConfig).catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }
  const getArtist = async (params) => {
    if (!params) {
      params = {}
    }

    if (params.page === undefined) {
      params.page = page
    }

    const queries = []

    if (params.page > 1) {
      queries.push(`page=${params.page}`)
      queries.push(`limit=${30 * params.page}`)
    } else {
      queries.push(`page=${params.page}`)
      queries.push(`limit=30`)
    }
    queries.push(`status=1`)
    queries.push(`rank_id=${onId}`)
    const queryStr = queries.length > 0 ? `?${queries.join('&')}` : ''
    const res = await axios
      .get(`/api/rank/artist/query${queryStr}`, headerConfig)
      .catch((err) => statusCatch(err))
    if (!res.data.success) return
    setPages(res.data.value.pages ? res.data.value.pages : 1)
    if (params.page > 1) {
      res.data.value.items.map((value) => listTab.push(value))
      setListTab([...listTab])
    } else {
      setListTab(res.data.value.items)
    }
  }
  const modalOkEvent = (value) => {
    if (value) {
      setIsDetailVote(false)
      modify()
    } else {
      setIsDetailVote(false)
    }
  }

  const deleteArtist = async () => {
    const data = {
      rank_id: isDelArtist.rankId,
      artist_id: isDelArtist.artistid,
      status: -1,
    }
    const res = await axios
      .post(`/api/rank/artist`, data, headerConfig)
      .catch((err) => statusCatch(err))
    if (res.data.success) {
      setIsOkCheck2(true)
    } else {
      alert('다시 시도해 주세요.')
    }
  }
  const modalDeleteEvent = (bool) => {
    if (bool) {
      setIsDelArtist(false)
      deleteArtist()
    } else {
      setIsDelArtist(false)
    }
  }
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody className="form-body">
        <CRow>
          <CCol sm={2}>
            <CNav variant="pills" className="flex-column">
              <CNavItem className="nav-custom__column">
                <CNavLink
                  className="cursor custom-tab-color-main"
                  active={activeKey === 1}
                  onClick={() => setActiveKey(1)}
                >
                  투표정보
                </CNavLink>
              </CNavItem>
              <CNavItem className="nav-custom__column">
                <CNavLink
                  className="cursor custom-tab-color-main"
                  active={activeKey === 2}
                  onClick={() => setActiveKey(2)}
                >
                  투표 콘텐츠
                </CNavLink>
              </CNavItem>
            </CNav>
          </CCol>
          <CCol sm={10}>
            <CTabContent>
              <CTabPane role="tabpanel" visible={activeKey === 1}>
                <CRow>
                  <CCol sm={7}>
                    <CCol className="mb-5 d-flex">
                      <div style={{ whiteSpace: 'nowrap', marginRight: '20px' }}>투표 아이디​</div>
                      <div style={{ wordBreak: 'break-all' }}>{onId}</div>
                    </CCol>
                    <CCol className="mb-5">
                      <span className="my-2">투표 타입​</span>
                      <CCol sm={9} className="mt-3">
                        <CFormSelect
                          disabled
                          size="lg"
                          aria-label="Large select example"
                          className="search-bar__select text-center"
                          style={{ width: '210px' }}
                          value={isType}
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option value={1}>랭킹 투표​</option>
                          <option value={2}>팬픽 투표</option>
                          <option value={3}>이벤트 투표​</option>
                          <option value={4}>이벤트 댓글 투표</option>
                        </CFormSelect>
                      </CCol>
                    </CCol>
                    <CCol className="mb-5 d-flex flex-column">
                      <div className="my-2">투표우선순위​</div>
                      <div className="text-danger">
                        ※ 높을수록 우선순위가 높다 ex_0이 가장 마지막에 노출됨​
                      </div>
                      <CCol sm={6} className="mt-3">
                        <CFormSelect
                          size="lg"
                          aria-label="Large select example"
                          className="mr-3 search-bar__select mt-3 text-center"
                          value={isPriority}
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
                    <CCol className="my-4 mb-5">
                      <span>투표상태​</span>
                      <CCol sm={12} className="mt-3">
                        <CFormSelect
                          size="lg"
                          aria-label="Large select example"
                          className="search-bar__select mt-3 text-center"
                          style={{ width: '130px' }}
                          value={isStatus}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value={1}>진행중​</option>
                          <option value={0}>비활성​</option>
                          <option value={2}>종료</option>
                          <option value={-1}>삭제</option>
                        </CFormSelect>
                      </CCol>
                    </CCol>
                    <CCol className="d-flex flex-column my-4 mb-5">
                      <span className="me-1">투표기간</span>
                      <CTable className="mt-3 table-text-center">
                        <CTableBody>
                          <CTableRow className="">
                            <CTableDataCell className="border border-0" style={{ width: '60px' }}>
                              <span className="border border-0">시작일</span>
                            </CTableDataCell>
                            <CTableDataCell className="border border-0" style={{ width: '25%' }}>
                              <CFormInput
                                className="w-100 p-1 text-center"
                                maxLength={4}
                                placeholder="YYYY"
                                aria-label="year"
                                type="number"
                                onKeyPress={(e) => {
                                  let ch = String.fromCharCode(e.which)
                                  if (!/[0-9]/.test(ch)) {
                                    e.preventDefault()
                                  }
                                }}
                                value={startDay.year}
                                onChange={(e) => setStartDay({ ...startDay, year: e.target.value })}
                              />
                            </CTableDataCell>
                            <CTableDataCell className="border border-0">
                              <span className="">년</span>
                            </CTableDataCell>

                            <CTableDataCell className="border border-0" style={{ width: '20%' }}>
                              <CFormInput
                                className="w-100 p-1 text-center"
                                maxLength={2}
                                placeholder="MM"
                                aria-label="month"
                                type="number"
                                onKeyPress={(e) => {
                                  let ch = String.fromCharCode(e.which)
                                  if (!/[0-9]/.test(ch)) {
                                    e.preventDefault()
                                  }
                                }}
                                value={startDay.month}
                                onChange={(e) =>
                                  setStartDay({ ...startDay, month: e.target.value })
                                }
                              />
                            </CTableDataCell>
                            <CTableDataCell className="border border-0">
                              <span>월</span>
                            </CTableDataCell>

                            <CTableDataCell className="border border-0" style={{ width: '20%' }}>
                              <CFormInput
                                className="w-100 p-1 text-center"
                                maxLength={2}
                                placeholder="DD"
                                aria-label="day"
                                type="number"
                                onKeyPress={(e) => {
                                  let ch = String.fromCharCode(e.which)
                                  if (!/[0-9]/.test(ch)) {
                                    e.preventDefault()
                                  }
                                }}
                                value={startDay.day}
                                onChange={(e) => setStartDay({ ...startDay, day: e.target.value })}
                              />
                            </CTableDataCell>
                            <CTableDataCell className="border border-0">
                              <span className="">일</span>
                            </CTableDataCell>
                          </CTableRow>

                          <CTableRow>
                            <CTableDataCell className="border border-0" />
                            <CTableDataCell className="border border-0">
                              <CFormInput
                                className="w-100 p-1 text-center"
                                placeholder="HH"
                                maxLength={2}
                                aria-label="hour"
                                type="number"
                                onKeyPress={(e) => {
                                  let ch = String.fromCharCode(e.which)
                                  if (!/[0-9]/.test(ch)) {
                                    e.preventDefault()
                                  }
                                }}
                                value={startDay.hour}
                                onChange={(e) => setStartDay({ ...startDay, hour: e.target.value })}
                              />
                            </CTableDataCell>
                            <CTableDataCell className="border border-0">
                              <span className="">시</span>
                            </CTableDataCell>

                            <CTableDataCell className="border border-0">
                              <CFormInput
                                className="w-100 p-1 text-center"
                                placeholder="mm"
                                aria-label="minute"
                                maxLength={2}
                                type="number"
                                onKeyPress={(e) => {
                                  let ch = String.fromCharCode(e.which)
                                  if (!/[0-9]/.test(ch)) {
                                    e.preventDefault()
                                  }
                                }}
                                value={startDay.minute}
                                onChange={(e) =>
                                  setStartDay({ ...startDay, minute: e.target.value })
                                }
                              />
                            </CTableDataCell>
                            <CTableDataCell className="border border-0">
                              <span className="ms-2">분</span>
                            </CTableDataCell>
                          </CTableRow>

                          <CTableRow>
                            <CTableDataCell className="border border-0">
                              <span className="" style={{ width: '220px' }}>
                                순위 발표일​
                              </span>
                            </CTableDataCell>
                            <CTableDataCell className="border border-0">
                              <CFormInput
                                className="w-100 p-1 text-center"
                                placeholder="YYYY"
                                aria-label="year"
                                type="number"
                                onKeyPress={(e) => {
                                  let ch = String.fromCharCode(e.which)
                                  if (!/[0-9]/.test(ch)) {
                                    e.preventDefault()
                                  }
                                }}
                                value={resultDay.year}
                                onChange={(e) =>
                                  setResultDay({ ...resultDay, year: e.target.value })
                                }
                              />
                            </CTableDataCell>
                            <CTableDataCell className="border border-0">
                              <span className="">년</span>
                            </CTableDataCell>

                            <CTableDataCell className="border border-0">
                              <CFormInput
                                className="w-100 p-1 text-center"
                                placeholder="MM"
                                aria-label="month"
                                type="number"
                                onKeyPress={(e) => {
                                  let ch = String.fromCharCode(e.which)
                                  if (!/[0-9]/.test(ch)) {
                                    e.preventDefault()
                                  }
                                }}
                                value={resultDay.month}
                                onChange={(e) =>
                                  setResultDay({ ...resultDay, month: e.target.value })
                                }
                              />
                            </CTableDataCell>
                            <CTableDataCell className="border border-0">
                              <span className="">월</span>
                            </CTableDataCell>

                            <CTableDataCell className="border border-0">
                              <CFormInput
                                className="w-100 p-1 text-center"
                                placeholder="DD"
                                aria-label="day"
                                type="number"
                                onKeyPress={(e) => {
                                  let ch = String.fromCharCode(e.which)
                                  if (!/[0-9]/.test(ch)) {
                                    e.preventDefault()
                                  }
                                }}
                                value={resultDay.day}
                                onChange={(e) =>
                                  setResultDay({ ...resultDay, day: e.target.value })
                                }
                              />
                            </CTableDataCell>
                            <CTableDataCell className="border border-0">
                              <span className="">일​</span>
                            </CTableDataCell>
                            <CTableDataCell className="border border-0" />
                          </CTableRow>

                          <CTableRow>
                            <CTableDataCell className="border border-0"></CTableDataCell>
                            <CTableDataCell className="border border-0">
                              <CFormInput
                                className="w-100 p-1 text-center"
                                placeholder="HH"
                                aria-label="hour"
                                type="number"
                                onKeyPress={(e) => {
                                  let ch = String.fromCharCode(e.which)
                                  if (!/[0-9]/.test(ch)) {
                                    e.preventDefault()
                                  }
                                }}
                                value={resultDay.hour}
                                onChange={(e) =>
                                  setResultDay({ ...resultDay, hour: e.target.value })
                                }
                              />
                            </CTableDataCell>
                            <CTableDataCell className="border border-0">
                              <span>시​</span>
                            </CTableDataCell>

                            <CTableDataCell className="border border-0">
                              <CFormInput
                                className="p-1 text-center"
                                placeholder="mm"
                                aria-label="minute"
                                type="number"
                                onKeyPress={(e) => {
                                  let ch = String.fromCharCode(e.which)
                                  if (!/[0-9]/.test(ch)) {
                                    e.preventDefault()
                                  }
                                }}
                                value={resultDay.minute}
                                onChange={(e) =>
                                  setResultDay({ ...resultDay, minute: e.target.value })
                                }
                              />
                            </CTableDataCell>
                            <CTableDataCell className="border border-0">
                              <span>분</span>
                            </CTableDataCell>
                          </CTableRow>

                          <CTableRow>
                            <CTableDataCell className="border border-0">
                              <span className="">종료일​</span>
                            </CTableDataCell>
                            <CTableDataCell className="border border-0">
                              <CFormInput
                                className="w-100 p-1 text-center"
                                placeholder="YYYY"
                                aria-label="year"
                                type="number"
                                onKeyPress={(e) => {
                                  let ch = String.fromCharCode(e.which)
                                  if (!/[0-9]/.test(ch)) {
                                    e.preventDefault()
                                  }
                                }}
                                value={endDay.year}
                                onChange={(e) => setEndDay({ ...endDay, year: e.target.value })}
                              />
                            </CTableDataCell>
                            <CTableDataCell className="border border-0">
                              <span className="">년</span>
                            </CTableDataCell>

                            <CTableDataCell className="border border-0">
                              <CFormInput
                                className="w-100 p-1 text-center"
                                placeholder="MM"
                                aria-label="month"
                                type="number"
                                onKeyPress={(e) => {
                                  let ch = String.fromCharCode(e.which)
                                  if (!/[0-9]/.test(ch)) {
                                    e.preventDefault()
                                  }
                                }}
                                value={endDay.month}
                                onChange={(e) => setEndDay({ ...endDay, month: e.target.value })}
                              />
                            </CTableDataCell>
                            <CTableDataCell className="border border-0">
                              <span className="">월</span>
                            </CTableDataCell>

                            <CTableDataCell className="border border-0">
                              <CFormInput
                                className="w-100 p-1 text-center"
                                placeholder="DD"
                                aria-label="day"
                                type="number"
                                onKeyPress={(e) => {
                                  let ch = String.fromCharCode(e.which)
                                  if (!/[0-9]/.test(ch)) {
                                    e.preventDefault()
                                  }
                                }}
                                value={endDay.day}
                                onChange={(e) => setEndDay({ ...endDay, day: e.target.value })}
                              />
                            </CTableDataCell>
                            <CTableDataCell className="border border-0">
                              <span className="">일​</span>
                            </CTableDataCell>
                          </CTableRow>

                          <CTableRow>
                            <CTableDataCell className="border border-0" />
                            <CTableDataCell className="border border-0">
                              <CFormInput
                                className="w-100 p-1 text-center"
                                placeholder="HH"
                                aria-label="hour"
                                type="number"
                                onKeyPress={(e) => {
                                  let ch = String.fromCharCode(e.which)
                                  if (!/[0-9]/.test(ch)) {
                                    e.preventDefault()
                                  }
                                }}
                                value={endDay.hour}
                                onChange={(e) => setEndDay({ ...endDay, hour: e.target.value })}
                              />
                            </CTableDataCell>
                            <CTableDataCell className="border border-0">
                              <span>시</span>
                            </CTableDataCell>

                            <CTableDataCell className="border border-0">
                              <CFormInput
                                className="w-100 p-1 text-center"
                                placeholder="mm"
                                aria-label="minute"
                                maxLength={2}
                                type="number"
                                onKeyPress={(e) => {
                                  let ch = String.fromCharCode(e.which)
                                  if (!/[0-9]/.test(ch)) {
                                    e.preventDefault()
                                  }
                                }}
                                value={endDay.minute}
                                onChange={(e) => setEndDay({ ...endDay, minute: e.target.value })}
                              />
                            </CTableDataCell>
                            <CTableDataCell className="border border-0">
                              <span className="ms-2">분</span>
                            </CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>

                      <CCol className="d-flex flex-row align-items-center ">
                        {/*<span className="" style={{ width: '140px' }}>*/}
                        {/*  시작일*/}
                        {/*</span>*/}
                        <div className=" me-2">
                          {/*<CFormInput*/}
                          {/*  className="w-100 p-1 text-center"*/}
                          {/*  maxLength={4}*/}
                          {/*  placeholder="YYYY"*/}
                          {/*  aria-label="year"*/}
                          {/*  type="number"*/}
                          {/*  onKeyPress={(e) => {*/}
                          {/*    let ch = String.fromCharCode(e.which)*/}
                          {/*    if (!/[0-9]/.test(ch)) {*/}
                          {/*      e.preventDefault()*/}
                          {/*    }*/}
                          {/*  }}*/}
                          {/*  value={startDay.year}*/}
                          {/*  onChange={(e) => setStartDay({ ...startDay, year: e.target.value })}*/}
                          {/*/>*/}
                        </div>
                        {/*<div className="mx-2">년</div>*/}
                        <div className=" me-2">
                          {/*<CFormInput*/}
                          {/*  className="w-100 p-1 text-center"*/}
                          {/*  maxLength={2}*/}
                          {/*  placeholder="MM"*/}
                          {/*  aria-label="year"*/}
                          {/*  type="number"*/}
                          {/*  onKeyPress={(e) => {*/}
                          {/*    let ch = String.fromCharCode(e.which)*/}
                          {/*    if (!/[0-9]/.test(ch)) {*/}
                          {/*      e.preventDefault()*/}
                          {/*    }*/}
                          {/*  }}*/}
                          {/*  value={startDay.month}*/}
                          {/*  onChange={(e) => setStartDay({ ...startDay, month: e.target.value })}*/}
                          {/*/>*/}
                        </div>
                        {/*<div className="mx-2">월</div>*/}
                        <div className="">
                          {/*<CFormInput*/}
                          {/*  className="w-100 p-1 text-center"*/}
                          {/*  placeholder="DD"*/}
                          {/*  maxLength={2}*/}
                          {/*  aria-label="day"*/}
                          {/*  type="number"*/}
                          {/*  onKeyPress={(e) => {*/}
                          {/*    let ch = String.fromCharCode(e.which)*/}
                          {/*    if (!/[0-9]/.test(ch)) {*/}
                          {/*      e.preventDefault()*/}
                          {/*    }*/}
                          {/*  }}*/}
                          {/*  value={startDay.day}*/}
                          {/*  onChange={(e) => setStartDay({ ...startDay, day: e.target.value })}*/}
                          {/*/>*/}
                        </div>
                        {/*<div className="mx-2">일</div>*/}
                        <div className="">
                          {/*<CFormInput*/}
                          {/*  className="w-100 p-1 text-center"*/}
                          {/*  placeholder="HH"*/}
                          {/*  aria-label="day"*/}
                          {/*  maxLength={2}*/}
                          {/*  type="number"*/}
                          {/*  onKeyPress={(e) => {*/}
                          {/*    let ch = String.fromCharCode(e.which)*/}
                          {/*    if (!/[0-9]/.test(ch)) {*/}
                          {/*      e.preventDefault()*/}
                          {/*    }*/}
                          {/*  }}*/}
                          {/*  value={startDay.hour}*/}
                          {/*  onChange={(e) => setStartDay({ ...startDay, hour: e.target.value })}*/}
                          {/*/>*/}
                        </div>
                        {/*<div className="ms-2">시</div>*/}
                      </CCol>
                      <CCol className="d-flex flex-row align-items-center  my-3">
                        {/*<span className="" style={{ width: '220px' }}>*/}
                        {/*  순위 발표일​*/}
                        {/*</span>*/}
                        <div className=" me-2">
                          {/*<CFormInput*/}
                          {/*  className="w-100 p-1 text-center"*/}
                          {/*  placeholder="YYYY"*/}
                          {/*  aria-label="year"*/}
                          {/*  type="number"*/}
                          {/*  onKeyPress={(e) => {*/}
                          {/*    let ch = String.fromCharCode(e.which)*/}
                          {/*    if (!/[0-9]/.test(ch)) {*/}
                          {/*      e.preventDefault()*/}
                          {/*    }*/}
                          {/*  }}*/}
                          {/*  value={resultDay.year}*/}
                          {/*  onChange={(e) => setResultDay({ ...resultDay, year: e.target.value })}*/}
                          {/*/>*/}
                        </div>
                        {/*<div className="mx-2">년</div>*/}
                        <div className=" me-2">
                          {/*<CFormInput*/}
                          {/*  className="w-100 p-1 text-center"*/}
                          {/*  placeholder="MM"*/}
                          {/*  aria-label="year"*/}
                          {/*  type="number"*/}
                          {/*  onKeyPress={(e) => {*/}
                          {/*    let ch = String.fromCharCode(e.which)*/}
                          {/*    if (!/[0-9]/.test(ch)) {*/}
                          {/*      e.preventDefault()*/}
                          {/*    }*/}
                          {/*  }}*/}
                          {/*  value={resultDay.month}*/}
                          {/*  onChange={(e) => setResultDay({ ...resultDay, month: e.target.value })}*/}
                          {/*/>*/}
                        </div>
                        {/*<div className="mx-2">월</div>*/}
                        <div className="">
                          {/*<CFormInput*/}
                          {/*  className="w-100 p-1 text-center"*/}
                          {/*  placeholder="DD"*/}
                          {/*  aria-label="day"*/}
                          {/*  type="number"*/}
                          {/*  onKeyPress={(e) => {*/}
                          {/*    let ch = String.fromCharCode(e.which)*/}
                          {/*    if (!/[0-9]/.test(ch)) {*/}
                          {/*      e.preventDefault()*/}
                          {/*    }*/}
                          {/*  }}*/}
                          {/*  value={resultDay.day}*/}
                          {/*  onChange={(e) => setResultDay({ ...resultDay, day: e.target.value })}*/}
                          {/*/>*/}
                        </div>
                        {/*<div className="mx-2">일​</div>*/}
                      </CCol>
                      <CCol className="d-flex flex-row align-items-center mb-3">
                        <span className="" style={{ width: '97px' }}></span>
                        <div style={{ width: '15%', marginRight: '10px' }}>
                          {/*<CFormInput*/}
                          {/*  className="p-1 text-center"*/}
                          {/*  placeholder="HH"*/}
                          {/*  aria-label="hour"*/}
                          {/*  type="number"*/}
                          {/*  onKeyPress={(e) => {*/}
                          {/*    let ch = String.fromCharCode(e.which)*/}
                          {/*    if (!/[0-9]/.test(ch)) {*/}
                          {/*      e.preventDefault()*/}
                          {/*    }*/}
                          {/*  }}*/}
                          {/*  value={resultDay.hour}*/}
                          {/*  onChange={(e) => setResultDay({ ...resultDay, hour: e.target.value })}*/}
                          {/*/>*/}
                        </div>
                        {/*<div style={{ marginRight: '10px' }}>시</div>*/}
                        <div className="" style={{ width: '15%' }}>
                          {/*<CFormInput*/}
                          {/*  className="w-100 p-1 text-center"*/}
                          {/*  placeholder="mm"*/}
                          {/*  aria-label="minute"*/}
                          {/*  type="number"*/}
                          {/*  onKeyPress={(e) => {*/}
                          {/*    let ch = String.fromCharCode(e.which)*/}
                          {/*    if (!/[0-9]/.test(ch)) {*/}
                          {/*      e.preventDefault()*/}
                          {/*    }*/}
                          {/*  }}*/}
                          {/*  value={resultDay.minute}*/}
                          {/*  onChange={(e) => setResultDay({ ...resultDay, minute: e.target.value })}*/}
                          {/*/>*/}
                        </div>
                        {/*<div className="ms-2">분​</div>*/}
                      </CCol>
                      <CCol className="d-flex flex-row align-items-center">
                        {/*<span className="" style={{ width: '140px' }}>*/}
                        {/*  종료일​*/}
                        {/*</span>*/}
                        <div className="me-2">
                          {/*<CFormInput*/}
                          {/*  className="w-100 p-1 text-center"*/}
                          {/*  placeholder="YYYY"*/}
                          {/*  aria-label="year"*/}
                          {/*  type="number"*/}
                          {/*  onKeyPress={(e) => {*/}
                          {/*    let ch = String.fromCharCode(e.which)*/}
                          {/*    if (!/[0-9]/.test(ch)) {*/}
                          {/*      e.preventDefault()*/}
                          {/*    }*/}
                          {/*  }}*/}
                          {/*  value={endDay.year}*/}
                          {/*  onChange={(e) => setEndDay({ ...endDay, year: e.target.value })}*/}
                          {/*/>*/}
                        </div>
                        {/*<div className="mx-2">년</div>*/}
                        <div className="me-2">
                          {/*<CFormInput*/}
                          {/*  className="w-100 p-1 text-center"*/}
                          {/*  placeholder="MM"*/}
                          {/*  aria-label="year"*/}
                          {/*  type="number"*/}
                          {/*  onKeyPress={(e) => {*/}
                          {/*    let ch = String.fromCharCode(e.which)*/}
                          {/*    if (!/[0-9]/.test(ch)) {*/}
                          {/*      e.preventDefault()*/}
                          {/*    }*/}
                          {/*  }}*/}
                          {/*  value={endDay.month}*/}
                          {/*  onChange={(e) => setEndDay({ ...endDay, month: e.target.value })}*/}
                          {/*/>*/}
                        </div>
                        {/*<div className="mx-2">월</div>*/}
                        <div className="">
                          {/*<CFormInput*/}
                          {/*  className="w-100 p-1 text-center"*/}
                          {/*  placeholder="DD"*/}
                          {/*  aria-label="day"*/}
                          {/*  type="number"*/}
                          {/*  onKeyPress={(e) => {*/}
                          {/*    let ch = String.fromCharCode(e.which)*/}
                          {/*    if (!/[0-9]/.test(ch)) {*/}
                          {/*      e.preventDefault()*/}
                          {/*    }*/}
                          {/*  }}*/}
                          {/*  value={endDay.day}*/}
                          {/*  onChange={(e) => setEndDay({ ...endDay, day: e.target.value })}*/}
                          {/*/>*/}
                        </div>
                        {/*<div className="mx-2">일​</div>*/}
                        <div className="">
                          {/*<CFormInput*/}
                          {/*  className="w-100 p-1 text-center"*/}
                          {/*  placeholder="HH"*/}
                          {/*  aria-label="hour"*/}
                          {/*  type="number"*/}
                          {/*  onKeyPress={(e) => {*/}
                          {/*    let ch = String.fromCharCode(e.which)*/}
                          {/*    if (!/[0-9]/.test(ch)) {*/}
                          {/*      e.preventDefault()*/}
                          {/*    }*/}
                          {/*  }}*/}
                          {/*  value={endDay.hour}*/}
                          {/*  onChange={(e) => setEndDay({ ...endDay, hour: e.target.value })}*/}
                          {/*/>*/}
                        </div>
                        {/*<div className="ms-2">시</div>*/}
                      </CCol>
                    </CCol>
                    {/*Input P*/}
                    <CCol className="mb-5 d-flex flex-column">
                      <div className="mb-3">투표이름​</div>
                      <CInputGroup>
                        <label htmlFor="ko" className="me-2" style={{ width: '70px' }}>
                          한국어​
                        </label>
                        <CFormInput
                          defaultValue={isNameVote.ko}
                          onChange={(e) => setNameVote({ ...isNameVote, ko: e.target.value })}
                          id="ko"
                          placeholder="내용을 입력하세요"
                        />
                      </CInputGroup>
                      <CInputGroup className="my-2">
                        <label htmlFor="en" className="me-2" style={{ width: '70px' }}>
                          영어​
                        </label>
                        <CFormInput
                          defaultValue={isNameVote.en}
                          onChange={(e) => setNameVote({ ...isNameVote, en: e.target.value })}
                          id="en"
                          placeholder="내용을 입력하세요"
                        />
                      </CInputGroup>
                      <CInputGroup>
                        <label htmlFor="ch" className="me-2" style={{ width: '70px' }}>
                          중국어​
                        </label>
                        <CFormInput
                          defaultValue={isNameVote.ch}
                          onChange={(e) => setNameVote({ ...isNameVote, ch: e.target.value })}
                          id="ch"
                          placeholder="내용을 입력하세요"
                        />
                      </CInputGroup>
                      <CInputGroup className="my-2">
                        <label htmlFor="jp" className="me-2" style={{ width: '70px' }}>
                          일본어​
                        </label>
                        <CFormInput
                          defaultValue={isNameVote.jp}
                          onChange={(e) => setNameVote({ ...isNameVote, jp: e.target.value })}
                          id="jp"
                          placeholder="내용을 입력하세요"
                        />
                      </CInputGroup>
                      <CInputGroup>
                        <label htmlFor="es" className="me-2" style={{ width: '70px' }}>
                          스페인어​
                        </label>
                        <CFormInput
                          defaultValue={isNameVote.es}
                          onChange={(e) => setNameVote({ ...isNameVote, es: e.target.value })}
                          id="es"
                          placeholder="내용을 입력하세요"
                        />
                      </CInputGroup>
                    </CCol>
                  </CCol>
                  {/*Second col*/}
                  <CCol sm={5}>
                    <CCol>
                      <div className="me-4 mb-3">랭킹배너 이미지 (권장 : 335*150 JPEG)​</div>
                      <div className="mb-3">
                        <FileBtn
                          name="한국어"
                          title="ranking"
                          fileData={(data) => {
                            setImgs({ ...imgs, ko: data })
                          }}
                          accept="image/*"
                          id="mainImage"
                          imageUrl={imgs.ko}
                        />
                      </div>
                      <div className="mb-3">
                        <FileBtn
                          name="영어​"
                          title="ranking"
                          fileData={(data) => {
                            setImgs({ ...imgs, en: data })
                          }}
                          accept="image/*"
                          id="mainImage2"
                          imageUrl={imgs.en}
                        />
                      </div>
                      <div className="mb-3">
                        <FileBtn
                          name="중국어​"
                          title="ranking"
                          fileData={(data) => {
                            setImgs({ ...imgs, ch: data })
                          }}
                          accept="image/*"
                          id="mainImage3"
                          imageUrl={imgs.ch}
                        />
                      </div>
                      <div className="mb-3">
                        <FileBtn
                          name="일본어​"
                          title="ranking"
                          fileData={(data) => {
                            setImgs({ ...imgs, jp: data })
                          }}
                          accept="image/*"
                          id="mainImage4"
                          imageUrl={imgs.jp}
                        />
                      </div>
                      <div className="mb-3">
                        <FileBtn
                          name="스페인어​"
                          title="ranking"
                          fileData={(data) => {
                            setImgs({ ...imgs, es: data })
                          }}
                          accept="image/*"
                          id="mainImage5"
                          imageUrl={imgs.es}
                        />
                      </div>
                    </CCol>
                    <CCol>
                      <div className="me-4 mb-3">TIP 이미지 (권장 : 295*180 JPEG)​​</div>
                      <div className="mb-3">
                        <FileBtn
                          name="한국어​"
                          title="ranking"
                          fileData={(data) => {
                            imgKo.push(data)
                          }}
                          deleteData={(data) => {
                            const arrIndex = imgKo.findIndex((i) => i === data)
                            imgKo.splice(arrIndex, 1)
                          }}
                          newImg={(data) => {
                            newImgDiv.push(data)
                          }}
                          accept="image/*"
                          id="board1"
                          imageUrl="multi"
                          multiImg={imgKo}
                          multiple={true}
                          count={5}
                        />
                      </div>
                      <div className="mb-3">
                        <FileBtn
                          name="영어​"
                          title="ranking"
                          fileData={(data) => {
                            imgEn.push(data)
                          }}
                          deleteData={(data) => {
                            const arrIndex = imgEn.findIndex((i) => i === data)
                            imgEn.splice(arrIndex, 1)
                          }}
                          newImg={(data) => {
                            newImgDiv.push(data)
                          }}
                          accept="image/*"
                          id="board2"
                          imageUrl="multi"
                          multiImg={imgEn}
                          multiple={true}
                          count={5}
                        />
                      </div>
                      <div className="mb-3">
                        <FileBtn
                          name="중국어​"
                          title="ranking"
                          fileData={(data) => {
                            imgCh.push(data)
                          }}
                          deleteData={(data) => {
                            const arrIndex = imgCh.findIndex((i) => i === data)
                            imgCh.splice(arrIndex, 1)
                          }}
                          newImg={(data) => {
                            newImgDiv.push(data)
                          }}
                          accept="image/*"
                          id="board3"
                          imageUrl="multi"
                          multiImg={imgCh}
                          multiple={true}
                          count={5}
                        />
                      </div>
                      <div className="mb-3">
                        <FileBtn
                          name="일본어​"
                          title="ranking"
                          fileData={(data) => {
                            imgJp.push(data)
                          }}
                          deleteData={(data) => {
                            const arrIndex = imgJp.findIndex((i) => i === data)
                            imgJp.splice(arrIndex, 1)
                          }}
                          newImg={(data) => {
                            newImgDiv.push(data)
                          }}
                          accept="image/*"
                          id="board4"
                          imageUrl="multi"
                          multiImg={imgJp}
                          multiple={true}
                          count={5}
                        />
                      </div>
                      <div className="mb-3">
                        <FileBtn
                          name="스페인어​"
                          title="ranking"
                          fileData={(data) => {
                            imgEs.push(data)
                          }}
                          deleteData={(data) => {
                            const arrIndex = imgEs.findIndex((i) => i === data)
                            imgEs.splice(arrIndex, 1)
                          }}
                          newImg={(data) => {
                            newImgDiv.push(data)
                          }}
                          accept="image/*"
                          id="board5"
                          imageUrl="multi"
                          multiImg={imgEs}
                          multiple={true}
                          count={5}
                        />
                      </div>
                    </CCol>
                  </CCol>
                </CRow>
                <CModalFooter className="form-footer">
                  {role !== one && (
                    <CButton
                      className="form-footer__btn px-5"
                      style={{ color: 'white' }}
                      color="info"
                      onClick={() => setIsDetailVote(true)}
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
              </CTabPane>
              <CTabPane role="tabpanel" visible={activeKey === 2}>
                <CRow>
                  {role !== one && (
                    <CCol className="d-flex flex-row justify-content-end">
                      <CButton
                        onClick={() => {
                          setCopyContents(true)
                        }}
                        color="warning"
                        className="text-white me-2"
                      >
                        복사하기​
                      </CButton>
                      <CButton
                        onClick={() =>
                          setAddArtist({
                            use: true,
                            rankId: onId,
                          })
                        }
                        color="info"
                        className="text-white"
                      >
                        추가하기​
                      </CButton>
                    </CCol>
                  )}
                  <CTable bordered className="mt-3">
                    <CTableHead>
                      <CTableRow>
                        {tableTitle.map((title, index) => {
                          return (
                            <CTableHeaderCell className="text-center p-4" key={index}>
                              {title.label}
                            </CTableHeaderCell>
                          )
                        })}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {listTab !== null && listTab !== undefined ? (
                        listTab.map((value, index) => {
                          return (
                            <CTableRow key={index}>
                              <CTableDataCell className="p-4">
                                <span className="d-flex flex-row justify-content-center">
                                  {value.artist_id}
                                </span>
                              </CTableDataCell>
                              <CTableDataCell className="p-4">
                                <CImage
                                  className="cursor"
                                  style={{
                                    borderRadius: '55%',
                                    width: '40px',
                                    height: '40px',
                                    objectFit: 'cover',
                                  }}
                                  onClick={() =>
                                    setIsImg({
                                      use: true,
                                      img:
                                        value.img_artist === null
                                          ? ''
                                          : value.img_artist.main !== ''
                                          ? process.env.REACT_APP_IMG + value.img_artist.main
                                          : process.env.REACT_APP_IMG + value.img_artist.sup,
                                    })
                                  }
                                  src={
                                    value.img_artist === null
                                      ? ''
                                      : value.img_artist.main !== ''
                                      ? process.env.REACT_APP_IMG + value.img_artist.main
                                      : process.env.REACT_APP_IMG + value.img_artist.sup
                                  }
                                />
                              </CTableDataCell>
                              <CTableDataCell className="p-4">
                                <span className="d-flex flex-row justify-content-center">
                                  {value.name_artist === null
                                    ? ''
                                    : value.name_artist.ko !== ''
                                    ? value.name_artist.ko
                                    : value.name_artist.etc}
                                  {value.group_name === null
                                    ? ''
                                    : value.group_name[0].ko !== ''
                                    ? ' (' + value.group_name[0].ko + ')'
                                    : ' (' + value.group_name[0].etc + ')'}
                                </span>
                              </CTableDataCell>
                              <CTableDataCell className="p-4">
                                <span className="d-flex flex-row justify-content-center">
                                  {value.code_artist}
                                </span>
                              </CTableDataCell>
                              <CTableDataCell className="p-4">
                                <span className="d-flex flex-row justify-content-center">
                                  {value.group_code}
                                </span>
                              </CTableDataCell>
                              {role !== one && (
                                <CTableDataCell className="p-4">
                                  <span className="d-flex flex-row justify-content-center">
                                    <CButton
                                      onClick={() =>
                                        setIsDelArtist({
                                          use: true,
                                          artistid: value.artist_id,
                                          rankId: value.rank_id,
                                        })
                                      }
                                      color="dark"
                                    >
                                      삭제하기​
                                    </CButton>
                                  </span>
                                </CTableDataCell>
                              )}
                            </CTableRow>
                          )
                        })
                      ) : (
                        <CTableRow />
                      )}
                    </CTableBody>
                  </CTable>
                  {page !== pages && (
                    <CButton
                      color="dark"
                      size="sm"
                      className="moreBt"
                      onClick={() => {
                        getArtist({
                          page: page + 1,
                        })
                        setPage(page + 1)
                      }}
                    >
                      더보기
                    </CButton>
                  )}
                </CRow>
              </CTabPane>
            </CTabContent>
          </CCol>
        </CRow>
      </CModalBody>
      {isDetailVote && (
        <CheckPopup
          onClickClose={() => setIsDetailVote(false)}
          bodyContent={'투표내용을 수정하시겠습니까?'}
          onCheked={(value) => modalOkEvent(value)}
        />
      )}
      {isOkCheck && (
        <NormalPopup onClickClose={() => onCloseOkEvent()} bodyContent={'수정이 완료되었습니다.'} />
      )}
      {isOkCheck2 && (
        <NormalPopup onClickClose={() => onCloseOkEvent()} bodyContent={'삭제가 완료되었습니다.'} />
      )}
      {/* {isAddArtist && <ArtistAdd onClickClose={() => setAddArtist(false)} />} */}
      {isAddArtist.use && (
        <CreateArtistContents
          rankId={isAddArtist.rankId}
          onClickClose={() => setAddArtist(false)}
          onClickSaveClose={() => {
            getArtist()
            setAddArtist(false)
          }}
        />
      )}
      {isArtistContent.use && (
        <ArtistContents
          onClickClose={() => setArtistContent({ use: false, rankId: '', artistid: '' })}
          artistId={isArtistContent.artistid}
          rankId={isArtistContent.rankId}
        />
      )}
      {isCopyContents && (
        <CopyContents
          onClickClose={() => setCopyContents(false)}
          onCloseOkEvent={() => {
            setCopyContents(false)
            getArtist()
          }}
          onId={onId}
        />
      )}
      {isDelArtist.use && (
        <CheckPopup
          onClickClose={() =>
            setIsDelArtist({
              use: false,
              artistid: '',
              rankId: '',
            })
          }
          bodyContent={'순위에서 제외 하시겠습니까?'}
          onCheked={(value) => modalDeleteEvent(value)}
        />
      )}
      {isImg.use && (
        <ImgBig
          onClickClose={() =>
            setIsImg({
              use: false,
              img: '',
            })
          }
          onImg={isImg.img}
        />
      )}
    </CModal>
  )
}

DetailVote.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onId: PropTypes.string.isRequired || PropTypes.number.isRequired,
  onCloseOkEvent: PropTypes.func,
}

export default DetailVote
