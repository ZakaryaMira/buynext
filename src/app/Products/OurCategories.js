 import React from 'react'
import Categories from '../SVG/Categories.svg'
import Image from 'next/image'
import categories from './Categories'
const OurCategories = () => {
  return (
 <aside className="w-67 bg-[#FAFAFA] p-4 rounded shadow w-100 h-100">
          <h2 className="text-2xl heading-extra-bold mb-4 flex items-center gap-2">
            <span><Image src={Categories} alt="CategoriesIcon" width={30} height={30} className='mr-1'></Image></span> Nos Catégories
          </h2>
          <div className="grid grid-cols-2 gap-2 text-sm heading-black ">
            {categories.map((category, index) => {
              return(
              <button key={index} className="border px-2 py-1 rounded hover:bg-gray-200 h-20">
                {category}
              </button>
              )
            })}
          </div>
        </aside>
  )
}

export default OurCategories 