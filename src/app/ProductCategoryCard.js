import React from 'react'

const ProductCategoryCard = ({icon , title}) => {
  return (
    <div className='bg-[F2F2F2] p-6 rounded-xl shadow-md flex flex-col items-center justify-centerhover:scale-105 transition-all duration-200 w-[180px] h-[220px] gap-2 ' >
        <div className='text-4x mb-4'>{icon}</div>
        <p className='text-centre heading-extra-bold'>{title}</p>
    </div>
  )
}

export default ProductCategoryCard