import React from 'react'
import PropTypes from 'prop-types'
import { CButton } from '@coreui/react'

const PaginationFaq = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <div className="d-flex flex-row mt-3">
      {pageNumbers.map((number) => {
        return (
          <span key={number}>
            <CButton
              onClick={() => paginate(number)}
              color="info"
              className="bg-info border border-0 text-white px-3 me-2 cursor"
            >
              {number}
            </CButton>
          </span>
        )
      })}
    </div>
  )
}
PaginationFaq.propTypes = {
  postsPerPage: PropTypes.number,
  totalPosts: PropTypes.number,
  paginate: PropTypes.func,
}
export default PaginationFaq
