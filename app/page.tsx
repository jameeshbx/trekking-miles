
import Footer from "./components/footer";
import Navbar from "./components/topBar";
import Feature from "./components/featured-section";
import Pricing from "./components/pricing-section";
import Herosection from "./components/hero-section";
import ContactSection from "./components/contactSection";
import FAQSection from "./components/faq-section";

export default function Home() {
  return (
    <div>
      
      
      <Navbar />
      <Herosection/>
      <Feature />
      <Pricing />
      <div className="relative py-16">
        <ContactSection/>
      </div>
      <FAQSection/>
      <Footer/>
      
    </div>
  );
}