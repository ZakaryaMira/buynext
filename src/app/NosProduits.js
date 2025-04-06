import ProductCategoryCard from "./ProductCategoryCard";
import Gem from "../app/SVG/Gem.svg";
import Male from "../app/SVG/Male.svg";
import Female from "../app/SVG/Female.svg";
import Gamepad from "../app/SVG/Gamepad.svg";
import Image from "next/image";

const NosProduits = () => {
  return (
    <section className="w-full bg-white py-12 flex flex-col items-center gap-2">
      <h2 className="text-4xl font-bold text-[#212121] mb-4 text-5xl">Nos Produits</h2>
      <p className="text-2xl text-gray-600 mb-10">
        Découvrez notre sélection de produits de qualité
      </p>

      <div className="flex items-center justify-center gap-6 flex-wrap">
        <ProductCategoryCard icon={<Image src={Gamepad} alt="Gamepad" />} title="Électronique" />
        <ProductCategoryCard icon={<Image src={Gem} alt="Gem" />} title="Gemmes" />
        <ProductCategoryCard icon={<Image src={Male} alt="Male" />} title="Mode Hommes" />
        <ProductCategoryCard icon={<Image src={Female} alt="Female" />} title="Mode Femmes" />
      </div>
    </section>
  );
};

export default NosProduits;
