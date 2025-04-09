import ProductInpiutFiled from "@/app/admin/ProductInpiutFiled";
import ProductSelectInput from "@/app/admin/ProductSelectInput";
import ProductTextArea from "@/app/admin/ProductTextArea";
import ProductImageUploader from "@/app/admin/ProductImageUploader";

export default function InventoryFrom({  formData, setFormData, onSubmit   }) {
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
<form onSubmit={handleSubmit} className="bg-[#FAFAFA] max-w-3xl mx-auto my-10 px-10 rounded-2xl shadow-lg">
  <div className="flex flex-col items-center space-y-6 py-8">
    <div className="w-full max-w-md">
      <ProductInpiutFiled label="Titre du produit" name="title" value={formData.title} onChange={handleInputChange} required/>
    </div>
    <div className="w-full max-w-md">
      <ProductInpiutFiled label="Prix du produit" name="price" value={formData.price} onChange={handleInputChange} type="number" required/> 
    </div>
    <div className="w-full max-w-md">
      <ProductSelectInput label="Catégorie de produit" name="category" value={formData.category} onChange={handleInputChange} options={categoryOptions} required/>
    </div>
    <div className="w-full max-w-md">
      <ProductTextArea label="Description du produit" rows={4} name="description" value={formData.description} onChange={handleInputChange} require/>
    </div>
    <div className="w-full max-w-md space-y-6">
      <ProductImageUploader images={formData.images} onUpload={(files) => setFormData({ ...formData, images: files })} />
    </div>
    <div className="pt-4">
      <button type="submit"className="bg-[#212121] text-white text-base heading-black px-40 py-5 rounded-lg hover:bg-gray-800 transition-all cursor-pointer">Enregistrer</button>
    </div>
  </div>
</form>
  );
}
