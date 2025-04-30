'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation'; // 

const InventoryProduct = ({ product, onDelete }) => {
    const router = useRouter(); 

    const handleDeleteClick = () => {
        onDelete(product.id);
    };

    const handleEditClick = () => {
        router.push(`/inventory/${product.id}`);
    };

    return (
      <div className="bg-white flex flex-col justify-between w-full">
        <div className="flex justify-center items-center p-1 h-100 ">
          <Image src={product.image} alt={product.title} width={200} height={200} className="object-contain" />
        </div>
        <div className="p-2">
          <h2 className="text-lg heading-black text-[#212121] mb-1 line-clamp-2">{product.title}</h2>
          <p className="text-sm heading-extra-bold text-[#757575] mb-1">{product.category}</p>
          <p className="text-xl heading-extra-bold text-[#212121] mb-3">{product.price} $ <br /></p>
        </div>
        <div className="flex justify-between gap-2 p-2">
          <button onClick={handleEditClick} className="bg-[#E9ECEF] text-[#495057] heading-extra-bold px-4 py-4 rounded hover:bg-yellow-500 text-xl w-full ">Modifier</button>
          <button onClick={handleDeleteClick} className="bg-[#FFF5F5] text-[#EF233C] heading-extra-bold px-4 py-1 rounded hover:bg-red-600 text-xl w-full">Supprimer</button>
        </div>
      </div>
    );
};

export default InventoryProduct;
