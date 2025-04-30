'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProductionHeading from '@/app/admin/ProductionHeading';
import Complete from '../../SVG/Complete.svg';
import InventoryFrom from './Components/InventoryFrom';
export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
    images: [],
  });


  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setFormData({
          title: data.title,
          price: data.price,
          description: data.description,
          category: data.category,
          images: data.images || [],
        });
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (formData) => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const updatedProduct = await res.json();
      console.log('Updated product:', updatedProduct);
      router.push('/inventory');
    } catch (err) {
      console.error('Failed to update:', err);
    }
  };
  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <section className="min-h-screen bg-[#FAFAFA] p-6">
      <ProductionHeading src={Complete} width={50} height={50} title={"Modifier le produit"}/>
      <InventoryFrom formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
    </section>
  );
}
