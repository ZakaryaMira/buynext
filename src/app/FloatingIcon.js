import React from 'react'
import Image from 'next/image'

const FloatingIcon = ({ src, alt, positionClasses }) => {
  return (
    <div className={`absolute ${positionClasses}`}>
      <div className="bg-white p-4 rounded-full shadow-xl">
        <Image src={src} alt={alt} width={60} height={60} />
      </div>
    </div>
  )
}

export default FloatingIcon
