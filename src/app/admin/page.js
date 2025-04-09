"use client";
import FormProducts from "./FormProducts";
import Add from '../SVG/Add.svg'
import ProductionHeading from "./ProductionHeading";
export default function AddProductPage() {
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
      alert("Produit ajouté avec succès !");
    } catch (err) {
      console.error("Erreur lors de l'ajout du produit:", err);
      alert("Erreur lors de l'ajout !");
    }
  };
  
  return (
    <section className="min-h-screen bg-[#FAFAFA] p-6">
        <ProductionHeading src={Add} width={50} height={50} title={"Ajouter un produit"}/>
        <FormProducts onSubmit={handleSubmit} />
    </section>
  );
}
