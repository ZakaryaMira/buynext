 import React from 'react'
import Categories from '../SVG/Categories.svg'
import Image from 'next/image'
import CategoryCard from './CategoryCard'
import categories from './Categories'
const OurCategories = () => {
  return (
    <section>
    <aside className='w-64 bg-white p-4 rounded shadow'>
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>📦</span> Nos Catégories
    </h2>
      <Image className='w-10 h-10' src={Categories} alt="CategoriesIcon"/>
      <div className='grid grid-cols-2 gap-2'>
        {
        categories.map((category, index) => (
            <CategoryCard key={index} title={category}/>
        ))
        }
      </div>
    </aside>
    </section>
  )
}

export default OurCategories 