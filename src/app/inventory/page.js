'use client';

import { useEffect, useState } from 'react';
import InventoryHeading from './Components/InventoryHeading';
import InventorySearch from './Components/InventorySearch';
import InventoryProduct from './Components/InventoryProduct';


export default function InventoryPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

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
