import React from 'react'

const ProductDetails = () => {
  return (
        <section className='grid grid-cols-2 w-250 h-180 rounded-2xl shadow mt-40 mb-40 p-5'>
            <div className='border-4 border-black h-150 w-90'>
                <img src="" alt="" />
            </div>
            <div>
                <h1 className='text-5xl text-[#212121] heading-black mb-16 mt-5'>Product description</h1>
                <p className='text-sm text-[#212121] heading-extra-bold mb-24'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                <div className='flex flex-col gap-4'>
                    <button className='text-base heading-black bg-[#212121] text-[#FAFAFA] py-5 rounded'>Acheter maintenant</button>
                    <button className='text-base heading-black bg-[#FAFAFA] text-[#212121] py-5 rounded border-4 border-black'>Ajouter au panier</button>
                </div>
            </div>
        </section>
  )
}

export default ProductDetails