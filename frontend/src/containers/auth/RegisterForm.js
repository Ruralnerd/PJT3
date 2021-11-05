import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initializeForm } from '../../modules/auth'
import AuthForm from '../../components/auth/AuthForm'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const { form } = useSelector(({ auth }) => ({
    form: auth.register,
  }))
  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target
    console.log(e.target, 'container/auth/RegisterForm')

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
    // TODO
  }
  // 컴포넌트가 처음 렌더링될 때 form 초기화
  useEffect(() => {
    dispatch(initializeForm('register'))
  }, [dispatch])
  return (
    <div>
      <AuthForm
        type="register"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default RegisterForm
