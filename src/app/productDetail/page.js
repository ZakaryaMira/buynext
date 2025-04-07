import React from 'react'
import Image from 'next/image'
import ProductDetails from './ProductDetails'
import MoreProducts from './MoreProducts'
const page = () => {
  return (
    <section className='flex flex-col justify-center items-center'>
        <ProductDetails/>
    </section>
  )
}

export default page