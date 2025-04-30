import React from 'react'
import FloatingIcon from './FloatingIcon'

// SVG imports
import GameIcon from '@/app/SVG/GameIcon.svg'
import PhoneIcon from '@/app/SVG/PhoneIcon.svg'
import ShirtIcon from '@/app/SVG/ShirtIcon.svg'
import ToolIcon from '@/app/SVG/ToolIcon.svg'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#f9f9f9] flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden">
      <FloatingIcon src={GameIcon} alt="Game Icon" positionClasses="top-24 left-6 sm:top-32 sm:left-16 md:top-40 md:left-32 lg:top-48 lg:left-40"/>
      <FloatingIcon src={ShirtIcon} alt="Shirt Icon" positionClasses="top-20 right-6 sm:top-28 sm:right-16 md:top-36 md:right-32 lg:top-44 lg:right-40"/>
      <FloatingIcon src={PhoneIcon} alt="Phone Icon" positionClasses="bottom-20 left-6 sm:bottom-28 sm:left-16 md:bottom-36 md:left-32 lg:bottom-44 lg:left-40"/>
      <FloatingIcon src={ToolIcon} alt="Tool Icon" positionClasses="bottom-20 right-6 sm:bottom-28 sm:right-16 md:bottom-36 md:right-32 lg:bottom-44 lg:right-40"/>
      <h1 className="text-5xl sm:text-6xl md:text-7xl heading-black text-[#212121] drop-shadow-md -rotate-3">BuyNext</h1>
      <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-600 max-w-md sm:max-w-xl heading-extra-bold">Votre prochain achat, à portée de clic</p>
      <Link href="/products" className="mt-10 bg-[#FFC107] hover:bg-[#e2ac00] text-[#212121] heading-extra-bold px-15 py-4 rounded-lg shadow-lg transition duration-300">Découvrez les offres</Link>
    </section>
  )
}
export default HeroSection
