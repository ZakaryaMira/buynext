import HeroSection from "./HeroComponent";
import OurProducts from "./OurProducts";

export const metadata = {
  title: "Buynext"
}

export default function Home() {
  return (
    <section className="">  
      <HeroSection/>
      <OurProducts/>
    </section>
  );
}
