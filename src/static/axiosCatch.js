/*
 *   exception handling
 */

export const statusCatch = (err) => {
  if (err.response.status === 504 || err.response.status === 500) {
    alert('서버에 문제가 발생했습니다.')
    return
  } else if (err.response.status === 401) {
    alert('로그인 정보가 만료되었습니다. \n다시 접속해 주세요.')
    localStorage.removeItem('user')
    window.location.replace('/login')
  }
  // else if (err.response.status === 500) {
  //   alert('입력란을 모두 작성해 주세요.')
  //   return
  // }
}
