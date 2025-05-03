import React, { useState } from "react";
import Image from 'next/image';
import Add from '../../../SVG/Add.svg';
import Photo from '../../../SVG/Photo.svg';
import ProductInpiutFiled from "./ProductInpiutFiled";
import ProductTextArea from "./ProductTextArea";
import ProductImageUploader from "./ProductImageUploader";
import ProductSelectInput from "./ProductSelectInput";
export default function ProductForm({onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    images: [],
  });
  const categoryOptions = [
    { value: 'electronics', label: 'Électronique' },
    { value: 'fashion', label: 'Mode' },
    { value: 'books', label: 'Livres' },
    { value: 'sports', label: 'Sport' },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); 
  };
  return (
    <form onSubmit={handleSubmit} className="bg-[#FAFAFA] max-w-6xl mx-auto my-10 p-10 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Product Details */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Image src={Add} alt="" width={50} height={50} />
          <h2 className="text-2xl text-[#212121] heading-black">Détail du produit</h2>
        </div>
        <ProductInpiutFiled label="Titre du produit" name="title" value={formData.title} onChange={handleInputChange} required/>
        <ProductInpiutFiled label="Prix du produit" name="price" value={formData.price} onChange={handleInputChange} type="number" required/>
        <ProductSelectInput label="Catégorie de produit" name="category" value={formData.category} onChange={handleInputChange} options={categoryOptions} required/>
        <ProductTextArea label="Description du produit" rows={4} name="description" value={formData.description} onChange={handleInputChange} required/>
      </div>

      {/* Right - Image Upload */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Image src={Photo} alt="" width={50} height={50} />
          <h2 className="text-lg heading-black">Images du produit</h2>
        </div>
        <ProductImageUploader images={formData.images} onUpload={(files) => setFormData({ ...formData, images: files })} />
      </div>
      <div className="col-span-1 md:col-span-2 pt-4 text-center">
        <button type="submit" className="bg-[#212121] text-white text-base heading-black px-40 py-5 rounded-lg hover:bg-gray-800 transition-all cursor-pointer">Ajouter le produit</button>
      </div>
    </form>
  );
}
