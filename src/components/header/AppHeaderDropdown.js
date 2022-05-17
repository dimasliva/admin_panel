import React from 'react'
import { CDropdown } from '@coreui/react'
import { cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { headerConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      {/* <CAvatar src={avatar8} size="md" /> */}
      <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
        <span style={{ marginRight: '10px' }}>
          <span className="style-color-blue">관리자</span>님이 로그인 하셨습니다.
        </span>
        <span
          style={{ marginTop: '3px' }}
          className="cursor"
          onClick={() => {
            axios.get(`/api/manager/logout`, headerConfig).catch((err) => statusCatch(err))
            localStorage.removeItem('user')
            window.location.replace('/login')
          }}
        >
          <CIcon icon={cilAccountLogout} size="lg" />
        </span>
      </div>
    </CDropdown>
  )
}

export default AppHeaderDropdown
