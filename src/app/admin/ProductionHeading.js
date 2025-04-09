import React from 'react'
import Image from 'next/image'
const ProductionHeading = ({src, width , height, title}) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-16 ">
        <Image src={src} width={width} height={height} />
        <h1 className="text-5xl text-[#212121] heading-black font-extrabold ">{title}</h1>
    </div>
  )
}

export default ProductionHeading