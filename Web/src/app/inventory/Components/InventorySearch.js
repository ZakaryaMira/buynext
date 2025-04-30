import React from 'react'
import Image from 'next/image'
import SearchSvg from '../../SVG/SearchSvg.svg'
import Add from '../../SVG/Add.svg'
const InventorySearch = () => {
  return (
    <section>
        <div className="mb-6">
            <button className="flex items-center gap-2 heading-extra-bold px-5 py-3 bg-[#212121] text-white text-lg  rounded-lg hover:bg-[#333]" aria-label="Ajouter un produit">
             <Image src={Add} alt="Ajouter" width={20} height={20} />Ajouter un produit</button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4 heading-extra-bol ">
            <form className="relative flex-1 max-w-xl">
                <label htmlFor="search" className="sr-only">Rechercher un produit</label>
                  <input type="text" id="search" placeholder="Rechercher des produits" className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 heading-extra-bol focus:outline-none focus:ring-2 focus:ring-black" />
                  <Image src={SearchSvg} alt="Rechercher" width={20} height={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                </form>
                <select className="border px-4 py-2 rounded-lg font-semibold text-gray-700">
                  <option value="">Toutes les catégories</option>
                </select>
              </div>
    </section>
  )
}

export default InventorySearch