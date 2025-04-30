import React from 'react'
import Image from 'next/image'
import List from '../../SVG/List.svg';
const InventoryHeading = () => {
  return (
    <div>
    <header className="flex items-center gap-4 mb-4">
        <Image src={List} alt="Liste" width={40} height={40} />
        <h1 className="text-4xl md:text-5xl heading-black text-[#212121]">Liste des produits</h1>
    </header>
    <p className="text-base heading-extra-bold md:text-xl font-semibold text-[#212121] mb-6 leading-relaxed">
        Découvrez tous vos produits ajoutés et gérez-les facilement. Mettez à jour, supprimez ou ajoutez
        <br className="hidden md:block" /> de nouveaux articles en un clic !
    </p>
    </div>
  )
}

export default InventoryHeading