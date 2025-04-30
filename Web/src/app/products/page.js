import Image from 'next/image';
import OurCategories from './OurCategories';
import AllProducts from './AllProducts';

export default async function ProductsPage({ searchParams  }) {
  const response = await fetch('https://fakestoreapi.com/products');
  let data = await response.json();

  const search = searchParams.search?.toLowerCase() || '';
  const category = searchParams.category;

  const filterData = data.filter((product) => {
    const isCategoryMatch = category ? product.category.toLowerCase().includes(category.toLowerCase()) : true;
    const isSearchMatch = product.title.toLowerCase().includes(search);
    return isCategoryMatch && isSearchMatch;
  });

  if (filterData.length > 0) {
    data = filterData;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      <h1 className="text-7xl text-[#212121] heading-black mb-2 mt-10">Nos Produits</h1>
      <p className="text-3xl text-[#212121] mb-6">Découvrez notre sélection de produits de qualité</p>

      <div className="flex gap-6 items-start relative">
        
        <div className="sticky top-28 h-[calc(100vh-11rem)] overflow-y-auto scroll-mb-8">
          <OurCategories />
        </div>

        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((product) => (
            <AllProducts key={product.id} product={product} />
          ))}
        </main>
      </div>
    </div>
  );
}
