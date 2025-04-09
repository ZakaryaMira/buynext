import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const AllProducts = ({product}) => {
  return (
    <Link href={`/products/${product.id}`}>
    <div className='bg-white p-4 rounded shadow text-center hover:shadow-lg transition-shadow duration-200'>
        <Image src={product.image} alt={product.title} width={200} height={200} className="mx-auto object-contain h-48"/>
        <div>
          <p className="mt-2 font-medium text-[#212121] heading-black mb-10">{product.title}</p>
          <p className="text-sm text-[#212121] heading-extra-bold">{product.price} $</p>
        </div>
    </div>
    </Link>
  )
}

export default AllProducts