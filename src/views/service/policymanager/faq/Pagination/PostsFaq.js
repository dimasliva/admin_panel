import React, { useState } from 'react'
import { CRow, CTableBody, CTableDataCell, CTableRow } from '@coreui/react'
import PropTypes from 'prop-types'
import moment from 'moment'
import FaqPolicyDetail from '../popup/FaqPolicyDetail'

const PostsFaq = ({ posts, loading, getFaq, date }) => {
  const [isPolicyDetail, setIsPolicyDetail] = useState({ use: false, id: '' })
  if (loading) {
    return <h2>Loading...</h2>
  }
  return (
    <CTableBody>
      {posts !== null && posts !== undefined ? (
        posts
          .map((value, index) => {
            const created = {
              date: value.created_at === null ? '' : moment(value.created_at).format('YYYY-MM-DD'),
              time: value.created_at === null ? '' : moment(value.created_at).format('HH:mm:ss'),
            }
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
                      {value.question === null
                        ? ''
                        : value.question.ko !== ''
                        ? value.question.ko
                        : value.question.en !== ''
                        ? value.question.en
                        : value.question.jp !== ''
                        ? value.question.jp
                        : value.question.ch !== ''
                        ? value.question.ch
                        : value.question.es}
                    </span>
                  </div>
                </CTableDataCell>
                <CTableDataCell scope="row" className="text-break">
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <span>{created.date}</span>
                    <span>{created.time}</span>
                  </div>
                </CTableDataCell>
              </CTableRow>
            )
          })
          .reverse()
      ) : (
        <CTableRow />
      )}
      {isPolicyDetail.use && (
        <FaqPolicyDetail
          onClickClose={() => setIsPolicyDetail({ use: false, id: '' })}
          onId={isPolicyDetail.id}
          onCloseOkEvent={() => {
            getFaq()
            setIsPolicyDetail({ use: false, id: '' })
          }}
        />
      )}
    </CTableBody>
  )
}
PostsFaq.propTypes = {
  posts: PropTypes.array,
  loading: PropTypes.bool,
  getFaq: PropTypes.func,
  date: PropTypes.string,
}
export default PostsFaq
