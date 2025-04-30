'use client';

import { useEffect, useState } from 'react';
import InventoryHeading from './Components/InventoryHeading';
import InventorySearch from './Components/InventorySearch';
import InventoryProduct from './Components/InventoryProduct';

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [hasToken, setHasToken] = useState(null); // null while checking

  useEffect(() => {
    const token = localStorage.getItem('token');
    setHasToken(!!token); // convert to boolean
  }, []);

  useEffect(() => {
    if (hasToken) {
      fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
  }, [hasToken]);

  const handleDelete = async (productId) => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: 'DELETE',
      });

      const deletedProduct = await res.json();
      console.log('Deleted:', deletedProduct);

      setProducts((prev) => prev.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (hasToken === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (!hasToken) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA]">
        <h1 className="text-3xl text-[#EF233C] heading-black mb-2">⛔ Accès refusé</h1>
        <p className="text-base text-[#212121] heading-extra-bold">
          Vous devez être connecté pour accéder à l'inventaire.
        </p>
      </div>
    );
  }

  return (
    <section className="p-6 bg-[#FAFAFA] min-h-screen">
      <InventoryHeading />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((product) => (
          <InventoryProduct key={product.id} product={product} onDelete={handleDelete} />
        ))}
      </div>
    </section>
  );
}
