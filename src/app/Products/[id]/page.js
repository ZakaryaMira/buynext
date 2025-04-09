import React from 'react'
import ProductDetails from './ProductDetails'

const page = async ({ params }) => {
  const { id } = await params; 
  const result = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await result.json();

  return (
    <section className='flex flex-col justify-center items-center bg-[#FAFAFA]'>
      <ProductDetails product={product} />
    </section>
  );
};

export default page;
