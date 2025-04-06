'use client' 

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Logo from '../app/SVG/Logo.svg'
import SearchSvg from '../app/SVG/SearchSvg.svg'
import BuySvg from '../app/SVG/BuySvg.svg'
import UserSvg from '../app/SVG/UserSvg.svg'

const NavComponent = () => {
    const [isDropDown, setIsDropDown] = useState(false);
    
  return (
    <nav className="relative bg-[#f9f9f9] flex items-center justify-between px-6 py-4 shadow-md ">
        
      {/* Logo */}
      <div>
        <Image src={Logo} alt="BuyNext Logo" width={100} height={40} />
      </div>

      {/* Search Bar */}
      <form className="relative flex-1 max-w-xl mx-4">
        <input
          type="text"
          placeholder="Rechercher des produit"
          className="w-full px-4 py-2 rounded-full border border-gray-300 heading-extra-bold"
        />
        <Image
          src={SearchSvg}
          alt="Search"
          width={20}
          height={20}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer" 
        />
      </form>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link href="/about" className="text-sm font-medium heading-extra-bold">À propos</Link>
        <div className='relative' onMouseEnter={() => setIsDropDown(true)} onMouseLeave={() => setIsDropDown(false)}>
        <Image  src={UserSvg} alt="User" width={24} height={24} className='cursor-pointer' />
        
        {isDropDown && (
          <div className="absolute right-0 mt-0 py-5 w-48 bg-white border border-gray-200 rounded-md shadow-md w-100">
            <Link href="/" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Connexion</Link>
            <Link href="/" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Créer un compte</Link>
            <Link href="/" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Ajouter un produit</Link>
            <Link href="/" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Liste des produits</Link>
            <Link href="/" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Deconnexion</Link>
          </div>
        )}
        </div>
        <Image src={BuySvg} alt="Cart" width={24} height={24} />
      </div>
    </nav>
  )
}

export default NavComponent
