
import Footer from "./components/footer";
import Navbar from "./components/topBar";
import Feature from "./components/featured-section";
import Pricing from "./components/pricing-section";
import Herosection from "./components/hero-section";
<<<<<<< HEAD
import ContactSection from "./components/contactSection";
=======
import FAQSection from "./components/faq-section";
>>>>>>> 6beb8f0d0b66e3d3af3ee2fb4aac19606e2c0a6f

export default function Home() {
  return (
    <div>
      
      
      <Navbar />
      <Herosection/>
      <Feature />
      <Pricing />
<<<<<<< HEAD
      <div className="relative py-16">
        <ContactSection/>
      </div>
=======
      <FAQSection/>
>>>>>>> 6beb8f0d0b66e3d3af3ee2fb4aac19606e2c0a6f
      <Footer/>
      
    </div>
  );
}