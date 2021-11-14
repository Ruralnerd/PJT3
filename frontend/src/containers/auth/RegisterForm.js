import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initializeForm, register } from '../../modules/auth'
import AuthForm from '../../components/auth/AuthForm'
import { withRouter } from 'react-router'

const RegisterForm = ({ history }) => {
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const { form, auth, authError, user } = useSelector(({ auth }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: auth.user,
  }))
  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target

    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    )
  }
  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault()
    const { email, password, passwordConfirm, nickname } = form
    if ([email, password, passwordConfirm, nickname].includes('')) {
      setError('빈 칸을 모두 입력하세요.')
      return
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      dispatch(changeField({ form: 'register', key: 'password', value: '' }))
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
      )
      return
    }
    dispatch(register({ email, password, nickname }))
  }
  // 컴포넌트가 처음 렌더링될 때 form 초기화
  useEffect(() => {
    dispatch(initializeForm('register'))
  }, [dispatch])

  // 회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      setError(Object.values(authError.response.data)[0])
      return
    }
    if (user) {
      alert('회원가입 되었습니다.')
      history.push('/login')
    }
    if (auth) {
      history.push('/')
      try {
        localStorage.setItem('token', auth.token)
      } catch (e) {
        console.log(e)
      }
    }
  }, [history, auth, authError, user])

  return (
    <div>
      <AuthForm
        type="register"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
      />
    </div>
  )
}

export default withRouter(RegisterForm)
