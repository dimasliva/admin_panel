import React, { useState } from 'react'
import { CTableBody, CTableDataCell, CTableRow } from '@coreui/react'
import PropTypes from 'prop-types'
import moment from 'moment'
import BasicPolicyDetail from './popup/BasicPolicyDetail'

const Posts = ({ posts, loading, infoSetting, date }) => {
  const [isPolicyDetail, setIsPolicyDetail] = useState({ use: false, id: '' })
  if (loading) {
    return <h2>Loading...</h2>
  }
  return (
    <CTableBody>
      {posts !== null && posts !== undefined ? (
        posts.map((value, index) => {
          return (
            <CTableRow key={index}>
              <CTableDataCell scope="row" className="text-break">
                <div className="d-flex flex-row align-items-center justify-content-center">
                  <span>{value.priority}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell className="text-break">
                <div className="d-flex flex-row align-items-center justify-content-center">
                  <span>
                    {value.status === 1 ? '정상' : value.status === 0 ? '비활성' : '삭제'}
                  </span>
                </div>
              </CTableDataCell>
              <CTableDataCell className="text-break">
                <div className="d-flex flex-row align-items-center justify-content-start">
                  <span
                    onClick={() => {
                      setIsPolicyDetail({ use: true, id: value.id })
                    }}
                    style={{ color: 'blue', cursor: 'pointer' }}
                  >
                    {value.name === null
                      ? ''
                      : value.name.ko !== ''
                      ? value.name.ko
                      : value.name.en !== ''
                      ? value.name.en
                      : value.name.ch !== ''
                      ? value.name.ch
                      : value.name.jp !== ''
                      ? value.name.jp
                      : value.name.es !== ''
                      ? value.name.es
                      : ''}
                  </span>
                </div>
              </CTableDataCell>
              <CTableDataCell className="text-break">
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <span>{moment(value.created_at).format('YYYY-MM-DD')}</span>
                  <span>{moment(value.created_at).format('HH:mm:ss')}​</span>
                </div>
              </CTableDataCell>
            </CTableRow>
          )
        })
      ) : (
        <CTableRow />
      )}
      {isPolicyDetail.use && (
        <BasicPolicyDetail
          onClickClose={() => setIsPolicyDetail({ use: false, id: '' })}
          onId={isPolicyDetail.id}
          onCloseOkEvent={() => {
            setIsPolicyDetail({ use: false, id: '' })
          }}
        />
      )}
    </CTableBody>
  )
}
Posts.propTypes = {
  posts: PropTypes.array,
  loading: PropTypes.bool,
  infoSetting: PropTypes.object,
  date: PropTypes.string,
}
export default Posts
