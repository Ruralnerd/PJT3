import React from 'react'

const SearchForm = ({ searchList }) => {
  return (
    <div>
      {searchList &&
        searchList.map((item) => (
          <div key={item.id}>
            <p>{item.title}</p>
            <img src={item.thumbnail_img} alt="" />
          </div>
        ))}
    </div>
  )
}

export default SearchForm
