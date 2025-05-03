'use client';
import React from 'react'
import Categories from '../../SVG/Categories.svg'
import Image from 'next/image'
import categories from '../components/Categories';
import { useRouter } from 'next/navigation';

const OurCategories = () => {
  const route = useRouter();
  const handleCategoryClick = (category) => {
    route.push(`/products?category=${category}`); 
  };

  return (
 <aside className="w-100 rounded-2xl p-4 shadow h-auto bg-white ">

          <div className="flex flex-col gap-2 align-center justify-center border-solid border-2 border-[#212121] p-4">

          <h2 className="text-2xl heading-extra-bold mb-4 flex items-center gap-2 ">
            <span><Image src={Categories} alt="CategoriesIcon" width={30} height={30} className='mr-1s'></Image></span> Nos Catégories
          </h2>

            {categories.map((category, index) => {
              return(
              <button key={index} className="text-base heading-black border-solid border-2 border-[#212121] px-2 py-1 rounded hover:bg-gray-200 h-20" onClick={() => handleCategoryClick(category)}>{category}</button>
              )
            })}
          </div>
        </aside>
  )
}

export default OurCategories 