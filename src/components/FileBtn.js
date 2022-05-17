import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { CFormInput, CImage, CInputGroup, CInputGroupText } from '@coreui/react'

export const FileBtn = (props) => {
  const hiddenFileInput = useRef(null)

  const handleChangeFile = (event) => {
    if (props.multiple) {
      if (props.multiImg.length + event.target.files.length > props.count) {
        alert(`최대 등록가능한 이미지 수는 ${props.count}개 입니다.`)
        return
      }
      // multiple file upload
      const fileData = event.target.files
      for (let i = 0; i < fileData.length; i++) {
        let file = fileData[i]
        file.id = i
        props.fileData(file)
        let reader = new FileReader()

        reader.onloadend = (e) => {
          const img = document.createElement('img')
          const div = document.createElement('div')
          const bt = document.createElement('button')

          div.style.marginRight = '10px'

          img.style.width = '80px'
          img.style.height = '80px'
          img.style.display = 'block'
          img.src = e.target.result

          bt.innerText = 'x'
          bt.style.position = 'relative'
          bt.style.top = '-90px'
          bt.style.right = '-68px'
          bt.style.backgroundColor = 'white'
          bt.style.border = 'none'
          bt.style.borderRadius = '50%'
          bt.style.color = 'red'

          bt.addEventListener('click', (event) => {
            props.deleteData(file)
            img.remove()
            bt.remove()
            div.remove()
          })
          div.appendChild(img)
          div.appendChild(bt)

          document.getElementById(props.id).appendChild(div)
          props.newImg(div)
        }

        reader.readAsDataURL(file)
      }
    } else {
      const fileData = event.target.files
      for (let i = 0; i < fileData.length; i++) {
        if (event.target.files[0]) {
          const fileData = event.target.files
          for (let i = 0; i < fileData.length; i++) {
            let file = fileData[i]
            file.id = i
            props.fileData(file)
            let reader = new FileReader()
            reader.onloadend = (e) => {
              const previewImage = document.getElementById(props.id)
              const img = document.createElement('img')
              const div = document.createElement('div')
              previewImage.innerHTML = ''
              img.src = URL.createObjectURL(event.target.files[0])
              img.style.width = '80px'
              img.style.height = '80px'
              previewImage.appendChild(img)
              document.getElementById(props.id).appendChild(div)
              if (typeof props.newImg === 'function') {
                props.newImg(div)
              }
            }
            reader.readAsDataURL(file)
          }
        }
      }
      if (event.target.files[0]) {
        console.log(props.imageUrl)
        const fileData = event.target.files
        for (let i = 0; i < fileData.length; i++) {
          let file = fileData[i]
          file.id = i
          props.fileData(file)
          let reader = new FileReader()
          reader.onloadend = (e) => {
            const previewImage = document.getElementById(props.id)
            const img = document.createElement('img')
            const div = document.createElement('div')
            previewImage.innerHTML = ''
            img.src = URL.createObjectURL(event.target.files[0])
            img.style.width = '80px'
            img.style.height = '80px'
            previewImage.appendChild(img)
            document.getElementById(props.id).appendChild(div)
            if (typeof props.newImg === 'function') {
              props.newImg(div)
            }
          }
          reader.readAsDataURL(file)
        }
      }
    }
  }

  return (
    <>
      <CInputGroup className="mb-3">
        <CInputGroupText>{props.name}</CInputGroupText>
        <CFormInput
          type="file"
          ref={hiddenFileInput}
          onChange={handleChangeFile}
          multiple={props.multiple}
          accept={props.accept}
        />
      </CInputGroup>
      <div style={{ display: 'flex', overflow: 'auto' }} id={props.id}>
        {props.multiImg &&
        typeof props.multiImg === 'object' &&
        props.multiImg.length > 0 &&
        props.imageUrl !== '' ? (
          props.multiImg.map((value) => {
            if (value.url !== '' && value.url !== undefined) {
              return (
                <div key={value.url} style={{ marginRight: '10px' }} id={'div' + props.id}>
                  <CImage
                    onClick={(e) => {
                      console.log(value.url)
                    }}
                    style={{
                      width: '80px',
                      height: '80px',
                      display: 'block',
                      marginBottom: '10px',
                    }}
                    src={process.env.REACT_APP_IMG + value.url}
                    id={value.url}
                    alt=""
                  />
                  <button
                    style={{
                      position: 'relative',
                      top: '-100px',
                      right: '-68px',
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      color: 'red',
                    }}
                    id={'bt' + props.id}
                    onClick={() => {
                      console.log(value)
                      const img = document.getElementById(value.url)
                      const bt = document.getElementById('bt' + value.url)
                      const div = document.getElementById('div' + value.url)
                      const arrIndex = props.multiImg.findIndex((i) => i.url !== value.url)
                      const index = props.multiImg.indexOf(value)
                      if (index > -1) {
                        props.multiImg.splice(index, 1)
                      }
                      img.remove()
                      bt.remove()
                      div.style.display = 'none'

                      props.multiImg.splice(arrIndex, 1)
                    }}
                  >
                    x
                  </button>
                </div>
              )
            }
          })
        ) : props.imageUrl !== '' && props.imageUrl !== 'multi' ? (
          <CImage
            onClick={(e) => {
              console.log(props.imageUrl)
            }}
            src={process.env.REACT_APP_IMG + props.imageUrl}
            style={{
              width: '80px',
              height: '80px',
              display: 'block',
              marginBottom: '10px',
            }}
            id={props.id}
            alt=""
          />
        ) : (
          <CImage
            onClick={(e) => {
              console.log(props.imageUrl)
            }}
            style={{
              width: '80px',
              height: '80px',
              display: 'none',
              marginBottom: '10px',
            }}
            id={props.id}
            alt=""
          />
        )}
      </div>
    </>
  )
}

FileBtn.propTypes = {
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  name: PropTypes.string,
  fileData: PropTypes.func,
  deleteData: PropTypes.func,
  deleteData2: PropTypes.func,
  id: PropTypes.string,
  imageUrl: PropTypes.string || PropTypes.object,
  title: PropTypes.string,
  multiImg: PropTypes.array,
  count: PropTypes.number,
  newImg: PropTypes.func,
}
