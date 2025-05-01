'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Logo from '../app/SVG/Logo.svg';
import SearchSvg from '../app/SVG/SearchSvg.svg';
import BuySvg from '../app/SVG/BuySvg.svg';
import UserSvg from '../app/SVG/UserSvg.svg';

const NavComponent = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    router.push('/');
    window.location.reload();
  };

  return (
    <nav className="relative bg-[#f9f9f9] flex items-center justify-center py-4 shadow-md">
      {/* Logo */}
      <Link href="/products" >
        <Image src={Logo} className='mr-10' alt="BuyNext Logo" width={200} height={50} />
      </Link>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative flex-1 max-w-xl mx-4">
        <input
          type="text"
          placeholder="Search for products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-full border border-gray-300 heading-extra-bold"
        />
        <button type="submit">
          <Image
            src={SearchSvg}
            alt="Search"
            width={20}
            height={20}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          />
        </button>
      </form>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">

        <div
          className='relative'
          onMouseEnter={() => setIsDropDown(true)}
          onMouseLeave={() => setIsDropDown(false)}
        >
          <Image src={UserSvg} alt="User" width={35} height={35} className='cursor-pointer' />

          {isClient && isDropDown && (
            <div className="absolute right-0 mt-0 py-5 w-48 bg-white border border-gray-200 rounded-md shadow-md z-10">
              {!isLoggedIn && (
                <Link href="/login" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Connexion
                </Link>
              )}
              <Link
                href="/admin"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Ajouter un produit
              </Link>
              <Link
                href="/inventory"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Liste des produits
              </Link>
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Déconnexion
                </button>
              )}
            </div>
          )}
        </div>

        <Image src={BuySvg} alt="Cart" width={35} height={35} />
      </div>
    </nav>
  );
};

export default NavComponent;
