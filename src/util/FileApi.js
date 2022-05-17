import PropTypes from 'prop-types'
import axios from 'axios'
import { headerFileConfig } from 'src/static/axiosConfig'
import { statusCatch } from 'src/static/axiosCatch'

const FileApi = async (title, file) => {
  const formData = new FormData()
  formData.set('images', file)
  const imgurl = await axios
    .post(`/upload/${title}`, formData, headerFileConfig)
    .catch((err) => statusCatch(err))

  return imgurl
}

FileApi.PropTypes = {
  title: PropTypes.string.isRequired,
  onCloseOkEvent: PropTypes.file,
}

export default FileApi
