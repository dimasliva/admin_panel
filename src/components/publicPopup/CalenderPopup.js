import React, { useState } from 'react'
import { CModal, CModalBody, CModalFooter, CButton } from '@coreui/react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
export const CalenderPopup = ({ onClickClose, onStart, onEnd, onChecked }) => {
  const [tempStart, setTempStart] = useState(onStart)
  const [tempEnd, setTempEnd] = useState(onEnd)

  return (
    <CModal visible={true} onClose={onClickClose} alignment="center">
      <CModalBody
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Calendar
          value={[new Date(tempStart), new Date(tempEnd)]}
          calendarType="US"
          formatDay={(locale, date) => moment(date).format('D')}
          allowPartialRange={true}
          selectRange={true}
          maxDate={new Date()}
          onChange={(e) => {
            if (e.length === 1) {
              setTempStart(new Date(e[0]))
              setTempEnd(new Date(e[0]))
              return
            }
            setTempStart(new Date(e[0]))
            setTempEnd(new Date(e[1]))
          }}
        />
      </CModalBody>
      <CModalFooter style={{ display: 'flex', justifyContent: 'end' }}>
        <CButton color="danger" onClick={() => onChecked(tempStart, tempEnd)}>
          선택
        </CButton>
        <CButton color="secondary" onClick={() => onClickClose()}>
          닫기
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

CalenderPopup.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onStart: PropTypes.object.isRequired,
  onEnd: PropTypes.object.isRequired,
  onChecked: PropTypes.func,
}
