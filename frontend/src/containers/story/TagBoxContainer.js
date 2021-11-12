import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TagBox from '../../components/write/TagBox'
import { changeField } from '../../modules/write'

const TagBoxContainer = () => {
  const dispatch = useDispatch()
  const categorys = useSelector((state) => state.write.categorys)

  const onChangeCategorys = (nextCategorys) => {
    dispatch(
      changeField({
        key: 'categorys',
        value: nextCategorys,
      }),
    )
  }

  return <TagBox onChangeCategorys={onChangeCategorys} categorys={categorys} />
}

export default TagBoxContainer
