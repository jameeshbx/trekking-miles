
import Footer from "./components/footer";
import Navbar from "./components/topBar";
import Feature from "./components/featured-section";
import Pricing from "./components/pricing-section";
import Herosection from "./components/hero-section";

export default function Home() {
  return (
    <div>
      
      
      <Navbar />
      <Herosection/>
      <Feature />
      <Pricing />
      <Footer/>
      
    </div>
  );
}