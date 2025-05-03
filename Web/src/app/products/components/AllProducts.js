'use client';
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function AllProducts ({ product }) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Link href={`/products/${product.id}`}>
      <div className='h-120 w-90 bg-white text-base heading-black border-solid border-2 p-10 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 relative group overflow-hidden '>
        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault()
            setIsLiked(!isLiked)
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-rose-100 transition-colors">
          <svg 
            className={`w-6 h-6 ${isLiked ? 'text-rose-500 fill-current' : 'text-gray-400'}`} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5"
          >
            <path d="M19.5 13.572l-7.5 7.428-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
          </svg>
        </button>


        {/* Product Image with Hover Effect */}
        <div className="relative h-64 overflow-hidden rounded-xl">
          <Image 
            src={product.image} 
            alt={product.title} 
            width={300} 
            height={300} 
            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="pt-4 pb-2 px-2">
          {/* Category Tag */}
          <span className="heading-black text-[#212121] bg-[#FFC107] inline-block mb-2 px-10 py-2 text-xs  rounded-full">
            {product.category}
          </span>
          
          {/* Product Title */}
          <h3 className=" heading-black mb-2 text-lg text-gray-800  hover:text-rose-600 transition-colors">
            {product.title}
          </h3>

          {/* Price */}
          <div className="flex items-center justify-center space-x-2">
            <span className=" heading-black text-xl  text-[#FFC107]">
              ${product.price}
            </span>
            <span className="text-sm line-through text-gray-400">
              ${(product.price * 1.2).toFixed(0)}
            </span>
          </div>
        </div>

        {/* Hover Quick Actions */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/95 backdrop-blur-sm p-4 border-t border-gray-100">
          <button className="w-full heading-black py-2 px-4 bg-[#FFC107] text-[#212121] rounded-lg hover:bg-[#FFB101] transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}

