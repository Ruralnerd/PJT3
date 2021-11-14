import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CategoryBox from '../../components/story/CategoryBox'
import { changeField } from '../../modules/story'

const CategoryBoxContainer = () => {
  const dispatch = useDispatch()
  const categorys = useSelector((state) => state.story.categorys)

  const onChangeCategorys = (nextCategorys) => {
    dispatch(
      changeField({
        key: 'categorys',
        value: nextCategorys,
      }),
    )
  }

  return (
    <CategoryBox onChangeCategorys={onChangeCategorys} categorys={categorys} />
  )
}

export default CategoryBoxContainer
