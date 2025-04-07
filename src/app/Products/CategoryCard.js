import React from 'react'

const CategoryCard = ({title}) => {
  return (
    <div className='className="w-full h-16 flex items-center justify-center border text-center text-sm font-medium cursor-pointer hover:bg-gray-100 transition"'>
        <h3 className='text-[#212121] text-xl heading-extra-bold'>{title}</h3>
    </div>
  )
}

export default CategoryCard