import React from 'react'
import Image from 'next/image'
const ProductDetails = ({product}) => {
  return (
        <section className='grid grid-cols-2 bg-[#FFFFFF] w-250 h-230 rounded-2xl shadow mt-40 mb-40 p-5'>
            <div className='border-1 border-black flex justify-center items-center h-200 w-100 rounded-xl'>
                <Image src={product.image} alt={product.title} width={300} height={300} />
            </div>
            <div>
                <h1 className='text-3xl text-[#212121] heading-black mb-8 mt-5'>{product.title}</h1>
                <h2 className='text-2xl text-[#212121] heading-extra-bold mb-16'>{product.price} $</h2>
                <p className='text-sm text-[#212121] heading-extra-bold mb-24'>{product.description}</p>
                <div className='flex flex-col gap-4'>
                    <button className='text-base heading-black bg-[#212121] text-[#FAFAFA] py-5 rounded'>Acheter maintenant</button>
                    <button className='text-base heading-black bg-[#FAFAFA] text-[#212121] py-5 rounded border-4 border-black'>Ajouter au panier</button>
                </div>
            </div>
        </section>
  )
}

export default ProductDetails