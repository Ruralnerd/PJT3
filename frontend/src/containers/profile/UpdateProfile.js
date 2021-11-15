// 리덕스 스토어와 연동된 컴포넌트를 컨테이너 컴포넌트라고 한다.
// 리덕스로부터 받은 상태 데이터를 Component로 전달해준다.

// modules/profile.js에서 작성했던 액션 생성 함수와 상태 안에 있던 값을 컴포넌트의 props로 전달
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import UpdateProfileForm from '../../components/profile/UpdateProfileForm'
import { changeField, getProfile } from '../../modules/profile'

// UpdateProfileForm을 import해서 사용, 필요한 state 관리
const UpdateProfileContainer = () => {
  const dispatch = useDispatch()
  const { form } = useSelector(({ profile }) => ({
    form: profile.userData,
  }))

  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target.value

    dispatch(
      changeField({
        form: 'userData',
        key: name,
        value,
      }),
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <UpdateProfileForm
        type="userData"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </div>
  )
}

// connect함수를 사용하여 리덕스와 연동
// mapStateToProps : 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위해 설정하는 함수
// mapDispatchToProps : 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수

// connect 함수 사용을 통해 useSelect와 useDiapatch기능을 대신함.
// connect 함수 내에서는 액션 생성 함수를 호출하여 디스패치함
// 즉, 컴포넌트에서 액션을 디스패치한다.
export default UpdateProfileContainer
