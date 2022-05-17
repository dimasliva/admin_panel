import React from 'react'
import PropTypes from 'prop-types'
import Carousel from 'react-elastic-carousel'
import SliderCard from './popup/SliderCard'
import { CModal, CModalBody } from '@coreui/react'

const EditImageDetail = ({ onClickClose, onImgs }) => {
  return (
    <CModal size="xl" visible={true} onClose={onClickClose}>
      <CModalBody>
        <Carousel enableSwipe={false}>
          {onImgs.length > 0 ? (
            onImgs.map((value, index) => {
              return <SliderCard key={index} img={value.url} />
            })
          ) : (
            <SliderCard img="" />
          )}
        </Carousel>
      </CModalBody>
    </CModal>
  )
}

EditImageDetail.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onImgs: PropTypes.array.isRequired,
}

export default EditImageDetail
