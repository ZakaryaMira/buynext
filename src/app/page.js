import NavComponent from "./NavComponent";
import HeroSection from "./HeroComponent";
import NosProduits from "./NosProduits";
export default function Home() {
  return (
    <section className="">
      <NavComponent/>    
      <HeroSection/>
      <NosProduits/>
    </section>
  );
}
