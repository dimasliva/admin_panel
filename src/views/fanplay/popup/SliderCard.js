import React from 'react'
import PropTypes from 'prop-types'
import { CImage } from '@coreui/react'
const SliderCard = (props) => {
  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        backgroundColor: '#333',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontsize: '30px',
      }}
    >
      <CImage
        src={process.env.REACT_APP_IMG + props.img}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'scale-down' }}
        onError={(e) => (e.target.src = '/icon.png')}
      />
    </div>
  )
}
SliderCard.propTypes = {
  numbers: PropTypes.number,
  img: PropTypes.string,
}
export default SliderCard
