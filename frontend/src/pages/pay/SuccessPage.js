import { useEffect } from 'react'

const SuccessPage = () => {
  useEffect(() => {
    alert('결제가 완료되었습니다.')
    window.close()
  })
  return null
}

export default SuccessPage
