import React, { useState } from 'react'
import { CImage, CTableBody, CTableDataCell, CTableRow } from '@coreui/react'
import PropTypes from 'prop-types'
import moment from 'moment'
import EditDiyContentsDetail from './popup/EditDiyContentsDetail'
import EditImageDetail from '../EditImageDetail'

const PostsFanDiy = ({ posts, loading, isSort }) => {
  const [isContentDetail, setIsContentDetail] = useState({
    use: false,
    id: '',
  })
  const [isImageDetail2, setIsImageDetail2] = useState({
    use: false,
    imgs: [],
  })
  if (loading) {
    return <h2>Loading...</h2>
  }
  return (
    <CTableBody>
      {posts !== null && posts !== undefined && isSort !== 'priority' ? (
        posts.map((value, index) => {
          // main
          const contents = value.main_img_path === null ? '' : value.main_img_path
          const conImg = process.env.REACT_APP_IMG + contents

          // sub
          const sub = value.sub_img_path === null ? '' : value.sub_img_path
          const subImg = process.env.REACT_APP_IMG + sub

          // usb list
          const sublist2 =
            value.sub_img_path_list === null ? '' : value.sub_img_path_list.split(',')
          const sublist = []

          if (sublist2 !== '') {
            sublist2.map((value) =>
              sublist.push({
                url: value,
              }),
            )
          }

          // created
          const created = {
            date: value.created_at === null ? '' : moment(value.created_at).format('YYYY-MM-DD'),
            time: value.created_at === null ? '' : moment(value.created_at).format('HH:mm:ss'),
          }
          return (
            <CTableRow key={index}>
              <CTableDataCell>{value.cost_content === 0 ? '무료' : '유료'}</CTableDataCell>
              <CTableDataCell>{value.type === 1 ? '스티커' : '프레임'}</CTableDataCell>
              <CTableDataCell>{value.priority}</CTableDataCell>
              <CTableDataCell
                scope="row"
                className="artist-img-dom"
                // onClick={() =>
                //   setIsImg({
                //     use: true,
                //     img: conImg,
                //   })
                // }
              >
                <div className="d-flex flex-column align-items-center">
                  <div
                    className="artist-img-dom__img-border"
                    style={{ borderRadius: 'inherit', marginRight: '0px' }}
                  >
                    <CImage
                      className="artist-img-dom__img-border__profile cursor"
                      onClick={() =>
                        setIsImageDetail2({
                          use: true,
                          imgs: [{ url: contents }],
                        })
                      }
                      src={conImg}
                      alt=""
                      onError={(e) => (e.target.src = '/icon.png')}
                    />
                  </div>
                </div>
              </CTableDataCell>
              <CTableDataCell
                scope="row"
                className="artist-img-dom"
                onClick={() => setIsImageDetail2({ use: true, imgs: sublist })}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div
                    className="artist-img-dom__img-border"
                    style={{ borderRadius: 'inherit', marginRight: '0px' }}
                  >
                    <CImage
                      className="artist-img-dom__img-border__profile cursor"
                      src={subImg}
                      alt=""
                      onError={(e) => (e.target.src = '/icon.png')}
                    />
                  </div>
                </div>
              </CTableDataCell>
              <CTableDataCell
                onClick={() =>
                  setIsContentDetail({
                    use: true,
                    id: value.id,
                  })
                }
                className="cursor"
                style={{ width: '30%' }}
              >
                <span className="style-color-blue">{value.body_content}</span>
              </CTableDataCell>
              <CTableDataCell>{value.cost_content}</CTableDataCell>
              <CTableDataCell>
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <span>{created.date}</span>
                  <span>{created.time}​</span>
                </div>
              </CTableDataCell>
              <CTableDataCell>{value.id}</CTableDataCell>
            </CTableRow>
          )
        })
      ) : isSort === 'priority' ? (
        posts
          .map((value, index) => {
            // main
            const contents = value.main_img_path === null ? '' : value.main_img_path
            const conImg = process.env.REACT_APP_IMG + contents

            // sub
            const sub = value.sub_img_path === null ? '' : value.sub_img_path
            const subImg = process.env.REACT_APP_IMG + sub

            // usb list
            const sublist2 =
              value.sub_img_path_list === null ? '' : value.sub_img_path_list.split(',')
            const sublist = []

            if (sublist2 !== '') {
              sublist2.map((value) =>
                sublist.push({
                  url: value,
                }),
              )
            }

            // created
            const created = {
              date: value.created_at === null ? '' : moment(value.created_at).format('YYYY-MM-DD'),
              time: value.created_at === null ? '' : moment(value.created_at).format('HH:mm:ss'),
            }
            return (
              <CTableRow key={index}>
                <CTableDataCell>{value.cost_content === 0 ? '무료' : '유료'}</CTableDataCell>
                <CTableDataCell>{value.type === 1 ? '스티커' : '프레임'}</CTableDataCell>
                <CTableDataCell>{value.priority}</CTableDataCell>
                <CTableDataCell
                  scope="row"
                  className="artist-img-dom"
                  // onClick={() =>
                  //   setIsImg({
                  //     use: true,
                  //     img: conImg,
                  //   })
                  // }
                >
                  <div className="d-flex flex-column align-items-center">
                    <div
                      className="artist-img-dom__img-border"
                      style={{ borderRadius: 'inherit', marginRight: '0px' }}
                    >
                      <CImage
                        className="artist-img-dom__img-border__profile cursor"
                        onClick={() =>
                          setIsImageDetail2({
                            use: true,
                            imgs: [{ url: contents }],
                          })
                        }
                        src={conImg}
                        alt=""
                        onError={(e) => (e.target.src = '/icon.png')}
                      />
                    </div>
                  </div>
                </CTableDataCell>
                <CTableDataCell
                  scope="row"
                  className="artist-img-dom"
                  onClick={() => setIsImageDetail2({ use: true, imgs: sublist })}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      className="artist-img-dom__img-border"
                      style={{ borderRadius: 'inherit', marginRight: '0px' }}
                    >
                      <CImage
                        className="artist-img-dom__img-border__profile cursor"
                        src={subImg}
                        alt=""
                        onError={(e) => (e.target.src = '/icon.png')}
                      />
                    </div>
                  </div>
                </CTableDataCell>
                <CTableDataCell
                  onClick={() =>
                    setIsContentDetail({
                      use: true,
                      id: value.id,
                    })
                  }
                  className="cursor"
                  style={{ width: '30%' }}
                >
                  <span className="style-color-blue">{value.body_content}</span>
                </CTableDataCell>
                <CTableDataCell>{value.cost_content}</CTableDataCell>
                <CTableDataCell>
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <span>{created.date}</span>
                    <span>{created.time}​</span>
                  </div>
                </CTableDataCell>
                <CTableDataCell>{value.id}</CTableDataCell>
              </CTableRow>
            )
          })
          .reverse()
      ) : (
        <CTableRow />
      )}
      {isContentDetail.use && (
        <EditDiyContentsDetail
          onClickClose={() =>
            setIsContentDetail({
              use: false,
              id: '',
            })
          }
          onCloseOkEvent={() =>
            setIsContentDetail({
              use: false,
              id: '',
            })
          }
          onId={isContentDetail.id}
        />
      )}
      {isImageDetail2.use && (
        <EditImageDetail
          onClickClose={() =>
            setIsImageDetail2({
              use: false,
              imgs: [],
            })
          }
          onImgs={isImageDetail2.imgs}
        />
      )}
    </CTableBody>
  )
}
PostsFanDiy.propTypes = {
  posts: PropTypes.array,
  loading: PropTypes.bool,
  isSort: PropTypes.string,
}
export default PostsFanDiy
