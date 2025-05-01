import open from '../app/images/open.jpg';
import Image from 'next/image';
export default function HeroComponent() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="md:w-1/2 space-y-6">
            <div className="relative w-max p-8 bg-white border-4 border-t-gray-200 border-l-gray-200 border-b-gray-400 border-r-gray-400 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-lg transition-shadow duration-300">
              <div className="absolute inset-0 rounded pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent opacity-50 mix-blend-overlay"></div>
                <div className="absolute inset-0 border-2 border-white/20 mix-blend-overlay rounded"></div>
              </div>
              <p className="heading-black mt-6 text-lg sm:text-xl md:text-2xl text-gray-600 max-w-md sm:max-w-xl font-extrabold relative z-10">
                Your next purchase, just a click away
              </p>
            </div>

            <h1 className="heading-black text-4xl md:text-5xl font-bold text-gray-900">
            Discover Our <span className="text-[#FFC107]">Exclusive</span> Collection
            </h1>
            
            <p className="heading-black text-lg md:text-xl text-gray-600">
              Quality products, delivered straight to your door
            </p>

            <div className="flex gap-4">
              <button className="heading-black bg-[#FFC107] hover:bg-amber-500 text-black px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-md">
                Shop Now
              </button>
              <button className="heading-black border-2 border-gray-800 hover:border-[#FFC107] text-gray-800 px-8 py-3 rounded-lg font-bold transition-all duration-300">
                Browse Collection
              </button>
            </div>

            <div className="flex gap-6 mt-8">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="heading-black text-gray-600">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <span className="heading-black text-gray-600">Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Product Showcase */}
          <div className="md:w-1/2 relative group">
            <div className="relative bg-white border-4 border-black shadow-2xl w-full max-w-xl h-96 flex items-center justify-center transform rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent opacity-50 mix-blend-overlay"></div>
              <Image 
                src={open}
                alt="Featured Product" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#8ACCD5] text-white p-4 text-center">
                <span className="text-2xl heading-extra-bold text-[#F8F8E1]">New Collection 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}