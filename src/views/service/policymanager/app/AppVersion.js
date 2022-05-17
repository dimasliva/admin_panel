import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import moment from 'moment'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'

const AppVersion = () => {
  // useState
  const [activeKey, setActiveKey] = useState(1)
  const [typePlatform, setTypePlatform] = useState(1)
  const [setting, setSetting] = useState({
    service_id: '',
    sign: '',
    version: '',
    setting: {},
    action: {
      last_name: '',
      first_name: '',
    },
    updated_at: new Date('2021-01-01'),
  })
  const [settingItem, setSettingItem] = useState({
    code_version: '',
    name_version: '',
    type_delivery: '',
    updated_at: new Date('2021-01-01'),
  })
  const one = 3
  const [role, setRole] = useState('')
  useEffect(() => {
    getSetting()
  }, [])
  // getSetting
  const getSetting = async () => {
    const role = await axios
      .get(`/api/manager/profile`, headerConfig)
      .catch((err) => statusCatch(err))
    setRole(role.data.value.role)
    const res = await axios.get(`/api/setting/app`, headerConfig).catch((err) => statusCatch(err))
    if (!res.data.success) return
    setSetting(res.data.value)
    setSettingItem(res.data.value.setting[typePlatform])
  }

  const saveSetting = async () => {
    const res = await axios
      .put(`/api/setting/app/${typePlatform}`, settingItem, headerConfig)
      .catch((err) => statusCatch(err))

    if (res.data.success) {
      alert('앱 버전 업데이트가 완료되었습니다')
      getSetting()
    } else {
      alert('다시 시도해 주세요.')
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CNav variant="tabs" className="mt-2 nav-custom">
            <CNavItem>
              <CNavLink
                className="cursor custom-tab-color-main"
                active={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                앱 버전 설정​
              </CNavLink>
            </CNavItem>
          </CNav>
          <CCardBody>
            <CCol className="mb-4">
              <div>version.{setting.version}​</div>
              <div className="d-flex flex-row">
                <span>{moment(setting.updated_at).format('YYYY-MM-DD HH:mm:ss')}</span>
                &nbsp;에&nbsp;
                <span className="text-info">
                  {setting.action.last_name}&nbsp;
                  {setting.action.first_name}
                </span>
                &nbsp;
                <span>이 마지막 정책 수정​</span>
              </div>
            </CCol>
            <CTabContent>
              <CTabPane role="tabpanel" visible={activeKey === 1}>
                <CCol sm={4} className="d-flex flex-row">
                  <CFormSelect
                    size="lg"
                    style={{ width: '150px' }}
                    aria-label="Large select example"
                    className="search-bar__select me-2"
                    value={typePlatform}
                    onChange={(e) => setTypePlatform(e.target.value)}
                  >
                    <option value="1">Android​</option>
                    <option value="2">IOS​</option>
                  </CFormSelect>
                  <CButton
                    type="button"
                    style={{ width: '100px' }}
                    id="basic-addon1"
                    color="info"
                    onClick={() => {
                      setSettingItem(setting.setting[typePlatform])
                    }}
                  >
                    조회​
                  </CButton>
                </CCol>
                <CRow className="g-3">
                  <CCol sm={5}>
                    <CCol className="d-flex flex-column mt-4">
                      <div>앱 버전 일시</div>
                      <span className="fw-bold mt-3">
                        {moment(settingItem.updated_at).format('YYYY-MM-DD HH:mm:ss')}​
                      </span>
                    </CCol>
                    <CCol className="d-flex flex-column mt-4">
                      <div className="mb-2">앱 버전 코드​</div>
                      <CFormInput
                        value={settingItem.code_version}
                        onChange={(e) =>
                          setSettingItem({
                            ...settingItem,
                            code_version: e.target.value,
                          })
                        }
                        style={{ width: '150px' }}
                      />
                    </CCol>
                    <CCol className="d-flex flex-column mt-4">
                      <div className="mb-2">앱 버전 네임​</div>
                      <CFormInput
                        value={settingItem.name_version}
                        onChange={(e) => {
                          setSettingItem({
                            ...settingItem,
                            name_version: e.target.value,
                          })
                        }}
                        style={{ width: '150px' }}
                      />
                    </CCol>
                  </CCol>
                  <CCol sm={1} />
                  <CCol>
                    <CCol className="d-flex flex-column mt-4">
                      <div className="mb-3">업데이트 제공 형태​</div>
                      <CFormSelect
                        size="lg"
                        aria-label="Large select example"
                        value={settingItem.type_delivery}
                        className="search-bar__select me-2 text-center"
                        style={{ width: '220px' }}
                        onChange={(e) => {
                          setSettingItem({
                            ...settingItem,
                            type_delivery: e.target.value,
                          })
                        }}
                      >
                        <option value="1">강제 업데이트​</option>
                        <option value="2">선택적 업데이트​</option>
                      </CFormSelect>
                    </CCol>
                    <CCol className="mt-4">
                      <span />
                    </CCol>
                  </CCol>
                </CRow>
                {role === one && (
                  <CCol className="w-100">
                    <div className="float-end">
                      <CButton
                        type="button"
                        color="info"
                        id="basic-addon1"
                        onClick={() => {
                          role === one && saveSetting()
                        }}
                      >
                        앱 버전 적용하기​
                      </CButton>
                    </div>
                  </CCol>
                )}
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
AppVersion.propTypes = {
  history: PropTypes.object,
}

export default AppVersion
