import React from 'react'
import Image from 'next/image'
const ProductCard = ({image, title, price}) => {
  return (
    <div className='bg-white p-4 rounded shadow text-center hover:shadow-lg transition-shadow duration-200'>
      <Image src={image} alt={title} className='mx-auto h-32 object-contain'></Image>
      <p className=''>{title}</p>
      <p className=''>{price} da</p>
    </div>
  )
}

export default ProductCard