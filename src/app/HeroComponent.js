import React from 'react'
import Image from 'next/image'

// Sample image imports – replace with actual paths
import GameIcon from '../app/SVG/GameIcon.svg'
import PhoneIcon from '../app/SVG/PhoneIcon.svg'
import ShirtIcon from '../app/SVG/ShirtIcon.svg'
import ToolIcon from '../app/SVG/ToolIcon.svg'

const HeroSection = () => {
  return (
    <section className="bg-[#f9f9f9] relative w-full min-h-screen flex flex-col items-center justify-center text-center py-20">
  {/* Icons - floating around */}
  <div className="absolute    top-60 left-10  sm:left-24  md:left-40   lg:top-70 lg:left-100">
    <div className="bg-white p-4 rounded-full shadow-lg">
      <Image src={GameIcon} alt="Phone" width={80} height={80} />
    </div>
  </div>

  <div className="absolute top-60 right-10 sm:right-24  sm:top-40   md:right-50 md:top-50     lg:right-100 lg:top-75">
    <div className="bg-white p-4 rounded-full shadow-lg">
      <Image src={ShirtIcon} alt="Shirt" width={80} height={80} />
    </div>
  </div>

  <div className="absolute bottom-40 left-10 sm:left-24 md:left-10      lg:bottom-80 lg:left-60">
    <div className="bg-white p-4 rounded-full shadow-lg">
      <Image src={PhoneIcon} alt="Gamepad" width={80} height={80} />
    </div>
  </div>

  <div className="absolute bottom-40 right-10 sm:right-24 md:right-40 lg:right-80 lg:bottom-70">
    <div className="bg-white p-4 rounded-full shadow-lg">
      <Image src={ToolIcon} alt="Tool" width={80} height={80} />
    </div>
  </div>

  {/* Title */}
  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 drop-shadow-md heading-black -rotate-3">
    BuyNext
  </h1>
  <p className="mt-8 text-base sm:text-lg md:text-xl text-gray-600 heading-extra-bold">
    Votre prochain achat, à portée de clic
  </p>

  {/* Button */}
  <button className="mt-8 bg-[#FFC107] hover:bg-[#e2ac00] text-black heading-black px-6 py-2 rounded-md shadow-md transition w-100">
    Découvrez les offres
  </button>
</section>

  )
}

export default HeroSection
