import React, { useState, useEffect } from 'react'
import { CModal, CModalBody, CModalFooter, CButton } from '@coreui/react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

/*
 * checkedValue = 1 start Day
 * checkedValue = 2 end Day
 */
export const OneClickCalenderPopup = ({ onClickClose, onStart, onChecked, checkedValue }) => {
  const [tempStart, setTempStart] = useState(onStart)

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
          value={new Date(tempStart)}
          calendarType="US"
          formatDay={(locale, date) => moment(date).format('D')}
          maxDate={new Date()}
          onChange={(e) => {
            setTempStart(new Date(e))
          }}
        />
      </CModalBody>
      <CModalFooter style={{ display: 'flex', justifyContent: 'end' }}>
        <CButton color="danger" onClick={() => onChecked(tempStart, checkedValue)}>
          선택
        </CButton>
        <CButton color="secondary" onClick={() => onClickClose()}>
          닫기
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

OneClickCalenderPopup.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onStart: PropTypes.object.isRequired,
  onChecked: PropTypes.func,
  checkedValue: PropTypes.number,
}
