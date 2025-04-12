'use client';
import { useState, useEffect } from "react";
import FormProducts from "./FormProducts";
import Add from '../SVG/Add.svg';
import ProductionHeading from "./ProductionHeading";
import SuccessModal from "../SuccessModal";

export default function AddProductPage() {
  const [showModal, setShowModal] = useState(false);
  const [hasToken, setHasToken] = useState(null); // null while checking

  useEffect(() => {
    const token = localStorage.getItem('token');
    setHasToken(!!token); 
  }, []);

  const handleSubmit = async (formData) => {
    try {
      const product = {
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        image: formData.image,
        category: formData.category,
      };

      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const data = await response.json();
      console.log("Produit ajouté:", data);
      setShowModal(true); 
    } catch (err) {
      console.error("Erreur lors de l'ajout du produit:", err);
      alert("Erreur lors de l'ajout !");
    }
  };

  return hasToken === null ? (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-gray-600">Chargement...</p>
    </div>
  ) : hasToken ? (
    <section className="min-h-screen bg-[#FAFAFA] p-6 relative">
      {showModal && (
        <SuccessModal message="Produit ajouté avec succès !" onClose={() => setShowModal(false)}/>)}
        <ProductionHeading src={Add} width={50} height={50} title={"Ajouter un produit"} />
        <FormProducts onSubmit={handleSubmit} />
    </section>
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA]">
      <h1 className="text-3xl text-[#EF233C] heading-black mb-2">⛔ Accès refusé</h1>
      <p className="text-base text-[#212121] heading-extra-bold">Vous devez être connecté pour ajouter un produit.</p>
    </div>
  );
}
