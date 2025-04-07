import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <footer className=' bg-[#212121] text-[#FAFAFA] p-25'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* first coloms */}
        <div className='flex flex-col gap-2 '>
            <h1 className='text-2xl heading-black'>BuyNext</h1>
            <p className='heading-extra-bold'>Votre prochain achat, à portée de clic.</p>
        </div>
        {/* second colomn */}
        <div className='flex flex-col gap-3'>
            <h1 className='text-2xl heading-black'>Navigation</h1>
            <Link className='heading-extra-bold' href='/'>Navigation</Link>
            <Link className='heading-extra-bold' href='/'>À propos</Link>
            <Link className='heading-extra-bold' href='/'>Contact</Link>
        </div>
        {/* third colomn */}
        <div className='flex flex-col gap-3'>
            <h1 className='text-2xl heading-black'>Compte</h1>
            <Link className='heading-extra-bold' href='/login'>Se connecter </Link>
            <Link className='heading-extra-bold' href='/signup'>Créer un compte</Link>
            <Link className='heading-extra-bold' href='/'>Mon panier</Link>
        </div>
        {/* fourth colomn */}
        <div className='flex flex-col gap-2'>
            <h1 className='text-2xl heading-black'>Contact</h1>
            <Link className='heading-extra-bold' href='/'>mira.zakarya01@gmail.com </Link>
            <Link className='heading-extra-bold' href='/'>0659888173</Link>
        </div>
        </div>
    </footer>
  )
}

export default Footer