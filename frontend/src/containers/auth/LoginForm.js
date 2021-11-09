import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initializeForm, login } from '../../modules/auth'
import AuthForm from '../../components/auth/AuthForm'
import { withRouter } from 'react-router'

const LoginForm = ({ history }) => {
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
  }))

  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target

    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    )
  }

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault()
    const { email, password } = form
    dispatch(login({ email, password }))
  }

  // 컴포넌트가 처음 렌더링될 때 form 초기화
  useEffect(() => {
    dispatch(initializeForm('login'))
  }, [dispatch])

  useEffect(() => {
    if (authError) {
      setError('로그인 실패')
      return
    }
    if (auth) {
      localStorage.setItem('token', auth.token)
      history.push('/')
    }
    const token = localStorage.getItem('token')
    if (token) {
      alert('로그인 되었습니다.')
      history.push('/')
    }
  }, [history, auth, authError])

  return (
    <div>
      <AuthForm
        type="login"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
      />
    </div>
  )
}

export default withRouter(LoginForm)
