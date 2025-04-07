import Image from 'next/image';
import Categories from '../SVG/Categories.svg';
export default async function ProductsPage() {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      <h1 className="text-5xl text-[#212121] heading-black mb-2 mt-10">Nos Produits</h1>
      <p className="text-xl text-[#212121] mb-6">Découvrez notre sélection de produits de qualité</p>

      <div className="flex gap-6">
        {/* Sidebar */}

        <aside className="w-67 bg-white p-4 rounded shadow">
          <h2 className="text-2xl heading-extra-bold mb-4 flex items-center gap-2">
            <span><Image src={Categories} alt="CategoriesIcon" width={30} height={30} className='mr-1'></Image></span> Nos Catégories
          </h2>
          <div className="grid grid-cols-2 gap-2 text-sm heading-black ">
            {[
              'tous les produits',
              'Électronique',
              'Bijoux',
              'Mode Homme',
              'Mode Femme',
              'Maison et Art de Vivre',
              'Téléphones',
              'Informatique',
              'Sacs & Chaussures',
              'Jouets, Enfants & Bébés',
              'Loisirs & Sports de plein air',
              'Beauté, Santé & Cheveux',
              'Automobiles & Motos',
              'Bricolage & Outils',
            ].map((category, index) => (
              <button
                key={index}
                className="border px-2 py-1 rounded hover:bg-gray-200 h-20" 
              >
                {category}
              </button>
            ))}
          </div>
        </aside>

        {/* Products */}
        <main className="flex-1 grid grid-cols-3 gap-4">
          {data.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded shadow text-center hover:shadow-lg transition-shadow duration-200"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="mx-auto object-contain h-48"
              />
              <div className=''>
                <p className="mt-2 font-medium text-[#212121] heading-black mb-10">{product.title}</p>
                <p className="text-sm text-[#212121] heading-extra-bold">{product.price} da</p>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
